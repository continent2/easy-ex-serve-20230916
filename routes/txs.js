var express = require('express');
var router = express.Router();
const moment=require('moment')
/* GET home page. */
const {respok , resperr } =require('../utils/rest')
let {create_a_uuid , gettimestr, ISFINITE, convaj }=require('../utils/common')
const {getusernamefromsession}=require('../utils/session')
const { findone,createrow, findall}=require('../utils/db')
const { messages}=require('../configs/messages') 
const { v5 : uuidv5 } =require('uuid')
const { NETTYPE } =require('../configs/net' )
// let NET TYPE='ETH-TESTNET'
const { auth } = require('../utils/authMiddleware' )
const { jweb3 } = require('../configs/configweb3' )
const { iszeroaddress , isaddressvalid } =require('../utils/erc20' )
const { ispositivefloat } =require('../utils/validates')
const { abierc20 } = require( '../contracts/abi/erc20' )  // const Tx= require('ethereumjs-tx' ).Transaction // const Tx= require('ethereumjs-common' ).Transaction// const Tx= require('ethereumjs-common' )
const db=require( '../models' )
const STRINGER = JSON.stringify
const LOGGER=console.log
const MAP_ORDER_STATUS = {
  WAITING : 0 ,
  OK : 1, 
  FAIL : 2 ,
  EXPIRED : 3
}
const MAP_TYPECF = { c: 'C' , C:'C' , f:'F', F:'F' }
const validate_crypto_withdraw_order = ( { orderpart } )=>{  
}
const validate_fiat_withdraw_order = ( { orderpart })=>{
}
const AES = require("crypto-js/aes")
const { ENCKEY_QUOTESIG }   =  require( '../configs/keys' ); // 'BfM58d'
const { sendmessage : sendmessage_telegram } = require('./notify-telegram');
const { sendMessage : sendmessage_sms } = require( '../services/twilio' )
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
    fromdata : JSON.stringify ( req?.body?.from ) ,
    todata : JSON.stringify ( req?.body?.to ) , 
    uuid ,
    expiry : jdecrypted?.expiry , 
    status : MAP_ORDER_STATUS [ 'WAITING' ] ,
  })
  respok ( res , 'ORDER PLACED' , null , { expiry , uuid , } )
  let respadminsettings= await findall( 'adminsettings' , {active: 1} )
  if (respadminsettings?.length ){      }
  else { return }
  let jsettings = convaj( respadminsettings , 'key_', 'value_' )
  if ( +jsettings[ 'NOTIFY_VIA_TELEGRAM' ]){
    sendmessage_telegram ( {title:'REQ-WITHDRAW', msg: 
      STRINGER({ 
        from:{ ... req?.body?.from },
        to : { ... req?.body?.to } ,
        uuid , 
        expiry
      })
    })
  }
  else {}
  if ( +jsettings[ 'NOTIFY_VIA_SMS' ]){
    let phonenumber = +jsettings[ 'SMS_RECEIVE_PHONE_NUMBER' ]
    await sendmessage_sms ( { type : 'ORDER-NOTIFY', code : null ,  order : req?.body , phonenumber } )
  } else {}
} )
let EXPIRY_ORDER_DEPOSIT_IN_SEC = 1 * 3600 // an hour

const validate_fiat_deposit_order = async ( { from  , to })=>{ LOGGER( {from,to})
  if ( from && from?.bankname && from?.bankcode && from?.account && from?.amount ){ }
  else { return {ok:false , code: '10001' }  }
  if ( to && to?.bankname && to?.bankcode && to?.account ){}
  else { return {ok:false , code: '10002' } }
  if ( ISFINITE (+from?.amount ) && +from?.amount > 0 ){ }
  else { return {ok:false , code: '10003' } }  
  return {ok:true  , code: null }
}
const validate_crypto_deposit_order = async ( { from , to }) =>{
  if ( from && from?.symbol && from?.address && from?.amount  ){}
  else { return {ok: false , code: '10004'}  }
  if ( to?.symbol && to?.address ){}
  else { return {ok: false , code: '10005'} }

  return { ok : true , code : null} 
}
router.post ( '/deposit' , auth , async (req,res)=>{
  let { id : userid , uuid : useruuid } = req.decoded
  let { from , to , typecf } = req.body
  if ( from && to && typecf ){}
  else { resperr( res, messages.MSG_ARGMISSING ); return }
  switch ( MAP_TYPECF[ typecf ] ){
    case 'F' :
    case 'f' : {
      let { ok , code } =await validate_fiat_deposit_order ( { from: req?.body?.from , to : req?.body?.to } )
      if ( ok ){} else { resperr(res, messages.MSG_ARGINVALID , code ) ; return }
    } 
    break
    case 'C' :
    case 'c' : {
      let { ok , code } = await validate_crypto_deposit_order ( { from : req?.body?.from , to : req?.body?.to })
      if ( ok ){} else { resperr( res,messages.MSG_ARGINVALID , code ) ; return }
    } 
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
      fromdata : JSON.stringify ( req?.body?.from )  ,
      todata : JSON.stringify ( req?.body?.to ) ,
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
/** SEND MESSAGE */
let respadminsettings= await findall( 'adminsettings' , {active: 1} )
if (respadminsettings?.length ){      }
else { return }
let jsettings = convaj( respadminsettings , 'key_', 'value_' )
if ( +jsettings[ 'NOTIFY_VIA_TELEGRAM' ]){
  sendmessage_telegram ( {title:'REQ-WITHDRAW', msg: 
    STRINGER({ 
      from:{ ... req?.body?.from },
      to : { ... req?.body?.to } ,
      uuid , 
      expiry
    })
  })
}
else {}
if ( +jsettings[ 'NOTIFY_VIA_SMS' ]){
  let phonenumber = +jsettings[ 'SMS_RECEIVE_PHONE_NUMBER' ]
  await sendmessage_sms ( { type : 'ORDER-NOTIFY', code : null ,  order : req?.body , phonenumber } )
} else {}
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
module.exports = router
