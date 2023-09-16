var express = require('express');
var router = express.Router();
const moment=require('moment')
/* GET home page. */
const {respok} =require('../utils/rest')

router.get('/ping',(req,res)=>{
	respok(res,null,null,{ time: moment().format('YYYY-MM-DDTHH:mm:ss.SSS') } )
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
