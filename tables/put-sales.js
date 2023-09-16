const db=require('../models')
const  {updaterow
	, findone
}=require('../utils/db')
const uuid=require('uuid')
const sha256=require('js-sha256')
const LOGGER = console.log
const { getrandomrow ,findall  } = require('../utils/db')
const { getrandomfloat } = require( '../utils/common' )
const {Op}=db.Sequelize
let useruuid = '66348f49-ae27-40df-b85a-5e2ca855912f'
const main=async _=>{
	let list=await findall ( 'sales' , {} )
	let N = list?.length
	for ( let idx = 0 ; idx< N ; idx ++ ){
		let sale= list[ idx ]
		let countviews= getrandomfloat ( 0, 100 , 0)
		countviews = +countviews
		await updaterow ('sales' , { id: sale?.id ,} , { countviews } )
		await updaterow ( 'items', { uuid: sale?.itemuuid } , {  countviews } )
	}

}
main()

