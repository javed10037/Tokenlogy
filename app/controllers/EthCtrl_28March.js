// Models=====================================
var User = require('../models/users.js');
var UserAddress = require('../models/userAddress.js');
var Token = require('../models/tokens.js');
var ICO = require('../models/icos.js');
var Mail = require('../models/SendMail.js');
var SMS = require('../models/SendSms.js');
// ================================================
var PublicApi = require('./publicApi.js');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Constant = require('../../config/constants');
var config = require('../../config/passport_config.js');
var jwt = require('jsonwebtoken');
var HttpStatus = require('http-status-codes');
var GlobalMessages = require('../../config/constantMessages');
var messageHandler = require('../../config/messageHandler');

var Accounts = require('web3-eth-accounts');
var Coinpayments = require('coinpayments');
var client = new Coinpayments(Constant.coinPayment);
var BigNumber = require('bignumber.js');
// var Tx = require('ethereumjs-tx');
// var privateKey = new Buffer('kunvar@123', 'hex')

const request = require('request');
var Accounts = require('web3-eth-accounts');
var Personal = require('web3-eth-personal');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
// For web socket on server
var accounts = new Accounts(Constant.ETHnodeURL.connectETHnodeWS);
var personal = new Personal(Constant.ETHnodeURL.connectETHnodeWS);
var web3 = new Web3(new Web3.providers.WebsocketProvider(Constant.ETHnodeURL.connectETHnodeWS));

// for http on local ethet testrpc
// var accounts = new Accounts(Constant.ETHnodeURL.connectETHnodeHTTP);
// var personal = new Personal(Constant.ETHnodeURL.connectETHnodeHTTP);
// var web3 = new Web3(new Web3.providers.HttpProvider(Constant.ETHnodeURL.connectETHnodeHTTP));



function distrubuteAmount(req,res,UserData)
{
	User.findOne({referralReseller:UserData.referralReseller})
	.then((success)=>{
		if(success)
		{
		if(success.EthAddress){
			var sellerAmount = new BigNumber(amount).multipliedBy(.003);
			success.referralEarn.push({ from:req.body.userId,
                            amount:sellerAmount})
			success.save(function(err,response)
			{
				if(err)
					console.log("something went wrong")
				else
					console.log("user reffral earn done")
			})
 	web3.eth.sendTransaction({from: UserData.EthAddress, to:success.EthAddress, value: web3.utils.toWei(sellerAmount, 'ether'),
 	 gasLimit: 21000, gasPrice: 20000000000})
 	   .on('transactionHash', function(hash){
 	   	console.log('transactionHash:::::::::'+hash);
 	   	callback(null,{status : 200, transactionHash : hash, message : 'ETH withraw successfully!.' });
		})
		.on('receipt', function(receipt){
			console.log('receipt'+receipt);
			User.findOne({referralInstitutional:success.referralInstitutional})
			.then((result)=>{
				if(result)
				{
					var institutionalAmount = new BigNumber(amount).multipliedBy(.005);
					result.referralEarn.push({ from:req.body.userId,amount:institutionalAmount})
					result.save(function(err,response)
					{
						if(err)
							console.log("something went wrong")
						else
							console.log("user reffral earn done")
					})
					// var institutionalAmount = new BigNumber(amount).multipliedBy(.005);
				 	web3.eth.sendTransaction({from: UserData.EthAddress, to:result.EthAddress, value: web3.utils.toWei(institutionalAmount, 'ether'),
				 	 gasLimit: 21000, gasPrice: 20000000000})
				 	   .on('transactionHash', function(hash){
				 	   	console.log('transactionHash:::::::::'+hash);
				 	   	callback(null,{status : 200, transactionHash : hash, message : 'ETH withraw successfully!.' });
						})
				 	   		.on('receipt', function(receipt){
				 	   		callback(null,{status : 200, receipt : receipt });
						})
						.on('confirmation', function(confirmationNumber, receipt){
							console.log('confirmationNumber'+receipt);
							callback(null,{status : 200, confirmationNumber : confirmationNumber, receipt:receipt });
						 })
						.on('error', function(err){
							callback('Insufficet balance')
						});
				}
				else
					callback(null,{status : 200, confirmationNumber : confirmationNumber, receipt:receipt })
			})
		})
		.on('confirmation', function(confirmationNumber, receipt){
			console.log('confirmationNumber'+receipt);
			callback(null,{status : 200, confirmationNumber : confirmationNumber, receipt:receipt });
		 })
		.on('error', function(err){
			callback('Insufficet balance')
		});

 }else{
 	callback('please fill required fields',null);
 }
		}
		else
			callback();
	})
	// web3.personal.signAndSendTransaction({'to': currencyValue.COMPANYACCOUNT,
 //     'from': req.body.address ,'value': sendAmount}, req.body._id,(err, TransactionDetails)=>{
}

var createETHaddress = function(req, res){
	var email = req.body.email;
	// var password = req.body.password;

	if(!email) res.status(HttpStatus.BAD_REQUEST).send({msg: 'Please enter Email ID', status: HttpStatus.BAD_REQUEST});
	// web3.eth.accounts.create('javed1');
	web3.eth.personal.newAccount('javed1').then((data) => {
		res.send({data : data});
		// let userOBJ = {
		// 	email : email,
		// 	ETHaddress : [{ "address": data }]
		// };

		// if(data){
		// 	console.log('Address::::'+data);

		// 	User.findOne({email : email}, function(err, user){

		// 	if(err) res.status(HttpStatus.BAD_REQUEST).send({data: data, status: HttpStatus.BAD_REQUEST});

		// 	if(!user) {
		// 		res.status(HttpStatus.BAD_REQUEST).send({data: [],message : 'User Not found!.', status: HttpStatus.BAD_REQUEST});
		// 	}

		// 	if(user){

		// 		UserAddress.findOne({email : email} , function(err, user1){

		// 			if(user1){
		// 				UserAddress.update({ email : email },
		// 					{ $push : {
		// 						        ETHaddress :  { "address": data }
		// 					        }
		// 					}, function(err, updatedata){
		// 				  	if(err){
		// 				  		res.status(HttpStatus.BAD_REQUEST).send({data: data, status: HttpStatus.BAD_REQUEST});
		// 				  	}
		// 				  	if(updatedata){
		// 				        res.status(HttpStatus.OK).send({data: data, message : 'Address create successfully', status: HttpStatus.OK});
		// 				  	}
		// 				});
		// 			}

		// 			else{
		// 				UserAddress.create(userOBJ , function(err, user){
		// 					res.status(HttpStatus.OK).send({data: data, status: HttpStatus.OK, message : 'Address create successfully'});
		// 				});
		// 			}
		// 		});
		// 	}

		//  })

		// }
		// else{
		// 	res.status(HttpStatus.BAD_REQUEST).send({data: [],message : 'Error in address generate on ETH Node', status: HttpStatus.BAD_REQUEST});
		// }
	});

	// if(userAccount){

	// 	UserAddress.findOne({email : email}, function(err, user){

	// 		if(err) res.status(HttpStatus.BAD_REQUEST).send({data: userAccount, status: HttpStatus.BAD_REQUEST});

	// 		if(!user) {

	// 			 web3.eth.personal.newAccount('kunvar@123').then((data) => {
	// 			 	let userOBJ = {
	// 					email : email,
	// 					ETHaddress : [{ "address": data }]
	// 				};

	// 				UserAddress.create(userOBJ , function(err, user){
	// 					res.status(HttpStatus.OK).send({data: user, status: HttpStatus.OK, message : 'Address create successfully'});
	// 				});

	// 		       // res.send({status : 200, message : 'Address create successfully ', data : data});
	// 		    });



	// 		}

	// 		if(user){
	// 			UserAddress.update({ email : email },
	// 				{ $push : {
	// 					         ETHaddress :  { "address": userAccount.address }
	// 				        }
	// 				}, function(err, data){
	// 			  	if(err){
	// 			  		res.status(HttpStatus.BAD_REQUEST).send({data: userAccount, status: HttpStatus.BAD_REQUEST});
	// 			  	}
	// 			  	if(data){
	// 			        res.status(HttpStatus.OK).send({data: userAccount, status: HttpStatus.OK});
	// 			  	}
	// 			 });
	// 		}
	// 	})

	// }
	// else{
	// 	res.status(HttpStatus.BAD_REQUEST).send({data: userAccount, status: HttpStatus.BAD_REQUEST});
	// }
}

var getAllETHaddress = function(req, res){
	var addresses = web3.eth.getAccounts().then((data)=>{
      if(data){
         res.send({status : 200, data : data , message : 'Address on Ethrium Node.'});
      }
      else{
         res.send({status : 200, data : data , message : 'No Data Found!.'});
      }
    });
}

var getBalanceByAddress = function(req, res){
 	let userAdd = req.body.address;
 	console.log('user address',userAdd);
	if(userAdd){
		  var addresses = web3.eth.getBalance(userAdd).then((data)=>{
	      if(data){
	      	data = data / Constant.ETHnodeURL.ETHdecimals;
	         res.send({status : 200, data : data , message : 'Address Balance on Ethrium Node.'});
	      }
	      else{
	         res.send({status : 200, data : data , message : 'No balance Data Found!.'});
	      }
	    });
	}
	else{
		res.send({status : 400, data : 0 , message : 'Please send user address!.'});
	}
}

var getTokenBalanceByAddress = function(req, res){
	let tokenName = req.body.ETHtokenAddress;
	let address = req.body.ETHaddress;
	let userId = req.body.userId;

	if(userId && address) {

		Token.find({ userId : userId}, { crowdSaleAddress: 1, tokenAddress : 1}).exec(function(err, userToken){

			if(err) res.send({status : 400, message : 'Error in saved into DB'});
			if(userToken){

				let counter =0;
				let tx = [];
				for(let token of userToken){
					 var opt = {
				      method: 'GET',
				      headers: {'content-type': 'application/json', 'charset':'utf-8'},
				      json: true
				    };
				    var data = {};
				    opt.url = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+token.tokenAddress+'&address='+address+'&tag=latest&apikey=I5AV4RC7F5EM9RNR3EFW1H6MQTDU6XUWUQ';

				    request(opt, function (err, response, body) {
				    	console.log('etherscan api hit',body);
				      if(err)
				        return res.json({
				          message: "Failed to get data from etherscan.io",
				          statusCode: 400
				        })

				     counter++;
				     body.tokenAddress = token.tokenAddress;
				     tx.push(body);
				     if(counter == userToken.length) {
				     	console.log('***Lopp FInished***');
				        res.send({status : 200, data : tx , message : 'Tx Data'});
				      }

				      // res.send({status : 200, data : body , message : 'Tx Data'});
				    });
				}
			}
			if(!userToken){
				res.send({status : 200, data : [], message : 'No ICO user token Data found'});
			}
		});


	}
	else{
		res.send({status : 400, message : 'Please Enter Token Name and Address'});
	}
}

var getTransactionByAddress = function(req, res){
	let hashAddress = req.body.TxHashAddress;
	let Address = req.body.Address;

	web3.eth.getBlockNumber().then((blockNo)=>{
		console.log('Block no:::'+blockNo);
		web3.eth.getBlock(blockNo).then((data)=>{
			// res.send({status : 200, data : data});
			console.log('details'+ JSON.stringify(data));

			var addresses = web3.eth.getTransaction(data.hash).then((txdata)=>{
		      if(txdata){
		         res.send({status : 200, data : txdata , message : 'Address Balance on Ethrium Node.'});
		      }
		      else{
		         res.send({status : 200, data : txdata , message : 'No balance Data Found!.'});
		      }
		    });

		});
	})

}

var getTransactionsByAccount = function(req, res){
	let myaccount = req.body.address;
	// let startBlockNumber = req.body.startBlock;
	// let endBlockNumber = req.body.endBlock;
	let startBlockNumber = 1;
	let endBlockNumber = 10;

		if (endBlockNumber == null) {
		    endBlockNumber = web3.eth.blockNumber;
		    console.log("Using endBlockNumber: " + endBlockNumber);
		  }
		  if (startBlockNumber == null) {
		    startBlockNumber = endBlockNumber - 1000;
		    console.log("Using startBlockNumber: " + startBlockNumber);
		  }
		  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
		   let tx = [];

			// var Awesomify = {
			//   transform : function(user, callback) {
			//     callback(null, user);
			//   }
			// };

		   var counter = 0;
			for(var i = startBlockNumber; i <= endBlockNumber; i++) {
			    web3.eth.getBlock(i,true).then(function(result) {
			        // tx.push(result.transactions);
			        console.log('User tx:::',result);
			        if(result){
				        let txData = result.transactions;
				        if(txData.length){
				        	if(txData[0].from === myaccount){
				        		let trxData = {
				        			blockHash : txData[0].blockHash,
				        			blockNumber : txData[0].blockNumber,
				        			from : txData[0].from,
				        			gas :txData[0].gas,
				        			gasPrice : txData[0].gasPrice,
				        			hash : txData[0].hash,
				        			input : txData[0].input,
				        			nonce : txData[0].nonce,
				        			to : txData[0].to,
				        			transactionIndex : txData[0].transactionIndex,
				        			value : txData[0].value/Constant.ETHnodeURL.ETHdecimals,
				        			v : txData[0].v,
				        			r : txData[0].r,
				        			s : txData[0].s
				        		};

				        		tx.push(trxData);
				        	}
				        }
				        else{
				        	res.send({status : 200, message : 'No transactions found.', data : []});
				        }
				        if(counter == endBlockNumber - 1) {
				            res.send({status : 200, message : 'Your transactions', data : tx});
				        }
				        counter++;
			        }
			        else{
			        	counter++;
			        }
			    })
			}


		  // for (var i = startBlockNumber; i <= endBlockNumber; i++) {
		  //   if (i % 1000 == 0) {
		  //     console.log("Searching block " + i);
		  //   }

		  //   var block = web3.eth.getBlock(i, true).then(function(data){
		  //   	console.log('TXXXXXXXX'+i,data.transactions);
		  //   	tx.push(data.transactions);
		  //   });
	   //  }
	    // if(i > endBlockNumber) res.send({status : 200, message : 'Your transactions', data : tx});
}

var signAndSendTransaction = function(req, res){
	 let fromAddress = req.body.fromAddress;
	 let toAddress = req.body.toAddress;

	 if(fromAddress && toAddress){
	 	web3.personal.signAndSendTransaction({'to': toAddress, 'from': fromAddress ,'value': 12345}, 'kunvar@123')
	 	.then(function(data){
	 		console.log('dataaaaa'+data);
	 	})

	 }else{
	 	res.send({status : 200, message : 'Please send all parameter'});
	 }
}

var sendTransaction = function(req, res){
	 let fromAddress = req.body.fromAddress;
	 let toAddress = req.body.toAddress;
	 web3.eth.personal.unlockAccount(fromAddress,'kunvar@123', 15000);

	 if(fromAddress && toAddress){
	 	web3.eth.sendTransaction({from: fromAddress, to:toAddress, value: web3.utils.toWei('1', 'ether'),
	 	 gasLimit: 21000, gasPrice: 20000000000})
	 	   .on('transactionHash', function(hash){
	 	   	console.log('transactionHash:::::::::'+hash);
	 	   	res.send({status : 200, transactionHash : hash });
			})
			.on('receipt', function(receipt){
				console.log('receipt'+receipt);
				res.send({status : 200, receipt : receipt });
			})
			.on('confirmation', function(confirmationNumber, receipt){
				console.log('confirmationNumber'+receipt);
				res.send({status : 200, confirmationNumber : confirmationNumber, receipt:receipt });
			 })
			.on('error', function(err){
				res.send({status : 400, message : 'Insufficet balance',error : err });
			});

	 }else{
	 	res.send({status : 200, message : 'Please send all parameter'});
	 }
}

var buyTokens = function(req, res){
	var BN = web3.utils.BN;
	 let fromAddress = req.body.fromAddress;
	 let toAddress = req.body.toAddress;
	 let amount = req.body.amount;
	 let userId = req.body.userId;
	 let password = req.body.password;

	 console.log('token buy params:::',fromAddress, amount);

       User.findOne({_id: userId},{}, function (err, data) {
                console.log('login2');
                 if (err) {
                    res.send({message: 'Error to find user',status:400});
                } else {
                    if(data){
					    bcrypt.compare(password, data.password, function (err, result) {
					                            if (err) {
					                                res.send({message: err,status:400});
					                            } else {
					                                if (result === true) {

															 web3.eth.personal.unlockAccount(fromAddress,data.email, 15000);
														        web3.eth.signTransaction({
														            from: fromAddress,
														            gasPrice: "20000000000",
														            gas: "21000",
														            to: toAddress,
														            value: web3.utils.toWei(amount, 'ether'),
														            data: "0xa6f2ae3a",
														            nonce : "100"
														        })
														        .then(function(data){
														            web3.eth.sendTransaction({
														                    from: fromAddress,
														                    to: toAddress,
														                    value: web3.utils.toWei(amount, 'ether')
														                })
														                .then(function(receipt){
														                    res.send({status : 200, receipt : receipt, message : 'You have bought '+amount+" tokens successfully!."})
														                });
														                console.log('Buy token successfully');
														        })
														        .catch(function(err){
														            res.send({status : 400, err : err, message : 'error occured, during invest token, please try again!.'})
														        });
														}
														else{
															res.send({message: 'password is incorrect',status:400});
														}
											}
							})
						}
				}
		});
}

var withdrawEth = function(req, res){
	 let fromAddress = req.body.fromAddress;
	 let toAddress = req.body.toAddress;
	 let amount = req.body.amount;
	 let userId = req.body.userId;
	 let password = req.body.password;

	  User.findOne({ _id: userId},{}, function (err, data) {
                console.log('withdrwa params : ',fromAddress,toAddress,amount,userId,password);
                if (err) {
                    res.send({message: err,status:400});
                } else {
                    if(data){

                    	 bcrypt.compare(password, data.password, function (err, result) {
                                    if (err) {
                                        res.send({message: err,status:400});
                                    } else {
                                        if (result === true) {
                                        		 // web3.eth.personal.unlockAccount(fromAddress,password, 15000);  unlock by password
                                        		 web3.eth.personal.unlockAccount(fromAddress,data.email, 15000);
                                        		 console.log('**isAccountUnlock::',web3.eth.personal.unlockAccount(fromAddress,data.email, 15000));

													 if(fromAddress && toAddress){
													 	web3.eth.sendTransaction({from: fromAddress, to:toAddress, value: web3.utils.toWei(amount, 'ether'),
													 	 gasLimit: 21000, gasPrice: 20000000000})
													 	   .on('transactionHash', function(hash){
													 	   	console.log('transactionHash:::::::::'+hash);
													 	   	res.send({status : 200, transactionHash : hash, message : 'ETH withraw successfully!.' });

																Mail.withdrawEthMail(req.body,data,function(msg){
																	console.log("the mail send sucessfully",data);
																})
															})
															.on('receipt', function(receipt){
																console.log('receipt'+receipt);
																res.send({status : 200, receipt : receipt });
															})
															.on('confirmation', function(confirmationNumber, receipt){
																console.log('confirmationNumber'+receipt);
																res.send({status : 200, confirmationNumber : confirmationNumber, receipt:receipt });
															 })
															.on('error', function(err){
																res.send({status : 400, message : 'Insufficet balance',error : err });
															});

													 }else{
													 	res.send({status : 200, message : 'Please send required parameter'});
													 }
                                        }
                                        else {
                                            res.send({message: 'Authentication failed due to wrong details.',status:400});
                                        }
                                    }
                        });
                    }
                }
      });
}

var getTransactionFromRopston = function (req, res){
	 var opt = {
	      method: 'GET',
	      headers: {'content-type': 'application/json', 'charset':'utf-8'},
	      json: true
	    };

	var data = {};
	    opt.url = 'http://api-ropsten.etherscan.io/api?module=account&action=txlist&address='+req.body.address+'&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken';

	    request(opt, function (err, response, body) {
	    	// console.log('etherscan api hit',body);
	      if(err)
	        return res.json({
	          message: "Failed to get data from etherscan.io",
	          statusCode: 400
	        })
	     	let transaction = [];
	     	var counter =0 ;
	     	if(body.result){

	     		return false;
	     	}

	     	for(let tx of body.result){
	     		let trxData = {
        			blockHash : tx.blockHash,
        			blockNumber : tx.blockNumber,
        			from : tx.from,
        			gas :tx.gas,
        			gasPrice : tx.gasPrice,
        			hash : tx.hash,
        			input : tx.input,
        			nonce : tx.nonce,
        			to : tx.to,
        			timeStamp : tx.timeStamp,
        			confirmations: tx.confirmations,
        			cumulativeGasUsed: tx.cumulativeGasUsed,
        			txreceipt_status : tx.txreceipt_status,
        			transactionIndex : tx.transactionIndex,
        			value : tx.value/Constant.ETHnodeURL.ETHdecimals
        		};
        		transaction.push(trxData);
        		counter++;
        		if(counter == body.result.length) {
        			console.log('get all tx list : ',counter, body.result.length);
				    res.send({status : 200, message : 'Your transactions', data : transaction});
				}

	     	}

	        // res.send({status : 200, data : body.result , message : 'Tx Data'});
	    });

}

var submitICO = function(req, res){
	let userId = req.body.userId;
	let email = req.body.email;
	let tokenName = req.body.tokenName;
	let toeknAddress = req.body.toeknAddress;
	let tokenTicker = req.body.tokenTicker;
	let toeknValue = req.body.toeknValue;
	let investorMinCap = req.body.investorMinCap;
	let startTime = req.body.startTime;
	let endTime = req.body.endTime;
	let tokenRate = req.body.tokenRate;
	let tokenSupply = req.body.tokenSupply;

	if(email && tokenName){

		let ICOOBJ = {
			    userId : userId,
				email  : email,
				tokenName : tokenName,
				tokenTicker : tokenTicker,
				toeknAddress : [{ "contractAddress": toeknAddress }],
				toeknValue: toeknValue,
				investorMinCap: investorMinCap,
				startTime : startTime,
				endTime:endTime,
				tokenRate: tokenRate,
				tokenSupply: tokenSupply,
			};

		User.findOne({email : email}, function(err, ico){

			if(err) res.status(HttpStatus.BAD_REQUEST).send({data: data, status: HttpStatus.BAD_REQUEST});

			if(!ico) {
				res.status(HttpStatus.BAD_REQUEST).send({data: [],message : 'User Not found!.', status: HttpStatus.BAD_REQUEST});
			}

			if(ico){

				ICO.findOne({email : email} , function(err, ico1){
					if(err) res.status(HttpStatus.BAD_REQUEST).send({data: data, status: HttpStatus.BAD_REQUEST});
					if(ico1){
						ICO.update({ email : email },
							{ $push : {
								        toeknAddress :  { "contractAddress": toeknAddress }
							        }
							}, function(err, data){
						  	if(err){
						  		res.status(HttpStatus.BAD_REQUEST).send({data: data, status: HttpStatus.BAD_REQUEST});
						  	}
						  	if(data){
						        res.status(HttpStatus.OK).send({data: data, message : 'ICO has been submitted successfully',status: HttpStatus.OK});
						  	}
						});
					}

					else{

						ICO.create(ICOOBJ, function(err, ico2){
								if(err) res.send({status : 400, message : 'Error in saved into DB'+err});
								if(ico2){
									res.send({status : 200, message : 'ICO has been submitted successfully'});
								}
						});
					}
				});
			}

		 })

		// ICO.create(ICOOBJ, function(err, ico){

		// 		if(err) res.send({status : 400, message : 'Error in saved into DB'});
		// 		if(ico){
		// 			res.send({status : 200, message : 'ICO has been submitted successfully'});
		// 		}
		// });
    }
	else{
		res.send({status : 400, message : 'Please send required params'});
	}
}

// var getTokenByAddress = function(req, res){
// 	let icoAddress = req.body.address;

// 	if(icoAddress){
// 		let condition = {
// 			toeknAddress : icoAddress
// 		};

// 		ICO.findOne(condition,{}).exec(function(err,ico){

// 			if(err) res.send({status : 400, message : 'Error in saved into DB'});
// 			if(ico){
// 				res.send({status : 200, data : ico});
// 			}
// 			if(!ico){
// 				res.send({status : 200, data : [], message : 'No Data found'});
// 			}
// 		});
// 	}
// 	else{
// 		res.send({status : 400, message : 'Please send required params'});
// 	}
// }

var getAllTokens = function(req, res){

		ICO.find({},{}).exec(function(err,token){

			if(err) res.send({status : 400, message : 'Error in saved into DB'});
			if(token){
				res.send({status : 200, data : token});
			}
			if(!token){
				res.send({status : 200, data : [], message : 'No ICO token Data found'});
			}
		});
}


var createTokenAndCrowdsaleAddress = function(req, res){
	let crowdSaleAddress = req.body.crowdSaleAddress;
	let tokenAddress = req.body.tokenAddress;
	let userId = req.body.userId;

	if(crowdSaleAddress && tokenAddress && userId){
		let tokenOBJ = {
				crowdSaleAddress : crowdSaleAddress,
				tokenAddress : tokenAddress
				// ,
				// userId       : userId
			};
console.log('tokenOBJtokenOBJ,',tokenOBJ);
	// 	Token.create(tokenOBJ, function(err, data){

	// 		if(err) res.send({status : 400, message : 'Error in saved into DB'});
	// 		if(data){
	// 			res.send({status : 200, message : 'Token has been Saved successfully'});
	// 		}
	// 	});
	// }
	// else{
	// 	res.send({status : 400, message : 'Please send crowdSaleAddress and token Address'});
	// }

	ICO.update({userId : userId}, {"$set": tokenOBJ}, function(err, data){

			if(err) res.send({status : 400, message : 'Error in saved into DB'});
			if(data){
				console.log('saved token info');
				res.send({status : 200, message : 'Token has been Saved successfully'});
			}
		});
	}
	else{
		res.send({status : 400, message : 'Please send crowdSaleAddress and token Address'});
	}

}

var getReactData = function(req, res){
	console.log('React Data', req.body);
}

var savedICOtokenIntoDB = function(req, res){
	console.log('*****api hitiing*****',req.body);

	let userId = req.body.userId;
	let tokenName = req.body.token.name;
	let tokenAddress = req.body.tokenAddress;
	let tokenTicker = req.body.token.ticker;
	let toeknValue = req.body.token.value;
	let investorMinCap = req.body.investorMinCap;
	// let startTime = req.body.crowdsale[0].startTime;
	// let endTime = req.body.crowdsale[0].endTime;
	let tokenRate = req.body.tokenRate;
	let tokenDecimals = req.body.token.decimals;
	let tokenSupply = req.body.crowdsale[0].supply;
	let walletAddress = req.body.crowdsale[0].walletAddress;
	let reservedTokens = req.body.token.reservedTokens;
	let crowdsale = req.body.crowdsale;

	let optimized = req.body.optimized;
	let contractName = req.body.contractName;
	let contractType = req.body.contractType;
	let tokenImage = req.body.tokenImage;
	let generalInfo = req.body.generalInfo;
	let team = req.body.team;
	let checkoutItems = req.body.checkoutItems;
	let crowdsaleAddress = req.body.crowdsaleAddress;
	let networkID = req.body.networkID;
	let whitePaper = req.body.whitePaper;

	let startTime = '';
    let endTime  ='';

    if(crowdsale.length > 1){
        startTime = crowdsale[0].startTime;
        endTime = crowdsale[crowdsale.length-1].endTime;
    }
    else{
        startTime = crowdsale[0].startTime;
        endTime = crowdsale[0].endTime;    
    }   

	console.log('*****ICO DATA saved*****');
	if(userId){

		let ICOOBJ = {
			    userId: userId,
				tokenName : tokenName,
				tokenTicker : tokenTicker,
				toeknValue: toeknValue,
				investorMinCap: investorMinCap,
				startTime : startTime,
				endTime:endTime,
				tokenRate: tokenRate,
				tokenSupply: tokenSupply,
				walletAddress : walletAddress,
				tokenDecimals : tokenDecimals,
				reservedTokens : reservedTokens,
				optimized :optimized,
				contractName: contractName,
				contractType : contractType,
				tokenImage   : tokenImage,
				generalInfo : generalInfo,
				team : team,
				crowdsale : crowdsale,
				checkoutItems : checkoutItems,
				tokenAddress : tokenAddress,
				crowdsaleAddress : crowdsaleAddress,
				networkID : networkID,
				whitePaper : whitePaper
			};

			User.findOne({ _id : userId}, function(err, user){
					console.log('users found in DB for token saving:::');
					if(err) res.status(HttpStatus.BAD_REQUEST).send({data: user, status: HttpStatus.BAD_REQUEST});

					if(!user) {
						res.status(HttpStatus.BAD_REQUEST).send({data: [],message : 'User Not found!.', status: HttpStatus.BAD_REQUEST});
					}

					if(user){
						ICO.create(ICOOBJ, function(err, ico){
							console.log('icos:::',ico);	
							if(err) 
							return res.status(HttpStatus.BAD_REQUEST).send({data: ico, status: HttpStatus.BAD_REQUEST});
					
							if(!ico) {
							return	res.status(HttpStatus.BAD_REQUEST).send({data: [],message : 'User Not found!.', status: HttpStatus.BAD_REQUEST});
							}
							if(ico){
								PublicApi.deleteCrowdsale(req,res,function(err,result)
								{
									if(err)
										return res.status(HttpStatus.BAD_REQUEST).send({data: ico, status: HttpStatus.BAD_REQUEST});
									else
										return res.send({status : 200, message : 'Token has been created successfully!.'})
								})
							 // return res.send({status : 200, message : 'Token has been created successfully!.'})
							}
			           });
					}
				});
		}else{
			res.send({status : 400, message : 'Please send required params'});
		}
}

var getTokenByUserId = function(req, res){
		let userId = req.body.userId;
		if(userId){
			ICO.find({ userId : userId, isDeleted : false},{}).populate('userId',{}).exec(function(err,token){

				if(err) res.send({status : 400, message : 'Error in saved into DB'});
				if(token){
					res.send({status : 200, data : token});
				}
				if(!token){
					res.send({status : 200, data : [], message : 'No ICO token Data found'});
				}
			});
	    }
	    else{
	    	res.send({status : 400, data : [], message : 'Please Enter token ID'});
	    }
}

var getTokenGeneralInfo = function(req, res){
	let userId = req.body.userId;
	let crowdsaleAddress = req.body.crowdsaleAddress;

	let condition = { $or: [ { userId: userId }, { crowdsaleAddress: crowdsaleAddress } ] };

		if(userId){
			ICO.find(condition,{}).populate('userId',{}).exec(function(err,token){

				if(err) res.send({status : 400, message : 'Error in saved into DB'});
				if(token){
					res.send({status : 200, data : token});
				}
				if(!token){
					res.send({status : 200, data : [], message : 'No ICO token Data found'});
				}
			});
	    }
	    else{
	    	res.send({status : 400, data : [], message : 'Please Enter token ID'});
	    }
}
var tokenDeletedByTokenId = function(req,res){
let tokenId = req.body.tokenId;
	ICO.findOneAndUpdate({_id:tokenId },{"$set": {"isDeleted": true}},function(err,data){
	if(err){
	res.json({message : "Please enter the valid id ",status : 400})
	}else if(data) {
	  res.json({message : "Token Information deleted successfully",status : 200})
	} else{
	   res.json({message : "Please enter the valid id ",status : 400})
	 }
	})
}

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

var updateTokenInfoByTokenId = function(req,res){
	let reqObj = {
	_id : req.body.tokenId
	};
	let updateObj = {
	tokenName : req.body.tokenName,
	toeknAddress : req.body.toeknAddress,
	//tokenTicker : req.body.tokenTicker,
	toeknValue : req.body.toeknValue,
	investorMinCap : req.body.investorMinCap,
	tokenRate : req.body.tokenRate,
	tokenSupply : req.body.tokenSupply,
	contractType : req.body.contractType,
	     //tokenImage : req.body.tokenImage
	};
		ICO.update(reqObj,updateObj,function(err,data){
			if(err){
			    res.json({messge : "Please enter the valid token Id",status : 400})
			}
			else if(data){
			    res.json({message : "Token information updated successfully",status : 200})
			}else {
			    res.json({message : "Please enter the valid token",status : 400})
			}
		})
}


// var coinPayment = function (req,res){
// 	console.log('I am inside the coin payment');
// 	client.rates(function(err,data){
// 		if(err){
//              res.status(HttpStatus.BAD_REQUEST).send({msg: err, status: HttpStatus.BAD_REQUEST});
//         }else{
//         	res.status(HttpStatus.OK).send({data: data, status: HttpStatus.OK});
//         }
// 	});
// }

// var paymentWithrawIntoWallet = function (req,res){
// 	client.createWithdrawal({'currency' : 'POT', 'amount' : 10, 'address': 'INSERT_WALLET_ADDRESS'},
// 		function(err,result){
// 		if(err){
//              res.status(HttpStatus.BAD_REQUEST).send({msg: err, status: HttpStatus.BAD_REQUEST});
//         }else{
//         	res.status(HttpStatus.OK).send({data: result, status: HttpStatus.OK});
//         }
// });

// }

// var createTransaction = function (req,res){
// 	client.createTransaction({'currency1' : 'BTC', 'currency2' : 'ETH', 'amount' : 10, "address" : "0xdc3b08D1c0551cbEB587732C94B452223F72AE1A"},function(err,result){
// 		if(err){
//              res.status(HttpStatus.BAD_REQUEST).send({msg: err, status: HttpStatus.BAD_REQUEST});
//         }else{
//         	res.status(HttpStatus.OK).send({data: result, status: HttpStatus.OK});
//         }
// });

// }


//  functions
// exports.coinPayment = coinPayment;
// exports.paymentWithrawIntoWallet = paymentWithrawIntoWallet;
// exports.createTransaction = createTransaction;

var updateTokenInformationByTokenId = function(req,res){
   let reqObj = {
       _id : req.body.tokenId
   }

   ICO.findOne({_id : req.body.tokenId},{},function(err,data){
           if(err){
                   res.json({messge : "Please enter the valid token Id",status : 400})
           }
           else if(data){
               console.log('requested param for change',req.body);
               console.log('data from DB',data.generalInfo.companyName);
               data.tokenImage = req.body.tokenImage ? req.body.tokenImage : data.tokenImage;
               data.generalInfo.companyName = req.body.companyName ? req.body.companyName : data.generalInfo.companyName;
               data.generalInfo.description =  req.body.description ? req.body.description : data.generalInfo.description;
               data.generalInfo.website =  req.body.website ? req.body.website : data.generalInfo.website;
               data.generalInfo.address1 =  req.body.address1 ? req.body.address1 : data.generalInfo.address1;
               data.generalInfo.address2 =  req.body.address2 ? req.body.address2 : data.generalInfo.address2;
               data.generalInfo.country =  req.body.country ? req.body.country : data.generalInfo.country;
               data.generalInfo.zipcode =  req.body.zipcode ? req.body.zipcode : data.generalInfo.zipcode;
               data.generalInfo.twitter =  req.body.twitter ? req.body.twitter : data.generalInfo.twitter;
               data.generalInfo.linkedin =  req.body.linkedin ? req.body.linkedin : data.generalInfo.linkedin;
               data.generalInfo.facebook =  req.body.facebook ? req.body.facebook : data.generalInfo.facebook;
               data.generalInfo.vedio =  req.body.vedio ? req.body.vedio : data.generalInfo.vedio;
               data.whitePaper =  req.body.whitePaper ? req.body.whitePaper : data.whitePaper;

             var teamId = req.body.teamId;
               for(var i= 1;i<= data.generalInfo.team.length;i++){
                   console.log('teamId',data.generalInfo.team[i-1]._id);
                   if(teamId == data.generalInfo.team[i-1]._id){
                       console.log('matched teamid',teamId,i);
                       console.log('data.generalInfo.team[i]',data.generalInfo.team[i-1]);
                       data.generalInfo.team[i-1].linkedinname = req.body.linkedinname ? req.body.linkedinname : data.generalInfo.team[i-1].linkedinname;
                       data.generalInfo.team[i-1].designation = req.body.designation ? req.body.designation : data.generalInfo.team[i-1].designation;
                       data.generalInfo.team[i-1].image = req.body.image ? req.body.image : data.generalInfo.team[1-1].image;
                   }
               }
               data.save(function (err,success) {
                   if(err){
                           res.json({message : "Please enter the valid token",status : 400})
                   }else if(success){
                       console.log("update data",success);
                               res.json({message : "Token information updated successfully",status : 200})
                       }else{
                               res.json({message : "data not updated",status : 400})
                       }
                   })
   }
   else{
           res.json({message : "data not updated",status : 400})
   }
       })

   }

var withdrawEthForUser = function(req,res){

	let toAddress = req.body.toAddress;
	let amount = req.body.amount;

	web3.eth.getAccounts().then((data)=>{
      if(data){
      	console.log('all accounts here:',data);
      	let fromAddress = data[0]; //set default account for sending ETH to user
         // res.send({status : 200, data : data , message : 'Address on Ethrium Node.'});
         	if(fromAddress && toAddress){
			 	web3.eth.sendTransaction({from: fromAddress, to:toAddress, value: web3.utils.toWei(amount, 'ether'),
			 	 gasLimit: 21000, gasPrice: 20000000000})
			 	   .on('transactionHash', function(hash){
			 	   	console.log('transactionHash:::::::::'+hash);
			 	   	res.send({status : 200, transactionHash : hash, message : 'ETH withraw successfully!.' });
					})
					.on('receipt', function(receipt){
						console.log('receipt'+receipt);
						res.send({status : 200, receipt : receipt });
					})
					.on('confirmation', function(confirmationNumber, receipt){
						console.log('confirmationNumber'+receipt);
						res.send({status : 200, confirmationNumber : confirmationNumber, receipt:receipt });
					 })
					.on('error', function(err){
						res.send({status : 400, message : 'Insufficet balance',error : err });
					});

			 }else{
			 	res.send({status : 400, message : 'Please send required parameter'});
			 }
      }
      else{
         res.send({status : 400, data : data , message : 'No Data Found!.'});
      }
    });


}

deleteTeamInfoByTeamId = function(req,res) {
    let    teamId = req.body.teamId;
    let tokenId = req.body.tokenId;
    ICO.update({ _id: tokenId },{ $pull: { 'generalInfo.team': {_id : teamId }}},function(err,data){
          if(err){
                res.json({message : "Unabele to delete the information ",status : 400})
            }
          else if(data){
                             console.log("dataaaaaaaaaaaaaaaaa",data);
                            res.json({message : "Team has been removed successfully",status : 200})
                        }
                        else{
                            res.json({message : "Please enter the correct Tokenid and team _id",message : 400})
                        }
                    })
}

createNewTeamByTokenId = function(req,res) {
    let teamId =  req.body.teamId;
    let tokenId = req.body.tokenId;
    let linkedinname = req.body.linkedinname;
  ICO.update({_id: tokenId},{$push : {'generalInfo.team': {"linkedinname" : req.body.linkedinname,"designation" : req.body.designation, "image" : req.body.image}}},function(err,data){
      if(err){
            res.json({message : "Error,Unable to save new team in db " ,status : 400})
     }
    else if(data){
                    res.json({message : "Team has been added successfully",status : 200})
                }
                else{
                    res.json({message : "Please enter the valid Token id",message : 400})
                }
            })
 }

var sendToken = function (req, res){
    let contractAddress = req.body.contractAddress;
    let password = req.body.password;
    let fromAddress = req.body.fromAddress;
    let toAddress = req.body.toAddress;
    let amount = req.body.amount;
    let email = req.body.email;
    let count = 1;
    var gasPrice = 4700034;//web3.eth.gasPrice;
    var gasLimit = 4700035;

	var opt = {
	      method: 'GET',
	      headers: {'content-type': 'application/json', 'charset':'utf-8'},
	      json: true
	    };

	var data = {};
	    opt.url = Constant.readABIfromEtherscan+'address='+contractAddress;
	    // opt.url = 'https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address='+contractAddress+'&apikey=YourApiKeyToken';

	    request(opt, function (err, response, body) {
	    	// console.log('etherscan api hit',body);
	      if(err)
	        return res.json({
	          message: "Failed to get data from etherscan.io",
	          statusCode: 400
	        })
	        console.log('body.result',body.result);
	        if('Invalid Address format' == body.result){
	        	console.log('true');
	        	res.send({status : 400, message : 'Invalid Address format', err : err});
	        	return false;
	        }else{
	        	console.log('not');
	        }

	     	let contractABI = JSON.parse(body.result);
	     	var MyContract = new web3.eth.Contract(contractABI);

	     	// MyContract.methods.approve(fromAddress, amount);
	     	// let status = MyContract.methods.transferFrom(fromAddress, toAddress, amount);
	     	// res.send({status : 200, message : 'Your contract ABI', status : status});


	     	if (contractABI != ''){
		        var MyContract = new web3.eth.Contract(contractABI);
				var privKey = new Buffer('2e29b3c49d3d9de8644657cbb143d69f68290f13ecf36352807bfe18677b92c5','hex');

				web3.eth.personal.unlockAccount(fromAddress,email, 15000);
			    var rawTransaction = {
				    "from": fromAddress,
				    "nonce": web3.utils.toHex(count),
				    "gasPrice": web3.utils.toHex(gasPrice),
				    "gasLimit": web3.utils.toHex(gasLimit),
				    "to": toAddress,
				    "value": amount,
				    "data": MyContract.methods.transfer(toAddress, amount).encodeABI(),
				};

				var tx = new Tx(rawTransaction);
				tx.sign(privKey);
				var serializedTx = tx.serialize();

				web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
				    if (!err)
				        res.send({status : 200, message : 'Hash', hash : hash});
				    else{
				    	 MyContract.methods.balanceOf(fromAddress).call().then((balance) => {
					      console.log("Balance: ", balance);
					    });

				        res.send({status : 200, message : 'err', err : err});
				    }
				});

		    } else {
		        console.log("Error" );
		    }

	    });
}

var sendTokenToUser = function(req, res){
	let contractAddress = req.body.contractAddress;
    let password = req.body.password;
    let fromAddress = req.body.fromAddress;
    let toAddress = req.body.toAddress;
    let amount = req.body.amount;
    let email = req.body.email;
    let count = 1;
    var gasPrice = 4700034;//web3.eth.gasPrice;
    var gasLimit = 4700035;

	var opt = {
	      method: 'GET',
	      headers: {'content-type': 'application/json', 'charset':'utf-8'},
	      json: true
	    };

	var data = {};
	    opt.url = 'http://api.etherscan.io/api?module=contract&action=getabi&address='+contractAddress;
	    // opt.url = 'https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address='+contractAddress+'&apikey=YourApiKeyToken';
	    let opts = {
	      from : '0x0008Ec9F540Ceb20CDa44EC8503981Ff58a3361B',
	      // value: weiToSend,
	      gasPrice: gasPrice,
	      // data: "0xa6f2ae3a"
	    };

	    request(opt, function (err, response, body) {
	    	// console.log('etherscan api hit',body);
	      if(err)
	        return res.json({
	          message: "Failed to get data from etherscan.io",
	          statusCode: 400
	        })
	        console.log('body.result',body.result);
	     	let contractABI = JSON.parse(body.result);
	     	var MyContract = new web3.eth.Contract(contractABI);

	     	if (contractABI != ''){
	     		 console.log('::::contractABIcontractABIcontractABIcontractABI:::');
	     		MyContract.methods.balanceOf('0x0008Ec9F540Ceb20CDa44EC8503981Ff58a3361B').call()
				    .then(function(result){
				    //the result holds your Token Balance that you can assign to a var
				    var myTokenBalance = result;
				    console.log('::::myTokenBalance:::',myTokenBalance);
				    return result;
				});
	     	}
	     });
}

var getAllsendTokens = function (req, res){
    let Address = req.body.Address;
	var opt = {
	      method: 'GET',
	      headers: {'content-type': 'application/json', 'charset':'utf-8'},
	      json: true
	    };

	var data = {};
	    // opt.url = Constant.ethplorer+'getAddressInfo/'+Address+'?apiKey=freekey';
	    opt.url = Constant.ethplorer+'getAddressInfo/0xB8c77482e45F1F44dE1745F52C74426C631bDD52?apiKey=freekey';
	    
	    request(opt, function (err, response, body) {
	    	// console.log('etherscan api hit',body);
	      if(err)
	        return res.json({
	          message: "Failed to get data from ethplorer.io",
	          statusCode: 400,
	          err :err
	        })
	     	if(body.hasOwnProperty('tokens')){
	     		res.send({status : 200, message : 'Send token balance', data : body});
	     	}
	     	else{
	     		res.send({status : 200, message : 'No Tokens Found.', data : []});
	     	}

	    });
}

var getContractAddressByToken = function(req, res){
	let tokenAddress = req.body.tokenAddress;

	ICO.findOne({ tokenAddress: tokenAddress},{crowdsaleAddress : 1},function(err,data){
	   if(err){
	        res.json({message : "Error,Unable to save new team in db " ,status : 400})
	     }
	    else if(data)
	    {
	        res.json({message : "Token Contact Address",status : 200,data : data})
	    }
	    else{
	        res.json({message : "Please enter the valid Token address",message : 400,data : []})
	    }
    })
}

var investDetails = function(req, res){
	var opt = {
	      method: 'GET',
	      headers: {'content-type': 'application/json', 'charset':'utf-8'},
	      json: true
	    };

	var data = {};
	    opt.url = Constant.readABIfromEtherscan+'address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413';
	    // opt.url = 'https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address='+contractAddress+'&apikey=YourApiKeyToken';

	    request(opt, function (err, response, body) {
	    	// console.log('etherscan api hit',body);
	      if(err)
	        return res.json({
	          message: "Failed to get data from etherscan.io",
	          statusCode: 400
	        })

	     	let contractABI = JSON.parse(body.result);
	     	var MyContract = new web3.eth.Contract(contractABI);
	     	MyContract.methods.balanceOf('0x793ea9692Ada1900fBd0B80FFFEc6E431fe8b391').call(function(err,bal){
	     		console.log(balance);
	     	});
	     });
}

var getTokenBalanceForInvest = function(req, res){
	let crowdSaleAddress = req.body.crowdSaleAddress;
	let userEthAddres = req.body.userEthAddres;

	var opt = {
	      method: 'GET',
	      headers: {'content-type': 'application/json', 'charset':'utf-8'},
	      json: true
	    };
	    var data = {};
	    opt.url = Constant.readABIfromEtherscan+'address='+crowdSaleAddress;
	    console.log('Ethrscan url::',opt.url);

	    request(opt, function (err, response, body) {
		    if(err)
		        return res.json({
		          message: "Failed to get data from etherscan.io",
		          statusCode: 400,
		          err : err
		        })
		if(body.result){
			let contractABI = JSON.parse(body.result);
		    var MyContract = new web3.eth.Contract(contractABI,crowdSaleAddress);

		    MyContract.methods.balanceOf(userEthAddres).call(function(err,data){
		        res.send({status :200, tokenBalance : data , message : 'Get Token Balance'});
		    });
		}
		else{
			res.send({status : 400, data : [],message : 'No data found'});
		}

	});
}

var ICOpayment = (req,res)=>{
	if(req.body.userId && req.body.amount){
		let condition = { _id : req.body.userId};

		User.findOne(condition).then((success)=>{
			if(success){
				var remainingAmount = new BigNumber(amount).multipliedBy(.008);
				var amountPay = new BigNumber(req.body.amount).minus(remainingAmount);
				 	web3.eth.sendTransaction({from: result.ETHaddress, to: Constant.companyETHaddress, value: web3.utils.toWei(amountPay, 'ether'),
				 	 gasLimit: 21000, gasPrice: 20000000000})
				 	   .on('transactionHash', function(hash){
				 	   	console.log('transactionHash:::::::::'+hash);
				 	   	// callback(null,{status : 200, transactionHash : hash, message : 'ETH withraw successfully!.' });
						})
				 	   		.on('receipt', function(receipt){
				 	   		distrubuteAmount(req,res,success);
						})
						.on('confirmation', function(confirmationNumber, receipt){
							console.log('confirmationNumber'+receipt);
							// callback(null,{status : 200, confirmationNumber : confirmationNumber, receipt:receipt });
						 })
						.on('error', function(err){
							console.log('transactionHash:::::::::'+err);
							// callback('Insufficet balance')
						});
			}
			else
				res.send({status : 400, data : [],message : 'User does not exists.'});
		})
		.catch((err)=>{

		});

	}else{
		res.send({status : 400, data : [],message : 'User does not exists.'});
	}
}


var readAbi = function(req, res){
	let crowdSaleAddress= req.body.crowdSaleAddress;
	let userEthAddres= req.body.userEthAddres;

	// let jsonData =  JSON.stringify(Constant.dummyAbi.contracts.crowdsale);
	// let contractABI = JSON.parse(jsonData);
	// console.log("**ABI,",contractABI);
	
	    var MyContract = new web3.eth.Contract(Constant.dummyAbi.contracts,crowdSaleAddress);
	    console.log("**MyContractMyContract,",MyContract);

	    MyContract.methods.balanceOf(userEthAddres).call(function(err,data){
	        res.send({status :200, tokenBalance : data , message : 'Get Token Balance', err:err});
	    });
}

exports.createETHaddress = createETHaddress;
exports.getAllETHaddress = getAllETHaddress;
exports.getBalanceByAddress = getBalanceByAddress;
exports.getTransactionFromRopston = getTransactionFromRopston;
exports.getTokenBalanceByAddress = getTokenBalanceByAddress;
exports.getTransactionByAddress = getTransactionByAddress;
exports.createTokenAndCrowdsaleAddress = createTokenAndCrowdsaleAddress;

exports.submitICO = submitICO;
// exports.getTokenByAddress = getTokenByAddress;
exports.getAllTokens = getAllTokens;

exports.sendTransaction = sendTransaction;
exports.withdrawEth = withdrawEth;
exports.getTransactionsByAccount = getTransactionsByAccount;
exports.signAndSendTransaction = signAndSendTransaction;

exports.savedICOtokenIntoDB = savedICOtokenIntoDB;
exports.getReactData = getReactData;
exports.getTokenByUserId = getTokenByUserId;

exports.getTokenGeneralInfo = getTokenGeneralInfo;
exports.tokenDeletedByTokenId = tokenDeletedByTokenId;
exports.getTokenInfoByTokenId = getTokenInfoByTokenId;
exports.updateTokenInfoByTokenId = updateTokenInfoByTokenId;
exports.updateTokenInformationByTokenId = updateTokenInformationByTokenId;
exports.withdrawEthForUser = withdrawEthForUser;
exports.deleteTeamInfoByTeamId = deleteTeamInfoByTeamId;
exports.createNewTeamByTokenId = createNewTeamByTokenId;
exports.sendToken = sendToken;
exports.getAllsendTokens = getAllsendTokens;
exports.getContractAddressByToken = getContractAddressByToken;
exports.investDetails = investDetails;
exports.buyTokens = buyTokens;
exports.ICOpayment = ICOpayment;


// For token balance on invest page
exports.getTokenBalanceForInvest = getTokenBalanceForInvest;

exports.sendTokenToUser = sendTokenToUser;
exports.readAbi = readAbi;