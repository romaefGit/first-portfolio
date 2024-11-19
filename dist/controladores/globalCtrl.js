app.controller('globalCtrl', function($scope, $location, Utils) {
    var css = "font-size: 20px;background: #222; color: #1cdcea";
    console.log("%c%s", css, 'www.romaef.com');
    // Menu
    $scope.closeNav = function() {
        $('.sidenav-roma').fadeOut('fast', function() {
            Utils.enableScrolling();
        });
    };

    $scope.clickEnNavButton = function() {
        // removiendo sidenav overlay
        // console.log('hey');
        $('.sidenav-roma').fadeIn('fast', function() {
            Utils.disableScrolling();
        });
    };


    $scope.goToContact = function() {
        if($location.$$path == '/inicio'){
            $('.sidenav-roma').fadeOut('fast', function() {
                Utils.enableScrolling();
                $('html, body').animate({
                    scrollTop: $(document).height()
                }, 1200);
            });
        }else{
            Utils.enableScrolling();
            $location.path('/inicio').search({var: 'con'});
        }
    };
    
    $scope.inicio = function() {
        if($location.$$path !== '/inicio'){
            Utils.enableScrolling();
            $location.path('/inicio').search();
        }else{
            $scope.closeNav();
        }
    };

    $scope.hojaDeVida = function() {
        $('body').removeClass('loaded');
        if($location.$$path !== '/informacion'){
            Utils.enableScrolling();
            $location.path('/informacion').search();
        }else{
            $scope.closeNav();
        }
    };

    $scope.fullstack = function() {
        $('body').removeClass('loaded');
        if($location.$$path !== '/fullstack'){
            Utils.enableScrolling();
            $location.path('/fullstack').search();
        }else{
            $scope.closeNav();
        }
    };

    let entre = false;
    $scope.$watch(function() {
        let urlParams = $location.search();
        // console.log('urlParams > ',urlParams);
        if (Utils.theValueExist(urlParams) && entre == false) {
            let con = urlParams.var;
            if (Utils.theValueExist(con)) {
                if (con == 'con') {
                    $scope.goToContact();
                    window.location.href = window.location.href.split("?")[0];
                    entre = true;
                }
            }
        }
    });
});