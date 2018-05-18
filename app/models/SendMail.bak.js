var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var uniqueValidator = require('mongoose-unique-validator');
var nodemailer = require('nodemailer');
var CONST = require('../../config/constants');
var _jade = require('jade');
var fs = require('fs');

var Constant = require('../../config/constants');


var MailSchema = new Schema({
    to                  : { type : String },
    subject             : { type : String },
    body                : { type : String },
    title                : { type : String },
    status              : { type : Schema.Types.Mixed },
    updated_at          : { type : Date },
    deleted_at          : { type : Date, default: null },
    created_at          : { type : Date }
});


// smtp settings
var transporter = nodemailer.createTransport("SMTP",{
    service: 'zoho',
    auth: {
        user: Constant.gmailSMTPCredentials.username,
        pass:Constant.gmailSMTPCredentials.password
    }
});

MailSchema.statics = {
    sendPasswordMail: function (req, password, cb) {
        var self = this;
        var obj = {};
        console.log("===========================");
        console.log('signup:',req);
        console.log("===========================");
        obj.msg = 'Hi  &nbsp;&nbsp;'+ req.firstName + ',<br><br>'+
            'You are receiving this because you have successfully registered for TOKENOLOGY.<br><br>' +
            'Your Login Credentials are Here:<br><br>'+'userName is:'+req.email+'<br><br>'+'Password is :'+ password+
            '<br><br><br><br>TOKENOLOGY Team <br><br>';
        obj.subject = "TOKENOLOGY user Registration";
        obj.email = req.email;
        self.send(obj,cb);
    },
    registerMail: function (req, verifyurl, cb) {
        var self = this;
        var obj = {};
        console.log("===========================");
        console.log('signup:',req);
        console.log("===========================");
        // obj.msg = 'Hi  &nbsp;&nbsp;'+ req.firstName + ',<br><br>'+
        //     'You are receiving this because you have successfully registered for TOKNOLOGY.<br><br>' +
        //     'Please click on the following link, or paste into your browser to complete the verification process:<br><br>' +
        //     '<a href="' +CONST.hostingServer.serverName+verifyurl + '" target="_blank" >' + CONST.hostingServer.serverName +  verifyurl + '</a><br><br>' +
        //     'If you did not request this, please ignore.<br><br>';
        //     'Thanks, <br><br>'
        //     'Toknology Team <br><br>';
        obj.msg = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <title>Congratulations!!! Email</title>
     <!-- Designed by https://github.com/kaytcat -->
     <!-- Header image designed by Freepik.com -->


     <style type="text/css">
     /* Take care of image borders and formatting */
     img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
     a img { border: none; }
     table { border-collapse: collapse !important; }
     #outlook a { padding:0; }
     .ReadMsgBody { width: 100%; }
     .ExternalClass {width:100%;}
     .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
     table td {border-collapse: collapse;}
     .ExternalClass * {line-height: 115%;}
     /* General styling */
     td {
       font-family: Arial, sans-serif;
     }
     body {
       -webkit-font-smoothing:antialiased;
       -webkit-text-size-adjust:none;
       width: 100%;
       height: 100%;
       color: #6f6f6f;
       font-weight: 400;
       font-size: 18px;
     }
     h1 {
       margin: 10px 0;
     }
     a {
       color: #27aa90;
       text-decoration: none;
     }
     .force-full-width {
       width: 100% !important;
     }
     .body-padding {
       padding: 0 75px;
     }
     </style>

     <style type="text/css" media="screen">
         @media screen {
           @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
           /* Thanks Outlook 2013! */
           * {
             font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
           }
           .w280 {
             width: 280px !important;
           }
         }
     </style>

     <style type="text/css" media="only screen and (max-width: 480px)">
       /* Mobile styles */
       @media only screen and (max-width: 480px) {
         table[class*="w320"] {
           width: 320px !important;
         }
         td[class*="w320"] {
           width: 280px !important;
           padding-left: 20px !important;
           padding-right: 20px !important;
         }
         img[class*="w320"] {
           width: 250px !important;
           height: 67px !important;
         }
         td[class*="mobile-spacing"] {
           padding-top: 10px !important;
           padding-bottom: 10px !important;
         }
         *[class*="mobile-hide"] {
           display: none !important;
         }
         *[class*="mobile-br"] {
           font-size: 12px !important;
         }
         td[class*="mobile-w20"] {
           width: 20px !important;
         }
         img[class*="mobile-w20"] {
           width: 20px !important;
         }
         td[class*="mobile-center"] {
           text-align: center !important;
         }
         table[class*="w100p"] {
           width: 100% !important;
         }
         td[class*="activate-now"] {
           padding-right: 0 !important;
           padding-top: 20px !important;
         }
       }
     </style>
    </head>
    <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none" bgcolor="#eeebeb">
    <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
     <tr>
       <td align="center" valign="top" style="background-color:#eeebeb" width="100%">

       <center>

         <table cellspacing="0" cellpadding="0" width="600" class="w320">
           <tr>
             <td align="center" valign="top">




             <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#3bcdb0;">
               <tr>
                 <td style="text-align: center;">
                   <a href="#"><img class="w320" width="311" height="83" src="#" alt="company logo" ></a>
                 </td>
               </tr>
               <tr>
                 <td style="background-color:#3bcdb0;">

                   <table cellspacing="0" cellpadding="0" width="100%">
                     <tr>
                       <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                       <div class="mobile-br">&nbsp;</div>
                         Welcome to CRYPTUAL
                       <br>
                       </td>
                     </tr>
                     <tr>
                       <td style="font-size:24px; text-align:center; padding: 0 75px; color:#6f6f6f;" class="w320 mobile-spacing">
                        <br>
                       </td>
                     </tr>
                   </table>

                 </td>
               </tr>
             </table>

             <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff" >
               <tr>
                 <td style="background-color:#ffffff;">
                 <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td style="font-size:24px; text-align:center;" class="mobile-center body-padding w320">
                     <br>
             Congratulations!!!<br>

                     </td>
                   </tr>
                 </table>

                 <table cellspacing="0" cellpadding="0" class="force-full-width">
                   <tr>

                     <td width="75%" class="">
                       <table cellspacing="0" cellpadding="0" class="w320 w100p"><br><br><br>
                         <tr>
                           <td class="mobile-center activate-now" style="font-size:17px; text-align:center; padding: 0 75px; color:#6f6f6f;" >

                            Dear  `+ req.email +`
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                 </table>
                   <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td style="text-align:left; font-size:15px;" class="mobile-center body-padding w320">
                     <br>
                     You are receiving this because you have successfully registered for CRYPTUAL.<br/>
                     Please click on the following link, or paste into your browser to complete the verification process : <br/>
                     <a href ="`+CONST.hostingServer.serverName+verifyurl+`" target="_blank" > `+ CONST.hostingServer.serverName +`verifyurl </a><br><br>
                     If you did not request this, please ignore.<br><br></td>
                   </tr>
                 </table>


                 <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                     <br>
                     <strong>Please Note : </strong><br>
             1. Do not share your credentials or otp with anyone on email.<br>
             2. Wallet never asks you for your credentials or otp.<br>
             3. Always create a strong password and keep different passwords for different websites.<br>
             4. Ensure you maintain only one account on wallet to enjoy our awesome services.<br>
                     </td>
                   </tr>
                 </table>
                 <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                     <br>
                       If you have any questions regarding <b>CRYPTUAL </b>please read our FAQ or use our support form cryptual email address). Our support staff will be more than happy to assist you.<br><br>
                     </td>
                   </tr>
                 </table>
                  <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                     <br><b>Regards,</b><br>
                      <b>CRYPTUAL</b>team<br>Thank you<br><br><br>
                     </td>
                   </tr>
                 </table>



                 <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">

                   <tr>
                     <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;"><br>
                       © 2018 All Rights Reserved <b>CRYPTUAL</b>
                   </tr>
                   <tr>
                     <td style="color:#27aa90; font-size: 14px; text-align:center;">
                       <a href="#">View in browser</a> | <a href="#">Contact</a> | <a href="#">Unsubscribe</a>
                     </td>
                   </tr>
                   <tr>
                     <td style="font-size:12px;">
                       &nbsp;
                     </td>
                   </tr>
                 </table>

                 </td>
               </tr>
             </table>







             </td>
           </tr>
         </table>

       </center>




       </td>
     </tr>
    </table>
    </body>
    </html>`;
        obj.subject = "CRYPTUAL Registration";
        obj.email = req.email;
        self.send(obj,cb);
    },
    resetPwdMail: function (req, token, cb) {
        var self = this;
        var obj = {};
        console.log("===========================");
        console.log('signup:',req);
        console.log("===========================");
        obj.msg = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Congratulations!!! Email</title>
  <!-- Designed by https://github.com/kaytcat -->
  <!-- Header image designed by Freepik.com -->


  <style type="text/css">
  /* Take care of image borders and formatting */
  img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
  a img { border: none; }
  table { border-collapse: collapse !important; }
  #outlook a { padding:0; }
  .ReadMsgBody { width: 100%; }
  .ExternalClass {width:100%;}
  .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
  table td {border-collapse: collapse;}
  .ExternalClass * {line-height: 115%;}
  /* General styling */
  td {
    font-family: Arial, sans-serif;
  }
  body {
    -webkit-font-smoothing:antialiased;
    -webkit-text-size-adjust:none;
    width: 100%;
    height: 100%;
    color: #6f6f6f;
    font-weight: 400;
    font-size: 18px;
  }
  h1 {
    margin: 10px 0;
  }
  a {
    color: #27aa90;
    text-decoration: none;
  }
  .force-full-width {
    width: 100% !important;
  }
  .body-padding {
    padding: 0 75px;
  }
  </style>

  <style type="text/css" media="screen">
      @media screen {
        @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
        /* Thanks Outlook 2013! */
        * {
          font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
        }
        .w280 {
          width: 280px !important;
        }
      }
  </style>

  <style type="text/css" media="only screen and (max-width: 480px)">
    /* Mobile styles */
    @media only screen and (max-width: 480px) {
      table[class*="w320"] {
        width: 320px !important;
      }
      td[class*="w320"] {
        width: 280px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      img[class*="w320"] {
        width: 250px !important;
        height: 67px !important;
      }
      td[class*="mobile-spacing"] {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
      }
      *[class*="mobile-hide"] {
        display: none !important;
      }
      *[class*="mobile-br"] {
        font-size: 12px !important;
      }
      td[class*="mobile-w20"] {
        width: 20px !important;
      }
      img[class*="mobile-w20"] {
        width: 20px !important;
      }
      td[class*="mobile-center"] {
        text-align: center !important;
      }
      table[class*="w100p"] {
        width: 100% !important;
      }
      td[class*="activate-now"] {
        padding-right: 0 !important;
        padding-top: 20px !important;
      }
    }
  </style>
</head>
<body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none" bgcolor="#eeebeb">
<table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
  <tr>
    <td align="center" valign="top" style="background-color:#eeebeb" width="100%">

    <center>

      <table cellspacing="0" cellpadding="0" width="600" class="w320">
        <tr>
          <td align="center" valign="top">




          <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#3bcdb0;">
            <tr>
              <td style="text-align: center;">
                <a href="#"><img class="w320" width="311" height="83" src="#" alt="company logo" ></a>
              </td>
            </tr>
            <tr>
              <td style="background-color:#3bcdb0;">

                <table cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                    <div class="mobile-br">&nbsp;</div>
                      Welcome to CRYPTUAL
                    <br>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:24px; text-align:center; padding: 0 75px; color:#6f6f6f;" class="w320 mobile-spacing">
                     <br>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>

          <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff" >
            <tr>
              <td style="background-color:#ffffff;">
              <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="font-size:24px; text-align:center;" class="mobile-center body-padding w320">
                  <br>
                    Congratulations!!!<br>

                  </td>
                </tr>
              </table>

              <table cellspacing="0" cellpadding="0" class="force-full-width">
                <tr>

                  <td width="75%" class="">
                    <table cellspacing="0" cellpadding="0" class="w320 w100p"><br><br><br>
                      <tr>
                        <td class="mobile-center activate-now" style="font-size:17px; text-align:center; padding: 0 75px; color:#6f6f6f;" >

                         Dear  `+ req.email +`
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
                <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="text-align:left; font-size:15px;" class="mobile-center body-padding w320">
                  <br>

          You are receiving this because you (or someone else) has requested a reset of your account password.<br/>
              Please click on the following link, or paste into your browser to complete the process: <br/>

              <a href=`+ CONST.hostingServer.serverName+'updatePassword/' + token + 'target="_blank" >' + CONST.hostingServer.serverName+`'reset-password/'` + token + `'</a><br><br>
                  </td>
                </tr>
              </table>


              <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                  <br>
                  <strong>Please Note : </strong><br>
                    1. Do not share your credentials or otp with anyone on email.<br>
                    2. Wallet never asks you for your credentials or otp.<br>
                    3. Always create a strong password and keep different passwords for different websites.<br>
                    4. Ensure you maintain only one account on wallet to enjoy our awesome services.<br>
                  </td>
                </tr>
              </table>
              <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                  <br>
                    If you have any questions regarding <b>CRYPTUAL </b>please read our FAQ or use our support form cryptual email address). Our support staff will be more than happy to assist you.<br><br>
                  </td>
                </tr>
              </table>
               <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                  <br><b>Regards,</b><br>
                   <b>CRYPTUAL</b>team<br>Thank you<br><br><br>
                  </td>
                </tr>
              </table>



              <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">

                <tr>
                  <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;"><br>
                    © 2018 All Rights Reserved <b>CRYPTUAL</b>
                </tr>
                <tr>
                  <td style="color:#27aa90; font-size: 14px; text-align:center;">
                    <a href="#">View in browser</a> | <a href="#">Contact</a> | <a href="#">Unsubscribe</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;">
                    &nbsp;
                  </td>
                </tr>
              </table>

              </td>
            </tr>
          </table>







          </td>
        </tr>
      </table>

    </center>




    </td>
  </tr>
</table>
</body>
</html>`;
        // obj.msg = 'You are receiving this because you (or someone else) has requested a reset of your account password.<br/>' +
        //     'Please click on the following link, or paste into your browser to complete the process:<br/>' +
        //     '<a href="' + CONST.hostingServer.serverName+'reset-password/' + token + '" target="_blank" >' + CONST.hostingServer.serverName+'reset-password/' + token + '</a><br><br>';

        obj.subject = "Reset Password";
        obj.email = req.email;
        self.send(obj,cb);
    },
    resetConfirmMail: function (req, cb) {
        var self = this;
        var obj = {};
        console.log("===========================");
        console.log('signup:',req);
        console.log("===========================");
        // obj.msg = 'Hello,\n\n' +
        // 'This is a confirmation that the password for your account ' + req.email + ' has just been changed.\n';
        obj.msg  = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1" />
 <title>Congratulations!!! Email</title>
 <!-- Designed by https://github.com/kaytcat -->
 <!-- Header image designed by Freepik.com -->


 <style type="text/css">
 /* Take care of image borders and formatting */
 img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
 a img { border: none; }
 table { border-collapse: collapse !important; }
 #outlook a { padding:0; }
 .ReadMsgBody { width: 100%; }
 .ExternalClass {width:100%;}
 .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
 table td {border-collapse: collapse;}
 .ExternalClass * {line-height: 115%;}
 /* General styling */
 td {
   font-family: Arial, sans-serif;
 }
 body {
   -webkit-font-smoothing:antialiased;
   -webkit-text-size-adjust:none;
   width: 100%;
   height: 100%;
   color: #6f6f6f;
   font-weight: 400;
   font-size: 18px;
 }
 h1 {
   margin: 10px 0;
 }
 a {
   color: #27aa90;
   text-decoration: none;
 }
 .force-full-width {
   width: 100% !important;
 }
 .body-padding {
   padding: 0 75px;
 }
 </style>

 <style type="text/css" media="screen">
     @media screen {
       @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
       /* Thanks Outlook 2013! */
       * {
         font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
       }
       .w280 {
         width: 280px !important;
       }
     }
 </style>

 <style type="text/css" media="only screen and (max-width: 480px)">
   /* Mobile styles */
   @media only screen and (max-width: 480px) {
     table[class*="w320"] {
       width: 320px !important;
     }
     td[class*="w320"] {
       width: 280px !important;
       padding-left: 20px !important;
       padding-right: 20px !important;
     }
     img[class*="w320"] {
       width: 250px !important;
       height: 67px !important;
     }
     td[class*="mobile-spacing"] {
       padding-top: 10px !important;
       padding-bottom: 10px !important;
     }
     *[class*="mobile-hide"] {
       display: none !important;
     }
     *[class*="mobile-br"] {
       font-size: 12px !important;
     }
     td[class*="mobile-w20"] {
       width: 20px !important;
     }
     img[class*="mobile-w20"] {
       width: 20px !important;
     }
     td[class*="mobile-center"] {
       text-align: center !important;
     }
     table[class*="w100p"] {
       width: 100% !important;
     }
     td[class*="activate-now"] {
       padding-right: 0 !important;
       padding-top: 20px !important;
     }
   }
 </style>
</head>
<body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none" bgcolor="#eeebeb">
<table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
 <tr>
   <td align="center" valign="top" style="background-color:#eeebeb" width="100%">

   <center>

     <table cellspacing="0" cellpadding="0" width="600" class="w320">
       <tr>
         <td align="center" valign="top">




         <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#3bcdb0;">
           <tr>
             <td style="text-align: center;">
               <a href="#"><img class="w320" width="311" height="83" src="#" alt="company logo" ></a>
             </td>
           </tr>
           <tr>
             <td style="background-color:#3bcdb0;">

               <table cellspacing="0" cellpadding="0" width="100%">
                 <tr>
                   <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                   <div class="mobile-br">&nbsp;</div>
                     Welcome to CRYPTUAL
                   <br>
                   </td>
                 </tr>
                 <tr>
                   <td style="font-size:24px; text-align:center; padding: 0 75px; color:#6f6f6f;" class="w320 mobile-spacing">
                    <br>
                   </td>
                 </tr>
               </table>

             </td>
           </tr>
         </table>

         <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff" >
           <tr>
             <td style="background-color:#ffffff;">
             <table cellspacing="0" cellpadding="0" width="100%">
               <tr>
                 <td style="font-size:24px; text-align:center;" class="mobile-center body-padding w320">
                 <br>
         Congratulations!!!<br>

                 </td>
               </tr>
             </table>

             <table cellspacing="0" cellpadding="0" class="force-full-width">
               <tr>

                 <td width="75%" class="">
                   <table cellspacing="0" cellpadding="0" class="w320 w100p"><br><br><br>
                     <tr>
                       <td class="mobile-center activate-now" style="font-size:17px; text-align:center; padding: 0 75px; color:#6f6f6f;" >

                        Dear <b>  `+ req.firstName +` </b>
                       </td>
                     </tr>
                   </table>
                 </td>
               </tr>
             </table>
               <table cellspacing="0" cellpadding="0" width="100%">
               <tr>
                 <td style="text-align:left; font-size:15px;" class="mobile-center body-padding w320">
                 <br>
          This is a confirmation that the password for <br/> your account : ` + req.email + `<br>
    <br><br><br> Your Password has been changed sucessfully.
             <br><br>

                 </td>
               </tr>
             </table>


             <table cellspacing="0" cellpadding="0" width="100%">
               <tr>
                 <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                 <br>
                 <strong>Please Note : </strong><br>
         1. Do not share your credentials or otp with anyone on email.<br>
         2. Wallet never asks you for your credentials or otp.<br>
         3. Always create a strong password and keep different passwords for different websites.<br>
         4. Ensure you maintain only one account on wallet to enjoy our awesome services.<br>
                 </td>
               </tr>
             </table>
             <table cellspacing="0" cellpadding="0" width="100%">
               <tr>
                 <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                 <br>
                   If you have any questions regarding <b>CRYPTUAL </b>please read our FAQ or use our support form cryptual email address). Our support staff will be more than happy to assist you.<br><br>
                 </td>
               </tr>
             </table>
              <table cellspacing="0" cellpadding="0" width="100%">
               <tr>
                 <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                 <br><b>Regards,</b><br>
                  <b>CRYPTUAL</b>team<br>Thank you<br><br><br>
                 </td>
               </tr>
             </table>



             <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">

               <tr>
                 <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;"><br>
                   © 2018 All Rights Reserved <b>CRYPTUAL</b>
               </tr>
               <tr>
                 <td style="color:#27aa90; font-size: 14px; text-align:center;">
                   <a href="#">View in browser</a> | <a href="#">Contact</a> | <a href="#">Unsubscribe</a>
                 </td>
               </tr>
               <tr>
                 <td style="font-size:12px;">
                   &nbsp;
                 </td>
               </tr>
             </table>

             </td>
           </tr>
         </table>







         </td>
       </tr>
     </table>

   </center>




   </td>
 </tr>
</table>
</body>
</html>`;

        obj.subject = "Reset Password";
        obj.email = req.email;
        self.send(obj,cb);
    },
    sendWelcomeMail: function (data,cb) {
        var self = this;
        var template = process.cwd() + '/templates/welcome.jade';
        var obj = data;
        obj.msg = template;
        obj.subject = "Welcome to TOKENOLOGY";

        // get template from file system
        fs.readFile(template, 'utf8', function(err, file) {
            if (err) {
                //handle errors
                console.log('ERROR!',err);
                cb('error',err)
            }
            else {
                //compile jade template into function
                var compiledTmpl = _jade.compile(file, {filename: template});
                // set context to be used in template
                var context = {title: 'LuvCheck'};
                // get html back as a string with the context applied;
                var html = compiledTmpl(context);

                var data = {
                    from: Constant.gmailSMTPCredentials.username,
                    to: obj.email,
                    subject: (obj.subject || "No Subject"),
                    html: (html || "Empty Body")
                };

                // send mail with defined transport object
                transporter.sendMail(data, function (error, info) {
                    if (error) {
                        console.log(error,"error");
                        cb(error);
                    }else{
                        console.log('Message sent: ' + info.messageId);
                        cb('Message sent: ' + info.messageId)
                    }
                });

            }
        })
    },
    verifyAccountMail: function (req, cb) {
        var self = this;
        var obj = {};
        console.log("===========================");
        console.log('verify:',req);
        console.log("===========================");
        obj.msg = 'Hello,<br><br>' +
            'This is a confirmation that your account has been activated.<br><br>' +
            'Please click on the following link to login,<br><br>' +
            '<a href="' + CONST.hostingServer.serverName + '" target="_blank" >'+CONST.hostingServer.serverName+'</a><br><br>';
        obj.subject = "Account Activation";
        obj.email = req.email;
        self.send(obj,cb);
    },
    send: function(obj,callback){
        var self = this;
        var data = {
            from: Constant.gmailSMTPCredentials.username,
            to: obj.email,
            title: (obj.title || "No Title"),
            subject: (obj.subject || "No Subject"),
            html: (obj.msg || "Empty Body")
        };

        // send mail with defined transport object
        transporter.sendMail(data, function (error, info) {
            if (error) {
                console.log(error,"error");
                return console.log(error);
            }else{
                console.log('Message sent: ' + info.messageId);
                callback('Message sent: ' + info.messageId)

            }
        });
        return true;
    },
      ContactUsMail : function (req, cb) {
      var self = this;
      var obj = {};
      console.log("===========================");
      console.log('signup:',req);
      console.log("===========================");
      obj.msg   = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kryptual Welcome Email</title>
        <!-- Designed by https://github.com/kaytcat -->
        <!-- Header image designed by Freepik.com -->


        <style type="text/css">
        /* Take care of image borders and formatting */
        img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
        a img { border: none; }
        table { border-collapse: collapse !important; }
        #outlook a { padding:0; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass {width:100%;}
        .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
        table td {border-collapse: collapse;}
        .ExternalClass * {line-height: 115%;}
        /* General styling */
        td {
          font-family: Arial, sans-serif;
        }
        body {
          -webkit-font-smoothing:antialiased;
          -webkit-text-size-adjust:none;
          width: 100%;
          height: 100%;
          color: #6f6f6f;
          font-weight: 400;
          font-size: 18px;
        }
        h1 {
          margin: 10px 0;
        }
        a {
          color: #27aa90;
          text-decoration: none;
        }
        .force-full-width {
          width: 100% !important;
        }
        .body-padding {
          padding: 0 75px;
        }
        </style>

        <style type="text/css" media="screen">
            @media screen {
              @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
              /* Thanks Outlook 2013! */
              * {
                font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
              }
              .w280 {
                width: 280px !important;
              }
            }
        </style>

        <style type="text/css" media="only screen and (max-width: 480px)">
          /* Mobile styles */
          @media only screen and (max-width: 480px) {
            table[class*="w320"] {
              width: 320px !important;
            }
            td[class*="w320"] {
              width: 280px !important;
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
            img[class*="w320"] {
              width: 250px !important;
              height: 67px !important;
            }
            td[class*="mobile-spacing"] {
              padding-top: 10px !important;
              padding-bottom: 10px !important;
            }
            *[class*="mobile-hide"] {
              display: none !important;
            }
            *[class*="mobile-br"] {
              font-size: 12px !important;
            }
            td[class*="mobile-w20"] {
              width: 20px !important;
            }
            img[class*="mobile-w20"] {
              width: 20px !important;
            }
            td[class*="mobile-center"] {
              text-align: center !important;
            }
            table[class*="w100p"] {
              width: 100% !important;
            }
            td[class*="activate-now"] {
              padding-right: 0 !important;
              padding-top: 20px !important;
            }
          }
        </style>
      </head>
      <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none" bgcolor="#eeebeb">
      <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
        <tr>
          <td align="center" valign="top" style="background-color:#eeebeb" width="100%">

          <center>

            <table cellspacing="0" cellpadding="0" width="600" class="w320">
              <tr>
                <td align="center" valign="top">




                <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#3bcdb0;">
                  <tr>
                    <td style="text-align: center;">
                      <a href="#"><img class="w320" width="311" height="83" src="#" alt="company logo" ></a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#3bcdb0;">

                      <table cellspacing="0" cellpadding="0" width="100%">
                        <tr>
                          <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                          <div class="mobile-br">&nbsp;</div>
                            Welcome to Kryptual
                          <br>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:24px; text-align:center; padding: 0 75px; color:#6f6f6f;" class="w320 mobile-spacing">
                            <br>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff" >
                  <tr>
                    <td style="background-color:#ffffff;">
                        <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="font-size:24px; text-align:center;" class="mobile-center body-padding w320">
                        <br>


                        </td>
                      </tr>
                    </table>

                     <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br>
                         <b>Dear <b>  `+ req.name +` </b>,<br>
                        </td>
                      </tr>
                    </table>
                     <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br>
                          Thank you for contact at Kryptual! You can store your cyrpto currency safe and secure.Feel free to invite your friends and family members to Kryptual community.<br>
                    Your Query has been send succssfully to the Kryptual team .You've successfully gone through the process of  contact at Kryptual. Now You can start to receive and send from your wallet account in seconds.<br><br><br>
                        </td>
                      </tr>
                    </table>

                    <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                      <tr>
                        <td style="text-align:center; margin:0 auto;">
                        <br>

                          <br>
                        </td>
                      </tr>
                    </table>
                      <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br>
                          If you have any questions regarding .Kryptual. please read our FAQ or use our support form Kryptual email address). Our support staff will be more than happy to assist you.<br><br><br>
                        </td>
                      </tr>
                    </table>
                     <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br><b>Regards,</b><br>
                         Kryptual team<br>Thank you<br><br><br>
                        </td>
                      </tr>
                    </table>



                    <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">

                      <tr>
                        <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;"><br>
                          © 2018 All Rights Reserved .Kryptual.
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#27aa90; font-size: 14px; text-align:center;">
                          <a href="#">View in browser</a> | <a href="#">Contact</a> | <a href="#">Unsubscribe</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:12px;">
                          &nbsp;
                        </td>
                      </tr>
                    </table>

                    </td>
                  </tr>
                </table>







                </td>
              </tr>
            </table>

          </center>




          </td>
        </tr>
      </table>
      </body>
      </html>`;
      obj.subject = "Contact  With  Us ";
      obj.email = req.email;
      self.send(obj,cb);
  },
    SubscribeWithUs : function (req, cb) {
      var self = this;
      var obj = {};
      console.log("===========================");
      console.log('signup:',req);
      console.log("===========================");
      obj.msg   = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kryptual Welcome Email</title>
        <!-- Designed by https://github.com/kaytcat -->
        <!-- Header image designed by Freepik.com -->


        <style type="text/css">
        /* Take care of image borders and formatting */
        img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
        a img { border: none; }
        table { border-collapse: collapse !important; }
        #outlook a { padding:0; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass {width:100%;}
        .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
        table td {border-collapse: collapse;}
        .ExternalClass * {line-height: 115%;}
        /* General styling */
        td {
          font-family: Arial, sans-serif;
        }
        body {
          -webkit-font-smoothing:antialiased;
          -webkit-text-size-adjust:none;
          width: 100%;
          height: 100%;
          color: #6f6f6f;
          font-weight: 400;
          font-size: 18px;
        }
        h1 {
          margin: 10px 0;
        }
        a {
          color: #27aa90;
          text-decoration: none;
        }
        .force-full-width {
          width: 100% !important;
        }
        .body-padding {
          padding: 0 75px;
        }
        </style>

        <style type="text/css" media="screen">
            @media screen {
              @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
              /* Thanks Outlook 2013! */
              * {
                font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
              }
              .w280 {
                width: 280px !important;
              }
            }
        </style>

        <style type="text/css" media="only screen and (max-width: 480px)">
          /* Mobile styles */
          @media only screen and (max-width: 480px) {
            table[class*="w320"] {
              width: 320px !important;
            }
            td[class*="w320"] {
              width: 280px !important;
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
            img[class*="w320"] {
              width: 250px !important;
              height: 67px !important;
            }
            td[class*="mobile-spacing"] {
              padding-top: 10px !important;
              padding-bottom: 10px !important;
            }
            *[class*="mobile-hide"] {
              display: none !important;
            }
            *[class*="mobile-br"] {
              font-size: 12px !important;
            }
            td[class*="mobile-w20"] {
              width: 20px !important;
            }
            img[class*="mobile-w20"] {
              width: 20px !important;
            }
            td[class*="mobile-center"] {
              text-align: center !important;
            }
            table[class*="w100p"] {
              width: 100% !important;
            }
            td[class*="activate-now"] {
              padding-right: 0 !important;
              padding-top: 20px !important;
            }
          }
        </style>
      </head>
      <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none" bgcolor="#eeebeb">
      <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
        <tr>
          <td align="center" valign="top" style="background-color:#eeebeb" width="100%">

          <center>

            <table cellspacing="0" cellpadding="0" width="600" class="w320">
              <tr>
                <td align="center" valign="top">




                <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#3bcdb0;">
                  <tr>
                    <td style="text-align: center;">
                      <a href="#"><img class="w320" width="311" height="83" src="#" alt="company logo" ></a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#3bcdb0;">

                      <table cellspacing="0" cellpadding="0" width="100%">
                        <tr>
                          <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                          <div class="mobile-br">&nbsp;</div>
                            Welcome to Kryptual
                          <br>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:24px; text-align:center; padding: 0 75px; color:#6f6f6f;" class="w320 mobile-spacing">
                            <br>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff" >
                  <tr>
                    <td style="background-color:#ffffff;">
                        <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="font-size:24px; text-align:center;" class="mobile-center body-padding w320">
                        <br>


                        </td>
                      </tr>
                    </table>

                     <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br>
                         <b>Dear <b>  `+ req.email +` </b>,<br>
                        </td>
                      </tr>
                    </table>
                     <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br>
                          Thank you for subscribe at Kryptual! You can store your cyrpto currency safe and secure.Feel free to invite your friends and family members to Kryptual community.<br>
                         You've successfully gone through the process of  subscribe at Kryptual. Now You can start to receive and send from your wallet account in seconds.<br><br><br>
                        </td>
                      </tr>
                    </table>

                    <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                      <tr>
                        <td style="text-align:center; margin:0 auto;">
                        <br>

                          <br>
                        </td>
                      </tr>
                    </table>
                      <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br>
                          If you have any questions regarding .Kryptual. please read our FAQ or use our support form Kryptual email address). Our support staff will be more than happy to assist you.<br><br><br>
                        </td>
                      </tr>
                    </table>
                     <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                        <br><b>Regards,</b><br>
                         Kryptual team<br>Thank you<br><br><br>
                        </td>
                      </tr>
                    </table>



                    <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">

                      <tr>
                        <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;"><br>
                          © 2018 All Rights Reserved .Kryptual.
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#27aa90; font-size: 14px; text-align:center;">
                          <a href="#">View in browser</a> | <a href="#">Contact</a> | <a href="#">Unsubscribe</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:12px;">
                          &nbsp;
                        </td>
                      </tr>
                    </table>

                    </td>
                  </tr>
                </table>







                </td>
              </tr>
            </table>

          </center>




          </td>
        </tr>
      </table>
      </body>
      </html>`;
      obj.subject = "Subscribe  With  Us ";
      obj.email = req.email;
      self.send(obj,cb);
  }

};

var Mail = mongoose.model('Mail', MailSchema);

module.exports = Mail;