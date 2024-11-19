app.controller('empleadosAdmCtrl', function($scope, $rootScope, $location) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
    	$scope.seccion = 'Empleados';


    	$scope.cargos = [
    		{
				id: 0,
				nombre: 'Seleccionar'
			},
			{
				id: 1,
				nombre: 'Asesor(@) comercial',
			},
			{
				id: 2,
				nombre: 'Administrador(@)',
			},
			{
				id: 3,
				nombre: 'Aseador(@)',
			}
		];
    	
    	$scope.nuevoEmpleado = {
    		cargo: $scope.cargos[0]
    	};

      	$rootScope.activePath = $location.path();
    };
	
	$scope.escogido = function(cargo){
		$scope.nuevoEmpleado.cargo = cargo;
	};

	$scope.guardarEmpleado = function(nuevoEmpleado){
		console.log('nuevoEmpleado > ', nuevoEmpleado);
	};
});