function RollDie(die) {
  return Math.floor((20 * Math.random()) + 1);
}

function MakeSavingThrow(die, save, check) {
  var roll = RollDie(die);
  if (roll == 1) return false;
  if (roll == 20) return true;
  return roll + save > check;
}

function ApplyDamage(attacker, defender, roll, isCrit) {
  // damage vs aura vs vitality
  var roll = RollDie(attacker['dmg']['die']);
  var damage = attacker['dmg']['mult'] * roll + attacker['dmg']['mod'];
  if (damage > defender['ardx']) {
    defender['vit'] -= (damage - defender['ardx']);
    damage = defender['ardx'];
  }
  if (damage > defender['aura']) {
    defender['aura'] = 0;
    defender['vit'] -= (damage - defender['aura']);
    return;
  }
  defender['aura'] -= damage;
}

function CheckMeleeAttack(attacker, defender) {
  var roll = RollDie(attacker['atk']['die']);
  if (roll == 1) return;
  if (roll >= 20 - attacker['crit']) ApplyDamage(attacker, defender, roll, true);
  // attack vs defense
  if (attacker['atk']['mult'] * roll + attacker['atk']['mod'] > defender['def']) {
    ApplyDamage(attacker, defender, roll, false);
  }
}

function CheckRangedAttack(attacker, defender) {
  var roll = RollDie(attacker['atk']['die']);
  if (roll == 1) return;
  if (roll >= 20 - attacker['crit']) ApplyDamage(attacker, defender, roll, true);
  // attack vs reflex vs defense
  if (!MakeSavingThrow(20, defender['rflx'], 40)) {
    if (attacker['atk']['mult'] * roll + attacker['atk']['mod'] > defender['def']) {
      ApplyDamage(attacker, defender, roll, false);
    }
  }
}

function RollForInitiative() {
  return RollDie(20) >= RollDie(20);
}

function Attack(attacker, defender) {
  if (attacker['form'] == 'melee') CheckMeleeAttack(attacker, defender);
  if (attacker['form'] == 'ranged') CheckRangedAttack(attacker, defender);
  // return true if the defender's vitality was reduced to 0 by the attack
  return defender['vit'] <= 0;
}

function BasicCombat(player, opp) {
  // choose attack order
  var first;
  var second;
  if (RollForInitiative()) {
    first = player;
    second = opp;
  } else {
    first = opp;
    second = player;
  }
  // rounds last until one character's vitality is reduced to 0
  while (!Attack(first, second) && !Attack(second, first)) {
    // aura is regenerated at the end of each round
    if (first['aura'] > 0) first['aura'] += first['argn'];
    if (second['aura'] > 0) second['aura'] += second['argn'];
  }
  // return true if the player has won
  return player['vit'] > 0;
}

function ComputeDieTemplate(template) {
  var parts = template.split(' ');
  return {
    mult: parts[0],
    die: parts[2],
    mod: parts[4]
  };
}

function ComputeStatTemplate(template, builder, level) {
  if (typeof template == 'number') {
    return template;
  }
  return parseInt(template);
}

function BuildCharacter(character, level) {
  var builder = {};
  for (var key in character) {
    if (key != 'team' && key != 'name' && key != 'form') {
      builder[key] = ComputeStatTemplate(character[key], builder, level);
    }
  }
  builder['form'] = character['form'];
  return builder;
}

function BaseLine(character, params) {
  var baseLine = []
  for (var x = -1 * params['lvl-under']; x <= params['lvl-over']; x++) {
    var wins = 0;
    for (var i = 0; i < params['iters']; i++) {
      var dynamic = BuildCharacter(character, params['lvl'] + x)
      var static = BuildCharacter(character, params['lvl'])
      if (BasicCombat(dynamic, static)) {
        wins++;
      }
    }
    var y = wins / params['iters'];
    baseLine.push([x, y]);
  }
  return {data: baseLine, label: character['name'] + ' - Base'};
}

function CalculateBaseLines(player, opps, params) {
  var results = {data: [], labels: []};
  var pbl = BaseLine(player, params);
  results['data'].push(pbl['data']);
  results['labels'].push(pbl['label']);
  opps.forEach(function(o) {
    var obl = BaseLine(o, params);
    results['data'].push(obl['data']);
    results['labels'].push(obl['label']);
  });
  return results;
}

function PowerCurve(left, right, params) {
  var curve = []
  for (var x = -1 * params['lvl-under']; x <= params['lvl-over']; x++) {
    var wins = 0;
    for (var i = 0; i < params['iters']; i++) {
      var dynamic = BuildCharacter(left, params['lvl'] + x)
      var static = BuildCharacter(right, params['lvl'])
      if (BasicCombat(dynamic, static)) {
        wins++;
      }
    }
    var y = wins / params['iters'];
    curve.push([x, y]);
  }
  return {data: curve, label: left['name'] + ' v ' + right['name']};
}

function CalculatePowerCurves(player, opps, params) {
  var results = {data: [], labels: []};
  opps.forEach(function(o) {
    var curve = PowerCurve(player, o, params);
    results['data'].push(curve['data']);
    results['labels'].push(curve['label']);
  });
  return results;
}

function Simulate(player, opps, params) {
  var baseLines = CalculateBaseLines(player, opps, params);
  var powerCurves = CalculatePowerCurves(player, opps, params);
  return {
    data: [baseLines['data'].concat(powerCurves['data'])],
    labels: [baseLines['labels'].concat(powerCurves['labels'])]
  };
}

onmessage = function(deps) {
  var results = Simulate(deps.data[0], deps.data[1], deps.data[2]);
  postMessage(results);
}