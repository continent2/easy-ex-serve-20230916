
const db=require('../models')
const { sha3_512 } =require( 'js-sha3')

const isaddressvalid=(address)=> { address=address.toLowerCase()
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) { // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) { // If it's all small caps or all all caps, return true
        return true;
    } else {	// Otherwise check each case
        return false // return ischecksumaddress(address);
    }
};
const ischecksumaddress = (address)=> {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3_512(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

const { query_with_arg , query_noarg
	,query_eth_balance 
 }=require('./contract-calls')
const LOGGER=console.log
const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
const iszeroaddress=straddress=>{ return parseInt(straddress, 16) === 0
}
const querybalance=async jargs=>{ // { nettype , contractaddress , useraddress }
	let { nettype , contractaddress , useraddress } = jargs
	let resp
	switch ( iszeroaddress ( contractaddress )) {
		case true : resp = await query_eth_balance ( { nettype , useraddress }) 
		break
		case false : resp = await query_with_arg ( { nettype , contractaddress , abikind : 'ERC20' 
		, methodname: 'balanceOf' , aargs : [useraddress] 
			} )
		break
	}	
	return resp
}
const query_token_exists= async jargs=>{
	let { nettype ,address, isstrictlytoken }= jargs
	if ( iszeroaddress ( address) ){ 
		if ( isstrictlytoken ) {	}
		else {return true 		}
	}
	try { 
		let resp = await query_with_arg({ nettype , // :'S EPOLIA-TESTNET' ,
			contractaddress: address , 
			abikind:'ERC20' , 
			methodname:'balanceOf' , 
			aargs:['0xC5DfBE335c32DCd4e4C4dB283d059d4cCB0572DC']
		}	)
		return true // resp
	} catch ( err){	LOGGER( err)
		return null
	}
}
const query_token_info=async jargs=>{
	let { nettype , address}=jargs
	let aproms=[]
	if ( iszeroaddress ( address ) ){		
		let resp = await db['tokens'].findOne( {raw:true, where : {nettype , address} } )
		if (resp){ return { ... resp , totalSupply : null }}  
		else { return null }
	}
	else {}
	aproms[ aproms.length ]=query_noarg ({nettype , contractaddress:address , abikind:'ERC20', methodname:'name'})
	aproms[ aproms.length ]=query_noarg ({nettype , contractaddress:address , abikind:'ERC20', methodname:'symbol'})
	aproms[ aproms.length ]=query_noarg ({nettype , contractaddress:address , abikind:'ERC20', methodname:'decimals'})
	aproms[ aproms.length ]=query_noarg ({nettype , contractaddress:address , abikind:'ERC20', methodname:'totalSupply'})
	aproms[ aproms.length ]=db['tokens'].findOne({raw:true, where : { nettype , address } } )

	let aresps=await Promise.all ( aproms )
	let urllogo  =aresps[ 4] ? aresps[4].urllogo : null
	let retval={ 
		name : aresps[0 ] ,
		symbol: aresps[1 ] ,
		decimals : aresps[2 ] ,
		totalSupply : aresps[3 ] ,
		urllogo
	}
	return retval
} 
module.exports= { querybalance ,isaddressvalid ,
	query_token_exists ,
	query_token_info ,
	ADDRESS_ZERO 
,ischecksumaddress
, iszeroaddress 
}

