var mongoose = require('mongoose')
var Schema  = mongoose.Schema;
var contract = new Schema({
	address:{type:String},
	name:{type:String},
	status:{type:String}
})

module.exports = mongoose.model('contract',contract);