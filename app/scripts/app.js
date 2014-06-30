'use strict';

/**
 * @ngdoc overview
 * @name geodatadisplay2App
 * @description
 * # geodatadisplay2App
 *
 * Main module of the application.
 */
var geodatadisplay = angular
  .module('geodatadisplay2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/example',{
        templateUrl: 'views/example.html',
        controller: 'GeoDataDisplayCtrl'
      })
       .when('/documentation',{
        templateUrl: 'views/documentation.html'
      })
      .when('/data', {
      	templateUrl: '/views/data.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .value('version', '0.0.1');
