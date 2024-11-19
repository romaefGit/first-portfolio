var express = require('express');
var router  = express.Router();
var middleware = require('../../security/middleware');
var ArticulosController = require('../../controllers/articulo/articuloController.js');
// console.log(ArticulosController);

router.get('/', ArticulosController.listArticulos);
// router.get('/download-site', ArticulosController.downloadSite);
router.get('/:by',  middleware.ensureAuthenticated, ArticulosController.listArticulosBy);
router.post('/', middleware.ensureAuthenticated, ArticulosController.addArticulo);
router.put('/:id', middleware.ensureAuthenticated, ArticulosController.editArticulo);
router.delete('/:id/:idmedia/:url', middleware.ensureAuthenticated, ArticulosController.deleteArticulo);
router.delete('/:id', middleware.ensureAuthenticated, ArticulosController.deleteArticulo);

module.exports = router;
