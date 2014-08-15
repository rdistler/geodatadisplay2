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
    .factory('displayManager', ['map', 'datasetRepository', function(map,datasetRepository){
        return new DisplayManager(map, datasetRepository);
    }]);