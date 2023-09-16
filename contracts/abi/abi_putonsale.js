
const abi_putonsale = [
	, {	name: 'put_item_onsale_v0_1_0'
	, type : 'function'
	, payable : true
	, constant : true
	, inputs : [
			{type : 'uint256' , name : '_tokenid' }
		, {type : 'address' , name : '_paymeans'} 
		, {type : 'uint256' , name : '_offerprice'} 
		, {type : 'uint256' , name : '_expiry'} 
		, {type : 'uint' , name : '_saletype'} 
		, {type : 'uint' , name : '_productionmode'} 
		]
	}
]
export {
	abi_putonsale
}
