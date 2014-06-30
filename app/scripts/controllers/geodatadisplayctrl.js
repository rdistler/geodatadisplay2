'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplay
  .controller('GeoDataDisplayCtrl', ['$scope', 'dataSetRepository', function ($scope, dataSetRepository) {
  	console.log('Scope for GeoDataDisplayCtrl');
  	console.dir($scope);
  	console.log('dataSetRepository');
  	console.dir(dataSetRepository);
    $scope.comment ="This is the geodatadisplaycontroller";
    $scope.datasets = dataSetRepository.datasets;

    this.dataSetRepository = dataSetRepository;

  }]);
