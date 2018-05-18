var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var Schema = mongoose.Schema;
var Q = require('q');
var uniqueValidator = require('mongoose-unique-validator');
var nodemailer = require('nodemailer');
var CONST = require('../../config/constants');
var _jade = require('jade');
var fs = require('fs');
var now = new Date();

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
  buyproduct: function (req, success, cb) {
      var self = this;
      var obj = {};
    //  console.log("===========================",email);
      console.log('signup:',req);
      console.log("===========================");
      obj.msg = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

  <!-- Facebook sharing information tags -->
  <meta property="og:title" content="*|MC:SUBJECT|*" />

  <title>Congratulations!!! Email</title>
  <style type="text/css">
    /* Client-specific Styles */

    #outlook a {
      padding: 0;
    }

    /* Force Outlook to provide a "view in browser" button. */

    body {
      width: 100% !important;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    /* Force Hotmail to display emails at full width */

    body {
      -webkit-text-size-adjust: none;
    }

    /* Prevent Webkit platforms from changing default text sizes. */

    /* Reset Styles */

    body {
      margin: 0;
      padding: 0;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    table td {
      border-collapse: collapse;
    }

    #backgroundTable {
      height: 100% !important;
      margin: 0;
      padding: 0;
      width: 100% !important;
    }

    body,
    #backgroundTable {
      /*@editable*/
      background-color: #FAFAFA;
    }

    #templateContainer {
      /*@editable*/
      border: 1px solid #DDDDDD;
    }

    h1,
    .h1 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 34px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    h2,
    .h2 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 30px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    h3,
    .h3 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 26px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    h4,
    .h4 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 22px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    #templateHeader {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border-bottom: 0;
    }

    .headerContent {
      /*@editable*/
      color: #202020;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 34px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      /*@editable*/
      padding: 0;
      /*@editable*/
      text-align: center;
      /*@editable*/
      vertical-align: middle;
    }

    .headerContent a:link,
    .headerContent a:visited,
    /* Yahoo! Mail Override */

    .headerContent a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-weight: normal;
      /*@editable*/
      text-decoration: underline;
    }

    #headerImage {
      height: auto;
      max-width: 600px !important;
    }

    #templateContainer,
    .bodyContent {
      /*@editable*/
      background-color: #FFFFFF;
    }

    .bodyContent div {
      /*@editable*/
      color: #505050;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 14px;
      /*@editable*/
      line-height: 150%;
      /*@editable*/
      text-align: left;
    }

    .bodyContent div a:link,
    .bodyContent div a:visited,
    /* Yahoo! Mail Override */

    .bodyContent div a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-weight: normal;
      /*@editable*/
      text-decoration: underline;
    }

    .templateDataTable {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border: 1px solid #DDDDDD;
    }

    .dataTableHeading {
      /*@editable*/
      background-color: #D8E2EA;
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-family: Helvetica;
      /*@editable*/
      font-size: 14px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 150%;
      /*@editable*/
      text-align: left;
    }

    .dataTableHeading a:link,
    .dataTableHeading a:visited,
    /* Yahoo! Mail Override */

    .dataTableHeading a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #FFFFFF;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      text-decoration: underline;
    }

    .dataTableContent {
      /*@editable*/
      border-top: 1px solid #DDDDDD;
      /*@editable*/
      border-bottom: 0;
      /*@editable*/
      color: #202020;
      /*@editable*/
      font-family: Helvetica;
      /*@editable*/
      font-size: 12px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 150%;
      /*@editable*/
      text-align: left;
    }

    .dataTableContent a:link,
    .dataTableContent a:visited,
    /* Yahoo! Mail Override */

    .dataTableContent a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #202020;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      text-decoration: underline;
    }

    .templateButton {
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
      /*@editable*/
      background-color: #336699;
      /*@editable*/
      border: 0;
      border-collapse: separate !important;
      border-radius: 3px;
    }

    .templateButton,
    .templateButton a:link,
    .templateButton a:visited,
    /* Yahoo! Mail Override */

    .templateButton a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #FFFFFF;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 15px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      letter-spacing: -.5px;
      /*@editable*/
      line-height: 100%;
      text-align: center;
      text-decoration: none;
    }

    .bodyContent img {
      display: inline;
      height: auto;
    }

    #templateFooter {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border-top: 0;
    }

    .footerContent div {
      /*@editable*/
      color: #707070;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 12px;
      /*@editable*/
      line-height: 125%;
      /*@editable*/
      text-align: center;
    }

    .footerContent div a:link,
    .footerContent div a:visited,
    /* Yahoo! Mail Override */

    .footerContent div a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-weight: normal;
      /*@editable*/
      text-decoration: underline;
    }

    .footerContent img {
      display: inline;
    }

    #utility {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border: 0;
    }

    #utility div {
      /*@editable*/
      text-align: center;
    }

    #monkeyRewards img {
      max-width: 190px;
    }
  </style>
</head>

<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
  <center>
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
      <tr>
        <td align="center" valign="top" style="padding-top:20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
            <tr>
              <td align="center" valign="top">
                <!-- // Begin Template Header \\ -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                  <tr>
                    <td class="headerContent">

                      <!-- // Begin Module: Standard Header Image \\ -->
                      <img src="https://www.kryptual.com/assets/img/kryptual_logo.png" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                      <!-- // End Module: Standard Header Image \\ -->

                    </td>
                  </tr>
                </table>
                <!-- // End Template Header \\ -->
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <!-- // Begin Template Body \\ -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                  <tr>
                    <td valign="top">

                      <!-- // Begin Module: Standard Content \\ -->
                      <table border="0" cellpadding="20" cellspacing="0" width="100%">
                        <tr>
                          <td valign="top" class="bodyContent">
                            <div mc:edit="std_content00">

                              <br><br>
                              <p><strong>Dear  User </strong> <br><br> Thanks  for shoping with Kryptual .You have successfully Buy this  Product. <br> This completes your product details. Thank you for business!
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table border="0" cellpadding="20" cellspacing="0" width="92%" align="center">

                              <tr style="background-color:#00b8ff; color:white;font-size: 11px;" align="center">
                                <th>Sr.No.</th>
                                <th>Date</th>
                                <!-- Dummy cell for the row number and row commands -->
                                <th>From Shiping</th>
                                <th>To Shiping</th>
                                <th>Quantity</th>
                              </tr>

                              <tr data-iterate="item" style="font-size: 11px;">
                                <td>1</td>
                                <td>`+dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")+`</td>
                                <td>`+req.user_id+`</td>
                                <td>`+success.address +`</td>
                                <td>`+req.product.quantity +`</td>
                              </tr>
                              <tr style="background-color:#00b8ff; color:white ;font-size: 11px;" align="center">
                                <th></th>
                                <th></th>
                                <!-- Dummy cell for the row number and row commands -->
                                <th></th>
                                <th></th>
                                <th>Total=`+success.product.amount +` ETH only.</th>
                              </tr>
                            </table>

                          </td>
                        </tr>

                        <tr>
                          <td valign="top" class="bodyContent">
                            <div mc:edit="std_content01">
                              <p>KRYPTUAL will issue a this mail based on your payment made by you. <br> We really appreciate your business.</p>
                              <p style="font-size:10px">If this was not you, please reply to this email as soon as possible and let us know that you didn't request it.

                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <tr>
                            <td class="bodyContent" style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                              <br><b>Regards,</b><br>
                              <b>KRYPTUAL </b> Team<br>Thank you<br><br><br>
                            </td>
                          </tr>

                        </tr>
                      </table>
                      <!-- // End Module: Standard Content \\ -->

                    </td>
                  </tr>
                </table>
                <!-- // End Template Body \\ -->
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <!-- // Begin Template Footer \\ -->
                <table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
                  <tr>
                    <td valign="top" class="footerContent">

                      <!-- // Begin Module: Transactional Footer \\ -->
                      <table border="0" cellpadding="10" cellspacing="0" width="100%">
                        <tr>
                          <td valign="top">
                            <div mc:edit="std_footer">
                              <em>Copyright &copy; KRYPTUAL  2018, All rights reserved.</em>
                              <br />
                              <strong>Our mailing address is:</strong>
                              <br /> cntctspprtmarket@gmail.com
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td valign="middle" id="utility">
                            <div mc:edit="std_utility">
                              &nbsp;<a href="*|ARCHIVE|*" target="_blank">view this in your browser</a> | <a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                            </div>
                          </td>
                        </tr>
                      </table>
                      <!-- // End Module: Transactional Footer \\ -->

                    </td>
                  </tr>
                </table>
                <!-- // End Template Footer \\ -->
              </td>
            </tr>
          </table>
          <br />
        </td>
      </tr>
    </table>
  </center>
</body>

</html>`;
      obj.subject = "Product Buy";
      obj.email = 'javedkhan199501@gmail.com';
      self.send(obj,cb);
  },
  withdrawEthMail: function (req, data, cb) {
      var self = this;
      var obj = {};
    //  console.log("===========================",email);
      console.log('signup:',req);
      console.log("===========================");
      obj.msg = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

  <!-- Facebook sharing information tags -->
  <meta property="og:title" content="*|MC:SUBJECT|*" />

  <title>Congratulations!!! Email</title>
  <style type="text/css">
    /* Client-specific Styles */

    #outlook a {
      padding: 0;
    }

    /* Force Outlook to provide a "view in browser" button. */

    body {
      width: 100% !important;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    /* Force Hotmail to display emails at full width */

    body {
      -webkit-text-size-adjust: none;
    }

    /* Prevent Webkit platforms from changing default text sizes. */

    /* Reset Styles */

    body {
      margin: 0;
      padding: 0;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    table td {
      border-collapse: collapse;
    }

    #backgroundTable {
      height: 100% !important;
      margin: 0;
      padding: 0;
      width: 100% !important;
    }

    body,
    #backgroundTable {
      /*@editable*/
      background-color: #FAFAFA;
    }

    #templateContainer {
      /*@editable*/
      border: 1px solid #DDDDDD;
    }

    h1,
    .h1 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 34px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    h2,
    .h2 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 30px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    h3,
    .h3 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 26px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    h4,
    .h4 {
      /*@editable*/
      color: #202020;
      display: block;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 22px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 10px;
      margin-left: 0;
      /*@editable*/
      text-align: left;
    }

    #templateHeader {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border-bottom: 0;
    }

    .headerContent {
      /*@editable*/
      color: #202020;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 34px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 100%;
      /*@editable*/
      padding: 0;
      /*@editable*/
      text-align: center;
      /*@editable*/
      vertical-align: middle;
    }

    .headerContent a:link,
    .headerContent a:visited,
    /* Yahoo! Mail Override */

    .headerContent a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-weight: normal;
      /*@editable*/
      text-decoration: underline;
    }

    #headerImage {
      height: auto;
      max-width: 600px !important;
    }

    #templateContainer,
    .bodyContent {
      /*@editable*/
      background-color: #FFFFFF;
    }

    .bodyContent div {
      /*@editable*/
      color: #505050;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 14px;
      /*@editable*/
      line-height: 150%;
      /*@editable*/
      text-align: left;
    }

    .bodyContent div a:link,
    .bodyContent div a:visited,
    /* Yahoo! Mail Override */

    .bodyContent div a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-weight: normal;
      /*@editable*/
      text-decoration: underline;
    }

    .templateDataTable {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border: 1px solid #DDDDDD;
    }

    .dataTableHeading {
      /*@editable*/
      background-color: #D8E2EA;
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-family: Helvetica;
      /*@editable*/
      font-size: 14px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 150%;
      /*@editable*/
      text-align: left;
    }

    .dataTableHeading a:link,
    .dataTableHeading a:visited,
    /* Yahoo! Mail Override */

    .dataTableHeading a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #FFFFFF;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      text-decoration: underline;
    }

    .dataTableContent {
      /*@editable*/
      border-top: 1px solid #DDDDDD;
      /*@editable*/
      border-bottom: 0;
      /*@editable*/
      color: #202020;
      /*@editable*/
      font-family: Helvetica;
      /*@editable*/
      font-size: 12px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      line-height: 150%;
      /*@editable*/
      text-align: left;
    }

    .dataTableContent a:link,
    .dataTableContent a:visited,
    /* Yahoo! Mail Override */

    .dataTableContent a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #202020;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      text-decoration: underline;
    }

    .templateButton {
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
      /*@editable*/
      background-color: #336699;
      /*@editable*/
      border: 0;
      border-collapse: separate !important;
      border-radius: 3px;
    }

    .templateButton,
    .templateButton a:link,
    .templateButton a:visited,
    /* Yahoo! Mail Override */

    .templateButton a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #FFFFFF;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 15px;
      /*@editable*/
      font-weight: bold;
      /*@editable*/
      letter-spacing: -.5px;
      /*@editable*/
      line-height: 100%;
      text-align: center;
      text-decoration: none;
    }

    .bodyContent img {
      display: inline;
      height: auto;
    }

    #templateFooter {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border-top: 0;
    }

    .footerContent div {
      /*@editable*/
      color: #707070;
      /*@editable*/
      font-family: Arial;
      /*@editable*/
      font-size: 12px;
      /*@editable*/
      line-height: 125%;
      /*@editable*/
      text-align: center;
    }

    .footerContent div a:link,
    .footerContent div a:visited,
    /* Yahoo! Mail Override */

    .footerContent div a .yshortcuts
    /* Yahoo! Mail Override */

      {
      /*@editable*/
      color: #336699;
      /*@editable*/
      font-weight: normal;
      /*@editable*/
      text-decoration: underline;
    }

    .footerContent img {
      display: inline;
    }

    #utility {
      /*@editable*/
      background-color: #FFFFFF;
      /*@editable*/
      border: 0;
    }

    #utility div {
      /*@editable*/
      text-align: center;
    }

    #monkeyRewards img {
      max-width: 190px;
    }
  </style>
</head>

<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
  <center>
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
      <tr>
        <td align="center" valign="top" style="padding-top:20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
            <tr>
              <td align="center" valign="top">
                <!-- // Begin Template Header \\ -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                  <tr>
                    <td class="headerContent">

                      <!-- // Begin Module: Standard Header Image \\ -->
                      <img src="https://www.kryptual.com/assets/img/kryptual_logo.png" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                      <!-- // End Module: Standard Header Image \\ -->

                    </td>
                  </tr>
                </table>
                <!-- // End Template Header \\ -->
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <!-- // Begin Template Body \\ -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                  <tr>
                    <td valign="top">

                      <!-- // Begin Module: Standard Content \\ -->
                      <table border="0" cellpadding="20" cellspacing="0" width="100%">
                        <tr>
                          <td valign="top" class="bodyContent">
                            <div mc:edit="std_content00">

                              <br><br>
                              <p><strong>Dear  `+ data.firstName +`</strong> <br><br> your transaction have been successful done. <br> This completes your transaction details. Thank you for business!

                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table border="0" cellpadding="20" cellspacing="0" width="92%" align="center">

                              <tr style="background-color:#00b8ff; color:white;font-size: 11px;" align="center">
                                <th>Sr.No.</th>
                                <th>Date</th>
                                <!-- Dummy cell for the row number and row commands -->
                                <th>Ethereum Amount</th>
                                <th>To</th>
                                <th>From</th>
                              </tr>

                              <tr data-iterate="item" style="font-size: 11px;">
                                <td>1</td>
                                <td>`+dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")+`</td>
                                <td>`+req.amount+` ETH</td>
                                <td>`+ req.toAddress +`</td>
                                <td>`+req.fromAddress+`</td>
                              </tr>
                              <tr style="background-color:#00b8ff; color:white ;font-size: 11px;" align="center">
                                <th></th>
                                <th></th>
                                <!-- Dummy cell for the row number and row commands -->
                                <th></th>
                                <th></th>
                                <th>Total=`+req.amount +` ETH only.</th>
                              </tr>
                            </table>

                          </td>
                        </tr>

                        <tr>
                          <td valign="top" class="bodyContent">
                            <div mc:edit="std_content01">
                              <p>KRYPTUAL will issue a this mail based on your payment made by you. <br> We really appreciate your business.</p>
                              <p style="font-size:10px">If this was not you, please reply to this email as soon as possible and let us know that you didn't request it.

                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <tr>
                            <td class="bodyContent" style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                              <br><b>Regards,</b><br>
                              <b>KRYPTUAL </b> Team<br>Thank you<br><br><br>
                            </td>
                          </tr>

                        </tr>
                      </table>
                      <!-- // End Module: Standard Content \\ -->

                    </td>
                  </tr>
                </table>
                <!-- // End Template Body \\ -->
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <!-- // Begin Template Footer \\ -->
                <table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
                  <tr>
                    <td valign="top" class="footerContent">

                      <!-- // Begin Module: Transactional Footer \\ -->
                      <table border="0" cellpadding="10" cellspacing="0" width="100%">
                        <tr>
                          <td valign="top">
                            <div mc:edit="std_footer">
                              <em>Copyright &copy; KRYPTUAL  2018, All rights reserved.</em>
                              <br />
                              <strong>Our mailing address is:</strong>
                              <br /> cntctspprtmarket@gmail.com
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td valign="middle" id="utility">
                            <div mc:edit="std_utility">
                              &nbsp;<a href="*|ARCHIVE|*" target="_blank">view this in your browser</a> | <a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                            </div>
                          </td>
                        </tr>
                      </table>
                      <!-- // End Module: Transactional Footer \\ -->

                    </td>
                  </tr>
                </table>
                <!-- // End Template Footer \\ -->
              </td>
            </tr>
          </table>
          <br />
        </td>
      </tr>
    </table>
  </center>
</body>

</html>`;
      obj.subject = "Kryptual Invoice";
      obj.email = data.email;
      self.send(obj,cb);
  },
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
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

                <!-- Facebook sharing information tags -->
                <meta property="og:title" content="*|MC:SUBJECT|*" />

                <title>Congratulations!!! Email</title>
        		<style type="text/css">
        			/* Client-specific Styles */
        			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */
        			body{width:100% !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
        			body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */

        			/* Reset Styles */
        			body{margin:0; padding:0;}
        			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
        			table td{border-collapse:collapse;}
        			#backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;}

        			/* Template Styles */

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Page
        			* @section background color
        			* @tip Set the background color for your email. You may want to choose one that matches your company's branding.
        			* @theme page
        			*/
        			body, #backgroundTable{
        				/*@editable*/ background-color:#FAFAFA;
        			}

        			/**
        			* @tab Page
        			* @section email border
        			* @tip Set the border for your email.
        			*/
        			#templateContainer{
        				/*@editable*/ border: 1px solid #DDDDDD;
        			}

        			/**
        			* @tab Page
        			* @section heading 1
        			* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
        			* @style heading 1
        			*/
        			h1, .h1{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:34px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Page
        			* @section heading 2
        			* @tip Set the styling for all second-level headings in your emails.
        			* @style heading 2
        			*/
        			h2, .h2{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:30px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Page
        			* @section heading 3
        			* @tip Set the styling for all third-level headings in your emails.
        			* @style heading 3
        			*/
        			h3, .h3{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:26px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Page
        			* @section heading 4
        			* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
        			* @style heading 4
        			*/
        			h4, .h4{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:22px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Header
        			* @section header style
        			* @tip Set the background color and border for your email's header area.
        			* @theme header
        			*/
        			#templateHeader{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border-bottom:0;
        			}

        			/**
        			* @tab Header
        			* @section header text
        			* @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
        			*/
        			.headerContent{
        				/*@editable*/ color:#202020;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:34px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				/*@editable*/ padding:0;
        				/*@editable*/ text-align:center;
        				/*@editable*/ vertical-align:middle;
        			}

        			/**
        			* @tab Header
        			* @section header link
        			* @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
        			*/
        			.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-weight:normal;
        				/*@editable*/ text-decoration:underline;
        			}

        			#headerImage{
        				height:auto;
        				max-width:600px !important;
        			}

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Body
        			* @section body style
        			* @tip Set the background color for your email's body area.
        			*/
        			#templateContainer, .bodyContent{
        				/*@editable*/ background-color:#FFFFFF;
        			}

        			/**
        			* @tab Body
        			* @section body text
        			* @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
        			* @theme main
        			*/
        			.bodyContent div{
        				/*@editable*/ color:#505050;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:14px;
        				/*@editable*/ line-height:150%;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Body
        			* @section body link
        			* @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
        			*/
        			.bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent div a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-weight:normal;
        				/*@editable*/ text-decoration:underline;
        			}

        			/**
        			* @tab Body
        			* @section data table style
        			* @tip Set the background color and border for your email's data table.
        			*/
        			.templateDataTable{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border:1px solid #DDDDDD;
        			}

        			/**
        			* @tab Body
        			* @section data table heading text
        			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
        			*/
        			.dataTableHeading{
        				/*@editable*/ background-color:#D8E2EA;
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-family:Helvetica;
        				/*@editable*/ font-size:14px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:150%;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Body
        			* @section data table heading link
        			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
        			*/
        			.dataTableHeading a:link, .dataTableHeading a:visited, /* Yahoo! Mail Override */ .dataTableHeading a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#FFFFFF;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ text-decoration:underline;
        			}

        			/**
        			* @tab Body
        			* @section data table text
        			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
        			*/
        			.dataTableContent{
        				/*@editable*/ border-top:1px solid #DDDDDD;
        				/*@editable*/ border-bottom:0;
        				/*@editable*/ color:#202020;
        				/*@editable*/ font-family:Helvetica;
        				/*@editable*/ font-size:12px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:150%;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Body
        			* @section data table link
        			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
        			*/
        			.dataTableContent a:link, .dataTableContent a:visited, /* Yahoo! Mail Override */ .dataTableContent a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#202020;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ text-decoration:underline;
        			}

        			/**
        			* @tab Body
        			* @section button style
        			* @tip Set the styling for your email's button. Choose a style that draws attention.
        			*/
        			.templateButton{
        				-moz-border-radius:3px;
        				-webkit-border-radius:3px;
        				/*@editable*/ background-color:#336699;
        				/*@editable*/ border:0;
        				border-collapse:separate !important;
        				border-radius:3px;
        			}

        			/**
        			* @tab Body
        			* @section button style
        			* @tip Set the styling for your email's button. Choose a style that draws attention.
        			*/
        			.templateButton, .templateButton a:link, .templateButton a:visited, /* Yahoo! Mail Override */ .templateButton a .yshortcuts /* Yahoo! Mail Override */{
        				//*@editable*/ color:#FFFFFF;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:15px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ letter-spacing:-.5px;
        				/*@editable*/ line-height:100%;
        				text-align:center;
        				text-decoration:none;
        			}

        			.bodyContent img{
        				display:inline;
        				height:auto;
        			}

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Footer
        			* @section footer style
        			* @tip Set the background color and top border for your email's footer area.
        			* @theme footer
        			*/
        			#templateFooter{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border-top:0;
        			}

        			/**
        			* @tab Footer
        			* @section footer text
        			* @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
        			* @theme footer
        			*/
        			.footerContent div{
        				/*@editable*/ color:#707070;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:12px;
        				/*@editable*/ line-height:125%;
        				/*@editable*/ text-align:center;
        			}

        			/**
        			* @tab Footer
        			* @section footer link
        			* @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
        			*/
        			.footerContent div a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-weight:normal;
        				/*@editable*/ text-decoration:underline;
        			}

        			.footerContent img{
        				display:inline;
        			}

        			/**
        			* @tab Footer
        			* @section utility bar style
        			* @tip Set the background color and border for your email's footer utility bar.
        			* @theme footer
        			*/
        			#utility{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border:0;
        			}

        			/**
        			* @tab Footer
        			* @section utility bar style
        			* @tip Set the background color and border for your email's footer utility bar.
        			*/
        			#utility div{
        				/*@editable*/ text-align:center;
        			}

        			#monkeyRewards img{
        				max-width:190px;
        			}
        		</style>
        	</head>
            <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
            	<center>
                	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
                    	<tr>
                        	<td align="center" valign="top" style="padding-top:20px;">
                            	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
                                	<tr>
                                    	<td align="center" valign="top">
                                            <!-- // Begin Template Header \\ -->
                                        	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                                                <tr>
                                                    <td class="headerContent">

                                                    	<!-- // Begin Module: Standard Header Image \\ -->
                                                    	<img src="https://www.kryptual.com/assets/img/kryptual_logo.png" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                                                    	<!-- // End Module: Standard Header Image \\ -->

                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // End Template Header \\ -->
                                        </td>
                                    </tr>
                                	<tr>
                                    	<td align="center" valign="top">
                                            <!-- // Begin Template Body \\ -->
                                        	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                                            	<tr>
                                                    <td valign="top">

                                                        <!-- // Begin Module: Standard Content \\ -->
                                                        <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td valign="top" class="bodyContent">
                                                                    <div mc:edit="std_content00">

                                                                       <br><br> <p><strong>Dear  `+ req.firstName +`</strong> <br><br>
                                                                      To start rocking the cryptocurrency world, click the link below.
        															Please click on the following link, or paste into your browser to complete the verification process :
        																</p>
                                                                     </div>
        														</td>
                                                            </tr>
                                                            <tr>
                                                            <td align="center" valign="top" style="padding-top:0;">
                                                                	<table border="0" cellpadding="15" cellspacing="0" class="templateButton">
                                                                    	<tr>
                                                                        	<td valign="middle" class="templateButtonContent">
                                                                            	<div mc:edit="std_content02">
                                                                                	<a href ="`+CONST.hostingServer.serverName+verifyurl+`" target="_blank" > `+ CONST.hostingServer.serverName +`verifyurl </a>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td valign="top" class="bodyContent">
                                                                    <div mc:edit="std_content01">

                                                                       If you did not request this, please ignore..<br>
        																If you have any questions regarding <strong>KRYPTUAL</strong>  please read our FAQ or use our support form KRYPTUAL email address). Our support staff will be more than happy to assist you.<br>
        																drop us an email at support@kryptual.com.<br>

                                                                       </p>
                                                                    </div>
        														</td>
                                                            </tr>
                                                            <tr>
                                                            <tr>
        								                     <td class="bodyContent" style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
        								                     <br><b>Regards,</b><br>
        								                      <b>KRYPTUAL </b> Team<br>Thank you<br><br><br>
        								                     </td>
        								                   </tr>

                                                            </tr>
                                                        </table>
                                                        <!-- // End Module: Standard Content \\ -->

                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // End Template Body \\ -->
                                        </td>
                                    </tr>
                                	<tr>
                                    	<td align="center" valign="top">
                                            <!-- // Begin Template Footer \\ -->
                                        	<table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
                                            	<tr>
                                                	<td valign="top" class="footerContent">

                                                        <!-- // Begin Module: Transactional Footer \\ -->
                                                       <table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
                                            	<tr>
                                                	<td valign="top" class="footerContent">

                                                        <!-- // Begin Module: Transactional Footer \\ -->
                                                        <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td valign="top">
                                                                    <div mc:edit="std_footer">
        																<em>Copyright &copy; KRYPTUAL  2018, All rights reserved.</em>
        																<br />
        																<strong>Our mailing address is:</strong>
        																<br />
        																support@kryptual.com
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td valign="middle" id="utility">
                                                                    <div mc:edit="std_utility">
                                                                        &nbsp;<a href="*|ARCHIVE|*" target="_blank">view this in your browser</a> | <a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <!-- // End Module: Transactional Footer \\ -->

                                                    </td>
                                                </tr>
                                            </table>
                                                        <!-- // End Module: Transactional Footer \\ -->

                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // End Template Footer \\ -->
                                        </td>
                                    </tr>
                                </table>
                                <br />
                            </td>
                        </tr>
                    </table>
                </center>
            </body>
        </html>`;
        obj.subject = "KRYPTUAL Registration";
        obj.email = req.email;
        self.send(obj,cb);
    },
    //THAT IS USE FOR forgot Password
    resetPwdMail: function (req, token, cb) {
        var self = this;
        var obj = {};
        console.log("===========================");
        console.log('signup:',req);
        console.log("===========================");
        obj.msg = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

                <!-- Facebook sharing information tags -->
                <meta property="og:title" content="*|MC:SUBJECT|*" />

                <title>Congratulations!!! Email</title>
        		<style type="text/css">
        			/* Client-specific Styles */
        			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */
        			body{width:100% !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
        			body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */

        			/* Reset Styles */
        			body{margin:0; padding:0;}
        			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
        			table td{border-collapse:collapse;}
        			#backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;}

        			/* Template Styles */

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Page
        			* @section background color
        			* @tip Set the background color for your email. You may want to choose one that matches your company's branding.
        			* @theme page
        			*/
        			body, #backgroundTable{
        				/*@editable*/ background-color:#FAFAFA;
        			}

        			/**
        			* @tab Page
        			* @section email border
        			* @tip Set the border for your email.
        			*/
        			#templateContainer{
        				/*@editable*/ border: 1px solid #DDDDDD;
        			}

        			/**
        			* @tab Page
        			* @section heading 1
        			* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
        			* @style heading 1
        			*/
        			h1, .h1{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:34px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Page
        			* @section heading 2
        			* @tip Set the styling for all second-level headings in your emails.
        			* @style heading 2
        			*/
        			h2, .h2{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:30px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Page
        			* @section heading 3
        			* @tip Set the styling for all third-level headings in your emails.
        			* @style heading 3
        			*/
        			h3, .h3{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:26px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Page
        			* @section heading 4
        			* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
        			* @style heading 4
        			*/
        			h4, .h4{
        				/*@editable*/ color:#202020;
        				display:block;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:22px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				margin-top:0;
        				margin-right:0;
        				margin-bottom:10px;
        				margin-left:0;
        				/*@editable*/ text-align:left;
        			}

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Header
        			* @section header style
        			* @tip Set the background color and border for your email's header area.
        			* @theme header
        			*/
        			#templateHeader{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border-bottom:0;
        			}

        			/**
        			* @tab Header
        			* @section header text
        			* @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
        			*/
        			.headerContent{
        				/*@editable*/ color:#202020;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:34px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:100%;
        				/*@editable*/ padding:0;
        				/*@editable*/ text-align:center;
        				/*@editable*/ vertical-align:middle;
        			}

        			/**
        			* @tab Header
        			* @section header link
        			* @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
        			*/
        			.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-weight:normal;
        				/*@editable*/ text-decoration:underline;
        			}

        			#headerImage{
        				height:auto;
        				max-width:600px !important;
        			}

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Body
        			* @section body style
        			* @tip Set the background color for your email's body area.
        			*/
        			#templateContainer, .bodyContent{
        				/*@editable*/ background-color:#FFFFFF;
        			}

        			/**
        			* @tab Body
        			* @section body text
        			* @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
        			* @theme main
        			*/
        			.bodyContent div{
        				/*@editable*/ color:#505050;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:14px;
        				/*@editable*/ line-height:150%;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Body
        			* @section body link
        			* @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
        			*/
        			.bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent div a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-weight:normal;
        				/*@editable*/ text-decoration:underline;
        			}

        			/**
        			* @tab Body
        			* @section data table style
        			* @tip Set the background color and border for your email's data table.
        			*/
        			.templateDataTable{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border:1px solid #DDDDDD;
        			}

        			/**
        			* @tab Body
        			* @section data table heading text
        			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
        			*/
        			.dataTableHeading{
        				/*@editable*/ background-color:#D8E2EA;
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-family:Helvetica;
        				/*@editable*/ font-size:14px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:150%;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Body
        			* @section data table heading link
        			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
        			*/
        			.dataTableHeading a:link, .dataTableHeading a:visited, /* Yahoo! Mail Override */ .dataTableHeading a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#FFFFFF;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ text-decoration:underline;
        			}

        			/**
        			* @tab Body
        			* @section data table text
        			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
        			*/
        			.dataTableContent{
        				/*@editable*/ border-top:1px solid #DDDDDD;
        				/*@editable*/ border-bottom:0;
        				/*@editable*/ color:#202020;
        				/*@editable*/ font-family:Helvetica;
        				/*@editable*/ font-size:12px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ line-height:150%;
        				/*@editable*/ text-align:left;
        			}

        			/**
        			* @tab Body
        			* @section data table link
        			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
        			*/
        			.dataTableContent a:link, .dataTableContent a:visited, /* Yahoo! Mail Override */ .dataTableContent a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#202020;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ text-decoration:underline;
        			}

        			/**
        			* @tab Body
        			* @section button style
        			* @tip Set the styling for your email's button. Choose a style that draws attention.
        			*/
        			.templateButton{
        				-moz-border-radius:3px;
        				-webkit-border-radius:3px;
        				/*@editable*/ background-color:#336699;
        				/*@editable*/ border:0;
        				border-collapse:separate !important;
        				border-radius:3px;
        			}

        			/**
        			* @tab Body
        			* @section button style
        			* @tip Set the styling for your email's button. Choose a style that draws attention.
        			*/
        			.templateButton, .templateButton a:link, .templateButton a:visited, /* Yahoo! Mail Override */ .templateButton a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#FFFFFF;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:15px;
        				/*@editable*/ font-weight:bold;
        				/*@editable*/ letter-spacing:-.5px;
        				/*@editable*/ line-height:100%;
        				text-align:center;
        				text-decoration:none;
        			}

        			.bodyContent img{
        				display:inline;
        				height:auto;
        			}

        			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */

        			/**
        			* @tab Footer
        			* @section footer style
        			* @tip Set the background color and top border for your email's footer area.
        			* @theme footer
        			*/
        			#templateFooter{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border-top:0;
        			}

        			/**
        			* @tab Footer
        			* @section footer text
        			* @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
        			* @theme footer
        			*/
        			.footerContent div{
        				/*@editable*/ color:#707070;
        				/*@editable*/ font-family:Arial;
        				/*@editable*/ font-size:12px;
        				/*@editable*/ line-height:125%;
        				/*@editable*/ text-align:center;
        			}

        			/**
        			* @tab Footer
        			* @section footer link
        			* @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
        			*/
        			.footerContent div a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /* Yahoo! Mail Override */{
        				/*@editable*/ color:#336699;
        				/*@editable*/ font-weight:normal;
        				/*@editable*/ text-decoration:underline;
        			}

        			.footerContent img{
        				display:inline;
        			}

        			/**
        			* @tab Footer
        			* @section utility bar style
        			* @tip Set the background color and border for your email's footer utility bar.
        			* @theme footer
        			*/
        			#utility{
        				/*@editable*/ background-color:#FFFFFF;
        				/*@editable*/ border:0;
        			}

        			/**
        			* @tab Footer
        			* @section utility bar style
        			* @tip Set the background color and border for your email's footer utility bar.
        			*/
        			#utility div{
        				/*@editable*/ text-align:center;
        			}

        			#monkeyRewards img{
        				max-width:190px;
        			}
        		</style>
        	</head>
            <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
            	<center>
                	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
                    	<tr>
                        	<td align="center" valign="top" style="padding-top:20px;">
                            	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
                                	<tr>
                                    	<td align="center" valign="top">
                                            <!-- // Begin Template Header \\ -->
                                        	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                                                <tr>
                                                    <td class="headerContent">

                                                    	<!-- // Begin Module: Standard Header Image \\ -->
                                                    	<img src="https://www.kryptual.com/assets/img/kryptual_logo.png" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                                                    	<!-- // End Module: Standard Header Image \\ -->

                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // End Template Header \\ -->
                                        </td>
                                    </tr>
                                	<tr>
                                    	<td align="center" valign="top">
                                            <!-- // Begin Template Body \\ -->
                                        	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                                            	<tr>
                                                    <td valign="top">

                                                        <!-- // Begin Module: Standard Content \\ -->
                                                        <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td valign="top" class="bodyContent">
                                                                    <div mc:edit="std_content00">

                                                                       <br><br> <p><strong>Dear  `+ req.firstName +`</strong> <br><br>
                                                                      You or someone pretending to be you recently requested a password reset in KRYPTUAL If this was you, please click on this link to reset your password:
        																</p>
                                                                           <a href=`+ CONST.hostingServer.basePath+'en/#/updatePassword/' + token + '>' + CONST.hostingServer.serverName+`'reset-password/'` + token + `'</a><br><br>
                                                                     </div>
        														</td>
                                                            </tr>
                                                            <tr>
                                                            <td align="center" valign="top" style="padding-top:0;">
                                                                	<table border="0" cellpadding="15" cellspacing="0" class="templateButton">
                                                                    	<tr>
                                                                        	<td valign="middle" class="templateButtonContent">
                                                                            	<div mc:edit="std_content02">
                                                                                	<a target="_blank">your account : ` + req.email + `</a>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td valign="top" class="bodyContent">
                                                                    <div mc:edit="std_content01">
                                                                       <p><strong>Please Note : </strong><br>
                                                                       1. Do not share your credentials or otp with anyone on email.<br>
        																2. kryptual website and team never asks you for your credentials or otp.<br>
        																3. Always create a strong password and keep different passwords for different websites.<br>
        																If you have any questions regarding <strong>KRYPTUAL</strong>  please read our FAQ or use our support form KRYPTUAL email address). Our support staff will be more than happy to assist you.<br>
        																drop us an email at support@kryptual.com.<br>

                                                                       </p>
                                                                    </div>
        														</td>
                                                            </tr>
                                                            <tr>
                                                            <tr>
        								                     <td class="bodyContent" style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
        								                     <br><b>Regards,</b><br>
        								                      <b>KRYPTUAL </b> Team<br>Thank you<br><br><br>
        								                     </td>
        								                   </tr>

                                                            </tr>
                                                        </table>
                                                        <!-- // End Module: Standard Content \\ -->

                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // End Template Body \\ -->
                                        </td>
                                    </tr>
                                	<tr>
                                    	<td align="center" valign="top">
                                            <!-- // Begin Template Footer \\ -->
                                        	<table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
                                            	<tr>
                                                	<td valign="top" class="footerContent">

                                                        <!-- // Begin Module: Transactional Footer \\ -->
                                                       <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td valign="top">
                                                                    <div mc:edit="std_footer">
        																<em>Copyright &copy; KRYPTUAL  2018, All rights reserved.</em>
        																<br />
        																<strong>Our mailing address is:</strong>
        																<br />
        																support@kryptual.com
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td valign="middle" id="utility">
                                                                    <div mc:edit="std_utility">
                                                                        &nbsp;<a href="*|ARCHIVE|*" target="_blank">view this in your browser</a> | <a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <!-- // End Module: Transactional Footer \\ -->

                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // End Template Footer \\ -->
                                        </td>
                                    </tr>
                                </table>
                                <br />
                            </td>
                        </tr>
                    </table>
                </center>
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

                 <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#F2F2F2;">
                   <tr>
                     <td style="text-align: center;">
                       <a href="#"><img class="w320" width="311" height="83" src="#" alt="company logo" ></a>
                     </td>
                   </tr>
                   <tr>
                     <td style="background-color:#18d26e;">

                       <table cellspacing="0" cellpadding="0" width="100%">
                         <tr>
                           <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                           <div class="mobile-br">&nbsp;</div>
                             WECOME TO KRYPTUAL
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
                         <br>You or someone pretending to be you recently requested a password reset in KRYPTUAL
                 If this was you, please click on this link to reset your password:  <p style="font-size:17px; text-align:center;"> your account : ` + req.email + `<br> </p>
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

                         </td>
                       </tr>
                     </table>
                     <table cellspacing="0" cellpadding="0" width="100%">
                       <tr>
                         <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                         <br>
                           If you have any questions regarding <b>KRYPTUAL </b>please read our FAQ or use our support form KRYPTUAL email address). Our support staff will be more than happy to assist you.<br>
                            drop us an email at cntctspprtmarket@gmail.com.<br>
                         </td>
                       </tr>
                     </table>
                      <table cellspacing="0" cellpadding="0" width="100%">
                           <tr>
                             <td style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
                             <br><b>Regards,</b><br>
                              <b>KRYPTUAL </b> team<br>Thank you<br><br><br>
                             </td>
                           </tr>
                         </table>
                         <table cellspacing="0" cellpadding="0" bgcolor="#e91e63"  class="force-full-width">

                           <tr>
                             <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;"><br>
                               © 2018 All Rights Reserved <b>KRYPTUAL</b>
                           </tr>
                           <tr>
                             <td style="color:#000; font-size: 14px; text-align:center;">
                               <a href="#" style="color:#000;">View in browser</a> | <a href="#" style="color:#000;">Contact</a> | <a href="#" style="color:#000;">Unsubscribe</a>
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
      <html>
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

              <!-- Facebook sharing information tags -->
              <meta property="og:title" content="*|MC:SUBJECT|*" />

              <title>Congratulations!!! Email</title>
      		<style type="text/css">
      			/* Client-specific Styles */
      			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */
      			body{width:100% !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
      			body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */

      			/* Reset Styles */
      			body{margin:0; padding:0;}
      			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
      			table td{border-collapse:collapse;}
      			#backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;}

      			/* Template Styles */

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Page
      			* @section background color
      			* @tip Set the background color for your email. You may want to choose one that matches your company's branding.
      			* @theme page
      			*/
      			body, #backgroundTable{
      				/*@editable*/ background-color:#FAFAFA;
      			}

      			/**
      			* @tab Page
      			* @section email border
      			* @tip Set the border for your email.
      			*/
      			#templateContainer{
      				/*@editable*/ border: 1px solid #DDDDDD;
      			}

      			/**
      			* @tab Page
      			* @section heading 1
      			* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
      			* @style heading 1
      			*/
      			h1, .h1{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:34px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Page
      			* @section heading 2
      			* @tip Set the styling for all second-level headings in your emails.
      			* @style heading 2
      			*/
      			h2, .h2{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:30px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Page
      			* @section heading 3
      			* @tip Set the styling for all third-level headings in your emails.
      			* @style heading 3
      			*/
      			h3, .h3{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:26px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Page
      			* @section heading 4
      			* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
      			* @style heading 4
      			*/
      			h4, .h4{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:22px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Header
      			* @section header style
      			* @tip Set the background color and border for your email's header area.
      			* @theme header
      			*/
      			#templateHeader{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border-bottom:0;
      			}

      			/**
      			* @tab Header
      			* @section header text
      			* @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
      			*/
      			.headerContent{
      				/*@editable*/ color:#202020;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:34px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				/*@editable*/ padding:0;
      				/*@editable*/ text-align:center;
      				/*@editable*/ vertical-align:middle;
      			}

      			/**
      			* @tab Header
      			* @section header link
      			* @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
      			*/
      			.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-weight:normal;
      				/*@editable*/ text-decoration:underline;
      			}

      			#headerImage{
      				height:auto;
      				max-width:600px !important;
      			}

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Body
      			* @section body style
      			* @tip Set the background color for your email's body area.
      			*/
      			#templateContainer, .bodyContent{
      				/*@editable*/ background-color:#FFFFFF;
      			}

      			/**
      			* @tab Body
      			* @section body text
      			* @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
      			* @theme main
      			*/
      			.bodyContent div{
      				/*@editable*/ color:#505050;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:14px;
      				/*@editable*/ line-height:150%;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Body
      			* @section body link
      			* @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
      			*/
      			.bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent div a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-weight:normal;
      				/*@editable*/ text-decoration:underline;
      			}

      			/**
      			* @tab Body
      			* @section data table style
      			* @tip Set the background color and border for your email's data table.
      			*/
      			.templateDataTable{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border:1px solid #DDDDDD;
      			}

      			/**
      			* @tab Body
      			* @section data table heading text
      			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
      			*/
      			.dataTableHeading{
      				/*@editable*/ background-color:#D8E2EA;
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-family:Helvetica;
      				/*@editable*/ font-size:14px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:150%;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Body
      			* @section data table heading link
      			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
      			*/
      			.dataTableHeading a:link, .dataTableHeading a:visited, /* Yahoo! Mail Override */ .dataTableHeading a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#FFFFFF;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ text-decoration:underline;
      			}

      			/**
      			* @tab Body
      			* @section data table text
      			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
      			*/
      			.dataTableContent{
      				/*@editable*/ border-top:1px solid #DDDDDD;
      				/*@editable*/ border-bottom:0;
      				/*@editable*/ color:#202020;
      				/*@editable*/ font-family:Helvetica;
      				/*@editable*/ font-size:12px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:150%;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Body
      			* @section data table link
      			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
      			*/
      			.dataTableContent a:link, .dataTableContent a:visited, /* Yahoo! Mail Override */ .dataTableContent a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#202020;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ text-decoration:underline;
      			}

      			/**
      			* @tab Body
      			* @section button style
      			* @tip Set the styling for your email's button. Choose a style that draws attention.
      			*/
      			.templateButton{
      				-moz-border-radius:3px;
      				-webkit-border-radius:3px;
      				/*@editable*/ background-color:#336699;
      				/*@editable*/ border:0;
      				border-collapse:separate !important;
      				border-radius:3px;
      			}

      			/**
      			* @tab Body
      			* @section button style
      			* @tip Set the styling for your email's button. Choose a style that draws attention.
      			*/
      			.templateButton, .templateButton a:link, .templateButton a:visited, /* Yahoo! Mail Override */ .templateButton a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#FFFFFF;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:15px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ letter-spacing:-.5px;
      				/*@editable*/ line-height:100%;
      				text-align:center;
      				text-decoration:none;
      			}

      			.bodyContent img{
      				display:inline;
      				height:auto;
      			}

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Footer
      			* @section footer style
      			* @tip Set the background color and top border for your email's footer area.
      			* @theme footer
      			*/
      			#templateFooter{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border-top:0;
      			}

      			/**
      			* @tab Footer
      			* @section footer text
      			* @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
      			* @theme footer
      			*/
      			.footerContent div{
      				/*@editable*/ color:#707070;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:12px;
      				/*@editable*/ line-height:125%;
      				/*@editable*/ text-align:center;
      			}

      			/**
      			* @tab Footer
      			* @section footer link
      			* @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
      			*/
      			.footerContent div a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-weight:normal;
      				/*@editable*/ text-decoration:underline;
      			}

      			.footerContent img{
      				display:inline;
      			}

      			/**
      			* @tab Footer
      			* @section utility bar style
      			* @tip Set the background color and border for your email's footer utility bar.
      			* @theme footer
      			*/
      			#utility{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border:0;
      			}

      			/**
      			* @tab Footer
      			* @section utility bar style
      			* @tip Set the background color and border for your email's footer utility bar.
      			*/
      			#utility div{
      				/*@editable*/ text-align:center;
      			}

      			#monkeyRewards img{
      				max-width:190px;
      			}
      		</style>
      	</head>
          <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
          	<center>
              	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
                  	<tr>
                      	<td align="center" valign="top" style="padding-top:20px;">
                          	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
                              	<tr>
                                  	<td align="center" valign="top">
                                          <!-- // Begin Template Header \\ -->
                                      	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                                              <tr>
                                                  <td class="headerContent">

                                                  	<!-- // Begin Module: Standard Header Image \\ -->
                                                  	<img src="https://www.kryptual.com/assets/img/kryptual_logo.png" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                                                  	<!-- // End Module: Standard Header Image \\ -->

                                                  </td>
                                              </tr>
                                          </table>
                                          <!-- // End Template Header \\ -->
                                      </td>
                                  </tr>
                              	<tr>
                                  	<td align="center" valign="top">
                                          <!-- // Begin Template Body \\ -->
                                      	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                                          	<tr>
                                                  <td valign="top">

                                                      <!-- // Begin Module: Standard Content \\ -->
                                                      <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                          <tr>
                                                              <td valign="top" class="bodyContent">
                                                                  <div mc:edit="std_content00">

                                                                     <br><br> <p><strong>Dear  `+ req.name +`</strong> <br><br>
                                                                     Thank you for contact at Kryptual! You can store your cyrpto currency safe and secure.Feel free to invite your friends and family members to Kryptual community.</p>

                                                                     <p>Your Query has been send succssfully to the Kryptual Team .You've successfully gone through the process of contact at Kryptual. We will get back to you with in 2 to 3 days.</p>
                                                                  </div>
      														</td>
                                                          </tr>
                                                          <tr>
      								                     <td class="bodyContent" style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
      								                     <br><b>Regards,</b><br>
      								                      <b>KRYPTUAL </b> Team<br>Thank you<br><br><br>
      								                     </td>
      								                   </tr>

                                                      </table>

                                                      <!-- // End Module: Standard Content \\ -->

                                                  </td>
                                              </tr>
                                          </table>
                                          <!-- // End Template Body \\ -->
                                      </td>
                                  </tr>
                              	<tr>
                                  	<td align="center" valign="top">
                                          <!-- // Begin Template Footer \\ -->
                                      	<table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
                                          	<tr>
                                              	<td valign="top" class="footerContent">

                                                      <!-- // Begin Module: Transactional Footer \\ -->
                                                      <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                                          <tr>
                                                              <td valign="top">
                                                                  <div mc:edit="std_footer">
      																<em>Copyright &copy; KRYPTUAL  2018, All rights reserved.</em>
      																<br />
      																<strong>Our mailing address is:</strong>
      																<br />
      																support@kryptual.com
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td valign="middle" id="utility">
                                                                  <div mc:edit="std_utility">
                                                                      &nbsp;<a href="*|ARCHIVE|*" target="_blank">view this in your browser</a> | <a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <!-- // End Module: Transactional Footer \\ -->

                                                  </td>
                                              </tr>
                                          </table>
                                          <!-- // End Template Footer \\ -->
                                      </td>
                                  </tr>
                              </table>
                              <br />
                          </td>
                      </tr>
                  </table>
              </center>
          </body>
      </html>`;
      obj.subject = "Contact  With  Us ";
      // obj.email = req.email;
      obj.email = Constant.gmailSMTPCredentials.username;
      self.send(obj,cb);
  },
    SubscribeWithUs : function (req, cb) {
      var self = this;
      var obj = {};
      console.log("===========================");
      console.log('signup:',req);
      console.log("===========================");
      obj.msg   = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html>
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

              <!-- Facebook sharing information tags -->
              <meta property="og:title" content="*|MC:SUBJECT|*" />

              <title>Congratulations!!! Email</title>
      		<style type="text/css">
      			/* Client-specific Styles */
      			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */
      			body{width:100% !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
      			body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */

      			/* Reset Styles */
      			body{margin:0; padding:0;}
      			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
      			table td{border-collapse:collapse;}
      			#backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;}

      			/* Template Styles */

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Page
      			* @section background color
      			* @tip Set the background color for your email. You may want to choose one that matches your company's branding.
      			* @theme page
      			*/
      			body, #backgroundTable{
      				/*@editable*/ background-color:#FAFAFA;
      			}

      			/**
      			* @tab Page
      			* @section email border
      			* @tip Set the border for your email.
      			*/
      			#templateContainer{
      				/*@editable*/ border: 1px solid #DDDDDD;
      			}

      			/**
      			* @tab Page
      			* @section heading 1
      			* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
      			* @style heading 1
      			*/
      			h1, .h1{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:34px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Page
      			* @section heading 2
      			* @tip Set the styling for all second-level headings in your emails.
      			* @style heading 2
      			*/
      			h2, .h2{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:30px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Page
      			* @section heading 3
      			* @tip Set the styling for all third-level headings in your emails.
      			* @style heading 3
      			*/
      			h3, .h3{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:26px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Page
      			* @section heading 4
      			* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
      			* @style heading 4
      			*/
      			h4, .h4{
      				/*@editable*/ color:#202020;
      				display:block;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:22px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				margin-top:0;
      				margin-right:0;
      				margin-bottom:10px;
      				margin-left:0;
      				/*@editable*/ text-align:left;
      			}

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Header
      			* @section header style
      			* @tip Set the background color and border for your email's header area.
      			* @theme header
      			*/
      			#templateHeader{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border-bottom:0;
      			}

      			/**
      			* @tab Header
      			* @section header text
      			* @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
      			*/
      			.headerContent{
      				/*@editable*/ color:#202020;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:34px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:100%;
      				/*@editable*/ padding:0;
      				/*@editable*/ text-align:center;
      				/*@editable*/ vertical-align:middle;
      			}

      			/**
      			* @tab Header
      			* @section header link
      			* @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
      			*/
      			.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-weight:normal;
      				/*@editable*/ text-decoration:underline;
      			}

      			#headerImage{
      				height:auto;
      				max-width:600px !important;
      			}

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Body
      			* @section body style
      			* @tip Set the background color for your email's body area.
      			*/
      			#templateContainer, .bodyContent{
      				/*@editable*/ background-color:#FFFFFF;
      			}

      			/**
      			* @tab Body
      			* @section body text
      			* @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
      			* @theme main
      			*/
      			.bodyContent div{
      				/*@editable*/ color:#505050;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:14px;
      				/*@editable*/ line-height:150%;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Body
      			* @section body link
      			* @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
      			*/
      			.bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent div a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-weight:normal;
      				/*@editable*/ text-decoration:underline;
      			}

      			/**
      			* @tab Body
      			* @section data table style
      			* @tip Set the background color and border for your email's data table.
      			*/
      			.templateDataTable{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border:1px solid #DDDDDD;
      			}

      			/**
      			* @tab Body
      			* @section data table heading text
      			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
      			*/
      			.dataTableHeading{
      				/*@editable*/ background-color:#D8E2EA;
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-family:Helvetica;
      				/*@editable*/ font-size:14px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:150%;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Body
      			* @section data table heading link
      			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
      			*/
      			.dataTableHeading a:link, .dataTableHeading a:visited, /* Yahoo! Mail Override */ .dataTableHeading a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#FFFFFF;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ text-decoration:underline;
      			}

      			/**
      			* @tab Body
      			* @section data table text
      			* @tip Set the styling for your email's data table text. Choose a size and color that is easy to read.
      			*/
      			.dataTableContent{
      				/*@editable*/ border-top:1px solid #DDDDDD;
      				/*@editable*/ border-bottom:0;
      				/*@editable*/ color:#202020;
      				/*@editable*/ font-family:Helvetica;
      				/*@editable*/ font-size:12px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ line-height:150%;
      				/*@editable*/ text-align:left;
      			}

      			/**
      			* @tab Body
      			* @section data table link
      			* @tip Set the styling for your email's data table links. Choose a color that helps them stand out from your text.
      			*/
      			.dataTableContent a:link, .dataTableContent a:visited, /* Yahoo! Mail Override */ .dataTableContent a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#202020;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ text-decoration:underline;
      			}

      			/**
      			* @tab Body
      			* @section button style
      			* @tip Set the styling for your email's button. Choose a style that draws attention.
      			*/
      			.templateButton{
      				-moz-border-radius:3px;
      				-webkit-border-radius:3px;
      				/*@editable*/ background-color:#336699;
      				/*@editable*/ border:0;
      				border-collapse:separate !important;
      				border-radius:3px;
      			}

      			/**
      			* @tab Body
      			* @section button style
      			* @tip Set the styling for your email's button. Choose a style that draws attention.
      			*/
      			.templateButton, .templateButton a:link, .templateButton a:visited, /* Yahoo! Mail Override */ .templateButton a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#FFFFFF;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:15px;
      				/*@editable*/ font-weight:bold;
      				/*@editable*/ letter-spacing:-.5px;
      				/*@editable*/ line-height:100%;
      				text-align:center;
      				text-decoration:none;
      			}

      			.bodyContent img{
      				display:inline;
      				height:auto;
      			}

      			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */

      			/**
      			* @tab Footer
      			* @section footer style
      			* @tip Set the background color and top border for your email's footer area.
      			* @theme footer
      			*/
      			#templateFooter{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border-top:0;
      			}

      			/**
      			* @tab Footer
      			* @section footer text
      			* @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
      			* @theme footer
      			*/
      			.footerContent div{
      				/*@editable*/ color:#707070;
      				/*@editable*/ font-family:Arial;
      				/*@editable*/ font-size:12px;
      				/*@editable*/ line-height:125%;
      				/*@editable*/ text-align:center;
      			}

      			/**
      			* @tab Footer
      			* @section footer link
      			* @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
      			*/
      			.footerContent div a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /* Yahoo! Mail Override */{
      				/*@editable*/ color:#336699;
      				/*@editable*/ font-weight:normal;
      				/*@editable*/ text-decoration:underline;
      			}

      			.footerContent img{
      				display:inline;
      			}

      			/**
      			* @tab Footer
      			* @section utility bar style
      			* @tip Set the background color and border for your email's footer utility bar.
      			* @theme footer
      			*/
      			#utility{
      				/*@editable*/ background-color:#FFFFFF;
      				/*@editable*/ border:0;
      			}

      			/**
      			* @tab Footer
      			* @section utility bar style
      			* @tip Set the background color and border for your email's footer utility bar.
      			*/
      			#utility div{
      				/*@editable*/ text-align:center;
      			}

      			#monkeyRewards img{
      				max-width:190px;
      			}
      		</style>
      	</head>
          <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
          	<center>
              	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
                  	<tr>
                      	<td align="center" valign="top" style="padding-top:20px;">
                          	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
                              	<tr>
                                  	<td align="center" valign="top">
                                          <!-- // Begin Template Header \\ -->
                                      	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                                              <tr>
                                                  <td class="headerContent">

                                                  	<!-- // Begin Module: Standard Header Image \\ -->
                                                  	<img src="https://www.kryptual.com/assets/img/kryptual_logo.png" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                                                  	<!-- // End Module: Standard Header Image \\ -->

                                                  </td>
                                              </tr>
                                          </table>
                                          <!-- // End Template Header \\ -->
                                      </td>
                                  </tr>
                              	<tr>
                                  	<td align="center" valign="top">
                                          <!-- // Begin Template Body \\ -->
                                      	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                                          	<tr>
                                                  <td valign="top">

                                                      <!-- // Begin Module: Standard Content \\ -->
                                                      <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                          <tr>
                                                              <td valign="top" class="bodyContent">
                                                                  <div mc:edit="std_content00">

                                                                     <br><br> <p><strong>Dear  `+ req.email +`</strong> <br><br>
                                                                    Thank you for subscribe at Kryptual! We keep our ICO list up to date and providing quality information about Pre ICOs, Active ICOs, Upcoming ICOs, Ended ICOs.</p>

                                                                     <p>You've successfully gone through the process of subscribe at Kryptual.
      																You'll now get an email each time we Launch ICO. </p>
      																<p>If you have any questions regarding .Kryptual. please read our FAQ or use our support form Kryptual email address). Our support staff will be more than happy to assist you.</p>
                                                                  </div>
      														</td>
                                                          </tr>
                                                          <tr>
      								                     <td class="bodyContent" style="text-align:left; font-size:13px;" class="mobile-center body-padding w320">
      								                     <br><b>Regards,</b><br>
      								                      <b>KRYPTUAL </b> Team<br>Thank you<br><br><br>
      								                     </td>
      								                   </tr>

                                                      </table>

                                                      <!-- // End Module: Standard Content \\ -->

                                                  </td>
                                              </tr>
                                          </table>
                                          <!-- // End Template Body \\ -->
                                      </td>
                                  </tr>
                              	<tr>
                                  	<td align="center" valign="top">
                                          <!-- // Begin Template Footer \\ -->
                                      	<table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
                                          	<tr>
                                              	<td valign="top" class="footerContent">

                                                      <!-- // Begin Module: Transactional Footer \\ -->
                                                      <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                                          <tr>
                                                              <td valign="top">
                                                                  <div mc:edit="std_footer">
      																<em>Copyright &copy; KRYPTUAL  2018, All rights reserved.</em>
      																<br />
      																<strong>Our mailing address is:</strong>
      																<br />
      																support@kryptual.com
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td valign="middle" id="utility">
                                                                  <div mc:edit="std_utility">
                                                                      &nbsp;<a href="*|ARCHIVE|*" target="_blank">view this in your browser</a> | <a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <!-- // End Module: Transactional Footer \\ -->

                                                  </td>
                                              </tr>
                                          </table>
                                          <!-- // End Template Footer \\ -->
                                      </td>
                                  </tr>
                              </table>
                              <br />
                          </td>
                      </tr>
                  </table>
              </center>
          </body>
      </html>`;
      obj.subject = "Subscribe  With  Us ";
      // obj.email = req.email;
      obj.email = Constant.gmailSMTPCredentials.username;
      self.send(obj,cb);
  }

};

var Mail = mongoose.model('Mail', MailSchema);

module.exports = Mail;
