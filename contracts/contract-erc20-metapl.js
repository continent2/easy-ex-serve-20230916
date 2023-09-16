

const { web3}=require('../configs/configweb3')
const { abierc20 }=require('./abierc20')
const address = '0x70e509a0d868f023a8a16787bd659a3bb1357ee1'
let contr_token_metapl = new web3.eth.Contract(
	abierc20
	, address
)
const LOGGER=console.log
// contr_token_metapl.getPastEvents('Transfer' , (err,events)=>{	LOGGER(err);	LOGGER(events ) })
const address_eoa='0x5c7552f154D81a99e2b5678fC5fD7d1a4085d8d7'
//	const address_eoa='0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed'

const get_past_logs=_=>{
	web3.eth.getPastLogs({fromBlock:'0x0',address: address_eoa
		, topics:[web3.utils.sha3("Transfer(address,address,uint256)") ]

 }).then(LOGGER)
// 	web3.eth.getPastLogs({fromBlock:'0x0',address: address_eoa }).then(LOGGER)
}
get_past_logs()
return 
const resolveens=_=>{
	web3.eth.ens.getResolver('ethereum.eth').then(function (contract) {
		LOGGER(	 contract._address //	, contract.address//    console.log(contract
		);
	})
// => 0x42D63ae25990889E35F215bC95884039Ba354115
	LOGGER(web3.eth.ens.registry)
}
/**
[
  {
    address: '0x70E509A0d868F023A8A16787bd659a3bb1357eE1',
    blockHash: '0x657f51f8f1359addaa9ff295145fb29742cfe6ceb95a6a2e8c7922e95eede32d',
    blockNumber: 11586194,
    data: '0x0000000000000000000000000000000000000000000000000000000005f5e100',
    logIndex: 1,
    removed: false,
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x0000000000000000000000005c7552f154d81a99e2b5678fc5fd7d1a4085d8d7',
      '0x000000000000000000000000aec2f4dd8b08eef0c71b02f97978106d875464ed'
    ],
    transactionHash: '0x6b45ab6ee64b6234cc68b07bd883233c8e71f1084d726e7a9c84922db7346994',
    transactionIndex: 3,
    id: 'log_dfed33ba'
  },

*/
const get_total_supply = _=>{ contr_token_metapl.methods.totalSupply().call().then(LOGGER) }
// https://ropsten.etherscan.io/tx/0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5#eventlog
false && contr_token_metapl .getPastEvents("Transfer", {
	 fromBlock: 0 ,
    filter: {
      isError: 0,
      txreceipt_status: 1
    },
    topics: [
      web3.utils.sha3("Transfer(address,address,uint256)"),
      null,
      web3.utils.padLeft(address_eoa , 64)
    ]
  }).then(LOGGER)


