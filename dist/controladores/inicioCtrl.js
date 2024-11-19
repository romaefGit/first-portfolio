app.controller('inicioCtrl', function($scope, $location, Utils) {
    $scope.init = function() {
        $scope.closeNav(); // in appController menu
        $scope.imagenUno = 'public/landing/img/elegidas/lg/1.png';
        $scope.mostrarContacto = true;
        if (Utils.getWidth() > 1024) {
            $scope.imagenUno = 'public/landing/img/elegidas/lg/1.png';
        }
        if (Utils.getWidth() < 1024) {
            $scope.imagenUno = 'public/landing/img/elegidas/lg/1.png';
        }
        if (Utils.getWidth() <= 768) {
            $scope.imagenUno = 'public/landing/img/elegidas/lg/1.png';
        }
        $scope.imagenDos = 'public/landing/img/elegidas/lg/2.png';
        if (Utils.getWidth() > 1024) {
            $scope.imagenDos = 'public/landing/img/elegidas/lg/2.png';
        }
        if (Utils.getWidth() < 1024) {
            $scope.imagenDos = 'public/landing/img/elegidas/lg/2.png';
        }
        if (Utils.getWidth() <= 768) {
            $scope.imagenDos = 'public/landing/img/elegidas/lg/2.png';
        }
        $scope.imagenTres = 'public/landing/img/elegidas/lg/3.png';
        if (Utils.getWidth() > 1024) {
            $scope.imagenTres = 'public/landing/img/elegidas/lg/3.png';
        }
        if (Utils.getWidth() < 1024) {
            $scope.imagenTres = 'public/landing/img/elegidas/lg/3.png';
        }
        if (Utils.getWidth() <= 768) {
            $scope.imagenTres = 'public/landing/img/elegidas/lg/3.png';
        }

        $(document).on('mouseenter','#romario', function(){
            $(this).fadeOut(200, function(){
                $('#alien').fadeIn('slow');
                $('#alien').attr('style', 'display: block');
                $('#romario').hide();
            });
        });

        $(document).on('mouseleave','#alien', function(){
            $(this).fadeOut(200, function(){
                $('#alien').hide();
                $('#romario').fadeIn('slow');
            });
        });
        
        // viendo cuando cargan las imagenes
        var $img = $('img');
        $img.on('load', triggerAction);
        if ($img.length > 0 && !$img.get(0).complete) {}

        function triggerAction() {
            setTimeout(function() {
                $('body').addClass('loaded');
                setTimeout(function() {
                    $('.nombre-header').addClass('bounceInDown');
                    $('.photo-header').addClass('bounceIn');
                    $('.profesion-header').addClass('bounceInUp');
                    // bounceInRight
                }, 500);
                setTimeout(function() {
                    $('body #loader-wrapper').remove();
                }, 1000);
                // $('h1').css('color', '#222222');
            }, 1000);
            // console.log('img has been loaded');
        };
    };
    $scope.frontEndLanguages = [{
        imgUrl: 'public/landing/img/lenguajes/javascript.png',
        imgUrlModal: 'public/landing/img/lenguajes/javascript.png',
        porcentaje: {
            valor: 90,
            circleColor: "#d5b830",
            waveColor: "#feda3e",
            textColor: "#fdfdfd",
            waveTextColor: "#fdfdfd",
        },
        title: 'JavaScript',
        nombreToSelector: 'JavaScript',
        descripcion: 'Aunque empecé a conocerlo con jquery, el lenguaje puro de este lo fui conociendo de a poco, ya hace 3 años que lo uso y he podido generar componentes desde cero sin usar alguna otra librería.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/angular.png',
        imgUrlModal: 'public/landing/img/lenguajes/angular_modal.png',
        porcentaje: {
            valor: 90,
            circleColor: "#b62f32",
            waveColor: "#e43137",
            textColor: "#f5f6f7",
            waveTextColor: "#f5f6f7",
        },
        title: 'Angular 1',
        nombreToSelector: 'Angular',
        descripcion: 'He manejado este lenguaje ya hace más de dos años, tengo un amplio conocimiento en la primer version de este lenguaje, le he implementado varios componentes que dan agilidad a la hora de desarrollar y cumplir los flujos que se requieran.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/jquery.png',
        imgUrlModal: 'public/landing/img/lenguajes/jquery.png',
        porcentaje: {
            valor: 95,
            circleColor: "#172c45",
            waveColor: "#193556",
            textColor: "#ffffff",
            waveTextColor: "#ffffff",
        },
        title: 'jQuery',
        nombreToSelector: 'jQuery',
        descripcion: 'Lo manejo hace ya 3 años y es usado para generar flujos de información entre html y JavaScript de una manera más eficiente que usando solo Javascript.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/bootstrap.png',
        imgUrlModal: 'public/landing/img/lenguajes/bootstrap.png',
        porcentaje: {
            valor: 90,
            circleColor: "#62488a",
            waveColor: "#b39cd6",
            textColor: "#ffffff",
            waveTextColor: "#ffffff",
        },
        title: 'Bootstrap',
        nombreToSelector: 'Bootstrap',
        descripcion: 'Con el me sumergí en el concepto responsivo de las paginas actuales, llevo usándolo ya hace 3 años y me desenvuelvo bien a la hora de desarrollar en este.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/ionic.png',
        imgUrlModal: 'public/landing/img/lenguajes/ionic.png',
        porcentaje: {
            valor: 95,
            circleColor: "#4e8ef7",
            waveColor: "#8fb3ef",
            textColor: "#ffffff",
            waveTextColor: "#ffffff",
        },
        title: 'Ionic',
        nombreToSelector: 'Ionic',
        descripcion: 'Desde que salio, llevo usando su primera version y el uso de este es muy sencillo de entender ya que se basa en angularJs v1, he desarrollado dos prototipos de aplicaciones en android y dos aplicaciones ya en las tiendas conocidas como AppStore y PlayStore.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/materialize.png',
        imgUrlModal: 'public/landing/img/lenguajes/materialize.png',
        porcentaje: {
            valor: 80,
            circleColor: "#ec7078",
            waveColor: "#f5a2ac",
            textColor: "#ffffff",
            waveTextColor: "#ffffff",
        },
        title: 'Materialize',
        nombreToSelector: 'Materialize',
        descripcion: 'Este es un framework hecho por google y de uso abierto, esta página está basada en este framework, lo he usado hace un año, pero igual su documentación es muy completa y fácil de entender a la hora de desarrollar.'
    }];
    $scope.backEndLanguages = [{
        imgUrl: 'public/landing/img/lenguajes/cordova.png',
        imgUrlModal: 'public/landing/img/lenguajes/cordova.png',
        porcentaje: {
            valor: 80,
            circleColor: "#3d4a56",
            waveColor: "#e2e2e2",
            textColor: "#43bdbf",
            waveTextColor: "#43bdbf",
        },
        title: 'Cordova',
        nombreToSelector: 'Cordova',
        descripcion: 'Es el compilador de aplicaciones web, el que permite crear un proyecto web y covertirlo en una APP; tengo experiencia de 2 años en su uso.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/nodejs.png',
        imgUrlModal: 'public/landing/img/lenguajes/nodejs_modal.png',
        porcentaje: {
            valor: 85,
            circleColor: "#404137",
            waveColor: "#83cd29",
            textColor: "#ffffff",
            waveTextColor: "#ffffff",
        },
        title: 'NodeJs',
        nombreToSelector: 'NodeJs',
        descripcion: 'Este lenguaje es Javascript pero ahora del lado del servidor y no del cliente, tengo experiencia de 2 años en su uso y es practicamente sencillo implementar cualquier base de datos para crear los servicios CRUD para un proyecto.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/mongodb.png',
        imgUrlModal: 'public/landing/img/lenguajes/mongodb_modal.png',
        porcentaje: {
            valor: 85,
            circleColor: "#81c564",
            waveColor: "#412f1f",
            textColor: "#a2da8a",
            waveTextColor: "#a2da8a",
        },
        title: 'MongoDB',
        nombreToSelector: 'MongoDB',
        descripcion: 'Es un base de datos hecha con JavaScript y es no relacional, la comunicacion con esta base de datos es sencilla y muy rápida, tengo experiencia de 1 año en su uso.'
    }, {
        imgUrl: 'public/landing/img/lenguajes/git.png',
        imgUrlModal: 'public/landing/img/lenguajes/git.png',
        porcentaje: {
            valor: 94,
            circleColor: "#f05033",
            waveColor: "rgb(255, 61, 26)",
            textColor: "#fff",
            waveTextColor: "#fff",
        },
        title: 'Git',
        nombreToSelector: 'Git',
        descripcion: 'El manejo de versiones para los proyectos es muy chévere con esto, llevo usándolo 3 años con repositorios como GitLab y BitBucket'
    }];
    $(function() {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
    }); // end of document ready
    $(document).find('.css-a-remover').remove();
    $(document).find('head').append('<link class="css-a-remover" href="public/landing/css-site/inicio.css" rel="stylesheet">');
    
    var animacionesAleatorias = function() {
        var arregloAnimaciones = ['bounce', 'swing', 'snake','jello'];
        var aleatorio = Math.round(Math.random() * arregloAnimaciones.length);
        // console.log('aleatorio > ',aleatorio);
        if (aleatorio == 4) {
            aleatorio = 3;
        }
        return arregloAnimaciones[aleatorio];
    };
    // animaciones y demas
    // https://github.com/daneden/animate.css
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
    $(document).on('mouseenter', '.cotenedor-lenguaje-img', function() {
        $(this).removeClass('animated ' + animacionesAleatorias());
        $(this).animateCss(animacionesAleatorias());
    });
    $(document).on('mouseenter', '.iconos', function() {
        $(this).animateCss('bounceIn');
    });
    $(document).on('mouseenter', '.logo-container', function() {
        $(this).animateCss('pulse');
    });
    $(document).on('mouseenter', '.rayo', function() {
        $(this).animateCss('jello');
    });
    $(document).on('mouseenter', '.experiencia', function() {
        $(this).animateCss('flip');
    });
    $('.tooltipped').tooltip({
        delay: 50
    });
    // animaciones y demas


    var creaHtmlLanguagesFrontLg = function(data) {
        var base = [];
        var bases = [];
        var baseHtml = '';
        for (var i = 0; i < data.length; i++) {
            base = ['<div class="col s12 m2" data-target="modal-' + data[i].nombreToSelector + '">', '<div class="cotenedor-lenguaje-img">', '<img class="responsive-img img-size-equal" src="' + data[i].imgUrl + '">', '</div>', '</div>'];
            for (var a = 0; a < base.length; a++) {
                baseHtml += base[a];
            };
            bases.push(baseHtml);
            base = [];
            baseHtml = '';
        };
        // console.log(bases);
        var basesHtml = '';
        for (var i = 0; i < bases.length; i++) {
            basesHtml += bases[i];
        };
        // alert('llego');
        if (Utils.theValueExist(basesHtml)) {
            $('#languagesFrontLg').append(basesHtml);
        }
    };
    var creaHtmlLanguagesBackOrFrontXs = function(data, tipo) {
        var base = [];
        var bases = [];
        var baseHtml = '';
        for (var i = 0; i < data.length; i++) {
            base = ['<a class="carousel-item cursorCorusel" data-target="modal-' + data[i].nombreToSelector + '">', '<img class="responsive-img img-size-equal" src="' + data[i].imgUrl + '">', '</a>'];
            for (var a = 0; a < base.length; a++) {
                baseHtml += base[a];
            };
            bases.push(baseHtml);
            base = [];
            baseHtml = '';
        };
        // console.log(bases);
        var basesHtml = '';
        for (var i = 0; i < bases.length; i++) {
            basesHtml += bases[i];
        };
        // alert('llego');
        // console.log('basesHtml > ',basesHtml);
        if (Utils.theValueExist(basesHtml)) {
            if (tipo == 'Front') {
                $('#languagesFrontXs').append(basesHtml);
            }
            if (tipo == 'Back') {
                $('#languagesBackXs').append(basesHtml);
            }
        }
    };
    var creaHtmlLanguagesBackLg = function(data) {
        var base = [];
        var bases = [];
        var baseHtml = '';
        for (var i = 0; i < data.length; i++) {
            base = ['<div class="col s12 m3" data-target="modal-' + data[i].nombreToSelector + '">', '<div class="cotenedor-lenguaje-img">', '<img class="responsive-img img-size-equal" src="' + data[i].imgUrl + '">', '</div>', '</div>'];
            for (var a = 0; a < base.length; a++) {
                baseHtml += base[a];
            };
            bases.push(baseHtml);
            base = [];
            baseHtml = '';
        };
        // console.log(bases);
        var basesHtml = '';
        for (var i = 0; i < bases.length; i++) {
            basesHtml += bases[i];
        };
        // alert('llego');
        // console.log('basesHtml > ',basesHtml);
        if (Utils.theValueExist(basesHtml)) {
            $('#languagesBackLg').append(basesHtml);
        }
    };
    var creaHtmlModals = function(data, tipo) {
        var base = [];
        var bases = [];
        var baseHtml = '';
        var configLiquid;
        var pegueLiquido;
        for (var i = 0; i < data.length; i++) {
            var svg = '<svg id="fillgauge-' + data[i].nombreToSelector + '" width="100%" height="100"></svg>';
            base = ['<div class="modal bottom-sheet" id="modal-' + data[i].nombreToSelector + '" style="border-top: 6px solid ' + data[i].porcentaje.circleColor + '">', '<div class="modal-content">', '<div class="row">', '<div class="col l4 m4 s12" hide-on-med-and-up>', '<img class="responsive-img img-size-equal" src="' + data[i].imgUrlModal + '">', '</div>', '<div class="col l8 m8 s12">', '<h3 class="text-center" style="color: ' + data[i].porcentaje.circleColor + '">' + data[i].title + '</h3>', '<p class="black-text text-lighten-1 flow-text">' + data[i].descripcion + '</p>', '<div class="col l2 m4 s5">', '<h4 style="color: ' + data[i].porcentaje.circleColor + ';margin-top: 30px">Nivel:</h4>', '</div>', '<div class="col l10 m8 s7">',
                svg, '</div>', '</div>', '</div>', '</div>',
                // '<div class="modal-footer">',
                //     '<a class="modal-action modal-close waves-effect waves-green btn-flat">',
                //         'Aceptar',
                //     '</a>',
                // '</div>',
                '</div>'
            ];
            for (var a = 0; a < base.length; a++) {
                baseHtml += base[a];
            };
            bases.push(baseHtml);
            base = [];
            baseHtml = '';
        };
        // console.log(bases);
        var basesHtml = '';
        for (var i = 0; i < bases.length; i++) {
            basesHtml += bases[i];
        };
        // alert('llego');
        // console.log('basesHtml > ',basesHtml);
        if (Utils.theValueExist(basesHtml)) {
            if (tipo == 'Front') {
                $('#ModalesFront').append(basesHtml);
                /*Pone los porcentajes después de dos segundos de poner los htmls*/
                var configLiquid = liquidFillGaugeDefaultSettings();
                setTimeout(function() {
                    for (var i = 0; i < data.length; i++) {
                        configLiquid.circleColor = data[i].porcentaje.circleColor;
                        configLiquid.textColor = data[i].porcentaje.textColor;
                        configLiquid.waveTextColor = data[i].porcentaje.waveTextColor;
                        configLiquid.waveColor = data[i].porcentaje.waveColor;
                        configLiquid.maxValue = 120;
                        configLiquid.circleThickness = 0.2;
                        configLiquid.textVertPosition = 0.2;
                        configLiquid.waveAnimateTime = 2000;
                        configLiquid.waveHeight = 0.07;
                        configLiquid.circleThickness = 0.05; // The outer circle thickness as a percentage of it's radius.
                        configLiquid.circleFillGap = 0.05; // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
                        loadLiquidFillGauge("fillgauge-" + data[i].nombreToSelector, data[i].porcentaje.valor, configLiquid);
                    }
                }, 2000);
            }
            if (tipo == 'Back') {
                $('#ModalesBack').append(basesHtml);
                var configLiquid = liquidFillGaugeDefaultSettings();
                /*Pone los porcentajes después de dos segundos de poner los htmls*/
                setTimeout(function() {
                    for (var i = 0; i < data.length; i++) {
                        configLiquid.circleColor = data[i].porcentaje.circleColor;
                        configLiquid.textColor = data[i].porcentaje.textColor;
                        configLiquid.waveTextColor = data[i].porcentaje.waveTextColor;
                        configLiquid.waveColor = data[i].porcentaje.waveColor;
                        configLiquid.maxValue = 120;
                        configLiquid.circleThickness = 0.2;
                        configLiquid.textVertPosition = 0.2;
                        configLiquid.waveAnimateTime = 2000;
                        configLiquid.waveHeight = 0.07;
                        configLiquid.circleThickness = 0.05; // The outer circle thickness as a percentage of it's radius.
                        configLiquid.circleFillGap = 0.05; // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
                        loadLiquidFillGauge("fillgauge-" + data[i].nombreToSelector, data[i].porcentaje.valor, configLiquid);
                    }
                }, 2000);
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////
    // EJECUTA LOAS COSAS PARA CREAR LOS MODALES Y AGREGAR LOS LENGUAJES EN EL HTML //
    //////////////////////////////////////////////////////////////////////////////////
    // console.log($scope.frontEndLanguages)
    creaHtmlLanguagesFrontLg($scope.frontEndLanguages);
    creaHtmlLanguagesBackLg($scope.backEndLanguages);
    creaHtmlLanguagesBackOrFrontXs($scope.frontEndLanguages, 'Front');
    creaHtmlLanguagesBackOrFrontXs($scope.backEndLanguages, 'Back');
    creaHtmlModals($scope.frontEndLanguages, 'Front');
    creaHtmlModals($scope.backEndLanguages, 'Back');
    /**
     * Inicializa el carousel de xs
     */
    $('.carousel').carousel();

    /**
     * [dismissible inicializa propiedades de los modales, aparte los activa]
     * @type {Boolean}
     */
    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        // opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
    });
    /*correo*/
    $scope.dataFormulario = {
        'Nombre': null,
        'Correo': null,
        'Mensaje': null
    };

    $scope.enviarCorreo = function() {
        if ($scope.correoForm.$valid) {
            $.ajax({
                type: 'POST',
                data: $scope.dataFormulario,
                // url:  'http://localhost/proyectos/portafolio/index/views/email.php',
                url: 'http://www.romaef.com/views/email.php',
                success: function(data) {
                    $('.formlarioContacto').removeClass('bounceIn');
                    $('.formlarioContacto').fadeOut();
                    $('.agradecimiento').fadeIn();
                    setTimeout(function() {
                        $('.agradecimiento').fadeOut();
                        $('.formlarioContacto').fadeIn('slow');
                        $('.formlarioContacto').addClass('bounceIn');
                        $('input,textarea').val('');
                        $scope.dataFormulario.Nombre = null;
                        $scope.dataFormulario.Correo = null;
                        $scope.dataFormulario.Mensaje = null;
                    }, 5000);
                }
            })
        } else {}
    };
})