
const axios=require('axios')

const { LOGGER , gettimestr } = require('../utils/common')
const API_TICKER='https://openexchangerates.org/api/latest.json?app_id=c9450e7d034a4cceab69e7f828b35b54&base=USD'
const cliredisa=require('async-redis').createClient() 
const KEYNAME_MARKETPRICES= 'TICKERS-KRW' // tickers'
const KEYNAME_TICKERUPDATETIME='TICKERS-KRW-UPDATES' // tickerupdatetime'
const KEYNAME_UNITS = 'units'
let CURRENCY_LOCAL='KRW'
const ISFINITE=Number.isFinite
const KEYS = Object.keys

const getticker=async _=>{ // usd to krw
	axios.get(`${API_TICKER}`).then(async resp=>{
		if(resp.data && resp.data.timestamp && resp.data.base ){} else {return}
		const {KRW}=resp.data.rates ; LOGGER('GsWb5DyiHu',KRW)
		if(KRW ){} else {return}
		let ratekrwusd=KRW // 
		cliredisa.hset( KEYNAME_MARKETPRICES , CURRENCY_LOCAL, ratekrwusd)
		let timestamp = gettimestr()
		cliredisa.hset( KEYNAME_TICKERUPDATETIME , CURRENCY_LOCAL , timestamp  )
		let resp_tickers_usdt = await cliredisa.hgetall( 'TICKERS-USDT' )
		LOGGER( 'urAvKyP4V0' , resp_tickers_usdt )
		KEYS( resp_tickers_usdt).forEach (elem=>{
			if(elem && elem.length && elem.match( /-/ ) ){
				let currency = elem.split (/-/)[0]
				let price=resp_tickers_usdt[ elem ]
				let normprice = + price * +KRW
				if ( ISFINITE(normprice)){
					cliredisa.hset( KEYNAME_MARKETPRICES , `${currency}-${CURRENCY_LOCAL}` , normprice )
					cliredisa.hset( KEYNAME_TICKERUPDATETIME , `${currency}-${CURRENCY_LOCAL}` , timestamp )
				}
			}
		})
	})
}
const OFFSET_POLLER=6,PERIOD_POLL=60*60 * 1000 // ,INTERLEAVER_POLLERS=30
false && getticker()

true && setTimeout(()=>{getticker() 
	setInterval(()=>{
		getticker() 
	} , PERIOD_POLL)
}, OFFSET_POLLER*1000 )
module.exports={}

/** GsWb5DyiHu 1190.255793
urAvKyP4V0 {
  'BTC-USDT': '41931.60000000',
  'ETH-USDT': '3127.15000000',
  'BNB-USDT': '475.40000000',
  'METAPLANET-USDT': '1528'
}
*/
