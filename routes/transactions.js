var express = require('express');
var router = express.Router();
const moment=require('moment')
/* GET home page. */
const {respok , resperr } =require('../utils/rest')
let {create_a_uuid , gettimestr }=require('../utils/common')
const {getusernamefromsession}=require('../utils/session')
const { findone,createrow}=require('../utils/db')
const { messages}=require('../configs/messages') 
const { v5 : uuidv5 } =require('uuid')
const { NETTYPE } =require('../configs/net' )
// let NET TYPE='ETH-TESTNET'
const { auth } = require('../utils/authMiddleware' )
const { jweb3 } = require('../configs/configweb3' )
const { iszeroaddress , isaddressvalid } =require('../utils/erc20' )
const { ispositivefloat } =require('../utils/validates')
const { abierc20 } = require( '../contracts/abi/erc20' )  // const Tx= require('ethereumjs-tx' ).Transaction // const Tx= require('ethereumjs-common' ).Transaction// const Tx= require('ethereumjs-common' )
const STRINGER = JSON.stringify
const LOGGER=console.log

router.post ( '/:assetaddress/:rxaddress/:amount' , auth , async (req,res)=>{
	let { uuid : useruuid } =req.decoded
	let { assetaddress , rxaddress , amount } = req.params //	respok ( res ) 
	if ( isaddressvalid( assetaddress )){} else { resperr( res, messages.MSG_ARGINVALID ) ; return }
	if ( isaddressvalid( rxaddress    )){} else { resperr( res, messages.MSG_ARGINVALID ) ; return }
	if ( ispositivefloat ( amount ) ) {} else { resperr ( res, messages.MSG_ARGINVALID ) ; return }
 
	let respacct = await findone ( 'accounts' , { useruuid } ) 
	if ( respacct ) {}
	else { resperr ( res , messages.MSG_DATAFOUND  ) ; return }
	let { address : senderaddress , privatekey } =respacct
	let respuser = await findone ( 'users' , { uuid : useruuid } ) 
	if ( respuser ) {} 
	else { resperr( res, messages.MSG_DATANOTFOUND ) ; return } 
	let { nettype } = respuser
	let web3 = jweb3 [ nettype ]
	if ( web3 ) {}
	else { resperr ( res, 'NETTYPE-NOT-SUPPORTED' ) ; return }
	let account = web3.eth.accounts.privateKeyToAccount (privatekey ) 
	web3.eth.accounts.wallet.add(account)
	let respsend
	let aproms=[]
	aproms[ aproms.length ] =web3.eth.getTransactionCount ( senderaddress ) 
	aproms[ aproms.length ] =web3.eth.getChainId()
	aproms[ aproms.length ] =web3.eth.getGasPrice ()
	let [ nonce , chainid , gasPrice ] = await Promise.all ( aproms ) ;  LOGGER( {nonce , chainid , gasPrice } )
	if ( chainid ) {} else { resperr ( res , 'NETWORK-NOT-AVAILABLE' ) ; return }
	const gasLimit = 3_000_000 // _00	let tx // = new Tx(rawtx )
	let rawtx
	switch ( iszeroaddress( assetaddress ) ) {
		case true : // coin
			rawtx = { from : senderaddress ,
				nonce : web3.utils.toHex ( nonce ) ,
				gasPrice : web3.utils.toHex(gasPrice ), // * 1e9
				gasLimit : web3.utils.toHex( 21000 ) , // gasLimit),
				to : rxaddress,
				value : web3.utils.toWei ( amount ),
				chainId : chainid
			} //			tx.sign ( Buffer.from ( privatekey , 'hex' ) ) //			respsend =await web3.eth.sendTransaction ( { from : senderaddress , 				to : rxaddress ,				value : web3.utils.toWei ( amount )			 } )	
		break 
		case false : // token 
			let contract =new web3.eth.Contract ( abierc20 , assetaddress , { from : senderaddress })
			let data = contract.methods.transfer ( rxaddress , web3.utils.toWei ( amount ) ).encodeABI()
 			rawtx = { from : senderaddress , 
				gasPrice: web3.utils.toHex (gasPrice ) , // (20 * 1e9),
  	    gasLimit: web3.utils.toHex( gasLimit ) , // 210000),
      	to : assetaddress,
				value : 0x0 , 
				data , 
				noce : web3.utils.toHex ( nonce )
			}
		break
	}
	const signed =await web3.eth.accounts.signTransaction( rawtx, privatekey );
	let tic =moment().valueOf()
	web3.eth.sendSignedTransaction( signed.raw || signed.rawTransaction ) 
		.on('transactionHash', (hash) => { LOGGER( {hash} ) // { hash: '0x561c2ba7e815d541cd2ab0be3ab5b3077d83f99d80230c436a53edfc2108cb21' }
			let toc= moment().valueOf() ; let deltat =toc-tic ;  LOGGER( 'delta t:',  deltat )
			respok ( res,null,null,{ hash , deltat } )
		})
		.on('receipt', (receipt)=>{ LOGGER( { receipt })	})
		.on('confirmation', (confirmationnumber, receipt)=>{ LOGGER( { confirmationnumber, receipt}) })
		.on('error', err => { resperr(res,null,null, { err:'err1'} );LOGGER(err); return })
})
/** {
   confirmationnumber: 1,
   receipt: {
     blockHash: '0xdd5e523ee7efb47efae2efb1e6b652787caa74f8dd3de908b65bd548947cd1aa',
     blockNumber: 6801,
     contractAddress: null,
     cumulativeGasUsed: 21000,
     from: '0xfec43cb06f182e229dd32e28c73ac86a6ba70ff8',
     gasUsed: 21000,
     logs: [],
     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     status: true,
     to: '0x1062dad3c5f8330d721566370d384d5c6b80634f',
     transactionHash: '0xfab17547ddbc39d412246e681885fe42cdcd1b707e5e0773c59c2eac47b763fa',
     transactionIndex: 0,
     type: '0x0'
   }
 }
*/
/** {
   receipt: {
     blockHash: '0xdd5e523ee7efb47efae2efb1e6b652787caa74f8dd3de908b65bd548947cd1aa',
     blockNumber: 6801,
     contractAddress: null,
     cumulativeGasUsed: 21000,
     from: '0xfec43cb06f182e229dd32e28c73ac86a6ba70ff8',
     gasUsed: 21000,
     logs: [],
     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     status: true,
     to: '0x1062dad3c5f8330d721566370d384d5c6b80634f',
     transactionHash: '0xfab17547ddbc39d412246e681885fe42cdcd1b707e5e0773c59c2eac47b763fa',
     transactionIndex: 0,
     type: '0x0'
   }
 }
*/

router.post('/transaction/imadeatx/:txhash',(req,res)=>{
  const username=getusernamefromsession(req);
  if(username){} else{resperr (res,messages.MSG_PLEASELOGIN);return}
	let {txhash}=req.params
	let {from_     , to_            , amount    , currency  , nettype : NETTYPE , typestr  }=req.body

	let TABLENAME='transactionsoutside'
	findone( TABLENAME , {
		txhash
	}).then(resp=>{
		if(resp){
			resperr(res,messages.MSG_DATADUPLICATE);return
		} else {
			let uuid = uuidv5 ( txhash , Array.from ( Array(16).keys() ) )
			createrow( TABLENAME , 
				{ username
					, txhash
					, nettype : NETTYPE
					, supertype : typestr.match ( /^RECEIVE/ ) ? 1 : 2
					, uuid
//					, typestr: 'SEND-ETH'
					, ... req.body
				}
			).then(resp=>{
				respok ( res )
			})	
		}
	})
})
/** 
  username  | varchar(80)
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
| supertype | tinyint(4) 
*/

router.post('/withdraw/:token/:amount/:toaddress',(req,res)=>{
  const username=getusernamefromsession(req);
  if(username){} else{resperr (res,messages.MSG_PLEASELOGIN);return}
	let uuid = create_a_uuid()
	respok ( res,null,null , { payload : {uuid
		, timestamp : gettimestr()
		} 
	})
})

module.exports = router;
/** username             | varchar(80)      | YES  |     | NULL                |                               |
| address              | varchar(80)      | YES  |     | NULL                |                               |
| privatekey           | varchar(100)     | YES  |     | NULL                |                               |
| nettype              | varchar(20)      | YES  |     | NULL                |                               |
| currentBlockNumber   | bigint(12)       | NO   |     | 10000000            |                               |
| firstUsedBlockNumber | bigint(12)       | NO   |     | 11000000            |                               |
| useruuid
*/
/**	tx = new Tx(rawtx )
	if ( privatekey.match (/^0x/ ) ){ privatekey = privatekey.replace ( /^0x/ , '' ) }
	tx.sign ( Buffer.from ( privatekey , 'hex' ) )
	try {	//		respok ( res , 'TX-OK' ) ; return  
//		let resptx = await 
web3.eth.sendSignedTransaction (  '0x' + tx.serialize().toString('hex')) // ; LOGGER( 'resptx',resptx )
//		respok ( res,null,null,{ resptx , deltat } )
		return
	  	.on('transactionHash', txhash =>{ LOGGER( {txhash } ) 			respok ( res, null,null, { respdata : { txhash } } ) 			return 
		}).catch (err=>{
			resperr ( res, 'TX-ERR' , null, { err: STRINGER( err ) } )		})
	} catch ( err ) { LOGGER( err )
			resperr ( res, 'TX-ERR' , null, { err: 'err2'  } ) // STRINGER( err )
	} */

