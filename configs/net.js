
//	let NETTYPE='ETH-MAINNET'
// let NETTYPE='ETH-TESTNET'
let NETTYPE = 'KLAYTN-TESTNET'
let tokeninfo = {
		TOKENNAME : 'META'
	, TOKENDECIMALS : 6
}
module.exports ={ 
	NETTYPE
	, ... tokeninfo
//	, TOKENNAME
	//, TOKENDECIMALS
}
