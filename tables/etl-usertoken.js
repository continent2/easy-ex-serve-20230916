const db=require('../models')

const main =async _=>{
	await db['usertokens'].create ( {
name : 'PLUS' ,
symbol : 'PLUS' ,      
decimals : 18 ,    
address : '0x0000000000000000000000000000000000000000' ,     
writer : '' ,      
active : 1 ,      
nettype : 'SEPOLIA-TESTNET' ,     
istoken : 0 ,     
urlimage : '' ,    
useruuid : '' ,    
uuid : '' ,        
amountissued : '' ,
	})
process.exit()




	await db['tokens'].create ( {
		name : 'TEST00' ,
		symbol : 'TEST00' ,  
		decimals : 18 ,
address : '0x6bada2758afc3b5c9df335447c41d9eb381728aa' , 
writer  : '0xC5DfBE335c32DCd4e4C4dB283d059d4cCB0572DC' , 
active   : 1 ,
nettype  : 'SEPOLIA-TESTNET' ,
istoke : 1 ,
	})
	await db['tokens'].create ( {
		name : 'TEST01' ,
		symbol : 'TEST01' ,  
		decimals : 18 ,
address : '0x16c3b7bab27e4a14fd3fff632584e5fc8b02c63b' , 
writer  : '0xC5DfBE335c32DCd4e4C4dB283d059d4cCB0572DC' , 
active   : 1 ,
nettype  : 'SEPOLIA-TESTNET' ,
istoke : 1 ,
	})
	await db['tokens'].create ( {
		name : 'TEST02' ,
		symbol : 'TEST02' ,  
		decimals : 18 ,
address : '0x4e3c35f498e15b687168280718815f287fa55fb3' , 
writer  : '0xC5DfBE335c32DCd4e4C4dB283d059d4cCB0572DC' , 
active   : 1 ,
nettype  : 'SEPOLIA-TESTNET' ,
istoke : 1 ,
	})
}
main()
/* usertokens
  name         | varchar(20)      
| symbol       | varchar(20)      
| decimals     | tinyint(4)       
| address      | varchar(80)      
| writer       | varchar(80)      
| active       | tinyint(4)       
| nettype      | varchar(20)      
| istoken      | tinyint(4)       
| urlimage     | varchar(400)     
| useruuid     | varchar(80)      
| uuid         | varchar(80)      
| amountissued
*/
/* tokens 
name      | varchar(20)      | YES  |     | NULL                |                               |
| symbol    | varchar(20)      | YES  |     | NULL                |                               |
| decimals  | tinyint(4)       | YES  |     | NULL                |                               |
| address   | varchar(80)      | YES  |     | NULL                |                               |
| writer    | varchar(80)      | YES  |     | NULL                |                               |
| active    | tinyint(4)       | YES  |     | 1                   |                               |
| nettype   | varchar(20)      | YES  |     | NULL                |                               |
| istoke*/

