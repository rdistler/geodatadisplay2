'use strict';

/**
 * @ngdoc overview
 * @name geodatadisplay2App
 * @description
 * # geodatadisplay2App
 *
 * Main module of the application.
 */
angular
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/example',{
        templateUrl: 'views/example.html',
        controller: 'ExampleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
