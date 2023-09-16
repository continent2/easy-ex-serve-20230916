const axios = require('axios');

const api_key = "b3890ed692bb465eb7b25bd5d49"; //하드코딩

function getWalletRecode( addressNum = "0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed", pageNum="0", pageSize="10" ){
  let API_COVALENTHQ_INFO_GET = `https://api.covalenthq.com/v1/1/address/${addressNum}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=true&no-logs=false&page-number=${pageNum}&page-size=${pageSize}&key=ckey_${api_key}`;
  return new Promise ((resolve, reject)=>{
		axios
    .get(`${API_COVALENTHQ_INFO_GET}`).then(resp=>{
			resolve(resp.data.data.items);
      //      console.log(resp.data.data.items);
		})
  });
}
getWalletRecode();
module.exports= { getWalletRecode };
