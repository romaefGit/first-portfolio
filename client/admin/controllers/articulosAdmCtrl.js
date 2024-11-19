app.controller('articulosAdmCtrl', function($scope, $location, $rootScope, $http, Config, Utils, Upload) {
    /**
     * init inicia el controlador antes de cargar el dom
     */
    $scope.init = function() {
        localStorage.setItem('seccion', 'articulos');
        $scope.seccion = 'articulos';
        $rootScope.activePath = $location.path();
        $scope.articulo = {};
        $scope.articuloToEdit = {};
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
        // $scope.getarticulo();
        $scope.file;
        $scope.articulos;
        $scope.articuloToDelete;
        $scope.getarticulos();
    };

    $scope.getarticulos = function(){
        $http({
            method: 'GET',
            url: Config.server().url + '/articulos/',
        }).then(function successCallback(response) {
            $scope.articulos = response.data.Articulos;
            console.log('success > ', response);
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
		$scope.articulo.tipo = tipo;
	};

    // acciones
    $scope.crear = function(){
        let articulo = {
            titulo: $scope.articulo.titulo,
            descripcion: $scope.articulo.descripcion,
            meta_description: $scope.articulo.meta_description,
            og_title: $scope.articulo.og_title,
        };
        let data = {
            articulo: articulo
        };
        if(Utils.theValueExist($scope.file)){
            $http({
                method: 'POST',
                url: Config.server().url + '/articulos/',
                data: data,
            }).then(function successCallback(responsearticulo) {
                $scope.uploadImage($scope.file, responsearticulo.data.idarticulo, function(resp){
                    // console.log('resp > ', resp);
                    if(resp.data.status){
                        let modal = {
                            type: 'success',
                            colorText: 'white',
                            message: responsearticulo.data.message,
                            title: 'Mensaje'
                        };
                        $scope.alertMessage(modal);
                        $scope.setTab(1);
                        $scope.getarticulos();
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
                url: Config.server().url + '/articulos/',
                data: data,
            }).then(function successCallback(responsearticulo) {
                if(responsearticulo.data.status){
                    let modal = {
                        type: 'success',
                        colorText: 'white',
                        message: responsearticulo.data.message,
                        title: 'Mensaje'
                    };
                    $scope.alertMessage(modal);
                    $scope.setTab(1);
                    $scope.getarticulos();
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
        let idarticulo = $scope.articuloToEdit.idarticulo;
        let articulo = {
            titulo: $scope.articuloToEdit.titulo,
            descripcion: $scope.articuloToEdit.descripcion,
            meta_description: $scope.articuloToEdit.meta_description,
            og_title: $scope.articuloToEdit.og_title,
        };
        let data = {
            articulo: articulo
        };
        if(Utils.theValueExist($scope.file)){
            $http({
                method: 'PUT',
                url: Config.server().url + '/articulos/'+idarticulo,
                data: data,
            }).then(function successCallback(responsearticulo) {
                $scope.uploadImage($scope.file, idarticulo, function(resp){
                    // console.log('resp > ', resp);
                    if(resp.data.status){
                        let modal = {
                            type: 'success',
                            colorText: 'white',
                            message: 'Se actualizó correctamente el artículo.',
                            title: 'Mensaje'
                        };
                        $scope.alertMessage(modal);
                        $scope.setTab(1);
                        $scope.getarticulos();
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
                url: Config.server().url + '/articulos/'+idarticulo,
                data: data,
            }).then(function successCallback(responsearticulo) {
                if(responsearticulo.data.status){
                    let modal = {
                        type: 'success',
                        colorText: 'white',
                        message: responsearticulo.data.message,
                        title: 'Mensaje'
                    };
                    $scope.alertMessage(modal);
                    $scope.setTab(1);
                    $scope.getarticulos();
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

    $scope.modalDeletearticulo = function(articulo){
        $('#articuloToDelete').val(JSON.stringify(articulo));
        let modal = {
            type: 'danger',
            colorText: 'white',
            message: '¿Desea eliminar este articulo?',
            title: 'Alerta',
            idAcceptAction: 'eliminararticulo'
        };
        $scope.questionMessage(modal);
    };

    $scope.deletearticulo = function(callback){
        let articuloToDelete = $('#articuloToDelete').val();
        articuloToDelete = JSON.parse(articuloToDelete);
        let urlservice = '';
        if(Utils.theValueExist(articuloToDelete.media)){
            urlservice = Config.server().url + '/articulos/'+articuloToDelete.idarticulo+'/'+articuloToDelete.media.idmedia+'/'+articuloToDelete.media.url;
        }else{
            urlservice = Config.server().url + '/articulos/'+articuloToDelete.idarticulo;
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
    $(document).on('click','#eliminararticulo', () => {
        $scope.deletearticulo((resp) => {
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
                    $scope.getarticulos();
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
            $scope.articulo = {};
            $scope.articuloToEdit = {};
            $scope.showEditForm = false;
        }
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.openEdit = function(articulo){
        $scope.articuloToEdit = articulo;
        $scope.articuloToEdit.porcentaje = parseInt($scope.articuloToEdit.porcentaje); 
        for (let i = 0; i < $scope.tipos.length; i++) {
            const element = $scope.tipos[i];
            if(element.nombre == $scope.articuloToEdit.tipo){
                $scope.articuloToEdit.tipo = element;
            }
        }
        console.log($scope.articuloToEdit);
        $scope.showEditForm = true;
        $scope.tab = 3;
    };

    // image
    $scope.uploadImage = function(file, idarticulo, callback){
        Upload.upload({
            url: Config.server().url + '/medias/upload-img-articulo/'+idarticulo,
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