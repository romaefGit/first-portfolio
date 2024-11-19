app.controller('comprasAdmCtrl', function($scope, $rootScope, $location) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
    	$scope.seccion = 'Compras';


    	$scope.provedores = [
    		{
				id: 0,
				nombre: 'Seleccionar'
			},
			{
				id: 1,
				nombre: 'Bucaramangueros Industries',
			},

			
			{
				id: 3,
				nombre: 'Tunjeros S.A',
			}
		];
    	
    	$scope.nuevaCompra = {
    		provedor: $scope.provedores[0]
    	};

      	$rootScope.activePath = $location.path();
    };
	
	$scope.escogido = function(proveedor){
		$scope.nuevaCompra.proveedor = proveedor;
	};

	$scope.guardarCompra = function(nuevaCompra){
		console.log('nuevaCompra > ', nuevaCompra);
	};
});