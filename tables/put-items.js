const db=require('../models')
const  {updaterow
	, findone
}=require('../utils/db')
const uuid=require('uuid')
const sha256=require('js-sha256')
const LOGGER = console.log
const { getrandomrow ,} = require('../utils/db')
const {Op}=db.Sequelize
//	let useruuid = '66348f49-ae27-40df-b85a-5e2ca855912f'
//	let useruuid = '690a1403-fc59-4402-b07e-cdda59aa5507'
let useruuid = '7cb5ad7e-38b9-40f2-8b2f-954fa6f9460d'
let nChanged = 0
const main=async _=>{
	let N = 100
	for ( let idx = 0 ; idx<N ; idx ++ ) {
		let row = await getrandomrow ( 'items' , { useruuid :  { [Op.or ]: [ '',null] } } )
		if ( row ) {}
		else { continue } 
//		let row = await getrandomrow ( 'items' , { useruuid :  null} )
//		let row = await getrandomrow ( 'items' , { useruuid :  null } )
//		let row = await getrandomrow ( 'items' , { useruuid : { [Op.eq] : null } } )
		await updaterow ( 'items' , { id : row?.id } , { useruuid , isclaimed : 1  } )
		nChanged ++
	}
//	LOGGER( jcounts )
}
main()
LOGGER( { nChanged } )

