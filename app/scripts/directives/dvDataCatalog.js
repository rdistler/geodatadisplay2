'use strict';
geodatadisplayModule.directive('dvDatasetCatalog', ['moGovDataCatalog', '$http', '$q', 'util',
    function(moGovDataCatalog, $http, $q, util) {
        var linker = function(scope, element, attrs) {
            console.log('Executing Linker function in dataCatalog directive');
            var datasetCatalog = new DatasetCatalog();
            datasetCatalog.id = attrs.name.replace(/\./g,'');
            datasetCatalog.src = attrs.src;
            datasetCatalog.name = attrs.name;

            scope.displayManager.datasetCatalogRepository.addDatasetCatalog(datasetCatalog);

            if (localStorage[datasetCatalog.name]) {
                scope.displayManager.datasetCatalogRepository.catalogs[datasetCatalog.name].datasets =[];
                var objects = JSON.parse(localStorage[datasetCatalog.name]);
                angular.forEach(objects, function(value, key) {
                    var dataset = new Dataset($http, $q);
                    dataset.id = value.id;
                    dataset.src = value.src;
                    dataset.name = value.name;
                    dataset.description = value.description;
                    dataset.column_mapping = value.column_mapping;
                    scope.displayManager.datasetCatalogRepository.catalogs[datasetCatalog.name].datasets.push(dataset);
                })


               // scope.displayManager.datasetCatalogRepository.catalogs[datasetCatalog.name].datasets = JSON.parse(localStorage[datasetCatalog.name]);
            } else {
                $http.get(datasetCatalog.src).
                success(function(data, status, headers, config) {
                    console.log(data);
                    var geodatasets = [];
                    angular.forEach(data.results, function(value, key) {
                        var columns = value.view.columns;
                        if (columns.length > 0 && value.view.displayType == 'table') {
                            for (var x = 0; x < columns.length; x++) {
                                var addDataset = false;
                                if (columns[x].dataTypeName == 'location') {
                                    addDataset = true;
                                } else if (columns[x].name == 'latitude' || columns[x].name == 'longitude' ||
                                    columns[x].name == 'latlng') {
                                    addDataset = true;
                                }

                                /*
                                If this column contains geo data then add the dataset and move to next
                                 */
                                if (addDataset) {
                                    var dataset = new Dataset($http, $q);
                                    dataset.id = value.view.id;
                                    dataset.src = datasetCatalog.src.substring(0, datasetCatalog.src.indexOf("/", 7)) + '/api/views/' + value.view.id + '/rows.json';
                                    dataset.name = value.view.name;
                                    dataset.description = value.view.description;
                                    dataset.column_mapping = {
                                        "name": "name",
                                        "address": "address"
                                    };
                                    geodatasets.push(dataset);
                                    //break;
                                }

                            }
                        }

                    });

                    scope.displayManager.datasetCatalogRepository.catalogs[datasetCatalog.name].datasets = geodatasets;

                    localStorage[datasetCatalog.name] = JSON.stringify(geodatasets);


                }).
                error(function(data, status, headers, config) {
                    console.log('There was an error with the request');
                });

            }




            // /*
            //     This logic needs to be moved out of here and into a directive.
            //      */
            // if (localStorage.geodatasets) {
            //     var geodatasets = JSON.parse(localStorage.geodatasets);

            //     angular.forEach(geodatasets, function(value, key) {
            //         var dataset = new Dataset($http, $q);
            //         dataset.src = 'http://data.mo.gov/api/views/' + value.view.id + '/rows.json';
            //         dataset.name = value.view.name;
            //         dataset.column_mapping = {
            //             "name": "name",
            //             "address": "address"
            //         };
            //         dataset.iconColor = util.randomColor();
            //         dataset.icon = MapIconMaker.createMarkerIcon({
            //             'primaryColor': dataset.iconColor
            //         });
            //         //$scope.displayManager.datasetRepository.datasets.push(dataset);
            //     });

            //     localStorage.geodatasets = JSON.stringify(geodatasets);
            //     console.dir(geodatasets);
            // } else {
            //     moGovDataCatalog.get(function(data) {
            //         var geodatasets = [];
            //         angular.forEach(data.results, function(value, key) {
            //             var columns = value.view.columns;
            //             if (columns.length > 0 && value.view.displayType == 'table') {
            //                 for (var x = 0; x < columns.length; x++) {
            //                     if (columns[x].dataTypeName == 'location') {
            //                         geodatasets.push(value);
            //                     } else if (columns[x].name == 'latitude' || columns[x].name == 'longitude' ||
            //                         columns[x].name == 'latlng') {
            //                         geodatasets.push(value);
            //                     }

            //                 }
            //             }
            //         });

            //         angular.forEach(geodatasets, function(value, key) {
            //             var dataset = new Dataset($http, $q);
            //             dataset.src = 'http://data.mo.gov/api/views/' + value.view.id + '/rows.json';
            //             dataset.name = value.view.name;
            //             dataset.column_mapping = {
            //                 "name": "name",
            //                 "address": "address"
            //             };
            //             dataset.iconColor = util.randomColor();
            //             dataset.icon = MapIconMaker.createMarkerIcon({
            //                 'primaryColor': dataset.iconColor
            //             });
            //             $scope.displayManager.datasetRepository.datasets.push(dataset);
            //         });

            //         localStorage.geodatasets = JSON.stringify(geodatasets);
            //         console.dir(geodatasets);
            //     });
            // }

        };

        // var compiler = function(){
        //  console.log('Executing compiler function for dataCatalog');
        // }
        return {
            restrict: 'E',
            link: linker,
            // compile: compiler,
            controller: 'GeoDataDisplayCtrl'
        };
    }
]);