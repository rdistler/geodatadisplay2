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
                templateUrl: 'views/example.html',
                controller: 'GeoDataDisplayCtrl'
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

                // making sure single character values are prepended with a "0"
                if (hexR.length == 1) {
                    hexR = "0" + hexR;
                }

                if (hexG.length == 1) {
                    hexG = "0" + hexG;
                }

                if (hexB.length == 1) {
                    hexB = "0" + hexB;
                }

                // creating the hex value by concatenatening the string values
                var hexColor = "#" + hexR + hexG + hexB;
                return hexColor.toUpperCase();
            }
        };
    });