// var geolib = require('geolib');
angular.module('app.services', [])
//
// .service('testService', ['$scope',
//     function ($scope) {
//     	this.users = ['John', 'James', 'Jake'];
//     }])

.factory('geolibgps',['$http','$q', function ($http, $q) {
  var processResponse = function (res) {
    return res.data
  }
  var processError = function (e) {
    var msg = []
    if (e.status) { msg.push(e.status) }
    if (e.statusText) { msg.push(e.statusText) }
    if (msg.length === 0) { msg.push('Unknown Server Error') }
    return $q.reject(msg.join(' '))
  }
  var gpsServices = {
    getSpeed : function (data) {

      var url = 'gpsDemo/getSpeed/'+JSON.stringify(data)+'/'
      return $http.get(url).then(processResponse,processError)
    },
    speedOriginalPoints : function (data) {
      var url = 'gpsDemo/getSpeedOnOriginalPoints/'+JSON.stringify(data)+'/'
      return $http.get(url).then(processResponse,processError)
    }
  }
  return gpsServices;
}])
