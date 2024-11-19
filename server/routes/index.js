var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/server', function(req, res, next) {
  res.render('server', { title: 'Express' });
});

module.exports = router;
