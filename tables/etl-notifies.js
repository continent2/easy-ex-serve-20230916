
const db=require('../models')
const uuid=require('uuid')
const moment = require('moment')
const main=async _=>{
	const useruuid = 'aa32b550-9484-47c7-95b3-585fd30145dd'
	await db['notifies'].create({
// writer     
title : 'free giveaway' ,
contentbody : 'celebrate 1st anniversary' ,
uuid : uuid.v4() ,
type : 1 ,
typestr : 'general' ,
iscommon  : 1 , 
timestamp : moment().unix() ,
useruuid ,
active : 1 
	})
}

const main____=async _=>{
	const useruuid = 'aa32b550-9484-47c7-95b3-585fd30145dd'
	await db['notifies'].create({
// writer     
title : 'welcome message' ,
contentbody : 'youre welcome' ,
uuid : uuid.v4() ,
type : 1 ,
typestr : 'general' ,
iscommon  : 1 , 
timestamp : moment().unix() ,
useruuid ,
active : 1 
	})

}

main()
/*
  writer      
| title       
| contentbody 
| uuid        
| type        
| typestr     
| iscommon    
| timestamp   
| useruuid    
| active      
*/

