var express = require("express");
var router = express.Router();
const {
  findone,
  findall,
  createrow,
  updaterow,
  countrows_scalar,
  createorupdaterow,
updateorcreaterow 
} = require("../utils/db");
// const { updaterow: updaterow_mon } = require("../utils/dbm on");
const KEYS = Object.keys;
const { JWT_SECRET } = require ( '../configs/configs')
const {
  LOGGER,
  generaterandomstr,generaterandomnumber ,
  generaterandomstr_charset,
  gettimestr,
  convaj,
	deletejfields ,
	gettime
} = require("../utils/common");
const {
  respok,
  respreqinvalid,
  resperr,
  resperrwithstatus,
} = require("../utils/rest");
const { messages } = require("../configs/messages");
const { getuseragent, getipaddress } = require("../utils/session");
const {
  sendemail,
  sendemail_customcontents_withtimecheck,
} = require("../services/mailer");
const { sendMessage } =require('../services/twilio') 
const sha256=require( 'js-sha256' )
const { validatepw ,
	validateusername  ,
	validateemail } = require("../utils/validates");
const db = require("../models");
// const db mon=require('../modelsmongo')
const { getusernamefromsession } = require("../utils/session");
// const { createrow:createrow_mon , updaterow : updaterow_mon }=require('../utils/d bmon')
const TOKENLEN = 48;
const { web3, createaccount } = require("../configs/configweb3");
//const { getWal letRecode } = require("../utils/wallet_recode");
const { getWalletRecode } = require("../utils/wallet_recode");
const { getMetaplanetRecode } = require("../utils/wallet_recode_metaplanet");
const { getPolygon } = require("../utils/get_polygon");
const { generateSlug } = require("random-word-slugs");
const { MAP_USER_ACTIONS } = require("../configs/configs");
const moment = require("moment");
const { NETTYPE }=require('../configs/net')
const uuid=require('uuid')
const jwt = require('jsonwebtoken');
const { auth}=require('../utils/authMiddleware')
let { Op } = db.Sequelize;
const { createLogger , transports , format } = require('winston')
/** const loggerwin = createLogger ( {
	format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf( info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: '/var/www/html/magic3.co/logs/logs.log',
      json: true , // false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ]
});
*/
const secureobj = obj=>{ delete obj?.pw ; delete obj?.privatekey } 

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
const MAP_USERPREFS_KEYS = {
  NOTIFY_TRANSACTIONS_INSIDE: "0",
  NOTIFY_TRANSACTIONS_OUTSIDE: "0",
  NOTIFY_NOTIFIES: "0",
  NOTIFY_PROMOEVENTS: "0",
};

router.get("/history/eth/:address/:pageNum/:pageSize", (req, res) => {
  const { address, pageNum, pageSize } = req.params;
  getWalletRecode(address, pageNum, pageSize).then((resp) => {
    respok(res, null, null, {
      payload: {
        getData: resp,
      },
    });
  });
});

router.get("/history/metaplanet/:address/:pageNum/:pageSize", (req, res) => {
  const { address, pageNum, pageSize } = req.params;
  getMetaplanetRecode(address, pageNum, pageSize).then((resp) => {
    respok(res, null, null, {
      payload: {
        getData: resp,
      },
    });
  });
});
/**** router.get('/polygon',(req,res)=>{
//	const { date1, date2 } = req.params;
	getPolygon().then(resp=>{
		respok ( res, null, null , {payload : {
			getData: resp
		}})
	});
}) */
router.get("/transactions/inside", (req, res) => {
  const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN);
    return;
  }
  findall("transactionsinside", { username }).then((list) => {
    respok(res, null, null, { payload: { list } });
  });
});
router.get("/userprefs/notify", (req, res) => {
  const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN);
    return;
  }
  findall("userprefs", { username, active: 1 }).then((list) => {
    if (list) {
      let jresp = convaj(list, "key_", "value_");
      let jdata = {};
      KEYS(MAP_USERPREFS_KEYS).forEach((elem) => {
        if (jresp[elem]) {
          jdata[elem] = jresp[elem];
        } else {
          jdata[elem] = MAP_USERPREFS_KEYS[elem];
        }
      });
      respok(res, null, null, {
        payload: {
          prefs: { ...jdata },
        },
      });
    } else {
      respok(res, null, null, {
        payload: {
          prefs: { ...MAP_USERPREFS_KEYS },
        },
      });
    }
  });
});
router.post("/userprefs/notify/toggle/:keyname", (req, res) => {
  const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN);
    return;
  }
  let { keyname } = req.params;
  if (MAP_USERPREFS_KEYS[keyname]) {
  } else {
    resperr(res, messages.MSG_ARGINVALID, 38542);
    return;
  }
  findone("userprefs", { username, key_: keyname }).then((resp) => {
    if (resp) {
      let value_ = 1 ^ +resp.value_;
      updaterow("userprefs", { id: resp.id }, { value_ }).then((resp) => {
        respok(res, null, null, { payload: { aftertogglevalue: value_ } });
      });
    } else {
      let value_ = 1 ^ +MAP_USERPREFS_KEYS[keyname];
      createrow("userprefs", { username, key_: keyname, value_ }).then(
        (resp) => {
          respok(res, null, null, { payload: { aftertogglevalue: value_ } });
        }
      );
    }
  });
});
router.post("/userprefs/notify/:keyname/:value", (req, res) => {
  const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN);
    return;
  }
  let { keyname, value } = req.params;
  if (MAP_USERPREFS_KEYS[keyname]) {
  } else {
    resperr(res, messages.MSG_ARGINVALID, 86627);
    return;
  }
  value = +value;
  if (value == 1 || value == 0) {
  } else {
    resperr(res, messages.MSG_ARGINVALID, 31686);
    return;
  }
  createorupdaterow(
    "userprefs",
    { username, key_: keyname },
    { value_: value }
  ).then((resp) => {
    respok(res, null, null, {
      payload: { aftertogglevalue: resp.dataValues.value_ },
    });
  });
});
const generate_token_and_store = (username, req) => {
  return new Promise((resolve, reject) => {
    const token = generaterandomstr(TOKENLEN);
    //		let username=address
    let ipaddress = getipaddress(req);
    createrow("sessionkeys", {
      username,
      token,
      useragent: getuseragent(req),
      ipaddress: getipaddress(req),
    }).then(async (resp) => {
      resolve(token);
      // 	respok(res ,null,null,{respdata:token })
    });
  });
};
const USER_LEVEL_DEF = 3;
router.post("/join", (req, res) => {
  let {    username,
    nickname,
    pw,
    // email,
    dob,
    phonenumber,phonecountrycode2letter , phonenationalnumber ,
    realname,
    currentBlockNumber,
  } = req.body;
  LOGGER("", req.body); // log gerwin.info ( req.body )
	let { nettype } =req.query
//	if ( nettype ){} else { resperr( res, 'NETTYPE-NOT-S PECIFIED' ) ; return } 
	if ( nettype ){} else { resperr( res, messages.MSG_NETTYPE_NOT_SPECIFIED   ) ; return } 
	let NETTYPE = nettype
//  if (us ername && pw) {
	if ( pw) {
  } else {
    resperr(res, messages.MSG_ARGMISSING, 40761);
    return false;
  }
	if (username ) {
		if ( validateusername ( username ) ){ }
		else { resperr ( res, messages.MSG_USERNAME_DOES_NOT_MEET_RULE ) ; return } 
	}
	if ( validatepw ( pw ) ){ }
	else { resperr ( res, messages.MSG_PW_DOES_NOT_MEET_RULE ) ; return } 
	if ( username && username == pw ) {resperr ( res, messages.MSG_PLEASE_SET_PW_DIFFERENT_FROM_USERNAME ) ; return } 
	else {}
	
	if (phonecountrycode2letter && phonenationalnumber )	{
		phonenumber = get_normal_phonenumber ( req?.body )
//		jreqbody = { ... jreqbody , phonenumber } 
	}
	if ( phonenumber ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
  findone("users", { phonenumber , nettype }).then( async (respuser) => {
    // email
    if (respuser) {
      resperr(res, messages.MSG_PHONENUMBER_ALREADY_IN_USE , 82532);
      return false;
    }
//    createrow("users",
	let uuidv4 = uuid.v4() 
    let acct = createaccount();
		let tmpname =generateSlug(2, { format: "camel" }) 	
		respuser = await db['users'].create ( 
	{		username : ( username ? username : tmpname ) ,
			// usernamehash : sha256 ( username ) ,
      nickname: ( nickname ? nickname : tmpname ) ,
      pw,
			pwhash: sha256 (pw) ,
      ip: getipaddress(req),
      // email,
      active: 1,
      level: USER_LEVEL_DEF, //		, 
      dob : ( dob? dob:null ) ,
      phonenumber : ( phonenumber ? phonenumber : null ),phonecountrycode2letter , phonenationalnumber ,
      realname : ( realname ? realname : null ),
			uuid : uuidv4 ,
			useruuid : uuidv4 ,
			nettype ,
			address : acct?.address	,
			myreferercode : generaterandomstr(10)
    }		); //    db.operations.findOne({raw:true,where:{key_:'CURRENCIES'}}).then(respcurr=>{      const currencies=JSON.parse(respcurr['value_'])

	LOGGER( {
		respuser : respuser?.dataValues
	})
		secureobj ( respuser?.dataValues ) 
    console.log("currentBlockNumber:");
    console.log(currentBlockNumber);
    let respacct = await createrow("accounts", {
      username: username,
      ...acct,
      privatekey: acct.privateKey,
      nettype , NETTYPE ,
      currentBlockNumber: currentBlockNumber,
      firstUsedBlockNumber: currentBlockNumber,
			useruuid : uuidv4
    }) // .then((resp) => {
//      generate_token_and_store(username, req).then((token) => {
		let token = await			createJWT ( respuser?.dataValues )
    let respsession = await createrow("sessionkeys", {
      username,
      token : token?.token ,
      useragent: getuseragent(req).substr(0, 900),
      ipaddress : getipaddress(req),
			useruuid : respuser?.dataValues?.uuid
    }) 
	let respdeftoken = await findone('tokens' , { isdefault : 1, nettype } )
	if ( respdeftoken ) {
		respdeftoken = deletejfields ( respdeftoken , ['id','createdat','updatedat','writer','active'
			, 'isdefault','deployer' ] ) // 'uuid',	,'nettype'
	await createrow ( 'usertokens' , {
			... respdeftoken ,
			tokenuuid : respdeftoken?.uuid ,
			useruuid : respuser?.uuid ,
			uuid : uuid.v4()
		} )	
	}
	else {} 
		let respsetting = await findone ( 'settings' , { key_ :'GIVE-PRIVATEKEY' , active : 1 } )
		if ( + respsetting?.value_) { }
		else { delete acct?.privateKey }

        respok(res, null, null, {
					respdata : token ,
          payload: {
            token,
            address: acct.address,
            nettype , // : NETTYPE ,
						account : {
            	nettype : NETTYPE ,
            	address: acct.address, ... acct
						}
          },
          currentBlockNumber: currentBlockNumber,
        });
//      });
      createrow("logactions", {
        username,
        unixtime: moment().unix(),
        type: MAP_USER_ACTIONS["JOIN"],
        typestr: "JOIN",
        ipaddress: getipaddress(req),
      });
//    });
    false && callhook({ name: username, path: "join" });
    return false;
  });
});
/** {
  address: '0x37BD824BD9ca792a76B2c0376DF8f937623432d0',
  privateKey: '0xcf8f3a4e03c59f9a5e255b1e8160cdbf088c403b930c4676a35fbdd7abbc0d51',
*/
const MAP_FIELDS_ALLOWED_TO_CHANGE = { pw: 1, nickname: 1 , preferrednetwork : 1 , username: 1, urlimage : 1
	, phonenumber : 1
	,	phonecountrycode2letter : 1  
	, phonenationalnumber : 1
	, language:1
	, isskipcreatetutorial : 1
 };
const MAP_PREFERREDNETWORKS= {	'Ethereum' : 1 ,'Polygon': 1 ,'Klaytn' : 1
}
router.put ("/user/myinfo", auth , (req, res) => {
/**   const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN);
    return;
  } */
	let { username , uuid } =req?.decoded
  LOGGER("8t6dIUoLNx", req.body);
  let jreqbody = { ...req.body };
  let akeys = KEYS(jreqbody);
  akeys.forEach((elem) => {
    if (jreqbody[elem]) {
    } else {
      delete jreqbody[elem];
    }
    if (MAP_FIELDS_ALLOWED_TO_CHANGE[elem]) {
    } else {
      delete jreqbody[elem];
    }
  });
  if (KEYS(jreqbody).length > 0) {
  } else {
    resperr(res, messages.MSG_ARGINVALID);
    return;
  }
	if ( jreqbody?.preferrednetwork ){
		if (MAP_PREFERREDNETWORKS[ jreqbody?.preferrednetwork]){}
		else { resperr ( res, messages.MSG_ARGINVALID ) ; return }
	}
	let {phonecountrycode2letter 
	, phonenationalnumber , phonenumber
	} = req?.body
	if (phonecountrycode2letter && phonenationalnumber )	{
		phonenumber = get_normal_phonenumber ( req?.body )
		jreqbody = { ... jreqbody , phonenumber } 
	}
  updaterow("users", { uuid }, { ...jreqbody });
  respok(res, 'UPDATED' );
	return 
  let jlogaction = {};
  let unixtime = moment().unix();
  if (jreqbody["nickname"]) {
    jlogaction = {
      type: MAP_USER_ACTIONS["CHANGE-NICKNAME"],
      typestr: "CHANGE-NICKNAME",
    };
    createrow("logactions", {
      username,
			uuid ,
      unixtime,
      ...jlogaction,
      ipaddress: getipaddress(req),
    });
  }
  if (jreqbody["pw"]) {
    jlogaction = {
      type: MAP_USER_ACTIONS["CHANGE-PW"],
      typestr: "CHANGE-PW",
    };
    createrow("logactions", {
      username,
      unixtime,
      ...jlogaction,
      ipaddress: getipaddress(req),
    });
  }
  /** upd aterow_mon("users", { username }, { ...jreqbody })
    .then((resp) => {})
    .catch((err) => {
      resperr(res, messages.MSG_INTERNALERR);
    }); */
});

router.get("/user/crypto-account", (req, res) => {
  const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN, 403);
    return;
  }
  findone("accounts", { username }).then((resp) => {
    respok(res, null, null, { payload: { account: resp } });
  });
});
/** username   | varchar(80)      | YES  |     | NULL                |                               |
| address    | varchar(80)      | YES  |     | NULL                |                               |
| privatekey | varchar(100)     | YES  |     | NULL                |                               |
| net type    | varchar(2
*/
router.get ( '/mystatus', auth , async ( req,res)=>{
	let { id , username, uuid : useruuid } = req.decoded
	let aproms = []
	let timestamp1 = moment().unix()
	let timestamp0 = timestamp1 - 3600*24*30 // a month ago
	aproms [aproms.length ] = findone ( 'useractions' , { useruuid , typestr : 'READ-NOTIFY' } ) // 0
	aproms [aproms.length ] = findone ( 'users' , { uuid : useruuid } ) // 1
	aproms [aproms.length ] = countrows_scalar ( 'items' , { useruuid } ) // 2
	aproms [aproms.length ] = countrows_scalar ( 'sales' , { useruuid } ) // 3
	aproms [aproms.length ] = countrows_scalar ( 'items' , { useruuid , isclaimed : 1 } ) // 4
	aproms [aproms.length ] = countrows_scalar ( 'orders' , { useruuid } ) // 3
	let [ 		lasttimereadnotify // 0
		, myinfo // 1
		, countowned // 2
		, countsales // 3
		, countclaimed // 4
		, countorders
	] = await Promise.all ( aproms )
 	let countnotifiesunread 
	if ( lasttimereadnotify ) {
		let timestamplastread = lasttimereadnotify.timestamp
		countnotifiesunread = await countrows_scalar ( 'notifies' , 
			{ timestamp : { [Op.gte] : timestamplastread }
			, [Op.or] : [
					{ useruuid } ,
					{ iscommon : 1 } 
				]
		})
	} else {countnotifiesunread = await countrows_scalar ( 'notifies' , 
		{timestamp : { [Op.gte ] : timestamp0 } 
			, [Op.or] : [
					{ useruuid } ,
					{ iscommon : 1 } 
				]
			}  )
	}
	if ( myinfo ) { 	myinfo = deletejfields ( myinfo , ['id','pwhash','usernamehash','pw' ] ) }
 	respok ( res, null,null, { 
		countowned : countowned || 0 ,
		countsales : countsales || 0 ,	
		countclaimed : countclaimed|| 0 ,	
		countorders : countorders || 0 ,
	 countnotifiesunread : ( countnotifiesunread? countnotifiesunread : 0 ) , // getrandn ( 0 , 4 ) ,
		myinfo ,
	
	} )
})
router.get("/user/myinfo", auth , async (req, res) => {
/**  const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN, 403);
    return;
  } */
	let { uuid } =req?.decoded 
	LOGGER( {uuid })  	
//  findone("users", { username }).then(async (resp) => {
  findone("users", { uuid }).then(async (resp) => { LOGGER( {resp})
    delete resp?.pw;
    let respacct = await findone("accounts", { useruuid : uuid });
		let respsetting = await findone ( 'settings' , { key_:'GIVE-PRIVATEKEY' , active : 1 } )
		if ( + respsetting?.value_) { }
		else { delete respacct?.privatekey }
    respok(res, null, null, {
      payload: {
        myinfo: resp,
        account: {
					address : respacct.address ,
					... respacct
					// nettype : NETTYPE // "ETH-TESTNET": 
        },
      },
    });
  });
});
/** router.get("/us er/myinfo/mongo", async (req, res) => {
  const username = getusernamefromsession(req);
  if (username) {
  } else {
    resperr(res, messages.MSG_PLEASELOGIN, 403);
    return;
  }
  dbm on.users.findOne({ username: username }, async (err, doc) => {
    if (err) {
      LOGGER("", err);
      resperr(res, messages.MSG_INTERNALERR, 500);
      return;
    }
    let countfavorites = await countrows_scalar("logfavorites", {
      username,
      status: 1,
    });
    query_user_market_acts(username).then((respusermarket) => {
      respok(res, null, null, {
        respdata: doc,
        payload: { ...respusermarket, countfavorites },
      });
    });
  });
});
*/
router.get ('/exists/phonenumber' , async ( req,res)=>{
  let { phonenumber,		phonecountrycode2letter , phonenationalnumber ,pw } = req.query
	phonenumber = get_normal_phonenumber ( req?.query ) 
	if ( phonenumber ) {}
	else { resperr ( res , messages.MSG_ARGMISSING , null , { reason : 'PLEASE-SPECIFY-phonenationalnumber-AND-phonecountry2letter-OR-phonenumber' } ) ; return }
	let resp = await findone ( 'users', { phonenumber } ) 
	if ( resp ) { respok ( res, 'EXISTS' ) ; return }
	else { respok ( res, 'DOES-NOT-EXIST' ) ; return }
})
router.get("/id/duplicatecheck/:id", (req, res) => {
  const { id } = req.params;
  findone("users", { username: id }).then((resp) => {
    if (resp)  res.status(406).send({ error: "이미 존재하는 아이디 입니다." });
    else res.status(200).send(id);
  });
});

router.post("/email/verifycode/:emailaddress/:code", (req, res) => {
  const { emailaddress, code } = req.params;
  findone("emailverifycode", { emailaddress: emailaddress }).then((resp) => {
    if (resp) {
    } else {
      resperrwithstatus(res, 412, messages.MSG_DATANOTFOUND);
      return;
    }
    if (resp["code"] == code) {
    } else {
      resperrwithstatus(res, 406, messages.MSG_VERIFYFAIL);
      return;
    }
    respok(res);
  });
});

router.get("/email/verifycode/:emailaddress", (req, res) => {
  const { emailaddress } = req.params;
  if (validateemail(emailaddress)) {
  } else {
    resperrwithstatus(res, 406, messages.MSG_ARGINVALID);
    return;
  }
  sendemail(emailaddress).then((resp) => {
    if (resp.status) {
      respok(res);
      return;
    } else {
      resperrwithstatus(res, 501, resp.reason);
      return;
    }
  });
});
router.post("/login", async (req, res) => { 
//  const { useri name, pw } = req.body;
  let { phonenumber,		phonecountrycode2letter , phonenationalnumber ,pw, code } = req.body;
  LOGGER("m9m9hptxoA", req.body); // log gerwin.info ( req.body )//  respok(res);return //  if (us ername && pw) {  } 

	phonenumber = get_normal_phonenumber ( req?.body ) 
	if ( phonenumber ) {}
	else { resperr ( res , messages.MSG_ARGMISSING , null , { reason : 'PLEASE-SPECIFY-phonenationalnumber-AND-phonecountry2letter-OR-phonenumber' } ) ; return }

  if ( pw || code ) {  } 
	else {    resperr(res, messages.MSG_ARGMISSING, null , { reason : 'pw or code'} );
    return;
  }   //  let isaddressvalid = WAValidator.validate(address , cryptotype.toLowerCase() ) //  if(isaddressvalid){} else {   resperr(res , messaegs.MSG_ARGINVALID);return  //  }
	let { nettype } =req.query
//	if ( nettype ){} else { resperr( res, 'NETTYPE-NOT-SPECIFIED' ) ; return }
	if ( nettype ){} else { resperr( res, messages.MSG_NETTYPE_NOT_SPECIFIED ) ; return }
	let NETTYPE = nettype 
//  let respuser = await findone("users", { use rname, pw , pwhash : sha256(pw) , nettype }) // .then(async (resp) => {
  let respuser
	if ( pw ) {		respuser = 	 await findone("users", { phonenumber , pw , nettype } )
	}
	else if ( code ) {
		let resp = await db[ 'verifycode'].findOne ({ raw : true, where : { receiver : phonenumber , code , expiry : {[Op.gte] : moment().unix() } } } )
		if ( resp ) {}
		else { resperr ( res, messages.MSG_ARGINVALID ) ; return }
		respuser = 	 await findone("users", { phonenumber ,  nettype } )
	}
	else { resperr ( res,messages.MSG_ARGMISSING ) ; return 
	}
//pwhash : sha256(pw) ,
  // .then(async (resp) => {
    if (respuser ) {
    } else {
      resperr(res, messages.MSG_VERIFYFAIL);
      LOGGER(messages.MSG_VERIFYFAIL);
      return;
    }
    let { icanlogin } = respuser
    if (+ icanlogin) {
    } else {
      resperr(res, messages.MSG_USER_LOGIN_FORBIDDEN ) // MSG_AUTH_FAILED);
      LOGGER(messages.MSG_USER_LOGIN_FORBIDDEN ) // MSG_AUTH_FAILED);
      return;
    }
	let useruuid = respuser?.uuid
    let respacct = await findone("accounts", { useruuid } ) // : phonenumbwe })
		let respsetting = await findone ( 'settings' , { key_:'GIVE-PRIVATEKEY' , active : 1 } )
		if ( + respsetting?.value_) { }
		else { delete respacct?.privatekey }
    //		let jacct= {}
    //	jacct= { address : respacct.address , nett ype : 'ETH-TESTNET' }
//    const token = generaterandomstr(TOKENLEN);
    let ipaddress = getipaddress(req);
		let resptokenenv = await findone ( 'tokens' , { nettype : NETTYPE , active:1 , istoken : 1 } )
		respuser = deletejfields ( respuser , ['id','pw','pwhash' , 'usernamehash' ] )
		let token = await createJWT ( respuser )
    let respsession = await createrow("sessionkeys", {
      username : phonenumber ,
      token : token?.token ,
      useragent: getuseragent(req).substr(0, 900),
      ipaddress,
			useruuid 
    }) // .then(async (resp) => {
      respok(res, null, null, {
        respdata: token,
        payload: {
          token,
          account: {
            nettype : NETTYPE // "ETH-TESTNET": 
						, address :				respacct.address,
						... respacct
          },
					tokenenv : resptokenenv 	
        },
      });
      createrow("logactions", {
        username : phonenumber ,
        unixtime: moment().unix(),
        type: MAP_USER_ACTIONS["LOGIN"],
        typestr: "LOGIN",
        ipaddress: getipaddress(req),
      });
//    });
//  });
});
router.post("/logout",async (req, res) => {
	let token=req?.headers?.token || req?.headers?.authorization
  LOGGER("/logout", token); // log gerwin.info ( {token})
  if (token) {
  } else {
    resperrwithstatus(res, 403, messages.MSG_PLEASELOGIN, 36632);
    return;
  }
	let respfind = await db.sessionkeys.findOne({ where: { token } }) // .then((respfind) => {
// let respfind = await findone( 'sessionkeys' , { token } ) 
      if (respfind && respfind.dataValues) {
      } else {
        resperrwithstatus(res, 403, messages.MSG_PLEASELOGIN);
        return;
      }
      if (respfind.dataValues.active) {
      } else {
        resperrwithstatus(res, 412, messages.MSG_SESSIONEXPIRED);
        return;
      }
      let { username } = respfind.dataValues;
      respfind
        .update({ active: 0 })
        .then((respupdate) => {
          respok(res);

          createrow("logactions", {
            username,
            unixtime: moment().unix(),
            type: MAP_USER_ACTIONS["LOGOUT"],
            typestr: "LOGOUT",
            ipaddress: getipaddress(req),
          });
          /**       let {dataValues}=respfind ;      if(dataValues.isoauth){} else {return}      db.oauthsessions.findOne({where:{id:dataValues.idtooauthtable}}).then(respoauth=>{        respupdate.update({active:0})      }).catch(err=>{LOGGER('PCXENcujpp' ,err) ; resperr(res) }) */
        })
/*        .catch((err) => {
          LOGGER("sHw1wZpAZ4", err);
          resperr(res);
        }); */
/*    })
    .catch((err) => {      LOGGER("Cf9NiZEEY7", err);      resperr(res);
    }); */
});

module.exports = router;
const STRINGER = JSON.stringify
async function createJWT(jfilter) {
  let userwallet;
  let userinfo = await db['users'].findOne({
    raw: true,
    where: {      ...jfilter,
    }, /**    attributes: [      'id',      'firstname',      'lastname',      'email',      'phone',      'level',      'referercode',      'isadmin',      'isbranch',      'profileimage',      'countryNum',      'language',      'mailVerified',      'phoneVerified',    ], */
  });
  if (!userinfo) {
    return false;
  }
	LOGGER(`@userinfo` , userinfo)  ; // logg erwin.info ( STRINGER(userinfo ))
  let token = jwt.sign(
    {      type: 'JWT',
      ... userinfo, //      wallet: userwallet,
    },
    JWT_SECRET, //    process.env.JWT_SECRET,
    {      expiresIn: '30000h',    // expiresIn: '24h',
      issuer: 'EXPRESS',
    }
  ); //	de lete userinfo[ 'pw' ]
  return {
    token, // tokenId: 
    ...userinfo,
    userinfo,
  };
}
const { parsePhoneNumber}= require('libphonenumber-js')
const get_normal_phonenumber=({phonenumber , phonecountrycode2letter : country2letter, phonenationalnumber : nationalnumber })=>{
	if ( country2letter && nationalnumber ) {
		let phonenum = parsePhoneNumber ( nationalnumber ,country2letter ) ; LOGGER( {phonenum } ) 
		return phonenum?.number
	} else if ( phonenumber ) { return phonenumber } 
	else { return null }
} 
router.get ( '/phoneverifycode' , async ( req,res ) => {
	let { phonenumber , phonecountrycode2letter , phonenationalnumber } = req.query
	LOGGER( 'phonenumber' , req?.query ) // phonenumber , phonecountrycode2letter , phonenationalnumber )
	phonenumber = get_normal_phonenumber ( req?.query ) 
	if ( phonenumber ) {}
	else { resperr ( res , messages.MSG_ARGMISSING , null , { reason : 'PLEASE-SPECIFY-phonenationalnumber-AND-phonecountry2letter-OR-phonenumber' } ) ; return }

	if (+req.query?.allowexistingnumber ) {}
	else {
		let resp = await findone ( 'users' , { phonenumber } )
		if ( resp ) { LOGGER('PHONENUMBER-ALREADY-IN-USE') ; resperr ( res, 'PHONENUMBER-ALREADY-IN-USE' , 30741 ); return }
		else {}
	}
	let code = generaterandomnumber ( 100000,999999 ) 
	let respsend =	await sendMessage ( { type : 'PHONE-VERIFY' ,  phonenumber , code }  )
	if ( respsend ) {}
	else { resperr ( res, 'SMS-SEND-ERR' ) ; return }
	respok ( res, 'CODE-SENT-TO-DEVICE' ,null ) // , { code } )	
	await updateorcreaterow ( 'verifycode' , { receiver : phonenumber , expiry : moment().add(10,'minutes').unix() } , { code } )
})
router.post ( '/phoneverifycode' , async ( req, res ) => { LOGGER( req.body )
	let { code } =req.body
	if (  code ) {}
	else { resperr ( res , messages.MSG_ARGMISSING , null, { reason : 'code' } ) ; return } 

	let { phonenumber , phonecountrycode2letter , phonenationalnumber } = req?.body
	LOGGER( 'phonenumber' , req?.body ) // phonenumber , phonecountrycode2letter , phonenationalnumber )
	phonenumber = get_normal_phonenumber ( req?.body ) 
	
	if ( phonenumber ) {}
	else { resperr ( res , messages.MSG_ARGMISSING , null , { reason : 'PLEASE-SPECIFY-phonenationalnumber-AND-phonecountry2letter-OR-phonenumber' } ) ; return }

	let resp = await db[ 'verifycode'].findOne ({ raw : true, where : { 
		receiver : phonenumber , 
		code , 
		expiry : {[Op.gte] : moment().unix() } } } )
	if ( resp ) {}
	else { resperr ( res, messages.MSG_ARGINVALID ) ; return }
	respok ( res , 'VERIFIED' ) 
})
const MAP_USERACTIONS={
}
const MAP_WALLETKINDS={
		KLIP_APP : 1 
	, KLIP_TALK : 2
	, KAIKAS : 3
	, METAMASK : 4
}
router.post ( '/action', auth , async (req,res)=>{ LOGGER( req?.body )
	let { uuid : useruuid , username } = req?.decoded
	let useragent = getuseragent(req) // .substr(0, 300)
	if ( useragent ) { useragent = useragent.substr(0, 600) }
	else {}
	let { typestr , address , walletkind } =req?.body
	if ( typestr == 'CONNECT-WALLET' ) {}
	else { resperr (res, 'UNRECOGNIZED-ACTION-TYPE' ) ; return }

	if ( address  ) {}
	else { resperr ( res, messages.MSG_ARGMISSING , null, {reason : 'address' } ) ; return }
	if (  walletkind ) {}
	else { resperr ( res, messages.MSG_ARGMISSING , null, {reason : 'walletkind' } ) ; return }

	if ( MAP_WALLETKINDS[ walletkind ] ) {}
	else { resperr (res, messages.MSG_ARGINVALID , null, { reason : 'walletkind' } ); return }
	let timenow = gettime()
	await createrow ( 'useractions',  {
		type : 801,
		typestr : 'CONNECT-WALLET' ,
		useragent ,
//		status : '',
//		note      :'' ,
		useruuid , // :''  ,
		timestamp : timenow?.unix ,
		address : address || null  ,
		username : username || null ,
		data      : STRINGER( req?.body ) ,		
	})
	respok ( res )
})
/* type      | tinyint(4)       | YES  |     | NULL                |                               |
| typestr   | varchar(100)     | YES  |     | NULL                |                               |
| status    | tinyint(4)       | YES  |     | NULL                |                               |
| note      | text             | YES  |     | NULL                |                               |
| useruuid  | varchar(80)      | YES  |     | NULL                |                               |
| timestamp | bigint(20)       | YES  |     | NULL                |                               |
| data      | t
*/

