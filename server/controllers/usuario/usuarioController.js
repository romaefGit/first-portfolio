var models = require('../../models/models.js');
// var logood  = require('../../utils/logood.js');
var sha1 = require('sha1');
var service = require('../../security/service');

/**
 * Autor - Romario Estrada - www.romaef.com
 * [login POST - Loguea y crea la autenticación]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.login = function (req, res) {
    let email = req.body.email.toLowerCase();
    let password = sha1(req.body.password);
    let response = {
        status: false,
        message: 'No hay un usuario con esos datos.',
        usuario: {}
    };
    models.Usuarios.find({
        where: {
            email: email,
            password: password
        }
    }).then(usuario => {
        if (usuario != null) {
            response.message = "Si hay un usuario con esos datos.";
            models.Medias.findOne({where: {idmedia: usuario.idmedia}, attributes: ['url','idmedia']}).then((media) =>{
                response.usuario = {
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    email: usuario.email,
                    idusuario: usuario.idusuario,
                    media: media
                };
                response.token = service.createToken(usuario);
                res.status(200).send(response);
            }).catch((err) => {
                response.message = 'Se trajo el usuario correctamente pero la imagen no.';
                response.error = err;
                res.status(404).send(response);
            })
        } else {
            res.status(404).send(response);
        }
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};

/**
 * Autor - Romario Estrada - www.romaef.com
 * [listUsuarios GET - lista 10 de los registros que hay]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.signup = function (req, res) {
    let usuario = req.body;
    let autenticacion = {
        email: usuario.email,
        password: usuario.password, // sin sha1
    };
    usuario.password = sha1(usuario.password);
    let response = {
        status: false,
        message: 'No se pudo crear el usuario.',
        autenticacion: {}
    };
    models.Usuarios.create(usuario).then((save) => {
        response.status = true;
        response.message = "Se creó el usuario satisfactoriamente";
        response.autenticacion = autenticacion;
        response.save = save;
        res.status(200).send(response);
    }).catch((err) => {
        res.status(404).send(response);
    })
};

/**
 * Autor - Romario Estrada - www.romaef.com
 * [listUsuarios GET - lista 10 de los registros que hay]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.listUsuarios = function (req, res) {
    models.Usuarios.findAll({
        limit: 10
    }).then((Usuarios) => {
        res.status(200).send(Usuarios);
    }).catch((err) => {
        res.status(404).send({error: err});
    })
};

/**
 * Autor - Romario Estrada - www.romaef.com
 * [getUsuario GET - trae el usuario]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.getUsuario = function (req, res) {
    let idusuario = req.params.idusuario;
    let response = {
        status: false,
        message: 'No se pudo traer el usuario.'
    };
    models.Usuarios.findOne({
        where: {
            idusuario: idusuario
        }
    })
    .then((usuario) => {
        response.status = true;
        response.message = 'Se trajo el usuario correctamente.';
        if(usuario.idmedia){
            models.Medias.findOne({where: {idmedia: usuario.idmedia}, attributes: ['url','idmedia']}).then((media) =>{
                response.usuario = {
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    email: usuario.email,
                    idusuario: usuario.idusuario,
                    media: media
                };
                res.status(200).send(response);
            }).catch((err) => {
                response.message = 'Se trajo el usuario correctamente pero la imagen no.';
                response.error = err;
                res.status(404).send(response);
            })
        }else{
            response.usuario = {
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                email: usuario.email,
                idusuario: usuario.idusuario,
                media: {url: 'default_5.png'}
            };
            res.status(200).send(response);
        }
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};
/**
 * Autor - Romario Estrada - www.romaef.com
 * [getUsuario GET - trae el usuario]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.updateUsuario = function (req, res) {
    let usuario = req.body.usuario;
    let response = {
        status: false,
        message: 'No se pudo actualizar el usuario.'
    };
    models.Usuarios.update(usuario, {
        where: {
            idusuario: usuario.idusuario
        }
    })
    .then((status) => {
        response.status = status;
        response.message = 'Se actualizó el usuario correctamente.';
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};

exports.updatePassword = function (req, res){
    let usuario = req.body.usuario;
    let response = {
        status: false,
        message: 'No se pudo actualizar la contraseña.'
    };
    // console.log('usuario > ',usuario);
    models.Usuarios.find({
        where: {
            idusuario: usuario.idusuario
        },
        attributes: ['password']
    })
    .then((usuario2) => {
        // console.log('usuario 2 > ',usuario2);
        // console.log(usuario2.password+' == '+sha1(usuario.password_nuevo));
        if(usuario2.password == sha1(usuario.password_actual)){
            // console.log('llego');
            models.Usuarios.update(
            {
                password: sha1(usuario.password_nuevo)
            }, 
            {
                where: {
                    idusuario: usuario.idusuario
                }
            })
            .then((status) => {
                response.status = status;
                response.message = 'Se actualizó la contraseña correctamente.';
                res.status(200).send(response);
            }).catch((err) => {
                response.error = err;
                res.status(404).send(response);
            })
        }else{
            response.message = 'La contraseña actual no coinicide con la ingresada.';
            res.status(404).send(response);
        }
    }).catch((err) => {
        response.error = err;
        response.message = 'Hay error al traer el password del usuario.';
        res.status(404).send(response);
    })
};