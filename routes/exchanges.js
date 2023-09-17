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
const { web3, createaccount } = require("../configs/configweb3");
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
const secureobj = obj=>{ delete obj?.pw ; delete obj?.privatekey } 
module.exports = router;
const MAP_FLIP_TYPES={ CF: 'FC', FC:'CF' }

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

router.post ( '/request-tracknumber' , auth , async ( req,res)=>{
	let { uuid : useruuid } = req?.decoded
	let { quote , base , fromamount , toamount , feeamount , quotesignature } = req.body
	if (quote && base && fromamount && toamount && feeamount && quotesignature  )	{}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let uuid = create_a_uuid ( )
	let resp = await createrow	( { 
		uuid , 
			

	})
	respok ( res , null,null , {} )
})
/** 
uuid                     | varchar(80)   
| price                    | varchar(40) 
| priceunit                | varchar(20) 
| item                     | varchar(80) 
| itemuuid                 | varchar(80) 
| priceraw                 | varchar(80) 
| pricedisp                | varchar(40) 
| active                   | tinyint(4)  
| feeamount                | varchar(20) 
| feerate                  | varchar(20) 
| feerateunit              | varchar(20) 
| receiveaddress           | varchar(80) 
| typecode                 | int(10) unsi
| typestr                  | varchar(40) 
| auxdata                  | text        
| txhash                   | varchar(80) 
| status                   | tinyint(4)  
| expiry                   | bigint(20)  
| privatekey               | varchar(80) 
| useruuid                 | varchar(80) 
| reqprefix                | varchar(40) 
| reqsuffix                | varchar(40) 
| nettype                  | varchar(40) 
| expirystr                | varchar(30) 
| reqpatternlen            | int(11)     
| timestampunix            | bigint(20)  
| minermacaddress          | varchar(80) 
| timestamppaid            | bigint(20)  
| timestampdeliverpromised | bigint(20)  
| issettled                | tinyint(4)  
| timeinsec                | bigint(20)  
| txhashpayout             | varchar(80) 
| statusint                | int(11)     
| refundaddress            | varchar(80) 
| timetoforcepurge  */



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
