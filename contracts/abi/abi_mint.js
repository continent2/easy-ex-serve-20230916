
const abi_mint = [
  {	name: 'mintsinglecopy',
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
    ],
    outputs: [ { type: 'uint256', name: 'tokenid' } ]
	}
]
export {
	abi_mint
}
