
const abi_mint_and_sell = [
  {	name: 'mintsinglecopy_sell',
    type: 'function',
    payable: true ,
    constant: true,
    inputs: [
      	{ type: 'address', name: '_to' }
			,	{ type: 'string', name: '_hash' }
			, { type: 'uint256', name: '_originatorfeeinbp' }
			, { type: 'address', name: '_originator' }
			, { type: 'string', name: '_metadataurl' }
			, { type: 'string', name: '_rawfileurl' }
			, { type: 'uint256', name: '_offerprice' }
			, { type: 'address', name: '_paymeans' }
			, { type: 'uint', name: '_productionmode' }
			, { type : 'uint' , name : '_saletype' }
			, { type : 'uint256' , name:  '_expiry' }
			//		, address _paymeans
			//		, uint256 _offerprice								
    ],
    outputs: [ { type: 'uint256', name: 'tokenid' } ]
	}
]
const abi_mint_and_sell_fee = [
	{ name : 'mintsinglecopy_sell_fee'
	, type : 'function'
	, payable : true
	, constant : true
	, inputs : [
		{ type: 'address', name: '_to' }
		,	{ type: 'string', name: '_hash' }
		, { type: 'uint256', name: '_originatorfeeinbp' }
		, { type: 'address', name: '_originator' }
		, { type: 'string', name: '_metadataurl' }
		, { type: 'string', name: '_rawfileurl' }
		, { type: 'uint256', name: '_offerprice' }
		, { type: 'address', name: '_paymeans' }
		, { type : 'uint256' , name:  '_expiry' }
	]
	, outputs: [ { type: 'uint256', name: 'tokenid' } ]
	}
]
export {
	abi_mint_and_sell
	, abi_mint_and_sell_fee
// 	abi_mint
}
