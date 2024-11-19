app.controller('provedoresAdmCtrl', function($scope, $rootScope, $location) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
    	$scope.seccion = 'Provedores';

    	$scope.nuevoProveedor = {};
      	$rootScope.activePath = $location.path();
    };
	

	$scope.guardarProveedor = function(nuevoProveedor){
		console.log('nuevoProveedor > ', nuevoProveedor);
	};

	$scope.limpiar = function(){
		$scope.nuevoProveedor = {
			nit: '',
			nombre: '',
			telefono: '',
			direccion: '',
		};
	}
});