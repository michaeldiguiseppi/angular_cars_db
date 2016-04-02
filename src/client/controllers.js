// add controllers
var myApp = angular.module('myApp', []);

myApp.controller('yearController', function($scope, $http) {
  $http({
  method: 'GET',
  url: '/api/years'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.years = response.data.years;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response);
  });
});

myApp.controller('makeController', function($scope, $http) {
  $scope.getMakes = function(year) {
    console.log(year);
    $http({
      method: 'GET',
      url: '/api/years/' + year,
    }).then(function successCallback(response) {
      console.log(response);
      // $scope.makes = response.data.makes;
    }, function errorCallback(response) {
      console.log(response);
    });
  };
});

// app.controller('StatesController',function($scope, stateFactory){
//     stateFactory.get('states.json').then(function(data){
//         $scope.models=data.models;
//
//     });
//     $scope.name="";
// });
