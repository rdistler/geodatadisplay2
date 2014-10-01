'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller.GeoDataDisplayCtrl
 * @description
 * GeoDataDisplayCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
    .controller('GeoDataDisplayCtrl', ['$scope', 'displayManager', 'moGovDataCatalog', 'util', '$http', '$q',
        function($scope, displayManager, moGovDataCatalog, util, $http, $q) {
            console.log('Scope for GeoDataDisplayCtrl');

            //var display = new DisplayManager();
            $scope.displayManager = displayManager;
            $scope.grid = displayManager.datagrid.grid;
            // $scope.grid = geodatadisplayModel.grid;
            if (localStorage.geodatasets) {
                var geodatasets = JSON.parse(localStorage.geodatasets);
            } else {
                moGovDataCatalog.get(function(data) {
                    var geodatasets = [];
                    angular.forEach(data.results, function(value, key) {
                        var columns = value.view.columns;
                        if (columns.length > 0 && value.view.displayType == 'table') {
                            for (var x = 0; x < columns.length; x++) {
                                if (columns[x].dataTypeName == 'location') {
                                    geodatasets.push(value);
                                } else if (columns[x].name == 'latitude' || columns[x].name == 'longitude' ||
                                    columns[x].name == 'latlng') {
                                    geodatasets.push(value);
                                }

                            }
                        }
                    });
                });
            }

            angular.forEach(geodatasets, function(value, key) {
                var dataset = new Dataset($http, $q);
                dataset.src = 'http://data.mo.gov/api/views/' + value.view.id + '/rows.json';
                dataset.name = value.view.name;
                dataset.column_mapping = {
                    "name": "name",
                    "address": "address"
                };
                dataset.iconColor = util.randomColor();
                dataset.icon = MapIconMaker.createMarkerIcon({
                    'primaryColor': dataset.iconColor
                });
                $scope.displayManager.datasetRepository.datasets.push(dataset);
            });

            localStorage.geodatasets = JSON.stringify(geodatasets);
            console.dir(geodatasets);


            console.dir($scope);






        }
    ]);