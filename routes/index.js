var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'ROMAEF | Web Developer'}); 
});

module.exports = router;
