
var User = require('../models/users.js');
var Mail = require('../models/SendMail.js');
var SMS = require('../models/SendSms.js');
var Contact = require('../models/contactus.js');
var Crowdsale = require('../models/crowdsale.js');
var Suscribe =  require('../models/Subscribe.js');
var Refferal = require('../models/refferal.js');
var Contract = require('../models/contract.js');
var Token = require('../models/tokens.js');
var topIco = require('../models/topIco');
var adminTopICO = require('../models/adminTopICO');


var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var config = require('../../config/passport_config.js');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var formidable = require("formidable");
var crypto = require('crypto');
var HttpStatus = require('http-status-codes');
var GlobalMessages = require('../../config/constantMessages');
var messageHandler = require('../../config/messageHandler');
var multer  =   require('multer');
const fileUpload = require('express-fileupload');
var Constant = require('../../config/constants.js');
var ICO = require('../models/icos.js');

const request = require('request');
var bcrypt = require('bcrypt');
var Accounts = require('web3-eth-accounts');
var Personal = require('web3-eth-personal');
var Web3 = require('web3');
var Async = require('async');
var cloudinary = require('cloudinary');
// For web socket on server
var accounts = new Accounts(Constant.ETHnodeURL.connectETHnodeWS);
var personal = new Personal(Constant.ETHnodeURL.connectETHnodeWS);
var web3 = new Web3(new Web3.providers.WebsocketProvider(Constant.ETHnodeURL.connectETHnodeWS));

// for http on local ethet testrpc
// var accounts = new Accounts(Constant.ETHnodeURL.connectETHnodeHTTP);
// var personal = new Personal(Constant.ETHnodeURL.connectETHnodeHTTP);
// var web3 = new Web3(new Web3.providers.HttpProvider(Constant.ETHnodeURL.connectETHnodeHTTP));

/*________________________________________________________________________
 * @Date:      	10 Nov,2017
 * @Method :   	Register
 * Modified On:	-
 * @Purpose:   	This function is used for sign up user.
 _________________________________________________________________________
 */
var check = function (req,res){

    User.findOne({ _id : req.body.userId},{ active :1 }, function(err, userStatus){
        if(err) res.send({ status : 200 , message : 'Server Error'})
        console.log('Check while move react page: ',userStatus);
        if(userStatus==="undefined" || !userStatus){
            // res.send({statusCode : 400, status : false, message : 'User Not found'})
        }
        else if(userStatus.active){
            res.send({statusCode : 200, status : userStatus.active, message :'User is loggedIn'});
        }
        else{
            res.send({statusCode : 200, status : false, message : 'User is Logout'})
        }
    })

    // if(req.session.isLoggedIn){
    //   res.send({statusCode : 200, status : true, message :'User is loggedIn'});
    // }
    // else{
    //   User.findOneAndUpdate({_id : req.body.userId},{ "$set": { "active": false } }, function(err, data){
    //     if(err) res.send({statusCode : 400, status : false, message:'error in server'})
    //     if(data){
    //         res.send({statusCode : 200, status : false, message : 'User is Logout'})
    //     }
    //     if(!data){
    //         res.send({statusCode : 200, status : false, message : 'User does not exist'})
    //     }
    //   });
    // }
}

var register = function (req, res) {
    var user = {};
    user = req.body;
    console.log(req.body, 'user');
    var token;
    let ConfirmObj = { ConfirmPassword: req.body.confirmPassword };

    if(!user || !user.email || !user.password || !ConfirmObj.ConfirmPassword) {
        console.log('**I am good user:::', user);
        return res.send({message:"Please provide all the details",status:400})
    } else {
        if(user.password === ConfirmObj.ConfirmPassword){
            User.findOne({email: user.email.toLowerCase()},{}, function (err,data) {
                if (err) {
                    return res.send({message:err,status:400});
                }
                else if(data){
                    return res.send({message:"User Already Exist With Given Email.",status:400});
                } else {
                    console.log('***creating token****');
                    crypto.randomBytes(10, function (err, buf) {
                        token = buf.toString('hex');
                        user.verificationToken = token;

                        if(req.body.referralUser)
                        user.referralUser = req.body.referralUser
                        else
                        user.referralUser = ''

                        user.verifyEmail = {
                            email: req.body.email.toLowerCase(),
                            verificationStatus: false
                        };
                        let accountType = req.body.accountType;
                        let investorCode = req.body.investorCode;

                        if(accountType==='Investor'){
//<<<<<<< HEAD

//=======
                            console.log('***Investor user***');
//>>>>>>> 6261ed8413246ab2b43f923e0da05300c391e56d
                            if(investorCode!=''){
                                // when investor have coupan code
                                console.log('***Have code***');
                                User.findOne({ generatedInvestorCode : investorCode},{},function(err,getData){
                                    if(err) return res.send({status : 400, message : 'error while fetch'})
                                    if(getData){

                                        User.updateOne({ generatedInvestorCode : investorCode},{$set :{"kryptualPoints" :getData.kryptualPoints +5 }},function(err,update){
                                            if(update){
                                                console.log('****update points**');
                                                user.refferalInvestorCode = investorCode;
                                                user.kryptualPoints = 2;
                                                console.log('****created with points**');
                                                registration(req, res,user);
                                                return false;
                                            }
                                        })

                                    }else{
                                        return res.send({status : 400, message : 'Invalid refferal code!.'})
                                    }
                                });

                            }else{
                                console.log('***dont have coupan code***');
                                // when investor don't have coupan code
                                user.refferalInvestorCode = '';
                                registration(req, res,user);
                                return false;
                            }

                        }else{
                            // when user is BUSINESS TYPE
                            console.log('****business user**');
                            registration(req, res,user);
                            return false;
                        }

                    });
                }
            });
        }else{
            return res.json({message : "Password and ConfirmPassword not matched ",status : 400})
        }
    }
}

function registration(req, res,user){
    //For generate ETHRIUM Address
                        // let phraseKey = user.email+"KRYPTUAL";
                        web3.eth.personal.newAccount(user.email.toLowerCase()).then((data) => {
                            console.log('***creating ETHERUM ADDRRESS****');
                            if(data){
                                user.EthAddress = data;
                                var errorMessage = "";
                                User(user).save(function (err, data) {
                                    if (err) {
                                         // res.send(messageHandler.errMessage(err));
                                         return res.send({status : 400, message : 'Error occured while saving into DB', err : err})
                                    } else {
                                        var verifyurl = 'api/verify-email/' + user.verificationToken;
                                        Mail.registerMail(user,verifyurl, function(msg) {
                                            console.log('Mail sent successfully.')
                                        });
                                        return res.status(HttpStatus.OK).send({message: "You have registered successfully. to login please verify your email first.",status:HttpStatus.OK});
                                    }
                                });
                            }
                            else{
                                return res.send({data: [],message : 'Error in address generate on ETH Node', status: 400});
                            }
                        });

}
/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    verifyEmail
 * Modified On: -
 * @Purpose:    This function is used to verify user.
 _________________________________________________________________________
 */

var verifyEmail = function (req, res) {
    User.findOne({verificationToken: req.params.token}, function (err, data) {
        if (err) {
            res.status(203).send({message: "Something went wrong."});
        } else {
            if (!data) {
                res.status(203).send({message: "Token is expired."});
            } else {
                var verificationStatus = data.verifyEmail.verificationStatus;
                var user_id = data._id;
                if (verificationStatus === true) { // already verified
                    console.log("account verified");
                    res.status(200).send({status : 400,message: "Account Already verified."});
                } else { // to be verified
                    data.email = data.verifyEmail.email;
                    data.verifyEmail = {
                        email: data.verifyEmail.email,
                        verificationStatus: true
                    };
                    data.save(function (err, data) {
                        if (err) {
                            res.status(203).send({status : 400,message: "Something went wrong."});
                        } else {
                            Mail.verifyAccountMail(data.email, function (msg) {
                                console.log('Mail sent successfully.')
                            });
                            // res.status(200).send({msg: "Account Activated successfully."});
                            res.redirect(Constant.hostingServer.serverUiName);
                        }
                    });
                }
            }
        }
    });
};
/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    login
 * Modified On: -
 * @Purpose:    This function is used to authenticate user.
 _________________________________________________________________________
 */

var login = function (req, res) {
    var user = req.body;
    console.log('login1');
    if (!user || !user.email) {
        res.send({message: "Please provide valid email and password",status:400});
    } else {
        User.findOne({email: user.email.toLowerCase()},
            {}, function (err, data) {
                console.log('login2');
                if (err) {
                    res.send({message: err,status:400});
                } else {
                    if(data){
                        if(!data.isDeleted){
                        console.log('data.verifyEmail.verificationStatus',data.verifyEmail.verificationStatus);
                        if(data.verifyEmail.verificationStatus === false) {
                            res.send({message: "Your email is not verified. Please verify first.",status:400});
                        }else {
                            if (data) {
                                console.log('login3');
                                bcrypt.compare(user.password, data.password, function (err, result) {
                                    if (err) {
                                        res.send({message: err,status:400});
                                    } else {
                                        if (result === true) {
                                            data.active = true;
                                            data.lastSeen = new Date().getTime();
                                            data.save(function (err, success) {
                                                if (!err) {
                                                    var token = jwt.sign({_id: data._id}, config.secret);
                                                    // to remove password from response.
                                                    data = data.toObject();
                                                    delete data.password;
                                                    req.session.isLoggedIn = true;

                                                    console.log('login4',data.EthAddress);
                                                    //unlock user account
                                                    // web3.eth.personal.unlockAccount(data.EthAddress,user.password, 15000);

                                                        //   var addresses = web3.eth.getBalance(data.EthAddress).then((balance)=>{
                                                        //     console.log('login5');
                                                        //   if(balance){
                                                        //     balance = balance / Constant.ETHnodeURL.ETHdecimals;
                                                        //      res.send({status : 200,token: token, data : data ,ETHbalance : balance, message : 'Address Balance on Ethrium Node.'});
                                                        //   }
                                                        //   else{
                                                        //      res.send({status : 200,token: token, data : data ,ETHbalance : balance, message : 'No balance Data Found!.'});
                                                        //   }
                                                        // });
                                                          // console.log('addresses',addresses);
                                                    res.status(HttpStatus.OK).json({token: token, data: data,status:HttpStatus.OK});
                                                }
                                            });
                                        } else {
                                            res.send({message: 'Authentication failed due to wrong details.',status:400});
                                        }
                                    }
                                });
                            } else {
                                res.send({message: 'No account found with given email.',status:400});
                            }
                    }
                    }else{
                        res.send({message: "Your email is not register with us. Please signup first",status:400});
                    }

                }
                else{
                   res.send({message: "Your email is not register with us. Please signup first",status:400});
                }
            }
        });
    }
};


var logout = function (req, res) {

    let userId = req.body.userId;
        if(userId){
            User.update({ _id : req.body.userId},{ "$set" : {"active" : false } }, function(err, userStatus){

                if(err) res.send({ status : 400 , message : 'Server Error'})

                console.log('userstatus', userStatus);
                res.send({status : 200, message :'User logout successfully.'});
            });
        }
        else{
            res.send({status : 400, message : 'Please Enter User ID'});
        }

    // delete  req.user;
    // req.logout();
    // res.status(200).json({msg: "logout successfully."});
};

var GetProfileByUserId = function(req,res){
             var requestParam = {
               _id : req.body.userId
             }
             var resposeParam = {
               email : 1,
               firstName :1,
               lastName : 1,
               phone : 1,
               avatar : 1,
               EthAddress : 1,
               accountType : 1,
               devices      : 1,
               active   :    1,
               lastSeen: 1,
               createdAt: 1,
               updatedAt: 1
             }

           User.findOne(requestParam , resposeParam, function(err,data){
                if(err){
                  res.json({message : "Please enter valid ID", status :400})
                }
                if(!data) res.json({message : "Please enter the valid id", status : 400})
                if(data) res.json({data:data,message : "All the information of User received", status : 200})
             })
}


var  UpdateUserProfileById = function(req,res) {
        var requestParam = {
           _id : req.body.userId
        }
        var updateParam = {
          firstName :req.body.firstName,
          lastName : req.body.lastName
     };

        User.findOneAndUpdate(requestParam, { $set : updateParam },{ new: true },function(err,data){
           if(err){
                res.json({message : "Please enter valid ID",status :400, data :[]})
            }
            else {
            if(data){
               res.json({message : "User profile updated successfully",status : 200, data : data})
            }
               else {res.json({message : "Please enter the valid inputs",status :400, data : []}) }
            }
          })
 }

/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    forgot_password
 * Modified On: -
 * @Purpose:    This function is used when user forgots password.
 _________________________________________________________________________
 */
var forgotPassword = function (req, res) {
    crypto.randomBytes(10, function (err, buf) {
        var token = buf.toString('hex');
        let condition = { }
        User.findOne({email: req.body.email.toLowerCase()}, function (err, data) {
            if (err) {
                res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'Please enter a valid email.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
            } else if (!data) {
                res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'Email does not exist.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
            } else {
                if (data && data.verifyEmail.verificationStatus) {
                        data.resetPasswordToken = token,
                        data.resetPasswordExpires = Date.now() + 3600000;

                        data.save(function (err, data) {
                            if (err) {
                                res.send({message: 'Something went wrong.',status:400});
                            } else {
                                Mail.resetPwdMail(data, token, function (msg) {
                                    console.log('Reset password mail sent successfully.');
                                });
                            }
                            res.status(HttpStatus.OK).send({msg: 'Email sent successfully.',status:HttpStatus.OK});
                        });
                }
                else{
                    res.send({message: 'Your email is not verified yet,Please verify first.',status:400});
                }
            }
        });

    });
};


/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    resetPassword
 * Modified On: -
 * @Purpose:    This function is used when user reset password.
 _________________________________________________________________________
 */


var resetPassword = function (req, res) {
    if (req.body.newPassword && req.body.token) {
        User.findOne({resetPasswordToken: req.body.token}, function (err, data) {
            if (err) {
                res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'No record found.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
            } else {
                if (!data) {
                    res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'Reset Password token has been expired.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
                } else {

                    bcrypt.genSalt(10, function (err, salt) {
                        console.log('***salet***',salt);
                    bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                            console.log('***hash***',hash);
                               if (err) {
                                   res.json({
                                       message: "error to bcrypt newPassword",
                                       status: 400
                                   })
                               }
                               if (hash) {
                                    data.password = hash;
                                    data.resetPasswordToken = undefined;
                                    data.resetPasswordExpires = undefined;
                                    let condition = {resetPasswordToken: req.body.token};
                                    let updated = {
                                        "$set" : {
                                        "password" : hash,
                                        "resetPasswordToken" : undefined,
                                        "resetPasswordExpires" : undefined
                                    }
                                }

                                    User.update(condition,updated,function(err, update){
                                                  if (err) {
                                            res.send({message: 'No record found.',status:400});
                                        } else {
                                            console.log('***user save***',data);
                                            Mail.resetConfirmMail(data, function (msg) {
                                                console.log('Reset Confirmation mail sent successfully.',data)
                                            });
                                            res.status(HttpStatus.OK).send({message: 'Password has been successfully updated.',status:HttpStatus.OK});
                                        }
                                    })
                                    // data.save(function (err, data) {
                                    //     if (err) {
                                    //         res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'No record found.',status:NON_AUTHORITATIVE_INFORMATION});
                                    //     } else {
                                    //         console.log('***user save***',data);
                                    //         Mail.resetConfirmMail(data, function (msg) {
                                    //             console.log('Reset Confirmation mail sent successfully.')
                                    //         });
                                    //         res.status(HttpStatus.OK).send({msg: 'Password has been successfully updated.',status:HttpStatus.OK});
                                    //     }
                                    // });

                               }else{
                                res.send({status: 400,message :"Not set password"})
                               }

                    });
                });




                }
            }
        });
    }
    else{
        res.status(HttpStatus.BAD_REQUEST).send({msg: GlobalMessages.CONST_MSG.fillAllFields,status:HttpStatus.BAD_REQUEST});
    }
};

/*________________________________________________________________________
 * @Date:       16 Nov,2017
 * @Method :    imageUpload
 * Modified On: -
 * @Purpose:    This function is used when user reset password.
 _________________________________________________________________________
 */
var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './uploads');
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
      }
    });
    var upload = multer({ storage : storage},{limits: {
          fieldNameSize: 100,
          files: 2,
          fields: 5
    }}).single('userPhoto');

 var imageUpload = function (req, res) {
     upload(req,res,function(err) {
        if(err) {
            return res.send({msg:GlobalMessages.CONST_MSG.fileUploadError,err:err.message});
        }
        res.send({msg:GlobalMessages.CONST_MSG.fileUploadSuccess, status:HttpStatus.OK});
    });

 }


var UploadUserImageById =  function (req,res) {
console.log('image upload',req.body);
 let userId = req.body.userId;
   User.find( { _id : userId},{}).exec(function(err, result){
     if(result){
           var storage = multer.diskStorage({
               destination: function (req, file, cb) {
                   cb(null, './images')
               },
           filename: function (req, file, cb) {
             let fullPath = "images/"+file.originalname;
             console.log("ddjkbasgdhaskdhjsa",fullPath);
             ICO.update({userId : userId },{ "$set" : {tokenImage : fullPath }}).exec(function(err, data){
               if(data){
                 console.log("dataaaaaa",data);
                 // console.log("id is here",userId);
               }
             });
             // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
             cb(null, file.fieldname + '-' + Date.now() +file.originalname)
            }
          })
        var upload = multer({ storage: storage }).single('ProfileImage')
            upload(req, res, function (err) {
                if (err)  return res.json({message :" There ia an err"})
         })
     }
   });
}

var getAllTokens = function(req, res){

        ICO.find({isDeleted : false},{}).sort({ createdAt: -1 }).exec(function(err,token){

            if(err) res.send({status : 400, message : 'Error in saved into DB'});
            if(token){
                res.send({status : 200, data : token, totalRecords : token.length});
            }
            if(!token){
                res.send({status : 200, data : [], message : 'No ICO token Data found'});
            }
        });
}

var viewTokenForHomePage = function (req, res) {
    var conditions = {
        isDeleted: false
    };
    var fields = {};
    console.log('req',req.params.page)
    var skipVal = (Constant.pagination.itemPerPage * parseInt(req.params.page)) - Constant.pagination.itemPerPage;

    ICO.find(conditions, fields).count().exec(function (err, data) {
        if (err) {
            res.send({err: err.message , status: 400});
        } else {
            if(data) {
                ICO.find(conditions,fields).sort({ endTime: -1 }).skip(skipVal)
                .limit(Constant.pagination.itemPerPage)
                .exec(function(err, result){
                    if(err){
                        res.send({msg: err.message, status: 400});
                    }else{
                        if(result.length >0){
                            res.send({status: HttpStatus.OK, totalRecords: data, result: result});
                        }
                        else{
                            res.send({status: HttpStatus.OK, totalRecords: data, result: result});
                        }

                    }
                });
            }
            else{
                res.send({message: "No data found",status: 400});
            }
        }
    });
}


var searchTokenByName = function(req, res){
    var tokendata = req.body;
    if(tokendata.tokenName){
    var conditions = {"tokenName" : {$regex : ".*"+tokendata.tokenName+".*"}};

    var skipVal = (Constant.pagination.itemPerPage * parseInt(req.params.page)) - Constant.pagination.itemPerPage;

    var fields = {};
        ICO.find(conditions,fields)
        .skip(skipVal)
        .limit(Constant.pagination.itemPerPage)
        .exec(function (err, result) {
            if (err) {
                res.send({err: err.message, status: 400});
            } else {
                if(result){
                    res.status(HttpStatus.OK).send({result: result, status: HttpStatus.OK,totalRecords :result.length });
                }
                else{
                    res.status(HttpStatus.OK).send({result : [],msg: GlobalMessages.CONST_MSG.emptyData, status: HttpStatus.OK});
                }
            }
        });
    }
    else{
        res.send({msg: 'Sorry opp', status: 400});
    }

}

var resetPasswordByUserid = function(req, res) {
   var currentPassword    = req.body.currentPassword;
   var newPassword        = req.body.newPassword;
   var confirmNewPassword = req.body.confirmNewPassword;
   var _id = req.body.userId;

   if (currentPassword && newPassword && confirmNewPassword && _id) {
       User.findOne({ _id }, {}, function(err, data) {
           if (err) {
               res.json({
                   message: "please enter the correct userId",
                   status: 400
               })
           } else
           if (data) {
               bcrypt.compare(currentPassword, data.password, function(err, result) {
                   console.log("hashhhhhhhhhhhhhhhhhhhhhhhhhhhhhh compare", result);
                   if (err) {
                       res.json({
                           message: "Wrong , due to wrong current password",
                           err,
                           status: 400
                       })
                   } else
                   if (result) {
                       if (newPassword === confirmNewPassword) {
                           bcrypt.hash(confirmNewPassword, 10, function(err, hash) {

                               if (err) {
                                   res.json({
                                       message: "error to bcrypt newPassword",
                                       status: 400
                                   })
                               }
                               if (hash) {
                                   console.log("thereeeeeeeeeeeeeeee", data.password);
                                   User.findOneAndUpdate({ _id: _id}, {
                                       "$set": {"password": hash}}, (err, rcd) => {
                                       console.log("hashhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh new pass", hash);
                                       if (err) {
                                           res.json({
                                               message: "new password unable to bcrypt the password",
                                               status: 400
                                           })
                                       } else if (rcd) {
                                           res.json({
                                               message: "Password Changed Successfully",
                                               status: 200


                                           })
                                       } else {
                                           res.json({
                                               message: "new password unable to bcrypt the password",
                                               status: 400
                                           })
                                       }
                                   })

                               } else {
                                   res.json({
                                       message: "newPassword not bcrypt sucessfully",
                                       status: 400
                                   })
                               }
                           })
                       } else {
                           res.json({
                               message: "Newpassword and confirmNewPassword does not match",
                               status: 400
                           })
                       }
                   } else {
                       res.json({
                           message: "CurrentPassword not matched",
                           status: 400
                       })
                   }

               })
           } else {
               res.json({
                   message: "Please enter the correct userId ",
                   status: 400
               })
           }
       })
   } else {
       res.json({
           message: "Please enter the all required inputs",
           status: 400
       })
   }
}


var contactUs = (req,res) => {
   let reqObj = {
     name : req.body.name,
     email : req.body.email.toLowerCase(),
     subject : req.body.subject,
     message :req.body.message
   };
  if(req.body.email.toLowerCase()){
     Contact.create(reqObj,function(err,data){
           if(err){
             res.json({ message : "Enter the required right information", status : 400 })
           }else if(data){
            res.json({ message : "Your message send successfully to the Kryptual team", status : 200 })
            Mail.ContactUsMail(data, function (msg){
                    console.log("the mail send sucessfully send to contact user",data.name)
              });
           }
           else{
             res.json({ message:"Unable to send your info the Kryptual team", status : 400 })
           }
       })
   }else{
       res.json({ message : "Please enter the all required field", status : 400})
   }
}

var subscribeUs = (req,res) => {
   var emailobj ={
   email :  req.body.email.toLowerCase(),
   subscribeStatus : true
   };
   console.log('hello form subscribe',emailobj.email);
   if(req.body.email.toLowerCase()){
     Suscribe.findOne({email:req.body.email.toLowerCase()},{},function(err,data){
       if(err){
         res.json({message : "Please enter the email id first",status : 400})
       }else if(!data){
                Suscribe.create(emailobj,function(err,sucess){
                if(err){
                  res.json({message : "there are error to subscribe it",status : 400})
                 }
                if(sucess){
                  console.log("sucesssssssssssss",sucess);
                   res.json({message : "You have successfully subscribe with KRYPTUAL",status : 200})
                    Mail.SubscribeWithUs(sucess, function (msg){
                         console.log("hi this is var smart template",sucess)
                    });

                   } else{
                        res.json({message : "user unable to Suscribe with us",status : 400})
                     }
              })
             }
           else {
         res.json({message : emailobj.email+" already subscribe with us",status :400})
           }

     })
   } else {
      res.json({message : "please enter your email id ", status:400 })
   }
}


var googleMapDirection = function (req, res){
     var opt = {
          method: 'GET',
          headers: {'content-type': 'application/json', 'charset':'utf-8'},
          json: true
        };

    var data = {};
    opt.url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+req.params.origin+'&destination='+req.params.destination+'&travelMode=DRIVING&key=AIzaSyBqIVEoUblv8ogQH5xCQr4HpyAbTTNLEKI';
        // opt.url = 'https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=AIzaSyCIrPEqFM3M_V-JaN9AQb45MQH8omP5XGQ';

        request(opt, function (err, response, body) {
            // console.log('etherscan api hit',body);
          if(err)
            return res.json({
              message: "Failed to get data from etherscan.io",
              statusCode: 400
            })

            res.send({status : 200, messgae : body});

    });
}

var getEthereumFromUSD = function(req,res) {
    var opt = {
             method: 'GET',
             headers: {'content-type': 'application/json', 'charset':'utf-8'},
             json: true
         };
         var data = {};
  opt.url = 'https://cex.io/api/ticker/ETH/USD';
     request(opt, function (err, response, body) {
          // console.log('etherscan api hit',body);
        if(err)
          return res.json({
            message: "Failed to get data from etherscan.io",
            status: 400
          })
          if(body){
             res.send({status : 200, data : body});
          }
})
}

var endrose = (req,res)=>{
    if(!req.body.endroseId||!req.body.endroseBY)//endroseid id of ico
         return res.json({
              message: "Please fill all required fields.",
              statusCode: 400
            })
     else
      User.findOne({_id:req.body.endroseBY})
      .then((success)=>{
        if(success)
        {
            ICO.findOne({_id:req.body.endroseId})
            .then((result)=>{
                    function getObject(element) {
                      return element.id == req.body.endroseId;
                    }
                if(result.endorse.findIndex(getObject)<0)
                   {
                    result.endorse.push({id:req.body.endroseBY})
                    result.save((error,response)=>{
                        if(error)
                            return res.json({
                              message: "Something went wrong.",
                              statusCode: 400
                            })
                        else
                          return res.json({
                              message: "You have successfully endorse "+result.firstName,
                              statusCode: 400
                            })
                    })
                   }
                   else
                     return res.json({
                              message: "You have already endrosed this person.",
                              statusCode: 400
                            })
            })
        }
        else
        {
            return res.json({
              message: "Please verify your account by linked in first.",
              statusCode: 400
            })
        }
      })
}

var removeEndrose = (req,res)=>{
    var endrose = (req,res)=>{
    if(!req.body.endroseId||!req.body.endroseBY)
         return res.json({
              message: "Please fill all required fields.",
              statusCode: 400
            })
     else
      User.findOne({_id:req.body.endroseBY,linkedIn:true})
      .then((success)=>{
        if(success)
        {
            ICO.findOne({_id:req.body.endroseId})
            .then((result)=>{
                function getObject(element) {
                      return element.id == req.body.endroseId;
                    }
                if(result.endorse.findIndex(getObject)>=0)
                   {
                   result.endorse = result.endorse.splice(result.endorse.findIndex(getObject), 1);
                    result.save((error,response)=>{
                        if(error)
                            return res.json({
                              message: "Something went wrong.",
                              statusCode: 400
                            })
                        else
                          return res.json({
                              message: "You have successfully remove endorsement of "+result.firstName,
                              statusCode: 400
                            })
                    })
                   }
                   else
                     return res.json({
                              message: "You have not endrosed this person before.",
                              statusCode: 400
                            })
            })
        }
        else
        {
            return res.json({
              message: "Please verify your account by linked in first.",
              statusCode: 400
            })
        }
      })
}
}

var getReferralBalance = (req,res)=>{
    User.findOne({_id:req.body.id})
    .then((success)=>{
        if(success.refferalCode)
        Refferal.findOne({refferalCode:success.refferalCode})
        .then((result)=>{
        if(result)
           res.json({statusCode:200,balance:result.discount})
        else
            res.json({statusCode:400,message:'invalid coupon'})
        })
        else
            res.json({statusCode:400,message:'No coupon avaliable'})
        })
    .catch((unsuccess)=>{res.json({message:'something went wrong',statusCode:400,unsuccess:unsuccess})})
}

var saveCrowdsale = (req,res)=>{
    let crowdsale = req.body.state;
    let token = req.body.token;
    let userId = req.body.userId;
    console.log('**CROWDSALE is saving*************');
   Crowdsale.create({crowdsale:crowdsale,userId : userId,token :token})
        .then((result)=>{
        if(result)
           res.json({status:200,result:result, message : 'Saved crowdsale successfully'})
        else
            res.json({status:400,message:'Error while saving into DB', result : []})
        })
    .catch((unsuccess)=>{res.json({message:'something went wrong',status:400,unsuccess:unsuccess})})
}

var getCrowdsale = (req,res)=>{
    var icoId = req.body.icoId;
    console.log('**I am on getCrowdsale***');
   Crowdsale.findOne({_id : icoId},{})
        .then((result)=>{
        if(result){
            console.log('**get result***');
            return res.json({statusCode:200,result : result, message : 'get'})

           // User.findOne({_id  :req.body.userId},{EthAddress : 1},function(err,data){
           //  if(data){
           //      result.EthAddress = data;
           //     return res.json({statusCode:200,result : result, message : 'get'})
           //  }else{
           //      return res.json({statusCode:200,result : result, message : 'get'})
           //  }

           // })

        }
        else{
            console.log('**Not found invalid coupon***');
            res.json({statusCode:400,message:"Ooop's sorry, unable to create ICO, please try again!."})
        }

        })
    .catch((unsuccess)=>{
        console.log('**unsuccess something went wrong***');
        res.json({message:'something went wrong',statusCode:400,unsuccess:unsuccess})
    })
}

var deleteCrowdsale = (icoId,req,res,callback)=>{
    var icoId = icoId;
    console.log('deleteCrowdsale',icoId);
   Crowdsale.remove({_id : icoId},function(err, result) {
            if (err) {
                console.log('inside err',icoId);
                callback(err,null);
                // res.json({statusCode:400,err : err})
            }
            console.log('outside',icoId);
            callback(null,result);
           // res.json({statusCode:200,message : 'delete'})
        });
}

var getTokenInfo = (req,res)=>{
    let tokenAddress = req.body.tokenAddress;

    var opt = {
          method: 'GET',
          headers: {'content-type': 'application/json', 'charset':'utf-8'},
          json: true
        };

    var data = {};
        opt.url = Constant.ethplorer+'getTokenInfo/'+tokenAddress+'?apiKey=freekey'


        request(opt.url, function (err, response, body) {
          if(err)
            return res.json({
              message: "Failed to get data from etherscan.io",
              status: 400
            })
            else{
                // console.log("data:::: ",body)
                res.send({ status : 200, data: JSON.parse(body)})
            }
        })
}

var getTopTokens = (req,res)=>{
    var opt = {
          method: 'GET',
          headers: {'content-type': 'application/json', 'charset':'utf-8'},
          json: true
        };

    var data = {};
        console.log('Constant.ethplorer',Constant.ethplorer);
        opt.url = Constant.ethplorer+'getTop?apiKey=freekey&criteria=cap'

        request(opt.url, function (err, response, body) {
          if(err)
            return res.json({
              message: "Failed to get data from etherscan.io",
              status: 400,
              err : err
            })
            else{
                // console.log("data:::: ",body)
                res.send({ status : 200, data:JSON.parse(body)})
            }
        })
}

var saveContract = (req,res)=>{
    let contractAddress = req.body.contractAddress;
    let ticker = req.body.ticker;

    Contract.create({ address:contractAddress, name:ticker })
    .then((success)=>{
     res.json({status:200,data:success})
    })
    .catch((unsuccess)=>{
    console.log("unsuccess:   ",unsuccess);
     res.json({status:400,data:unsuccess})
    })
}
var getContract = (req,res)=>{
    Contract.find()
    .then((success)=>{
     res.json({status:200,data:success})
    })
    .catch((unsuccess)=>{
    console.log("unsuccess:   ",unsuccess);
     res.json({status:400,data:unsuccess})
    })
}

var sendRawTransaction = function(req, res){
    let userId = req.body.userId;
    let fromAddress = req.body.fromAddress;
    let toAddress = req.body.toAddress;
    let value = req.body.value;
    let password = req.body.password;

    User.findOne({_id : userId}, {},function(err, data){
        if(err){
            res.send({status : 400, message : 'during finding in DB'})
        }
        else{
            if(data.email){
                 bcrypt.compare(password, data.password, function (err, result) {
                        if (err) {
                            res.send({message: err,status:400});
                        } else {
                            if (result === true) {
                                console.log('data.EthAddressdata.EthAddress::',data.EthAddress);
                                 web3.eth.personal.unlockAccount(fromAddress,"", 15000);
                                    web3.eth.signTransaction({
                                        from: fromAddress,
                                        gasPrice: "20000000000",
                                        gas: "21000",
                                        to: toAddress,
                                        value: value,
                                        data: "",
                                        nonce : "100"
                                    })
                                    .then(function(data){
                                        web3.eth.sendTransaction({
                                                from: fromAddress,
                                                to: toAddress,
                                                value: web3.utils.toWei(value, 'ether')
                                            })
                                            .then(function(receipt){
                                                res.send({status : 200, receipt : receipt})
                                            });
                                            console.log('transaction signed successfully');
                                    })
                                    .catch(function(err){
                                        res.send({status : 400, err : err})
                                    });
                            }
                            else{
                                res.send({status : 400, message : 'Password is incorrect'})
                            }
                        }
                 });

            }else{
                res.send({status : 400, message : 'User does not exist'})
            }

        }
    });

}

var rateToken = (req,res)=>{
    if(!req.body.tokenId || !req.body.rating)
        res.json({status:400,message:'Please select token first'})
    else
    {
        Token.findOne({_id:req.body.tokenId})
        .then((success)=>{
            if(success)
            {
               success.rating = ((success.rating + req.body.rating)/2);
               if(success.rateBy.indexOf(req.body.userId)<0)
                success.rateBy.push(req.body.userId)
               success.save(function(err,result){
                if(err)
                    res.json({status:400,err:err,message:'Something went wrong.'})
                else
                    res.json({status:200,data:result,message:'Done.'})
               })
            }
            else
               res.json({status:400,message:'No token found.'})
        })
            .catch((unsuccess)=>{
    console.log("unsuccess:   ",unsuccess);
     res.json({status:400,err:unsuccess,message:'Something went wrong.'})
    })
    }
}
var adminRateToken = (req,res)=>{
    if(!req.body.tokenId || !req.body.rating)
        res.json({status:400,message:'Please select token first'})
    else
    {
        Token.findOne({_id:req.body.tokenId})
        .then((success)=>{
            if(success)
            {
               success.rating = req.body.rating;
               success.save(function(err,result){
                if(err)
                    res.json({status:400,err:err,message:'Something went wrong.'})
                else
                    res.json({status:200,data:result,message:'Done.'})
               })
            }
            else
               res.json({status:400,message:'No token found.'})
        })
        .catch((unsuccess)=>{
         console.log("unsuccess:   ",unsuccess);
         res.json({status:400,err:unsuccess,message:'Something went wrong.'})
    })
  }
}

// api for crowdsale on home page for view purpose
var getTokenInfoByTokenId = function(req,res){
    let tokenId = req.body.tokenId;
    ICO.findOne({_id : tokenId},{},function(err,data){
         if(err){
             res.json({message : "Please enter the valid token id",data : 400})
          }
         else if(data){
             console.log("errrrrrrrrrrrrrrrrrrrrr",data.isDeleted);
             if(data.isDeleted === true){
                      res.json({message : "Token no longer exists in DB", status : 400})
            }
            else {
                     res.json({message : "Token Information",data: data,status : 200})
            }
        }else {
                 res.json({message : "Please enter the valid token Id",status : 400})
        }
    })
}

// api for valid username and password
var verifyPassword = function(req, res){
    let password = req.body.password;
     User.findOne({_id: req.body.userId},{}, function (err, data) {
                if (err) {
                    res.send({message: err,status:400});
                } else {
                    if(data){
                          bcrypt.compare(password, data.password, function (err, result) {
                                    if (err) {
                                        res.send({message: err,status:400});
                                    } else {
                                        if (result === true) {
                                            res.send({message: 'Good Job!.',status:200});
                                        }
                                        else{
                                            res.send({message: 'Password is incorrect',status:400});
                                        }
                                    }
                            });
                    }else{
                        res.send({message: 'Invalid user',status:400});
                    }
                }
    });
}

var createTopIco = (req,res)=>{
    let saveData = {
        name:req.body.name,
        address:req.body.address,
        ticker:req.body.ticker,
        rating:req.body.rating,
        image : req.body.rating,
        rate:req.body.rate,
        holdersCount:req.body.holdersCount,
        marketCapUsd:req.body.marketCapUsd,
        website:req.body.website
    };

    if(!req.body)
        res.json({message:'Please fill required fields',status:400})
    else
    topIco.create(saveData)
    .then((success)=>{
        return res.json({message:'updation done',status:200})
    })
    .catch((unsuccess)=>{
        return res.json({message:'updation fail',status:400})
    })
}


var getTopIco = (req,res)=>{
     topIco.find()
    .then((success)=>{
        return res.json({message:'updation done',status:200, data:success})
    })
    .catch((unsuccess)=>{
        return res.json({message:'updation fail',status:400})
    })
}

// api for admin, for creating the top ico from admin panel
var createTopIcoByAdmin = (req,res)=>{
    let saveData = {
        tokenAddress:req.body.tokenAddress,
    };

    if(!req.body)
        res.json({message:'Please fill required fields',status:400})
    else
    adminTopICO.create(saveData)
    .then((success)=>{
        return res.json({message:'Token added as in our Top list ICO',status:200})
    })
    .catch((unsuccess)=>{
        return res.json({message:'updation fail',status:400})
    })
}


var getTopIcoByAdmin = (req,res)=>{
    adminTopICO.find()

   .then((success)=>{
     var result = [];
     counter=0;
     Async.forEachLimit(success,1,(element,next)=>{

             console.log("success::::::::",element.tokenAddress)
        var opt = {
         method: 'GET',
         headers: {'content-type': 'application/json', 'charset':'utf-8'},
         json: true
       };

       var data = {};
           console.log('Constant.ethplorer',Constant.ethplorer);
           opt.url = Constant.ethplorer+'getTokenInfo/'+element.tokenAddress+"?apiKey=freekey"

           request(opt.url, function (err, response, body) {
             if(err)
             {
                     console.log("This is err:",err)
                     counter++;
                     if(counter<success.length)
                     {
                       next();
                     }
                       else {
                         res.json({data:result})
                       }
             }
               else{
                   counter++;
                 // console.log('javedkhannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',result);
                   console.log("data:::: ",counter)
                   if(counter < success.length)
                   {
                     let data = JSON.parse(body);
                     if(data.hasOwnProperty('error')){
                       console.log('I am error from server');
                       result.push({data:{} ,status : 400});

                     }else{
                       result.push({data: data,status : 200});
                     }
                   next();
               }
                 else {
                   let data = JSON.parse(body);
                   if(data.hasOwnProperty('error')){
                     console.log('I am error from server');
                     result.push({data: {},status : 400});
                   }else{
                       result.push({data: data,status : 200});
                   }
                   res.json({result : result})
                 }
               }
           })
       //return res.json({message:'updation done',status:200, data:success})
   })
   .catch((unsuccess)=>{
       return res.json({message:'updation fail',status:400})
   })
 })
}

// api for incomplete ico
var inCompleteICO = function(req, res){
    let condition = { $and: [ { userId: req.body.userId }, { isDeleted: false  } ] };
    console.log('***incomplete ico listing****');
    Crowdsale.find(condition,{},function(err, data){
        if(err){
            res.send({status : 400, message :"error while fetching from DB", data : []})
        }
        else{
            res.send({status : 200, message :"Incomplete ICO", data : data})
        }
    })
}

var deletedCompleteICO = function(req, res){
    let icoId = req.body.icoId;

    Crowdsale.findOneAndUpdate({_id : icoId},{$set : {isDeleted : true} },{new : true},function(err, data){
        if(err)
            res.send({status : 400, message :"error while fetching from DB", data : []})
        else
            res.send({status : 200, message :"Incomplete ICO deleted successfully!.", data : data})
    })
}



// update save as draft values api
updateSaveDraftByUserId  = (req,res)=>{
    var userId   =  req.body.userId;

    let updateParam = {
       crowdsale : req.body.state,
       userId : req.body.userId,
       token : req.body.token,
       icoId : req.body.icoId
     }

if(req.body.userId){

    Crowdsale.findOne({_id : req.body.icoId}, {},function(err,data){
       if(err) return res.json({message : "Please enter valid ID",status :400, data :[]})
        else {
            if(data){
                console.log('**I am going to update**');
                  Crowdsale.updateOne({_id :req.body.icoId},{ $set : updateParam },function(err,updateData){
                    if(updateData){
                        res.json({message : "ICO has been updated in draft!..",status : 200, data : data})
                    }
                  });
               // res.json({message : "Your Crawdsales upated successfully.",status : 200, data : data})
            }
               else {
                console.log('**I am going to create**');
                Crowdsale.create(updateParam,function(err,createData){
                    if(createData){
                        res.json({message : "ICO has been added in draft!..",status : 200, data : data})
                    }
                  });
             }
        }
      })
    }else{
      res.json({message : "Please enter valid ID",status :400, data :[]})
    }

}

// for KRYPTUAL POINTS:
var generateInvestorCode = function(req, res){
    let userId = req.body.userId;
     var updateParam = {
          generatedInvestorCode : 'KRYPTUAL'+Math.floor((Math.random() * 100000) + 1)
     };

    if(userId){
         User.findOne({_id : userId},{},function(err,data){
           //{ $set : updateParam },{ new: true },function(err,data){
               if(err){
                  return res.json({message : "Please enter valid ID",status :400, data :[]})
                }
                else if(data){
                    User.updateOne({_id : userId},{ $set : updateParam },{ new: true },function(err,success){
                        if(err){
                          return res.json({message : "Please enter valid ID",status :400, data :[]})
                        }
                        if(success){
                           return res.json({message : "Your refferal code has been generated! successfully.",status : 200,data : updateParam.generatedInvestorCode})
                        }else{
                           return res.json({message :"Please enter the valid userId ",status : 400})
                        }
                    })
                }
                else {
                return res.json({message : "Please enter the valid inputs",status :400, data : [],err:err}) }
              });
    }
    else{
       return res.json({message : "Please enter valid ID",status :400, data :[]})
    }
}

var getInvestorCode = (req, res) => {
    let userId = req.body.userId;
    if (userId) {
        User.findOne({ _id: userId }, {}, function(err, data) {
            if (err) {
                return res.json({
                    message: "Plase enter the valid Id",
                    status: 400
                })
            } else if (data) {
                if(data.generatedInvestorCode){
                    console.log("****generatedInvestorCode***",data.generatedInvestorCode);
                    return res.json({message: "Your refferal code is : " + data.generatedInvestorCode,status: 200,data : data.generatedInvestorCode})
                }
                else return res.json({message: "You have not generated yet!.",status: 400, data : ''})
            }
            else {
                return res.json({message: "Please enter the valid user id ",status: 400 });
            }
        })
    } else {
       return res.json({
            message: "please enter the reqiured field",
            status: 400
        })
    }
}
var getUserPoint = function(req,res){

let _id = req.body.userId;
User.findOne({_id : req.body.userId},{},function(err,data){
  if(err){
    res.json({message : "Error tot get data from DB",status : 400})
  }else if(data){
    res.json({message : "Points of user received successfully",status : 200,Points : data.kryptualPoints})
  }else {
    res.json({message : "Please enter the valid userId",status :400})
  }
})

}


// image upload on cloud
var imageUploadOnCloud = function(req, res){

    cloudinary.config({
      cloud_name: Constant.cloudImage.cloud_name,
      api_key: Constant.cloudImage.api_key,
      api_secret: Constant.cloudImage.api_secret
    });

     var img_base64 = req.body.image;
     var userId = req.body.userId;

     binaryData = new Buffer(img_base64, 'base64');

     fs.writeFile("KRYPTUAL"+userId+".jpg", binaryData, "binary", function(err) {
       console.log("file write");

         if (err) {
             console.log("errror in writtting file");
         } else {
            console.log("Image upload");
                 cloudinary.uploader.upload("KRYPTUAL"+userId+".jpg", function(result) {
                     if (result.url) {
                         res.json({
                             status: 200,
                             message:"Image upload successfully!.",
                             url: result.url
                         });
                     }else{
                        res.send({status : 400, message :"Oop's sorry,Please try again!."})
                     }
                 })
         }
     });
}

var getKryptualPoints = (req, res) => {
    let userId = req.body.userId;
    if (userId) {
        User.findOne({ _id: userId }, {kryptualPoints :1}, function(err, data) {
            if (err) {
                return res.json({
                    message: "Plase enter the valid Id",
                    status: 400
                })
            } else if (data) {
                return res.send({data : data.kryptualPoints,status : 200, message: "Your Points!"})
            }
        });
    }
}
//  functions
exports.register = register;
exports.verifyEmail = verifyEmail;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.imageUpload = imageUpload;
exports.check = check;
exports.logout = logout;
exports.UpdateUserProfileById = UpdateUserProfileById;
exports.UploadUserImageById = UploadUserImageById;
exports.GetProfileByUserId = GetProfileByUserId;
exports.getAllTokens = getAllTokens;
exports.viewTokenForHomePage = viewTokenForHomePage;
exports.searchTokenByName = searchTokenByName;
exports.getEthereumFromUSD = getEthereumFromUSD;

// javed api
exports.resetPasswordByUserid = resetPasswordByUserid;
exports.contactUs = contactUs;
exports.subscribeUs = subscribeUs;
exports.googleMapDirection = googleMapDirection;

// utkarsh api
exports.endrose = endrose;
exports.removeEndrose = removeEndrose;
exports.getReferralBalance = getReferralBalance;
exports.rateToken = rateToken;
exports.adminRateToken = adminRateToken;

// save data for generating ico
exports.saveCrowdsale = saveCrowdsale;
exports.getCrowdsale = getCrowdsale;
exports.deleteCrowdsale = deleteCrowdsale;


exports.getTokenInfo = getTokenInfo;
exports.getTopTokens = getTopTokens;
exports.saveContract = saveContract;
exports.getContract = getContract;

exports.rateToken = rateToken;
exports.adminRateToken = adminRateToken;


// for sending raw transaction
exports.sendRawTransaction = sendRawTransaction;
exports.getTokenInfoByTokenId = getTokenInfoByTokenId;
exports.verifyPassword = verifyPassword;

// api for Creating and fetch top ico's
exports.createTopIco = createTopIco
exports.getTopIco = getTopIco;


// for admin top ico
exports.createTopIcoByAdmin = createTopIcoByAdmin;
exports.getTopIcoByAdmin = getTopIcoByAdmin;
exports.inCompleteICO = inCompleteICO;
exports.deletedCompleteICO = deletedCompleteICO;
exports.updateSaveDraftByUserId = updateSaveDraftByUserId;

// for KRYPTUAL Points
exports.generateInvestorCode = generateInvestorCode;

exports.imageUploadOnCloud = imageUploadOnCloud;
exports.getInvestorCode = getInvestorCode;
//<<<<<<< HEAD
exports.getUserPoint = getUserPoint;
//=======
exports.getKryptualPoints = getKryptualPoints;
//>>>>>>> 6261ed8413246ab2b43f923e0da05300c391e56d
