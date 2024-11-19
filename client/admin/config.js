//Romario Augusto Estrada Flórez//
app.factory('Config', function() {
    return {
        //Inicio de las utilidades
        server: function() {
            var obj = {
                url: 'http://localhost:3000/server/api',
            };
            return obj;
        },
        //Fin de las utilidades
    };
});