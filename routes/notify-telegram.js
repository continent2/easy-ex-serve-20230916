
const TelegramBot = require('node-telegram-bot-api');
// const token='6292905647:AAGJe8eW54SC7kFF_3F5XeUxOCsdIHjOQZc'
//	const token='6121250568:AAF-GBOu160CM65pfu-w6aTC70mTzzidHyQ'
const token='5856555617:AAGL9VUg32WioSc00d2ZWdw_U0a5ABRuZkY'

const bot = new TelegramBot(token, { polling: true })
// https://api.telegram.org/bot6292905647:AAGJe8eW54SC7kFF_3F5XeUxOCsdIHjOQZc/getUpdates

// const chatid='-765452059'
//	const chatid = '-917329650'
const chatid= '-917329650'
//	const moment=require('moment')
const { gettime } = require('../utils/common') 
// bot.sendMessage ( chatid, '메세지 수신 완료!');
// const dirname='/media/ubuntu/T7/weight-w096/'
//	const dirname='/home/ubuntu/data/nlst/04/manifest-1688526753961/NLST/'
//	const fs = require('fs'); // const dir = './directory';
//	const pcid = 'RTX2800ti'
const LOGGER=console.log
/* const countfiles=dir=>{
	let files = fs.readdirSync (dir ) 
	let nfiles = files.length
	LOGGER('nfiles', nfiles  ) 
	return nfiles
} */
const sendmessage=({ title, msg } )=>{
	bot.sendMessage ( chatid, `${title}\n` + msg + `\n@${ gettime().str }` )
}
module.exports= { sendmessage
}
/** 
const cron=require('node-cron')
const start =_=>{
	let nfiles0  =countfiles ( dirname )
	let nfiles1
	bot.sendMessage ( chatid, `${nfiles0},@${pcid}` )

	cron.schedule ( '* * * * *' , _=>{
		nfiles1 = countfiles ( dirname )
		if ( nfiles1 > nfiles0){
			bot.sendMessage ( chatid, `${nfiles1},@${pcid}` )
			nfiles0 = nfiles1
		}
	})
}
start () */

/** {"ok":true,"result":[{"update_id":841305179,
"my_chat_member":{"chat":{"id":-765452059,"title":"notidownload-20230707","type":"group","all_members_are_administrators":false},"from":{"id":895459587,"is_bot":false,"first_name":"cheny","last_name":"lee","username":"devman1","language_code":"en"},"date":1688695071,"old_chat_member":{"user":{"id":6292905647,"is_bot":true,"first_name":"experimentnoti","username":"experimentnoti_bot"},"status":"left"},"new_chat_member":{"user":{"id":6292905647,"is_bot":true,"first_name":"experimentnoti","username":"experimentnoti_bot"},"status":"member"}}},{"update_id":841305180,
"message":{"message_id":3,"from":{"id":895459587,"is_bot":false,"first_name":"cheny","last_name":"lee","username":"devman1","language_code":"en"},"chat":{"id":-765452059,"title":"notidownload-20230707","type":"group","all_members_are_administrators":true},"date":1688695071,"group_chat_created":true}}]}

*/
