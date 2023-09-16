const db=require('../models')
const  {updaterow
	, findone
}=require('../utils/db')
const uuid=require('uuid')
const sha256=require('js-sha256')
const LOGGER = console.log

const main=async _=>{
	let list=await db['users'].findAll({raw:true,} )
	let jcounts={ p: 0 , n: 0 }
	for ( let user of list ) {
		let { uuid : useruuid } = user
		let respacct = await findone ( 'accounts', { useruuid  } )
		if ( respacct ) {
			await updaterow ( 'users' , {uuid: useruuid } , { address : respacct?.address }  )
			++ jcounts.p 
		}
		else { 
			++ jcounts.n
		} 
	}
	LOGGER( jcounts )
}
const main_______=async _=>{
	let list=await db['users'].findAll({raw:true,} )
	for ( let user of list ) {

		await updaterow( 'users' , {id:user.id } , {
			pwhash : sha256( user.pw ) 

		 } )

	}
}
main()

