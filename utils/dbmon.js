

const dbmon=require('../modelsmongo')

const createrow=async(table,jdata)=>{return await dbmon[table].create(jdata)}
const findall=async (table,jfilter)=>{return await dbmon[table].find({... jfilter})}

const countrows=async ( table )=>{
	return await dbmon[ table] .countDocuments({})
}
const updaterow=(table,jfilter,jupdates)=>{return new Promise((resolve,reject)=>{
	dbmon[table].findOneAndUpdate(jfilter , jupdates , (err,doc)=>{
		if(err){resolve(null);LOGGER(err);return false}
		else {	resolve(doc);return false}
		}	)
	})
}

const createifnoneexistent=async(table,jfilter,jupdates)=>{
	dbmon[table].findOne({ ... jfilter} , (err,doc)=>{
		if(doc ){} //			dbmon.items.update()
		else {
			dbmon.items.create( {... jfilter , ... jupdates } , (err,doc)=>{
				if(err){return null}
				else {return doc}
			} )
		}
	})
}

module.exports={ 
createrow
, countrows
, updaterow 
, createifnoneexistent
, findall
}


