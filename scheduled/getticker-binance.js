
const cron = require('node-cron');
const cliredisa=require('async-redis').createClient();
const moment=require('moment')
// let jsymbols={} // 
let url = 'https://api.binance.com/api/v3/ticker/price';
const MAP_TICKERS_INTEREST={
  ETHUSDT:1
  , BNBUSDT: 1
  , BTCUSDT: 1
  , ETHKRW: 1
  , BNBKRW: 1
  , BTCKRW: 1
}
const MAP_TICKER_SYMBOL_NORMAL_REP={
	 ETHUSDT: 'ETH-USDT'
  , BNBUSDT: 'BNB-USDT'
  , BTCUSDT: 'BTC-USDT'
}
const LOGGER=console.log
const axios=require('axios')

const gettickers=_=>{
	axios.get( url).then(resp=>{
    if( resp.data && resp.data.length>0){
      let {data}=resp
      let atickers= data.filter(elem=>  MAP_TICKERS_INTEREST[ elem.symbol ] )
      let timestamp = moment().format( 'YYYYMMDDHHmmss')
      atickers.forEach (elem=>{
        let {symbol , price} = elem
				let symbol_normal = MAP_TICKER_SYMBOL_NORMAL_REP[ symbol ]
				if( symbol_normal ){}
				else {return }
        cliredisa.hset( 'TICKERS-USDT' ,symbol_normal , price ) ; false && LOGGER( symbol , price , timestamp )
        cliredisa.hset( 'TICKERS-USDT-UPDATES' , symbol_normal , timestamp )
      })
    } else {return }
  })
}
gettickers()

cron.schedule('*/10 * * * *', function(){
	setTimeout(_=>{
		gettickers()
	}  , 7000 )
})
/** 
1) "BTCUSDT"
2) "50058.77000000"
3) "ETHUSDT"
4) "4383.69000000"
5) "BNBUSDT"
6) "604.40000000"
*/
