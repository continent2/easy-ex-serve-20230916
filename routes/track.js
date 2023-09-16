var express = require('express');
var router = express.Router();
const moment=require('moment')
/* GET home page. */
const {respok , resperr } =require('../utils/rest')
let {create_a_uuid , gettimestr }=require('../utils/common')
const {getusernamefromsession}=require('../utils/session')
const { findone,createrow}=require('../utils/db')
const { messages}=require('../configs/messages') 
const { v5 : uuidv5 } =require('uuid')
const { NETTYPE } =require('../configs/net' )
// let NET TYPE='ETH-TESTNET'
const { auth } = require('../utils/authMiddleware' )
const { jweb3 } = require('../configs/configweb3' )
const { iszeroaddress , isaddressvalid } =require('../utils/erc20' )
const { ispositivefloat } =require('../utils/validates')
const { abierc20 } = require( '../contracts/abi/erc20' )  // const Tx= require('ethereumjs-tx' ).Transaction // const Tx= require('ethereumjs-common' ).Transaction// const Tx= require('ethereumjs-common' )
const STRINGER = JSON.stringify
const LOGGER=console.log
const { awaitTx } = require ('await-transaction-mined');
module.exports = router;
const handleaddtoken=async ( web3 , hash ) =>{
	let resp = await awaiTx ( web3 , hash )
	if ( resp ) {}
	else {}

}
router.post ( '/:txhash/:type' , async ( req,res)=>{
	let { txhash , type } = req.params
	let { nettype } = req.query
	if ( nettype ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let web3 = jweb3 [ nettype ]
	if ( web3 ) {}
	else { resperr ( res , 'NETTYPE-NOT-SUPPORTED'  ) ; return }
	// let resp = await awaitt ransactionmined ( web3 , txhash )
	respok ( res ) 
	switch ( type ) {
		case 'ADD-TOKEN' : 
			handleaddtoken ( web3 , txhash  )
		break

	}
})
