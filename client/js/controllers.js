angular.module('app.controllers', ['app.services'])
  .controller('AppCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
      $(document).ready(function () {
        $('body').addClass('loaded');
        $('.button-collapse').sideNav({ closeOnClick: true });
      });
    }])
  .controller('homeCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
      $(document).ready(function () {
        $('body').addClass('loaded');
      });

      var initMap = function () {
        console.log("initimap");
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: { lat: 0, lng: 0 }
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var bounds = new google.maps.LatLngBounds();
        var markers = locations.map(function (location, i) {
          // console.log('location',location);
          var myLatLng = new google.maps.LatLng(location.lat, location.lng);
          bounds.extend(myLatLng);
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            title: location.devID
          });
        });
        map.fitBounds(bounds);

        // var infowindow1 = new google.maps.InfoWindow;
        // infowindow1.setContent('latitude : ');
        // infowindow1.open(map, markers);
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
          { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
      }

      var locations = [
        { lat: 19.563910, lng: 72.154312, devID: "Faclon_1" },
        { lat: 19.718234, lng: 72.363181, devID: "Faclon_2" },
        { lat: 19.727111, lng: 72.191124, devID: "Faclon_3" },
        { lat: 19.848588, lng: 72.209834, devID: "Faclon_4" },
        { lat: 19.851702, lng: 72.216968, devID: "Faclon_5" },
        { lat: 18.671264, lng: 72.863657, devID: "Faclon_6" },
        { lat: 18.304724, lng: 72.662905, devID: "Faclon_7" },
        { lat: 18.817685, lng: 72.699196, devID: "Faclon_8" },
        { lat: 18.828611, lng: 72.790222, devID: "Faclon_9" },
        { lat: 19.750000, lng: 73.116667, devID: "Faclon_11" },
        { lat: 19.759859, lng: 73.128708, devID: "Faclon_12" },
        { lat: 19.765015, lng: 73.133858, devID: "Faclon_13" },
        { lat: 19.770104, lng: 73.143299, devID: "Faclon_14" },
        { lat: 19.771900, lng: 73.73187, devID: "Faclon_15" },
        { lat: 19.774785, lng: 73.119978, devID: "Faclon_16" },
        { lat: 19.819616, lng: 73.968119, devID: "Faclon_17" },
        { lat: 19.330766, lng: 73.695692, devID: "Faclon_18" },
        { lat: 20.927193, lng: 74.053218, devID: "Faclon_19" },
        { lat: 20.330162, lng: 74.865694, devID: "Faclon_20" },
        { lat: 20.734358, lng: 73.439506, devID: "Faclon_21" },
        { lat: 20.734358, lng: 73.501315, devID: "Faclon_22" },
        { lat: 19.735258, lng: 73.438000, devID: "Faclon_23" },
        { lat: 19.999792, lng: 72.463352, devID: "Faclon_24" }
      ]
      initMap()
    }])
  .controller('snapToRoadSpeedCtrl', ['$scope', '$stateParams', '$q', 'geolibgps', function ($scope, $stateParams, $q, geolib) {
    // Initialize map and fetch datapoints from csv file
    $(document).ready(function () {
      $('body').addClass('loaded');

      var initMap = function () {
        $scope.map = new google.maps.Map(document.getElementById('map-pathReplay'), {
          zoom: 10,
          center: { lat: 19.128532, lng: 72.914302 }
        });
      }
      initMap();

      $.getJSON("js/dataGps.json", function (data) {
        //*************************
        // Fetched datapoints in JSON format, convert lat, long and push in array
        //   var locationPoint = [];
        //     for (var i = 0; i < data.length-1; i=i+2) {
        //       // console.log('i',data[i],'i+1',data[i+1]);
        //       if (Date.parse(data[i+1].time) == Date.parse(data[i].time)) {
        //         var latStr = ''+data[i].value+''
        //         var lngStr = ''+data[i+1].value+''
        //       var lat =  parseFloat(latStr.slice(0,2)) + (parseFloat(latStr.slice(2,9))/60)
        //       var lng = parseFloat(lngStr.slice(0,2)) + (parseFloat(lngStr.slice(2,9))/60)
        //       locationPoint.push({lat:lat,lng:lng})
        //         // latlng.push(""+lat+","+lng)
        //       }
        //     }
        //     console.log("locationPoint", locationPoint);
        //     var flightPath = new google.maps.Polyline({
        //       path: locationPoint,
        //       geodesic: true,
        //       strokeColor: '#FF0000',
        //       strokeOpacity: 1.0,
        //       strokeWeight: 2
        //     });
        //     flightPath.setMap($scope.map)
        // });
        //***********************
        var chandivali = ["19.112470534739103,72.88860028896761", "19.112571909084227,72.88909381542635", "19.11281520725892,72.88965171490145", "19.113017955464368,72.88997357998323", "19.11330180253428,72.89044564876986", "19.113585649116896,72.89087480221224", "19.113788396377565,72.89119666729403", "19.11407224212479,72.89158290539217", "19.114234439475847,72.89241975460482", "19.11476157976777,72.8929561964078", "19.115025149283433,72.8929561964078", "19.115633385023514,72.89302056942415", "19.1159983253934,72.89302056942415", "19.116789026764337,72.89289182339144"]

        var ghatkopar = ["19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837"]
        // Fetched datapoints in JSON format, convert lat, long and push in array
        // data = [[{},{},...], [{},{},...],...]
        console.log("Data contains", data.length, "trips!");
        var FINALPOINTS = [];
        var rawData = []
        var k = 0;
        // For each trip
        while (k < data.length) {
          // Parse lat, lng
          var locationPoint = [];
          var trip = data[k];
          for (var i = 0; i < trip.length - 1; i = i + 2) {
            if (Date.parse(trip[i + 1].time) == Date.parse(trip[i].time)) {
              var latStr = '' + trip[i].value + ''
              var lngStr = '' + trip[i + 1].value + ''
              var lat = parseFloat(latStr.slice(0, 2)) + (parseFloat(latStr.slice(2, 9)) / 60)
              var lng = parseFloat(lngStr.slice(0, 2)) + (parseFloat(lngStr.slice(2, 9)) / 60)
              locationPoint.push("" + lat + "," + lng + "");
              rawData.push({ lat: lat, lng: lng, time: trip[i].time })
            }
          }
          // When all points for 1 trip are done, push them to FinalPoints Array
          console.log("Trip", k, "contains", locationPoint.length, "points.");
          FINALPOINTS.push(locationPoint);
          k++;
        }
        console.log("FINALPOINTS:", FINALPOINTS);

        // Now, all points of all trips are parsed and stored in FINALPOINTS array as trips
        // For each trip, break all points in batches of 100 points and call snap function
        var ALLTRIPS = [];
        var ans = [];
        var ORIGINALARRAY = [];
        // FINALPOINTS[FINALPOINTS.length] = chandivali;
        // FINALPOINTS[FINALPOINTS.length] = ghatkopar;
        console.log("Final", FINALPOINTS);
        for (var trip = 0; trip < FINALPOINTS.length; trip++) {
          breakInBatches(FINALPOINTS[trip], trip, function (callback, tripValue, originalIndexArray, array) {
            ALLTRIPS[tripValue] = callback;
            ORIGINALARRAY[tripValue] = originalIndexArray;
            ans.push(1);
            console.log("callback of breakInBatches", callback, tripValue, FINALPOINTS.length, ans);
            console.log('array', rawData);
            if (ans.length == FINALPOINTS.length)
              console.log("Alltrips", ans, ALLTRIPS);


            calculateIndex(ORIGINALARRAY, rawData, function (callback2) {
              console.log("Response of calculateIndex:-", callback2);
              calculateSpeed(callback2, function (callback3) {
                console.log("Response of calculateSpeed:-", callback3);
                drawPolyline(ALLTRIPS, callback3, function (callback1) {
                  console.log("Drawn all trips...!");
                })
              })
            })
          })
        }
        console.log("ALLTRIPS", ALLTRIPS);

      });
    });


    function breakInBatches(array, trip, callback) {
      var SNAPTOROADRESPONSE = [];
      var lengthOfArray = array.length;
      total = Math.ceil(lengthOfArray / 100);              // no of batches
      console.log("In breakInBatches", trip, "total", total, array.length);
      count = 0;
      var batchNo = 0;
      var ans = [];
      // Divide array in batch of 100 points
      for (var i = 0; i < lengthOfArray; i = i + 100, batchNo++) {
        var j = i;  //lower limit
        var max = j + 100;  // upper limit
        if (max < lengthOfArray) {
          // For each batch of 100 points
          var batch = array.slice(j, max);  // slice out 100 points
          console.log("Batch size:", batch.length, "j=", j, "max=", max);
          snapToRoad(batch, trip, batchNo, function (data, tripV, batchNo1) {
            SNAPTOROADRESPONSE[batchNo1] = data;
            ans.push(1);
            console.log("DATA after snapToRoad", tripV, batchNo1, ans);
            // SNAPTOROADRESPONSE.push(data);
            if (ans.length == total && SNAPTOROADRESPONSE.length == total)
              processSnapToRoadResponse(SNAPTOROADRESPONSE, tripV, function (cb1, tripValue, originalArr) {
                console.log('processSnapToRoadResponse ', cb1, tripValue, 'original if', originalArr);
                callback(cb1, tripValue, originalArr, array);
              })
          })
        }
        else {
          // for the remaining batch of less than 100 points
          max = array.length                // change max to the last point
          var batch = array.slice(j, max);
          console.log("Batch size:", batch.length, "j=", j, "max=", max);
          snapToRoad(batch, trip, batchNo, function (data, tripV, batchNo1) {
            console.log("DATA after snapToRoad", tripV, batchNo1);
            ans.push(1);
            // SNAPTOROADRESPONSE.push(data);
            SNAPTOROADRESPONSE[batchNo1] = data;
            console.log("SNAPTOROADRESPONSE", tripV, SNAPTOROADRESPONSE, ans, "total", total);
            if (ans.length == total && SNAPTOROADRESPONSE.length == total)
              processSnapToRoadResponse(SNAPTOROADRESPONSE, tripV, function (cb1, tripValue, originalArr) {
                console.log('processSnapToRoadResponse with original Arr', cb1, tripValue, 'original else', originalArr);
                callback(cb1, tripValue, originalArr, array);
              })
          })
        }
      }
    }

    function snapToRoad(pathValues, k, batchNo, callback) {
      $.get('https://roads.googleapis.com/v1/snapToRoads', {
        interpolate: true,
        key: 'AIzaSyD9wVtupL4tqSA_K5Sg7knttR0FSM7pHsw',
        path: pathValues.join('|')
      }, function (data) {
        console.log('data in snapToRoad', k, data, Date.now());
        callback(data, k, batchNo);
      })
    }

    function processSnapToRoadResponse(data, trip, callback) {
      console.log("Data in processSnapToRoadResponse, DATA after snapToRoad", data, trip);
      var snappedCoordinates = [];
      var originalIndexArr = data
      var k = 0;
      while (k < data.length) {
        for (var i = 0; i < data[k].snappedPoints.length; i++) {
          var latlngs = new google.maps.LatLng(
            data[k].snappedPoints[i].location.latitude,
            data[k].snappedPoints[i].location.longitude)
          snappedCoordinates.push(latlngs)
          // originalIndexArr.push(data[k])
        }
        k++;
        console.log("Data in processSnapToRoadResponse k,", k, trip);
      }
      console.log("processSnapToRoadResponse snappedCoordinates", trip, snappedCoordinates, 'original', originalIndexArr);
      callback(snappedCoordinates, trip, originalIndexArr);
    }

    function sendTwoPointsToDraw(tripArray, callback) {
      for (var trip = 0; trip < tripArray.length; trip++) {
        for (var i = 0; i < tripArray[i].length - 1; i += 2) {

        }
      }
    }

    function drawPolyline(tripArray, speedTime, callback) {
      console.log("Total trips to draw:-", tripArray, speedTime);

      for (var trip = 0; trip < tripArray.length; trip++) {
        var snappedPolyline;
        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 1,
          strokeColor: 'white',
          strokeWeight: 2
        };

        snappedPolyline = new google.maps.Polyline({
          path: tripArray[trip],
          icons: [{
            icon: lineSymbol,
            repeat: '90px',
            offset: '50%'
          }],

          strokeColor: '#6495ed',
          strokeWeight: 5
        })
        // code for marker which shows speed and time
        for (var i = 1; i < speedTime.length; i++) {
          var latlng = { lat: parseFloat(speedTime[i].lat), lng: parseFloat(speedTime[i].lng) }
          var markerStart = new google.maps.Marker({
            map: $scope.map,
            position: latlng,
            icon: '../images/rec.png',
            title: 'speed: ' + parseFloat(speedTime[i].speed).toFixed(2) + 'km/hr \nat ' + new Date(speedTime[i].time).toLocaleTimeString() + ',' + new Date(speedTime[i].time).toLocaleDateString()
          })
        }

        snappedPolyline.setMap($scope.map);
      }

      // $scope.map.setCenter(snappedCoordinates[5])
      // snappedPolyline.setMap($scope.map)
      $scope.map.setZoom(11)
    }

    function calculateIndex(array, rawData, callback) {
      // Array contains snappedCoordinates of all batches with 0-100 index
      // console.log("Calculating Index for array:-",array[0],'raw',rawData);
      var array = array[0];
      var pointsArray = []
      var oi = 0, count = 0;
      for (var batch = 0; batch < array.length; batch++) {
        console.log("index", array[batch]);
        var snappedPoints = array[batch].snappedPoints
        for (var i = 0; i < snappedPoints.length; i++) {
          if (snappedPoints[i].originalIndex || snappedPoints[i].originalIndex == 0) {
            // console.log("Contains original Index:", batch, i, array[batch].snappedPoints[i].originalIndex);
            // array[batch].snappedPoints[i].originalIndex += batch * 100;
            // array[batch].snappedPoints[i].time = Date.parse(rawData[array[batch].snappedPoints[i].originalIndex].time)
            pointsArray.push({
              originalIndex: count,
              index: oi++,
              lat: snappedPoints[i].location.latitude,
              lng: snappedPoints[i].location.longitude,
              time: Date.parse(rawData[array[batch].snappedPoints[i].originalIndex].time)
            })
            // console.log("Index after calculation:", batch, i, array[batch].snappedPoints[i].originalIndex);
          }
          count++;
        }
      }
      callback(pointsArray);
    }

    function calculateSpeed(array, callback) {
      console.log('calculateSpeed final array', array);
      geolib.getSpeed(array).then(function (res) {
        console.log('speed array', res);
        callback(res)
      })
    }
  }])
  .controller('pathReplaySpeedCtrl', ['$scope', '$stateParams', '$q', 'geolibgps', function ($scope, $stateParams, $q, geolib) {
    // Initialize map and fetch datapoints from csv file
    $(document).ready(function () {

      $('body').addClass('loaded');
      var initMap = function () {
        $scope.map = new google.maps.Map(document.getElementById('map-originalSpeed'), {
          zoom: 10,
          center: { lat: 19.128532, lng: 72.914302 }
        });
      }
      initMap();

      $.getJSON("js/dataGps.json", function (data) {
        //*************************
        // Fetched datapoints in JSON format, convert lat, long and push in array
        //   var locationPoint = [];
        //     for (var i = 0; i < data.length-1; i=i+2) {
        //       // console.log('i',data[i],'i+1',data[i+1]);
        //       if (Date.parse(data[i+1].time) == Date.parse(data[i].time)) {
        //         var latStr = ''+data[i].value+''
        //         var lngStr = ''+data[i+1].value+''
        //       var lat =  parseFloat(latStr.slice(0,2)) + (parseFloat(latStr.slice(2,9))/60)
        //       var lng = parseFloat(lngStr.slice(0,2)) + (parseFloat(lngStr.slice(2,9))/60)
        //       locationPoint.push({lat:lat,lng:lng})
        //         // latlng.push(""+lat+","+lng)
        //       }
        //     }
        //     console.log("locationPoint", locationPoint);
        //     var flightPath = new google.maps.Polyline({
        //       path: locationPoint,
        //       geodesic: true,
        //       strokeColor: '#FF0000',
        //       strokeOpacity: 1.0,
        //       strokeWeight: 2
        //     });
        //     flightPath.setMap($scope.map)
        // });
        //***********************
        var chandivali = ["19.112470534739103,72.88860028896761", "19.112571909084227,72.88909381542635", "19.11281520725892,72.88965171490145", "19.113017955464368,72.88997357998323", "19.11330180253428,72.89044564876986", "19.113585649116896,72.89087480221224", "19.113788396377565,72.89119666729403", "19.11407224212479,72.89158290539217", "19.114234439475847,72.89241975460482", "19.11476157976777,72.8929561964078", "19.115025149283433,72.8929561964078", "19.115633385023514,72.89302056942415", "19.1159983253934,72.89302056942415", "19.116789026764337,72.89289182339144"]
        // var elevation = new google.maps.ElevationService()
        //  elevation.getElevationAlongPath(chandivali, function(res, ElevationStatus){
        //   console.log('res elevation',res);
        // })
        var ghatkopar = ["19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837", "19.104149168510137,72.88654417260352", "19.10325702670634,72.88568586571876", "19.102364880091315,72.88491338952247", "19.100175045275794,72.88379759057227", "19.099120670027688,72.88336843712989", "19.098147394604634,72.88328260644141", "19.097255220438058,72.88388342126075", "19.09644414883998,72.88345426781837"]
        // Fetched datapoints in JSON format, convert lat, long and push in array
        // data = [[{},{},...], [{},{},...],...]
        // console.log("Data contains", data.length, "trips!");
        var FINALPOINTS = [];
        var rawData = []
        var k = 0;
        // For each trip
        while (k < data.length) {
          // Parse lat, lng
          var locationPoint = [];
          var trip = data[k];
          for (var i = 0; i < trip.length - 1; i = i + 2) {
            if (Date.parse(trip[i + 1].time) == Date.parse(trip[i].time)) {
              var latStr = '' + trip[i].value + ''
              var lngStr = '' + trip[i + 1].value + ''
              var lat = parseFloat(latStr.slice(0, 2)) + (parseFloat(latStr.slice(2, 9)) / 60)
              var lng = parseFloat(lngStr.slice(0, 2)) + (parseFloat(lngStr.slice(2, 9)) / 60)
              locationPoint.push("" + lat + "," + lng + "");
              rawData.push({ lat: lat, lng: lng, time: Date.parse(trip[i].time) })
            }
          }
          // When all points for 1 trip are done, push them to FinalPoints Array
          // console.log("Trip",k,"contains", locationPoint.length,"points.");
          FINALPOINTS.push(locationPoint);
          k++;
        }
        // console.log("FINALPOINTS:", FINALPOINTS);

        // Now, all points of all trips are parsed and stored in FINALPOINTS array as trips
        // For each trip, break all points in batches of 100 points and call snap function
        var ALLTRIPS = [];
        var ans = [];
        var ORIGINALARRAY = [];
        // FINALPOINTS[FINALPOINTS.length] = chandivali;
        // FINALPOINTS[FINALPOINTS.length] = ghatkopar;
        // console.log("Final", FINALPOINTS);
        for (var trip = 0; trip < FINALPOINTS.length; trip++) {
          breakInBatches(FINALPOINTS[trip], trip, function (callback, tripValue, originalIndexArray, array) {
            ALLTRIPS[tripValue] = callback;
            ORIGINALARRAY[tripValue] = originalIndexArray;
            ans.push(1);
            // console.log("callback of breakInBatches", callback, tripValue, FINALPOINTS.length, ans);
            // console.log('array',rawData);
            if (ans.length == FINALPOINTS.length)
              // console.log("Alltrips",ans, ALLTRIPS);


              calculateIndex(ORIGINALARRAY, rawData, function (callback2, orgIndexArr) {
                // console.log("Response of calculateIndex:-", callback2, 'original',ORIGINALARRAY);
                calculateSpeed(callback2, orgIndexArr, function (callback3, orgArr) {
                  // console.log("Response of calculateSpeed:-", callback3);
                  drawPolyline(ALLTRIPS, callback3, orgArr, function (callback1) {
                    // console.log("Drawn all trips...!");
                    var TravelMarker = travelMarker.TravelMarker;
                    speedMultiplier = 1;
                    // initialize travel marker
                    var route = callback1.getPath().b;
                    // options
                    // console.log('route',route);
                    var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
                    var icon = {
                      path: car,
                      scale: .7,
                      strokeColor: 'black',
                      strokeWeight: .10,
                      fillOpacity: 1,
                      fillColor: '#1ab394',
                      // offset: '5%',
                      // rotation: parseInt((Math.random()*1000)%360),
                      // rotation: 101,
                      // anchor: new google.maps.Point(0,0) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
                    };
                    var options = {
                      map: $scope.map,  // map object
                      speed: 150, // default 10 , animation speed
                      interval: 5, //default 10, marker refresh time
                      speedMultiplier: speedMultiplier,
                      markerOptions: {
                        title: 'Travel Marker',
                        animation: google.maps.Animation.DROP,
                        icon: icon,
                        // {
                        //   url: '../images/car_top.svg',
                        //   // 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/glossy-black-comment-bubbles-icons-transport-travel/038354-glossy-black-comment-bubble-icon-transport-travel-transportation-truck1.png',
                        //   animation: google.maps.Animation.DROP,
                        //   // This marker is 20 pixels wide by 32 pixels high.
                        //   // size: new google.maps.Size(256, 256),
                        //   scaledSize: new google.maps.Size(128, 128),
                        //   // The origin for this image is (0, 0).
                        //   origin: new google.maps.Point(0, 0),
                        //   // The anchor for this image is the base of the flagpole at (0, 32).
                        //   anchor: new google.maps.Point(53, 110)
                        // }
                      },
                      cameraOnMarker: true
                    };

                    // define marker
                    marker = new TravelMarker(options);

                    // add locations from direction service
                    marker.addLocation(route);
                    //  var heading = google.maps.geometry.spherical.computeHeading(lastPosn,p);
                    // icon.rotation = heading;
                    // marker.setIcon(icon);
                    // var mark;
                    // for (var i = 0; i < route.length; i++) {
                    //   mark = new google.maps.Marker({
                    //     position : route[i],
                    //     map: $scope.map,
                    //     label : ""+i+"",
                    //     title : ""+i+""
                    //   })
                    // }
                    setTimeout($scope.play, 2000);


                    // play animation
                    $scope.play = function () {
                      marker.play();
                    }

                    // pause animation
                    $scope.pause = function () {
                      marker.pause();
                    }

                    // reset animation
                    $scope.reset = function () {
                      marker.reset();
                    }

                    // jump to next location
                    $scope.next = function () {
                      marker.next();
                    }

                    // jump to previous location
                    $scope.prev = function () {
                      marker.prev();
                    }

                    // fast forward
                    $scope.fast = function () {
                      speedMultiplier *= 2;
                      document.getElementById('speed').innerHTML = 'Speed: ' + speedMultiplier + 'x';
                      marker.setSpeedMultiplier(speedMultiplier)
                    }

                    // slow motion
                    $scope.slow = function () {
                      speedMultiplier /= 2;
                      document.getElementById('speed').innerHTML = 'Speed: ' + speedMultiplier + 'x';
                      marker.setSpeedMultiplier(speedMultiplier)
                    }
                  })
                })
              })
          })
        }
        // console.log("ALLTRIPS",ALLTRIPS);

      });
    });


    function breakInBatches(array, trip, callback) {
      var SNAPTOROADRESPONSE = [];
      var lengthOfArray = array.length;
      total = Math.ceil(lengthOfArray / 100);              // no of batches
      // console.log("In breakInBatches", trip, "total", total, array.length);
      count = 0;
      var batchNo = 0;
      var ans = [];
      // Divide array in batch of 100 points
      for (var i = 0; i < lengthOfArray; i = i + 100, batchNo++) {
        var j = i;  //lower limit
        var max = j + 100;  // upper limit
        if (max < lengthOfArray) {
          // For each batch of 100 points
          var batch = array.slice(j, max);  // slice out 100 points
          // console.log("Batch size:",batch.length, "j=",j, "max=",max);
          snapToRoad(batch, trip, batchNo, function (data, tripV, batchNo1) {
            SNAPTOROADRESPONSE[batchNo1] = data;
            ans.push(1);
            // console.log("DATA after snapToRoad", tripV, batchNo1, ans);
            // SNAPTOROADRESPONSE.push(data);
            if (ans.length == total && SNAPTOROADRESPONSE.length == total)
              processSnapToRoadResponse(SNAPTOROADRESPONSE, tripV, function (cb1, tripValue, originalArr) {
                // console.log('processSnapToRoadResponse ', cb1, tripValue, 'original if', originalArr);
                callback(cb1, tripValue, originalArr, array);
              })
          })
        }
        else {
          // for the remaining batch of less than 100 points
          max = array.length                // change max to the last point
          var batch = array.slice(j, max);
          // console.log("Batch size:",batch.length, "j=",j, "max=",max);
          snapToRoad(batch, trip, batchNo, function (data, tripV, batchNo1) {
            // console.log("DATA after snapToRoad", tripV, batchNo1);
            ans.push(1);
            // SNAPTOROADRESPONSE.push(data);
            SNAPTOROADRESPONSE[batchNo1] = data;
            // console.log("SNAPTOROADRESPONSE", tripV, SNAPTOROADRESPONSE, ans, "total", total);
            if (ans.length == total && SNAPTOROADRESPONSE.length == total)
              processSnapToRoadResponse(SNAPTOROADRESPONSE, tripV, function (cb1, tripValue, originalArr) {
                // console.log('processSnapToRoadResponse with original Arr', cb1, tripValue, 'original else', originalArr);
                callback(cb1, tripValue, originalArr, array);
              })
          })
        }
      }
    }

    function snapToRoad(pathValues, k, batchNo, callback) {
      $.get('https://roads.googleapis.com/v1/snapToRoads', {
        interpolate: true,
        key: 'AIzaSyD9wVtupL4tqSA_K5Sg7knttR0FSM7pHsw',
        path: pathValues.join('|')
      }, function (data) {
        // console.log('data in snapToRoad',k, data, Date.now());
        callback(data, k, batchNo);
      })
    }

    function processSnapToRoadResponse(data, trip, callback) {
      // console.log("Data in processSnapToRoadResponse, DATA after snapToRoad", data, trip);
      var snappedCoordinates = [];
      var originalIndexArr = data
      var k = 0;
      while (k < data.length) {
        for (var i = 0; i < data[k].snappedPoints.length - 1; i++) {
          var latlngs = new google.maps.LatLng(
            data[k].snappedPoints[i].location.latitude,
            data[k].snappedPoints[i].location.longitude)
          snappedCoordinates.push(latlngs)
          // originalIndexArr.push(data[k])
        }
        k++;
        // console.log("Data in processSnapToRoadResponse k,",k, trip);
      }
      // console.log("processSnapToRoadResponse snappedCoordinates",trip, snappedCoordinates,'original',originalIndexArr);
      callback(snappedCoordinates, trip, originalIndexArr);
    }

    function sendTwoPointsToDraw(tripArray, callback) {
      for (var trip = 0; trip < tripArray.length; trip++) {
        for (var i = 0; i < tripArray[i].length - 1; i += 2) {

        }
      }
    }

    function drawPolyline(tripArray, speedTime, orgIndexArr, callback) {
      // console.log("Total trips to draw:-", tripArray.length);
      // console.log('speed',speedTime,'org',orgIndexArr);
      for (var trip = 0; trip < tripArray.length; trip++) {
        var snappedPolyline;
        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 1,
          strokeColor: 'white',
          strokeWeight: 2
        };

        snappedPolyline = new google.maps.Polyline({
          path: tripArray[0],
          icons: [{
            icon: lineSymbol,
            repeat: '90px',
            offset: '50%'
          }],

          strokeColor: '#6495ed',
          strokeWeight: 5
        })
        // code for marker which shows speed and time
        for (var i = 0; i < orgIndexArr.length - 1; i++) {
          var latlng = { lat: parseFloat(orgIndexArr[i].lat), lng: parseFloat(orgIndexArr[i].lng) }
          var markerStart = new google.maps.Marker({
            map: $scope.map,
            position: latlng,
            icon: '../images/rec.png',
            title: 'speed: ' + parseFloat(speedTime[orgIndexArr[i].originalIndex].speed).toFixed(2) + 'km/hr \nat ' + new Date(speedTime[orgIndexArr[i].originalIndex].time).toLocaleTimeString() + ',' + new Date(speedTime[i].time).toLocaleDateString()
          })
        }

        snappedPolyline.setMap($scope.map);


      }

      // $scope.map.setCenter(snappedCoordinates[5])
      // snappedPolyline.setMap($scope.map)
      $scope.map.setZoom(13)
      callback(snappedPolyline)
    }

    function calculateIndex(array, rawData, callback) {
      // Array contains snappedCoordinates of all batches with 0-100 index
      // console.log("Calculating Index for array:-",array,'raw',rawData);
      var array = array[0];
      // var array = array[0];
      var pointsArray = []
      var oi = 0, count = 0;
      for (var batch = 0; batch < array.length; batch++) {
        // console.log("index",array[batch]);
        var snappedPoints = array[batch].snappedPoints
        for (var i = 0; i < snappedPoints.length; i++) {
          if (snappedPoints[i].originalIndex || snappedPoints[i].originalIndex == 0) {
            // console.log("Contains original Index:", batch, i, array[batch].snappedPoints[i].originalIndex);
            // array[batch].snappedPoints[i].originalIndex += batch * 100;
            // array[batch].snappedPoints[i].time = Date.parse(rawData[array[batch].snappedPoints[i].originalIndex].time)
            pointsArray.push({
              originalIndex: (snappedPoints[i].originalIndex) + (batch * 100),
              index: oi++,
              lat: snappedPoints[i].location.latitude,
              lng: snappedPoints[i].location.longitude,
              time: Date.parse(rawData[array[batch].snappedPoints[i].originalIndex].time)
            })
            // console.log("Index after calculation:", batch, i, array[batch].snappedPoints[i].originalIndex);
          }
          count++;
        }
      }
      // var pointsArray = rawData
      callback(rawData, pointsArray);
    }

    function calculateSpeed(array, orgindexArr, callback) {
      // console.log('calculateSpeed final array',array);
      geolib.speedOriginalPoints(array).then(function (res) {
        // console.log('speed array',res);
        callback(res, orgindexArr)
      })
    }
  }])
  .controller('pathReplayCtrl', ['$scope', '$stateParams',
      function ($scope, $stateParams) {
  
  }])
  .controller('geocodingCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
      $(document).ready(function () {
        $('body').addClass('loaded');
        geocoding()
        reverseGeocoding()
      });
      var geocoding = function () {
        var map = new google.maps.Map(document.getElementById('map-geocodeing'), {
          zoom: 4,
          center: { lat: 19.354, lng: 72.245164 }
        });
        var geocoder = new google.maps.Geocoder();
        var marker = new google.maps.Marker();
        var infowindow1 = new google.maps.InfoWindow;
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'))
        // autocomplete.bindTo('bounds',)
        document.getElementById('submit').addEventListener('click', function () {
          marker.setVisible(false)
          geocodeAddress(geocoder, map, infowindow1, marker);
        });
      }

      var geocodeAddress = function (geocoder, resultsMap, infowindow1, marker) {
        var address = document.getElementById('address').value;
        geocoder.geocode({ 'address': address }, function (results, status) {
          if (status === 'OK') {
            console.log('latlng', results[0].geometry.location.lat());

            resultsMap.setZoom(11)
            resultsMap.setCenter(results[0].geometry.location);
            //  marker = new google.maps.Marker({
            //   map: resultsMap,
            //   position: results[0].geometry.location
            // });
            marker.setPosition(results[0].geometry.location)
            marker.setMap(resultsMap);
            marker.setVisible(true)
            infowindow1.setContent('latitude : ' + results[0].geometry.location.lat() + '<br> longitude :' + results[0].geometry.location.lng());
            infowindow1.open(resultsMap, marker);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
      var reverseGeocoding = function () {
        var map = new google.maps.Map(document.getElementById('map-reverseGeocoding'), {
          zoom: 4,
          center: { lat: 19.354, lng: 72.245164 }
        });
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        document.getElementById('submit_reverse').addEventListener('click', function () {
          geocodeLatLng(geocoder, map, infowindow);
        });
      }

      var geocodeLatLng = function (geocoder, map, infowindow) {
        var input = document.getElementById('latlng').value;
        var latlngStr = input.split(',', 2);
        var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(11);
              map.setCenter(latlng)
              console.log('latlng', latlng);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

    }])

  .controller('geofenceCtrl', ['$scope', '$stateParams', '$window',
    function ($scope, $stateParams, $window) {
      $(document).ready(function () {
        $('body').addClass('loaded');
        // var map = new google.maps.Map(document.getElementById('map-geofence'), {
        //   zoom: 3,
        //   center: {lat: 19.5465, lng: 72.012498}
        // });
        $scope.map = new GMaps({
          el: '#map-geofence',
          zoom: 3,
          lat: 19.5465,
          lng: 72.012498
        });
      });
      if ($window.localStorage['overlays']) {
        $scope.getFences = $window.localStorage['overlays']
        $scope.getFences = JSON.parse($scope.getFences)
      }
      console.log($scope.getFences);
      $scope.applyFence = function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == 'circle') {
            drawCircle(data[i])
          } else if (data[i].type == 'rectangle') {
            drawRectangle(data[i])
          } else if (data[i].type == 'polygon') {
            drawpolygon(data[i])
          }
        }
      }
      var drawCircle = function (data) {
        console.log('data', data);
        $scope.map.panTo(new google.maps.LatLng(data.center.lat, data.center.lng))
        $scope.map.setZoom(6)
        console.log('called');
        var circle = $scope.map.drawCircle({
          lat: data.center.lat,
          lng: data.center.lng,
          radius: data.radius,
          strokeColor: '#432070',
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: '#432070',
          fillOpacity: 0.6
        });
        var marker = $scope.map.addMarker({
          lat: data.center.lat,
          lng: data.center.lng,
          draggable: true
          // fences: [circle],
          // outside: function(m, f){
          //   alert('This marker has been moved outside of its fence');
          // }
        });
        google.maps.event.addListener(marker, 'drag', function (event) {
          console.log('drag', this.position);
          // document.getElementById('lat').value = this.position.lat();
          // document.getElementById('lng').value = this.position.lng();
          //alert('drag');
        });


        google.maps.event.addListener(marker, 'dragend', function (event) {
          console.log('drag-endd', this.position);
          // document.getElementById('lat').value = this.position.lat();
          // document.getElementById('lng').value = this.position.lng();
          // alert('Drag end',this.position);
          var find = circle.contains(this.position)
          console.log('circle position', find);
          if (find) {
            // alert('inside the fence')
            Materialize.toast('Inside fence', 3000);
          } else {
            // alert('outside the fence')
            Materialize.toast('Outside fence', 3000);
          }
        });
        google.maps.Circle.prototype.contains = function (latLng) {
          console.log('center', google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng));
          return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
        }
        // var find = circle.contains(new google.maps.LatLng(data.center.lat, data.center.lng))
        // console.log('find',find);
      }
      var drawRectangle = function (data) {
        console.log('polygondata', data.bounds);
        var dataArray = [[data.bounds.south, data.bounds.west], [data.bounds.north, data.bounds.east]]
        var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(dataArray[0][0], dataArray[0][1]), new google.maps.LatLng(dataArray[1][0], dataArray[1][1]));
        console.log('center', (bounds.getCenter()).lat());
        $scope.map.panTo(bounds.getCenter())
        $scope.map.setZoom(6)
        var rectangle = $scope.map.drawRectangle({
          bounds: dataArray
        });
        var contentString = '<div id="content">' + +
          '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = $scope.map.addMarker({
          lat: (bounds.getCenter()).lat(),
          lng: (bounds.getCenter()).lng(),
          draggable: true
          // fences: [rectangle],
          // outside: function(m, f){
          //   alert('This marker has been moved outside of its fence');
          // }
        });
        marker.addListener('click', function () {
          infowindow.open(map, marker);
        });
        var check_is_in_or_out = function (marker) {
          var insideRectangle = false;
          if (rectangle && rectangle.getBounds && marker && marker.getPosition())
            insideRectangle = rectangle.getBounds().contains(marker.getPosition());

          return insideRectangle;
        }
        console.log('rect', check_is_in_or_out(marker));
      }
      var drawpolygon = function (data) {
        console.log('polygondata', data.points);
        var bounds = new google.maps.LatLngBounds();
        var dataArray = []
        for (var i = 0; i < data.points.length; i++) {
          console.log(data.points[i]);
          dataArray.push([data.points[i].lat, data.points[i].lng])
          bounds.extend(new google.maps.LatLng(data.points[i].lat, data.points[i].lng))
        }
        console.log('center', (bounds.getCenter()).lat());
        $scope.map.panTo(bounds.getCenter())
        $scope.map.setZoom(6)
        var polygon = $scope.map.drawPolygon({
          paths: dataArray,
          strokeColor: '#BBD8E9',
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: '#BBD8E9',
          fillOpacity: 0.6
        });
        var marker = $scope.map.addMarker({
          lat: (bounds.getCenter()).lat(),
          lng: (bounds.getCenter()).lng(),
          draggable: true
          // fences: [polygon],
          // outside: function(m, f){
          //   alert('This marker has been moved outside of its fence');
          // }
        });
        google.maps.event.addListener(marker, 'drag', function (event) {
          console.log('drag', this.position);
          // document.getElementById('lat').value = this.position.lat();
          // document.getElementById('lng').value = this.position.lng();
          //alert('drag');
        });


        google.maps.event.addListener(marker, 'dragend', function (event) {
          console.log('drag-endd', this.position);
          // document.getElementById('lat').value = this.position.lat();
          // document.getElementById('lng').value = this.position.lng();
          // alert('Drag end',this.position);
          // var isWithinPolygon = polygon.containsLatLng(this.position.lat(),this.position.lng());
          var isWithinPolygon = google.maps.geometry.poly.containsLocation(event.latLng, polygon)
          console.log('polygon position', isWithinPolygon);
          if (isWithinPolygon) {
            // alert('inside the fence')
            Materialize.toast('Inside fence', 2000);

          } else {
            // alert('outside the fence')
            Materialize.toast('Outside fence', 2000);

          }
        });

        // to check whether the point is in the fence or not, function is in source file "maps.google.polygon.containsLatLng.js" in js folder
        // var isWithinPolygon = polygon.containsLatLng((bounds.getCenter()).lat(),(bounds.getCenter()).lng());
        // console.log('polygon position',isWithinPolygon);
        // if (isWithinPolygon) {
        //   alert('inside the fence')
        // }else {
        //   alert('outside the fence')
        // }
      }
    }])


  .controller('addGeofenceCtrl', ['$scope', '$stateParams', '$window', '$state',
    function ($scope, $stateParams, $window, $state) {
      $scope.fence = []
      $scope.title = ''
      $scope.titleError = false
      $(document).ready(function () {
        // addfenceMap()
        $('.modal').modal({
          dismissible: true, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          inDuration: 300, // Transition in duration
          outDuration: 200, // Transition out duration
          startingTop: '4%', // Starting top style attribute
          endingTop: '10%', // Ending top style attribute
          // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
          //   alert("Ready");
          //   console.log(modal, trigger);
          // },
          complete: function () { } // Callback for Modal close
        }
        );

        $('body').addClass('loaded');
        //add fence map initlizing function call
        $scope.addfenceMap()
      });
      $scope.addfenceMap = function () {
        var all_overlays = [];
        console.log('feel');
        // $scope.title = ''
        console.log('feel 1 level');
        // navigator.geolocation.getCurrentPosition(function(position) {

        map = new google.maps.Map(document.getElementById('map-addGeofence'), {
          center: {
            lat: 20.5937,        //position.coords.latitude,
            lng: 78.9629       //position.coords.longitude
          },
          zoom: 5
        });
        // var bounds = {
        //   north: 22.40924223271238,
        //   south: 23.501779978613037,
        //   east: 78.19385703124999,
        //   west: 81.13819296874999
        // };
        // var bounds = {
        //   north: 23.501779978613037,
        //   south: 22.40924223271238,
        //   east: 81.13819296874999,
        //   west: 78.19385703124999
        // };
        // var rectangle = new google.maps.Rectangle({
        //   map: map,
        //   bounds:bounds
        // });
        var selectedShape;
        var drawingManager = new google.maps.drawing.DrawingManager({
          // drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              //google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.RECTANGLE,
              google.maps.drawing.OverlayType.POLYLINE
            ]
          },
          // markerOptions: {
          //     icon: 'images/beachflag.png'
          // },
          circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 0.2,
            strokeWeight: 3,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          polygonOptions: {
            clickable: true,
            draggable: true,
            editable: true,
            fillColor: '#ffff00',
            fillOpacity: 1,

          },
          rectangleOptions: {
            clickable: true,
            draggable: true,
            editable: true,
            fillColor: '#ffff00',
            fillOpacity: 0.5,
          },
          polylineOptions: {
            strokeColor: '#696969',
            strokeWeight: 2
          }
        });

        function clearSelection() {
          if (selectedShape) {
            selectedShape.setEditable(false);
            selectedShape = null;
          }
        }

        function setSelection(shape) {
          clearSelection();
          selectedShape = shape;
          shape.setEditable(true);
          // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
          // google.maps.event.addListener(selectedShape.getPath(), 'set_at', getPolygonCoords(shape));
        }
        //
        function deleteSelectedShape() {
          console.log('shape to delete', selectedShape, 'all', all_overlays);
          if (selectedShape) {
            for (var i = 0; i < all_overlays.length; i++) {
              var shape = _.isEqual(all_overlays[i].overlay, selectedShape)
              console.log('shape of u', shape);
              if (shape === true) {
                all_overlays.splice(i, 1)
                console.log('shape to delete', selectedShape, 'all', all_overlays);
                break;
              }
            }
            selectedShape.setMap(null);
          }
        }

        $scope.deleteAllShape = function () {
          for (var i = 0; i < all_overlays.length; i++) {
            all_overlays[i].overlay.setMap(null);
          }
          all_overlays = [];
          $window.localStorage['overlays'] = []
        }

        function CenterControl(controlDiv, map) {

          // Set CSS for the control border.
          var controlUI = document.createElement('div');
          controlUI.style.backgroundColor = '#fff';
          controlUI.style.border = '2px solid #fff';
          controlUI.style.borderRadius = '3px';
          controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
          controlUI.style.cursor = 'pointer';
          controlUI.style.marginBottom = '22px';
          controlUI.style.textAlign = 'center';
          controlUI.title = 'Select to delete the shape';
          controlDiv.appendChild(controlUI);

          // Set CSS for the control interior.
          var controlText = document.createElement('div');
          controlText.style.color = 'rgb(25,25,25)';
          controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
          controlText.style.fontSize = '16px';
          controlText.style.lineHeight = '38px';
          controlText.style.paddingLeft = '5px';
          controlText.style.paddingRight = '5px';
          controlText.innerHTML = 'Delete Selected Area';
          controlUI.appendChild(controlText);

          // Setup the click event listeners: simply set the map to Chicago.
          controlUI.addEventListener('click', function () {
            deleteSelectedShape();
          });

        }
        drawingManager.setMap(map);
        var getPolygonCoords = function (newShape) {
          console.log("We are one");
          var len = newShape.getPath().getLength();
          for (var i = 0; i < len; i++) {
            console.log('path', newShape.getPath().getAt(i).toUrlValue(6));
          }
        };
        var polylines = []
        var pointsLoc = []
        drawingManager.addListener('polylinecomplete', function (poly) {
          var path = poly.getPath();
          polylines.push(path);
          console.log('polyline', polylines);
          for (var i = 0; i < polylines[0].b.length; i++) {
            pointsLoc.push("" + polylines[0].b[i].lat() + "," + polylines[0].b[i].lng() + "")
          }
          console.log('locations', pointsLoc);
          // placeIdArray = [];
          // runSnapToRoad(path);
        });
        google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
          console.log('complete');
          event.getPath().getLength();
          var len = event.getPath().getLength();
          for (var i = 0; i < len; i++) {
            console.log('insert_at', event.getPath().getAt(i).toUrlValue(5));
          }
          google.maps.event.addListener(event.getPath(), 'insert_at', function () {
            var len = event.getPath().getLength();
            for (var i = 0; i < len; i++) {
              console.log('insert_at', event.getPath().getAt(i).toUrlValue(5));
            }
          });
          google.maps.event.addListener(event.getPath(), 'set_at', function () {
            var len = event.getPath().getLength();
            for (var i = 0; i < len; i++) {
              // console.log('set_at',event.getPath().getAt(i).toUrlValue(5));
            }
          });
        });
        var circle;
        google.maps.event.addListener(drawingManager, 'circlecomplete', function (shape) {
          google.maps.event.addListener(shape, 'radius_changed', function () {
            console.log('radius', shape.getRadius());
          });
          google.maps.event.addListener(shape, 'center_changed', function () {
            var loc = shape.getCenter()
            console.log('center', loc.lat(), 'all_overlays', all_overlays);
          });
          if (shape == null || (!(shape instanceof google.maps.Circle))) return;
          circle = shape;
          // console.log('radius', circle.getRadius());
          // console.log('lat', circle.getCenter().lat());
          // console.log('lng', circle.getCenter().lng());
        });


        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
          all_overlays.push(event);

          if (event.type !== google.maps.drawing.OverlayType.MARKER) {
            drawingManager.setDrawingMode(null);
            //Write code to select the newly selected object.

            var newShape = event.overlay;
            newShape.type = event.type;
            google.maps.event.addListener(newShape, 'click', function () {
              setSelection(newShape);
            });

            setSelection(newShape);
          }
          // console.log('all_overlays',all_overlays);
        });


        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
        // });
        $scope.addFences = function () {
          var fenceObj = {}
          if (all_overlays.length > 0) {
            console.log('length is greater', all_overlays.length);
            for (var i = 0; i < all_overlays.length; i++) {
              if (all_overlays[i].type == 'circle') {
                fenceObj = {
                  type: all_overlays[i].type,
                  radius: all_overlays[i].overlay.radius,
                  center: all_overlays[i].overlay.center,
                }
                $scope.fence.push(fenceObj)
              } else if (all_overlays[i].type == 'polygon') {
                console.log(all_overlays[i].overlay.latLngs.b[0].b);
                fenceObj = {
                  type: all_overlays[i].type,
                  points: all_overlays[i].overlay.latLngs.b[0].b
                }
                $scope.fence.push(fenceObj)
              } else if (all_overlays[i].type == 'rectangle') {
                console.log(all_overlays[i].overlay.bounds.f.b, all_overlays[i].overlay.bounds.b.b, all_overlays[i].overlay.bounds.f.f, all_overlays[i].overlay.bounds.b.f);
                fenceObj = {
                  type: all_overlays[i].type,
                  bounds: {
                    north: all_overlays[i].overlay.bounds.f.f,
                    south: all_overlays[i].overlay.bounds.f.b,
                    east: all_overlays[i].overlay.bounds.b.f,
                    west: all_overlays[i].overlay.bounds.b.b
                  }
                }
                $scope.fence.push(fenceObj)
                console.log('fenceObj', $scope.fence);
              }
            }
            $('#modal1').modal('open');
          } else {
            alert('Draw a shape of fence in map')
          }
        }
        $scope.addFenceDone = function () {
          var localArray = []
          if ($scope.title == '') {
            $scope.titleError = true
          } else {
            var fenceToStore = {
              title: $scope.title,
              data: $scope.fence
            }
            localArray.push(fenceToStore)
            console.log(fenceToStore);
            $window.localStorage['overlays'] = JSON.stringify(localArray)
            $('#modal1').modal('close');
            // addfenceMap()
            $state.go('geofence')
          }
        }
        $scope.getFences = function () {
          var fences = $window.localStorage['overlays']
          fenecs = JSON.parse(fences)
          console.log('overlays', fenecs);
        }
      }
      // addfenceMap()
    }])
  .controller('ModalResultInstanceCtrl', function ($scope) {
    console.log('instance ctrl');
  })
