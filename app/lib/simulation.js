function RollDie(die) {
  return Math.floor((die * Math.random()) + 1);
}

function MakeSavingThrow(die, save, check) {
  var roll = RollDie(die);
  if (roll == 1) return false;
  if (roll == 20) return true;
  return roll + save > check;
}

function ApplyDamage(attacker, defender, isCrit) {
  // damage vs aura vs vitality
  var damage;
  if (typeof attacker['dmg'] == 'number') {
    damage = attacker['dmg'];
  } else {
    var roll = RollDie(attacker['dmg']['die']);
    damage = attacker['dmg']['mult'] * roll + attacker['dmg']['mod'];
  }
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

function MeleeAttack(attacker, defender) {
  if (typeof attacker['atk'] == 'number') {
    if (attacker['atk']['mult'] > defender['def']) {
      ApplyDamage(attacker, defender, RollDie(20) > 20 - attacker['crit']);
    }
    return;
  }
  var roll = RollDie(attacker['atk']['die']);
  if (roll == 1) return;
  if (roll >= 20 - attacker['crit']) ApplyDamage(attacker, defender, true);
  // attack vs defense
  if (attacker['atk']['mult'] * roll + attacker['atk']['mod'] > defender['def']) {
    ApplyDamage(attacker, defender, false);
  }
}

function RangedAttack(attacker, defender) {
  if (typeof attacker['atk'] == 'number') {
    if (attacker['atk']['mult'] > defender['def']) {
      ApplyDamage(attacker, defender, RollDie(20) > 20 - attacker['crit']);
    }
    return;
  }
  var roll = RollDie(attacker['atk']['die']);
  if (roll == 1) return;
  if (roll >= 20 - attacker['crit']) ApplyDamage(attacker, defender, true);
  // attack vs reflex vs defense
  if (true) {
    if (attacker['atk']['mult'] * roll + attacker['atk']['mod'] > defender['def']) {
      ApplyDamage(attacker, defender, false);
    }
  }
}

function RollForInitiative() {
  return RollDie(20) >= RollDie(20);
}

function Attack(attacker, defender) {
  if (attacker['form'] == 'melee') MeleeAttack(attacker, defender);
  if (attacker['form'] == 'ranged') RangedAttack(attacker, defender);
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

function ModifierOf(attribute) {
  return Math.floor((attribute - 10) / 2);
}

function EvaluateTerm(term, builder, level, die) {
  if (term[0] == 'd') {
    die['die'] = parseInt(term.substring(1));
    return 'die';
  }
  if (!isNaN(term)) return parseInt(term);
  if (term == 'LVL') return level;
  if (term == 'STR') return ModifierOf(builder['str']);
  if (term == 'DEX') return ModifierOf(builder['dex']);
  if (term == 'CONT') return ModifierOf(builder['cont']);
  if (term == 'INT') return ModifierOf(builder['int']);
  if (term == 'WIS') return ModifierOf(builder['wis']);
  if (term == 'CHA') return ModifierOf(builder['cha']);
  return 0;
}

function Compute(right, left, op, die) {
  if (op == '+') {
    if (left == 'die') {
      die['mod'] += right;
      return 'die';
    }
    if (right == 'die') {
      die['mod'] += left;
      return 'die';
    }
    return left + right;
  }
  if (op == '-') {
    if (left == 'die') {
      die['mod'] -= right;
      return 'die';
    }
    if (right == 'die') {
      die['mod'] -= left;
      return 'die';
    }
    return left - right
  };
  if (op == '*') {
    if (left == 'die') {
      die['mod'] *= right;
      die['mult'] *= right;
      return 'die';
    }
    if (right == 'die') {
      die['mod'] *= left;
      die['mult'] *= left;
      return 'die';
    }
    return left * right;
  }
  if (op == '/') {
    if (left == 'die') {
      die['mod'] *= right;
      die['mult'] *= right;
      return 'die';
    }
    if (right == 'die') {
      die['mod'] *= left;
      die['mult'] *= left;
      return 'die';
    }
    return left / right;
  }
  return 0;
}

function ComputeStatTemplate(template, builder, level) {
  var terms = template.split(' ');
  var die = {mult: 1, die: 0, mod: 0};
  var stack = [];
  var operators = [];
  for (var t = 0; t < terms.length; t++) {
    if (terms[t] == '(') {
      stack.push(terms[t]);
    } else if (terms[t] == ')') {
      while (operators[operators.length-1] != '(') {
        stack.push(Compute(stack.pop(), stack.pop(), operators.pop(), die)); 
      }
      operators.pop();
    } else if (terms[t] == '*' || terms[t] == '/') {
      var length = operators.length;
      if (length > 0) {
        if (operators[length-1] == '*' || operators[length-1] == '/') {
          stack.push(Compute(stack.pop(), stack.pop(), operators.pop(), die));
        }
      }
      operators.push(terms[t]);
    } else if (terms[t] == '+' || terms[t] == '-') {
      var length = operators.length;
      if (length > 0 && operators[length-1] != '(') {
        stack.push(Compute(stack.pop(), stack.pop(), operators.pop(), die));
      }
      operators.push(terms[t]);
    } else {
      stack.push(EvaluateTerm(terms[t], builder, level, die));
    }
  }
  while (operators.length > 0) {
    stack.push(Compute(stack.pop(), stack.pop(), operators.pop(), die));
  }
  if (stack[stack.length-1] == 'die') return die;
  return stack.pop();
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
  var results = [];
  var pbl = BaseLine(player, params);
  results.push(pbl);
  opps.forEach(function(o) {
    var obl = BaseLine(o, params);
    results.push(obl);
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
  var results = [];
  opps.forEach(function(o) {
    var curve = PowerCurve(player, o, params);
    results.push(curve);
  });
  return results;
}

function Simulate(player, opps, params) {
  var baseLines = CalculateBaseLines(player, opps, params);
  var powerCurves = CalculatePowerCurves(player, opps, params);
  return baseLines.concat(powerCurves);
}

onmessage = function(deps) {
  var results = Simulate(deps.data[0], deps.data[1], deps.data[2]);
  postMessage(results);
}