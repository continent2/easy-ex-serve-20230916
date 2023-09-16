
const abierc20 = [
	{
    type:"event",
    name:"Transfer",
		"inputs":[
				{"indexed":true	,	name:"from" , type : "address"}
			, {"indexed":true , name:"to"	, type : "address"}
			, { name: 'value' , type : 'uint256'}
		],
    "anonymous":false
  }
	, {
		type: 'function'
		, name: 'totalSupply'
		, inputs:[]
		, outputs:[{type:'uint256' , name:'totalsupply_'}
		]
	}
]
//     event Transfer(address indexed from, address indexed to, uint256 value);

module.exports={
	abierc20
}

