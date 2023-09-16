
const db=require('../models')
const { jweb3 } = require('../configs/configweb3' )
const LOGGER = console.log
const { findone } = require('../utils/db')
const STRINGER = JSON.stringify
const Web3 = require('web3');
const getweirep = (val) => Web3.utils.toWei( '' + val)
let TXFEE = '0.001'
const atm = require ('await-transaction-mined')
let { Op } = db.Sequelize
const { query_eth_balance } = require('../utils/contract-calls')
const { isaddressvalid}=require('../utils/erc20')
const TOLERANCE_UNDERPAID = 0.03
const MASTERADDRESS = '0xFEc43cB06f182E229dD32e28c73Ac86a6ba70Ff8'
const getmasteraddress = async ()=>{
	let masteraddress = MASTERADDRESS 
	let respmaster = await findone ( 'settings' , { key_: 'MASTER-RECEIVE-ACCOUNT' , active : 1 } )
	if ( respmaster?.value_ && isaddressvalid ( respmaster?.value_) ){	masteraddress  = respmaster?.value_		}
	else {} 
	return masteraddress
}
const settle_trackpays = async _=>{
	let list = await db[ 'trackpays' ].findAll ( { raw : true  , where : { issettled : { [ Op.ne ] : 1  }		, statusint : -1  
 } } )
	if ( list && list?.length ) {}
	else { return }
	let masteraddress = await getmasteraddress ()
//	if ( respmaster?.value_ ) { masteraddress = respmaster?.value_ }	
//	else {}
	for ( let idx = 0 ; idx < list?.length ; idx ++ ) {
		let trackitem = list[ idx ]
		let { receiveaddress , privatekey } = trackitem
		if ( receiveaddress && privatekey ){}
		else { LOGGER(`!!! invalid trackpay ${ STRINGER( trackitem )}`) }
		let { nettype , saleuuid } =  trackitem
		let respsale = await findone ( 'sales' , { uuid : saleuuid } )
//		let w eb3 = jweb3 [ nettype ]
		let balwei = await query_eth_balance ( { nettype , useraddress : receiveaddress } ) 
		if ( balwei ) {}
		else { continue }
		let amount = Web3.utils.fromWei ( '' + balwei ) 
		amount = +amount
		if ( amount > 0 && amount > ( 1- TOLERANCE_UNDERPAID )* +respsale?.pricedisp ) {}
		else { continue } 
		let { netprofit , feeamount , useruuid : selleruuid }  = respsale 
//		let txhash = await sendcoin ( { from : receiveaddress , to : selleruuid ,		amount : netprofit , privatekey , nettype })
		if ( respsale?.selleraddress ) {
			let txhash = await sendcoin ( { from : receiveaddress , to : respsale?.selleraddress ,		amount : netprofit , privatekey , nettype })
			await updaterow ( 'trackpays' , { id : trackitem?.id } , { statusint : 0 , txhashpayout : txhash } )	
		}
		 await sendcoin ( { from : receiveaddress , to : masteraddress,	amount : feeamount , privatekey , nettype } ) 
	}
}
/** alter table trackpays add column statusint int comment 'internal status,null:?, 0: waiting, 1:success,2:fail' ; 
*/
const poll_settle_trackpays=async _=>{
	let list = await db[ 'trackpays' ].findAll ( { raw : true , where : { statusint : 0 } } ) 
	for ( let idx = 0 ; idx< list?.length ; idx ++ ) {
		let trackitem = list [ idx ]
		atm.awaitTx ( jweb3[ trackitem?.nettype ] , trackitem?.txhashpayout ).then ( async resp=>{ let statusint 
			if ( resp?.status ) {	statusint = 1 			}
			else {	statusint = 2 }
			await updaterow ( 'trackpays' , { id : trackitem?.id } , { issettled : 1 ,  statusint } )
		})	
	}
}
const DELTA_TIME_POLL_TX_BUY = 15*1000
const DELTA_TIME_POLL_TX_CREATE = 15*1000
const OFFSET_TIME_SETTLE_ORDERS = 30 * 1000 
const settle=async _=>{
	settle_trackpays ()
	setTimeout ( _=>{ poll_settle_trackpays() } , DELTA_TIME_POLL_TX_BUY ) 

	setTimeout ( _=>{ settle_orders() } , OFFSET_TIME_SETTLE_ORDERS )
	setTimeout ( _=>{	poll_settle_orders() } ,OFFSET_TIME_SETTLE_ORDERS + DELTA_TIME_POLL_TX_CREATE )  
}
const poll_settle_orders = async _=>{
	let list = await db[ 'orders' ].findAll ( { raw: true , where : { statusint : 0 } } )	
	for ( let idx = 0 ; idx < list?.length ; idx ++ ) {
		let trackitem = list [ idx ] 
		atm.awaitTx ( jweb3[ trackitem?.nettype ] , trackitem?.txhashpayout ).then( async resp => {let statusint
			if ( resp?.status ) { statusint = 1 } 
			else { statusint = 2 }
			await updaterow ( 'orders' , { id : trackitem?.id } , { issettled : 1 , statusint } )
		})
	}
}
const settle_orders = async _=>{
	let list  = await db[ 'orders'].findAll ( { raw : true , where : { issettled : { [Op.ne] :1 } , status : 4  } } )
	let masteraddress = await getmasteraddress ()
	for ( let idx = 0 ; idx < list?.length ; idx ++ ){
		let order = list[ idx ]
		let { nettype, privatekey , receiveaddress } = order
		let txhash = await sendcoin ( {
			from :  order?.receiveaddress , 
			to : masteraddress ,
			amount : order?.pricedisp ,
			privatekey : order?.privatekey ,
			nettype : order?.nettype
		})
		await updaterow ( 'orders' , { id : order?.id } , { statusint : 0 , txhashpayout : txhash } )
	}
}

/* jweb3 [ 'KLAYTN-TESTNET'] = require ( './configweb3-klaytntestnet').web3
jweb3 [ 'KLAYTN_TESTNET'] = require ( './configweb3-klaytntestnet').web3
jweb3 [ 'KLAYTN-MAINNET'] = require ( './configweb3-klaytnmainnet').web3
jweb3 [ 'KLAYTN_MAINNET'] = require ( './configweb3-klaytnmainnet').web3
*/
setInterval (async _=>{
	settle() 
} , 60 * 1000 )
const sendcoin=async ({ order })=>{
	let sender = web3.eth.accounts.privateKeyToAccount( order?.privatekey ) 
	let web3 = jweb3 [ order?.nettype ]
	web3.eth.accounts.wallet.add( sender )
// MariaDB [addresstrade]> insert into settings (key_,value_,acative,subkey_) values ( 'FEE-SEND-COIN' , '0.002',1,'KLAY');
	let respfee = await findone ( 'settings' , { key_:'FEE-SEND-COIN',subkey_:'KLAY', active:1 } )
	if ( respfee && respfee?.value_ ) { TXFEE = respfee?.value_ }
	else {}
	let resp = await 	  web3.eth
      .sendTransaction({
        from: sender.address,
        to: order?.to , // '0xd56a6bf50f1ccEC4a9d13c54f6fB731dD7466aa2' , // 0x1062DAd3c5f8330D721566370d384D5c6b80634F',
        value: getweirep( +order?.amount - +TXFEE ),
				gasLimit : 21000
  })
	return resp?.txHash || resp?.transactionHash || resp?.hash
}
/**       .then(function (resp) {
        LOGGER( { amount , time: `${moment().format( 'HH:mm:ss')}` } )
        console.log(resp);
      }); */

// MariaDB [addresstrade]> insert into settings ( key_,value_,active ) values ( 'MASTER-RECEIVE-ACCOUNT','0xFEc43cB06f182E229dD32e28c73Ac86a6ba70Ff8',1);
/** orders
 uuid                     | varchar(80)   
| price                    | varchar(40)  
| priceunit                | varchar(20)  
| item                     | varchar(80)  
| itemuuid                 | varchar(80)  
| priceraw                 | varchar(80)  
| pricedisp                | varchar(40)  
| active                   | tinyint(4)   
| feeamount                | varchar(20)  
| feerate                  | varchar(20)  
| feerateunit              | varchar(20)  
| receiveaddress           | varchar(80)  
| typecode                 | int(10) unsig
| typestr                  | varchar(40)  
| auxdata                  | text         
| txhash                   | varchar(80)  
| status                   | tinyint(4)   
| expiry                   | bigint(20)   
| privatekey               | varchar(80)  
| useruuid                 | varchar(80)  
| reqprefix                | varchar(40)  
| reqsuffix                | varchar(40)  
| nettype                  | varchar(40)  
| expirystr                | varchar(30)  
| reqpatternlen            | int(11)      
| timestampunix            | bigint(20)   
| minermacaddress          | varchar(80)  
| timestamppaid            | bigint(20)   
| timestampdeliverpromised | bigint(20)   
| issettled                | tinyint(4)
*/

