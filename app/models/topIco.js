const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

var topIco = new Schema({
	name:{type:String},
	address:{type:String},
	ticker:{type:String},
	website:{type:String},
	status:{type:String},
	rating:{type:String},
	image:{type:String},
	holdersCount : {type : Number},
	rate : {type : Number},
	marketCapUsd : {type : Number},
},{strict:true})

module.exports = mongoose.model('topIco',topIco);



