const db=require('../models')
const { generaterandomnumber
	,generaterandomhex
}=require('../utils/common')
const { findone ,createrow , findall , updaterow } = require('../utils/db')
const getrandn = generaterandomnumber 
const uuid=require('uuid')
// const web3 = require('web3')
const { generateSlug } =require( "random-word-slugs")
const { web3} = require('../configs/configweb3' )
const main =async _=>{
	let list = await findall ( 'trackpays' , {})
	for ( let idx = 0 ; idx< list?.length; idx ++ ){
		let trackpay = list [ idx ]
		let { saleuuid } = trackpay
		let respsale = await findone ( 'sales' , { uuid : saleuuid } )
		if ( respsale ) {}
		else { continue } 
		let { itemuuid } = respsale
		await updaterow ( 'trackpays' , { id : trackpay?.id } , { itemuuid } ) 

	}

}

main()
// 0x27a9D1A7E60C343A4a6450a2f31D926E33F46C34
// :30 | NULL      | NULL    | ::ffff:111.65.136.126 | tester08 | NULL   |     3 | tester08 |      1 | NULL  | scruffyTraffic |                0 | NULL        | NULL          |            0 | NULL      |         1 | NULL       |               0 |               0 | NULL |    NULL | NULL        | NULL     | 48cde6a2-c862-4a94-8e4a-1c55deb2aefe | SEPOLIA-TESTNET |

/** 
address       | varchar(80)|
, name          | varchar(80)  
, privatekey    | varchar(80)  
, isonsale      | tinyint(4)   
, isclaimed     | int(11)      
, pkeyhash      | varchar(100) 
, useruuid      | varchar(80)  
, uuid          | varchar(80)  
, countviews    | bigint(20) un
, reqprefix     | varchar(40)  
, reqsuffix     | varchar(40)  
, reqpatternlen 
*/

