const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;
let refferal = new Schema({
status:{type:String,default:true},
refferalCode:{type:String,unique:true},
to:[String],
time:{types:String},
discount:{type:Number},
},{strict:false});

module.exports = mongoose.model('refferal',refferal);