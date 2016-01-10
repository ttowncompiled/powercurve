function Annotate(data, labels, params) {
  var annotated_data = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].length != params['lvl-under'] + params['lvl-over'] + 1) {
      return [];
    }
    var results = [];
    for (var j = 0; j < data[i].length; j++) {
      results.push([-1 * params['lvl-under'] + j, data[i][j]]);
    }
    annotated_data.push({data: results, label: ''});
  }
  return annotated_data;
}

function Simulate(player, opps, params) {
  var y = [];
  for (var i = 0; i < params['lvl-under'] + params['lvl-over']; i++) {
    y.push(0);
  }
  y.push(1);
  return Annotate([y], [], params);
}

onmessage = function(deps) {
  var results = Simulate(deps.data[0], deps.data[1], deps.data[2]);
  postMessage(results);
}