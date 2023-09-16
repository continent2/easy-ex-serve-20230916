const db=require('../models')
const { generaterandomnumber
	,generaterandomhex
}=require('../utils/common')
const { findone } = require('../utils/db')
const getrandn = generaterandomnumber 
const txtypes=[
	{type: 11 ,typestr:'TX-COIN',supertype: 1 , currency: 'PLUS' , currencytype : 1 } ,
	{type: 12 ,typestr:'TX-TOKEN',supertype: 1 , currencytype : 2 } ,
	{type: 21 ,typestr:'RX-COIN',supertype: 2 , currency: 'PLUS' , currencytype : 1 } ,
	{type: 22 ,typestr:'RX-TOKEN',supertype: 2 , currencytype : 2 } ,
]
const {createaccount} = require('../configs/configweb3' )
const getrandtoken=async _=>{
	let resp = await findone('tokens' , {active:1 } )
	return resp 
}
const uuid=require('uuid')
const main =async _=>{
	let N =300 
	let username='tester08'
	let useruuid='48cde6a2-c862-4a94-8e4a-1c55deb2aefe'
	let nettype='SEPOLIA-TESTNET'
	let idxtxtype
	let from_
	let to_ 
	let myaddress='0x27a9D1A7E60C343A4a6450a2f31D926E33F46C34'

	for ( idx =0;idx<N ; idx++){
		idxtxtype = getrandn ( 0, 3 )
		let { type, typestr, supertype , currency , currencytype } = txtypes [ idxtxtype ]
		switch ( supertype ) {
			case 1 : from_ = myaddress 
				to_ = createaccount().address
			break
			case 2 : from_= 	createaccount().address
				to_ = myaddress
			break
		}
		if ( currency ) {}
		else { let {name}= await getrandtoken() ; currency = name }
		await db['transactions'].create({
	username //   
, from_ //
, to_ // 
, txhash : generaterandomhex ( 64,'txhash') 
, amount : getrandn(1,1000) + '00000000000000000'
, currency // 
, nettype //
// , writer   
, type
, typestr  
, uuid : uuid.v4()
, supertype
, useruuid
, currencytype 
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

