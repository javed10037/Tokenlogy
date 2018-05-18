var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Constant = require('../../config/constants');


var tokenSchema = new Schema({
	userId              : { type:mongoose.Schema.Types.ObjectId, ref: 'users'},
	crowdSaleAddress    : { type : String , require : true},
	tokenAddress        : { type : String , require : true},
	websiteUrl          : { type : String, default: ''},
	logoUrl             : { type : String, default: ''},
    isDeleted           : { type : Boolean, default: false},
    createdAt           : { type : Date, default: Date.now,select: false},
    updatedAt           : { type : Date, default: Date.now,select: false},
    rating				: {type:Number,default:5,max:5},
    rateBy				: []
});

var tokens = mongoose.model('Token', tokenSchema);

module.exports = tokens;
