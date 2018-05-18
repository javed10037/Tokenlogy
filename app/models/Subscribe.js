var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subscribeus = new Schema ({

 email : {
     type : String
   },
 subscribeStatus: {
    type: Boolean, default : false
   }
});
module.exports = mongoose.model('subscribeUs',subscribeus);