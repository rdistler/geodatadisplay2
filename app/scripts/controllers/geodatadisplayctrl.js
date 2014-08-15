'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller.GeoDataDisplayCtrl
 * @description
 * GeoDataDisplayCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
    .controller('GeoDataDisplayCtrl', ['$scope', 'displayManager',
        function($scope, displayManager) {
            console.log('Scope for GeoDataDisplayCtrl');
            
            //var display = new DisplayManager();
            $scope.displayManager = displayManager;
            $scope.grid = displayManager.grid;
            // $scope.grid = geodatadisplayModel.grid;

            console.dir($scope);




        }
    ]);