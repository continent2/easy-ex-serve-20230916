
const MAP_ACTIONTYPES={
	"MINT_SINGLE" : 0
	,"PUT_ONSALE" :1
	,"EDIT_SALE_TERMS" :2 
	,"SET_SALE_TERMS" :3
	,"SET_SALE_EXPIRY" :4
	,"CHANGE_PRICE" :5
	,"SET_PAYMEANS" :6
	,"APPROVE_BUY_REQUEST" :7
	,"DENY_BUY_REQUEST" :8
	,"CANCEL_SALE" :9
	,"PUT_BID" :10
	,"CANCEL_BID" :11
}

const abi_admin = [
{	name: '_originator_feeinbp_range' 
	, type: 'function'
	, payable : false
	, constant : true
	, inputs:[ 				{ type : 'uint' , name: '_index'}
	], outputs:[
		{ type : 'uint' , name: 'feeupperbound' } //	, { type : 'uint []' , name: 'fees_'}
	]
/** 	, inputs:[ 				{ type : 'uint' , name: '_index'}
	], outputs:[
		{ type : 'uint []' , name: 'feerange_' } //	, { type : 'uint []' , name: 'fees_'}
	] */
}
//	_originator_feeinbp_range
,	{	name: 'query_admin_fee',
		type: 'function',
		payable: false ,
		constant: true,
		inputs: [			{ type: 'string', name: '_action' }
		],
		outputs: [ { type: 'uint', name: 'feeamount_' } 
	]
	}	,
// function get_admin_fee (string memory _action ) public view returns (uint ) {
	, {name: 'query_admin_fees'
		, type: 'function'
		, payable : false
		, constant : true
		, inputs:[
//			{ type : '' , name: ''}
		], outputs:[
			{ type : 'string []' , name: 'actions_'}
		, { type : 'uint []' , name: 'fees_'}
		]
	}
]
export {
	MAP_ACTIONTYPES
	, abi_admin
}

	
