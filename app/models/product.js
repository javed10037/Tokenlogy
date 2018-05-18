const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var product = new Schema({
	name:{type:String},//puma tshirt
	brand:{type:String},//puma,nike etc
	category:{type:String},// clothing,electronics
	type:{type:String},// t-shirt/shirt
	size:[],//S,M,L etc
	price:{type:Number},// $25
	colour:[],//blue,red etc
	productBy:{type:Schema.Types.ObjectId,ref:'User'},//wsho list this product
	images:[],//product images
	description:{type:String},
	title:{type:String},//short descption on product
	quantity:{type:Number},//10,20 etc
  discount : {type :Number,default :10},
	status:{type:Boolean,default:false},//only true status product list on website
	outOfStock:{type:Boolean,default:false},
	createdAt:{type:Number},
	rating:{type:Number},
	comments:[{
		text:{type:String},//comment text
		user:{type:Schema.Types.ObjectId},//_id of who comment
		date:{type:Number},//milisec
	}]
})

module.exports = mongoose.model('product',product);
