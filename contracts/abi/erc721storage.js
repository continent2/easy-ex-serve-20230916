const abierc721storage = [
  {	name: '_maphashtotokenid',
    type: 'function',
    payable: false ,
    constant: true,
    inputs: [
			{ type: 'string', name: '_hash' }
    ],
    outputs: [ 
			{ type: 'uint256', name: 'tokenid' } 
		]
	} 
	, { name : '_tokencount'
		, type : 'function'
		, payable : false
		, constant : true
		, inputs : []
		, outputs : [
			{ type : 'uint256' , name : '_tokencount' }
		]
	}
	, { name : '_feecollector'
		, type : 'function'
		, payable : false
		, constant : true
		, inputs : []
		, outputs : [
			{ type : 'adderss' , name : '_feecollector' }
		]
	}
]
export {
	abierc721storage
}



