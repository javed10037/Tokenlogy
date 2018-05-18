const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

var adminTopIco = new Schema({
	        tokenAddress:{type:String}
},{strict:true})

module.exports = mongoose.model('adminTopICO',adminTopIco);



