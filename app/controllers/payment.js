var paypal = require('paypal-rest-sdk');

paypal.configure({
    "host": "api.live.paypal.com",
    "client_id": "Af5o23b788IpVtfdVzmH-KL5hhtQjfWf-tipX-2NSGiIpU5IrNQZqvADmBXUoTE4ajk8Wung7CuWIPAX",
    "client_secret": "EJtkTmg0UUI8_HAjhJu89Tk1UJBItyFybFlfvmfCbpxjOcV1_txWzVlHzCu0fiqcZ_Y_3MILuP5ILRQg"
});
const User = require("../models/users");
var BigNumber = require('bignumber.js');
//**********************************apis****************************************
exports.success = function(req, res) {
    var ArrayIDs = [];
    console.log("success k parameters:   ", req.params,req.query)
        var paymentId = req.query.paymentId;
        console.log("suceess in payment", req.query)
        var payerId = req.query.PayerID;
        var details = {
            "payer_id": payerId
        };
     
        paypal.payment.execute(paymentId, details, function(error, payment) {
          if(error)
            res.json({message:'Something went wrong,if amount deducted it will be refund within 24 hrs.', code:400})
        else
             {
                User.findOneAndUpdate({_id:req.query.userId},{$set:{referralCode:req.query.code,category:'reseller'}},{new:true})
                .then((success)=>{
                    console.log("11111111111",success)
                    res.redirect()
                })
                .catch((unsuccess)=>{res.json({message:'Something went wrong,if amount deducted it will be refund within 24 hrs.', code:400})})
             }
           
        });
}
exports.cancel = function(req, res) {
    res.send("Payment canceled successfully.");
}
exports.paynow = function(req, res) {
    console.log("req.query::   ",req.query.userId,req.query.amount)
    if(!req.query.amount || !req.query.userId)
        resHndlr.apiResponder(req, res, 'Please fill the required fields.', 400)
    else
    {
                          var payment = {
                            "intent": "sale",
                            "payer": {
                                "payment_method": "paypal"
                            },
                            "redirect_urls": {
                                "return_url": "http://192.168.0.165:4000/success?userId="+req.query.userId+"&amount="+req.query.amount+"&code"+req.query.code,
                                "cancel_url": "http://192.168.0.165:4000/cancel"
                            },
                            "transactions": [{
                                "amount": {
                                    "total": parseInt(req.query.amount),
                                    "currency": "USD"
                                },
                                "description": "payment deatils of your transaction."
                            }]
                        };
                        paypal.payment.create(payment, function(error, payment) {
                            if (error) {
                                console.log(JSON.stringify(error));
                            } else {
                                if (payment.payer.payment_method === 'paypal') {
                                    var redirectUrl;
                                    for (var i = 0; i < payment.links.length; i++) {
                                        var link = payment.links[i];
                                        if (link.method === 'REDIRECT') {
                                            redirectUrl = link.href;
                                        }
                                    }
                                    console.log("redirectUrl |||||||||||||||||| ",redirectUrl)
                                    res.redirect(redirectUrl);
                                    // res.send(redirectUrl)
                                }
                            }
                        });
                    }
}

