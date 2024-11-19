var express = require('express');
var app     = express();

app.use('/languages', require('./api-routes/languagesRoute'));
app.use('/empresas', require('./api-routes/empresasRoute'));
app.use('/usuarios', require('./api-routes/usuariosRoute'));
app.use('/articulos', require('./api-routes/articulosRoute'));
app.use('/medias', require('./api-routes/mediasRoute'));
/** Developer Router **/
module.exports = app;
