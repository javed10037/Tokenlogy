var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  name : { type : String,required : true },
  email : { type : String, required : true },
  subject : { type : String,required : true },
  message : { type : String,required : true }
});

var contactUs = mongoose.model('contactUs',contactSchema);
module.exports = contactUs;