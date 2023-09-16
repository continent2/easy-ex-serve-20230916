
const Web3=require('web3')
// const urlrpc = 'http://plus8.co:30413'
const urlrpc = 'http://localhost:30413'
let web3 = new Web3(new Web3.providers.HttpProvider( urlrpc ))

module.exports={ web3 } // ,netkind,nettype } // ,createaccount,aapikeys,getapikey

