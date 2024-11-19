/**
 * You must include the dependency on 'ngMaterial' 
 */
'use strict';
let beta = 'http://localhost:3000/server/api/usuarios';
let server = beta;
var app = angular.module('romaef', ['ui.router', 'satellizer','ngFileUpload','multipleSelect'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider','$provide', function ($stateProvider, $urlRouterProvider, $authProvider, $provide) {

    $authProvider.loginUrl = server + "/login";
    $authProvider.signupUrl = server + "/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "myApp",


    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/vistas_admin/login.html',
      controller: 'loginAdmCtrl',
      // abstract: true
    })
    .state('perfil', {
      url: '/perfil',
      templateUrl: '/vistas_admin/perfil.html',
      controller: 'perfilAdmCtrl'
    })
    .state('languages', {
      url: '/languages',
      templateUrl: '/vistas_admin/languages.html',
      controller: 'languagesAdmCtrl'
    })
    .state('empresas', {
      url: '/empresas',
      templateUrl: '/vistas_admin/empresas.html',
      controller: 'empresasAdmCtrl'
    })
    .state('articulos', {
      url: '/articulos',
      templateUrl: '/vistas_admin/articulos.html',
      controller: 'articulosAdmCtrl'
    })
    .state('inicio', {
      url: '/inicio',
      templateUrl: '/vistas_admin/inicio.html',
      controller: 'inicioAdmCtrl'
    })
    .state('clientes', {
      url: '/clientes',
      templateUrl: '/vistas_admin/clientes.html',
      controller: 'clientesAdmCtrl'
    })
    .state('productos', {
      url: '/productos',
      templateUrl: '/vistas_admin/productos.html',
      controller: 'productosAdmCtrl'
    })
    .state('provedores', {
      url: '/provedores',
      templateUrl: '/vistas_admin/provedores.html',
      controller: 'provedoresAdmCtrl'
    })
    .state('compras', {
      url: '/compras',
      templateUrl: '/vistas_admin/compras.html',
      controller: 'comprasAdmCtrl'
    })
    .state('empleados', {
      url: '/empleados',
      templateUrl: '/vistas_admin/empleados.html',
      controller: 'empleadosAdmCtrl'
    })
    .state('nomina', {
      url: '/nomina',
      templateUrl: '/vistas_admin/nomina.html',
      controller: 'nominaAdmCtrl'
    });
    $urlRouterProvider.otherwise('/login');
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: true
    // });

  }]).run(function ($auth, $location) {
    // console.log('$auth.isAuthenticated() > ',$auth.isAuthenticated());
    let usuarioLogueado = localStorage.getItem('usuarioLogueado');
    let seccion = localStorage.getItem('seccion');
    // console.log('seccion > ',seccion)
    // console.log('usuarioLogueado > '+usuarioLogueado)
    if ($auth.isAuthenticated() && usuarioLogueado != '') {
      if(seccion != '' && seccion != undefined){
        $location.path('/'+seccion);
      }else{
        $location.path('/inicio');
      }
      let usuarioLogueado = localStorage.getItem('usuarioLogueado');
      if(usuarioLogueado == '' || usuarioLogueado == undefined || usuarioLogueado == null){
        $location.path('/login');
      }
    }else{
      // $state.go('admin');
      localStorage.removeItem("usuarioLogueado");
      localStorage.removeItem('seccion');
      localStorage.removeItem('recargue');
      $location.path('/login');
    }
    
  });