app.controller('languagesAdmCtrl', function($scope, $location, $rootScope, $http, Config, Utils, Upload) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
        localStorage.setItem('seccion', 'languages');
        $scope.seccion = 'Lenguajes';
        $rootScope.activePath = $location.path();
        $scope.language = {};
        $scope.languageToEdit = {};
        $scope.showEditForm = false;
        $scope.media = {};
        $scope.tipos = [
            {
                id: 1,
                nombre: 'Front'
            }, 
            {
                id: 2,
                nombre: 'Midle'
            },
            {
                id: 3,
                nombre: 'Back'
            }
        ];
        // $scope.getLanguage();
        $scope.file;
        $scope.languages;
        $scope.languageToDelete;
        $scope.getLanguages();
    };

    $scope.getLanguages = function(){
        $http({
            method: 'GET',
            url: Config.server().url + '/languages/',
        }).then(function successCallback(response) {
            $scope.languages = response.data.languages;
            // console.log('success > ', response);
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

    // select 
    $scope.escogido = function(tipo){
		$scope.language.tipo = tipo;
	};

    // acciones
    $scope.crear = function(){
        let language = {
            nombre: $scope.language.nombre,
            porcentaje: $scope.language.porcentaje,
            tipo: $scope.language.tipo,
            selector: $scope.language.selector,
            descripcion: $scope.language.descripcion,
        };
        let data = {
            language: language
        };
        if(Utils.theValueExist($scope.file)){
            $http({
                method: 'POST',
                url: Config.server().url + '/languages/',
                data: data,
            }).then(function successCallback(responseLanguage) {
                $scope.uploadImage($scope.file, responseLanguage.data.idlanguage, function(resp){
                    // console.log('resp > ', resp);
                    if(resp.data.status){
                        let modal = {
                            type: 'success',
                            colorText: 'white',
                            message: responseLanguage.data.message,
                            title: 'Mensaje'
                        };
                        $scope.alertMessage(modal);
                        $scope.setTab(1);
                        $scope.getLanguages();
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
        }else{
            $http({
                method: 'POST',
                url: Config.server().url + '/languages/',
                data: data,
            }).then(function successCallback(responseLanguage) {
                if(responseLanguage.data.status){
                    let modal = {
                        type: 'success',
                        colorText: 'white',
                        message: responseLanguage.data.message,
                        title: 'Mensaje'
                    };
                    $scope.alertMessage(modal);
                    $scope.setTab(1);
                    $scope.getLanguages();
                }else{
                    let modal = {
                        type: 'danger',
                        colorText: 'white',
                        message: 'Hubo un error al subir la imagen.',
                        title: 'Error'
                    };
                    $scope.alertMessage(modal);
                }
            }, function errorCallback(response) {
                let modal = {
                    type: 'danger',
                    colorText: 'white',
                    message: responseLanguage.data.message,
                    title: 'Error'
                };
                $scope.alertMessage(modal);
                console.log('error > ', response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    };

    $scope.editar = function(){
        let idlanguage = $scope.languageToEdit.idlanguage;
        let language = {
            nombre: $scope.languageToEdit.nombre,
            porcentaje: $scope.languageToEdit.porcentaje,
            tipo: $scope.languageToEdit.tipo,
            selector: $scope.languageToEdit.selector,
            descripcion: $scope.languageToEdit.descripcion,
        };
        let data = {
            language: language
        };
        if(Utils.theValueExist($scope.file)){
            $http({
                method: 'PUT',
                url: Config.server().url + '/languages/'+idlanguage,
                data: data,
            }).then(function successCallback(responseLanguage) {
                $scope.uploadImage($scope.file, idlanguage, function(resp){
                    // console.log('resp > ', resp);
                    if(resp.data.status){
                        let modal = {
                            type: 'success',
                            colorText: 'white',
                            message: 'Se actualizó correctamente el lenguaje.',
                            title: 'Mensaje'
                        };
                        $scope.alertMessage(modal);
                        $scope.setTab(1);
                        $scope.getLanguages();
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
        }else{ // solo datos
            $http({
                method: 'PUT',
                url: Config.server().url + '/languages/'+idlanguage,
                data: data,
            }).then(function successCallback(responseLanguage) {
                if(responseLanguage.data.status){
                    let modal = {
                        type: 'success',
                        colorText: 'white',
                        message: responseLanguage.data.message,
                        title: 'Mensaje'
                    };
                    $scope.alertMessage(modal);
                    $scope.setTab(1);
                    $scope.getLanguages();
                }else{
                    let modal = {
                        type: 'danger',
                        colorText: 'white',
                        message: resp.data.message,
                        title: 'Error'
                    };
                    $scope.alertMessage(modal);
                }
            }, function errorCallback(response) {
                let modal = {
                    type: 'danger',
                    colorText: 'white',
                    message: response.data.message,
                    title: 'Error'
                };
                $scope.alertMessage(modal);
                console.log('error > ', response);
            }); 
        }
    };

    $scope.modalDeleteLanguage = function(language){
        $('#languageToDelete').val(JSON.stringify(language));
        let modal = {
            type: 'danger',
            colorText: 'white',
            message: '¿Desea eliminar este lenguaje?',
            title: 'Alerta',
            idAcceptAction: 'eliminarLenguaje'
        };
        $scope.questionMessage(modal);
    };

    $scope.deleteLanguage = function(callback){
        let languageToDelete = $('#languageToDelete').val();
        languageToDelete = JSON.parse(languageToDelete);
        let urlservice = '';
        if(Utils.theValueExist(languageToDelete.media)){
            urlservice = Config.server().url + '/languages/'+languageToDelete.idlanguage+'/'+languageToDelete.media.idmedia+'/'+languageToDelete.media.url;
        }else{
            urlservice = Config.server().url + '/languages/'+languageToDelete.idlanguage;
        }
        $http({
            method: 'DELETE',
            url: urlservice,
        }).then(function (resp) {
            callback(resp);
        }, function errorCallback(resp) {
            callback(resp);
        });
    };

    // jquery
    $(document).on('click','#eliminarLenguaje', () => {
        $scope.deleteLanguage((resp) => {
            // console.log('resp > ',resp);
            if(resp.data.status){
                let modal = {
                    type: 'success',
                    colorText: 'white',
                    message: resp.data.message,
                    title: 'Mensaje'
                };
                $scope.alertMessage(modal);
                setTimeout(() => {
                    $scope.getLanguages();
                }, 2000);
            }else{
                let modal = {
                    type: 'danger',
                    colorText: 'white',
                    message: resp.data.message,
                    title: 'Mensaje'
                };
                $scope.alertMessage(modal);
            }
        });
    });

    // tabs
    $scope.tab = 1; // default

    $scope.setTab = function(newTab){
        if(newTab == 1 || newTab == 2){
            $scope.language = {};
            $scope.languageToEdit = {};
            $scope.showEditForm = false;
        }
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.openEdit = function(language){
        $scope.languageToEdit = language;
        $scope.languageToEdit.porcentaje = parseInt($scope.languageToEdit.porcentaje); 
        for (let i = 0; i < $scope.tipos.length; i++) {
            const element = $scope.tipos[i];
            if(element.nombre == $scope.languageToEdit.tipo){
                $scope.languageToEdit.tipo = element;
            }
        }
        console.log($scope.languageToEdit);
        $scope.showEditForm = true;
        $scope.tab = 3;
    };

    // image
    $scope.uploadImage = function(file, idlanguage, callback){
        Upload.upload({
            url: Config.server().url + '/medias/upload-img-language/'+idlanguage,
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

    $scope.readURL = function(input, idimg) {
        // console.log('img > ',idimg)
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var file = input.files[0];
            if(file.size > 1000000){
                alert('La imagen que desea subir pesa mas de 1mb, inténtelo de nuevo con una imagen menos pesada.');
            }else{
                $scope.file = file;
                // console.log('file size > ', file.size);
                reader.onload = function (e) {
                    $('#'+idimg+' .profile-pic').attr('style', 'background-image: url('+e.target.result+');');
                    $('#'+idimg).attr('href', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
            // $scope.file = file;
        }
    };

    $(".file-upload.create").on('change', function(){
        let idimg = $(this).attr('data-img-id');
        $scope.readURL(this, idimg);
    });
    
    $(".upload-button.create").on('click', function() {
       $(".file-upload.create").click();
    });

    $(".file-upload.edit").on('change', function(){
        let idimg = $(this).attr('data-img-id');
        $scope.readURL(this, idimg);
    });
    
    $(".upload-button.edit").on('click', function() {
       $(".file-upload.edit").click();
    });
});