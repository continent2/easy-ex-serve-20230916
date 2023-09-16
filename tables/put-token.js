const db=require('../models')
const  {updaterow}=require('../utils/db')
const uuid=require('uuid')

const main=async _=>{
	let list=await db['tokens'].findAll({raw:true,} )
	for ( let elem of list ) {
		await updaterow( 'tokens' , { id: elem.id } , { uuid: uuid.v4() } )
	}
}
main()

