const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var order = new Schema({
	owenbuy:{type:Schema.Types.ObjectId},//_id of user who buy it
	address:{type:String},//address of delivery
	product:[{
	id:{type:Schema.Types.ObjectId},//_id of product 
	size:{type:String},//size of product
	colour:{type:String},//colour of product user choose
	date:{type:Number},
	status:{type:Number,default:1},//1=placed, 2=on the way, 3=delievered
	isCancel:{type:Boolean,default:false},
	quantity:{type:Number}
}]
})

module.exports = mongoose.model('order',order);