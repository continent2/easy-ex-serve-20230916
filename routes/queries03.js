var express = require('express');
const requestIp = require('request-ip');
let { respok, resperr } = require('../utils/rest');
const { getobjtype , convaj , generaterandomhex  } = require('../utils/common');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/authMiddleware');
const db = require('../models');
const { lookup } = require('geoip-lite');
var crypto = require('crypto');
const LOGGER = console.log;
const { tableexists , fieldexists , updaterow , findone
	, incrementrow
	, updateorcreaterow , findall , countrows_scalar 
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
const MAP_ORDER_BY_VALUES = {  ASC: 1, asc : 1 ,   DESC: 1, desc :1 ,
}
router.get( '/rows/:tablename/:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval',
//	auth ,
  async (req, res) => {
    let { tablename, fieldname, fieldval, offset, limit, orderkey, orderval } =
      req.params;
    let {
      itemdetail,
      userdetail,
      filterkey,
      filterval,
			jfilters,
      nettype,
      date0,
      date1, notmyown , searchkey 
    } = req.query;
		let jfilters_in
		if ( jfilters && KEYS(jfilters).length > 0 )  { jfilters_in = { ... jfilters } } 
//		let { id , uuid : useru u id } = req.decoded
//		let u id = id
//		if ( await tableexists ( tablename ) ) {}
	//	else { resperr ( res, 'TABLE-DOES-NOT-EXIST' ) ; return }
    console.log('req.query', req.query);
    //  const username = getusernamefromsession(req);
		//    fieldexists(tablename, fieldname).then(async (resp) => {
//      if (resp) {
  //    } else {
    //    resperr(res, messages.MSG_DATANOTFOUND);
      //  return;
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
      } else {
        resperr(res, messages.MSG_ARGINVALID, null, {
          payload: { reason: 'orderkey-invalid' },
        });
        return;
      } */
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
/** 			if(+not myown) {  }
			else {	jfilter [ 'useru u id' ] = use ruuid
			} */
			if (tablename =='notifies' ) {
				jfilter= { [Op.or] : [
					{ ... jfilter } ,
					{ iscommon : 1 } 
				] }
			}
let list_00 = await      db[tablename]
        .findAll({
          raw: true,
          where: { ...jfilter },
          offset,
          limit,
          order: [[orderkey, orderval]],
        })
 //       .then(async (list_00) => {
          let count = await countrows_scalar(tablename, jfilter); LOGGER( {count })
/**          if (list_00 && list_00.length && list_00[0].itemid) {
            let aproms = [];
            list_00.forEach((elem) => {
              aproms[aproms.length] = queryitemdata_nettype(
                elem.itemid,
                nettype
              );
            });
            Promise.all(aproms).then((list_01) => {
              let list = list_01.map((elem, idx) => {
                return { ...elem, ...list_00[idx] };
              });
              respok(res, null, null, { list: list, payload: { count } });
            });
          } else { */
		if ( tablename == 'items' ) {
			list_00 = list_00.map ( elem => { delete elem?.privatekey ; return elem } )
			respok ( res, null , null , { list : list_00  , payload : { count } } )
			return
		}
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
/*	if ( tablename =='notifies' ) {
		await updateorcreaterow ('useractions' , { us eruuid , typestr:'READ-NOTIFY' } , {
			timestamp : moment().unix() 
		} )
		} */
  }
);

module.exports = router;
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

