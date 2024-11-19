app.controller('globalAdmCtrl', function($scope, $auth, $location, $timeout, $window) {
    
    $scope.initGlobal = function(){
        $scope.modal;
        $scope.modalQuestion;
        if (typeof(Storage) !== "undefined") {
            let usuarioLogueado = localStorage.getItem("usuarioLogueado");
            $scope.usuarioLogueado = JSON.parse(usuarioLogueado);
        } else {
            let modal = {
                type: 'danger',
                colorText: 'white',
                message: 'Lo sentimos, este navegador no soporta variables en el storage.',
                title: 'Error'
            };
            $scope.alertMessage(modal);
        }

        // purple #9c27b0;// azure #00bcd4;// green #4caf50;// orange #ff9800;// danger #f44336;// rose #e91e63;// white #fff;
        $scope.styleOfTheMenu = 'azure';
        // .primary.secondary.success.danger.warning.info.light.dark.muted.white
        $scope.styleOfTheSite = 'info';
    }
    $scope.logout = function(){
    	$auth.logout()
    	.then(function() {
            // Desconectamos al usuario y lo redirijimos
            $timeout(function(){
                localStorage.removeItem("usuarioLogueado");
                localStorage.removeItem('seccion');
                localStorage.removeItem('recargue');
                $location.path('/login');
            });
        });
    }

    $scope.alertMessage = function(modal){
        $('.modal').modal('hide');
        $scope.modal = modal;
        $('#messageModal').modal('show');
    };

    $scope.questionMessage = function(modal){
        $('.modal').modal('hide');
        $scope.modalQuestion = modal;
        $('#questionMessageModal').modal('show');
    };
    
});