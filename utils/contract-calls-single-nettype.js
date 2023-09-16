
import {web3} from '../configs/configweb3';
import {abierc20} from '../contracts/abi/erc20'
import { abierc721extended } from '../contracts/abi/erc721extended'
import { abierc721storage } from '../contracts/abi/erc721storage'

import { abi_mint_and_sell , abi_mint_and_sell_fee } from '../contracts/abi/abi_mint_sell'
import { abi_mint} from '../contracts/abi/abi_mint'
import { abi_putonsale } from '../contracts/abi/abi_putonsale'
import { abi_approve_bid , abi_approve_bid_fee } from '../contracts/abi/abi_approve_bid'
import { abi_deny_bid , abi_deny_bid_fee } from '../contracts/abi/abi_deny_bid'

import { abi_bid , abi_bid_fee } from '../contracts/abi/abi_bid'
import { abi_cancel_bid , abi_cancel_bid_fee } from '../contracts/abi/abi_cancel_bid'
import { abi_admin } from '../contracts/abi/adminconfigs'
import {LOGGER} from './common'

// import { getweirep } from '../utils/eth'
// import { DebugMode } from '../configs/configs'
const jcontracts={}
const MAP_STR_ABI = {
		v : abierc20
	, ADMIN : abi_admin
	, MINT_AND_SELL : abi_mint_and_sell
	, MINT : abi_mint
	, SELL : abi_putonsale
	, APPROVE_BID : abi_approve_bid
	, DENY_BID : abi_deny_bid
	, BID : abi_bid
	, CANCEL_BID : abi_cancel_bid
	, STORAGE : abierc721storage
	, ERC721 : abierc721extended

	, MINT_AND_SELL_FEE : abi_mint_and_sell_fee
	, BID_FEE : abi_bid_fee
	, APPROVE_BID_FEE : abi_approve_bid_fee
	, DENY_BID_FEE : abi_deny_bid_fee
	, CANCEL_BID_FEE : abi_cancel_bid_fee
	, 
}
const getabistr_forfunction= jargs=>{let { contractaddress , abikind ,  methodname , aargs }=jargs;
	let contract; contractaddress=contractaddress.toLowerCase()
  if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
  else {        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return contract.methods[ methodname ](... aargs ).encodeABI()
}
// contract.methods.incomingQueue(0).call(); – 
const query_noarg = jargs=>{
	let {contractaddress , abikind , methodname  }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ]( ).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_with_arg = jargs=> {  // {contractaddress , methodname , aargs }=jargs
	let {contractaddress , abikind , methodname , aargs }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ](	... aargs		).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_admin_fee =jargs=>{	let {contractaddress , actiontype }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( abi_admin , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods.query_admin_fee(actiontype).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_eth_balance=useraddress=>{
	return new Promise((resolve,reject)=>{
		web3.eth.getBalance( useraddress ).then(resp=>{
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
export {
	getabistr_forfunction
	, query_noarg
	, query_with_arg
	, query_admin_fee
	, query_eth_balance
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
