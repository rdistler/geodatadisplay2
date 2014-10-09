'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller.GeoDataDisplayCtrl
 * @description
 * GeoDataDisplayCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
    .controller('GeoDataDisplayCtrl', ['$scope', 'displayManager', 'util', '$http', '$q',
        function($scope, displayManager, moGovDataCatalog, util, $http, $q) {
            console.log('Scope for GeoDataDisplayCtrl');

            //var display = new DisplayManager();
            $scope.displayManager = displayManager;
            $scope.grid = displayManager.datagrid.grid;
            // $scope.grid = geodatadisplayModel.grid;
            
            




            console.dir($scope);






        }
    ]);