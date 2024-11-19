app.controller('hojadevidaCtrl', function($scope, $location, Utils) {
    $('.css-a-remover').remove();
    
    $scope.init = function(){
        $scope.closeNav(); // in appController menu
        $(document).find('head').append('<link class="css-a-remover" href="public/landing/css-site/hojadevida.css" rel="stylesheet">');
        $(document).find('head').append('<link class="css-a-remover" href="public/landing/css-site/circulo_animado.css" rel="stylesheet">');
        $('.parallax').parallax();
        $scope.imagenUno = 'public/landing/img/elegidas-hv/lg/1.png';
        if (Utils.getWidth() > 1024) {
            $scope.imagenUno = 'public/landing/img/elegidas-hv/lg/1.png';
        }
        if (Utils.getWidth() < 1024) {
            $scope.imagenUno = 'public/landing/img/elegidas-hv/md/1.png';
        }
        if (Utils.getWidth() <= 768) {
            $scope.imagenUno = 'public/landing/img/elegidas-hv/md/1.png';
        }
        $scope.imagenDos = 'public/landing/img/elegidas-hv/lg/2.png';
        if (Utils.getWidth() > 1024) {
            $scope.imagenDos = 'public/landing/img/elegidas-hv/lg/2.png';
        }
        if (Utils.getWidth() < 1024) {
            $scope.imagenDos = 'public/landing/img/elegidas-hv/md/2.png';
        }
        if (Utils.getWidth() <= 768) {
            $scope.imagenDos = 'public/landing/img/elegidas-hv/md/2.png';
        }
        $scope.imagenTres = 'public/landing/img/elegidas-hv/lg/3.png';
        if (Utils.getWidth() > 1024) {
            $scope.imagenTres = 'public/landing/img/elegidas-hv/lg/3.png';
        }
        if (Utils.getWidth() < 1024) {
            $scope.imagenTres = 'public/landing/img/elegidas-hv/md/3.png';
        }
        if (Utils.getWidth() <= 768) {
            $scope.imagenTres = 'public/landing/img/elegidas-hv/md/3.png';
        }
        // viendo cuando cargan las imagenes
        var $img = $('img');
            $img.on('load', triggerAction);
        if ($img.length > 0 && !$img.get(0).complete) {
        }
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
                }, 2000);
                // $('h1').css('color', '#222222');
            }, 2000);
            // console.log('img has been loaded');
        }
    };

    $scope.excelsysLanguages = [
	    {
	        imgUrl: 'public/landing/img/lenguajes/javascript.png',
	        imgUrlModal: 'public/landing/img/lenguajes/javascript.png',
	        title:'JavaScript',
	        nombreToSelector: 'JavaScript',
	        descripcion: 'Aunque empecé a conocerlo con jquery, el lenguaje puro de este lo fui conociendo de a poco, ya hace 3 años que lo uso y he podido generar componentes desde cero sin usar alguna otra librería.'
	    },
	    {
	        imgUrl: 'public/landing/img/lenguajes/jquery.png',
	        imgUrlModal: 'public/landing/img/lenguajes/jquery.png',
	        title:'jQuery',
	        nombreToSelector: 'jQuery',
	        descripcion: 'Lo manejo hace ya 3 años y es usado para generar flujos de información entre html y JavaScript de una manera más eficiente que usando solo Javascript.'
	    },
	    {
	        imgUrl: 'public/landing/img/lenguajes/html5.png',
	        imgUrlModal: 'public/landing/img/lenguajes/html5.png',
	        title:'HTML5',
	        nombreToSelector: 'HTML5',
	        descripcion: 'Este lenguaje de etiquetas es la estructura en la que se construye la presentación de una página web y aplicaciones hibridas.'
	    },
	    {
	        imgUrl: 'public/landing/img/lenguajes/css3.png',
	        imgUrlModal: 'public/landing/img/lenguajes/css3.png',
	        title:'CSS3',
	        nombreToSelector: 'CSS3',
	        descripcion: 'Con esto se da estilo a los elementos del HTML, dichos elementos tienen un estilo por defecto pero el CSS da la libertad de poder agregar nuevas propiedas a esos elementos.'
	    }
	];

	$scope.grimorumLanguages = [
	    {
            imgUrl: 'public/landing/img/lenguajes/javascript.png',
            imgUrlModal: 'public/landing/img/lenguajes/javascript.png',
            title:'JavaScript',
            nombreToSelector: 'JavaScript',
            descripcion: 'Aunque empecé a conocerlo con jquery, el lenguaje puro de este lo fui conociendo de a poco, ya hace 3 años que lo uso y he podido generar componentes desde cero sin usar alguna otra librería.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/angular.png',
            imgUrlModal: 'public/landing/img/lenguajes/angular_modal.png',
            title:'Angular 1',
            nombreToSelector: 'Angular',
            descripcion: 'He manejado este lenguaje ya hace más de dos años, tengo un amplio conocimiento en la primer version de este lenguaje, le he implementado varios componentes que dan agilidad a la hora de desarrollar y cumplir los flujos que se requieran.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/jquery.png',
            imgUrlModal: 'public/landing/img/lenguajes/jquery.png',
            title:'jQuery',
            nombreToSelector: 'jQuery',
            descripcion: 'Lo manejo hace ya 3 años y es usado para generar flujos de información entre html y JavaScript de una manera más eficiente que usando solo Javascript.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/bootstrap.png',
            imgUrlModal: 'public/landing/img/lenguajes/bootstrap.png',
            title:'Bootstrap',
            nombreToSelector: 'Bootstrap',
            descripcion: 'Con el me sumergí en el concepto responsivo de las paginas actuales, llevo usándolo ya hace 3 años y me desenvuelvo bien a la hora de desarrollar en este.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/ionic.png',
            imgUrlModal: 'public/landing/img/lenguajes/ionic.png',
            title:'Ionic',
            nombreToSelector: 'Ionic',
            descripcion: 'Desde que salio, llevo usando su primera version y el uso de este es muy sencillo de entender ya que se basa en angularJs v1, he desarrollado dos prototipos de aplicaciones en android y dos aplicaciones ya en las tiendas conocidas como AppStore y PlayStore.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/materialize.png',
            imgUrlModal: 'public/landing/img/lenguajes/materialize.png',
            title:'Materialize',
            nombreToSelector: 'Materialize',
            descripcion: 'Este es un framework hecho por google y de uso abierto, esta página está basada en este framework, lo he usado hace un año, pero igual su documentación es muy completa y fácil de entender a la hora de desarrollar.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/cordova.png',
            imgUrlModal: 'public/landing/img/lenguajes/cordova.png',
            title:'Cordova',
            nombreToSelector: 'Cordova',
            descripcion: 'Es el compilador de aplicaciones web, el que permite crear un proyecto web y covertirlo en una APP; tengo experiencia de 2 años en su uso.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/nodejs.png',
            imgUrlModal: 'public/landing/img/lenguajes/nodejs_modal.png',
            title:'NodeJs',
            nombreToSelector: 'NodeJs',
            descripcion: 'Este lenguaje es Javascript pero ahora del lado del servidor y no del cliente, tengo experiencia de 2 años en su uso y es practicamente sencillo implementar cualquier base de datos para crear los servicios CRUD para un proyecto.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/mongodb.png',
            imgUrlModal: 'public/landing/img/lenguajes/mongodb_modal.png',
            title:'MongoDB',
            nombreToSelector: 'MongoDB',
            descripcion: 'Es un base de datos hecha con JavaScript y es no relacional, la comunicacion con esta base de datos es sencilla y muy rápida, tengo experiencia de 1 año en su uso.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/php7.png',
            imgUrlModal: 'public/landing/img/lenguajes/php7.png',
            title:'PHP',
            nombreToSelector: 'PHP',
            descripcion: 'Estuve desarrollando dos años en este lenguaje con un framework llamado SMARTY que usaba MVC para y model DOF para la conexión con la base de datos.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/mysql2.png',
            imgUrlModal: 'public/landing/img/lenguajes/mysql2.png',
            title:'MySQL',
            nombreToSelector: 'MySQL',
            descripcion: 'Es la primera base de datos que manejo y al use en varios proyectos para hacer un buen flujo de información entre front y back.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/git.png',
            imgUrlModal: 'public/landing/img/lenguajes/git.png',
            title:'Git',
            nombreToSelector: 'Git',
            descripcion: 'El manejo de versiones para los proyectos es muy chévere con esto, llevo usándolo 3 años con repositorios como GitLab y BitBucket'
        }
	];

	$scope.cultivandoLanguages = [
        {
            imgUrl: 'public/landing/img/lenguajes/angular.png',
            imgUrlModal: 'public/landing/img/lenguajes/angular_modal.png',
            title:'Angular 1',
            nombreToSelector: 'Angular',
            descripcion: 'He manejado este lenguaje ya hace más de dos años, tengo un amplio conocimiento en la primer version de este lenguaje, le he implementado varios componentes que dan agilidad a la hora de desarrollar y cumplir los flujos que se requieran.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/jquery.png',
            imgUrlModal: 'public/landing/img/lenguajes/jquery.png',
            title:'jQuery',
            nombreToSelector: 'jQuery',
            descripcion: 'Lo manejo hace ya 3 años y es usado para generar flujos de información entre html y JavaScript de una manera más eficiente que usando solo Javascript.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/materialize.png',
            imgUrlModal: 'public/landing/img/lenguajes/materialize.png',
            title:'Materialize',
            nombreToSelector: 'Materialize',
            descripcion: 'Este es un framework hecho por google y de uso abierto, esta página está basada en este framework, lo he usado hace un año, pero igual su documentación es muy completa y fácil de entender a la hora de desarrollar.'
        },
        {
            imgUrl: 'public/landing/img/lenguajes/nodejs.png',
            imgUrlModal: 'public/landing/img/lenguajes/nodejs_modal.png',
            title:'NodeJs',
            nombreToSelector: 'NodeJs',
            descripcion: 'Este lenguaje es Javascript pero ahora del lado del servidor y no del cliente, tengo experiencia de 2 años en su uso y es practicamente sencillo implementar cualquier base de datos para crear los servicios CRUD para un proyecto.'
        },
	];

    $scope.eltiempoLanguages = [
        {
            imgUrl: 'public/landing/img/lenguajes/php7.png',
            imgUrlModal: 'public/landing/img/lenguajes/php7.png',
            title:'PHP',
            nombreToSelector: 'PHP',
            descripcion: 'Estuve desarrollando dos años en este lenguaje con un framework llamado SMARTY que usaba MVC para y model DOF para la conexión con la base de datos.'
        },
    ];

	$scope.empresas = [
		{
			nombreToSelector: 'excelsys',
			urlImagen: 'public/landing/img/empresas/excelsys2.png',
			color: '#9c1c1d',
			colorText: '#9c1c1d',
			blockColor: false,
			titulo: 'Excelsys',
			descripcion:'Fue en esta empresa donde desarrolle las primeras habilidades con la presentación de una pagina, cambiar textos, acomodar elementos, también aprendí mas de codigo y funcionalidades, manejo de eventos y cosas que enriquecen la experiencia de usuario.',
			lenguajesAprendidos: $scope.excelsysLanguages
		},
		{
			nombreToSelector: 'grimorum',
			urlImagen: 'public/landing/img/empresas/grimorum.png',
			color: '',
			colorText: '#ec6608',
			blockColor: true,
			titulo: 'Grimorum',
			descripcion:'Aquí aprendí de todo en tema de web, afiancé mis conocimientos y crecí de una manera increíble con ellos, tueve la oprtunidad de aprender Front y Back para la web y para aplicaciones hibridas, estuve en el desarrollo de 8 o mas proyectos de innovación.',
			lenguajesAprendidos: $scope.grimorumLanguages
		},
		{
			nombreToSelector: 'cultivando_futuro',
			urlImagen: 'public/landing/img/empresas/cultivando_futuro.png',
			color: '',
			colorText: '#fc583b',
			blockColor: true,
			titulo: 'Cultivando Futuro',
			descripcion:'Estuve poco tiempo pero aprendí sobre el problema que tiene ahora el agro en el país y como ellos pueden mejorarlo, de una manera en la que con un click en el mapa del país, se pueda saber que agricultores hay y de cada uno de ellos saber sobre sus fincas, su producción, sus siembras y demás, ayudando a que compradores contacten directamente al productor o grupos de productores.',
			lenguajesAprendidos: $scope.cultivandoLanguages
		},
		{
			nombreToSelector: 'el_tiempo',
			urlImagen: 'public/landing/img/empresas/el_tiempo.png',
			color: '',
			colorText: '#000000',
			blockColor: true,
			titulo: 'El Tiempo',
			descripcion:'Trabajo actualmente como contratista y he aprendido CodeIgniter en PHP 5.',
			lenguajesAprendidos: $scope.eltiempoLanguages
		},
        // {
        //     nombreToSelector: 'sci_software',
        //     urlImagen: 'public/landing/img/empresas/sci.png',
        //     color: '#000000',
        //     colorText: '#000000',
        //     blockColor: false,
        //     titulo: 'SCI Software',
        //     descripcion:'Es dónde trabajo acualmente.',
        //     lenguajesAprendidos: []
        // }
	];

	$scope.estudios = [
		{
			titulo: 'SENA',
			urlImagen: 'public/landing/img/estudios/sena.png',
			descripcion: 'Estuve estudiando un año seguido con seis meses de etapa lectiva y seis meses de etapa práctica, durante el proceso aprendí sobre lenguaje HTML, CSS Y PHP; me gradué como técnico en programación de software en el 2013.',
			nombreToSelector: 'SENA',
			color: '',
			colorText: '#fc7323',
			blockColor: true,
		}

	];

	var creaHtmlModals = function(data, tipo){
	    let base = [];
	    let bases = [];
	    let baseHtml = '';
	    
	    for (var i = 0; i < data.length; i++) {
	        base = ['<div class="modal bottom-sheet" id="modal-'+data[i].nombreToSelector+'" style="border-top: 6px solid '+data[i].colorText+'">',
	                    '<div class="modal-content">',
	                        '<div class="row">',
	                            '<div class="col l4 m4 s12">',
	                            	'<div style="width: 245px; height: 245px; margin: 0 auto; background: '+data[i].color+'">',
	                                	'<img class="responsive-img img-size-equal" src="'+data[i].urlImagen+'">',
	                                '</div>',
	                            '</div>',
	                            '<div class="col l8 m8 s12">',
	                            	'<h3 class="text-center" style="color: '+data[i].colorText+'">'+data[i].titulo+'</h3>',
	                                '<p class="black-text text-lighten-1 flow-text">'+data[i].descripcion+'</p>',
		                            '<div>',
		                            '<h5 style="color: '+data[i].colorText+'">Aprendí mas sobre:</h5>',
		                            ''+makeChipsHtml(data[i].lenguajesAprendidos),
		                            '</div>',
	                            '</div>',
	                        '</div>',
	                    '</div>',
	                '</div>'];
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
	    $('#ModalesEmpresas').append(basesHtml);

	};

	var creaHtmlEstudiosModals = function(data, tipo){
	    let base = [];
	    let bases = [];
	    let baseHtml = '';
	    
	    for (var i = 0; i < data.length; i++) {
	        base = ['<div class="modal bottom-sheet" id="modal-'+data[i].nombreToSelector+'" style="border-top: 6px solid '+data[i].colorText+'">',
	                    '<div class="modal-content">',
	                        '<div class="row">',
	                            '<div class="col l4 m4 s12">',
	                            	'<div style="width: 245px; height: 245px; margin: 0 auto; background: '+data[i].color+'">',
	                                	'<img class="responsive-img img-size-equal" src="'+data[i].urlImagen+'">',
	                                '</div>',
	                            '</div>',
	                            '<div class="col l8 m8 s12">',
	                            	'<h3 class="text-center" style="color: '+data[i].colorText+'">'+data[i].titulo+'</h3>',
	                                '<p class="black-text text-lighten-1 flow-text">'+data[i].descripcion+'</p>',
		                            '<div>',
		                           /* '<h5 style="color: '+data[i].colorText+'">Aprendí mas sobre:</h5>',
		                            ''+makeChipsHtml(data[i].lenguajesAprendidos),
		                            '</div>',*/
	                            '</div>',
	                        '</div>',
	                    '</div>',
	                '</div>'];
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
	    $('#ModalesEstudios').append(basesHtml);

	};

	var makeChipsHtml = function(languages){
	    let base = [];
	    let bases = [];
	    let baseHtml = '';
		for (var i = 0; i < languages.length; i++) {
			base = ['<div class="chip contenedor-chip" data-class="contenedor-chip">',
                      '<img src="'+languages[i].imgUrl+'" alt="'+languages[i].title+'">',
                      ''+languages[i].title,
                    '</div>'];
	        for (var a = 0; a < base.length; a++) {
	            baseHtml += base[a];
	        };
	        bases.push(baseHtml);
	        base = [];
	        baseHtml = '';
		}
		var basesHtml = '';
	    for (var i = 0; i < bases.length; i++) {
	        basesHtml += bases[i];
	    };
	    return basesHtml;
	};

	var animacionesAleatorias = function(tipo) {
		let arregloAnimaciones = [];
		let aleatorio;
		if(tipo == 'contenedor-empresa' || tipo == 'contenedor-estudio'){
	        arregloAnimaciones = [
	            'bounce',
	            'snake',
	        ];
	        aleatorio = Math.round(Math.random() * (arregloAnimaciones.length-1));
		}
		if(tipo == 'contenedor-chip'){
	        arregloAnimaciones = [
	            'pulse',
	            'swing',
	            'snake',
	            'jello'
	        ];
	        aleatorio = Math.round(Math.random() * (arregloAnimaciones.length-1));
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
    $(document).on('mouseenter','.contenedor-empresa, .contenedor-estudio, .contenedor-chip',function() {
    	let clase = $(this).attr('data-class');
        $(this).removeClass('animated ' + animacionesAleatorias(clase));
        $(this).animateCss(animacionesAleatorias(clase));
    });

    $(document).on('mouseenter','.atomico',function() {
        $(this).removeClass('animated pulse');
        $(this).animateCss('pulse');
    });

    $(document).on('click','.atomico',function() {
    	$(this).removeClass('animated pulse');
        $(this).removeClass('animated rubberBand');
        $(this).animateCss('rubberBand');
    });


	creaHtmlModals($scope.empresas);

	creaHtmlEstudiosModals($scope.estudios);
	$('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        // opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
    });
})
