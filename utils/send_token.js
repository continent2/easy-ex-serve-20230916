
const {web3,netkind,nettype}=require('../configs/ETH/configweb3')
const db=require('../models')
const utils=require('../utils'); 
const {gettimestr,convtohex,incdecbalance,incdecbalance_reflfee, getbalance,convweitoeth}=utils
const {TIMESTRFORMAT,MAP_TABLESTOUSE_DEFINED}=require('../configs/configs')
const log4js = require('log4js'); log4js.configure({  appenders: { everything: { type: 'file', filename: 'log-eth.log' }  },	categories: { default: { appenders: [ 'everything' ], level: 'debug' }  }} )
const logger4 = log4js.getLogger(); logger4.level = 'debug'; const moment=require('moment')
let GAS_LIMIT_ETH,GAS_PRICE_ETH,GAS_LIMIT_TOKEN,GAS_PRICE_TOKEN; const CURRENCYETH='ETH'
const {minAbi4tx}=require('../configs/ETH/tokens/abis');
const { id } = require('ethers/lib/utils');
let jcontracts={},jtokens={}
const MIN_TOKEN_AMOUNT_TO_WITHDRAW=1 ,ETHDECIMALS=18
const getgasfee=(limit,price,floatwei)=>{ return floatwei && floatwei=='wei'? limit*price: limit*price/10**ETHDECIMALS }
const sendstoken=(jdata,tabletouse , modecollectorgeneral)=>{return new Promise(async (resolve,reject)=>{ if(MAP_TABLESTOUSE_DEFINED[tabletouse]){} else {tabletouse='transactions'}
  let {username,rxaddr,amt2sendfloat,amt2sendwei,currency,sitename}= jdata  // db.b alance.find_One({raw:true,where:{username:username,currency:'ETH'}}).then(respethbal=>{  })
  getbalance({username:username,currency:'ETH',sitename:sitename},'float').then(async respbal=>{
    const gasfeefloat=getgasfee(GAS_LIMIT_TOKEN,GAS_PRICE_TOKEN,'float')
    if(respbal>=gasfeefloat){} else {      reject({status:'ERR',message:'Eth balance not enough'});return false    }
//    let baleth=await web3.eth.getBalance(address)//    if(baleth){} 	else {reject({status:'ERR',message:'Network not avail.'});return false}//    const gasfeeint=getgasfee(GAS_LIMIT_TOKEN,GAS_PRICE_TOKEN,'int')//    if(parseInt(baleth)>=gasfeeint ){} else {reject({status:'ERR',message:'Eth balance not enough',code:51399});return false    }
    db.balance.findOne({raw:true,where:{username:username,currency:currency,nettype:nettype,sitename:sitename}}).then(async respacct=>{
      if(respacct){} else {reject({status:'ERR'});return false}
      if(modecollectorgeneral && modecollectorgeneral=='collector'){}
      else if(respacct['canwithdraw']){} 
      else {console.log('Withdraw BANNED'); reject({status:'ERR'});return false}
      const address=respacct['address']; if(address){} else {reject({status:'ERR',message:'Address not found'});return false}

      let baleth=await web3.eth.getBalance(address)
      if(baleth){} 	else {reject({status:'ERR',message:'Network not avail.'});return false}
      const gasfeeint=getgasfee(GAS_LIMIT_TOKEN,GAS_PRICE_TOKEN,'int')
      if(parseInt(baleth)>=gasfeeint ){} else {reject({status:'ERR',message:'Eth balance not enough',code:51399});return false    }
  
      const contract=jcontracts[currency],amtstr=amt2sendwei.toString()
      contract.methods.balanceOf(address).call((err,balance)=>{console.log(address,balance,amtstr); balance=parseInt(balance)
        if (balance<MIN_TOKEN_AMOUNT_TO_WITHDRAW){return false}
        let resptxo={blockNumber:null,transactionHash:null}
        try{web3.eth.getTransactionCount(address).then(nonce=>{ //        console.log('OK');return false
          contract.methods.transfer(rxaddr,amtstr ).send({from:address
            ,gas:GAS_LIMIT_TOKEN,gasPrice:GAS_PRICE_TOKEN,nonce:nonce}).then(async resptx=>{console.log('resptx',resptx) ;resptxo=resptx;  logger4.debug(`sending ${amtstr} tokens from ${address}`)
            if(resptx){} else {return false}
            const gaslimitbid=resptx['gas']?resptx['gas']:GAS_LIMIT_TOKEN, gaslimitoffer=resptx['gasUsed']?resptx['gasUsed']:GAS_LIMIT_TOKEN,gasprice=resptx['gasPrice']?resptx['gasPrice']:GAS_PRICE_TOKEN
            const fee=gaslimitoffer*gasprice // parseInt(resptx.gasUsed)*parseInt(resptx.gasPrice?resptx.gasPrice: GAS_PRICE_TOKEN );console.log('fee',fee)
            db[tabletouse].create({ // db.transactions.create({
              username:username
              , currency:currency
              , fromamount:amt2sendwei
              , toamount:amt2sendwei
              , fromaddress:address
              , toaddress:rxaddr
              , direction:'OUT'
              , blocknumber:resptx['blockNumber']
              , hash:resptx['transactionHash']
              , amountbefore:balance // ??
              , amountafter:balance-amt2sendwei
              , kind:'WITHDRAW'
              , netkind:netkind , nettype:nettype              
              , gaslimitbid:gaslimitbid, gaslimitoffer:gaslimitoffer
              , gasprice:gasprice
              , fee:fee
              , feestr:convweitoeth(fee,respacct['denominatorexp'] )
              , txtime:resptx['timeStamp']? moment.unix(resptx['timeStamp']).format(TIMESTRFORMAT):moment().format(TIMESTRFORMAT)
              , amountfloatstr:convweitoeth(amt2sendwei,jtokens[currency].denominatorexp)
              , sitename:jdata['sitename']
              })
              incdecbalance_reflfee({username:username,currency:CURRENCYETH,amountdelta:fee},resptx,{GAS_PRICE:GAS_PRICE_TOKEN,GAS_LIMIT:GAS_LIMIT_TOKEN})
              incdecbalance({username:username,currency:currency,amountdelta:amt2sendwei,nettype:nettype},resptx) // ,resptx,{GAS_PRICE:GAS_PRICE_TOKEN,GAS_LIMIT:GAS_LIMIT_TOKEN}
              if(modecollectorgeneral && modecollectorgeneral=='collector'){
                setTimeout(_=>{ db.balance.findOne({where:{id:respacct['id']}} ).then(resp=>{resp.update({amountlocked:resp['amountlocked']-amt2sendwei }) }) },100) 
              }
              resolve(resptx)
          })
        })
      } catch(err){ 
        db.txtaskstodo.create({
          username:username
          , currency:currency
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
  db.tokens.findAll({raw:true,netkind:netkind}).then(aresps=>{
    aresps.forEach(tokendata=>{const tokenname=tokendata['name']
      contract=new web3.eth.Contract(minAbi4tx,tokendata['address'])
      jcontracts[tokenname]=contract; jtokens[tokenname]=tokendata
    })
  })
}
module.exports={sendstoken}
init()
