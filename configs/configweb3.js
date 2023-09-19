
const Web3=require('web3')
let jweb3 = {}
jweb3 [ 'SEPOLIA-TESTNET'] = require('./configweb3-sepolia').web3
jweb3 [ 'SEPOLIA_TESTNET'] = require('./configweb3-sepolia').web3
// let web3 = jweb3 [ 'SEPOLIA_TESTNET'] 

jweb3 [ 'PLUS-MAINNET'] = require('./configweb3-plusmain').web3
jweb3 [ 'PLUS_MAINNET'] = require('./configweb3-plusmain').web3

jweb3 [ 'PLUS-TESTNET'] = require ( './configweb3-plustest').web3
jweb3 [ 'PLUS_TESTNET'] = require ( './configweb3-plustest').web3

//	jweb3 [ 'PLUS-TESTNET'] = require ( './configweb3-plustest').web3
//	jweb3 [ 'PLUS_TESTNET'] = require ( './configweb3-plustest').web3

jweb3 [ 'KLAYTN-TESTNET'] = require ( './configweb3-klaytntestnet').web3
jweb3 [ 'KLAYTN_TESTNET'] = require ( './configweb3-klaytntestnet').web3
jweb3 [ 'KLAYTN-MAINNET'] = require ( './configweb3-klaytnmainnet').web3
jweb3 [ 'KLAYTN_MAINNET'] = require ( './configweb3-klaytnmainnet').web3
// web3 = Object.assign(web3, createaccount)
let web3 = jweb3 [ 'KLAYTN_TESTNET' ] // PLUS_MAINNET'] 
const createaccount=()=>{return web3.eth.accounts.create()}
const	PRICEUNIT = 'KLAY'
module.exports={ 
	jweb3, // web3wss, netkind,nettype,
	web3 ,
	createaccount ,
	PRICEUNIT 
}

 


