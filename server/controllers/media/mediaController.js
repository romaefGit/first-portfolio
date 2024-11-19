var models  = require('../../models/models.js');
var multer = require('multer');
var path = require('path'); // saber bien el path del proyecto
var root = path.resolve(__dirname);
var fs = require('fs');

// usuarios 
exports.uploadImgUser = function (req, res) {
    let id_usuario = req.params.id;
    // console.log('id_usuario > ',id_usuario);
    let media = {};
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, root + '../../../../public/img/usuarios/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            console.log('file > ', file);
            cb(null, id_usuario + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            media.url = id_usuario + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    let response = {
        status: false,
        message: 'No se pudo subir la imagen.',
    };
    upload(req, res, function(err){
        if(err){
            response.error = err;
            res.status(404).send(response);
            return;
        }else{
            response.status = true;
            response.message = 'Se subió la imagen correctamente.';
            response.media = media;
            // guarda el nombre de la imagen
            models.Medias.create(media).then((save) => {
                if(save){
                    response.media.idmedia = save.idmedia;
                    // trae el idmedia antiguo
                    models.Usuarios.find({where: {'idusuario': id_usuario}, attributes: ['idmedia']}).then((usuario) => { 
                        if(usuario.idmedia){ // si hay idmedia borra ese media
                            
                            models.Medias.findOne({where: {idmedia: usuario.idmedia}, attributes: ['url']}).then((media) => {
                                let urlmedia = media.url;
                                models.Medias.destroy({where: {idmedia: usuario.idmedia}}).then((des) => {
                                    
                                    // elimina de la carpeta del servidor
                                    let filePath = root + '../../../../public/img/usuarios/'+urlmedia; 
                                    fs.unlinkSync(filePath);
                                    
                                    // actualiza el usuario con el nuevo idmedia
                                    models.Usuarios.update({idmedia: save.idmedia},{where: {idusuario: id_usuario}}).then((updated) => { 
                                        response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                        res.status(200).send(response);
                                    }).catch((err) => {
                                        response.status = false;
                                        response.error = err;
                                        response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                        res.status(404).send(response);
                                    });
                                }).catch((err) => {
                                    response.status = false;
                                    response.error = err;
                                    response.message = 'No se pudo eliminar el idmedia.';
                                    res.status(404).send(response);
                                });
                            });
                        }else{ // si no hay, solo actualiza
                            // actualiza el usuario con el nuevo idmedia
                            models.Usuarios.update({idmedia: save.idmedia},{where: {'idusuario': id_usuario}}).then((updated) => { 
                                response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                res.status(200).send(response);
                            }).catch((err) => {
                                response.status = false;
                                response.error = err;
                                response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                res.status(404).send(response);
                            });
                        }
                    }).catch((err) => {
                        response.status = false;
                        response.error = err;
                        response.message = 'No se encontro el usuario';
                        res.status(404).send(response);
                    });
                }else{
                    response.status = false;
                    response.message = 'Se subió la imagen pero hubo error en el guardar.';
                }
            }).catch((err) => {
                response.status = false;
                response.error = err;
                response.message = 'Se subió la imagen pero no se guardó en db.';
                res.status(404).send(response);
            })
        }
    });
};

exports.deleteImgUser = function (req, res) {
    let media = req.body.media;
    let response = {};
    response.status = false;
    response.message = 'No se pudo eliminar la imagen.';
    // trae el idmedia antiguo
    if(media){
        models.Medias.destroy({where: {idmedia: media.idmedia}}).then((des) => {
            // elimina de la carpeta del servidor
            let filePath = root + '../../../../public/img/usuarios/'+media.url; 
            fs.unlink(filePath, function(err) {
                response.status = true;
                response.message = 'Se eliminó la imagen correctamente.';
                res.status(200).send(response);
            });
        }).catch((err) => {
            response.status = false;
            response.error = err;
            response.message = 'No se pudo eliminar de la db.';
            res.status(404).send(response);
        });
    }else{ // si no hay, solo actualiza
        response.status = false;
        response.error = err;
        response.message = 'No hay media.';
        res.status(404).send(response);
    }
};

// lenguajes
exports.uploadImgLanguage = function(req, res){
    let id_language = req.params.id;
    // console.log('id_language > ',id_language);
    let media = {};
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, root + '../../../../public/img/lenguajes/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            // console.log('file > ', file);
            cb(null, id_language + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            media.url = id_language + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    let response = {
        status: false,
        message: 'No se pudo subir la imagen.',
    };
    upload(req, res, function(err){
        if(err){
            response.error = err;
            res.status(404).send(response);
            return;
        }else{
            response.status = true;
            response.message = 'Se subió la imagen correctamente.';
            response.media = media;
            // guarda el nombre de la imagen
            models.Medias.create(media).then((save) => {
                if(save){
                    response.media.idmedia = save.idmedia;
                    // trae el idmedia antiguo
                    models.Languages.find({where: {'idlanguage': id_language}, attributes: ['idmedia']}).then((language) => { 
                        if(language.idmedia){ // si hay idmedia borra ese media
                            
                            models.Medias.findOne({where: {idmedia: language.idmedia}, attributes: ['url']}).then((media) => {

                                let urlmedia = media.url;
                                models.Medias.destroy({where: {idmedia: language.idmedia}}).then((des) => {

                                    // elimina de la carpeta del servidor
                                    let filePath = root + '../../../../public/img/lenguajes/'+urlmedia; 
                                    fs.unlinkSync(filePath);
                                    
                                    // actualiza el language con el nuevo idmedia
                                    models.Languages.update({idmedia: save.idmedia},{where: {idlanguage: id_language}}).then((updated) => { 
                                        response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                        res.status(200).send(response);
                                    }).catch((err) => {
                                        response.status = false;
                                        response.error = err;
                                        response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                        res.status(404).send(response);
                                    });
                                }).catch((err) => {
                                    response.status = false;
                                    response.error = err;
                                    response.message = 'No se pudo eliminar el idmedia.';
                                    res.status(404).send(response);
                                });
                            });
                        }else{ // si no hay, solo actualiza
                            // actualiza el lenguaje con el nuevo idmedia
                            models.Languages.update({idmedia: save.idmedia},{where: {'idlanguage': id_language}}).then((updated) => { 
                                response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                res.status(200).send(response);
                            }).catch((err) => {
                                response.status = false;
                                response.error = err;
                                response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                res.status(404).send(response);
                            });
                        }
                    }).catch((err) => {
                        response.status = false;
                        response.error = err;
                        response.message = 'No se encontro el lenguaje';
                        res.status(404).send(response);
                    });
                }else{
                    response.status = false;
                    response.message = 'Se subió la imagen pero hubo error en el guardar.';
                }
            }).catch((err) => {
                response.status = false;
                response.error = err;
                response.message = 'Se subió la imagen pero no se guardó en db.';
                res.status(404).send(response);
            })
        }
    });
};

// empresas
exports.uploadImgEmpresa = function(req, res){
    let id_empresa = req.params.id;
    // console.log('id_empresa > ',id_empresa);
    let media = {};
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, root + '../../../../public/img/empresas/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            // console.log('file > ', file);
            cb(null, id_empresa + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            media.url = id_empresa + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    let response = {
        status: false,
        message: 'No se pudo subir la imagen.',
    };
    upload(req, res, function(err){
        if(err){
            response.error = err;
            res.status(404).send(response);
            return;
        }else{
            response.status = true;
            response.message = 'Se subió la imagen correctamente.';
            response.media = media;
            // guarda el nombre de la imagen
            models.Medias.create(media).then((save) => {
                if(save){
                    response.media.idmedia = save.idmedia;
                    // trae el idmedia antiguo
                    models.Empresas.find({where: {'idempresa': id_empresa}, attributes: ['idmedia']}).then((empresa) => { 
                        if(empresa.idmedia){ // si hay idmedia borra ese media
                            
                            models.Medias.findOne({where: {idmedia: empresa.idmedia}, attributes: ['url']}).then((media) => {

                                let urlmedia = media.url;
                                models.Medias.destroy({where: {idmedia: empresa.idmedia}}).then((des) => {

                                    // elimina de la carpeta del servidor
                                    let filePath = root + '../../../../public/img/empresas/'+urlmedia; 
                                    fs.unlinkSync(filePath);
                                    
                                    // actualiza el empresa con el nuevo idmedia
                                    models.Empresas.update({idmedia: save.idmedia},{where: {idempresa: id_empresa}}).then((updated) => { 
                                        response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                        res.status(200).send(response);
                                    }).catch((err) => {
                                        response.status = false;
                                        response.error = err;
                                        response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                        res.status(404).send(response);
                                    });
                                }).catch((err) => {
                                    response.status = false;
                                    response.error = err;
                                    response.message = 'No se pudo eliminar el idmedia.';
                                    res.status(404).send(response);
                                });
                            });
                        }else{ // si no hay, solo actualiza
                            // actualiza el lenguaje con el nuevo idmedia
                            models.Empresas.update({idmedia: save.idmedia},{where: {'idempresa': id_empresa}}).then((updated) => { 
                                response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                res.status(200).send(response);
                            }).catch((err) => {
                                response.status = false;
                                response.error = err;
                                response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                res.status(404).send(response);
                            });
                        }
                    }).catch((err) => {
                        response.status = false;
                        response.error = err;
                        response.message = 'No se encontro la empresa.';
                        res.status(404).send(response);
                    });
                }else{
                    response.status = false;
                    response.message = 'Se subió la imagen pero hubo error en el guardar.';
                }
            }).catch((err) => {
                response.status = false;
                response.error = err;
                response.message = 'Se subió la imagen pero no se guardó en db.';
                res.status(404).send(response);
            })
        }
    });
};

// articulos
exports.uploadImgArticulo = function(req, res){
    let id_articulo = req.params.id;
    // console.log('id_articulo > ',id_articulo);
    let media = {};
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, root + '../../../../public/img/articulos/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            // console.log('file > ', file);
            cb(null, id_articulo + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            media.url = id_articulo + '-img-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    let response = {
        status: false,
        message: 'No se pudo subir la imagen.',
    };
    upload(req, res, function(err){
        if(err){
            response.error = err;
            res.status(404).send(response);
            return;
        }else{
            response.status = true;
            response.message = 'Se subió la imagen correctamente.';
            response.media = media;
            // guarda el nombre de la imagen
            models.Medias.create(media).then((save) => {
                if(save){
                    response.media.idmedia = save.idmedia;
                    // trae el idmedia antiguo
                    models.Articulos.find({where: {'idarticulo': id_articulo}, attributes: ['idmedia']}).then((language) => { 
                        if(language.idmedia){ // si hay idmedia borra ese media
                            
                            models.Medias.findOne({where: {idmedia: language.idmedia}, attributes: ['url']}).then((media) => {

                                let urlmedia = media.url;
                                models.Medias.destroy({where: {idmedia: language.idmedia}}).then((des) => {

                                    // elimina de la carpeta del servidor
                                    let filePath = root + '../../../../public/img/articulos/'+urlmedia; 
                                    fs.unlinkSync(filePath);
                                    
                                    // actualiza el language con el nuevo idmedia
                                    models.Articulos.update({idmedia: save.idmedia},{where: {idarticulo: id_articulo}}).then((updated) => { 
                                        response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                        res.status(200).send(response);
                                    }).catch((err) => {
                                        response.status = false;
                                        response.error = err;
                                        response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                        res.status(404).send(response);
                                    });
                                }).catch((err) => {
                                    response.status = false;
                                    response.error = err;
                                    response.message = 'No se pudo eliminar el idmedia.';
                                    res.status(404).send(response);
                                });
                            });
                        }else{ // si no hay, solo actualiza
                            // actualiza el lenguaje con el nuevo idmedia
                            models.Articulos.update({idmedia: save.idmedia},{where: {'idarticulo': id_articulo}}).then((updated) => { 
                                response.message = 'Se subió la imagen correctamente, se guardó en db y se actualizó idmedia.';
                                res.status(200).send(response);
                            }).catch((err) => {
                                response.status = false;
                                response.error = err;
                                response.message = 'Se subió la imagen pero hubo error en el asociar id.';
                                res.status(404).send(response);
                            });
                        }
                    }).catch((err) => {
                        response.status = false;
                        response.error = err;
                        response.message = 'No se encontro el lenguaje';
                        res.status(404).send(response);
                    });
                }else{
                    response.status = false;
                    response.message = 'Se subió la imagen pero hubo error en el guardar.';
                }
            }).catch((err) => {
                response.status = false;
                response.error = err;
                response.message = 'Se subió la imagen pero no se guardó en db.';
                res.status(404).send(response);
            })
        }
    });
};

