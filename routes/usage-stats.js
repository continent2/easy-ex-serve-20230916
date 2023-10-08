
const { findall , updaterow } = require ('../utils/db')
const cron = require ('node-cron')
const { gettime } = require('../utils/common' )
const db = require('../models')
const { Op } = db.Sequelize;

const PERIOD_STAT_CALC_IN_DAYS = 1 
const arrmap_sumamount_level = [ // 0
	500_000 , // 0
	2000_000 , // 1
	5000_000 // 2
] // 3
const Nthresholds = 3
const findlevel=sumamount=>{
	sumamount = +sumamount
	for ( let idx = 0 ; idx< Nthresholds ; idx ++ ){
		if ( sumamount < arrmap_sumamount_level [ idx ] ) { return idx }
	}
	return Nthresholds 
}
cron.schedule ( '0 0 0 * * *' , async _=>{ // every midnight
	let list = await findall( 'users' , {} )
	let N = list?.length
	const timenow = gettime().unix
	const timethen= timenow - 3600 * 24 * +PERIOD_STAT_CALC_IN_DAYS
	for ( let idx = 0 ; idx<N ; idx ++ ){
		let user = list [ idx ]
		let { uuid : useruuid } = user
		let listorders = await findall ( 'orders' , {
			timestampunix : { [Op.between ] : [ timethen , timenow  ] },
			active : 0 ,
			status : 5 , 
			useruuid ,
		 } )
		let sumamount = listorders.map ( elem => { 
			switch ( elem?.typestr == 'CF' ){ 
				case 'CF' : return +elem?.toamount 
				break
				case 'FC' : return +elem?.fromamount
				break
				default : return 0
				break
			}
		})
		let uselevel = findlevel ( sumamount )
		await updaterow ( 'users' , { uuid : useruuid } , { uselevel } ) 
	}
}
) 
	
