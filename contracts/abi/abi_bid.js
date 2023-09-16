
const abi_bid = [
  {	name: 'putbid' , // _bid_v0_1_0',
    type: 'function',
    payable: true ,
    constant: true,
    inputs: [
				{ type : 'uint256' , name : '_tokenid' }
			, { type : 'uint256' , name : '_bidamount' }
			, { type : 'address' , name : '_to' }
			, { type: 'uint', name: '_productionmode' }
    ]
	}
]
const abi_bid_fee = [
  {	name: 'putbid' , // _bid_v0_1_0',
    type: 'function',
    payable: true ,
    constant: true,
    inputs: [
				{ type : 'uint256' , name : '_tokenid' }
			, { type : 'uint256' , name : '_bidamount' }
			, { type : 'address' , name : '_to' }
			, { type: 'uint', name: '_receiver_incumbent_vault' }
    ]
	}
]

export {
	abi_bid
	, abi_bid_fee
}
