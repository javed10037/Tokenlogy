
var User = require('../models/users.js');
var request = require('request');
var Constant = require('../../config/constants');


var switch_on_tv = function (cb) {
    var url = Constant.rpiCredentials.baseUrl+"/switch_on_tv";
    request(url,function (error,response,body) {
        console.log('error1:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        cb(body)
    });
};


var  machine_serial_id = function () {

};


var switch_off_tv = function () {
    var url = Constant.rpiCredentials.baseUrl+"/switch_off_tv";
    request(url,function (error,response,body) {
        console.log('error12:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
};

var power_status = function (cb) {
    var url = Constant.rpiCredentials.baseUrl+"/power_status";
    request(url,function (error,response,body) {
        console.log('error2:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        cb(body)
    });
};

var change_hdmi_2 = function (cb) {
    var url = Constant.rpiCredentials.baseUrl+"/change_hdmi_2";
    request(url,function (error,response,body) {
        console.log('error45:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        cb(body)
    });
}

var change_hdmi_1 = function (cb) {
    var url = Constant.rpiCredentials.baseUrl+"/change_hdmi_1";
    request(url,function (error,response,body) {
        console.log('error3:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        // cb(body)
    });
};



exports.switch_on_tv = switch_on_tv;
exports.switch_off_tv = switch_off_tv;
exports.change_hdmi_2 = change_hdmi_2;
exports.change_hdmi_1 = change_hdmi_1;
exports.machine_serial_id = machine_serial_id;
exports.power_status = power_status;