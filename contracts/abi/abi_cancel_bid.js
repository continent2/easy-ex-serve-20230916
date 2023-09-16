
const abi_cancel_bid = [
	, {	name: 'cancel_bid'
	, type : 'function'
	, payable : true
	, constant : true
	, inputs : [
			{type : 'uint256' , name : '_tokenid' }
		, {type : 'uint' , name : '_productionmode'} 
		]
	}
]
const abi_cancel_bid_fee= [
	, {	name: 'cancelbid'
	, type : 'function'
	, payable : true
	, constant : true
	, inputs : [
			{type : 'uint256' , name : '_tokenid' }
		, {type : 'uint' , name : '_payer_incumbent_vault'} 
		]
	}
]
export {
	abi_cancel_bid
	, abi_cancel_bid_fee
}
