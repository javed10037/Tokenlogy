var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');//FOR PASSWORD
var Q = require('q');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');//FOR PASSWORD
var Constant = require('../../config/constants');

SALT_WORK_FACTOR = 5;//FOR PASSWORD

var userSchema = new Schema({
    email               : { type : String, unique: true , required :true },
    firstName           : { type : String, required: true},
    lastName            : { type : String, default : ''},
    phone               : { type : String, /*unique: true , required : true */},
    avatar              : { type : String, default: ''},
    password            : { type : String},
    EthAddress          : { type : String},
    accountType         : { type: String,
                            enum: ['Business','Investor'],
                            default:'Investor'
                          },
    verifyEmail         : {
                            verificationStatus: {type: Boolean, default :false},
                            email: {type:String}
                          },
    verificationToken   : { type: String},
    resetPasswordToken  : { type: String},
    resetPasswordExpires: { type: Date},
	devices             : [{select: false}],
	active              : {default:false,type:Boolean},
	lastSeen            : { type:Number},
    verified            : { type: Boolean, default: false},
    isTrial             : { type:Boolean, default: true},
    accountExpiresOn    : { type : Date,default:+new Date() + 30*24*60*60*1000},
    isDeleted           : { type: Boolean, default: false},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false},
    linkedIn            : {type:Boolean,default:false},
    refferalCode        : {type:String},
    referralInstitutional:{type:String,sparse:true},//for chain process only,
    referralReseller    : {type:String,sparse:true},//for chain process only
    referralUser        : {type:String},//for chain process only
    referralEarn        : [{    //for chain process only
                            
                            from:{type:String,ref:'User'},
                            amount:{type:String}
                             }],
     category:{type:String,
     enum: ['reseller','institutional'],
 },
  generatedInvestorCode : { type : String, default : ''},
    refferalInvestorCode : {type : String, default :''},
    kryptualPoints  : {type :Number, default :0}
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});
userSchema.plugin(uniqueValidator);
userSchema.plugin(uniqueValidator, {message: "Email already exists"});
var users = mongoose.model('users', userSchema);

module.exports = users;
