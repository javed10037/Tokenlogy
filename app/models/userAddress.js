var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Constant = require('../../config/constants');


var userAddressSchema = new Schema({
	email               : { type : String },
	ETHaddress          : [ { address : 'String' }],
    isDeleted           : { type: Boolean, default: false},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false}
    
});

var userAddress = mongoose.model('userAddress', userAddressSchema);

module.exports = userAddress;
