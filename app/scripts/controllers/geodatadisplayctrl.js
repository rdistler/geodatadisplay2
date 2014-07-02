'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
  .controller('GeoDataDisplayCtrl', ['$scope', 'geodatadisplayModel', function ($scope, geodatadisplayModel) {
  	console.log('Scope for GeoDataDisplayCtrl');
  	console.dir($scope);

    $scope.geodatadisplayModel = geodatadisplayModel;


  }]);
