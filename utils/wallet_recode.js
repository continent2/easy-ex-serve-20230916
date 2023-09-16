const axios = require('axios');

const api_key = "A64DT2C1R5JR8NEM1GIU1RHGWZBVY89RFP"; //하드코딩

function getWalletRecode( addressNum, pageNum = 1, pageSize = 10 ){
  // let API_ETHERSCAN_INFO_GET = `https://api.etherscan.io/api?module=account&action=txlist&address=${addressNum}&startblock=0&endblock=99999999&sort=asc&apikey=${api_key}`;
  let API_ETHERSCAN_INFO_GET = `https://api-ropsten.etherscan.io/api?module=account&action=txlist`
  API_ETHERSCAN_INFO_GET += `&address=${addressNum}`
  API_ETHERSCAN_INFO_GET += `&startblock=0&endblock=99999999`
  API_ETHERSCAN_INFO_GET += `&page=${pageNum}&offset=${pageSize}`
  API_ETHERSCAN_INFO_GET += `&sort=desc`
  API_ETHERSCAN_INFO_GET += `&apikey=${api_key}`;
  return new Promise ((resolve,reject)=>{
		axios
    .get(`${API_ETHERSCAN_INFO_GET}`).then(resp=>{
			resolve(resp.data)
		})
  });
}
module.exports= { getWalletRecode };