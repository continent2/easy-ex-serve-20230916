
insert into tokens (name, symbol,decimals,address ,active,nettype,istoken,urllogo,uuid,typestr,typecf )
 values ( 'USDT', 'USDT', 18 , '0xf96585E17750CeF1ed959846bfEE9983ef96A324',1,'ETH-TESTNET', 1,  
'https://easychange1.co/assets/USDT.png',uuid(), 1,'C' ) ;


insert into tokens (name, symbol,decimals,address ,active,nettype,istoken,urllogo,uuid,typestr,typecf )
 values ( 'ETH', 'ETH', 18 , '0x0000000000000000000000000000000000000000',1,'ETH-TESTNET', 0, 
'https://easychange1.co/assets/ETH.png',uuid(), 2,'C' ) ;

insert into adminsettings (key_,value_,active,group_) values ('NOTIFY_VIA_TELEGRAM',1,1,'NOTIFY') ;
insert into adminsettings (key_,value_,active,group_) values ('NOTIFY_VIA_SMS',1,1,'NOTIFY') ;

insert into adminsettings (key_,value_,active,group_) values ('SMS_RECEIVE_PHONE_NUMBER','+821023715298',1,'NOTIFY') ;

CREATE TABLE `adminsettings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `key_` varchar(100) DEFAULT NULL,
  `value_` varchar(2000) DEFAULT NULL,
  `subkey_` varchar(100) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `units` varchar(20) DEFAULT NULL,
  `min` varchar(20) DEFAULT NULL,
  `max` varchar(20) DEFAULT NULL,
  `group_` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
tokens where id =1 \G
*************************** 1. row ***************************
          id: 1
   createdat: 2023-09-17 08:10:08
   updatedat: 2023-10-01 13:57:16
        name: USDT
      symbol: USDT
    decimals: 6
     address: 0xdAC17F958D2ee523a2206206994597C13D831ec7
      writer: NULL
      active: 1
     nettype: ETH-MAINNET
     istoken: 1
     urllogo: https://easychange1.co/assets/USDT.png
   isdefault: NULL
        uuid: 9dab32d7-5531-11ee-9c8b-02995df8be60
    deployer: NULL
isadminadded: NULL
 totalsupply: NULL
     typestr: 1
      nation: NULL
      typecf: C


CREATE TABLE `pairs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `quote` varchar(20) DEFAULT NULL,
  `base` varchar(20) DEFAULT NULL,
  `fromamount` varchar(20) DEFAULT NULL,
  `toamount` varchar(20) DEFAULT NULL,
	exchangerate varchar(20 ) ,
	fixedrate 	 varchar(20 ) ,
	isusedfixedrate tinyint ,
  `active` tinyint(4) DEFAULT NULL,
  `typestr` varchar(20) DEFAULT NULL COMMENT 'FC:1 , CF:2',
  PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uuid` varchar(80) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `feeamount` varchar(20) DEFAULT NULL,
  `feerate` varchar(20) DEFAULT NULL,
  `feerateunit` varchar(20) DEFAULT NULL,
  `receiveaddress` varchar(80) DEFAULT NULL,
  `typecode` int(10) unsigned DEFAULT NULL COMMENT '100 : create, 200 : trade/buy',
  `typestr` varchar(40) DEFAULT NULL,
  `auxdata` text DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0:waiting,1:ok,2:fail,3:expired',
  `expiry` bigint(20) DEFAULT NULL,
  `privatekey` varchar(80) DEFAULT NULL,
  `useruuid` varchar(80) DEFAULT NULL,
  `nettype` varchar(40) DEFAULT NULL,
  `expirystr` varchar(30) DEFAULT NULL,
  `timestampunix` bigint(20) DEFAULT NULL,
  `timestamppaid` bigint(20) DEFAULT NULL,
  `timedeliverdue` bigint(20) DEFAULT NULL,
  `issettled` tinyint(4) DEFAULT NULL,
  `txhashpayout` varchar(80) DEFAULT NULL,
  `statusint` int(11) DEFAULT -1,
  `refundaddress` varchar(80) DEFAULT NULL,
  `quote` varchar(20) DEFAULT NULL,
  `base` varchar(20) DEFAULT NULL,
  `expirydur` bigint(20) DEFAULT NULL,
  `fromamount` varchar(20) DEFAULT NULL,
  `toamount` varchar(20) DEFAULT NULL,
  `bankname` varchar(40) DEFAULT NULL,
  `bankaccount` varchar(40) DEFAULT NULL,
  `banknation` varchar(20) DEFAULT NULL,
  `bankaccountholder` varchar(100) DEFAULT NULL,
  `banksender` text DEFAULT NULL,
  `addressfinal` varchar(80) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `requestdepositconfirm` int(11) DEFAULT NULL,
  `feeamountunit` varchar(20) DEFAULT NULL,
  `depositamount` varchar(20) DEFAULT NULL,
  `timestampdeposit` bigint(20) DEFAULT NULL,
  `exchangerate` varchar(50) DEFAULT NULL,
  `withdrawaccount` varchar(200) DEFAULT NULL,
  `wthdrawamount` varchar(20) DEFAULT NULL,
  `writername` varchar(40) DEFAULT NULL,
  `writeruuid` varchar(80) DEFAULT NULL,
  `writerid` int(11) DEFAULT NULL,
  `withdrawtypestr` varchar(60) DEFAULT NULL,
  `statusstr` varchar(20) DEFAULT NULL,
  `durationdeliver` int(11) DEFAULT NULL,
  `isdeleted` tinyint(4) DEFAULT 0,
  `timestampdeliver` bigint(20) DEFAULT NULL,
  `timestrdeliver` varchar(30) DEFAULT NULL,
  `receivebank` varchar(300) DEFAULT NULL,
  `basenet` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid` (`uuid`)
);


  `value` varchar(20) DEFAULT NULL,
  `fromamount` varchar(20) DEFAULT NULL,
  `toamount` varchar(20) DEFAULT NULL,
  `typestr` varchar(20) DEFAULT NULL COMMENT 'FC:1 , CF:2',
  `source` varchar(20) DEFAULT NULL,

 CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  issettled 

 CREATE TABLE `admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `address` varchar(80) DEFAULT NULL,
  `ip` varchar(40) DEFAULT NULL,
  `pw` varchar(20) DEFAULT NULL,
  `pwhash` varchar(512) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `username` varchar(80) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `email` varchar(80) DEFAULT NULL,
  `nickname` varchar(60) DEFAULT NULL,
  `receiveemailnews` tinyint(4) DEFAULT 0,
  `referercode` varchar(50) DEFAULT NULL,
  `myreferercode` varchar(20) DEFAULT NULL,
  `icanwithdraw` tinyint(4) DEFAULT 0,
  `useragent` varchar(500) DEFAULT NULL,
  `icanlogin` tinyint(4) DEFAULT 1,
  `lastactive` varchar(30) DEFAULT NULL,
  `countincrements` int(10) unsigned DEFAULT 0,
  `countdecrements` int(10) unsigned DEFAULT 0,
  `dob` varchar(30) DEFAULT NULL,
  `dobunix` bigint(20) unsigned DEFAULT NULL,
  `phonenumber` varchar(30) DEFAULT NULL,
  `realname` varchar(40) DEFAULT NULL,
  `uuid` varchar(80) DEFAULT NULL,
  `nettype` varchar(50) DEFAULT NULL,
  `usernamehash` varchar(512) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `preferrednetwork` varchar(40) DEFAULT NULL,
  `useruuid` varchar(80) DEFAULT NULL,
  `urlimage` varchar(400) DEFAULT NULL,
  `phonecountrycode2letter` varchar(20) DEFAULT NULL,
  `phonenationalnumber` varchar(20) DEFAULT NULL,
  `language` varchar(10) DEFAULT NULL,
  `isskipcreatetutorial` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid` (`uuid`)
) ;


insert into tickers (quote,base,value,fromamount,toamount,typestr) values ( 'KRW','USDT','1329.93','1','1329.93','CF') ;
insert into tickers (base,quote,value,fromamount,toamount,typestr) values ( 'ETH', 'KRW', '2177704.33', '1','2177704.33','CF' );
insert into tickers(base,quote,value,fromamount,toamount,typestr) values ( 'BTC','KRW', '35,359,794.36','1','35,359,794.36','CF');




CREATE TABLE `tickers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	quote varchar(20 ) ,
	base varchar(20 ) ,
	value varchar(20 ) ,
	fromamount varchar(20 ) ,
	toamount varchar(20 ) ,
	typestr varchar(20 ) comment 'FC:1 , CF:2' ,
	source varchar(20 ),
	primary key ( id) 
);




CREATE TABLE `pkeys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `address` varchar(80) DEFAULT NULL,
	privatekey varchar(80 ) ,
	primary key (id) 
);


CREATE TABLE `featured` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	itemuuid varchar(80) ,
	saleuuid varchar(80) ,
	uuid varchar(80) ,
	writer varchar(40  ) ,
	primary key ( id)
);

CREATE TABLE `trackpays` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	saleuuid varchar(80 ) ,
	payby varchar(50 ) ,
	useruuid varchar(80 ) ,
	uuid varchar(80 ) comment 'the unique id for this particular payment',
	trackuuid varchar(80 ) ,
	receiveaddress varchar(80 ) ,
	privatekey varchar(80 ) ,
	primary key (id)
) ;




CREATE TABLE `queueofjobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	jobuuid varchar(80) ,
	timestampunix bigint unsigned ,
	primary key (id)
) ;

CREATE TABLE `jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	mineruuid varchar(80 ) ,
	reqpattern varchar(80),
	reqprefix varchar(40 ) ,
	reqsuffix varchar(40 ) ,
	countreqchars int comment 'number of chars specified',
	esthashtrysstr varchar(50) comment 'estimated number of hash tries needed to hit pattern with 50%? chance',
	esthashtrysint bigint unsigned ,
	primary key(id) 
) ;

CREATE TABLE `miners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	nickname varchar(100 ),
	ipaddress varchar(100 ) ,
	port int unsigned ,
	hashratestr varchar(50 ) ,
	hashrateint bigint unsigned ,
	hashratedisp varchar(50),
	countmined bigint unsigned ,
	uuid varchar (80) ,
	primary key ( id ) 

);

CREATE TABLE `logsales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	address varchar(80 ) ,
	typestr varchar(20)  comment '100 :SPOT, 200:AUCTION' ,
	typecode int ,
	price varchar( 40 ) ,
	priceunit varchar(20 ) ,
	seller varchar(80 ) ,
	buyer varchar(80 ) ,
	primary key ( id ) 
);

CREATE TABLE `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	address varchar(80 ) ,
	typestr varchar(20)  comment '100 :SPOT, 200:AUCTION' ,
	typecode int ,
	price varchar( 40 ) ,
	priceunit varchar(20 ) ,
	seller varchar(80 ) ,
	primary key ( id ) 
);

CREATE TABLE `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	address varchar(80 ) ,
	name varchar(80 ) ,
	privatekey varchar(80 ) ,
	isonsale tinyint ,
	primary key (id)	
);


CREATE TABLE `contents` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
		title varchar(200 ) ,
	subtitle varchar(1000) , 
	body text ,
	primary key ( id ) 
);

create table useractions (
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp() ,
	type tinyint ,
	typestr varchar(100 ) ,
	status tinyint ,
	note text ,
	useruuid varchar(80 ) ,
	timestamp bigint ,
	primary key ( id ) 
);
 
CREATE TABLE `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `username` varchar(80) DEFAULT NULL,
  `from_` varchar(80) DEFAULT NULL,
  `to_` varchar(80) DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `currency` varchar(20) DEFAULT NULL,
  `nettype` varchar(20) DEFAULT NULL,
  `writer` varchar(80) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `typestr` varchar(20) DEFAULT NULL,
  `uuid` varchar(50) DEFAULT NULL,
  `supertype` tinyint(4) DEFAULT 0,
  `useruuid` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
)  ;

CREATE TABLE `usertokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(20) DEFAULT NULL,
  `symbol` varchar(20) DEFAULT NULL,
  `decimals` tinyint(4) DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `writer` varchar(80) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `nettype` varchar(20) DEFAULT NULL,
  `istoken` tinyint(4) DEFAULT 1,
	urlimage varchar(400 ) ,
	useruuid varchar(80 ) ,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `address` varchar(80) DEFAULT NULL,
  `ip` varchar(40) DEFAULT NULL,
  `pw` varchar(20) DEFAULT NULL,
	pwhash varchar(512) default null ,
  `level` int(11) DEFAULT NULL,
  `username` varchar(80) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `email` varchar(50) DEFAULT NULL,
  `nickname` varchar(60) DEFAULT NULL,
  `receiveemailnews` tinyint(4) DEFAULT 0,
  `referercode` varchar(50) DEFAULT NULL,
  `myreferercode` varchar(20) DEFAULT NULL,
	icanwithdraw tinyint default 0
  PRIMARY KEY (`id`)
);
create table balances (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `address` varchar(80) DEFAULT NULL,
	username varchar(80)
	, amount varchar(20)
	, currency varchar(20)
	, nettype varchar(20)
) ;
CREATE TABLE `transactionsinside` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	username varchar(80)
	, amount varchar(20)
	, currency varchar(20)
	, to varchar(80)
	, writer varchar(80)
	, nettype varchar(20) 
	, type tinyint 
	, typestr varchar(20)
);
CREATE TABLE `transactionsoutside` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
	username varchar(80)
	, from varchar(80)
	, to varchar(80)  
	, txhash varchar(80)
	, amount varchar(20)
	, currency varchar(20)
	, nettype varchar(20) 
	, writer varchar(80)  
	, type tinyint 
	, typestr varchar(20)
);


