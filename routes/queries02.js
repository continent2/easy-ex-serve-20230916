const express = require('express');
const requestIp = require('request-ip');
let { respok, resperr } = require('../utils/rest');
const { getobjtype , convaj , 
	is_positive_int 
} = require('../utils/common');
const jwt = require('jsonwebtoken');
const { auth , softauth } = require('../utils/authMiddleware');
const db = require('../models');
const { lookup } = require('geoip-lite');
var crypto = require('crypto');
const LOGGER = console.log;
const { tableexists , fieldexists } = require('../utils/db')
let { Op } = db.Sequelize;
// const { calculate_dividendrate } = require('../schedule/XXX-calculateDividendRate');
const axios = require('axios');
// const { redisconfig } = require ( '../configs/redis.conf' )
// const cliredisa = require('async-redis').createClient( redisconfig )
const { findone , incrementrow	} =require('../utils/db')
// const { calcdistance } = require( '../utils/locations' )
var router = express.Router();
const convliker = (str) => "%" + str + "%"
const MAP_TABLES_POST_METHOD_ALLOWED = {  } // 'inq
const ISFINITE = Number.isFinite;
////////
const moment=require('moment')
const normalizerange=( min , max , val ) =>{
    var delta = max - min;
    return (val - min) / delta;

} // require( 'normalize-range' )
const HOUROFFSETKST= 9
const { messages} = require('../configs/messages')
const get_list_isopen_closetoday_of_merchants=list=>{
	let timenow = moment()	
	const dow= timenow.day()
	const hournow = normalizerange(0,24 , 9 + timenow.hour() )
	let isopenquery = (t0,t1,hournow)=>{ return hournow<t1 && hournow>=t0 }
	let list_hrinfo = list.map ( ( elem ,idx ) =>{ 
		let isopen = isopenquery ( elem[`hours${dow}0`]	, elem[`hours${dow}1`] , hournow )
		let closeoftoday = elem[`hours${dow}1`]
		let distance = 1 + idx
		return { ... elem , isopen , closeoftoday , distance }
	})
	return list_hrinfo
}
const get_dow_hournow=_=>{	let timenow  = moment()
	const dow= timenow.day()
	const hournow = normalizerange(0,24 , HOUROFFSETKST + timenow.hour() )
	return { dow, hournow }
} 
const MAP_FIELDTYPES=[
	'employtype',
	'corpname' ,
	'paytype',
	'jobtype',
	'jobtype2',
	'region'
]
router.get ( '/suggest-on-searchkey/:tablename/:limit', async ( req,res)=>{
	let {searchkey}=req.query
	if ( searchkey){}
	else { resperr ( res, messages.MSG_ARGMISSING , null,{reason:'searchkey' } ) ; return }
	let { tablename , limit }=req.params
	limit =+limit
	if (ISFINITE(limit)){}
	else {resperr( res, messages.MSG_ARGINVALID ) ; return }
	let liker = convliker(searchkey);
	let aproms =[]
	aproms[aproms.length ] = db[ 'jobposts'].findAll ( { raw: true, where : {employtype : { [ Op.like ] : liker } }, limit })
	aproms[aproms.length ] = db[ 'jobposts'].findAll ( { raw: true, where : {corpname : { [ Op.like ] : liker } }, limit })
	aproms[aproms.length ] = db[ 'jobposts'].findAll ( { raw: true, where : {paytype : { [ Op.like ] : liker } }, limit })
	aproms[aproms.length ] = db[ 'jobposts'].findAll ( { raw: true, where : {jobtype: { [ Op.like ] : liker } }, limit })
	aproms[aproms.length ] = db[ 'jobposts'].findAll ( { raw: true, where : {jobtype2: { [ Op.like ] : liker } }, limit })
	aproms[aproms.length ] = db[ 'jobposts'].findAll ( { raw: true, where : {region: { [ Op.like ] : liker } }, limit })
	let aresps = await Promise.all ( aproms )
	let list =[]
	for ( let idx0 = 0 ; idx0<aresps.length ; idx0++){
		let arr= aresps[ idx0 ] 
		let fieldtype = MAP_FIELDTYPES [ idx0 ] 
		for ( let idx1 =0;idx1<arr.length ; idx1 ++ ){
			list[list.length] = { name : arr[ idx1][ fieldtype ] , fieldtype , category : fieldtype } 
//			list[list.length] = {  ... arr[ idx1][ , fieldtype } 
		}
	}
	respok ( res, null,null, { list } )  
})
				
router.get ( '/bydistance/:tablename/:offset/:limit/:latitude/:longitude' , async ( req,res)=>{ 
	let { tablename , offset , limit , latitude, longitude } = req.params	
	let { isopen } = req.query
//	if ( latitude ) {}
	//else {resperr ( res, messages.MSG_ARGMISSING , null,{reason:'latitude' } ) ; return }
//	if ( longitude ) {}	
	// else {resperr ( res, messages.MSG_ARGMISSING , null,{reason:'longitude' } ) ; return}
	latitude =+latitude
	if ( ISFINITE( latitude ) ){}
	else { resperr ( res, messages.MSG_ARGINVALID , null,{reason:'latitude' } ) ; return }
	longitude=+longitude
	if ( ISFINITE( longitude ) ){}
	else { resperr ( res, messages.MSG_ARGINVALID , null,{reason:'longitude' } ) ; return }
	offset = +offset
	if ( ISFINITE ( offset ) ){}
	else { resperr ( res, messages.MSG_ARGINVALID , null,{reason:'offset' } ) ; return }  
	if ( is_positive_int( limit )){}
	else { resperr ( res, messages.MSG_ARGINVALID , null,{reason:'limit' } ) ; return }  
	limit = +limit
//	let list = await db.sequelize.query( `select * from merchants order by st_distance_sphere(point(latitude , longitude),point( 35.867975 ,-51.399319 ) ) desc limit 4` ) // .then(console.log)
	longitude = normalizerange( -90,+90, longitude )
	let wherestr=''
	if ( isopen ){
		let { dow , hournow } =get_dow_hournow()
		wherestr=`where hours${dow}0<=${hournow} and hours${dow}1>${ hournow }`
	}

	let list = await db.sequelize.query( `select * from ${tablename } ${wherestr} order by st_distance_sphere(point(latitude , longitude),point( ${ latitude } , ${ longitude } ) ) asc  limit ${limit} offset ${offset}` ) // .then(console.log)
	list = list [ 0 ]
/*	let timenow = moment()	
	const dow= timenow.day()
	const hournow = normalizerange(0,24 , 9 + timenow.hour() )
	let isopenquery = (t0,t1,hournow)=>{ return hournow<t1 && hournow>=t0 }
	let list_hrinfo = list.map ( elem =>{ 
		let isopen = isopenquery ( elem[`hours${dow}0`]	, elem[`hours${dow}1`] , hournow )
		let closeoftoday = elem[`hours${dow}1`]
		return { ... elem , isopen , closeoftoday }
	}) */
	let list_hrinfo =  get_list_isopen_closetoday_of_merchants( list )
	respok ( res, null ,null, { list : list_hrinfo } )
})
router.get ( '/aggregate/:tablename/:filterkey/:filterval/:fieldname', async ( req,res)=>{
	let { tablename , filterkey , filterval , fieldname } = req.params
	let jfilter= {}
	jfilter[ filterkey ] = filterval
	let lst= await db[tablename].findAll ( { raw: true , where : { ... jfilter } } )
	let jresp = { sum : 0 , count : 0 , average : 0 }
	if ( lst && lst.length ) {
		let count = lst.length
		let sum = lst.map ( elem=> elem[ fieldname ] ).reduce( (a,b)=> +a + +b  )	
		let average = sum/count
		let straverage = ( average).toFixed ( 2 )
		respok ( res, null, null , {sum , count , average : straverage } ) ; return 
	} else {
		respok ( res, null, null , { ... jresp } ) ; return 
	}
})

router.post ( '/:tablename' , async (req,res) => { LOGGER( req.body )
	let { tablename, }=req.params
  let respex= await tableexists(tablename)
	if ( respex ) {}
	else { resperr( res , 'TABLE-NOT-FOUND' ) ; return }
	await db[ tablename ] .create ( {... req.body } )
	respok ( res )
})
router.put ( '/:tablename/:id' , async ( req,res)=>{ LOGGER( req.body )
	let { tablename, id } = req.params
  let respex= await tableexists(tablename)
	if ( respex ) {}
	else { resperr( res , 'TABLE-NOT-FOUND' ) ; return }
	let resp = await db[tablename].findOne ( {raw: true, where : {id} } ) 
	if ( resp ) {}
	else { resperr ( res , 'DATA-NOT-FOUND' ) ; return } 
	await db[ tablename ].update ( { ... req.body } , {where : { id } } )
	respok ( res )
})
/** router.get( '/kvs/:hashname' , async ( req,res)=>{
	let { hashname } = req.params
	let list = await cliredisa.hgetall ( hashname ) 
	respok ( res, null, null, { list : list || null } )
}) */
router.get("/rows/jsonobject/:tablename/:keyname/:valuename", (req, res) => {
  let { tablename, keyname, valuename } = req.params;
  if (tablename == "users") {
    resperr(res, "ERR-RESTRICTED");
    return;
  }
  tableexists(tablename).then((resp) => {
    if (resp) {
    } else {
      resperr(res, `DATA-NOT-FOUND`);
      return;
    }
//    findall(tablename, {}).then((list) => {
   	db[ tablename ].findAll ({raw: true } ) .then( list => { //  
      let jdata = convaj(list, keyname, valuename); // =(arr,keyname,valuename)=>{
      respok(res, null, null, { respdata: jdata });
    });
  });
});

router.get('/v1/rows/:tblname', (req, res) => {
  let { tblname } = req.params;

  db[tblname]
    .findAll({
      attributes: ['code', 'dialcode'],
    })
    .then((respdata) => {
      respok(res, null, null, { respdata });
    });
});

router.get('/rows/:tblname', (req, res) => {
  let { tblname } = req.params;

  console.log(req.query);
  db[tblname]
    .findAll({
      where: req.query,
    })
    .then((respdata) => {
      respok(res, null, null, { respdata });
    });
});

router.get('/forex', async (req, res) => {
  let { type } = req.query;
  console.log('@@@@@@@@@@@type', type);
  if (type === 'USD/USD') {
    respok(res, null, null, { price: '1' });
  } else {
    await axios
      .get(
        `https://api.twelvedata.com/price?symbol=${type}&apikey=c092ff5093bf4eef83897889e96b3ba7`
      )
      .then((resp) => {
        let { price } = resp.data;

        respok(res, null, null, { price });
      });
  }
});

router.patch('/set/fee', (req, res) => {
  let { key, val } = req.body;
  val = String(val * 100);

  db['feesettings'].update({ value_: val }, { where: { key_: key } });
  respok(res, 'ok');
});

// const fieldexists = async (_) => true;
const MAP_ORDER_BY_VALUES = {
  ASC: 1, asc : 1 ,
  DESC: 1, desc : 1
};
const countrows_scalar = (table, jfilter) => {
  return new Promise((resolve, reject) => {
    db[table].count({ where: { ...jfilter } }).then((resp) => {
      if (resp) {
        resolve(resp);
      } else {
        resolve(0);
      }
    });
  });
};
 
// router.get( '/rows/:tablename/:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval',
router.all( '/rows/:tablename/:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval',
  async (req, res) => {
    let { tablename, fieldname, fieldval, offset, limit, orderkey, orderval } =
      req.params;
    let {
      itemdetail,
      userdetail,
      filterkey,
      filterval,
//			jfilters ,
			jorterms ,
      nettype,
      date0,
      date1,
			isopen
    } = req.query;
		let { jfilters } = req.body
		let jfilters_in
		if ( jfilters && KEYS(jfilters).length > 0 )  { jfilters_in = { ... jfilters } } 
    let { searchkey } = req.query;
    console.log('req.query', req.query);
    //  const username = getusernamefromsession(req);
//    fieldexists(tablename, fieldname).then(async (resp) => {
//      if (resp) {
  //    } else {
    //    resperr(res, messages.MSG_DATANOTFOUND);
//        return;
  //    }
      offset = +offset;
      limit = +limit;
      if (ISFINITE(offset) && offset >= 0 && ISFINITE(limit) && limit >= 1) {
      } else {
        resperr(res, messages.MSG_ARGINVALID, null, {
          payload: { reason: 'offset-or-limit-invalid' },
        });
        return;
      }
      if (MAP_ORDER_BY_VALUES[orderval]) {
      } else {
        resperr(res, messages.MSG_ARGINVALID, null, {
          payload: { reason: 'orderby-value-invalid' },
        });
        return;
      }
      // let respfield_orderkey = await fieldexists(tablename, orderkey);
    //  if (respfield_orderkey) {
  //    } else {
//        resperr(res, messages.MSG_ARGINVALID, null, {
      //    payload: { reason: 'orderkey-invalid' },
    //    });
  //      return;
//      }
      let jfilter = {};
			if ( fieldname == '_' ) {}
			else {       jfilter[fieldname] = fieldval }
      if (filterkey && filterval) {
//        let respfieldexists = await fieldexists(tablename, filterkey);
  //      if (respfieldexists) {
    //    } else {
      //    resperr(res, messages.MSG_DATANOTFOUND);
        //  return;
//        }
        jfilter[filterkey] = filterval;
      } else {
      }
			if ( jfilters_in ) {
				jfilter = { ... jfilter , ... jfilters_in }
			}
      if (searchkey) {
        let liker = convliker(searchkey);
        let jfilter_02 = expand_search(tablename, liker);
        jfilter = { ...jfilter, ...jfilter_02 };
        console.log('jfilter', jfilter);
      } else {
      }
      if (date0) {
        jfilter = {
          ...jfilter,
          createdat: {
            [Op.gte]: moment(date0).format('YYYY-MM-DD HH:mm:ss'),
          },
        };
      }
      if (date1) {
        jfilter = {
          ...jfilter,
          createdat: {
            [Op.lte]: moment(date1).format('YYYY-MM-DD HH:mm:ss'),
          },
        };
      }
//      if (nettype) {        jfilter['nettype'] = nettype;      }
//			if ( tablename =='jobposts' ) { jfilter = { ... jfilter , iscomplete : 1 } }
/*			if ( isopen ) {				let jfilter2 = {}
				let { dow , hournow } =get_dow_hournow()
//				jfilter2 = { 
	//				`hours${ dow}0` : { [ Op.lte ] : hournow , } ,
		//			`hours${ dow}1` : { [ Op.gt  ] : hournow , } ,
			//	}
				jfilter2 [ `hours${ dow}0`] ={ [ Op.lte ] : hournow , }
				jfilter2 [ `hours${ dow}1`] ={ [ Op.gt  ] : hournow , }
				jfilter = { ... jfilter , ... jfilter2 }	
			} */
      db[tablename]
        .findAll({
          raw: true,
          where: { ...jfilter },
          offset,
          limit,
          order: [[orderkey, orderval]],
        })
        .then(async (list_00) => {
		let count = await countrows_scalar(tablename, jfilter);

		if ( tablename == 'sales' ) {
			let aproms=[]
			for ( let idx = 0 ; idx < list_00.length ; idx ++ ) { let sale = list_00[ idx ]
				aproms[ aproms?.length ] = findone ( 'items' , { uuid : sale?.itemuuid } )
			}
			let aitems = await Promise.all ( aproms)
			list_00 = list_00.map ( ( elem , idx ) => { delete aitems[ idx ].privatekey ; return { ... elem , item : aitems[ idx ] } } )
//			respok ( res,null,null, { list , payload : { count } } )
//			return 
		}

				let { srcfield , targetfield , targettable } = req.query ; LOGGER( 'req.query',req.query )
				if ( srcfield && targetfield && targettable  ) {
					let aproms = []
					for ( let item of list_00 ) {
						let anchorval = item [ srcfield ]
						let jtmp= {}
						jtmp [ targetfield ] = anchorval 
						if ( targettable== 'users' ) { 						aproms[ aproms.length ] = db[targettable ] .findOne ({ raw: true, where : { ... jtmp }, attributes: ['username','urlimage']  } )
						} 
					}
					let list02 = await Promise.all ( aproms )
					let list = list_00.map ( ( elem, idx ) => { 
						delete list02[ idx]?.pw
//						return { base : elem , joined : list02[ idx] } } )
						return { ... elem , joined : list02[ idx] } } )
					respok ( res, null,null, { list  , payload : { count } } )
					return
				}
//					else {
            respok(res, null, null, { list: list_00, payload: { count } });
//          }
        });
//    });
  }
);
const KEYS=Object.keys
// const MAP_TABLES_FORBIDDEN={users : 1 } 
const MAP_TABLES_FORBIDDEN={} 
router.get("/singlerow/:tablename/:fieldname/:fieldval", softauth ,  async (req, res) => {
  let { tablename, fieldname, fieldval } = req.params;
	if ( MAP_TABLES_FORBIDDEN[ tablename ] ){
		resperr( res, 'ACCESS-FORBIDDEN' ) ; return
	} else {}
  if (tablename && fieldname && fieldval) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
	let nettype
/**  let { nettype } = req.query;
  if (nettype) {  } else {resperr(res, messages.MSG_ARGMISSING);    return;  } */
//	let jfilter = req.query
//  fieldexists(tablename, fieldname).then(async (resp) => {
//    if (resp) {  //  } else { //      resperr(res, messages.MSG_DATANOTFOUND);  //    return;    //}   
    let jfilter = {}; 
    jfilter[fieldname] = fieldval;
	if ( tablename == 'users' ){
		if ( nettype = req?.query?.nettype ) { jfilter = { ... jfilter , nettype }}
		else { resperr( res, messages.MSG_NETTYPE_NOT_SPECIFIED ) ; return }
	}
    if (req.query && KEYS(req.query).length) {
      let akeys = KEYS(req.query);
      for (let i = 0; i < akeys.length; i++) {
        let elem = akeys[i]; //       forEach (elem=>{
        let respfieldex = await fieldexists(tablename, elem);
  //      if (respfieldex) {//        } else {
        //  resperr(res, messages.MSG_ARGINVALID, null, {
      //      payload: { reason: elem },
    //      });   //        return;//        }
      }
      jfilter = { ...jfilter, ...req.query };
    } else {
    }
    let resprow = await findone(tablename, { ...jfilter }) // ; LOGGER( 'resprow',resprow)
/**	if ( tablename == 'jobposts' && resprow ) {
		await incrementrow ({
			table : tablename ,
			jfilter : { id : resprow?.id },
			fieldname : 'countviews' ,
			incvalue : +1
		})	
	} */

		if ( req?.decoded?.uuid ) { 
			let { id :uid , uuid : useruuid } = req.decoded
			if ( tablename == 'jobposts' && resprow ) {
				let respjoin = await findone ( 'applys' , { useruuid , jobpostuuid : resprow['uuid'] } )
    		respok(res, null, null, { respdata: { ... resprow , apply:  respjoin } }); return
			}
			else { respok ( res, null,null, { respdata : resprow } ) ; return }
			let { srcfield , targetfield , targettable } = req.query ; LOGGER( 'req.query',req.query )
			if ( srcfield && targetfield && targettable && resprow ) {
				let anchorval = resprow [ srcfield ]
				let jfilter2={}
				jfilter2[ targetfiled ] = anchorval
				let respjoin = await db[ targettable ].findOne ( { raw: true , where : { ... jfilter2, useruuid }  } ) // , attributes: [ ] 
	    	respok(res, null, null, { respdata: { ... resprow , joined : respjoin } });
				return
			}
    	respok(res, null, null, { respdata: resprow })
			return 
		}
/**		else if ( tablename == 'resumes' && resprow ) {
			let respapplicant = await findone ( 'applicants' , { useruuid : resprow ['useruuid'] } ) 
			respok ( res, null ,null,  { respdata : { ... resprow, joined : respapplicant } } )
			return 
		} */
		else {
			if ( tablename == 'users' ) { let username = resprow?.username 
				respok ( res,null,null,{ respdata : { username } } ) 
				return 
			} 
			respok ( res, null ,null,  { respdata : { ... resprow, } } )
			return
		}

		let { srcfield , targetfield , targettable } = req.query
		if ( srcfield && targetfield && targettable && resprow ) {
			let anchorval = resprow [ srcfield ]
			let jfilter2={}
			jfilter2[ targetfiled ] = anchorval
			let respjoin = await db[ targettable ].findOne ( { raw: true , where : { ... jfilter2}  } ) // , attributes: [ ] 
    	respok(res, null, null, { respdata: { ... resprow , joined : respjoin } });
			return
		}
    respok(res, null, null, { respdata: resprow })
//  });
});

// router.get('/dividendrate/:time/:assetId/:type/')

module.exports = router;

// router.get ( '/rows/field/spec/:tablename/:fieldname/:offset/:limit/:orderkey/:orderval' ,
router.all ( '/rows/field/spec/:tablename/:fieldname/:offset/:limit/:orderkey/:orderval' ,
//	auth , 
async ( req,res)=>{
  let { tablename, fieldname, fieldval, offset, limit, orderkey, orderval } =
      req.params;
//	let { id , uuid : useruuid } = req.decoded
	let { jfilters } = req.body
	let jfilters_in
	if ( jfilters && KEYS(jfilters).length > 0 )  { jfilters_in = { ... jfilters } } 

	offset = +offset;
  limit = +limit;
  if (ISFINITE(offset) && offset >= 0 && ISFINITE(limit) && limit >= 1) {
  } else {
        resperr(res, messages.MSG_ARGINVALID, null, {
          payload: { reason: 'offset-or-limit-invalid' },
        });
        return;
      }
      let jfilter = {};
			if ( jfilters_in ) {
				jfilter = { ... jfilter , ... jfilters_in }
			}
//      jfilter[fieldname] = useruuid ;
	      db[tablename]
        .findAll({
          raw: true,
          where: { ...jfilter },
          offset,
          limit,
          order: [[orderkey, orderval]],
        })        .then(async (list )  => {
          let count = await countrows_scalar(tablename, jfilter);

			let { srcfield , targetfield , targettable } = req.query
			if (  srcfield && targetfield && targettable ) {
				let aproms = []
				for ( item of list ) {
					let anchorval = item [ srcfield ]
					let jtmp= {}
				jtmp [ targetfield ] = anchorval  
					aproms[ aproms.length ] = db[targettable ] .findOne ({ raw: true, where : { ... jtmp } } )
				}
				let lst2 = await Promise.all ( aproms )
				list = list.map ( ( elem, idx ) => { return { base : elem , detail : lst2[ idx] } } )
					respok ( res, null,null, { list  , payload : { count } } )
			} else {}
					respok ( res, null,null, { list : list.map ( elem => { return { base: elem , } } )  , payload : { count } } )
				})
})
router.get ( '/___/bylocation/:tablename' , async ( req,res)=>{
	let { latitude : lat0 , longitude : lon0 } = req.query
	let { tablename } = req.params
	let lst = await db[tablename ].findAll ( { raw: true, where : {} } )
	let arrdist = lst.map ( elem => { let { latitude : lat1 ,longitude : lon1 } = elem 
		if ( lat1 && lon1 ) {}
		else { return null }
//		return calcdistance( {lat0 , lon0 , lat1 , lon1  } )
	} )
	LOGGER( arrdist ) 
	respok ( res )
})
const expand_search = (tablename, liker) => { // get_search_table_fields 
  if (tablename) {
  } else {
    return null;
  }
  switch (tablename) {
		case 'jobposts' :
			return {
				[Op.or]:[
					{corpname : { [Op.like] : liker } } ,
					{jobpostername : { [Op.like] : liker }} ,
					{ jobtype2 : { [Op.like] : liker } } ,
					{ jobtype : { [Op.like] : liker } } ,
					{ note_ : { [Op.like] : liker } } ,
					{ region : { [Op.like] : liker } } ,
					{ employtype : { [Op.like] : liker } } ,
					{ title :  { [Op.like] : liker } } ,
					{ corpname : { [Op.like] : liker } } ,
				]
			}
		break
     case "logsales":
      return {
        [Op.or]: [
          { itemid: { [Op.like]: liker } },
          { txhash: { [Op.like]: liker } },
          { paymeansname: { [Op.like]: liker } },
          { paymeans: { [Op.like]: liker } },
          { buyer: { [Op.like]: liker } },
          { seller: { [Op.like]: liker } },
        ],
      }; //  , {nettype : {[Op.like] : liker} }}
      break;
    case "users":
      return {
        [Op.or]: [
          { username: { [Op.like]: liker } },
          { email: { [Op.like]: liker } },
          { address: { [Op.like]: liker } },
          { nickname: { [Op.like]: liker } },
        ],
      };
      break;

   default:
      return {
        [Op.or]: [
          { name: { [Op.like]: liker } },
          { address: { [Op.like]: liker } },
        ],
      };
  }
};
