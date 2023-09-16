
const {web3,netkind,nettype}=require('../../configs/ETH/configweb3')
const db=require('../../models')
const utils=require('../../utils'); const {gettimestr,convtohex,incdecbalance,incdecbalance_reflfee, getbalance,convweitoeth}=utils
const {TIMESTRFORMAT,MAP_TABLESTOUSE_DEFINED}=require('../../configs/configs')
const log4js = require('log4js'); log4js.configure({  appenders: { everything: { type: 'file', filename: 'log-eth.log' }  },	categories: { default: { appenders: [ 'everything' ], level: 'debug' }  }} )
const logger4 = log4js.getLogger(); logger4.level = 'debug'; const moment=require('moment')
let GAS_LIMIT_ETH,GAS_PRICE_ETH,GAS_LIMIT_TOKEN,GAS_PRICE_TOKEN; const CURRENCYLOCAL='ETH'
const {minAbi4tx}=require('../../configs/ETH/tokens/abis')
let jcontracts={}
// const MIN_TOKEN_AMOUNT_TO_WITHDRAW=1,DECIMALS=18 //const MAP_TABLESTOUSE_DEFINED={transactions:1,txsinternal:1}
const getgasfee=(limit,price,floatwei)=>{ return floatwei && floatwei=='wei'? limit*price: limit*price/10**18 }
const sendseth=(jdata,tabletouse , modecollectorgeneral)=>{return new Promise((resolve,reject)=>{if(MAP_TABLESTOUSE_DEFINED[tabletouse]){} else {tabletouse='transactions'} // reject({status:'ERR',message:'TABLE INVALID'});return false}
  let {username,rxaddr,amt2sendfloat,amt2sendwei,sitename}= jdata;console.log(jdata, '@15620')
  db.balance.findOne({raw:true,where:{username:username,currency:CURRENCYLOCAL,nettype:nettype,sitename:sitename}}).then(respacct=>{
    if(respacct){} else {console.log('acct not found');reject({status:'ERR',message:'Acct not found'});return false}
    if(modecollectorgeneral && modecollectorgeneral=='collector'){}
    else if(respacct['canwithdraw']){} 
    else {console.log('Withdraw BANNED'); reject({status:'ERR',message:'Withdraw BANNED'});return false}
    let address=respacct['address']; if(address){} else {console.log('Address not found'); reject({status:'ERR',message:'Address not found'});return false}
//    resolve('OK') ;return false
    web3.eth.getBalance(address).then(async balance=>{		if(balance){} 	else {reject({status:'ERR',message:'Network not avail.'});return false}
      const amteth=utils.getethfloatfromweistr(balance); console.log(address,balance,balance/10**18, gettimestr())

      if(amt2sendfloat>=amteth){console.log('Balance not enough'); reject({status:'ERR',message:'Balance not enough'});return false}
      const gasfee=getgasfee(GAS_LIMIT_ETH,GAS_PRICE_ETH,'float')
      console.log(amt2sendfloat,gasfee,amteth)
      if(amt2sendfloat+gasfee<=amteth){} else {console.log('Balance not enough(77906)');reject({status:'ERR',message:'Balance not enough(77096)'});return false}
      getbalance({username:username,currency:CURRENCYLOCAL,sitename:sitename},'float').then(balancecustom=>{
        console.log('balancecustom' ,balancecustom)
        if(amt2sendfloat+gasfee<=balancecustom){} else {console.log('Balance not enough(48286)'); reject({status:'ERR',message:'Balance not enough(48286)'});return false}
      const txData = {from:respacct['address']
        , to:rxaddr			, value:amt2sendwei // parseInt(tx.value.toString())- // tx.value.sub() // parseEther(amttoinc.toFixed(6)) //  parseEther( (rcvdamthexwei-).toString() )
        , gasLimit:convtohex(GAS_LIMIT_ETH)			
				, gasPrice:convtohex(GAS_PRICE_ETH)
			//	, data:'0x1'
      }

      let resptxo={blockNumber:null,transactionHash:null} ;   console.log('sendinout',balance,txData)
      try{
      web3.eth.sendTransaction(txData).on('receipt',async resptx=>{console.log(resptx); resptxo=resptx // resptx0=resptx; // logger4.debug(`sending ${amt2sendfloat.toFixed(6)} ETH from ${address}`)
        if (resptx && resptx['blockNumber']){} else {console.log('TX-FAIL');reject({status:'ERR',message:'Tx fail'}) } //			cliredisa.hdel(KEYNAME_TX_IN_QUEUE,senderrowdata['wallet_address'].toUpperCase() )
        const _ethamt=convweitoeth(amt2sendwei); console.log(amt2sendwei,parseInt(resptx['blockNumber'])
        ,resptx['gasUsed'],resptx['gas'],resptx['gasPrice'],_ethamt)
        const gaslimitbid=resptx['gas']?resptx['gas']:GAS_LIMIT_ETH, gaslimitoffer=resptx['gasUsed']?resptx['gasUsed']:GAS_LIMIT_ETH,gasprice=resptx['gasPrice']?resptx['gasPrice']:GAS_PRICE_ETH
        const fee=gaslimitoffer*gasprice // resptx.gasUsed *GAS_PRICE_ETH // parseInt(resptx.gas)*parseInt(resptx.gasPrice)
        db[tabletouse].create({ // db.transactions.create({
          username:username
          , currency:CURRENCYLOCAL
          , fromamount:amt2sendwei
          , toamount:amt2sendwei
          , fromaddress:address
          , toaddress:rxaddr
          , direction:'OUT'
          , blocknumber:parseInt(resptx['blockNumber'])
          , hash:resptx['transactionHash']
          , amountbefore:  balance
          , amountafter:  parseInt(balance)-amt2sendwei-fee
          , kind:tabletouse=='transactions'?'WITHDRAW':'SALESCOLLECT'
          , netkind:netkind,nettype:nettype
          , gaslimitbid:gaslimitbid
          , gaslimitoffer:gaslimitoffer
          , gasprice:gasprice
          , fee:fee
          , feestr:convweitoeth(fee,respacct['denominatorexp'] )
          , txtime:resptx['timeStamp']? moment.unix(resptx['timeStamp']).format(TIMESTRFORMAT):moment().format(TIMESTRFORMAT)
          , amountfloatstr:_ethamt
          , sitename:jdata['sitename']
        })
        incdecbalance_reflfee({... jdata,currency:CURRENCYLOCAL, amountdelta:amt2sendwei},resptx,{GAS_PRICE:GAS_PRICE_ETH,GAS_LIMIT:GAS_LIMIT_ETH})
        if(modecollectorgeneral=='collector'){
          setTimeout(_=>{ db.balance.findOne({where:{id:respacct['id']}}).then(resp=>{resp.update({amountlocked:resp['amountlocked'] - amt2sendwei})}) },100)
        }
        resolve(resptx)
      })
    }  catch(err){
      db.txtaskstodo.create({
        username:username
        , currency:CURRENCYLOCAL
        , amount:amt2sendwei
        , fromaddress:address
        , toaddress:rxaddr
        , blocknumber:resptxo['blockNumber']
        , hash:resptxo['transactionHash']
        , netkind:netkind
        , failreason:err.toString()
      }); reject(err.toString());return false
      }
    })
    })
  })
})
}
const init=()=>{
  db.operations.findOne({raw:true,where:{key_:'GAS_PRICE_ETH',subkey_:netkind}}).then(resp=>{   if(resp && resp['value_']){GAS_PRICE_ETH=parseInt(resp['value_'])}  })
  db.operations.findOne({raw:true,where:{key_:'GAS_LIMIT_ETH',subkey_:netkind}}).then(resp=>{   if(resp && resp['value_']){GAS_LIMIT_ETH=parseInt(resp['value_'])}  })
  db.operations.findOne({raw:true,where:{key_:'GAS_PRICE_TOKEN',subkey_:netkind}}).then(resp=>{ if(resp && resp['value_']){GAS_PRICE_TOKEN=parseInt(resp['value_'])}  })
  db.operations.findOne({raw:true,where:{key_:'GAS_LIMIT_TOKEN',subkey_:netkind}}).then(resp=>{ if(resp && resp['value_']){GAS_LIMIT_TOKEN=parseInt(resp['value_'])}  })
/*  db.tokens.findAll({raw:true,netk ind:netkind}).then(aresps=>{
    aresps.forEach(e=>{
      contract=new web3.eth.Contract(minAbi4tx,e['address'])
      jcontracts[e['name']]=contract
    })
  }) */
}
module.exports={sendseth}
init()
