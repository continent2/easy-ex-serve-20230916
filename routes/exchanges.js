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
const invalidate_order = async ({ order }) =>{
	await updaterow ( 'orders' , { id : order?.id } , { active: 0 , status : 4 
		, statusstr  :'EXPIRED'
	} ) 
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
		let timenow = gettime().unix()
		if ( resp && ( amountin = Web3.utils.fromWei ( ''+ resp ) ) ) {
			if ( +amountin >= +order?.fromamount ) {
		
			let timedeliverdue
			let timedurdeliver = 3600
			let respsetting   = await findone ( 'settings' , { active : 1 , key_: 'DELIVERY-PROMISED-IN-SEC', subkey_ : 'CF' } )
			if ( respsetting && respsetting?.value_ ) { 
				timedurdeliver = +respsetting.value_
			} else {}
			timedeliverdue = timenow + timedurdeliver 
			await updaterow ( 'orders', { id : order?.id } , { status : 1
					, timestampdeposit : timenow 
					, statusstr   : 'RECEIVED' 
					, depositamount : ''+amountin 
					, timedeliverdue
					, durationdeliver : timedurdeliver  
				 })
				await send_deposit_noti( { order } )	
			}
			else {	
				if ( timenow > order?.expiry ) { 
					await invalidate_order ({ order } ) 
				} 
				else {}
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
const get_logos=async _=>{
	let list = await findall ( 'tokens' , { active : 1 } )
	let jsymbol_logo = {}
	let N = list?.length
	for ( let idx = 0 ; idx < N ; idx ++ ){
		let { symbol , urllogo } = list[idx]
		jsymbol_logo[ symbol ] = urllogo	
	}
	return jsymbol_logo
}
router.get ( '/pairs/:typestr' , async ( req, res )=>{
	let { typestr } = req.params
	let jtype ={}
	switch ( typestr ) {
		case 'CF' :
		case 'FC' : jtype = { typestr }
		break
		case '_' : 
		break  
		default : resperr ( res, messages.MSG_ARGINVALID ) ; return 
		break
	}
	let list = await findall ( 'pairs' , { active : 1 , ... jtype } )
	let abq = [] , jbq={}
	let N = list?.length
	let jlogos = await get_logos ()

	for ( let idx = 0 ; idx<N ; idx ++ ){
		let row = list [ idx ]
		let { base , quote , tickersymbol } = row
		row [ 'urllogobase' ] = jlogos[ base ]
		row [ 'urllogoquote'] = jlogos[ quote]
	}
	for ( let idx =  0; idx < N ; idx ++ ){
		let row = list [ idx ]
		let { base , quote , tickersymbol } = row
		if ( jbq[ base] ) {
		} else { jbq[ base ] = {} 
		}
		jbq[ base ] [ quote ] = row	
	}
/** 	for ( let idx =0 ; idx < N ; idx ++ ) {
		let row = list [ idx ]
		let { base , quote , tickersymbol } = row
		list [ idx].urllogobase = jlogos[ base ] 
		list [ idx].urllogoquote= jlogos[ quote] 
		jbq[ base ] [quote ].
	} */
	respok ( res, null,null, { 
		list , 
		jbase_quote : jbq , 
		payload : { count : N }  } )
})
/**      quote: KRW
           base: USDT
     fromamount: 1
       toamount: 1329.93
   exchangerate: 1329.93
      fixedrate: 1329.93
isusedfixedrate: NULL
         active: 1
        typestr: CF
           uuid: 0c2df1f0-51ee-5ee1-baed-c8a1e0c3fcc9
*/
const AES = require("crypto-js/aes");
const STRINGER = JSON.stringify
const ENCKEY_QUOTESIG  = 'BfM58d'

router.post ( '/test/decrypt' , async ( req,res)=>{
	let { quotesignature } = req.body
	if ( quotesignature ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return } 
	try {	let strdecrypted = AES.decrypt ( quotesignature , ENCKEY_QUOTESIG ).toString ( cryptojs.enc.Utf8 )
		let jdecrypted = PARSER (strdecrypted ) ; LOGGER( { jdecrypted } )
		respok ( res, null,null , { ... jdecrypted } ) 
		return 
	} catch ( err ) {
		resperr ( res, messages.MSG_ARGINVALID ) ; return }
	})
router.get ( '/quote' , async ( req,res)=>{LOGGER(req?.query )
	let { quote , base, amount } = req.query
	if ( quote && base ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	if ( amount ){}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let fromamount_input = '' + amount 
	amount = +amount
	if ( ISFINITE( amount)){}
	else { resperr ( res, messages.MSG_ARGINVALID ) ; return }

	let resprate = await getrowforpair ( { quote , base } )
	if ( resprate ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let toamount = amount * +resprate?.value 
	LOGGER( {resprate })
	let respfee = await findone ( 'settings' , { key_:'FEE-RATE', active : 1 } )
	if ( respfee && respfee?.value_ ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ); return }

	let feeamount_to =  toamount * +respfee?.value_ / 100 
	let feeamount_from =  amount * +respfee?.value_ / 100 
	let fromamount = amount

	fromamount -= feeamount_from
	toamount -=  feeamount_to
	let feeamount = feeamount_from
	fromamount = ''+fromamount 
	toamount = ''+toamount
	feeamount = ''+feeamount
//	let quotesignature = generaterandomhex( 100 ) 
	let quotesignature = AES.encrypt( STRINGER( { 
//		timeinsec , 
	//	price:''+price , 
		// priceunit:'KLAY' 
		fromamount : fromamount_input  ,
		toamount ,
		feeamount ,
		base , 
		quote ,
	} ), ENCKEY_QUOTESIG ).toString()

	respok ( res, null,null, { respdata: { ... resprate , 
		base ,
		quote ,
		fromamount : fromamount_input ,
		toamount , 
		feeamount ,
		exchangerate : '' + resprate?.value ,
		quotesignature ,	
		feeamountunit : base ,
		 feeinfo : respfee } } )
})
const ORDER_EXPIRES_IN_SEC_DEF = 3600 // const PARSER = JSON.parse
const map_typestr = { FC : 1 , CF : 1 }
const cryptojs = require("crypto-js");

router.post ( '/request-tracknumber' , auth , async ( req,res)=>{ LOGGER(req.body )
	let { uuid : useruuid } = req?.decoded
	let { nettype } = req?.query
	let { quote , 
		base , 
		fromamount , 
		toamount , 
		feeamount , 
		feeamountunit , 
		quotesignature, 
		typestr ,
		bank , 
		addressfinal , 
		exchangerate
	} = req.body
	if (quote && base && fromamount && toamount && feeamount && feeamountunit && quotesignature && typestr && exchangerate  )	{}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	if ( MAP_FLIP_TYPES[ typestr] ) {}
	else { resperr ( res, messages.MSG_ARGINVALID ) ; retur }

	let strdecrypted 
	try {	strdecrypted = AES.decrypt ( quotesignature , ENCKEY_QUOTESIG ).toString ( cryptojs.enc.Utf8 )
	} catch ( err){
		resperr ( res, messages.MSG_ARGINVALID , null , { reason : 'quotesignature,signature invalid'}) ; return 
	}
	let jdecrypted = PARSER (strdecrypted ) ; LOGGER( { jdecrypted } )
	if ( 
		jdecrypted?.fromamount == ''+fromamount &&
		jdecrypted?.toamount == ''+toamount &&
		jdecrypted?.feeamount == ''+feeamount &&
		jdecrypted?.base == ''+base &&
		jdecrypted?.quote == ''+quote 
	) {}
	else { resperr (res , messages.MSG_ARGINVALID , null, { reason : 'quotesignature,decrypted field mismatches' } ) ; return }
	let uuid = create_a_uuid ( )
	let receiveacct = {}, receivebank = {}

	let expirydur = ORDER_EXPIRES_IN_SEC_DEF
	let respexp = await findone ( 'settings', { active : 1 , key_:'ORDER-EXPIRES-IN-SEC' , subkey_ : typestr } )
	if ( respexp && ISFINITE( +respexp?.value_)){ expirydur = +respexp?.value_ } 
	else {}  
	let expiry = moment().unix() + expirydur 
	let	expirystr = moment.unix ( expiry ).format('YYYY-MM-DDTHH:mm:ss')

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
,		expiry
,		expirydur 
,		expirystr // : moment.unix ( expiry ).format('YYYY-MM-DDTHH:mm:ss')
,		 useruuid 
,		 nettype : nettype || req?.decoded?.nettype  
,		 timestampunix : moment().unix()
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
	, statusstr : 'WAITING'
	, exchangerate
	, feeamountunit 
	})
	respok ( res , null,null , { respdata: {
		expiry ,
		expirystr ,
		expirydur ,
		uuid ,
		address : receiveacct?.address || null ,
		receiveaddress : receiveacct?.address || null ,
		receivebank : receivebank || null //  
//		receivebank : ( receivebank? PARSER ( receivebank  ) : null ) 
	}} )
}) // request-tracknumber
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
,		 timedeliverdue | bigint(20)       | YES  |     | NULL                |                               |
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

/** uuid                   | varchar(80)  
| active                   | tinyint(4)   
| feeamount                | varchar(20)  
| feerate                  | varchar(20)  
| feerateunit              | varchar(20)  
| receiveaddress           | varchar(80)  
| typecode                 | int(10) unsig
| typestr                  | varchar(40)  
| auxdata                  | text         
| txhash                   | varchar(80)  
| status                   | tinyint(4)   
| expiry                   | bigint(20)   
| privatekey               | varchar(80)  
| useruuid                 | varchar(80)  
| nettype                  | varchar(40)  
| expirystr                | varchar(30)  
| timestampunix            | bigint(20)   
| timestamppaid            | bigint(20)   
| timedeliverdue | bigint(20)   
| issettled                | tinyint(4)   
| txhashpayout             | varchar(80)  
| statusint                | int(11)      
| refundaddress            | varchar(80)  
| quote                    | varchar(20)  
| base                     | varchar(20)  
| expirydur                | bigint(20)   
| fromamount               | varchar(20)  
| toamount                 | varchar(20)  
| bankname                 | varchar(40)  
| bankaccount              | varchar(40)  
| banknation               | varchar(20)  
| bankaccountholder        | varchar(100) 
| banksender               | text         
| addressfinal             | varchar(80)  
| type                     | varchar(40)  
| requestdepositconfirm    | int(11)      
| feeamountunit            | varchar(20)  
| depositamount            | varchar(20)  
| timestampdeposit         | bigint(20)   
| exchangerate             | varchar(30)  
| withdrawaccount          | varchar(200) 
| wthdrawamount            | varchar(20)  
| writername               | varchar(40)  
| writeruuid               | varchar(80)  
| writerid                 | int(11)      
| withdrawtypestr          | varchar(60) */

