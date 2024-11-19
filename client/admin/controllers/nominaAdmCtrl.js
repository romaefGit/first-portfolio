app.controller('nominaAdmCtrl', function($scope, $rootScope, $location) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
    	$scope.seccion = 'Nomina';


    	$scope.empleados = [
    		{
				id: 0,
				nombre: 'Seleccionar',
				fechaLiquidacion: ''
			},
			{
				id: 1,
				nombre: 'Wilmer Alexander Estrada',
				fechaLiquidacion: '2018-11-23'
			},
			{
				id: 2,
				nombre: 'Ana Maria del Pilar',
				fechaLiquidacion: '2019-11-23'
			},
			{
				id: 3,
				nombre: 'Jose Alejandro nuñez',
				fechaLiquidacion: '2019-05-24'
			}
		];

		console.log($scope.empleados);
    	
    	$scope.nuevaNomina = {
    		empleado: $scope.empleados[0]
    	};

      	$rootScope.activePath = $location.path();
    };
	
	$scope.escogido = function(cargo){
		$scope.nuevaNomina.cargo = cargo;
	};

	$scope.liquidarNomina = function(nuevaNomina){
		console.log('nuevaNomina > ', nuevaNomina);
	};
});