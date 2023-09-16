const jwt = require('jsonwebtoken');
const db = require('../models');
// require("dotenv").config( { path  : '../.env' } );
const { JWT_SECRET } = require ( '../configs/configs')
const { getipaddress }  =require('../utils/session')
const { resperr} = require('../utils/rest' )
const { gettimestr } =require('../utils/common' )
const { updaterow } =require('../utils/db' )
const { messages } = require('../configs/messages')
const LOGGER=console.log
const STRINGER =JSON.stringify

const { createLogger, transports, format } = require('winston');
/** const loggerwin = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: './logs/logs.log',
      json: true , // false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ]
}); */
exports.auth =(req, res, next) => { 
LOGGER( req.headers.authorization  , getipaddress(req) ) // ;loggerwin.info ( req.headers.authorization  , getipaddress(req) ) 
  try {		let token = req?.headers?.authorization || req?.headers?.token 
    jwt.verify(
      `${ token }`,
      JWT_SECRET,		//      process.env.JWT_SE CRET,
      (err, decoded) => {
		LOGGER('err', err)
		LOGGER('decoded', STRINGER ( decoded) ) // ; loggerwin.info ( STRINGER ( decoded) )
        if (err) {
				res.status(401).send( {status: 'ERR' , message:'TOKEN-EXPIRED' } ) ; return 
          throw err;
        }
//			let respuser= await db['users'].findOne({ raw:true, where : { id : decoded.id } } )
//			db['users'].findOne({ raw:true, where : { id : decoded.id } } ).then ( respuser => {
  			db [ 'sessionkeys'].findOne ( {raw:true, where : { token ,active:1 } }).then( respsession =>{
					if ( respsession ) {}
					else { resperr  ( res , messages.MSG_SESSIONEXPIRED  ) ; return }
//			LOGGER( 'respuser' , respuser ) 
/**			if (respuser ){
			updaterow ( 'users' , { id : decoded.id } , { lastaction : gettimestr() }  )
				if ( req.originalUrl.match ( /^\/queriesauth\/rows\/bans/ ) || req.originalUrl.match ( /^\/queriesauth\/rows\/loglogins/ )  ) {} // url
//				if ( req.originalUrl.match ( /\/queriesauth\/rows\/bans/ ) || /^\/queriesauth\/rows\/loglogins/  ) {} // url
				else if ( respuser.status > 1 ) {
					resperr ( res , 'ROGUE-USER' , null , { mystatus : ( respuser.status == 2? 'banned' : 'suspended' ) } )					return 				} else {
				}			}  */
				req.decoded = decoded;
        // console.log(req.decoded);
        return next();
			})
		} )
//	})
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
//			LOGGER( `TokenExpiredError`) ; return next() 
      return res.status(419).json({
        code: 419,
        message: 'Token Expired.',
      });
    }
    if (error.name === 'JsonWebTokenError') {
	//		LOGGER( `JsonWebTokenError`) ; return next()
      return res.status(401).json({
        code: 401,
        message: 'Token Invalid.',
      });
    }
  }
};

exports.softauth = (req, res, next) => {
  try {	let token = req?.headers?.authorization || req?.headers?.token  //    let result = 
		jwt.verify(
			`${ token }`,
      JWT_SECRET,		//      process.env.J WT _SECRET,
      (err, decoded) => {
        // console.log('softauth@@@@@@@@@@@@ decoded', decoded);
				if ( decoded ){
        	req.decoded = decoded;
  				db [ 'sessionkeys'].findOne ( {raw:true, where : { token ,active:1 } }).then( respsession =>{
						if ( respsession ) {	return next()	}
						else { resperr  ( res , messages.MSG_SESSIONEXPIRED  ) ; return }
					})
				}
        return next();
      }
    );
  } catch (error) {
    req.decoded = false;
    return next();
  }
};

exports.adminauth = async (req, res, next) => {
  let { id } = jwt.verify(
    `${req.headers.authorization}`,
    JWT_SECRET,
//    process.env.JW T_SEC RET,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({
          code: 401,
          message: 'No Admin Privileges',
        });
      }
      req.decoded = decoded;
      return decoded;
    }
  );
  if(!id) {
  return;
  } else {}
  let user = await db['users'].findOne({ where: { id }, raw: true });
  if ( +user.level < 50 ) { // isadmin === 0) {
    return res.status(401).json({
      code: 401,
      message: 'No Admin Privileges',
    });
  }
  req.isadmin = 1 //  user.isadmin;
//  if (user.isadmin === 1) {req.admin_level = 'GENERAL';  }
  //if (user.isadmin === 3) {req.admin_level = 'EXCLUSIVE';  }
//  if (user.isadmin === 2) {    req.admin_level = 'ADMIN';  }

  return next();
};
