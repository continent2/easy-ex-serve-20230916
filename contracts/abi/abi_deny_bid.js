
const abi_deny_bid = [
	, {	name: 'deny_bid'
	, type : 'function'
	, payable : true
	, constant : true
	, inputs : [
			{type : 'uint256' , name : '_tokenid' }
		, {type : 'uint' , name : '_productionmode'} 
		]
	}
]
const abi_deny_bid_fee = [
	, {	name: 'denybid'
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
	abi_deny_bid
	, abi_deny_bid_fee
}
