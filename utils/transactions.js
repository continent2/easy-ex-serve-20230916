
const validate_send_eth=async jdata=>{let {username,sitename,currency,amount}=jdata
return new Promise(async(resolve,reject)=>{
	findonej('balance',{username:username , sitename:sitename,currency:currency,nettype:nettype}).then(async respbaleth=>{let address=respbaleth['address']
		if(address){} else {resolve({status:0,message:'ACCOUNT-INVALID'});return false}
		if(respbaleth['canwithdraw']){} else {resolve({status:0,message:'WITHDRAW-BANNED'}); return false}
		let stakesamount=respbaleth['stakesactive']? respbaleth['stakesamount'] : 0
		let feeineth=await queryethfeetosendethtkn( 1 )
		let balanceeff=respbaleth['amount'] - respbaleth['amountlocked'] - stakesamount - feeineth
		if(balanceeff>=amount ){} else {resolve({status:0,message:'BALANCE-NOT-ENOUGH'}); return false}
//      if(await isethbalanceenough4fee(username,sitename)){} else {resolve({status:0,message:'ETH-BALANCE-NOT-ENOUGH'})}
		let ethbalance=await web3.eth.getBalance(address)
		if(ethbalance && +ethbalance>feeineth){} else {resolve({status:0,message:'NETWORK-NOT-AVAIL'});return false}
		resolve({status:1});return false
})
})
}
const validate_send_token=async jdata=>{let {username,sitename,currency,amount}=jdata
return new Promise(async (resolve,reject)=>{
	findonej('balance',{username:username,sitename:sitename, currency:currency,nettype:nettype}).then(async respbaltoken=>{let address=respbaltoken['address']
		if(address){} else {resolve({status:0,message:'ACCOUNT-INVALID'});return false}
		if(respbaltoken['canwithdraw']){} else {resolve({status:0,message:'WITHDRAW-BANNED'}); return false}
		let stakesamount=respbaltoken['stakesactive']? respbaltoken['stakesamount'] : 0
		let balanceeff=respbaltoken['amount'] - respbaltoken['amountlocked'] - stakesamount
		if(balanceeff>=amount ){} else {resolve({status:0,message:'BALANCE-NOT-ENOUGH'}); return false}
		let ethbalenough=await isethbalanceenough4fee(username,sitename); if(ethbalenough){} else {resolve({status:0,message:'ETH-BALANCE-NOT-ENOUGH'})}
		let ethbalance=await web3.eth.getBalance(address);      
		let feeineth=await queryethfeetosendethtkn( 0 )
		if(ethbalance && +ethbalance>feeineth){} else {resolve({status:0,message:'NETWORK-NOT-AVAIL'});return false}
		let tokenbal=await gettokenbalance(username,currency)
		if(tokenbal){} else {resolve({status:0,message:'TOKEN-BALANCE-QUERY-ERR'});return false}
		resolve({status:1});return false
	})  
})
}
module.exports={
	validate_send_eth
	, validate_send_token
}
