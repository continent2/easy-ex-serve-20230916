const axios = require('axios');
const { gettimestr , STRINGER  }=require('../utils/common')
const LOGGER=console.log
const moment=require('moment')
const cliredisa=require('async-redis').createClient()
const STR_DATE_FORMAT='YYYY-MM-DD'
const KEY_TO_TICKERS= 'TICKERS-ETH-MONTHLY'
// const polltickers = (date0="2021-11-15", date1="2021-12-15") => {
const  ___polltickers = async ( date0 , date1 ) => {
  const polygonUrl = `https://api.polygon.io/v2/aggs/ticker/X:ETHUSD/range/1/day/${date0}/${date1}?adjusted=true&sort=asc&limit=5000&apiKey=O7TnmZ49Pjn7cQUTTEpL7zJ5CKfpPCs8`;
  return new Promise (async (resolve,reject)=>{
		axios.get(`${polygonUrl}`).then(async resp=>{
			let { results } = resp.data // .results 
			cliredisa.hset( KEY_TO_TICKERS , 'ETH-USDT' , STRINGER( results ) )
			resolve( resp.data.results )
			let resptickerkrw = await cliredisa.hget( 'TICKERS-KRW' , 'KRW' )
			if ( resptickerkrw ){
				let results_converted = results.map ( elem => { return { c: + elem.c * + resptickerkrw } } )
				cliredisa.hset ( KEY_TO_TICKERS , `ETH-KRW` , STRINGER( results_converted ) )
			}
		})
  });
};
/** hgetall TICKERS-KRW
 1) "KRW"
 2) "1189.435219" **/
const polltickers=_=>{
	___polltickers ( moment().subtract(1 , 'months').format( STR_DATE_FORMAT ) 
		, moment().startOf('day').subtract(1 , 'days').format( STR_DATE_FORMAT )
	)
}
polltickers()

// module.exports = { getPolygon };
let cron = require('node-cron')
// cron.schedule('* * * * *', _=>{
const OFFSET_POLL_TIME = 8000
cron.schedule('0 0 0 * * *' , _=>{	
	LOGGER( gettimestr() )
	setTimeout(() => {
		polltickers()
	}, OFFSET_POLL_TIME )
})


