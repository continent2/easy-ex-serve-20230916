const db=require('../models')

const main=async _=>{
	let jdata = {
		currency : 'PLUS' ,
		nettype : 'PLUS-MAINNET' ,
		rpcendpoint : 'http://plus8.co:30413' ,
		chainname : 'PLUS'
	}
	await db['settings'].create ( {
		key_ : 'DEFAULT-NETTYPE' ,
		value_  : 'PLUS-MAINNET' ,
		data : JSON.stringify ( jdata ) ,
		active : 1
	} )
}

main ()

/** {"currency":"PLUS","nettype":"SEPOLIA-TESTNET","rpcendpoint":"https://eth-sepolia.g.alchemy.com/v2/vsdUmKoyATNagyh4njMRhld5ZwhEUM1z","chainname":"PLUS"}

  8 | 2022-01-10 12:40:44 | NULL                | TOKEN_DECIMALS                           | 6                                          | NULL    | NULL                                                                                                                                                     |   NULL |
|  9 | 2023-07-07 07:55:10 | 2023-07-07 07:55:57 | DEFAULT-NETTYPE                          | SEPOLIA-TESTNET                            | NULL    | {"currency":"PLUS","nettype":"SEPOLIA-TESTNET","rpcendpoint":"https://eth-sepolia.g.alchemy.com/v2/vsdUmKoyATNagyh4njMRhld5ZwhEUM1z","chainname":"PLUS"} |   NULL |
+----+---------------------+---------------------+------------------------------------------+-----------------------------------------
:wa

--------------------------------------------------------------------------------------------------+--------+
| id | createdat           | updatedat           | key_            | value_          | subkey_ | data                                                                                                                                                     | active |
+----+---------------------+---------------------+-----------------+-----------------+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------+--------+
|  9 | 2023-07-07 07:55:10 | 2023-07-07 07:55:57 | DEFAULT-NETTYPE | SEPOLIA-TESTNET | NULL    | {"currency":"PLUS","nettype":"SEPOLIA-TESTNET","rpcendpoint":"https://eth-sepolia.g.alchemy.com/v2/vsdUmKoyATNagyh4njMRhld5ZwhEUM1z","chainname":"PLUS"} |   NULL |
+----+---------------------+---------------------+-----------------+-----------------+---------+-----------------------------------------------------------------
*/


