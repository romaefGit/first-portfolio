var express = require('express');
var router  = express.Router();
var middleware = require('../../security/middleware');

var MediaController = require('../../controllers/media/mediaController.js');
// users
router.post('/upload-img-user/:id', middleware.ensureAuthenticated, MediaController.uploadImgUser);
router.post('/delete-img-user', middleware.ensureAuthenticated, MediaController.deleteImgUser);

// lannguages
router.post('/upload-img-language/:id', middleware.ensureAuthenticated, MediaController.uploadImgLanguage);

// empresas
router.post('/upload-img-empresa/:id', middleware.ensureAuthenticated, MediaController.uploadImgEmpresa);

// articulos
router.post('/upload-img-articulo/:id', middleware.ensureAuthenticated, MediaController.uploadImgArticulo);

module.exports = router;
