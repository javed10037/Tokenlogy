
var express = require('express');
var api = require('../app/controllers/publicApi.js');

app = express();

app.use('/*', function(req, res, next) {
  user = api.check;
  console.log("User:   "+JSON.stringify(user))
  if (!user) {
    return res.json({code:403, message: "Forbidden. Not logged in."});
  }else if(user == "Wrong Token"){
    return res.json({code: 403, message :"Forbidden. Wrong Token."});
  }else{
    next();
  }
})