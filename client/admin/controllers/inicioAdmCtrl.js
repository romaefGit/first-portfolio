app.controller('inicioAdmCtrl', function($scope, $rootScope, $location, $window) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
        localStorage.setItem('seccion', 'inicio');
        $scope.recargue = localStorage.getItem('recargue');
        if ($scope.recargue == 'false'){
            $window.location.reload();
            localStorage.setItem('recargue', true);
        } 

        $scope.seccion = 'Inicio';
        $rootScope.activePath = $location.path();
    }
});