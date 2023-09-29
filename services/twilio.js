// require("dotenv").config({ path: "../.env" });
const accountSid = 'AC5dc7dd8949584bd3a3cdffe90d0cec72' // process.env.TWILIO_ACCOUNT_SID;
// const authToken = 'a434c9fc511866dc9919b597f0517530' // process.env.TWILIO_AUTH_TOKEN;
const authToken = '74df7ddc5e67f9d4c1015047865b940d' // process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);
const { findone } =require('../utils/db')

const sendMessage = async ({ type, code ,  order , phonenumber } ) => {
	let expiresinsec = 180 , expiresinmin = 3 
  let respexpiry = await findone ( 'settings', {key_ : 'PHONE-VERIFY-CODE-EXPIRES-IN-SEC' , active : 1 } ) 
  if ( respexpiry && respexpiry?.value_ ) { 
    expiresinsec = + respexpiry?.value_
    expiresinmin = expiresinsec / 60
  }
	let body
	switch ( type ) {	
		case 'PHONE-VERIFY' : body =`[Easy exchange] Code:
[${code}] 
Verify your device in ${expiresinmin} minutes` 
		break
		case 'ORDER-NOTIFY' : body = `[출금요망]:
	bank: ${order?.bankname}
	account: ${order?.bankaccount}
	owner: ${order?.bankaccountholder}
	amount: ${order?.toamount} ${order?.quote }`
		break
	}
	return new Promise ( (resolve,reject)=>{
  client.messages
    .create({
			body , // messagingServiceSid: 'MG0b420f495dc8f54f1e9bdccce50bbd8b', //      from: "+17692468530",
			from : '+12544143144' ,
      to: `${ phonenumber }`,
      //      to: '+82-10-8497-8755' // 'phone,
    })
    .then((message) => {
      resolve ( message.sid ) ; return 
    }).catch (err=>{
			resolve ( null  ) ; return 
		});
	} )
	}

const test = {
  phone: function test(phone, CODE) {
    client.messages
      .create({
        body: `[BETBIT] Your verify code is [${CODE}]
      Please complete the account verification process in 10 minutes.`,
        // messagingServiceSid: 'MG0b420f495dc8f54f1e9bdccce50bbd8b',
        from: "+2057794057",
        to: `${phone}`,
        //      to: '+82-10-8497-8755' // 'phone,
      })
      .then((message) => {
        return message.sid;
      });
  },
};

module.exports = { sendMessage, test };
