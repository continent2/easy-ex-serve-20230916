
const db=require('../models')
const moment=require('moment')
const MAP_TYPECODE_ETC={
	101 : {title : 'Create ordered', iscommon : 0 } ,
	102 : {title : 'Order paid for', iscommon : 0 } ,
	201 : {title : 'Sale registered', iscommon : 0 } ,
	202 : {title : 'Sold', iscommon : 0 } ,
	203 : {title : 'Changed price', iscommon : 0 } ,
	204 : {title : 'Sale canceled', iscommon : 0 } ,
	301 : {title : 'Bought', iscommon : 0 } ,
	302 : {title : 'Buy failed', iscommon : 0 } ,
	401 : {title : 'Claimed', iscommon : 0 } ,
	501 : {title : 'New item', iscommon : 1 } ,
}
const LOGGER=console.log
const STRINGER = JSON.stringify
const getcontentbody=(typecode,auxdata)=>{ let content
	let { item , price , priceunit , pattern } = auxdata
	switch ( typecode ) {
		case 101 : content = `Ordered to create item of pattern ${pattern} for ${price} ${priceunit}` ; break
		case 102 : content = `Order paid: ${ item }, ${price} ${priceunit}` ; break

		case 103 : content = `Payment failed: ${ item }, ${price} ${priceunit}` ; break
		case 104 : content = `Payment address expired: ${ item }, ${price} ${priceunit}` ; break
		case 105 : content = `Item created: ${ item }, ${price} ${priceunit}` ; break

		case 201 : content = `${ item } put on sale for ${ price } ${priceunit }` ; break
		case 202 : content = `Sold ${ item } for ${ price } ${priceunit }` ; break
		case 203 : content = `Change sale price to ${ price} ${ priceunit } of ${ item }` ; break
		case 204 : content = `Canceled sale of ${ item}` ; break

		case 301 : content = `Bought for ${ price } ${ priceunit }, ${ item}` ; break
		case 302 : content = `Buy failed : ${item} for ${price } ${ priceunit }` ; break
		case 401 : content = `Claimed: ${ item }` ; break
		case 501 : content = `New item on sale: ${ item }` ; break
	}
	return content
}
const writenoti = async ( { typecode , useruuid , auxdata, tablename , uuid })=>{
	let 			timestamp   =moment().unix()
	if ( typecode ) {}
	else { LOGGER(`typecode missing@writenoti`) ; return }
	await db[ 'notifies'].create (  {
//		writer      : ''
		typecode //    : ''
		, ... MAP_TYPECODE_ETC [ typecode ]   
//		, title       :  MAP_
		, contentbody : getcontentbody ( typecode , auxdata ) 
//		, uuid        : '' 
//		, type        : '' 
//		, typestr     : '' 
//		, iscommon    : '' 
		, timestamp //   : '' 
		, useruuid //    : '' 
		, active      : 1
		, isread      : 0 // '' 
		, data        : auxdata ? STRINGER( auxdata) : null
		, tablename : tablename || null 
		, uuid : uuid || null
//		, txhash:  ''	
	})

}

module.exports= { writenoti 

}
/** 
writer      : varchar(80) 
		, title       : varchar(100)  
		, contentbody : varchar(1000) 
		, uuid        : varchar(60)   
		, type        : varchar(40)   
		, typestr     : varchar(40)   
		, iscommon    : tinyint(4)    
		, timestamp   : bigint(20)    
		, useruuid    : varchar(80)   
		, active      : tinyint(4)    
		, isread      : tinyint(4)    
		, typecode    : int(11)       
		, data        : varchar(200) 
		,txhash 
*/
/** 
	i create - ordered 101
	i create - success 102

	i sell - register 201
	i sell - sold 202
	i sell - change price 203
	i sell - cancel 204

	i bought - success 301
	i bought - fail  302

	i claimed 401

	someone listed 501
*/

