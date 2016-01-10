function Simulate(player, opps, params) {
  console.log([player, opps, params]);
  console.log('run simulation');
  return [[], []];
}

onmessage = function(deps) {
  console.log(deps);
  console.log('worker up and running');
  var results = Simulate(deps.data[0], deps.data[1], deps.data[2]);
  postMessage(results);
}