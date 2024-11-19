/**
 * You must include the dependency on 'ngMaterial' 
 */
'use strict';
var app = angular.module('romaef', ['ngRoute','ngResource'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/inicio', {
      templateUrl: 'vistas_cliente/inicio.html',
    //   controller: 'inicioCtrl'
    })
    .when('/informacion', {
        templateUrl: 'vistas_cliente/hojadevida.html',
        // controller: 'hojadevidaCtrl'
    })
    .when('/fullstack', {
        templateUrl: 'vistas_cliente/fullstack.html',
        // controller: 'fullstackCtrl'
    })
    .otherwise({ redirectTo: '/inicio' });
 
}]);