var express = require("express");
var router = express.Router();
const {
  findone,
  findall,
  createrow,
  updaterow,
  countrows_scalar,
  createorupdaterow,
} = require("../utils/db");
// const { updaterow: updaterow_mon } = require("../utils/dbm on");
const KEYS = Object.keys;
const { JWT_SECRET } = require ( '../configs/configs')
const {
  LOGGER,
  generaterandomstr,
  generaterandomstr_charset,
  gettimestr,
  convaj,
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
const { validateemail } = require("../utils/validates");
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
const { auth ,softauth  } = require('../utils/authMiddleware');
/* GET users listing. */
module.exports = router;
// const URL='https://plus8.co/assets'
//	const URL='https://plus2.online/assets'
const URL='https://magic3.co/assets'
const { upload } = require("../utils/multer");
// router.post("/enrollbanner", upload.single("img"), async (req, res) => {

router.post("/file", // auth , 
	upload.single("img"), 
	async (req, res) => {
  const imgfile = req.file;	//  let { type, title, external_link } = req.body;
  console.log(req.file);
  if (imgfile) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
	let urlfile = `${URL}/${imgfile.filename }`  ; LOGGER( { urlfile })
	respok ( res, null,null, { urlfile } ) 	
})


