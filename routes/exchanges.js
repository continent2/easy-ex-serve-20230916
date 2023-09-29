var express = require("express");
var router = express.Router();
const {
  findone,
  findall,
  createrow,
  updaterow,
  countrows_scalar,
  createorupdaterow,
updateorcreaterow 
} = require("../utils/db");
// const { updaterow: updaterow_mon } = require("../utils/dbm on");
const KEYS = Object.keys;
const { JWT_SECRET } = require ( '../configs/configs')
const {
  LOGGER,
  generaterandomstr,generaterandomnumber ,
  generaterandomstr_charset,
  gettimestr,
  convaj,
	deletejfields ,
	gettime ,generaterandomhex , create_a_uuid
} = require("../utils/common");
const {
  respok,
  respreqinvalid,
  resperr,
  resperrwithstatus,
} = require("../utils/rest");
const { messages } = require("../configs/messages");
const { getuseragent, getipaddress } = require("../utils/session");
const {
  sendemail,
  sendemail_customcontents_withtimecheck,
} = require("../services/mailer");
const { sendMessage } =require('../services/twilio') 
const sha256=require( 'js-sha256' )
const { validatepw ,
	validateusername  ,
	validateemail } = require("../utils/validates");
const db = require("../models");
// const db mon=require('../modelsmongo')
const { getusernamefromsession } = require("../utils/session");
// const { createrow:createrow_mon , updaterow : updaterow_mon }=require('../utils/d bmon')
const TOKENLEN = 48;
const { web3, createaccount , jweb3 } = require("../configs/configweb3");
//const { getWal letRecode } = require("../utils/wallet_recode");
const { getWalletRecode } = require("../utils/wallet_recode");
const { getMetaplanetRecode } = require("../utils/wallet_recode_metaplanet");
const { getPolygon } = require("../utils/get_polygon");
const { generateSlug } = require("random-word-slugs");
const { MAP_USER_ACTIONS } = require("../configs/configs");
const moment = require("moment");
const { NETTYPE }=require('../configs/net')
const uuid=require('uuid')
const jwt = require('jsonwebtoken');
const { auth}=require('../utils/authMiddleware')
let { Op } = db.Sequelize;
const { createLogger , transports , format } = require('winston')
const { querybalance } = require('../utils/erc20' ) 
const secureobj = obj=>{ delete obj?.pw ; delete obj?.privatekey } 
module.exports = router;
const PARSER = JSON.parse
const MAP_FLIP_TYPES={ CF: 'FC', FC:'CF' }
const send_deposit_noti=async ({ order } )=>{
	let lstrcvrs = await findall ( 'admins' , { active : 1 } )
	let N = lstrcvrs?.length
	for ( let idx = 0 ; idx< N ; idx ++ ){ let rcvr = lstrcvrs [ idx ]
		await sendMessage ( { type: 'WITHDRAW' , order , phone : rcvr?.phonenumber } )	
	}
}
const sendcoin=async ({ order })=>{
	if ( order?.nettype ) {}
	else { LOGGER( `!!! nettype missingi@sendcoin`) ; return }
	let web3 = jweb3 [ order?.nettype ]
	let jsender={}
	let respsender = await findone ( 'settings', { key_:'MASTER-RESERVE-ACCOUNT' } )
	if ( respsender ) {
		jsender = PARSER ( respsender?.value_ )
		if ( jsender?.address && jsendr?.privatekey ) { }
	}
	else { LOGGER( `!!! sender missing@sendcoin` ); return }
	let sender = web3.eth.accounts.privateKeyToAccount( jsender?.privatekey ) 
	web3.eth.accounts.wallet.add( sender )  // MariaDB [addresstrade]> insert into settings (key_,value_,acative,subkey_) values ( 'FEE-SEND-COIN' , '0.002',1,'KLAY');

	if ( order?.addressfinal ) {}
	else { LOGGER(`!!! addressfinal missing@sendcoin` );return } 
	let TXFEE= '0.001'
	let respfee = await findone ( 'settings' , { key_:'FEE-SEND-COIN',subkey_: order?.nettype , active:1 } )
	if ( respfee && respfee?.value_ ) { TXFEE = respfee?.value_ }
	else {}
	let resp = await 	  web3.eth
      .sendTransaction({
        from: jsender.address,
        to: order?.addressfinal , // '0xd56a6bf50f1ccEC4a9d13c54f6fB731dD7466aa2' , // 0x1062DAd3c5f8330D721566370d384D5c6b80634F',
        value: getweirep( +order?.toamount - +TXFEE ),
				gasLimit : 21000
  })
	await updaterow ( 'orders' , { id: order?.id } , { active : 0 , status : 5 } )
	return resp?.txHash || resp?.transactionHash || resp?.hash
}
const send_crypto_per_order=async _=>{
	let list = await findall ( 'orders' , { active : 1 , status : 1 , type : 'FC' } )
	let N = list?.length
	for ( let idx = 0 ; idx< N ; idx ++ ){
		let order = list [ idx ] 
		let resptoken  = await findone ( 'tokens' , { symbol : order?.quote , nettype : order?.nettype } )
		if ( resptoken ) {}
		else { LOGGER( `!!! token not defined ${ order }` ) ;  continue }
		l
	}

}
const track_balance_crypto=async _=>{
	let list = await findall ( 'orders' , { active : 1 , status : 0 , typestr: 'CF' 
	} )
	let N = list?.length
	for ( let idx = 0 ; idx< N ; idx ++ ){
		let order = list [ idx ]
		let resptoken = await findone ( 'tokens' , { symbol :order?.base ,  active : 1 } )
		if ( resptoken ) {}
		else { LOGGER( `!!! token not defined ${ order }` ) ;  continue }
		let resp = await querybalance ( { nettype : order?.nettype , contractaddress : resptoken?.address , useraddress : order?.receiveaddress })
		let amountin 
		if ( resp && ( amountin = Web3.utils.fromWei ( ''+ resp ) ) ) {
			if ( +amountin >= +order?.fromamount ) {
				await send_deposit_noti( { order } )				
			}
		}
		else { LOGGER('invalid amount' ); }
	}
}
setInterval( async ()=>{
	track_balance_crypto()
	
	setTimeout ( async ()=>{
		send_crypto_per_order()
	}, 30 * 1000 )

} , 60 * 1000 )
const getrowforpair=async({ quote,base})=>{
	let resp = await findone ( 'tickers', { quote , base, active:1} )
	if ( resp ) { return resp}
	else {}
	resp = await findone ( 'tickers' , { quote : base , base : quote , active : 1 } ) 
	if ( resp ) { }
	else { return null } 
	let { value ,fromamount , toamount ,  } = resp 
	resp.value = 1/+value
	resp.fromamount = toamount
	resp.toamount = fromamount
	resp.quote = base
	resp.base = quote
	resp.typestr = MAP_FLIP_TYPES [ resp?.typestr]
	return resp
}
const ISFINITE = Number.isFinite
router.get ( '/quote' , async ( req,res)=>{
	let { quote , base, amount } = req.query
	if ( quote && base ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	if ( amount ){}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	amount = +amount
	if ( ISFINITE( amount)){}
	else { resperr ( res, messages.MSG_ARGINVALID ) ; return }

	let resprate = await getrowforpair ( { quote , base } )
	if ( resprate ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let toamount = amount * resprate?.value 

	let respfee = await findone ( 'settings' , { key_:'FEE-RATE', active : 1 } )
	if ( respfee && respfee?.value_ ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ); return }

	let feeamount =  toamount * +respfee?.value_ / 100 
	toamount -= feeamount
	let quotesignature = generaterandomhex( 100 ) 
	respok ( res, null,null, { respdata: { ... resprate , toamount , feeamount ,
		quotesignature ,	
		 feeinfo : respfee } } )
})
const ORDER_EXPIRES_IN_SEC_DEF = 3600
// const PARSER = JSON.parse
router.post ( '/request-tracknumber' , auth , async ( req,res)=>{
	let { uuid : useruuid } = req?.decoded
	let { nettype } = req?.query
	let { quote , 
		base , 
		fromamount , 
		toamount , 
		feeamount , 
		quotesignature, 
		typestr ,
		bank , 
		addressfinal
	} = req.body
	if (quote && base && fromamount && toamount && feeamount && quotesignature && typestr )	{}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	if ( MAP_FLIP_TYPES[ typestr] ) {}
	else { resperr ( res, messages.MSG_ARGINVALID ) ; retur }
	let uuid = create_a_uuid ( )
	let receiveacct = {}, receivebank = {}
	let expirydur = ORDER_EXPIRES_IN_SEC_DEF
	let respexp = await findone ( 'settings', { active : 1 , key_:'ORDER-EXPIRES-IN-SEC' } )
	if ( respexp && ISFINITE( +respexp?.value_)){ expirydur = +respexp?.value_ } 
	else {}  
	let expiry = moment().unix() + expirydur 
	let		 expirystr = moment.unix ( expiry ).format('YYYY-MM-DDTHH:mm:ss')
	switch ( typestr ){
		case 'CF' :
			receiveacct = createaccount()
			receiveacct.receiveaddress = receiveacct?.address
			receiveacct.privatekey = receiveacct?.privateKey 
			if ( bank && bank?.bankname && bank?.bankaccount && bank?.banknation && bank?.bankaccountholder ) {}
			else { resperr ( res, messages.MSG_ARGMISSING , null, { MISSING: 'RECEIVING-BANK-ACCOUNT' } ) ; return } 
		break
		case 'FC' : 
			if ( bank && bank?.bankname && bank?.bankaccount && bank?.banknation && bank?.bankaccountholder ) {}
			else { resperr ( res, messages.MSG_ARGMISSING, null, { MISSING: '' }  ) ; return } 
		
			if ( addressfinal ) {}
			else { resperr ( res, messages.MSG_ARGMISSING, null , { reason : 'addressfinal' } ) ; return } 
	
			let respbank = await findone ( 'settings', { key_:'RECEIVE-BANK-ACCOUNT',active:1} )
			if ( respbank && respbank?.value_ ){
				receivebank =  respbank?.value_
			} else {resperr( res,messages.MSG_INTERNALERR ) ; return }
		break
	}
	let resp = await createrow	( 'orders',{ 
//		feerate ,
	uuid     
,		 active : 1 
,		 feeamount
// ,		 feerate  
// ,		 feerateun
// ,		 typecode 
,		 typestr  
// ,		 auxdata  
// ,		 txhash   
// ,		 status   
,		 expiry
,		expirydur 
,		 useruuid 
,		 nettype : nettype || req?.decoded?.nettype  
,		 expirystr // : moment.unix ( expiry ).format('YYYY-MM-DDTHH:mm:ss')
,		 timestamp : moment().unix()
// ,		 timestamp
//,		 timestamp
,		 issettled : 0
//	,		 timeinsec
//	,		 txhashpay
,		 statusint : -1
//	,		 refundadd
,		 quote    
,		 base    
//	,		 receiveaddress
//	,		 privatekey
,	... receiveacct
, ... receivebank
	, fromamount
	, toamount
	, ... bank
	, addressfinal : addressfinal || null
	})
	respok ( res , null,null , { respdata: {
		expiry ,
		expirystr ,
		expirydur ,
		uuid ,
		address : receiveacct?.address ,
		receivebank : receivebank || null //  
//		receivebank : ( receivebank? PARSER ( receivebank  ) : null ) 
	}} )
})
/** 
	uuid                     | varchar(80)      | YES  | MUL | NULL                |                               |
,		 active                   | tinyint(4)       | YES  |     | NULL                |                               |
,		 feeamount                | varchar(20)      | YES  |     | NULL                |                               |
,		 feerate                  | varchar(20)      | YES  |     | NULL                |                               |
,		 feerateunit              | varchar(20)      | YES  |     | NULL                |                               |
,		 receiveaddress           | varchar(80)      | YES  |     | NULL                |                               |
,		 typecode                 | int(10) unsigned | YES  |     | NULL                |                               |
,		 typestr                  | varchar(40)      | YES  |     | NULL                |                               |
,		 auxdata                  | text             | YES  |     | NULL                |                               |
,		 txhash                   | varchar(80)      | YES  |     | NULL                |                               |
,		 status                   | tinyint(4)       | YES  |     | NULL                |                               |
,		 expiry                   | bigint(20)       | YES  |     | NULL                |                               |
,		 privatekey               | varchar(80)      | YES  |     | NULL                |                               |
,		 useruuid                 | varchar(80)      | YES  |     | NULL                |                               |
,		 nettype                  | varchar(40)      | YES  |     | NULL                |                               |
,		 expirystr                | varchar(30)      | YES  |     | NULL                |                               |
,		 reqpatternlen            | int(11)          | YES  |     | NULL                |                               |
,		 timestampunix            | bigint(20)       | YES  |     | NULL                |                               |
,		 minermacaddress          | varchar(80)      | YES  |     | NULL                |                               |
,		 timestamppaid            | bigint(20)       | YES  |     | NULL                |                               |
,		 timestampdeliverpromised | bigint(20)       | YES  |     | NULL                |                               |
,		 issettled                | tinyint(4)       | YES  |     | NULL                |                               |
,		 timeinsec                | bigint(20)       | YES  |     | NULL                |                               |
,		 txhashpayout             | varchar(80)      | YES  |     | NULL                |                               |
,		 statusint                | int(11)          | YES  |     | -1                  |                               |
,		 refundaddress            | varchar(80)      | YES  |     | NULL                |                               |
,		 timetoforcepurge         | bigint(20)       | YES  |     | NULL                |                               |
,		 quote                    | varchar(20)      | YES  |     | NULL                |                               |
,		 base    
  */
router.get ( '/rate' , async ( req,res)=>{
	let { quote , base }	 = req.query
	if ( quote && base ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let resprate = await getrowforpair ( { quote , base } )
	if ( resprate ) { }
	else { resperr ( res, messagse.MSG_DATANOTFOUND ) ; return }
	respok ( res, null,null, { respdata: resprate } )
})
/**	quote: KRW
      base: USDT
     value: 1329.93
fromamount: 1
  toamount: 1329.93
   typestr: CF
    source: NULL
    active: 1
*/
/** const loggerwin = createLogger ( {
	format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf( info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: '/var/www/html/magic3.co/logs/logs.log',
      json: true , // false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ]
});
*/


