const db=require('../models')
const { generaterandomnumber
	,generaterandomhex
}=require('../utils/common')
const { findone ,createrow
	, getrandomrow
 } = require('../utils/db')
const getrandn = generaterandomnumber 
const uuid=require('uuid')
const { getrandomfloat } = require('../utils/common')
// const web3 = require('web3')
const { generateSlug } =require( "random-word-slugs")
const { web3} = require('../configs/configweb3' )
const {Op}=db.Sequelize
const LOGGER=console.log
const main =async _=>{
	let N =20 // 10 
	for ( let idx = 0 ;idx<N ; idx ++ ){
		let row = await getrandomrow ( 'items' , { useruuid : '2ab924c0-a08f-42cd-afd6-80e33650ee25' , isonsale: { [Op.ne] : 1 }})
		let price = getrandomfloat ( 1,100 , 2 )
		let feerate =getrandomfloat ( 1,10 , 1 ) 
		LOGGER( 'ITEMUUID' , idx , row?.uuid , price ,feerate )
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

