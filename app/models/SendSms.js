var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var uniqueValidator = require('mongoose-unique-validator');

var Constant = require('../../config/constants');
var twilio = require('twilio')(Constant.twilioCredentials.ACCOUNTSID, Constant.twilioCredentials.AUTHTOKEN);

var SmsSchema = new Schema({
    to                  : { type : String },
    subject             : { type : String },
    body                : { type : String },
    status              : { type : Schema.Types.Mixed },
    created_at          : { type : Date }
});

SmsSchema.statics = {
    sendInvitationSms: function(obj,cb) {
        console.log("SMS called");
        var self = this;
        obj.msg = 'You are invited on LuvCheck by '+obj.invitedByName+'.Please check your email.';
        self.send(obj,cb);
    },
    resendInvitationSms: function(obj,cb) {
        console.log("SMS called")
        var self = this;
        obj.msg = 'You are re-invited on LuvCheck by '+obj.invitedByName+'.Please check your email.';
        self.send(obj,cb);
    },
    sendWelcomeSms: function (obj,cb) {
        console.log("SMS called");
        var self = this;
        obj.msg = 'You  have successfully registered to LuvCheck. Invite your family members to join you on LuvCheck.';
        self.send(obj,cb);
    },
    sendResetPasswordSms: function (obj,cb) {
        var self = this;
        obj.msg = "Your password has been updated successfully";
        self.send(obj,cb)
    },
    sendInvitationReminderSms: function () {

    },
    sendActivationSms : function () {

    },
    send: function(obj,callback){
        var mobileNo = obj.countryCode + obj.phone;
        console.log("mobile=",mobileNo)
        twilio.messages.create({
            to: mobileNo,
            from: Constant.smsCredentials.number,
            body: obj.msg
        }).then(function (err,message) {
            console.log(message.sid)
            callback('Message=',message.sid)
        });
    }

};

var SMS = mongoose.model('SMS', SmsSchema);

module.exports = SMS;