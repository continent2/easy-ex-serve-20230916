
const awaitTransactionMined = require ('await-transaction-mined');
const { jweb3 } = require('../configs/configweb3' ) 
let web3 = jweb3 ['PLUS-TESTNET' ]

var txhash = '0xd69d6cbb972f442d654e5c638eb33517c10a1de1451c1aeb66f97b03c368328f';
awaitTransactionMined.awaitTx(web3, txhash).then(console.log)

