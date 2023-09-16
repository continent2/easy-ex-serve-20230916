const axios = require('axios');

function getMetaplanetRecode( addressNum = "0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed", pageNum="1", pageSize="10" ){
  // let API_COVALENTHQ_INFO_GET = `https://api.covalenthq.com/v1/1/address/${addressNum}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=true&no-logs=false&page-number=${pageNum}&page-size=${pageSize}&key=ckey_${api_key}`;
  const tokent_conn = "0x70e509a0d868f023a8a16787bd659a3bb1357ee1";
  const api_key = "A64DT2C1R5JR8NEM1GIU1RHGWZBVY89RFP"; //하드코딩

  let API_METAPLANET_INFO_GET = `https://api-ropsten.etherscan.io/api?module=account&action=tokentx`;
  API_METAPLANET_INFO_GET += `&contractaddress=${tokent_conn}`
  API_METAPLANET_INFO_GET += `&address=${addressNum}`
  API_METAPLANET_INFO_GET += `&page=${pageNum}&offset=${pageSize}`
  API_METAPLANET_INFO_GET += `&startblock=0&endblock=27025780`
  API_METAPLANET_INFO_GET += `&sort=desc`
  API_METAPLANET_INFO_GET += `&apikey=${api_key}`;
  return new Promise ((resolve, reject)=>{
		axios
    .get(`${API_METAPLANET_INFO_GET}`).then(resp=>{
			resolve(resp.data);
		})
  });
}
// getWalletRecode();
module.exports= { getMetaplanetRecode };
