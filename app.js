var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
let {findone , updatetable }=require('./utils/db')
const { createLogger , transports , format } = require('winston')

const adminrouter=require('./routes/admin')
const filesrouter = require('./routes/files')
const queriesauthrouter = require('./routes/queries-auth')
const queriesrouter=require('./routes/queries')
const queries02router = require('./routes/queries02')
const queries03router = require('./routes/queries03')
const usersrouter = require('./routes/users');
const exchangesrouter= require('./routes/exchanges')
const hellorouter = require ( './routes/hello')
const cors=require('cors')
var app = express();
const wrap = asyncFn => {
  return (async (req, res, next) => {
    try {      return await asyncFn(req, res, next) }
    catch (error) {      return next(error) }
  })
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(wrap(async(req,res,next)=>{
	let token=req?.headers?.token || req?.headers?.authorization
  if (token){     const resp=await findone('sessionkeys',{token:token,active:1})
    // LOGGER('bXcKR6bgGp',resp)
    if(resp){
			let { username, useruuid } =resp
			req.username=username // ;req.userlevel=resp.level	//      req.userdata = resp
			req.useruuid = useruuid
			let lastactive= gettimestr()
      updatetable('sessionkeys'	,{id:resp.id },{ lastactive }) // token:token,active:1
      updatetable('users' 			, { username },{ lastactive }) // token:token,active:1
    }
    else {  // req.userlevel=null
    }
  }
  // LOGGER('3fX8T5ZBmQ',req.username,getipaddress(req) , req.connection.remotePort)
  next()
})) 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersrouter);
app.use('/queriesauth', queriesauthrouter ) 
app.use('/queries', queriesrouter ) 
app.use('/files', filesrouter ) 
app.use('/queries02', queries02router ) 
app.use('/queries03', queries03router ) 
app.use('/admin', adminrouter)
app.use('/exchanges', exchangesrouter)
app.use('/hello', hellorouter )
/** 
app.use('/tickers', tickersrouter);
app.use('/balances', balancesrouter);
app.use('/contents', contentsrouter);
app.use('/transactions', transactionsrouter);
app.use('/queries', querie srouter);
app.use('/queries02', queries02router);
app.use('/stats', statsrouter);
app.use('/tokenenv', tokenenvrouter);
app.use('/currency', currencyrouter);
app.use('/track', trackrouter);
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
let {gettimestr
,generaterandomnumber
}=require('./utils/common')
let moment=require('moment')
let cron = require('node-cron')
const LOGGER=console.log
const { PORT}=require('./configs/port')
cron.schedule('* * * * *', _=>{
	LOGGER(`${gettimestr()} @easyex-${ PORT }`)
})

/** 
const tickersrouter=require('./routes/tickers')
const balancesrouter=require('./routes/balances')
const contentsrouter=require('./routes/contents')
const transactionsrouter=require('./routes/transactions')
const queries02router=require('./routes/queries02')
const statsrouter=require('./routes/stats')
const tokenenvrouter=require('./routes/tokenenv')
const currencyrouter=require('./routes/currency')
const trackrouter=  require('./routes/track')
*/
/** const lo ggerwin = createLogger ( {
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
loggerwin.add(new transports.Console({ // winston.
//    format: format.simple(), // winston.
    format: format.json(), 
  }));
*/

/* */

