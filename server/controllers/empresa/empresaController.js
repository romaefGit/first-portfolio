var models  = require('../../models/models.js');
var validate  = require('../../validate/validate.js');
var multer = require('multer');
var path = require('path'); // saber bien el path del proyecto
var root = path.resolve(__dirname);
var fs = require('fs');
// funciones 
/**
 * Autor - Romario Estrada - www.romaef.com
 * [createLanguagesEmpresas - Agrega a la tabla de EmpresaHasLanguages los lenguajes 
 * que se escogieron para la empresa]
 * @param {integer} idempresa [el id de la empresa]
 * @param {array} languages [los lenguajes que se van a agregar]
 * @param {function} callback [la que retorna la respuesta]
 */
var createLanguagesEmpresas = function(idempresa, languages, callback){
    let response = {
        status: false,
        message: 'No se pudo crear el lenguaje.'
    };
    let languagesLength = languages.length;
    let count = 0;
    languages.forEach( function ( v, i ) {
        models.EmpresaHasLanguages.create({
            idlanguage: v.idlanguage, 
            idempresa: idempresa
        })
        .then( function ( definition ) {
            // console.log('se guardó > ',definition)
        });
        count++;
        // console.log(count+' == '+languagesLength);
        if(count == languagesLength){
            response.status = true;
            response.message = 'Se creó correctamente la empresa.';
            response.idempresa = idempresa;
            callback(response);
        }
    });
};
/**
 * Autor - Romario Estrada - www.romaef.com
 * [deleteLanguagesEmpresas - Elimina de la tabla de EmpresaHasLanguages los lenguajes 
 * que se borraron de la empresa]
 * @param {integer} idempresa [el id de la empresa]
 * @param {array} languages [los lenguajes que se van a agregar]
 * @param {function} callback [la que retorna la respuesta]
 */
var deleteLanguagesEmpresas = function(idempresa, languages, callback){
    let response = {
        status: false,
        message: 'No se pudieron eliminar los lenguajes.'
    };
    let count = 0;
    languages.forEach( function ( v, i , array) {
        models.EmpresaHasLanguages.destroy({where:{
                idlanguage: v.idlanguage, 
                idempresa: idempresa
            }
        })
        .then((definition) => {
            // console.log('se eliminó > ',definition)
        }).catch((error)=>{
            // console.log('error > ', error)
        });
        count++;
        // console.log(count+' == '+array.length);
        if(count == array.length){
            response.status = true;
            response.message = 'Se eleminaron correctamente los lenguajes de la empresa.';
            response.idempresa = idempresa;
            callback(response);
        }
    });
};

var editEmpresaLanguages = function (idempresa, languages, languagesDeleted, callback) {
    // cuando elimina y agrega nuevos
    if(validate.theValueExist(languages) && validate.theValueExist(languagesDeleted)){
        createLanguagesEmpresas(idempresa, languages, function(response){
            if(response.status){
                deleteLanguagesEmpresas(idempresa, languagesDeleted, function(deleted){
                    if(deleted.status){
                        callback(response);
                    }else{
                        callback(deleted); 
                    }
                });
            }else{
                callback(response); 
            }
        });
    }
    // cuando agrega nuevos pero no elimina
    if(validate.theValueExist(languages) && !validate.theValueExist(languagesDeleted)){
        createLanguagesEmpresas(idempresa, languages, function(response){
            if(response.status){
                callback(response);
            }else{
                callback(response); 
            }
        });
    }
    // cuando elimina pero no agrega nuevos
    if(validate.theValueExist(languagesDeleted) && !validate.theValueExist(languages)){
        deleteLanguagesEmpresas(idempresa, languagesDeleted, function(deleted){
            if(deleted.status){
                callback(deleted); 
            }else{
                callback(deleted); 
            }
        });
    }
};

// servicios
/**
 * Autor - Romario Estrada - www.romaef.com
 * [listEmpresas GET - lista 10 de los registros que hay]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.listEmpresas = function (req, res) {
    let response = {
        status: false,
        message: 'No se pudieron traer las empresas'
    };
    
    models.Empresas.findAll({
        include: [
            { 
                model: models.Medias,
                attributes: ['url'],
            }
        ]
    }).then((empresas) => {
        response.status = true;
        response.empresas = empresas;
        response.message = 'Se trajeron las empresas correctamente.';
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};

exports.addEmpresa = function(req, res){
    let empresa = req.body.empresa;
    let languages = req.body.languages;
    let response = {
        status: false,
        message: 'No se pudo crear el lenguaje.'
    };
    let empresaToSave = {
        nombre: empresa.nombre,
        selector: empresa.selector,
        propiedades: empresa.propiedades,
        descripcion: empresa.descripcion
    };
    // console.log('empresaToSave > ', empresaToSave);
    models.Empresas.create(empresaToSave).then((save) => {
        createLanguagesEmpresas(save.idempresa, languages, function(response){
            if(response.status){
                res.status(200).send(response);
            }else{
                res.status(404).send(response); 
            }
        });
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    });
};

exports.editEmpresa = function(req, res){
    let id_empresa = req.params.id;
    let empresa = req.body.empresa;
    let theLanguagesWereEdited = req.body.theLanguagesWereEdited;
    
    let response = {
        status: false,
        message: 'No se pudo crear el lenguaje.'
    };
    let empresaToUpdate = {
        nombre: empresa.nombre,
        selector: empresa.selector,
        propiedades: empresa.propiedades,
        descripcion: empresa.descripcion
    };
    // console.log('empresaToUpdate > ', empresaToUpdate);
    // console.log('theLanguagesWereEdited > ', theLanguagesWereEdited);
    if(theLanguagesWereEdited.status){
        editEmpresaLanguages(id_empresa, theLanguagesWereEdited.nuevos, theLanguagesWereEdited.eliminados, function(response){
            if(response.status){
                models.Empresas.update(empresaToUpdate, {
                    where: {
                        idempresa: id_empresa
                    }
                }).then((update) => {
                    // console.log('update >>>>>> ',update);
                    response.status = true;
                    response.message = 'Se actualizó correctamente el lenguaje';
                    response.idempresa = update.idempresa;
                    res.status(200).send(response);
                }).catch((err) => {
                    response.error = err;
                    res.status(404).send(response);
                });
            }else{
                res.status(404).send(response);
            }
        })
    }else{
        models.Empresas.update(empresaToUpdate, {
            where: {
                idempresa: id_empresa
            }
        }).then((update) => {
            // console.log('update >>>>>> ',update);
            response.status = true;
            response.message = 'Se actualizó correctamente el lenguaje';
            response.idempresa = update.idempresa;
            res.status(200).send(response);
        }).catch((err) => {
            response.error = err;
            res.status(404).send(response);
        });
    }
};

exports.deleteEmpresa = function(req, res){
    let id_empresa = req.params.id;
    let idmedia = req.params.idmedia;
    let url = req.params.url;
    let response = {
        status: false,
        message: 'No se pudo eliminar la empresa.'
    };
    if(url != ''){
        models.Medias.destroy({where: {idmedia: idmedia}}).then((des) => {
            // elimina de la carpeta del servidor
            let filePath = root + '../../../../public/img/empresas/'+url; 
            fs.unlink(filePath, function(err) {
                // console.log('err > ',err);
                response.status = true;
                response.message = 'Se eliminó la imagen correctamente.';
                // res.status(200).send(response);
                models.Empresas.destroy({
                    where: {
                        idempresa: id_empresa
                    }
                }).then((resp) => {
                    // console.log('update >>>>>> ',update);
                    response.status = true;
                    response.message = 'Se eliminó correctamente la empresa.';
                    response.idempresa = resp;
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
        models.Empresas.destroy({
            where: {
                idempresa: id_empresa
            }
        }).then((resp) => {
            // console.log('update >>>>>> ',update);
            response.status = true;
            response.message = 'Se eliminó correctamente la empresa.';
            response.idempresa = resp;
            res.status(200).send(response);
        }).catch((err) => {
            response.error = err;
            res.status(404).send(response);
        });
    }
};

exports.getEmpresaLanguages = function (req, res) {
    let response = {
        status: false,
        message: 'No se pudieron traer los lenguajes.'
    };
    let idempresa = req.params.id;
    models.EmpresaHasLanguages.findAll({
        where: {
            idempresa: idempresa
        },
        attributes: ['idlanguage']
    }).then((items) => {
        let itemsL = items.length;
        let arrayIds = [];
        items.forEach((v, i)=>{
            arrayIds.push(v.idlanguage);
            // console.log(arrayIds.length +' == '+ itemsL)
            if(arrayIds.length == itemsL){
                models.Languages.findAll({
                    where: {
                        $or: [
                            {
                                idlanguage: arrayIds
                            },
                        ]
                    },
                    attributes: ['nombre','idlanguage']
                }).then((languages) => {
                    response.status = true;
                    response.languages = languages;
                    response.message = 'Se trajeron los lenguajes de la empresa.';
                    res.status(200).send(response);
                }).catch((err) => {
                    response.error = err;
                    res.status(404).send(response);
                });
            }
        });
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};



