var express = require('express');
var router  = express.Router();
var middleware = require('../../security/middleware');
var UsuariosController = require('../../controllers/usuario/usuarioController.js');

// Auth
router.post('/login', UsuariosController.login);
router.post('/signup', UsuariosController.signup);

// CRUD
router.get('/:idusuario', middleware.ensureAuthenticated, UsuariosController.getUsuario);
router.post('/:idusuario', middleware.ensureAuthenticated, UsuariosController.updateUsuario);
router.post('/password/:idusuario', middleware.ensureAuthenticated, UsuariosController.updatePassword);

module.exports = router;
