// add controllers
var myApp = angular.module('myApp', []);

myApp.controller('makeController', function($scope, $http) {
  $scope.getModels = function(make) {
    console.log(make);
    $http({
    method: 'GET',
    url: '/api/models/'+make
  }).then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.models = response.data.models;

    });
  };
  $scope.getYears = function(make, model) {
    $http({
    method: 'GET',
    url: '/api/years/'+make+'/'+model
  }).then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.years = response.data.years;

    });
  };
  $scope.getOptions = function(make, model, year) {
    $http({
    method: 'GET',
    url: '/api/options/'+make+'/'+model+'/'+year
  }).then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.options = response.data.styles;

    });
  };
$http({
  method: 'GET',
  url: '/api/makes'
  }).then(function(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.makes = response.data.makes;

  });
});
