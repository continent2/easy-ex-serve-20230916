const db=require('../models')
const { generaterandomnumber
	, getrandomfloat
	,generaterandomhex
}=require('../utils/common')
const { findone } = require('../utils/db')
const { getrandomrow } = require( '../utils/db02' )
const getrandn = generaterandomnumber 
const txtypes=[
	{type: 11 ,typestr:'TX-COIN',txtype: 1 , currency: 'PLUS' , currencytype : 1 } ,
	{type: 12 ,typestr:'TX-TOKEN',txtype: 1 , currencytype : 2 } ,
	{type: 21 ,typestr:'RX-COIN',txtype: 2 , currency: 'PLUS' , currencytype : 1 } ,
	{type: 22 ,typestr:'RX-TOKEN',txtype: 2 , currencytype : 2 } ,
]
let nettype='PLUS-MAINNET'
const {createaccount} = require('../configs/configweb3' )
const getrandtoken=async _=>{
//	let resp = await findone('tokens' , {active:1 , nettype } )
	let resp = await getrandomrow('tokens' , {active:1 , nettype ,istoken : 1} )
	return resp 
}
const web3=require('web3')
// const { web3 } =require('../configs/configweb3')
const uuid=require('uuid')
const main =async _=>{
	let N =300 
	let username='tester09'
	let useruuid='2e6f8d5a-0cf0-4023-956d-e9878d0955ca' // 2e6f8d5a-0cf0-4023-956d-e9878d0955ca' // 48cde6a2-c862-4a94-8e4a-1c55deb2aefe'
	let idxtxtype
	let from_
	let to_ 
	let myaddress='0x00E57375444513Ca8DF7B42fd9D1e98AA19A7c78' // 0x27a9D1A7E60C343A4a6450a2f31D926E33F46C34'
	let assetaddress
	for ( idx =0;idx<N ; idx++){
		idxtxtype = getrandn ( 0, 3 )
		let { type, typestr, txtype , currency , currencytype } = txtypes [ idxtxtype ]
		switch ( txtype ) {
			case 1 : from_ = myaddress 
				to_ = createaccount().address
			break
			case 2 : from_= 	createaccount().address
				to_ = myaddress
			break
		}
		if ( currency ) {}
		else { let token =   await getrandtoken() ;
			currency = token.name 
			assetaddress = token.address
		}
	let amounttodisp =getrandomfloat ( 0.1 , 20 , 2 ) 
		await db['transactions'].create({
	username //   
, from_ //
, to_ // 
, txhash : generaterandomhex ( 64,'txhash') 
, amounttodisp
, amount : web3.utils.toWei ( amounttodisp ) 
// , amount : getrandn(1,1000) + '00000000000000000'
, currency // 
, nettype //
// , writer   
, type
, typestr  
, uuid : uuid.v4()
, txtype
, useruuid
, currencytype 
, assetaddress
		})
	}
}

main()
// 0x27a9D1A7E60C343A4a6450a2f31D926E33F46C34
// :30 | NULL      | NULL    | ::ffff:111.65.136.126 | tester08 | NULL   |     3 | tester08 |      1 | NULL  | scruffyTraffic |                0 | NULL        | NULL          |            0 | NULL      |         1 | NULL       |               0 |               0 | NULL |    NULL | NULL        | NULL     | 48cde6a2-c862-4a94-8e4a-1c55deb2aefe | SEPOLIA-TESTNET |

/* usertokens
  name         | varchar(20)      
, symbol       | varchar(20)      
, decimals     | tinyint(4)       
, address      | varchar(80)      
, writer       | varchar(80)      
, active       | tinyint(4)       
, nettype      | varchar(20)      
, istoken      | tinyint(4)       
, urlimage     | varchar(400)     
, useruuid     | varchar(80)      
, uuid         | varchar(80)      
, amountissued
*/
/* tokens 
name      | varchar(20)      | YES  |     | NULL                |                               |
, symbol    | varchar(20)      | YES  |     | NULL                |                               |
, decimals  | tinyint(4)       | YES  |     | NULL                |                               |
, address   | varchar(80)      | YES  |     | NULL                |                               |
, writer    | varchar(80)      | YES  |     | NULL                |                               |
, active    | tinyint(4)       | YES  |     | 1                   |                               |
, nettype   | varchar(20)      | YES  |     | NULL                |                               |
, istoke*/

