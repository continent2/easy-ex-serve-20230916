var express = require('express');
var router = express.Router();
const {findone,findall,createrow , updaterow
, countrows_scalar
, createorupdaterow
	, fieldexists
	, incrementrow	
}=require('../utils/db')
// const { updaterow : updaterow_mon}=require('../utils/dbm on')
const KEYS=Object.keys 
const {LOGGER,generaterandomstr , generaterandomstr_charset , gettimestr
	, convaj
 }=require('../utils/common')
const {respok,respreqinvalid,resperr , resperrwithstatus } =require('../utils/rest')
const {messages}=require('../configs/messages')
const {getuseragent , getipaddress}=require('../utils/session')
const {sendemail, sendemail_customcontents_withtimecheck}=require('../services/mailer')
const {validateemail}=require('../utils/validates')
const db=require('../models')
// const dbmon=require('../modelsmongo')
const {getusernamefromsession}=require('../utils/session')
// const { createrow:createrow_mon , updaterow : updaterow_mon }=require('../utils/dbmon')
const TOKENLEN=48
const { web3, createaccount }=require('../configs/configweb3')
//const { getWalletRecode } = require("../utils/wallet_recode");
const { getWalletRecode } = require("../utils/wallet_recode");
const { getMetaplanetRecode } = require("../utils/wallet_recode_metaplanet");
const { getPolygon } = require("../utils/get_polygon");
const { auth , softauth }= require('../utils/authMiddleware');
const { Op } = require('sequelize');
const MAP_TABLES_FORBIDDEN={ users : 1 }
// let nettype='ETH-TESTNET'
// router.get( "/singlerow/:tablename/:fieldname/:fieldval" , softauth , async (req, res) => {
router.get( "/singlerow/:tablename/:fieldname/:fieldval" // , auth 
	, async (req, res) => {
/*	let userid , useruuid 
	if ( req?.decoded ) {
		userid =req?.decoded?.id 
		useruuid  = req?.decoded?.uuid
	} else {} */
  let { tablename, fieldname, fieldval } = req.params;
	if ( MAP_TABLES_FORBIDDEN[ tablename ] ){resperr( res, 'ACCESS-FORBIDDEN' ) ; return } else {}
  if (tablename && fieldname && fieldval) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
    let jfilter = {}; 
    jfilter[fieldname] = fieldval;
    if (req.query && KEYS(req.query).length) {
      let akeys = KEYS(req.query);
      for (let i = 0; i < akeys.length; i++) {
        let elem = akeys[i]; //       forEach (elem=>{
				let respfieldex = await fieldexists	( tablename , elem ) 
				if ( respfieldex ) {}
				else { continue }
				let jupdate={}
				jupdate [ elem ] = req?.query [ elem ]
      	jfilter = { ...jfilter, ... jupdate };
      }
    } else {
    }
		LOGGER( { jfilter })
//		if ( use ruuid ) {  	  respfindone = await findone(tablename, { ...jfilter  , use ruuid  });		}
	//	else {
		let respfindone = await findone(tablename, { ...jfilter  }); LOGGER( { respfindone } )
//		}
		let iteminfo  //		if ( respfindone && respfindone?.itemuuid ) {		} 
		if ( tablename == 'sales' ) {
			let item = await findone ( 'items' , { uuid : respfindone?.itemuuid } )
			delete item?.privatekey
			let trackpay = await findone ( 'trackpays' , { itemuuid : item?.uuid } ) 
    	respok(res, null, null, { respdata: { ... respfindone , item , trackpay : trackpay || null	//			, iteminfo
			} });
//			return
		}
		else if ( tablename == 'items' && respfindone ) {
			if ( +respfindone?.isclaimed   ) {}
			else { delete respfindone?.privatekey }
	    respok(res, null, null, { respdata: { ... respfindone		} })
		} 
		else {
	    respok(res, null, null, { respdata: { ... respfindone		} })
		}
	if ( respfindone ) {
		if ( tablename == 'items' ) {
			incrementrow( { table : tablename , id : respfindone?.id , fieldname : 'countviews' , incvalue : +1 })
		} if ( tablename=='sales' ){
			incrementrow( { table : tablename , id : respfindone?.id , fieldname : 'countviews' , incvalue : +1 })
			incrementrow( { table : 'items'   , id : respfindone?.id , fieldname : 'countviews' , incvalue : +1 })
		}
	}
});

router.get('/:tablename' , (req,res)=>{
	let { tablename } =req.params
	findall ( tablename , {}).then(resp=>{
		respok ( res, null ,null , { list : resp } )
	})
})

router.put('/row/:tablename/:fieldname/:fieldval', (req,res)=>{
	let { tablename , fieldname , fieldval } =req.params ;	LOGGER('' , req.body)
	fieldexists (tablename , fieldname).then(resp=>{
		if(resp){}
		else {resperr( res, messages.MSG_FIELDNOTFOUND); return }
		let jfilter={}
		jfilter[ fieldname ]  = fieldval
		updaterow( tablename , { ... jfilter } , {... req.body} ).then(resp=>{
			respok ( res ) 
		})
	})
})
let jsymbol_urllogo = {}
const conv_symbol_urllogo = async ({symbol })=>{ let urllogo
	if ( urllogo = jsymbol_urllogo[ symbol] ){ return urllogo }
	let resp = await findone ( 'tokens' , { symbol , active : 1 } )
	if ( resp && ( urllogo = resp?.urllogo ) ) { 
		jsymbol_urllogo[ symbol ] = urllogo
		return urllogo }
	else { return null }
}
setInterval ( async ()=>{
	let list = await  db[ 'tokens' ].findAll ( {raw: true, where : {active : 1 , urllogo : { [Op.ne] : null }} ,
		attributes : [ 'symbol' , 'urllogo' ]
	})
	for ( let elem of list ){
		jsymbol_urllogo[ elem?.symbol ] = elem?.urllogo
	}
} , 60 * 1000 )
const fill_urllogo_field= async ( { tablename , list } )=>{
	if ( await fieldexists ( tablename , 'urllogo' ) && await fieldexists ( tablename , 'symbol' )){}
	else { return list }
	for ( let idx = 0; idx< list?.length ; idx ++ ){
		let elem = list [ idx ]
		list [ idx ] = { ... elem , urllogo : await conv_symbol_urllogo( { symbol : elem?.symbol } ) }
	}
	return list
}
router.get('/rows/:tablename/:fieldname/:fieldval' , async (req,res)=>{
	let { tablename , fieldname , fieldval }=req.params
	let jquery = req?.query
	fieldexists (tablename, fieldname).then( async resp=>{
		if(resp){}
		else {resperr( res, messages.MSG_FIELDNOTFOUND); return }
		let jfilter ={}
		jfilter [ fieldname ]= fieldval
		if ( jquery && Object.keys (jquery ).length ){
			jfilter = { ... jfilter , ... jquery }
		}
		try { 
			findall( tablename , { ... jfilter} ).then(  async list =>{
				let count = 0
				if ( list?.length ){	count = await countrows_scalar(tablename, jfilter); 
					list = await fill_urllogo_field ( { tablename , list })
				} 
				else {} // resperr( res, messages.MSG_DATANOTFOUND); return }			
					
				respok ( res, null, null , { list , payload : { count  }  } )
				return
			})
	  } catch (err){
			resperr( res, messages?.MSG_ARGINVALID ); return 
		}
	})
})
router.get('/:tablename/:fieldname/:fieldval' , (req,res)=>{
	let {tablename , fieldname , fieldval }=req.params
//	if (tablename=='users'){resperr(res , messages.MSG_NOT_PRIVILEGED ) ; return }
	fieldexists ( tablename , fieldname).then(resp=>{
		if (resp){}
		else { resperr( res, messages.MSG_FIELDNOTFOUND); return }
		let  jfilter = {}
		jfilter [ fieldname ]  = fieldval
		findone ( tablename , {... jfilter } ).then(resp=>{
			if ( resp) {}
			else {resperr( res, messages.MSG_DATANOTFOUND ) ; return }
			respok ( res, null ,null , {payload : {rowdata : resp } } )
		})
	})
})



module.exports = router;
