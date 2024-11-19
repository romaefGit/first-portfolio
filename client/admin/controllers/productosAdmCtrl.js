app.controller('productosAdmCtrl', function($scope, $rootScope, $location) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
    	$scope.seccion = 'Productos';
    	
    	$scope.proveedores = [
    		{
				id: 0,
				nombre: 'Seleccionar'
			},
			{
				id: 1,
				nombre: 'Bucaramangueros Industries',
			},
			{
				id: 2,
				nombre: 'Medellineros S.A',
			},
			{
				id: 3,
				nombre: 'Tunjeros S.A',
			}
		];

    	$scope.nuevoProducto = {
    		proveedor: $scope.proveedores[0]
    	};
      	$rootScope.activePath = $location.path();
    };
	
	$scope.escogido = function(proveedor){
		$scope.nuevoProducto.proveedor = proveedor;
	};

	$scope.guardarProducto = function(nuevoProducto){
		console.log('nuevoProducto > ', nuevoProducto);
	};
});