
const { jweb3 } =require( '../configs/configweb3' ) ;
const {abierc20} =require( '../contracts/abi/erc20' )
// const { abierc721extended } =require( '../contracts/abi/erc721extended' )
// const { abierc721storage } =require( '../contracts/abi/erc721storage' )

// const { abi_mint_and_sell , abi_mint_and_sell_fee } =require( '../contracts/abi/abi_mint_sell' )
// const { abi_mint} =require( '../contracts/abi/abi_mint' )
// const { abi_putonsale } =require( '../contracts/abi/abi_putonsale' )
// const { abi_approve_bid , abi_approve_bid_fee } =require( '../contracts/abi/abi_approve_bid' )
// const { abi_deny_bid , abi_deny_bid_fee } =require( '../contracts/abi/abi_deny_bid' )

// const { abi_bid , abi_bid_fee } =require( '../contracts/abi/abi_bid' )
// const { abi_cancel_bid , abi_cancel_bid_fee } =require( '../contracts/abi/abi_cancel_bid' )
// const { abi_admin } =require( '../contracts/abi/adminconfigs' )
const {LOGGER} =require( './common' )

// const { getweirep } =require( '../utils/eth'
// const { DebugMode } =require( '../configs/configs'
const jcontracts={}
const MAP_STR_ABI = {
		ERC20 : abierc20
// 	, ADMIN : abi_admin
//	, MINT_AND_SELL : abi_mint_and_sell
//	, MINT : abi_mint
//	, SELL : abi_putonsale
//	, APPROVE_BID : abi_approve_bid
//	, DENY_BID : abi_deny_bid
//	, BID : abi_bid
//	, CANCEL_BID : abi_cancel_bid
//	, STORAGE : abierc721storage
//	, ERC721 : abierc721extended

//	, MINT_AND_SELL_FEE : abi_mint_and_sell_fee
//	, BID_FEE : abi_bid_fee
//	, APPROVE_BID_FEE : abi_approve_bid_fee
//	, DENY_BID_FEE : abi_deny_bid_fee
//	, CANCEL_BID_FEE : abi_cancel_bid_fee
	, 
}
const getabistr_forfunction= jargs=>{let { nettype , contractaddress , abikind ,  methodname , aargs }=jargs;
	let contract; contractaddress=contractaddress.toLowerCase()
  if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
  else {        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return contract.methods[ methodname ](... aargs ).encodeABI()
}
// contract.methods.incomingQueue(0).call(); – 
const query_noarg = jargs=>{
	let { nettype ,contractaddress , abikind , methodname  }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {	let web3 = jweb3 [ nettype ]
		 contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ]( ).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_with_arg = jargs=> {  // {contractaddress , methodname , aargs }=jargs
	let { nettype ,contractaddress , abikind , methodname , aargs }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {let web3 = jweb3 [ nettype ]
        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ](	... aargs		).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_admin_fee =jargs=>{	let { nettype ,contractaddress , actiontype }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {let web3 = jweb3 [ nettype ]
		contract=new web3.eth.Contract( abi_admin , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods.query_admin_fee(actiontype).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_eth_balance = jargs =>{
	let {  nettype ,useraddress } = jargs 
	return new Promise((resolve,reject)=>{let web3 = jweb3 [ nettype ]
		web3.eth.getBalance( useraddress ).then(resp=>{
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const Web3 = require('web3')
const query_eth_balance_json=jargs=>{
	let {  nettype ,useraddress } = jargs 
	return new Promise((resolve,reject)=>{let web3 = jweb3 [ nettype ]
		web3.eth.getBalance( useraddress ).then(resp=>{
			if ( resp ) {
				let nominalamount = Web3.utils.fromWei ( ''+ resp ) // ; LOGGER( `bal@rcv addr: __${amount}__`) 
				resolve( { raw : resp , nominalamount } )
				return
			}
			else { resolve ( null ) }
		}).catch(err=>{resolve(null)})
	})
}
module.exports= {
	getabistr_forfunction
	, query_noarg
	, query_with_arg
	, query_admin_fee
	, query_eth_balance
	, query_eth_balance_json
}
/** const approve=async jargs=>{let {contractaddress , spenderaddress,amount }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
  if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
  else {        contract=new web3.eth.Contract( abierc20 , contractaddress);    jcontracts[contractaddress ]=contract }
  return new Promise((resolve,reject)=>{  if(contract){} else {resolve(null) ; return false }
    contract.methods.approve(spenderaddress ,getweirep(amount) ).call((err,resp)=>{DebugMode && LOGGER('ttEyiAnksK',err,resp)
      resolve( resp )
    }).catch(err=>{DebugMode && LOGGER('KRiD5tsqkD',err);resolve(null)} )
  })
}
*/
