// add controllers
var myApp = angular.module('myApp', []);

myApp.controller('makeController', function($scope, $http) {
  $scope.photo = '';
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
      $scope.photo = response.data;
    });
  };
  $scope.getSccaClasses = function() {
    $http({
      method: 'GET',
      url: '/api/scrape'
    }).then(function(response) {
      $scope.sccaClasses = response.data;
    });
  };
  $scope.postCarToDb = function(body) {
    console.log(body);
    var make = body.make.$modelValue;
    var model = body.model.$modelValue;
    var year = body.year.$modelValue;
    var scca_class = body.scca_class.$modelValue;

    $http({
      method: 'POST',
      url: 'http://localhost:9000/cars',
      data: {
        make: make,
        model: model,
        year: year,
        scca_class: scca_class,
      },
    }).then(function(response) {
      console.log(response);
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
