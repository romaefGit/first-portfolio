
app.controller('loginAdmCtrl', function($scope, $auth, $location, $window) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
        if ($auth.isAuthenticated()) {
            localStorage.setItem('recargue', false);
        }else{
            localStorage.setItem('recargue', true);
        }
        $scope.recargue = localStorage.getItem('recargue');
        if ($scope.recargue == 'false'){
            $window.location.reload();
            localStorage.setItem('recargue', true);
        } 

        $scope.seccion = 'Iniciar sesion';
        $scope.autenticacion = {};
        $scope.registro = {};
    };

    $scope.login = function(autenticacion){
    	$auth.login(autenticacion)
        .then(function(respuesta){
            console.log(respuesta);
            // Si se ha logueado correctamente, lo tratamos aquí.
            let usuarioLogueado = JSON.stringify(respuesta.data.usuario);
            localStorage.setItem("usuarioLogueado",usuarioLogueado);
            $scope.usuarioLogueado = usuarioLogueado;
            localStorage.setItem('recargue', false);
            $location.path('/inicio');
        })
        .catch(function(response){
            let modal = {
                type: 'danger',
                colorText: 'white',
                message: 'No se pudo iniciar sesión, verfica los datos que ingresaste.',
                title: 'Error'
            };
            $scope.autenticacion.password = '';
            $scope.alertMessage(modal);
            // Si ha habido errores llegamos a esta parte
            console.log('error en el logueo > ', response);
        });
    };

    /// 
    $scope.signup = function(registro) {
    	$auth.signup(registro)
        .then(function(respuesta) {
            if(respuesta.status){
                let modal = {
                    type: 'success',
                    colorText: 'white',
                    message: '¡Su registro fue exitioso!',
                    title: 'Mensaje'
                };
                $scope.alertMessage(modal);
                setTimeout(function(){
                    $scope.login(respuesta.data.autenticacion);
                }, 1000);
            }else{
                let modal = {
                    type: 'danger',
                    colorText: 'white',
                    message: 'No se pudo registrar, vuelve a intentarlo.',
                    title: 'Error'
                };
                $scope.alertMessage(modal);
            }
        	// Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            // $state.go("admin.inicio", {});
            // localStorage.setItem('recargue', false);
            // $location.path('/inicio');
        })
        .catch(function(response) {
            let modal = {
                type: 'danger',
                colorText: 'white',
                message: 'No se pudo registrar, vuelve a intentarlo.',
                title: 'Error'
            };
            $scope.alertMessage(modal);
            // Si ha habido errores, llegaremos a esta función
            console.log('error en el registro > ', response);
        });
    }
});