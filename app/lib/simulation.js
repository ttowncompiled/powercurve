function BasicCombat(player, opp) {
  return true;
}

function BuildCharacter(character, level) {
  return {}
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

function Simulate(player, opps, params) {
  return CalculateBaseLines(player, opps, params);
}

onmessage = function(deps) {
  var results = Simulate(deps.data[0], deps.data[1], deps.data[2]);
  postMessage(results);
}