var express = require('express');
var router = express.Router();
const moment=require('moment')
const { PARSER } = require('../utils/common')
const { messages } = require ( '../configs/messages')
/* GET home page. */
// const {respok} =require('../utils/rest')
const cliredisa=require('async-redis').createClient()
let DENOMINATING_CURRENCY_DEF='KRW' 
const {
  respok,
  respreqinvalid,
  resperr,
  resperrwithstatus,
} = require("../utils/rest");


router.get('/eth/month',(req,res)=>{	//	const { date1, date2 } = req.params;
//	cliredisa.hget( 'TICKERS-ETH-MONTHLY' , 'ETH-US DT' ).then(resp=>{
	cliredisa.hget( 'TICKERS-ETH-MONTHLY' , `ETH-${DENOMINATING_CURRENCY_DEF}` ).then(resp=>{
		if (resp && resp.length ){}
		else {resperr(res , messages.MSG_DATANOTFOUND) ; return }
		respok ( res, null , null , { 
			payload : {
				getData : PARSER(resp)
			}
		}) 
	})
})
router.get('/polygon',(req,res)=>{
	//	const { date1, date2 } = req.params;
		getPolygon().then(resp=>{
			respok ( res, null, null , {payload : {
				getData: resp
			}
		})
	});
})
	
router.get('/tickers', (req,res)=>{
	let aproms=[]
//	aproms [ aproms.length ] =	cliredisa.hgetall('TICKERS-US DT')
	// aproms [ aproms.length ] =	cliredisa.hgetall('TICKERS-US DT-UPDATES')
	aproms [ aproms.length ] =	cliredisa.hgetall(`TICKERS-${DENOMINATING_CURRENCY_DEF}`)
	aproms [ aproms.length ] =	cliredisa.hgetall(`TICKERS-${DENOMINATING_CURRENCY_DEF}-UPDATES`)
	Promise.all(aproms).then(resp=>{						
		respok(res, null , null , {
			list : resp[0] 
			,	payload:{
					updatetimes : resp[1]
			 }
			}
		)	
	})
})
module.exports = router;
