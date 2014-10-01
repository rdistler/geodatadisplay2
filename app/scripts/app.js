'use strict';

var geodatadisplayModule = angular
    .module('geodatadisplay2App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngReactGrid'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/example', {
                templateUrl: 'views/example.html'
            })
            .when('/documentation', {
                templateUrl: 'views/documentation.html'
            })
            .when('/data', {
                templateUrl: '/views/data.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .value('version', '0.0.1')
    // .factory('dataset', ['$http', '$q', function($http, $q){
    //     return Dataset;
    // }])
    .factory('datasetRepository', [

        function() {
            return new DatasetRepository();
        }
    ])
    .factory('map', [

        function() {
            return new Map();
        }
    ])
    .factory('datagrid', [

        function() {
            return new DataGrid();
        }
    ])
    .factory('displayManager', ['map', 'datasetRepository', 'datagrid',
        function(map, datasetRepository, datagrid) {
            return new DisplayManager(map, datasetRepository, datagrid);
        }
    ])
    .factory('moGovDataCatalog', function($resource) {
        return $resource('http://data.mo.gov/api/search/views.json?federation_filter=143&app_token=u2HeET6odCUIxguDIlqMT10QG');
    })
    // .factory('dataCatalog', ['$q',
    //     function($q) {

    //         var worker = new Worker('js/load_data_catalog.js');
    //         var defer;
    //         worker.addEventListener('message', function(e) {
    //             console.log('Worker said: ', e.data);
    //             //defer.resolve(e.data);
    //         }, false);

    //         worker.postMessage('http://data.mo.gov/api/search/views.json?federation_filter=143&app_token=u2HeET6odCUIxguDIlqMT10QG&limit=100'); // Send data to our worker

    //         // dataCatalog.load('http://data.mo.gov/api/search/views.json?federation_filter=143&app_token=u2HeET6odCUIxguDIlqMT10QG&$limit=1')
    //         // .then(function(data){
    //         //     console.log('web worker complete');
    //         //     console.log(data);
    //         // });

    //         return {
    //             load: function(myData) {
    //                 defer = $q.defer();
    //                 console.log('mydata=' + myData);
    //                 worker.postMessage(myData); // Send data to our worker. 
    //                 return defer.promise;
    //             }
    //         };

    //     }
    // ])
    .service('util', function() {
        return {
            'randomColor': function() {
                // creating a random number between 0 and 255
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);

                // going from decimal to hex
                var hexR = r.toString(16);
                var hexG = g.toString(16);
                var hexB = b.toString(16);

                // making sure single character values are prepended with a '0'
                if (hexR.length == 1) {
                    hexR = '0' + hexR;
                }

                if (hexG.length == 1) {
                    hexG = '0' + hexG;
                }

                if (hexB.length == 1) {
                    hexB = '0' + hexB;
                }

                // creating the hex value by concatenatening the string values
                var hexColor = '#' + hexR + hexG + hexB;
                return hexColor.toUpperCase();
            }
        };
    });