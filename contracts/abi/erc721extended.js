
const abierc721extended = [
  {	name: 'mint_byuser_singlecopy',
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
, {	name: 'put_item_onsale'
	, type : 'function'
	, payable : true
	, constant : true
	, inputs : [
			{type : 'uint256' , name : '_tokenid' }
		, {type : 'address' , name : '_paymeans'} 
		, {type : 'uint256' , name : '_offerprice'} 
		, {type : 'uint256' , name : '_expiry'} 
		, {type : 'uint' , name : '_saletype'} 
		]
	}
,	{ name: 'cancel_sale'
	, type : 'function'
	, payable : true 
	, constant : true
	, inputs : [
			{type: 'uint256' , name : '_tokenid'}
		]
	}
, { name : 'is_sale_cancellable'
		, type : 'function'
		, payable : false
		, constant : true
		, inputs : [
				{type: 'uint256' , name : '_tokenid'}
			]
		, outputs : [
			{	type : 'bool' , name : 'iscancellable_' }
		]
	}
// function is_sale_cancellable( uint256 _tokenid) public view returns (bool){	
, { name : 'issaletermsmodifiable'
	, type : 'function'
	, payable : false
	, constant : true
	, inputs : [
			{type: 'uint256' , name : '_tokenid'}
		]
	}
, { name : 'getbidinfo'
		, type : 'function'
		, payable : false
		, constant : true
		, inputs : [
				{type: 'uint256' , name : '_tokenid'}
			]
		, outputs : [
				{ type : 'uint' , name : 'bidcount_' }
			, { type : 'uint256' , name : 'bidamount_' }
			, { type : 'address' , name : 'topbidder_' }
		]		
	}
, { name : 'set_salesterms'
		, type : 'function'
		, payable : true
		, constant : true
		, inputs : [ 
					{ type : 'uint256' , name : '_tokenid' }
				, { type : 'uint' , name : '_bsetprice' }
				, { type : 'uint256' , name : '_price' }
				, { type : 'uint' , name : '_bsetexpiry' }
				, { type : 'uint256' , name : '_expiry' }
				, { type : 'uint' , name : '_bsetpaymeans' }
				, { type : 'address' , name : '_paymeans' }
			]
		, outputs : [	]
	}
, { name : 'deny_buy_request'
		, type : 'function'
		, payable : true
		, constant : true
		, inputs : [ 
			{ type : 'uint256' , name : '_tokenid' }
		]
	}
// function deny_buy_request (uint256 _tokenid) onlyowneroradmin (_tokenid , msg.sender ) public payable { 	
, { name : 'approve_buy_request_fixedpricetype'
		, type : 'function'
		, payable : true
		, constant : true
		, inputs : [ 
			{ type : 'uint256' , name : '_tokenid' }
		]
	}
// function approve_buy_request_fixedpricetype (uint256 _tokenid) onlyowneroradmin(_tokenid , msg.sender )	public payable {
, { name : 'putbid'
		, type : 'function'
		, payable : true
		, constant: true
		, inputs : [
				{ type : 'uint256' , name : '_tokenid' }
			, { type : 'uint256' , name : '_bidamount' }
			, { type : 'address' , name : '_to' }
		]
	}
// 	function put_bid (		uint256 _tokenid		, uint256 _bidamount , address _to	) 	public payable { // uint256 bidamount ;
, { name : 'cancel_bid_fixedprice'
		, type : 'function'
		, payable : true
		, constant: true
		, inputs : [
			{ type : 'uint256' , name : '_tokenid' }
		]
	}
// function cancel_bid_fixedprice ( uint256 _tokenid	) public payable {
, { name : 'isbidcancellable'
		, type : 'function'
		, payable : true
		, constant: true
		, inputs : [
			{ type : 'address' , name : '_eoaaddress' }
			,	{ type : 'uint256' , name : '_tokenid' }
		]
		, outputs : [
			{ type : 'bool' , name : '_iscancellable' }
		]
}
// 	function isbidcancellable ( address _eoaaddress , uint _tokenid ) 	public view returns (bool) // onlyowneroradmin(_tokenid , msg.sender )
, {	name : 'getiteminfo'
		, type : 'function'
		, payable : false
		, constant: true
		, inputs : [
			{ type : 'uint256' , name : '_tokenid' }
		]
		, outputs : [
			{ type : 'uint' , name : 'onsalestatus' }
			,	{ type : 'uint256' , name : 'saleexpiry' }
			,	{ type : 'uint256' , name : 'offerprice' }
			,	{ type : 'address' , name : 'originator' }
			,	{ type : 'uint256' , name : 'originatorfee' }
			,	{ type : 'string' , name : 'hash_' }
			,	{ type : 'uint' , name : 'classnumber' }
			,	{ type : 'uint256' , name : 'copycount' }
			,	{ type : 'address' , name : 'currentowner' }
			,	{ type : 'string' , name : 'metadataurl' }
			,	{ type : 'string' , name : 'rawfileurl' }
		]
}	/**  function getiteminfo (uint256 _tokenid) public view returns (
		uint onsalestatus,
		uint256 saleexpiry,
		uint256 offerprice,
		address originator,
		uint256 originatorfee,
		string memory hash_,
		uint classnumber,
		uint256 copycount,
		address currentowner ,
		string memory metadataurl ,
		string memory rawfileurl
	 ) { */
]
export {
	abierc721extended
}

/** 
 [] 	function set_salesterms (uint256 _tokenid //		, uint _status 
		, uint _bsetprice
		, uint256 _price
		, uint _bsetexpiry
		, uint256 _expiry
		, uint _bsetpaymeans
		, address _paymeans
	) onlyowneroradmin(_tokenid , msg.sender ) public payable { //		if( _status==2){;}	//	else {_maptokenidtoisonsale[_tokenid]=_status;}

 [] function getbidinfo (uint256 _tokenid) public view returns (			uint bidcount_, //		uint256 ,

 []	function issaletermsmodifiable (uint256 _tokenid ) public view onlyowneroradmin(_tokenid, msg.sender ) returns (bool)  {

 [] cancel_sale (uint256 _tokenid ) onlyowneroradmin(_tokenid , msg.sender ) onlyowneroradmin(_tokenid,msg.sender) public payable {

 [] function put_item_onsale ( 
 		uint256 _tokenid //0
		, address _paymeans //1
		, uint256 _offerprice //2
		, uint256 _expiry //3
		, uint _saletype //4
	) // onlytokenowner (_tokenid ) // 
public payable {
 
 [] function mi nt_byuser_singlecopy ( // withpricehashorigin_with_adminfee (
	address _to
, string memory _hash
, uint256 _originatorfeeinbp
, address _originator
, string memory _metadataurl
, string memory _rawfileurl
, uint256 _offerprice 
, address _paymeans
) payable public returns (uint256 tokenid){ */
//		, bytes32 _hash
//		, uint256 _originatorfeeinbp
//	, uint _onsalestatus
//		, uint256 _offerexpiry
//		, uint testmode
