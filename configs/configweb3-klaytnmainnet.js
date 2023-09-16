
const Web3=require('web3')
const urlprovider='https://public-en-cypress.klaytn.net/'
const web3 = new Web3(new Web3.providers.HttpProvider( urlprovider ) )
const chainid = 8217 
module.exports= {
	web3 ,
}

