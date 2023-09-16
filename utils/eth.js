const Web3=require('web3')

//import Web3 from 'web3';
// import { generaterandomstr_charset , ISFINITE, LOGGER } from './common'
const getweirep=val=> Web3.utils.toWei(val)

const getweirep_hex= val =>{
	let str = Web3.utils.toWei(val)
	return (+str).toString(16)
}
const getethrep=val=>Web3.utils.fromWei( String(val) )
const istwoaddresses_same=(address0,address1)=>{
	if(address0){} else {return false}
	if(address1){} else {return false}
	return address0.toLowerCase()==address1.toLowerCase()
}
// const getrandomtxhash=_=>generaterandomstr_charset( 64 , 'hex')

// const calcfee_inwei_hex = jargs=>{	let {price , adminfeebp}=jargs
// 	price=+price
// 	adminfeebp=+adminfeebp
// 	if(ISFINITE(price) && price>0){} else {return 0}
// 	if(ISFINITE(adminfeebp) && adminfeebp >0){} else {return 0}
// 	LOGGER('@fee-in-wei' , ( price * adminfeebp / 10000))
// 	let val = getweirep( ''+( price * adminfeebp / 10000) )
// 	return (+val).toString( 16 )
// }
// const calcfee_inwei=jargs=>{			let { price , adminfeebp }=jargs
// 	price=+price
// 	adminfeebp=+adminfeebp
// 	if(ISFINITE(price) && price>0){} else {return 0}
// 	if(ISFINITE(adminfeebp) && adminfeebp >0){} else {return 0}
// 	LOGGER('@fee-in-wei' , ( price * adminfeebp / 10000))
// 	return  getweirep( ''+( price * adminfeebp / 10000) )
// }

// const calcfee_ineth=jargs=>{			let { price , adminfeebp }=jargs
// 	price=+price
// 	adminfeebp=+adminfeebp
// 	if(ISFINITE(price) && price>0){} else {return 0}
// 	if(ISFINITE(adminfeebp) && adminfeebp >0){} else {return 0}
// 	LOGGER('@fee-in-eth' , ( price * adminfeebp / 10000))
// 	return   price * adminfeebp / 10000
// //	return  ''+( price * adminfeebp / 10000)
// }
module.exports = { //	showaddresstrimmed	, 
	getweirep
	// , getweirep_hex // getweirep_dechex
	, getethrep
	// , istwoaddresses_same
	// , getrandomtxhash
	// , calcfee_inwei_hex
	// , calcfee_inwei
	// , calcfee_ineth
}
