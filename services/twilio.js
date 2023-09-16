// require("dotenv").config({ path: "../.env" });
const accountSid = 'AC5dc7dd8949584bd3a3cdffe90d0cec72' // process.env.TWILIO_ACCOUNT_SID;
// const authToken = 'a434c9fc511866dc9919b597f0517530' // process.env.TWILIO_AUTH_TOKEN;
const authToken = '74df7ddc5e67f9d4c1015047865b940d' // process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

const sendMessage = (phone, CODE) => {
	return new Promise ( (resolve,reject)=>{
  client.messages
    .create({
//      body: `[BuildJob] Your verify code is [${CODE}]
  //    Please complete the account verification process in 10 minutes.`,

			body : 
`[Klay Magic] 인증번호 입니다:
 [${CODE}] 
인증을 10분 이내에 완료하세요`,
      // messagingServiceSid: 'MG0b420f495dc8f54f1e9bdccce50bbd8b',
//      from: "+17692468530",
			from : '+12544143144' ,
      to: `${phone}`,
      //      to: '+82-10-8497-8755' // 'phone,
    })
    .then((message) => {
      resolve ( message.sid ) ; return 
    }).catch (err=>{
			resolve ( null  ) ; return 
		});
	} )
};

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
