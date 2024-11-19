app.controller('clientesAdmCtrl', function ($scope, $rootScope, $location) {
  /**
   * init controller and set defaults
   */
  $scope.init = function () {
    localStorage.setItem('seccion', 'clientes');
    $scope.seccion = 'Clientes';
    $scope.cliente = {};
    $rootScope.activePath = $location.path();
  }

  // funciones
  $scope.guardarCliente = function () {
    console.log('cliente > ', $scope.cliente);
  };

});