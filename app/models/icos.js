var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Constant = require('../../config/constants');


var icoSchema = new Schema({
    userId              : { type:mongoose.Schema.Types.ObjectId, ref: 'users'},
    email               : { type : String},
	tokenName           : { type : String , require : true},
	tokenTicker         : { type : String},
    tokenImage          : { type : String , default : ''},
    contractType        : { type : String},
    contractName        : { type : String},
    optimized           : { type : Boolean, default : false} ,
    reservedTokens      : [],
	// toeknAddress        : [{ contractAddress : 'String'}],
	tokenValue          : { type : Number, default: 0},
    investorMinCap      : { type: Number, default: 0.0},
    startTime           : { type:Date, default: Date.now},
    endTime             : { type:Date, default: Date.now},
    tokenRate           : { type : Number  , default : 0},
    tokenSupply         : { type : Number , default : 0},
    walletAddress       : { type : String},
    tokenDecimals       : { type : String},
    isDeleted           : { type: Boolean, default: false},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false},

    crowdsaleAddress : { type : String, default : ''},
    networkID : { type : String, default : ''},
    tokenAddress : { type : String, default : ''},
    whitePaper : { type : String, default : ''},
    crowdsale : [ {
        endTime : { type : String},
        startTime : { type : String},
        supply : { type : String},
        tier : { type : String},
        updatable : { type : String},
        whiteListElements : { type : []},
        whiteListInput : { type : {}},
        whitelist : {type :[]}
    }],
    // generalInfo : { type : Object},
    checkoutItems : [{
        id : {type : String},
        value : { type : String} 
    }],
    generalInfo : {
    companyName : {type : String},
    description : {type : String},
    address1 : {type : String},
    address2 : {type :String},
    country : {type : String},
    zipcode : {type : String},
    twitter :{type : String},
    linkedin : {type : String},
    facebook :{type : String},
    website : {type : String},
    vedio : {type : String},
   
    team :[
            {
              image :{type : String} ,
              linkedinname : {type : String},
              designation : {type : String}
            }
          ],
    milestone : [{
        milestone1 : { type : String},
        milestonedate : { type : String}
    }]      
  },
        endorse             : [{
                                id:{type:String},
                                image:{type:String},
                                url:{type:String}
                              }],

});

var icos = mongoose.model('ICO', icoSchema);

module.exports = icos;
