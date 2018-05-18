var express = require('express');
var eth = require('../app/controllers/EthCtrl.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource ETH controller');
});



/* To register a user. */
// router.post('/coinPayment', eth.coinPayment);
// router.post('/paymentWithraw', eth.paymentWithrawIntoWallet);
// router.post('/createTransaction', eth.createTransaction);

router.post('/createETHaddress', eth.createETHaddress);
router.post('/getAllETHaddress', eth.getAllETHaddress);
router.post('/getBalanceByAddress', eth.getBalanceByAddress);
router.post('/getTokenBalanceByAddress', eth.getTokenBalanceByAddress);
router.post('/getTransactionByAddress', eth.getTransactionByAddress);
router.get('/getAllTokens', eth.getAllTokens);
router.post('/submitICO', eth.submitICO);
// router.post('/getTokenByAddress', eth.getTokenByAddress);


router.post('/sendTransaction', eth.sendTransaction);
router.post('/getTransactionFromRopston', eth.getTransactionFromRopston);
router.post('/withdrawEth', eth.withdrawEth);
router.post('/getTransactionsByAccount', eth.getTransactionsByAccount);
router.post('/signAndSendTransaction', eth.signAndSendTransaction);

router.post('/createTokenAndCrowdsaleAddress', eth.createTokenAndCrowdsaleAddress);

// router.post('/getReactData', eth.getReactData);
router.post('/getReactData', eth.savedICOtokenIntoDB);
router.post('/getTokenByUserId', eth.getTokenByUserId);
router.post('/getTokenGeneralInfo', eth.getTokenGeneralInfo);
router.post('/getTokenInfoByTokenId',eth.getTokenInfoByTokenId);
router.post('/tokenDeletedByTokenId',eth.tokenDeletedByTokenId);
router.post('/updateTokenInfoByTokenId',eth.updateTokenInfoByTokenId);
router.post('/updateTokenInformationByTokenId',eth.updateTokenInformationByTokenId);
router.post('/withdrawEthForUser', eth.withdrawEthForUser);
router.post('/deleteTeamInfoByTeamId',eth.deleteTeamInfoByTeamId);
router.post('/createNewTeamByTokenId' ,eth.createNewTeamByTokenId);
router.post('/sendToken', eth.sendToken);
router.post('/getAllsendTokens',eth.getAllsendTokens);
router.post('/getContractAddressByToken', eth.getContractAddressByToken);
router.post('/investDetails', eth.investDetails);
router.post('/buyTokens',eth.buyTokens);
router.post('/ICOpayment',eth.ICOpayment);

router.post('/getTokenBalanceForInvest',eth.getTokenBalanceForInvest);
router.post('/sendTokenToUser', eth.sendTokenToUser);
router.post('/readAbi', eth.readAbi);
router.post('/sendEthToUser',eth.sendEthToUser);
module.exports = router;
