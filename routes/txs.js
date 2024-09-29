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
const MAP_ORDER_STATUS = {
  WAITING : 0 ,
  OK : 1, 
  FAIL : 2 ,
  EXPIRED : 3
}
const MAP_TYPECF = { c: 1 , C:1 , f:1, F:1 }
const validate_crypto_withdraw_order = ( { orderpart } )=>{  
}
const validate_fiat_withdraw_order = ( { orderpart })=>{
  
}
const AES = require("crypto-js/aes")
const { ENCKEY_QUOTESIG }   =  require( '../configs/keys' ) // 'BfM58d'

router.post ( '/withdraw', auth , async (req,res)=> {
  let { id : userid , uuid : useruuid } = req.decoded
  let { from , to  } = req.body
  if ( from && to  ){}
  else { resperr( res, messages.MSG_ARGMISSING ); return }
  if ( MAP_TYPECF[ from?.typecf ] && MAP_TYPECF[ to?.typecf ] ) {}
  else { resperr( res, messages.MSG_ARGMISSING ); return }
  switch ( from?.typecf ){
    case 'c' :
    case 'C' : 
      if ( validate_crypto_withdraw_order ( { orderpart : from } ) ) {} 
      else { resperr ( res, messages.MSG_ARGINVALID ); return }
    break
    case 'f' :
    case 'F' : 
      if ( validate_fiat_withdraw_order ( { orderpart : from } ) ) {}
      else { resperr ( res, messages.MSG_ARGINVALID ); return }
    break
  }
  switch ( to?.typecf ){
    case 'c' :
    case 'C' : 
      if ( validate_crypto_withdraw_order ( { orderpart : to } ) ) {} 
      else { resperr ( res, messages.MSG_ARGINVALID ); return }
    break
    case 'f' :
    case 'F' : 
      if ( validate_fiat_withdraw_order ( { orderpart : to } ) ) {}
      else { resperr ( res, messages.MSG_ARGINVALID ); return }
    break
  }  
  try {	let strdecrypted = AES.decrypt ( quotesignature , ENCKEY_QUOTESIG ).toString ( cryptojs.enc.Utf8 )
		let jdecrypted = PARSER (strdecrypted ) ; LOGGER( { jdecrypted } )
  } catch(err){
    resperr(res , 'SERVER-ERROR') ; return
  }
  let uuid = create_a_uuid()
  await db[ 'txorders' ].create ( { 
    useruuid ,
    fromdata : JSON.stringify ( req?.from ) ,
    todata : JSON.stringify ( req?.to ) , 
    uuid ,
    expiry : jdecrypted?.expiry , 
    status : MAP_ORDER_STATUS [ 'WAITING' ] ,
  })
  respok ( res , 'ORDER PLACED' , null , { expiry , uuid , } )
} )
let EXPIRY_ORDER_DEPOSIT_IN_SEC = 1 * 3600 // an hour

const validate_fiat_deposit_order = ( { from  , to })=>{
  if ( from && from?.bankname && from?.bankcode && from?.account && from?.amount ){ }
  else { return false }
  if ( to && to?.bankname && to?.bankcode && to?.account ){}
  else { return false }
  if ( ISFINITE (+from?.amount ) && +from?.amount > 0 ){ }
  else { return false }
  return true 
}
const validate_crypto_deposit_order = ( { from , to }) =>{
  if ( from && from?.address && from?.cryptosymbol && from?.amount  ){}
  else { return false }
  if ( to?.address ){}
  else { return false }
  return true
}
router.post ( '/deposit' , auth , async (req,res)=>{
  let { id : userid , uuid : useruuid } = req.decoded
  let { from , to , typecf } = req.body
  if ( from && to && typecf ){}
  else { resperr( res, messages.MSG_ARGMISSING ); return }
  switch ( MAP_TYPECF[ typecf ] ){
    case 'F' :
    case 'f' : if ( validate_fiat_deposit_order ( { from: req?.from , to : req?.to } ) ){} else { resperr(res, messages.MSG_ARGINVALID ) ; return }
    break
    case 'C' :
    case 'c' : if ( validate_crypto_deposit_order ( { from : req?.from , to : req?.to }) ){} else { resperr( res,messages.MSG_ARGINVALID ) ; return }
    break
    default : resperr ( res , messages?.MSG_ARGINVALID ); return 
    break
  }
  typecf = typecf.toUpperCase()
  let uuid = create_a_uuid()
  let timestamp = moment().unix()
  let expiry = timestamp + EXPIRY_ORDER_DEPOSIT_IN_SEC
  switch ( typecf ){
    case 'F' : 
    case 'C' :
    await db[ 'txorders'].create ( {
      useruuid ,
      fromdata : JSON.stringify ( req?.from )  ,
      todata : JSON.stringify ( req?.to ) ,
/*      frombankname : from?.bankname ,
      frombankcode : from?.bankcode ,
      frombankaccount : from?.account ,
      fromamount : from?.amount ,
      tobankname : to?.bankname ,
      tobankcode : to?.bankcode  ,
      tobankaccount : to?.account , */
      uuid , 
      expiry ,
      status : MAP_ORDER_STATUS [ 'WAITING' ] , // 0
    })
    break
    default : 
    break
  }
  respok ( res, 'ORDER PLACED' , null , { expiry, uuid })
})
  
router.post ( '/deposit/FIAT-ONLY' , auth , async (req,res)=>{
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
  await db[ 'txorders'].create ( {
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
