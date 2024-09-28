
// const { findall , updaterow } = require ('../utils/db')
// const cron = require ('node-cron')
// const { gettime } = require('../utils/common' )
// const db = require('../models')
// const { Op } = db.Sequelize;

var express = require("express");
const { respok } = require("../utils/rest");
var router = express.Router();

router.get ( '/hello' , (req , res )=>{
	respok ( res , '__HELLO__' )
})
module.exports = router