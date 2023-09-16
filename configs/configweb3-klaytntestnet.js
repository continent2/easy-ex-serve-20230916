
const Web3=require('web3')
const urlprovider='https://public-en-baobab.klaytn.net/'
const web3 = new Web3(new Web3.providers.HttpProvider( urlprovider ) )
const chainid = 1001 
module.exports= {
	web3 ,
}
