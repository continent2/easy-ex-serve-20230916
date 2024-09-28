var express = require('express');
var router = express.Router();
const moment=require('moment')
/* GET home page. */
const {respok , resperr } =require('../utils/rest')
let {create_a_uuid , gettimestr, ISFINITE }=require('../utils/common')
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


let EXPIRY_ORDER_DEPOSIT_IN_SEC = 1 * 3600 // an hour
router.post ( '/deposit' , auth , async (req,res)=>{
  let { id : userid , uuid : useruuid } = req.decoded
  let { from , to } = req.body
  if ( from && to ){}
  else { resperr( res, messages.MSG_ARGMISSING ); return }
  if ( from?.bankname && from?.bankcode && from?.account && from?.amount ){}
  else { resperr (res, messages?.MSG_ARGMISSING); return }
  if ( to?.bankname && to?.bankcode && to?.account ){}
  else { resperr (res, messages?.MSG_ARGMISSING); return }
  if ( ISFINITE (+from?.amount ) && +from?.amount > 0 ){}
  else {resperr(res , messages?.MSG_ARGINVALID) ; return }
  let uuid = create_a_uuid()
  let timestamp = moment().unix()
  let expiry = timestamp + EXPIRY_ORDER_DEPOSIT_IN_SEC
  await db[ 'txorder'].create ( {
    useruuid ,
    frombankname : from?.bankname ,
    frombankcode : from?.bankcode ,
    frombankaccount : from?.account ,
    fromamount : from?.amount ,
    tobankname : to?.bankname ,
    tobankcode : to?.bankcode  ,
    tobankaccount : to?.account ,
    uuid , 
    expiry
  })
  respok ( res, null , null , { uuid , expiry })
} )
router.get ( '/deposit/info' , auth , async (req,res ) =>{
  let { id : userid , uuid : useruuid } = req.decoded
})
