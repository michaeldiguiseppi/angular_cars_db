// add controllers
var myApp = angular.module('myApp', []);

myApp.controller('makeController', function($scope, $http) {
  $scope.getModels = function(make) {
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
  $scope.getStockPhoto = function(make, model, year) {
    $http({
      method: 'GET',
      url: '/api/photos/'+make+'/'+model+'/'+year
    }).then(function(response) {
      console.log('response!', response.data);
      $scope.photo = response.data;
    });
  };
  $scope.getSccaClasses = function() {
    $http({
      method: 'GET',
      url: '/api/scrape'
    }).then(function(response) {
      console.log(response);
      $scope.sccaClasses = response.data;
    });
  };

  $http({
    method: 'GET',
    url: '/api/makes'
    }).then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response.data.makes);
      $scope.makes = response.data.makes;

    });

});
