var models  = require('../../models/models.js');
var multer = require('multer');
var path = require('path'); // saber bien el path del proyecto
var root = path.resolve(__dirname);
var fs = require('fs');
// const scrape = require('website-scraper');
// este codigo descarga el html estático de una pagina
// exports.downloadSite = function(req, res){

//     let options = {
//         urls: ['http://www.loencontraste.com/cyberdays/ofertas'],
//         directory: '/descargado',
//     };

//     scrape(options).then((result) => {
//         res.status(200).send(result);
//     }).catch((err) => {
//         console.log("An error ocurred", err);
//     });
// } 
/**
 * Autor - Romario Estrada - www.romaef.com
 * [listArticulos GET - lista los articulos]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.listArticulos = function (req, res) {
    let response = {
        status: false,
        message: 'No se pudieron traer los articulos'
    };
    models.Articulos.findAll({
        include: [
            { 
                model: models.Medias,
                attributes: ['url','idmedia']
            }
        ]
    }).then((Articulos) => {
        response.status = true;
        response.Articulos = Articulos;
        response.message = 'Se trajeron los articulos correctamente.';
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};

/** 
 * Autor - Romario Estrada - www.romaef.com
 * [listArticulosBy GET - lista los articulos por el nombre del campo que venga]
 * @param  {[object]}   req  [objeto que recoge lo que venga en la url]
 * @param  {[object]}   res  [objeto que tiene funciones para responder]
 * @return {[type]}        [description]
 */
exports.listArticulosBy = function (req, res) {
    let byWhat = req.params.by;
    let response = {
        status: false,
        message: 'No se pudieron traer los articulos por el campo igual a '+byWhat
    };
    models.Articulos.findAll({
        attributes: ['idarticulo',byWhat]
    }).then((Articulos) => {
        response.status = true;
        response.Articulos = Articulos;
        response.message = 'Se trajeron los articulos correctamente por el campo igual a '+byWhat;
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    })
};

exports.addArticulo = function(req, res){
    let articulo = req.body.articulo;
    let response = {
        status: false,
        message: 'No se pudo crear el artículo.'
    };
    let ArticuloToSave = {
        titulo: articulo.titulo,
        descripcion: articulo.descripcion,
        meta_description: articulo.meta_description,
        og_title: articulo.og_title,
    };
    // console.log('ArticuloToSave > ', ArticuloToSave);
    models.Articulos.create(ArticuloToSave).then((save) => {
        // console.log('save >>>>>> ',save);
        response.status = true;
        response.message = 'Se creó correctamente el artículo';
        response.idarticulo = save.idarticulo;
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    });
};

exports.editArticulo = function(req, res){
    let id_Articulo = req.params.id;
    let articulo = req.body.articulo;
    let response = {
        status: false,
        message: 'No se pudo crear el artículo.'
    };
    let ArticuloToUpdate = {
        titulo: articulo.titulo,
        descripcion: articulo.descripcion,
        meta_description: articulo.meta_description,
        og_title: articulo.og_title,
    };
    // console.log('ArticuloToUpdate > ', ArticuloToUpdate);
    models.Articulos.update(ArticuloToUpdate, {
        where: {
            idarticulo: id_Articulo
        }
    }).then((update) => {
        // console.log('update >>>>>> ',update);
        response.status = true;
        response.message = 'Se actualizó correctamente el artículo';
        response.idarticulo = update.idarticulo;
        res.status(200).send(response);
    }).catch((err) => {
        response.error = err;
        res.status(404).send(response);
    });
};

exports.deleteArticulo = function(req, res){
    let id_Articulo = req.params.id;
    let idmedia = req.params.idmedia;
    let url = req.params.url;
    let response = {
        status: false,
        message: 'No se pudo eliminar el artículo.'
    };
    if(url != ''){
        models.Medias.destroy({where: {idmedia: idmedia}}).then((des) => {
            // elimina de la carpeta del servidor
            let filePath = root + '../../../../public/img/articulos/'+url; 
            fs.unlink(filePath, function(err) {
                // console.log('err > ',err);
                response.status = true;
                response.message = 'Se eliminó la imagen correctamente.';
                // res.status(200).send(response);
                models.Articulos.destroy({
                    where: {
                        idarticulo: id_Articulo
                    }
                }).then((resp) => {
                    // console.log('update >>>>>> ',update);
                    response.status = true;
                    response.message = 'Se eliminó correctamente el artículo.';
                    response.idarticulo = resp;
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
        models.Articulos.destroy({
            where: {
                idarticulo: id_Articulo
            }
        }).then((resp) => {
            // console.log('update >>>>>> ',update);
            response.status = true;
            response.message = 'Se eliminó correctamente el artículo.';
            response.idarticulo = resp;
            res.status(200).send(response);
        }).catch((err) => {
            response.error = err;
            res.status(404).send(response);
        });
    }
};