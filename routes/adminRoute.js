var express = require('express');
var admin = require('../app/controllers/AdminCtrl.js');
var router = express.Router();

	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.send('Users Api resource');
	});


router.post('/getAllUser',admin.getAllUser);
router.post('/deleteUserByAdmin',admin.deleteUserByAdmin);
  module.exports = router;
