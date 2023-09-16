
const ispositivefloat = (s) => {
  return !isNaN(s) && Number(s) > 0
}

const validate_txhash=str=>{  return /^0x([A-Fa-f0-9]{64})$/.test( str )}

// const validatepw=str=>{ return true }

const validatepw=str=>{
	if ( str && str.length >= 7) {}
	else { return false }
	if ( str.match (/\d+/ ) && ( str.match( /[a-z]/ ) || str.match( /[A-Z]/ )  ) ) {  return true }
	else { return false }
//	else { return false } 
}
// }
const validateusername=str=>{	return str && str?.length>0 && str?.length<=10 
}
/** const validateusername=str=>{
//	if ( str && str.length >= 7 && str.match (/\d+/) && str.match( /[a-z]/ && str.match( /[A-Z]/ )) ){ return true }
	if ( str && str.length >= 7 && str.match (/\d+/) && ( str.match( /[a-z]/ ) || str.match( /[A-Z]/ )) ){ return true }
	else { return false } 
} */
const validateemail =email=> {  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports={ispositivefloat , 
	validate_txhash
	, validatepw
	, validateusername
	, validateemail
}
