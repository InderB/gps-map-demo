var geolib = require('geolib')
var serviceBackend = {
  getSpeed : function (req, res, next) {
    var speed = []
    console.log("in get",req.params.data);
    var data = JSON.parse(req.params.data)

  for (var i = 0; i < data.length-1; i++) {
    // console.log('data check',i, data[i]);
    var speedPoint = geolib.getSpeed(
        {lat: parseFloat(data[i].lat), lng: parseFloat(data[i].lng), time: data[i].time},
        {lat: parseFloat(data[i+1].lat), lng: parseFloat(data[i+1].lng), time: data[i+1].time}
    )
    data[i].speed = speedPoint
    if(speedPoint < 0){
      data[i].speed = 0
    }
    speed.push(data[i])
    // console.log('speed',speedPoint);
    // console.log(' location',data[i]);
    // console.log(' location+1',data[i+1]);
  }
  console.log('speedPoint',speed);
  res.status(200).json(speed);
  res.end();
  // var dist = geolib.getDistance(
  //     {lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lng)},
  //     {lat: parseFloat(data[0+1].lat), lng: parseFloat(data[0+1].lng)},
  //     {unit: 'mph'}
  // )
  // console.log("dist",dist);
  // console.log("SPeed", dist/(data[1].time-data[0].time)*1000);
},
getSpeedOnOriginalPoints : function (req, res, next) {
  var speed = []
  console.log("in get",req.params.data);
  var data = JSON.parse(req.params.data)

for (var i = 0; i < data.length-1; i++) {
  var speedPoint = geolib.getSpeed(
      {lat: parseFloat(data[i].lat), lng: parseFloat(data[i].lng), time: data[i].time},
      {lat: parseFloat(data[i+1].lat), lng: parseFloat(data[i+1].lng), time: data[i+1].time}
  )
  // console.log('speedPoint',speedPoint);
  data[i].speed = speedPoint
  if(speedPoint < 0){
    data[i].speed = 0
  }
  speed.push(data[i])
  console.log('speed original',speedPoint, new Date(data[i].time));
  // console.log(' location',data[i]);
  // console.log(' location+1',data[i+1]);
}
res.status(200).json(speed);
res.end();
}
}
module.exports = serviceBackend;

//
// exports = module.exports = function (app) {
//   console.log("in get");
// var speed =  geolib.getSpeed(
//     {lat: 51.567294, lng: 7.38896, time: 1360231200880},
//     {lat: 52.54944, lng: 13.468509, time: 1360245600880},
//     {unit: 'mph'}
// );
// console.log('speed',speed);
// };
