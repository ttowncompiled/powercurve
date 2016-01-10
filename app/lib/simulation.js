function Annotate(y, params) {
  if (y.length != params['lvl-under'] + params['lvl-over'] + 1) {
    return [];
  }
  var results = [];
  for (var i = 0; i < y.length; i++) {
    results.push([-1 * params['lvl-under'] + i, y[i]]);
  }
  return results;
}

function Simulate(player, opps, params) {
  var y = [];
  for (var i = 0; i < params['lvl-under'] + params['lvl-over']; i++) {
    y.push(0);
  }
  y.push(1);
  return Annotate(y, params);
}

onmessage = function(deps) {
  var results = Simulate(deps.data[0], deps.data[1], deps.data[2]);
  postMessage(results);
}