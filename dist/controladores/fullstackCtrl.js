app.controller('fullstackCtrl', function($scope, $location, Utils) {
    $scope.init = function() {
        $(document).find('.css-a-remover').remove();
        $scope.closeNav(); // in appController menu
        $scope.imagenUno = 'public/landing/img/elegidas/fullstack.png';
        $(document).find('head').append('<link class="css-a-remover" href="public/landing/css-site/fullstack.css" rel="stylesheet">');

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
                }, 3000);
                // $('h1').css('color', '#222222');
            }, 3000);
        };
    };
  
    $(function() {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        // $('.materialboxed').materialbox();
        // $('.materialboxed2').materialbox();
    }); // end of document ready


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
    $(document).on('mouseenter','.composicionBlock', function(){
        $(this).animateCss('pulse');
    });
    $(document).on('mouseenter','.material-icons', function(){
        $(this).animateCss('jello');
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
    
})