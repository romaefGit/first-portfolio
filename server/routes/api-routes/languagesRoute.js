var express = require('express');
var router  = express.Router();
var middleware = require('../../security/middleware');
var LanguagesController = require('../../controllers/language/languageController.js');
// console.log(LanguagesController);

router.get('/', LanguagesController.listLanguages);
router.get('/:by',  middleware.ensureAuthenticated, LanguagesController.listLanguagesBy);
router.post('/', middleware.ensureAuthenticated, LanguagesController.addLanguage);
router.put('/:id', middleware.ensureAuthenticated, LanguagesController.editLanguage);
router.delete('/:id/:idmedia/:url', middleware.ensureAuthenticated, LanguagesController.deleteLanguage);
router.delete('/:id', middleware.ensureAuthenticated, LanguagesController.deleteLanguage);

module.exports = router;
