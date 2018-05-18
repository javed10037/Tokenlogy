	var express = require('express');
	var user = require('../app/controllers/merchandise.js');
	var router = express.Router();

	router.post('/userOrders', user.userOrders);
	router.post('/imageUpload', user.imageUpload);
	router.post('/makeList', user.makeList);
	router.post('/editProduct', user.editProduct);
	router.post('/buy', user.buy);
	router.get('/getProduct', user.getProduct);
	router.post('/listProduct', user.listProduct);


	module.exports = router;

