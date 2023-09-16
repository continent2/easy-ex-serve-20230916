
const { web3 , web3wss }=require( '../configs/configweb3');
const db = require('../models')
const { tableexists
	, fieldexists
	, togglefield
	, createrow 
	, incrementrow
	, findone
	, findall
	,	countrows_scalar
}=require('../utils/db');
let { Op } = db.Sequelize;
const moment = require('moment');
const LOGGER=console.log // const TOKEN_NAME_DEF = 'METAPLANET'
let { v5 : uuidv5 } = require('uuid')
let  TOKEN_CONTRACT_ADDRESS = '0x70E509A0d868F023A8A16787bd659a3bb1357eE1'
const { MAP_TX_TYPES } =require('./configs/configs') 
/** const MAP_TX_TYPES = { 
		'RECEIVE-ETH' : 0
	, 'SEND-ETH' : 1
	, 'RECEIVE-TOKEN' : 2
	, 'SEND-TOKEN' : 3
	, 'INCREMENT-TOKEN' : 4
	, 'DECREMENT-TOKEN' : 5
	, 'INCREMENT-ETH' : 6
	, 'DECREMENT-ETH' : 7
	, 'INCREMENT' : 8
	, 'DECREMENT' : 9
} */
findone('settings' , {key_ : 'tokencontract'} ).then(resp=>{
	if(resp && resp.value_ && resp.value_.length == 42 ){}
	else {return }
	TOKEN_CONTRACT_ADDRESS = resp.value_
})
const conv_log_field_to_address = str=>{	return web3.utils.toChecksumAddress( str.substr(str.length-40 ) 	)
}
let TX_EVENT_SIG="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
LOGGER(`subscribing to ${TX_EVENT_SIG} ,\n ${TOKEN_CONTRACT_ADDRESS} `)
var subscription = web3wss.eth.subscribe('logs',
	{ fromBlock: 13_000_000, 
		topics: [ TX_EVENT_SIG ] 
 ,		address : TOKEN_CONTRACT_ADDRESS // ''
	} 
	, _=>{} )
	.on("data", async txdata  => {		LOGGER( '' , txdata );
    let data = {
      removed: String(txdata.removed),
      logIndex: String(txdata.logIndex),
      transactionIndex: String(txdata.transactionIndex),
      transactionHash: txdata.transactionHash,
      blockHash: txdata.blockHash,
      blockNumber: String(txdata.blockNumber),
      address: txdata.address,
      data: txdata.data,
      topics: `${txdata.topics[0]};${txdata.topics[1]};${txdata.topics[2]}`,
      id: txdata.id
		}
//  LOGGER("data----------------")   console.log(data);
  try { createrow('transactionsoutside20220101', data).then( resp=> {//    console.log(resp);
	}) } catch (err){ LOGGER(err) }
	let txhash = txdata.transactionHash
	if ( txhash ) {}
	else {LOGGER('AWOpGYWXtV') ; return }
	let aproms=[]
	aproms[aproms.length ] = findone('settings' , { key_ : 'ACTIVE_NETWORK'} )
	aproms[aproms.length ] = findone('settings' , { key_ : 'TOKEN_NAME_DEF' })
	aproms[aproms.length ] = findone('settings' , { key_ : 'NAMESPACE_DEF'} )
	aproms[aproms.length ] = findone('settings' , { key_ : 'TOKEN_DECIMALS'} )

	Promise.all ( aproms).then(aresps=>{
		let [ respnettype , respcurrency , namespace , decimals ] = aresps
		let from_ = conv_log_field_to_address ( txdata.topics[ 1 ] )
		let to_   = conv_log_field_to_address ( txdata.topics[ 2 ] )
//		let uuid = uuidv5 ( txhash , namespace )
		let uuid = uuidv5 ( txhash , Array.from(Array( 16 ).keys()) )
		let amount = web3.utils.fromWei ( txdata.data , 'picoether' )
		let currency = respcurrency?.value_
		let nettype  = respnettype?.value_
		createrow ('transactionsoutside' , {
			username : ''
	 , from_
	 , to_
	 , txhash
	 , amount // 'gwei' ) //  / 10** (+decimals.value_)  // web3.utils.fromWei(  , 'micro' )
	 , currency
	 , nettype
	 , writer    : ''
	 , type      : MAP_TX_TYPES [ 'RECEIVE-TOKEN' ]
	 , typestr   : 'RECEIVE-TOKEN'
	 , uuid
	 })
		findone('accounts' , {address : from_} ).then(resp=>{
			if(resp){}
			else {return}
			let { username } = resp
			createrow('pushnotifies', {
				username 
				, from_
				, to_
				, amount
				, currency
	 			, type      : MAP_TX_TYPES [ 'SEND-TOKEN' ]
				, typestr   : 'SEND-TOKEN'
				, txhash
				, nettype
				, title : '출금알림'
				, contentbody : `${amount} METAPLANET 이 출금되었습니다 `	
			})
		})
		findone('accounts', { address : to_ } ).then(resp=>{
			if(resp){}
			else {return}
			let { username } = resp
			createrow('pushnotifies', {
				username 
				, from_
				, to_
				, amount
				, currency
	 			, type      : MAP_TX_TYPES [ 'RECEIVE-TOKEN' ]
				, typestr   : 'RECEIVE-TOKEN'
				, txhash
				, nettype		
				, title : '입금알림'
				, contentbody : `${amount} METAPLANET 이 입금되었습니다 `	
			})
		})
	})
})

/**pushnotifies;
| username  | varchar(80)      | YES  |     | NULL                |                               |
| amount    | varchar(20)      | YES  |     | NULL                |                               |
| currency  | varchar(20)      | YES  |     | NULL                |                               |
| type      | tinyint(4)       | YES  |     | NULL                |                               |
| typestr   | varchar(40)      | YES  |     | NULL                |                               |
| txhash    | varchar(80)      | YES  |     | NULL                |                               |
| from_     | varchar(80)      | YES  |     | NULL                |                               |
| to_       | varchar(80)      | YES  |     | NULL                |                               |
| nettype   | varchar(20)      | YES  |  */
// const txdata01 = // {
//   removed: false,
//   logIndex: 8,
//   transactionIndex: 26,
//   transactionHash: '0x6278d4ce81260b9a6d8462e734769246f2b7b6b72eb0012b8ebc191c0a883d35',
//   blockHash: '0x871c676e1114e11259fa4974312247037206c57faf13dd85b013455e498df7ec',
//   blockNumber: 11725487,
//   address: '0x70E509A0d868F023A8A16787bd659a3bb1357eE1',
//   data: '0x00000000000000000000000000000000000000000000000000000000000f4240',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x0000000000000000000000005c7552f154d81a99e2b5678fc5fd7d1a4085d8d7',
//     '0x00000000000000000000000053ff313fadf40d0bf21424f382c5bf6cf10204c5'
//   ],
//   id: 'log_4b2ca477'
// }
/** {
  removed: false,
  logIndex: 5,
  transactionIndex: 2,
  transactionHash: '0x5e98092e9392bcd1b13d845b01509e5ddac0b796372db7a89d3084095fc340a4',
  blockHash: '0x49e36e9755bd920ce916e364b84de90871595a507917b34121857decefc18da8',
  blockNumber: 11725443,
  address: '0xC01D99D33b96e904aCA9B76aa71442eCCf496d82',
  data: '0x000000000000000000000000000000000000000000001b87506a3e7b0d400000',
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x0000000000000000000000008309684350bcaaaaaf75816a35764737fe27215a',
    '0x000000000000000000000000c30fe506f2347b453c2283d8bbb38ad8f0f81775'
  ],
  id: 'log_50018847'
}*/
// const txdata02 = {
//   removed: false,
//   logIndex: 26,
//   transactionIndex: 41,
//   transactionHash: '0x1d9724bbd7d017cdc888055bd452f53801d5e94dcb71263b179901ed89a2632f',
//   blockHash: '0x6d658bfcf02f8599c16bd7aff30203683d4210ba492e8451afe6aaad1826f1ee',
//   blockNumber: 11725541,
//   address: '0x70E509A0d868F023A8A16787bd659a3bb1357eE1',
//   data: '0x00000000000000000000000000000000000000000000000000000000000f4240',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x00000000000000000000000008f61493539e166810bbb06c28f73323d1a2d202',
//     '0x000000000000000000000000c35ec349ca8cc32c3775e3da9a310ec8e421abfe'
//   ],
//   id: 'log_aa542f66'
// } 
// const txdata03 ={
//   removed: false,
//   logIndex: 35,
//   transactionIndex: 98,
//   transactionHash: '0xc9dbfb63b008a563abf3a2c5d39fd07579d33e8a395d979054a64050695cc474',
//   blockHash: '0x6d658bfcf02f8599c16bd7aff30203683d4210ba492e8451afe6aaad1826f1ee',
//   blockNumber: 11725541,
//   address: '0x70E509A0d868F023A8A16787bd659a3bb1357eE1',
//   data: '0x00000000000000000000000000000000000000000000000000000000000f4240',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x0000000000000000000000005c7552f154d81a99e2b5678fc5fd7d1a4085d8d7',
//     '0x000000000000000000000000a7f4348c096edb86b0d6baa224d514306e962ec8'
//   ],
//   id: 'log_1693b915'
// }
// const getnewblocks = _=>{
// 	web3wss.eth.subscribe('newBlockHeaders', function(error, result){
// 		if (!error) {
// 				console.log(result);
// 				return;
// 		}
// 		console.error(error);
// 	})
// 	.on("connected", function(subscriptionId){
// 		console.log(subscriptionId);
// 	})
// 	.on("data", function(blockHeader){
// 		console.log(blockHeader);
// 	})
// 	.on("error", console.error);
// }
/**  > desc transactionsoutside;
| username  | varchar(80)
| from_     | varchar(80)
| to_       | varchar(80)
| txhash    | varchar(80)
| amount    | varchar(20)
| currency  | varchar(20)
| nettype   | varchar(20)
| writer    | varchar(80)
| type      | tinyint(4) 
| typestr   | varchar(20)
| uuid      | varchar(50)
*/
