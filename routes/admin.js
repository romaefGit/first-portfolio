var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res) {
  	res.render('admin', { title: 'ROMAEF | Admin'}); 
});

module.exports = router;
