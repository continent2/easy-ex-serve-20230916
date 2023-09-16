const axios = require('axios');

const getPolygon = (date0="2021-11-15", date1="2021-12-15") => {
  const polygonUrl = `https://api.polygon.io/v2/aggs/ticker/X:ETHUSD/range/1/day/${date0}/${date1}?adjusted=true&sort=asc&limit=5000&apiKey=O7TnmZ49Pjn7cQUTTEpL7zJ5CKfpPCs8`;
  return new Promise ((resolve,reject)=>{
		axios
    .get(`${polygonUrl}`).then(resp=>{
			resolve(resp.data.results)
		})
  });
};
module.exports = { getPolygon };
