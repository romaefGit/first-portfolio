app.controller('perfilAdmCtrl', function($scope, $rootScope, $location, Config, $http, Upload, Utils) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
        localStorage.setItem('seccion', 'perfil');
        $scope.seccion = 'Perfil';
        $rootScope.activePath = $location.path();
        $scope.perfil = {};
        $scope.media = {};
        $scope.getPerfil();
        $scope.file;
    }

    $scope.getPerfil = function(){
        $http({
            method: 'GET',
            url: Config.server().url + '/usuarios/'+$scope.usuarioLogueado.idusuario,
          }).then(function successCallback(response) {
              $scope.perfil = response.data.usuario;
              let media = $scope.perfil.media;
              $('#media').val(JSON.stringify(media));
        }, function errorCallback(response) {
            console.log('error > ', response);
        });
    };

    $scope.updatePassword = function(){
        $http({
            method: 'POST',
            url: Config.server().url + '/usuarios/password/'+$scope.usuarioLogueado.idusuario,
            data: {
                usuario: $scope.perfil
            },
          }).then(function successCallback(response) {
            let modal = {
                type: 'success',
                colorText: 'white',
                message: response.data.message,
                title: 'Mensaje'
            };
            $scope.alertMessage(modal);
            // console.log('success > ', response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            let modal = {
                type: 'danger',
                colorText: 'white',
                message: response.data.message,
                title: 'Error'
            };
            $scope.alertMessage(modal);
            console.log('error > ', response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.updatePerfil = function(){
        if(Utils.theValueExist($scope.file)){
            $scope.uploadImage($scope.file, function(resp){
                console.log('resp > ', resp);
                if(resp.data.status){
                    let modal = {
                        type: 'success',
                        colorText: 'white',
                        message: 'Se subió la imagen correctamente.',
                        title: 'Mensaje'
                    };
                    $scope.alertMessage(modal);
                    $('#media').val(JSON.stringify(resp.data.media));
                }else{
                    let modal = {
                        type: 'danger',
                        colorText: 'white',
                        message: 'Hubo un error al subir la imagen.',
                        title: 'Error'
                    };
                    $scope.alertMessage(modal);
                }
            });
        }
        if(Utils.theValueExist($scope.perfil.password_actual) && Utils.theValueExist($scope.perfil.password_nuevo)){
            $scope.updatePassword();
        }
        $http({
            method: 'POST',
            url: Config.server().url + '/usuarios/'+$scope.usuarioLogueado.idusuario,
            data: {
                usuario: $scope.perfil
            },
          }).then(function successCallback(response) {
            let modal = {
                type: 'success',
                colorText: 'white',
                message: response.data.message,
                title: 'Mensaje'
            };
            $scope.alertMessage(modal);
            // console.log('success > ', response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            let modal = {
                type: 'danger',
                colorText: 'white',
                message: response.data.message,
                title: 'Error'
            };
            $scope.alertMessage(modal);
            console.log('error > ', response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.uploadImage = function(file, callback){
        Upload.upload({
            url: Config.server().url + '/medias/upload-img-user/'+$scope.usuarioLogueado.idusuario,
            data: {file: file}
        }).then(function (resp) {
            callback(resp);
        }, function (resp) {
            callback(resp);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.modalDeleteImage = function(){
        let modal = {
            type: 'danger',
            colorText: 'white',
            message: '¿Desea eliminar esta imagen?',
            title: 'Alerta',
            idAcceptAction: 'eliminarImagen'
        };
        $scope.questionMessage(modal);
    };

    $scope.deleteImage = function(callback){
        let media = $('#media').val();
        media = JSON.parse(media);
        $http({
            method: 'POST',
            url: Config.server().url + '/medias/delete-img-user',
            data: {
                media: media,
                idusuario: $scope.usuarioLogueado.idusuario
            },
        }).then(function (resp) {
            callback(resp);
        }, function errorCallback(resp) {
            callback(resp);
        });
    };

    // jquery
    $(document).on('click','#eliminarImagen', () => {
        $scope.deleteImage((resp) => {
            console.log('resp > ',resp);
            if(resp.data.status){
                let modal = {
                    type: 'success',
                    colorText: 'white',
                    message: 'Se eliminó la imagen correctamente.',
                    title: 'Mensaje'
                };
                $scope.alertMessage(modal);
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }else{
                let modal = {
                    type: 'success',
                    colorText: 'white',
                    message: 'No se pudo eliminar la imagen.',
                    title: 'Mensaje'
                };
                $scope.alertMessage(modal);
            }
        });
    });

    $scope.readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var file = input.files[0];
            if(file.size > 1000000){
                alert('La imagen que desea subir pesa mas de 1mb, inténtelo de nuevo con una imagen menos pesada.');
            }else{
                $scope.file = file;
                // console.log('file size > ', file.size);
                reader.onload = function (e) {
                    $('.profile-pic').attr('style', 'background-image: url('+e.target.result+');');
                    $('.pichref').attr('href', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
            // $scope.file = file;
        }
    };

    $(".file-upload").on('change', function(){
        $scope.readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });

});