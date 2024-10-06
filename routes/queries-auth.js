var express = require('express');
const requestIp = require('request-ip');
let { respok, resperr } = require('../utils/rest');
const { getobjtype , convaj , generaterandomhex	, gettime   } = require('../utils/common');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/authMiddleware');
const db = require('../models');
const { lookup } = require('geoip-lite');
var crypto = require('crypto');
const LOGGER = console.log;
const { tableexists , fieldexists , updaterow , findone
	, incrementrow
	, updateorcreaterow , findall
 } = require('../utils/db')
let { Op } = db.Sequelize;
const { querybalance } = require('../utils/erc20' )
// const { calculate_dividendrate } = require('../schedule/calculateDividendRate');
const axios = require('axios');
const uuid=require('uuid')
const { messages}= require('../configs/messages')
const KEYS = Object.keys;
const ISFINITE = Number.isFinite;
var router = express.Router();
const THREADID_LEN = 12
const RECEIVABLE_EXPIRES_IN_DAYS = 14
const STRINGER=JSON.stringify
const moment=require('moment')
const convliker = (str) => "%" + str + "%"
const { web3, createaccount , PRICEUNIT } = require("../configs/configweb3");
const priceunit = PRICEUNIT 
const { writenoti } = require( './writenoti')
/* offers uid           | bigint(20) unsigned | YES  |     | NULL                |                               |
| useruuid      | varchar(80)         | YES  |     | NULL                |                               |
| sugge steruuid | varchar(80)         | YES  |     | NULL                |                               |
| sugg esteruid  | bigint(20)          | YES  |     | NULL                |                               |
| sug gesteeuuid | varchar(80)         | YES  |     | NULL                |                               |
| sugg esteeuid  | bigint(20)          | YES  |     | NULL                |                               |
| resumeuuid    | varchar(80)         | YES  |     | NULL                |                               |
| resumeid      | bigint(20)          | YES  |     | NULL                |                               |
| jobpostuuid   | varchar(80)         | YES  |     | NULL                |                               |
| jobpostid     | bigint(20)          | YES  |     | NULL                |                               |
| active  
*/
let jtokens={}
const gettoken=({nettype, address})=>{
	return jtokens[ `${nettype}_${address}` ]
}
const validate=jdata=>{
	let { type} = jdata
	switch ( type) {
		case 'jobposts_title' : return jdata?.value && jdata?.value?.length >= 4 
		break
		case 'comments_contents' : return jdata?.value && jdata?.value?.length >= 4
		break
	}
}
const deletejfields = (jdata, afields)=>{
	afields.forEach ( elem => { delete jdata[ elem] } )
	return jdata
}
router.post ( '/:tablename' , auth , async ( req,res)=>{LOGGER(req.body)
	let { tablename, }=req.params
	let { id , username, uuid : useruuid , nettype } = req.decoded // let { nettype } = req.query
	if ( useruuid ) {}
	else { resperr ( res, 'PLEASE-LOGIN' ) ; return }
	let uid= id
	let resp = await db['users'].findOne ( { raw:true, where:{ uuid : useruuid , active : 1 }})
	if ( resp ) {}
	else { resperr( res , 'USER-NOT-FOUND' ) ; return } 
//  let respex= await tableexists(tablename)
//	if ( respex ) {}
//	else { resperr( res , 'TABLE-NOT-FOUND' ) ; return }
	const uuidv4 = uuid.v4()
	let jadd ={} ; let respjob,jobposteruuid
	let respexnettype = await fieldexists ( tablename , 'nettype' ) 
	if ( respexnettype ) { jadd = { ... jadd , nettype } }
	else {}
	if ( tablename == 'usertokens' ) {
		let { address } = req.body
		if ( nettype && address ) {}
		else { resperr ( res, messages.MSG_ARGMISSING , null, {missingfield:'address'} ) ; return }
		let resptoken = await findone ( 'tokens' , { nettype , address })
		if ( resptoken ){}
		else { resperr ( res, messages.MSG_DATA_NOT_FOUND ) ; return }
		resptoken = deletejfields ( resptoken , [ 'id', 'createdat', 'updatedat','writer','active',
			'nettype' , 'istoken' ,'isdefault', 'uuid','deployer' ]) 
		jadd = { ... jadd , ... resptoken } 
	}
	let respcreate = await db[ tablename ] .create ( {...req.body, 
		username, 
		uid: id, 
		useruuid, 
		uuid : uuidv4, 
		active : 1 , 
		... jadd
	} ) //	LOGGER ( 'respcreate',respcreate )
	respok ( res , null,null, { uuid : uuidv4 
		, id : respcreate?.dataValues?.id	 } 
	)

})

/** router.g et ( '/single/:tablename' , auth , async ( req,res)=>{
	let { tablename } = req.params
	let { id , uuid : useruuid } = req.decoded
}) */
router.get ( '/data/:tablename' , auth, async ( req,res) => {
		let { tablename } = req.params
	let { id , uuid : useruuid } = req.decoded
//	if ( await tableexists ( tablename ) ) {}
	//else { resperr ( res, 'TABLE-DOES-NOT-EXIST' ) ; return }
	let resp = await findone( tablename , { useruuid } );
	let userdata
	if ( tablename == 'users' ) {
//		userdata=  await findone ( 'userdata' , { uuid : useruuid } )
	} else {}
   console.log({resp});
	respok ( res, null, null,  { respdata : resp , // userdata 
	} )
})

router.put ( '/toggle/:tablename/:fieldname/:fieldval/:targetcolumnname', auth , async ( req,res)=>{  LOGGER(req.body )
	let { id : uid , username, uuid : useruuid } = req.decoded
	let { tablename , fieldname , fieldval , targetcolumnname } =req.params
	let jfilter={}
	jfilter[ fieldname] = fieldval
	let resprow = await db[tablename].findOne ( {raw:true, where : {... jfilter ,useruuid } } )
	if( resprow ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let status = resprow [ targetcolumnname ]
	let targetstatus
	if ( ''+status == '1' ){
		let jupdate0={}
		targetstatus = 0
		jupdate0[ targetcolumnname ] = targetstatus // status  
		await updaterow ( tablename , { id : resprow.id } , { ... jupdate0 } ) 
		respok ( res, null,null , { respdata: { resultstatus : targetstatus} } ) // ; return
	} // else {}
	else { 
/**					let jupdate1 = {}
					jupdate1 [ targetcolumnname ] = 0
					await updaterow ( tablename , { useruuid } , { ... jupdate1 } )
*/
		let jupdate2 = {}
		targetstatus = 1
		jupdate2 [ targetcolumnname ] = targetstatus // status  
		await updaterow ( tablename , { id : resprow.id } , { ... jupdate2 } )
		respok (res , null,null, { respdata : { resultstatus : targetstatus } } )
	}
/*	if ( tablename=='resumes' ){
		switch ( targetstatus ) {
			case 1 : 
				await updaterow ( 'applicants' , { useruuid } , {defaultresumeuuid : resprow?.uuid 
					, isseeking : 1
				} )
			break
			case 0 : updaterow ( 'applicants' , { useruuid } , {defaultresumeuuid : null // resprow?.uuid 
					, isseeking : 0
				} )
			break
		}
	} */
})
router.put ( '/toggle/:tablename' , auth , async ( req,res)=>{ LOGGER( req.body )
	let { id : uid , username, uuid : useruuid } = req.decoded
	if ( uid ) {}
	else { resperr ( res, messages.MSG_PLEASELOGIN ) ; return } 
	let { key , targetcolumnname, status } = req.body
	if ( key && KEYS ( key ).length && targetcolumnname) {}
	else { resperr( res, messages.MSG_ARGMISSING ) ; return }
	let { tablename } = req.params
//	let resptableex = await tableexists ( tablename )
//	if ( resptableex ) {}
//	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let targetstatus 
	let resprow = await db[ tablename ] .findOne ( { raw: true , where : { ... key // ,uid 
		, useruuid
	} } )
	if ( resprow ) {
		if ( ISFINITE ( +status ) ) {
			let jdata = {}
			jdata [ targetcolumnname ] = status ; targetstatus = status
			await db[ tablename ].update ( { ... jdata } , { where : { id : resprow.id } } )
		}
		else { 
			let jdata= {}
			targetstatus = 1 ^ +resprow[ targetcolumnname ]
			jdata [ targetcolumnname ] = targetstatus 
			await db[ tablename ].update ( { ... jdata } , { where : { id : resprow.id } } )
		}
	}
	else {
		if ( ISFINITE( +status ) ) {
			let jdata= {}
			jdata [ targetcolumnname ] = status ; targetstatus = status
			let respcreate = await db[ tablename ].create ( {
				... key 
				, uid
				, ... jdata
				, active : 1	
				, useruuid
			})
			resprow = respcreate?.dataValues
		} else { 
			let jdata={}
			targetstatus = 1 
			jdata[ targetcolumnname ]  = targetstatus 
			let respcreate = await db[ tablename ].create ( {
				... key 
				, uid
				, ... jdata
				, active : 1	
				, useruuid
			} )
			resprow = respcreate?.dataValues
		}
	}
	respok ( res , null, null, { respdata : { result : targetstatus , status : targetstatus } } )
	if ( tablename == 'jobposts' ){
		let incvalue = ( targetstatus ==1 )? +1 : -1 
		await incrementrow ( { 
			table : 'jobposts' ,
			jfilter : { uuid : resprow?.uuid } ,
			fieldname : 'countfavorites',
			incvalue
		})
	}
})

/////////////////////////////////////////
router.put ( '/data/:tablename' ,auth , async ( req,res)=>{ LOGGER(req.body)
	let { tablename } = req.params
	let { id , uuid : useruuid } = req.decoded
//	if ( await tableexists ( tablename ) ) {}
	// else { resperr ( res, 'TABLE-DOES-NOT-EXIST' ) ; return }
	delete req.body [ 'id' ]
	delete req.body [ 'useruuid' ]
	await updaterow ( tablename , { useruuid } , { ... req.body } ) 
	respok ( res )
})
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

router.patch('/set/fee', (req, res) => {
  let { key, val } = req.body;
  val = String(val * 100);

  db['feesettings'].update({ value_: val }, { where: { key_: key } });
  respok(res, 'ok');
});

// const fieldexists = async (_) => true;
const MAP_ORDER_BY_VALUES = {  ASC: 1, asc : 1 ,   DESC: 1, desc :1 ,
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

router.delete ( '/:tablename' , auth , async ( req,res)=>{
	let { id : uid } =req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	let { key , value } = req.body ; LOGGER( req.body )
	if ( key , value ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let jfilter={}
	jfilter[ key ] = value
	let { tablename } = req.params
	let resptableex = await tableexists  ( tablename ) ;
	if ( resptableex ) {}
	else { resperr ( res, messages.MSG_TABLENOTFOUND ) ; return } 

	let resp = await db[ tablename ].findOne ( { raw: true , where : { 	uid, ... jfilter } } )
	if ( resp ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	jfilter [ 'uid' ]=uid
	await db[ tablename ].destroy ( {where : { ... jfilter } } )
	respok ( res ) 
})
const MAP_ORDER_STATUS= {
	WAITING : 	{ status : 0 , statusint : 0 , statusstr: 'WAITING' } , 
	OK: 				{ status : 1 , statusint : 1 , statusstr: 'PROCESSED' } , 
	PROCESSED : { status : 1 , statusint : 1 , statusstr: 'PROCESSED' } , 
	FAILED :		{ status : 2 , statusint : 2 , statusstr: 'FAILED' } , 
	EXPIRED :		{ status : 3 , statusint : 3 , statusstr: 'EXPIRED' } , 
	CANCELED :	{ status : 4 , statusint : 4 , statusstr: 'CANCELED' } , 
}
router.delete ( '/:tablename/:softorhard/:idtype/:id', auth , async (req,res)=>{
	let { tablename, softorhard, idtype , id } = req.params
	let { id : userid , uuid : useruuid } = req.decoded
	let respfieldex = await fieldexists(tablename, idtype) // .then(async (resp) => {
	if ( respfieldex) {}
	else{resperr(res,messages.MSG_ARGINVALID , null,{reason:'idtype'} ) ;return }
	let jfilter = {}
	jfilter [ idtype] = id 
	let resp = await db[tablename].findOne ( {raw: true, where : { ... jfilter , useruuid } } ) 
	if ( resp ) {}
	else { resperr ( res , 'DATA-NOT-FOUND' ) ; return }
	let message	
	let timenow = moment().unix() // let deltatime = 
	let mode_cancel_delete 
	switch ( Math.sign( timenow - +resp?.expiry ) ){
		case -1 : mode_cancel_delete = 'CANCEL'
		break
		case +1 : mode_cancel_delete = 'DELETE'
		default  :		
		break // 0
	}
	switch ( mode_cancel_delete){
		case 'CANCEL' : 
			await updaterow ( tablename , { ... jfilter } , { ... MAP_ORDER_STATUS[ 'CANCELED'] });message=messages?.MSG_CANCELED
		break		
		case 'DELETE' :{
			switch ( softorhard ) {				//		case 'soft' : await updaterow (tablename , {... jfilter} , {active: 0 }) 
				case 'soft' : await updaterow (tablename , {... jfilter} , {isdeleted : 1 , }) ; message= messages?.MSG_DELETED
				break
				case 'hard' : await db[tablename].destroy ({ where : { ...jfilter } } ) ; message= messages?.MSG_DELETED
				break
			}						
		} 
		break
	} //	await db[tablename].destroy ({ where : { id } } )
	respok ( res , message ) 
})
router.delete ( '/:tablename/:id' , auth , async ( req,res ) => {
	let { tablename, id } = req.params
	let { id : userid , uuid : useruuid } = req.decoded
	let resp = await db[tablename].findOne ( {raw: true, where : {id  , useruuid } } ) 
	if ( resp ) {}
	else { resperr ( res , 'DATA-NOT-FOUND' ) ; return } 
	await db[tablename].destroy ({ where : { id } } )
	respok ( res ) 
})
router.put ( '/:tablename/:id' , auth , async ( req,res)=>{ LOGGER( req.body )
	let { tablename, id } = req.params
//  let respex= await tableexists(tablename)
//	if ( respex ) {}
//	else { resperr( res , 'TABLE-NOT-FOUND' ) ; return }
	let { id : userid , uuid : useruuid } = req.decoded
	let resp = await db[tablename].findOne ( {raw: true, where : {id  , useruuid } } ) 
	if ( resp ) {}
	else { resperr ( res , 'DATA-NOT-FOUND' ) ; return } 
	await db[ tablename ].update ( { ... req.body } , {where : { id  } } )
	respok ( res )
})

router.get ( '/rows/field/spec/:tablename/:fieldname/:offset/:limit/:orderkey/:orderval' ,
	auth , async ( req,res)=>{
  let { tablename, fieldname, fieldval, offset, limit, orderkey, orderval } =
      req.params;
	let { id , uuid : useruuid } = req.decoded
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
      jfilter[fieldname] = useruuid ;
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
const expand_search = (tablename, liker) => { // get_search_table_fields 
  if (tablename) {
  } else {
    return null;
  }
  switch (tablename) {
    case 'sales' :
      return {
        [Op.or]:[
          { address : { [Op.like] : liker } } , 
          { title   : { [Op.like] : liker } } , 
          { username : { [Op.like] : liker } } , 
        ]
      }   
    break
	}
}
const tell_if_refundable=async (  { uuid , mine , order , time_overtime_from_due , refundrateinpercent } )=>{
			// tell if current time is past the promised time 
//	let iscancelable // = Math.random() > 0.5? 1 : 0

	if ( order && KEYS( order ).length ) {}
	else { return false }

	let { price }  = order
	if ( mine && KEYS(mine).length ) {}
	else { return false }
	let { timestart } = mine 
	let timenow = gettime() //
	let deltatimefromdue = timenow?.unix - order?.timedeliverdue // timestampdeliverpromised
	if (deltatimefromdue >= time_overtime_from_due ) {}
	else { return false } // if not  
	price = + price 
	refundrateinpercent = +refundrateinpercent  
	let refundamount = price * refundrateinpercent  
	let usedamount = price - refundamount
	let refundinfo = {}
	refundinfo = { refundamount , usedamount , refundrateinpercent}
	return refundinfo
}
/** const { estimate_process_time } = require('./estimate_mine') 
const estimate_progress =async ({
	timeref , // : timenow , 
	reqpatternlen , // : mine?.reqpatternlen , 
	timestart , // : mine?.timestart , 
	precision // : 2 
})=>{
	let resp = await estimate_process_time ( { reqpatternlen }) 	
	resp = +resp
	if ( resp && Number.isFinite ( resp)){}
	else { return '50.00' }
	return ( +timeref - +timestart )/ resp
} */
router.get( '/rows/:tablename/:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval',
	auth ,
  async (req, res) => {
    let { tablename, fieldname, fieldval, offset, limit, orderkey, orderval } =
      req.params;
    let {
      itemdetail,
      userdetail,
      filterkey,
      filterval,
			jfilters,
//      nettype,
      date0,
      date1, notmyown , searchkey 
    } = req.query;
		let jfilters_in
		if ( jfilters && KEYS(jfilters).length > 0 )  { jfilters_in = { ... jfilters } } 
		let { id , uuid : useruuid , nettype } = req.decoded
		let uid = id
//		if ( await tableexists ( tablename ) ) {}
	//	else { resperr ( res, 'TABLE-DOES-NOT-EXIST' ) ; return }
    console.log('req.query', req.query);	//  const username = getusernamefromsession(req);//    fieldexists(tablename, fieldname).then(async (resp) => {
//      if (resp) {
  //    } else {//    resperr(res, messages.MSG_DATANOTFOUND);//  return;
//      }
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
/*      let respfield_orderkey = await fieldexists(tablename, orderkey);
      if (respfield_orderkey) {
      } else {resperr(res, messages.MSG_ARGINVALID, null, {          payload: { reason: 'orderkey-invalid' },        });
        return;
      } */
      let jfilter = {};
			if ( fieldname == '_' ) {}
			else {       jfilter[fieldname] = fieldval }
      if (filterkey && filterval) {
//        let respfieldexists = await fieldexists(tablename, filterkey);
  //      if (respfieldexists) {//    } else {//    resperr(res, messages.MSG_DATANOTFOUND);//  return;//        }
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
			if(+notmyown) {  }
			else {	jfilter [ 'useruuid' ] = useruuid
			}
			if (tablename =='notifies' ) {
				jfilter= { [Op.or] : [
					{ ... jfilter } ,
					{ iscommon : 1 } 
				] }
			}
let list_00 = await      db[tablename ]
        .findAll({
          raw: true,
          where: { ...jfilter },
          offset,
          limit,
          order: [[orderkey, orderval]],
        })
		let count = await countrows_scalar(tablename, jfilter);
		if ( tablename == 'useraccounts' ){
			let respuser = await findone ( 'users' , { useruuid })
			let { prefsymbol } = respuser
			let resptickers = await findall ( 'tickers' , { quote : prefsymbol })
			let j_symbol_convvalue = convaj ( resptickers , 'base' , 'value' ) ; LOGGER ( { j_symbol_convvalue })
			list_00 = list_00.map ( el => { el[ 'convvalue'] = +el['balancestr'] * +j_symbol_convvalue[ el?.symbol ] ; el['convsymbol']= prefsymbol ; return el })
		}
		if ( list_00?.length && list_00[0].hasOwnProperty ('urllogo' ) ){
			let resptokens = await findall ( 'tokens' , { active:1,nettype } )
			let jsymbol_urllogo = convaj ( resptokens , 'symbol' , 'urllogo' )
			for ( let idx = 0 ; idx<list_00?.length ; idx++ ){
				let { symbol } = list_00[ idx ]
				if ( list_00[idx].urllogo ){}
				else { list_00[idx].urllogo = jsymbol_urllogo[ symbol ] }
			}
		}
		respok ( res, null,null, { list : list_00 , payload : { count  } } )
	return  
		if ( tablename == 'sales' ) {
			let aproms=[]
			for ( let idx = 0 ; idx < list_00.length ; idx ++ ) { let sale = list_00[ idx ]
				aproms[ aproms?.length ] = findone ( 'items' , { uuid : sale?.itemuuid } )
			}
			let aitems = await Promise.all ( aproms)
			let list = list_00.map ( ( elem , idx ) => { delete aitems[ idx ].privatekey ; return { ... elem , item : aitems[ idx ] } } )
			respok ( res,null,null, { list , payload : { count } } )
			return 
		}

		if ( tablename == 'orders' ) {	let N = list_00?.length
//			let aproms=[]
	//		for ( let idx = 0 ; idx< N ; idx ++ ){let order= list_00[ idx ]
		//		aproms [ aproms.length ] = findone ( 'mines' , { uuid : order?.uuid } )
//			}
	//		let amines = await Promise.all ( aproms )
			let aprog=[]
			let {  unix : timenow } = gettime() 

			let respovertime = await findone ( 'settings' , { key_: 'TIME_PERIOD_ALLOW_OVERTIME_FROM_DELIVER_PROMISED_IN_SEC' , active : 1 })
			let	time_overtime_from_due = 600 // in sec
if ( respovertime?.value_ ) {time_overtime_from_due = +respovertime?.value_ }
			else {} 

			let resprefundrate= await findone ('settings' , { key_ : 'REFUND_RATE_FLAT_IN_PERCENT' , active : 1 } )
			let refundrateinpercent = 50 
if ( resprefundrate?.value_ ) { refundrateinpercent = +resprefundrate?.value_ }
			else {}

			for ( let idx = 0 ; idx < N ; idx ++ ){	let mine = amines [ idx ] ; let order = list_00[ idx ]
//				let iscancelable = Math.random() > 0.5? 1 : 0
				let iscancelable
				let refundinfo = await tell_if_refundable ( { uuid : order?.uuid , mine , order, time_overtime_from_due , refundrateinpercent  } )
				if ( refundinfo ){	iscancelable = 1 				}
				else { iscancelable = 0 }

				if ( mine && mine?.timestart ) {
					let progress = await estimate_progress ( {
timeref : timenow , 
reqpatternlen : mine?.reqpatternlen , 
timestart : mine?.timestart , 
precision : 2 })
					let cost = (+order?.price) * progress / 100 
					aprog [ idx ] = { progress , cost , iscancelable , refundinfo }
				}
				else { aprog [ idx ] = {progress: 0 , cost: 0  , iscancelable , refundinfo } }
			}
			list_00 = list_00.map ( (elem , idx ) => { return { ... elem , ... aprog[ idx ] } } )
			respok ( res, null, null , { list: list_00 , payload : { count } } )
			return
		}
		if ( tablename == 'items' ) {
			list_00 = list_00.map ( elem => { delete elem?.privatekey ; return elem } )
			respok ( res, null , null , { list : list_00  , payload : { count } } )
			return
		}
		else if ( tablename == 'transactions' ) {
			let listtokens=[]
			for ( let idx = 0 ; idx<list_00.length ; idx ++ ){
				let { assetaddress : address} = list_00 [ idx ] 
				listtokens [ idx ] = gettoken( { nettype , address  })
			}
			let list_01 = list_00.map ( ( elem, idx ) =>{ return { ... elem , token : listtokens [ idx ] } } )
			respok ( res, null,null, { list : list_01 , payload : { count }} )
			return 
		}
    respok(res, null, null, { list: list_00, payload: { count } });
// }
//        });
//    });
	if ( tablename =='notifies' ) {
		await updateorcreaterow ('useractions' , { useruuid , typestr:'READ-NOTIFY' } , {
			timestamp : moment().unix() 
		} )
		}
  }
);

module.exports = router;
router.get( '/rows/:tablename/:offset/:limit/:orderkey/:orderval',	auth ,
  async (req, res) => {
    let { tablename,  offset, limit, orderkey, orderval } =
      req.params;
    let {
      itemdetail,
      userdetail,
      filterkey,
      filterval,
//      nettype,
      date0,
      date1,
			authfielduid ,
    } = req.query;
    let { searchkey } = req.query;
		let { id , uuid : useruuid } = req.decoded ;let uid = id
//		LOGGER( 'hello here')
if ( await tableexists ( tablename ) ) { LOGGER('table ex' )}
	else { resperr ( res, 'TABLE-DOES-NOT-EXIST' ) ; return }
		let { srcfield , targetfield , targettable } = req.query
    console.log('req.query', req.query);
    //  const username = getusernamefromsession(req);
//    fieldexists(tablename, fieldname).then(async (resp) => {
  //    if (resp) {
    //  } else {
      //  resperr(res, messages.MSG_DATANOTFOUND);
        //return;
				//      }
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
//      let respfield_orderkey = await fieldexists(tablename, orderkey);
  //    if (respfield_orderkey) {
    //  } else {
//        resperr(res, messages.MSG_ARGINVALID, null, {
  //        payload: { reason: 'orderkey-invalid' },
    //    });
      //  return;
//      }
      let jfilter = {};
//      jfilter[fieldname] = fieldval;
      if (filterkey && filterval) {
//        let respfieldexists = await fieldexists(tablename, filterkey);
  //      if (respfieldexists) {
    //    } else {
      //    resperr(res, messages.MSG_DATANOTFOUND);
//          return;
  //      }
        jfilter[filterkey] = filterval;
      } else {
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
		let { userfieldname , useridtype}= req.query
		if (userfieldname && useridtype ) {
			switch (useridtype){
				case 'id' : jfilter[ userfieldname ] = uid; break
				case 'uuid':jfilter[ userfieldname ] = useruuid ; break
			}
		} 
		else if ( authfielduid ) {			jfilter[ 'uid' ] = uid
		}	
		else { jfilter [ 'useruuid' ] = useruuid }
		let { excludewords}=req.query
		if ( tablename =='searchwords' && excludewords ) {
			if ( getobjtype ( excludewords ) == 'Array' ) {
				let arr=[]
excludewords.forEach ( (elem,idx)=>{ arr.push ( 	{word: { [Op.ne] : elem}  } ) } )
	jfilter= { ... jfilter ,  ... arr   }
			}	
//		else if ( ){
//
	//	}
		}
		let list_00 = await db[tablename]
        .findAll({
          raw: true,
          where: { ...jfilter },
          offset,
          limit,
          order: [[orderkey, orderval]],
        })
//        .then(async (list_00) => {
		let count = await countrows_scalar(tablename, jfilter);

if ( srcfield && targetfield && targettable && list_00 && list_00.length && list_00[0] [ srcfield ]) {
		let aproms = [];
		list_00.forEach(( elem, idx ) => {
			let jfilter_join = {}
			jfilter_join [ targetfield ] = elem[ srcfield ]	
    	aproms[aproms.length] = db[ targettable].findOne ({raw: true, where :{
				... jfilter_join	
			}})    // queryitemdata_nettype(      elem.itemid,      nettype    );
  	});
		Promise.all(aproms).then((list_01) => {
    	let list = list_01.map((elem, idx) => {
				return {  ...list_00[idx] , itemdetail : elem }
//      	return { ...elem, ...list_00[idx] };
    	});
    	respok(res, null, null, { list: list, payload: { count } });
  		});
} else {
  respok(res, null, null, { list: list_00, payload: { count } });
}
//        });
//    });
  }
);
const normalizerange=( min , max , val ) =>{
    var delta = max - min;
    return (val - min) / delta;
} // require( 'normalize-range' )


const conv_streetaddress_latlon=async streetaddress=>{
	if ( streetaddress){}
	else { return null }
	let tic=moment()
	let resp = await axios.get ( `https://dapi.kakao.com/v2/local/search/address.json?query=${streetaddress}` ,
		{	//	params: {name: name},
			headers: {Authorization: 'KakaoAK cd3443c31a8112f40f34414625972dde' },
		}
	)
	let toc=moment();	LOGGER('latency:', toc-tic ) ;	LOGGER( STRINGER( resp?.data ))
	if (resp){}
	else{return null}
//	if ( KEYS ( resp?.data?.documents[0]).length > 0 ){}
	if (  resp?.data?.documents.length > 0 ){}
	else { return null } 
	let {x :longitude , y:latitude } = resp?.data?.documents[0] // ?.road_address
//	if ( latitude && longitude ) {}
	return { latitude, longitude }
}
router.get ( '/streetaddress/latitude-longitude' , async ( req,res)=>{
	let {streetaddress} = req.query
	let { latitude, longitude }=await conv_streetaddress_latlon ( streetaddress)
	respok ( res, null,null,{ streetaddress , latitude, longitude } )
})
router.put ( '/:tablename/:key/:value' , auth , async ( req,res)=>{	LOGGER(req.body)
	let { id : uid , uuid : useruuid } = req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	let { key , value } =req.params
	let { tablename } = req.params
//	let resptableex = await tableexists ( tablename ) ;
//	if ( resptableex ) {}
//	else { resperr ( res, messages.MSG_TABLENOTFOUND ) ; return } 
	let jfilter={}
	jfilter[ key ] = value
	let resp = await db[ tablename ].findOne ( { raw: true , where : { 	useruuid, ... jfilter } } )
//	let resp = await db[ tablename ].findOne ( { raw: true , where : { 	uid, ... jfilter } } )
	if ( resp ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let jupdates={}
	KEYS( req.body ).forEach ( key =>{
		let objtype = getobjtype( req.body[ key ])
		switch ( objtype ) {
			case 'String' : jupdates[ key ] = req.body[ key ]
			break
			case 'Array' :  jupdates[ key ] = STRINGER ( req.body[ key ] )
			break
			case 'Object' : jupdates[ key ] = STRINGER ( req.body[ key ] )
			break
			default : jupdates[ key ] = req.body[ key ]
			break
		}
	})
	if ( tablename == 'sales' ){
    if ( req?.body?.price ) {
			if ( req?.body?.feerateinpercent ) {}
			else {resperr (res,messages.MSG_ARGMISSING , null,{reason:'feerateinpercent'} ) ; return } 
			if ( req?.body?.quotesignature && req?.body?.feerateinpercent ) {}
			else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
			let {price , feerateinpercent }=req?.body
			if ( Number.isFinite( +price )){}
			else { resperr ( res, messages.MSG_ARGINVALID , null, { reason :'price is not a valid number'}); return }
			if ( +price >=0.1){}
			else { resperr ( res, messages.MSG_ARGINVALID , null, {reason:'min price>=0.1' } ) ; return }

// 			let feeamount = +price * +feerateinpercent / 100
	//		feeamount = feeamount.toFixed ( 4 )
	    delete jupdates.quotesignature
			if ( price = req?.body?.price ) {
 				let feeamount = +price * +feerateinpercent / 100
				feeamount = feeamount.toFixed ( 4 )
				jupdates.priceraw = web3.utils.toWei(''+ price )
  		  jupdates.pricedisp= price
	    	jupdates.pricefloat=price
				jupdates.feeamount = feeamount
				jupdates.feerate = feerateinpercent 
				jupdates.netprofit = (+price - +feeamount).toFixed(4)
			} else {}
			try { 			await writenoti ( { typecode : 203 , useruuid , auxdata : { item: resp?.address , price  , priceunit  } } ) 	}
			catch(err){ LOGGER( err ) }
		}
  } // end if sales
	await updaterow ( tablename , { id: resp?.id } , jupdates )
	respok ( res , 'UPDATED' )
})
const MAP_TABLES_FORBIDDEN={}
router.get ( '/singlerow/userfieldspec/:tablename/:fieldname/:fieldval/:userfieldname/:useridtype' , auth , async(req,res)=>{
  let { tablename, fieldname, fieldval , userfieldname, useridtype } = req.params
	let { id : uid , uuid : useruuid } = req.decoded	
	let jfilter={}
	jfilter [ fieldname ] = fieldval
	switch (useridtype){
		case 'id' : jfilter[ userfieldname ] = uid; break
		case 'uuid':jfilter[ userfieldname ] = useruuid ; break
	}
	let resp = await findone( tablename , { ... jfilter , } )
	if ( resp){ respok ( res,null,null,{respdata: { ... resp } } ) ; return } 
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }	
})
const { query_eth_balance_json }=require('../utils/contract-calls')
router.get( "/singlerow/:tablename/:fieldname/:fieldval" , auth , async (req, res) => {
	let { id , uuid : useruuid } = req.decoded
  let { tablename, fieldname, fieldval } = req.params;
	if ( MAP_TABLES_FORBIDDEN[ tablename ] ){resperr( res, 'ACCESS-FORBIDDEN' ) ; return } else {}
  if (tablename && fieldname && fieldval) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
//	let jfilter = req.query // fieldexists(tablename, fieldname).then(async (resp) => {	//    if (resp) {  //  } else {    //  resperr(res, messages.MSG_DATANOTFOUND);      //return;//    }   
    let jfilter = {}; 
		if ( fieldname == '_' ){}
		else {
    	jfilter[fieldname] = fieldval;
		}
    if (req.query && KEYS(req.query).length) {
      let akeys = KEYS(req.query);
      for (let i = 0; i < akeys.length; i++) {
        let elem = akeys[i]; //       forEach (elem=>{
//        let respfieldex = await fieldexists(tablename, elem);  //      if (respfieldex) {    //    } else {      //    resperr(res, messages.MSG_ARGINVALID, null, {        //    payload: { reason: elem },//          });   //        return;    //    }   
      }
      jfilter = { ...jfilter, ...req.query };
    } else {
    }
    let respfindone0 = await findone(tablename, { ...jfilter  , useruuid  });
//    let respfindone = await findone(tablename, { ...jfilter   }); //    let respfindone = await findone(tablename, { ...jfilter , useruuid  });
		let iteminfo 
		if ( respfindone0 && respfindone0?.itemuuid ) {	//			iteminfo = await db[ 'items'].findOne ( { raw: true, where : {	//			uuid : respfindone?.itemuuid		//		, useruuid			//} } )
		}
		if ( tablename == 'sales' ) {
			let item = await findone ( 'items' , { uuid : respfindone0?.itemuuid } )
			delete item?.privatekey
    	respok(res, null, null, { respdata: { ... respfindone0 , item	//			, iteminfo
			} });
			return
		}
		if ( tablename == 'items' && respfindone0 ) {
			if ( +respfindone0?.isclaimed   ) {}
			else { delete respfindone0?.privatekey }
		}
		if ( tablename == 'accounts' ) {
			if ( respfindone0 ) {
				let { nettype , address }= respfindone0
				let jbal = await query_eth_balance_json ( { nettype , useraddress : address }  )	
				respok ( res, null,null, { respdata: { ... respfindone0
					, balance : jbal?.nominalamount
					, amount  : jbal?.nominalamount
					, balanceunit : 'KLAY'
				} } )
				return
			}
			else { resperr (res, messages.MSG_DATANOTFOUND ) ; return }
		}
    respok(res, null, null, { respdata: { ... respfindone0	//			, iteminfo
		} });
//  });
});
router.get ( '/aggregate/sum', auth , async (req,res)=>{
	
})
// const cron = require('node-cron' )
// cron.schedule ( '* * * * *' , async (req,res)=>{	
//	settokens()
// })

