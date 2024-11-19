var express = require('express');
var router  = express.Router();
var middleware = require('../../security/middleware');
var EmpresasController = require('../../controllers/empresa/empresaController.js');

router.get('/all', EmpresasController.listEmpresas);
router.get('/:id/languages', EmpresasController.getEmpresaLanguages);
router.post('/', middleware.ensureAuthenticated, EmpresasController.addEmpresa);
router.put('/:id', middleware.ensureAuthenticated, EmpresasController.editEmpresa);

// sin imagen
router.delete('/:id', middleware.ensureAuthenticated, EmpresasController.deleteEmpresa);
// con imagen
router.delete('/:id/:idmedia/:url', middleware.ensureAuthenticated, EmpresasController.deleteEmpresa);

module.exports = router;
