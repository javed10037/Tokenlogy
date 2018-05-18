var User = require('../models/users.js');
var mongoose = require('mongoose');


var getAllUser = function(req,res){
  User.find({},function(err,data){
    if(err){
      res.json({message : "unable to get the all user",data : 400})
    }else if(data) {
      res.json({message : "There are all user details here",data : data,status : 200 })
    } else {
      res.json ({message : "There is error to get the data",status : 400})
    }
  })
}

var deleteUserByAdmin  = function(req,res) {
  var reqObj = {
      _id: req.body.userId
  };
  var UpdateObj = {
      isDeleted: true
  };
      User.findOne({isDeleted : false},{},function(err,data){
        if(err) {

        res.json({message : "This is wrong in Db data",status : 400})
      }else if(data){
        User.update(reqObj,{$set : UpdateObj},function(err,success){
          if(err){
            res.json({messsage : "please enter the correct userId",status :400})
          } else if(success){
            res.json({message : "User Deleted successfully",status : 200})
          }else {
            res.json({message : "Please enter the correct userId",status :400})
          }

        })

      }else {
        res.json({message: "There is db  error to delete the user"})
      }

      })

}

exports.getAllUser = getAllUser;
exports.deleteUserByAdmin  = deleteUserByAdmin;
