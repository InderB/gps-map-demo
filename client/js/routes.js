angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('geofence', {
      url: '/geofence',
      templateUrl: 'templates/geofence.html',
      controller: 'geofenceCtrl'
    })

    .state('addGeofence', {
      url: '/addGeofence',
      templateUrl: 'templates/addGeofence.html',
      controller: 'addGeofenceCtrl'
    })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('geocoding', {
    url: '/geocoding',
    templateUrl: 'templates/geocoding.html',
    controller: 'geocodingCtrl'
  })

  .state('snapToRoadSpeed', {
    url: '/snapToRoad-speed',
    templateUrl: 'templates/snapToRoad_speed.html',
    controller: 'snapToRoadSpeedCtrl'
  })
  .state('pathReplaySpeed', {
    url: '/pathReplay-speed',
    templateUrl: 'templates/pathReplay_speed.html',
    controller: 'pathReplaySpeedCtrl'
  })
 $urlRouterProvider.otherwise('/home');
});
