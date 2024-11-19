app.controller('empresasAdmCtrl', function($scope, $location, $rootScope, $http, Config, Utils, Upload) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
        localStorage.setItem('seccion', 'empresas');
        $scope.seccion = 'Empresas';
        $rootScope.activePath = $location.path();
        $scope.empresa = {};
        $scope.empresaToEdit = {};
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
        // $scope.getempresa();
        $scope.file;
        $scope.empresas;
        $scope.selectedLanguagesToCreate;
        $scope.getempresas();
        $scope.getLanguages();
    };

    $scope.getempresas = function(){
        $http({
            method: 'GET',
            url: Config.server().url + '/empresas/all',
        }).then(function successCallback(response) {
            $scope.empresas = response.data.empresas;
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
    
    $scope.getLanguages = function(){
        $http({
            method: 'GET',
            url: Config.server().url + '/languages/nombre',
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

    $scope.getLanguagesByEmpresa = function(idempresa){
        $http({
            method: 'GET',
            url: Config.server().url + '/empresas/'+idempresa+'/languages',
        }).then(function successCallback(response) {
            $scope.empresaToEdit.languagesSelected = response.data.languages;
            $scope.empresaToEdit.languagesDeleted = [];
            $('#languagesLoadFirst').val(JSON.stringify(response.data.languages));
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
		$scope.empresa.tipo = tipo;
    };
    // funciones multiselect
    $scope.afterSelectLanguage = function(item){
        if(Utils.theValueExist($scope.empresaToEdit.languagesDeleted)){
            if($scope.empresaToEdit.languagesDeleted.length > 1){
                $scope.empresaToEdit.languagesDeleted.forEach((valor,indice,array)=>{
                    if(item.idlanguage == valor.idlanguage){
                        $scope.empresaToEdit.languagesDeleted.splice(indice, 1);
                    }
                })
            }else{
                if(item.idlanguage == $scope.empresaToEdit.languagesDeleted[0].idlanguage){
                    $scope.empresaToEdit.languagesDeleted.splice(0, 1);
                } 
            }
        }
    };
    $scope.beforeRemoveLanguage = function(item){
        let different = false;
        let languagesLoadFirst = $('#languagesLoadFirst').val();
        languagesLoadFirst = JSON.parse(languagesLoadFirst);

        let count = 0;
        let countNormal = 0;
        languagesLoadFirst.forEach((valor,indice,array)=>{
            countNormal++;
            if(item.idlanguage != valor.idlanguage){
                count++;
                different = true;
            }
            // console.log((!different || (count != array.length))+' && '+(countNormal == array.length));
            if((!different || (count != array.length)) && (countNormal == array.length)){
                $scope.empresaToEdit.languagesDeleted.push(item);
                if($scope.empresaToEdit.languagesDeleted.length > 1){
                    $scope.empresaToEdit.languagesDeleted = Utils.removeDuplicates($scope.empresaToEdit.languagesDeleted, 'idlanguage');
                }
                count = 0;
                countNormal = 0;
            }
        })
    };
    // saca nuevos y arma en un objeto los nuevos y eliminados
    var theLanguagesWereEdited = function(languagesEdited, languagesLoadFirst){
        // console.log('languagesEdited > ',languagesEdited);
        // console.log('languagesLoadFirst > ',languagesLoadFirst);
        let languagesEditedNew = languagesEdited;
        let languagesSurvive = [];
        let respuesta = {
            status: false,
            eliminados: [],
            nuevos: [],
        };
        languagesLoadFirst.forEach((valor1, indice1, array1)=>{
            languagesEdited.forEach((valor, indice, array)=>{
                if(valor1.nombre == valor.nombre){
                    languagesEditedNew.splice(indice, 1);
                    languagesSurvive.push(valor1);
                }
            })  
        });

        respuesta.nuevos = languagesEditedNew;
        respuesta.eliminados =  $scope.empresaToEdit.languagesDeleted;

        $scope.empresaToEdit.languagesSelected = languagesSurvive.concat(languagesEditedNew);
        if(Utils.theValueExist(respuesta.eliminados) || Utils.theValueExist(respuesta.nuevos)){
            respuesta.status = true;
        }
        return respuesta;
    };

    // acciones
    $scope.crear = function(){
        // console.log($scope.selectedLanguagesToCreate);
        let empresa = {
            nombre: $scope.empresa.nombre,
            selector: $scope.empresa.selector,
            propiedades: $scope.empresa.propiedades,
            descripcion: $scope.empresa.descripcion,
        };
        let data = {
            empresa: empresa,
            languages: $scope.selectedLanguagesToCreate
        };
        if(Utils.theValueExist($scope.file)){
            $http({
                method: 'POST',
                url: Config.server().url + '/empresas/',
                data: data,
            }).then(function successCallback(responseempresa) {
                $scope.uploadImage($scope.file, responseempresa.data.idempresa, function(resp){
                    // console.log('resp > ', resp);
                    if(resp.data.status){
                        let modal = {
                            type: 'success',
                            colorText: 'white',
                            message: responseempresa.data.message,
                            title: 'Mensaje'
                        };
                        $scope.alertMessage(modal);
                        $scope.setTab(1);
                        $scope.getempresas();
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
                url: Config.server().url + '/empresas/',
                data: data,
            }).then(function successCallback(responseempresa) {
                if(responseempresa.data.status){
                    let modal = {
                        type: 'success',
                        colorText: 'white',
                        message: responseempresa.data.message,
                        title: 'Mensaje'
                    };
                    $scope.alertMessage(modal);
                    $scope.setTab(1);
                    $scope.getempresas();
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
                    message: response.data.message,
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
        let languagesLoadFirst = $('#languagesLoadFirst').val();
        languagesLoadFirst = JSON.parse(languagesLoadFirst);
        var edited = theLanguagesWereEdited($scope.empresaToEdit.languagesSelected, languagesLoadFirst);
        let idempresa = $scope.empresaToEdit.idempresa;
        
        let empresa = {
            nombre: $scope.empresaToEdit.nombre,
            selector: $scope.empresaToEdit.selector,
            propiedades: $scope.empresaToEdit.propiedades,
            descripcion: $scope.empresaToEdit.descripcion,
        };
        let data = {
            empresa: empresa,
            theLanguagesWereEdited: edited
        };
        // console.log('data > ',data);
        if(Utils.theValueExist($scope.empresaToEdit.languagesSelected)){
            if(Utils.theValueExist($scope.file)){
                $http({
                    method: 'PUT',
                    url: Config.server().url + '/empresas/'+idempresa,
                    data: data,
                }).then(function successCallback(responseempresa) {
                    $scope.uploadImage($scope.file, idempresa, function(resp){
                        // console.log('resp > ', resp);
                        if(resp.data.status){
                            let modal = {
                                type: 'success',
                                colorText: 'white',
                                message: 'Se actualizó correctamente la empresa.',
                                title: 'Mensaje'
                            };
                            $scope.alertMessage(modal);
                            $scope.setTab(1);
                            $scope.getempresas();
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
                    url: Config.server().url + '/empresas/'+idempresa,
                    data: data,
                }).then(function successCallback(responseempresa) {
                    if(responseempresa.data.status){
                        let modal = {
                            type: 'success',
                            colorText: 'white',
                            message: responseempresa.data.message,
                            title: 'Mensaje'
                        };
                        $scope.alertMessage(modal);
                        $scope.setTab(1);
                        $scope.getempresas();
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
        }else{
            let modal = {
                type: 'warning',
                colorText: 'white',
                message: 'Debe seleccionar al menos un lenguaje',
                title: 'Mensaje'
            };
            $scope.alertMessage(modal);
        }
    };

    // tabs
    $scope.tab = 1; // default

    $scope.setTab = function(newTab){
        if(newTab == 1 || newTab == 2){
            $scope.empresa = {};
            $scope.empresaToEdit = {};
            $scope.showEditForm = false;
        }
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.openEdit = function(empresa){
        $scope.empresaToEdit = empresa;
        $scope.showEditForm = true;
        $scope.tab = 3;
        $scope.getLanguagesByEmpresa(empresa.idempresa);
    };

    $scope.modalDeleteEmpresa = function(empresa){
        $('#empresaToDelete').val(JSON.stringify(empresa));
        let modal = {
            type: 'danger',
            colorText: 'white',
            message: '¿Desea eliminar esta empresa?',
            title: 'Alerta',
            idAcceptAction: 'eliminarEmpresa'
        };
        $scope.questionMessage(modal);
    };

    $scope.deleteEmpresa = function(callback){
        let empresaToDelete = $('#empresaToDelete').val();
        empresaToDelete = JSON.parse(empresaToDelete);
        // console.log('empresa  >' , empresaToDelete)
        let urlservice = '';
        if(Utils.theValueExist(empresaToDelete.media)){
            urlservice = Config.server().url + '/empresas/'+empresaToDelete.idempresa+'/'+empresaToDelete.media.idmedia+'/'+empresaToDelete.media.url;
        }else{
            urlservice = Config.server().url + '/empresas/'+empresaToDelete.idempresa;
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
    $(document).on('click','#eliminarEmpresa', () => {
        $scope.deleteEmpresa((resp) => {
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
                    location.reload();
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
    // image
    $scope.uploadImage = function(file, idempresa, callback){
        Upload.upload({
            url: Config.server().url + '/medias/upload-img-empresa/'+idempresa,
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