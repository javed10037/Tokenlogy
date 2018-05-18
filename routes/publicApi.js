var express = require('express');
var user = require('../app/controllers/publicApi.js');
var api = require('../app/controllers/userCtrl.js');
var payment = require('../app/controllers/payment.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* To register a user. */
router.post('/register', user.register);
/**/
router.post('/endrose', user.endrose);
/* To verify email. */
router.get('/verify-email/:token', user.verifyEmail);
/* To login. */
router.post('/login', user.login);
router.post('/logout', user.logout);
/* To recover password. */
router.post('/forgot_password', user.forgotPassword);
/* To reset password. */
router.post('/reset_password', user.resetPassword);
router.post('/UpdateUserProfileById', user.UpdateUserProfileById);

router.post('/rateToken', user.rateToken);
router.post('/adminRateToken', user.adminRateToken);
router.post('/UploadUserImageById', user.UploadUserImageById);
router.post('/GetProfileByUserId', user.GetProfileByUserId);
router.post('/imageUpload', user.imageUpload);
router.post('/check', user.check);
router.get('/getAllTokens', user.getAllTokens);
router.get('/viewTokenForHomePage/:page', user.viewTokenForHomePage);
router.post('/searchTokenByName', user.searchTokenByName);
router.post('/resetPasswordByUserid', user.resetPasswordByUserid);
router.post('/contactUs',user.contactUs);
router.post('/subscribeUs',user.subscribeUs);
router.get('/googleMapDirection', user.googleMapDirection);
router.get('/getEthereumFromUSD',user.getEthereumFromUSD);

router.get('/cancel',payment.cancel);
router.get('/success',payment.success);
router.get('/paynow',payment.paynow);

router.post('/endrose', user.endrose);
router.post('/removeEndrose', user.removeEndrose);
router.post('/coupon', api.coupon);
router.post('/Addcoupon', api.Addcoupon);
router.post('/getReferralBalance',user.getReferralBalance);

//
router.post('/saveCrowdsale', user.saveCrowdsale);
router.post('/getCrowdsale', user.getCrowdsale);
router.post('/deleteCrowdsale', user.deleteCrowdsale);

router.post('/getTokenInfo', user.getTokenInfo);
router.get('/getTopTokens', user.getTopTokens);
router.post('/saveContract', user.saveContract);
router.post('/getContract', user.getContract);
router.post('/sendRawTransaction', user.sendRawTransaction);
router.post('/getTokenInfoByTokenId', user.getTokenInfoByTokenId);
router.post('/verifyPassword',user.verifyPassword);

// api for Creating and fetch top ico's
router.post('/createTopIco',user.createTopIco);
router.get('/getTopIco',user.getTopIco);

router.post('/createTopIcoByAdmin',user.createTopIcoByAdmin);
router.get('/getTopIcoByAdmin',user.getTopIcoByAdmin);
router.post('/inCompleteICO',user.inCompleteICO);
router.post('/deletedCompleteICO',user.deletedCompleteICO);
router.post('/updateSaveDraftByUserId', user.updateSaveDraftByUserId);

router.post('/imageUploadOnCloud', user.imageUploadOnCloud);
// for KRYPTUAL poitns
router.post('/generateInvestorCode',user.generateInvestorCode);
router.post('/getInvestorCode',user.getInvestorCode);
//<<<<<<< HEAD
router.post('/getUserPoint',user.getUserPoint);
//=======
router.post('/getKryptualPoints', user.getKryptualPoints);
//>>>>>>> 6261ed8413246ab2b43f923e0da05300c391e56d
module.exports = router;
