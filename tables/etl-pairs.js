const db=require('../models')
const  {updaterow, createrow }=require('../utils/db')
const uuid=require('uuid')
const revstr = str => { return str.split('').reverse().join('') }

const MY_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";
const uuidv5=str=> uuid.v5 ( str , MY_NAMESPACE ) 

const main=async _=>{
	let list=await db['tickers'].findAll({raw:true,} )
	for ( let ticker of list ) {
//		await updaterow( 'tokens' , { id: elem.id } , { uuid: uuid.v4() } )
		await createrow ( 'pairs', { 
			'base' : ticker?.base ,
			'quote' : ticker?.quote  ,
			'fromamount' : ticker?.fromamount ,
			'toamount' : ticker?.toamount ,
			exchangerate : ticker?.value ,
			fixedrate : ticker?.value ,
			isusefixedrate : 0 ,
			'typestr' : ticker?.typestr ,
			'active' : 1 ,
			uuid : uuidv5 ( `${ ticker?.base }-${ ticker?.quote }` )
		} )
		await createrow ( 'pairs' , { 
			'base' : ticker?.quote ,
			'quote' : ticker?.base  ,
			'fromamount' : ticker?.toamount ,
			'toamount' : ticker?.fromamount ,
			exchangerate : ( 1 / +ticker?.value ).toFixed(12 ) ,
			fixedrate : ( 1/ +ticker?.value ).toFixed( 12) ,
			isusefixedrate : 0 ,
			'typestr' : revstr ( ticker?.typestr  ) ,
			'active' : 1 ,
			uuid : uuidv5 ( `${ ticker?.quote }-${ ticker?.base }` )
		})
	}
}
main()
/** pairs
  quote           | varchar(20
| base            | varchar(20
| fromamount      | varchar(20
| toamount        | varchar(20
| exchangerate    | varchar(20
| fixedrate       | varchar(20
| isusedfixedrate | tinyint(4)
| active          | tinyint(4)
| typestr         | varchar(20
*/

/**    tickers 
     quote: KRW
      base: USDT
     value: 1329.93
fromamount: 1
  toamount: 1329.93
   typestr: CF
    source: NULL
    active: 1

*/

