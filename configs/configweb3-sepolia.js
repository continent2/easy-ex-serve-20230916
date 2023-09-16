

const Web3=require('web3')
const urlrpc = 'https://eth-sepolia.g.alchemy.com/v2/vsdUmKoyATNagyh4njMRhld5ZwhEUM1z'
let web3 = new Web3(new Web3.providers.HttpProvider( urlrpc ))

module.exports={ web3 } // ,netkind,nettype } // ,createaccount,aapikeys,getapikey

