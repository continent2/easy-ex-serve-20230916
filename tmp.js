
router.post('/join',(req,res)=>{let {username,pw,sitename}=req.body; if(sitename){} else {sitename=SITENAME_DEF}
	if(username && pw ){} else {resperr(res,'ARGMISSING',40761);return false}
	findone( 'users' , {username} ).then(respuser=>{
		if(respuser){resperr(res,messages.MSG_ID_DUP,82532);return false}
		createrow({username 
		, pw 
		, ip
		, active:1
		, pwhash:hasher(pw)
	}) //    db.operations.findOne({raw:true,where:{key_:'CURRENCIES'}}).then(respcurr=>{      const currencies=JSON.parse(respcurr['value_'])
	respok(res,null,null)
	callhook({name:username,path:'join'});return false
	})
})
	//	let accounteth
//	let _arespsrates = db.exchangerates.findAll({raw:true,where:{sitename:sitename}})
	// let _arespstokens= db.tokens.findAll({raw:true,where:{nettype:nettype}})
/** 	Promise.all([_arespsrates,_arespstokens]).then(aresps=>{      const resprates=aresps[0];      const resptokens=aresps[1]
		accounteth=configweb3.createaccount() // web3.createaccount()
		  let account=null,netkind // acct.publicAddress , acct.privateWif      
		console.log(accountbtc,accounteth) // ;return false
		const jtokens=_.fromPairs(_.map(resptokens, e => [e.name, e ]))
		resprates.forEach(ratedata=>{ let netkind,nettype
			const jdata=jtokens[ratedata['currency0']]; if (jdata){} else {console.log(`Data missing-${ratedata['currency0']}`);return false}
			if(jdata['group_']=='ETH')      { account=accounteth; netkind=configweb3.netkind, nettype=configweb3.nettype }
		})
//		enqueuedataj(queuenamesj['ADDR-TOKEN'], {flag:'ADD', username:username,address:accounteth['address'] })
	//	enqueuedataj(queuenamesj['ADDR-ETH'] ,  {flag:'ADD', username:username,address:accounteth['address'] })
//		enqueuedataj(queuenamesj['ADDR-BTC'] ,  {flag:'ADD', username:username,address:accountbtc['address'] })            		
	}) */
