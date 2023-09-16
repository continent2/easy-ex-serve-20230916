
const abi_approve_bid = [
  {	name: 'approvebid', // app rove_bid_v0_1_0
    type: 'function',
    payable: true ,
    constant: true,
    inputs: [
				{ type : 'uint256' , name : '_tokenid' }
			, { type: 'uint', name: '_productionmode' }
    ]
	}
]

const abi_approve_bid_fee = [
	{ name : 'approvebid'
	, type : 'function'
	, payable : true
	, constant : true
	,	inputs : [
			{ type : 'uint256' , name : '_tokenid' }
		, { type : 'uint' , name : '_receiver_incumbent_vault'}
	]
	}
]
export {
	abi_approve_bid
	, abi_approve_bid_fee
}

