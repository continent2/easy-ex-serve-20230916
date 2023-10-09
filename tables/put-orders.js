const db=require('../models')
const  {updaterow
	, findone
	, findall 
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
const moment = require('moment')
const main=async _=>{
	let list = await findall ( 'orders', { } ) 
	let N = list?.length
	for ( let idx = 0 ; idx < N ; idx ++ ){
		let row = list [ idx ] 
		let timestampunix = moment(row?.createdat).unix() 
		await updaterow ( 'orders' , { id : row?.id } , { timestampunix }  ) 
	}
}
main()
LOGGER( { nChanged } )

