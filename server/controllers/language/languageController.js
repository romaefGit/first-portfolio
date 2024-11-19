var models  = require('../../models/models.js');
var multer = require('multer');
var path = require('path'); // saber bien el path del proyecto
var root = path.resolve(__dirname);
var fs = require('fs');

/**
 * Autor - Romario Estrada - www.romaef.com
 * [listLanguages GET - lista los lenguajes]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.listLanguages = function (req, res) {
    let response = {
        status: false,
        message: 'No se pudieron traer los lenguajes'
    };
    models.Languages.findAll({
        include: [
            { 
                model: models.Medias,
                attributes: ['url','idmedia']
            }
        ]
    }).then((languages) => {
        response.status = true;
        response.languages = languages;
        response.message = 'Se trajeron los lenguajes correctamente.';
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};

/** 
 * Autor - Romario Estrada - www.romaef.com
 * [listLanguagesBy GET - lista los lenguajes por el nombre del campo que venga]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.listLanguagesBy = function (req, res) {
    let byWhat = req.params.by;
    let response = {
        status: false,
        message: 'No se pudieron traer los lenguajes por el campo igual a '+byWhat
    };
    models.Languages.findAll({
        attributes: ['idlanguage',byWhat]
    }).then((languages) => {
        response.status = true;
        response.languages = languages;
        response.message = 'Se trajeron los lenguajes correctamente por el campo igual a '+byWhat;
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};

exports.addLanguage = function(req, res){
    let language = req.body.language;
    let response = {
        status: false,
        message: 'No se pudo crear el lenguaje.'
    };
    let languageToSave = {
        nombre: language.nombre,
        porcentaje: language.porcentaje,
        tipo: language.tipo.nombre,
        selector: language.selector,
        descripcion: language.descripcion
    };
    // console.log('languageToSave > ', languageToSave);
    models.Languages.create(languageToSave).then((save) => {
        // console.log('save >>>>>> ',save);
        response.status = true;
        response.message = 'Se creó correctamente el lenguaje';
        response.idlanguage = save.idlanguage;
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    });
};

exports.editLanguage = function(req, res){
    let id_language = req.params.id;
    let language = req.body.language;
    let response = {
        status: false,
        message: 'No se pudo crear el lenguaje.'
    };
    let languageToUpdate = {
        nombre: language.nombre,
        porcentaje: language.porcentaje,
        tipo: language.tipo.nombre,
        selector: language.selector,
        descripcion: language.descripcion
    };
    // console.log('languageToUpdate > ', languageToUpdate);
    models.Languages.update(languageToUpdate, {
        where: {
            idlanguage: id_language
        }
    }).then((update) => {
        // console.log('update >>>>>> ',update);
        response.status = true;
        response.message = 'Se actualizó correctamente el lenguaje';
        response.idlanguage = update.idlanguage;
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    });
};

exports.deleteLanguage = function(req, res){
    let id_language = req.params.id;
    let idmedia = req.params.idmedia;
    let url = req.params.url;
    let response = {
        status: false,
        message: 'No se pudo eliminar el lenguaje.'
    };
    if(url != ''){
        models.Medias.destroy({where: {idmedia: idmedia}}).then((des) => {
            // elimina de la carpeta del servidor
            let filePath = root + '../../../../public/img/lenguajes/'+url; 
            fs.unlink(filePath, function(err) {
                // console.log('err > ',err);
                response.status = true;
                response.message = 'Se eliminó la imagen correctamente.';
                // res.status(200).send(response);
                models.Languages.destroy({
                    where: {
                        idlanguage: id_language
                    }
                }).then((resp) => {
                    // console.log('update >>>>>> ',update);
                    response.status = true;
                    response.message = 'Se eliminó correctamente el lenguaje.';
                    response.idlanguage = resp;
                    res.status(200).send(response);
                }).catch((err) => {
                    response.error = err;
                    res.status(404).send(response);
                });
            });
        }).catch((err) => {
            response.status = false;
            response.error = err;
            response.message = 'No se pudo eliminar de la db.';
            res.status(404).send(response);
        });
    }else{
        models.Languages.destroy({
            where: {
                idlanguage: id_language
            }
        }).then((resp) => {
            // console.log('update >>>>>> ',update);
            response.status = true;
            response.message = 'Se eliminó correctamente el lenguaje.';
            response.idlanguage = resp;
            res.status(200).send(response);
        }).catch((err) => {
            response.error = err;
            res.status(404).send(response);
        });
    }
};