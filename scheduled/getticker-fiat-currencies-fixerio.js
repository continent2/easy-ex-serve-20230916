
const axios=require('axios')

const { LOGGER , gettimestr } = require('../utils/common')
const API_TICKER='http://data.fixer.io/api/latest?access_key=eba64bff77f6a8ce516690b1617dda56&format=1'
const cliredisa=require('async-redis').createClient() 
const KEYNAME_MARKETPRICES= 'tickers'
const KEYNAME_TICKERUPDATETIME='tickerupdatetime'
const KEYNAME_UNITS = 'units'
let CURRENCY_LOCAL='KRW'
const getticker=_=>{ // usd to krw
	axios.get(`${API_TICKER}`).then(resp=>{
		if(resp.data.success ){} else {return}
		const {KRW,USD}=resp.data.rates
		if(KRW && USD){} else {return}
		let ratekrwusd=KRW/USD
		cliredisa.hset(KEYNAME_MARKETPRICES , CURRENCY_LOCAL, ratekrwusd)
		cliredisa.hset(KEYNAME_TICKERUPDATETIME , CURRENCY_LOCAL , gettimestr() )
	})
}
const OFFSET_POLLER=6,PERIOD_POLL=10*1000 // ,INTERLEAVER_POLLERS=30

setTimeout(()=>{
	setInterval(()=>{
		getticker() 
	} , PERIOD_POLL)
}, OFFSET_POLLER*1000 )
module.exports={}

