-- MySQL dump 10.19  Distrib 10.3.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: pluswallet
-- ------------------------------------------------------
-- Server version	10.3.38-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `username` varchar(80) DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `privatekey` varchar(100) DEFAULT NULL,
  `nettype` varchar(20) DEFAULT NULL,
  `currentBlockNumber` bigint(12) NOT NULL DEFAULT 10000000,
  `firstUsedBlockNumber` bigint(12) NOT NULL DEFAULT 11000000,
  `useruuid` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `balances`
--

DROP TABLE IF EXISTS `balances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balances` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `address` varchar(80) DEFAULT NULL,
  `username` varchar(80) DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `currency` varchar(20) DEFAULT NULL,
  `nettype` varchar(20) DEFAULT NULL,
  `currencyaddress` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `title` varchar(200) DEFAULT NULL,
  `subtitle` varchar(1000) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `group_` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailverifycode`
--

DROP TABLE IF EXISTS `emailverifycode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailverifycode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `emailaddress` varchar(100) DEFAULT NULL,
  `lastupdate` varchar(30) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemid` varchar(100) DEFAULT NULL,
  `is1copyonly` tinyint(4) DEFAULT 1,
  `countcopies` int(10) unsigned DEFAULT NULL,
  `countsplitshares` bigint(20) unsigned DEFAULT NULL,
  `owner` varchar(80) DEFAULT NULL,
  `author` varchar(80) DEFAULT NULL,
  `authorfee` int(10) unsigned DEFAULT NULL COMMENT 'authorfee unit is in basis point==10**4',
  `countfavors` bigint(20) unsigned DEFAULT 0,
  `type` int(10) unsigned DEFAULT NULL COMMENT '1: single copy, 2: multi copy , 3: split shares',
  `typestr` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logactions`
--

DROP TABLE IF EXISTS `logactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `username` varchar(80) DEFAULT NULL,
  `unixtime` bigint(20) unsigned DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL COMMENT ' 0:join , 1:login, 2:logout 3:change-pw , 4:change-nickname ',
  `ipaddress` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notifies`
--

DROP TABLE IF EXISTS `notifies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `writer` varchar(80) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `contentbody` varchar(1000) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL,
  `iscommon` tinyint(4) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `useruuid` varchar(80) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pushnotifies`
--

DROP TABLE IF EXISTS `pushnotifies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pushnotifies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `username` varchar(80) DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `currency` varchar(20) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL COMMENT ' 0 :DEPOSIT , 1: WITHDRAW',
  `typestr` varchar(40) DEFAULT NULL COMMENT ' 0 :DEPOSIT , 1: WITHDRAW',
  `txhash` varchar(80) DEFAULT NULL,
  `from_` varchar(80) DEFAULT NULL,
  `to_` varchar(80) DEFAULT NULL,
  `nettype` varchar(20) DEFAULT NULL,
  `read_` tinyint(4) DEFAULT 0,
  `title` varchar(100) DEFAULT NULL,
  `contentbody` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessionkeys`
--

DROP TABLE IF EXISTS `sessionkeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessionkeys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `username` varchar(40) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `ipaddress` varchar(64) DEFAULT NULL,
  `useragent` varchar(1000) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `lastactive` varchar(30) DEFAULT NULL,
  `useruuid` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `key_` varchar(100) DEFAULT NULL,
  `value_` varchar(2000) DEFAULT NULL,
  `subkey_` varchar(100) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tmppw`
--

DROP TABLE IF EXISTS `tmppw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tmppw` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `emailaddress` varchar(100) DEFAULT NULL,
  `lastupdate` varchar(30) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
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
  `urllogo` varchar(400) DEFAULT NULL,
  `isdefault` tinyint(4) DEFAULT NULL,
  `uuid` varchar(80) DEFAULT NULL,
  `deployer` varchar(80) DEFAULT NULL,
  `isadminadded` tinyint(4) DEFAULT NULL COMMENT 'registered by admin',
  `totalsupply` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `txtype` tinyint(4) DEFAULT NULL,
  `useruuid` varchar(80) DEFAULT NULL,
  `currencytype` tinyint(4) DEFAULT NULL,
  `assetaddress` varchar(80) DEFAULT NULL,
  `amounttodisp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2701 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactionsinside`
--

DROP TABLE IF EXISTS `transactionsinside`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactionsinside` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `username` varchar(80) DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `currency` varchar(20) DEFAULT NULL,
  `from_` varchar(80) DEFAULT NULL,
  `to_` varchar(80) DEFAULT NULL,
  `writer` varchar(80) DEFAULT NULL,
  `nettype` varchar(20) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `typestr` varchar(20) DEFAULT NULL,
  `uuid` varchar(50) DEFAULT NULL,
  `supertype` tinyint(4) DEFAULT 0,
  `note` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactionsoutside`
--

DROP TABLE IF EXISTS `transactionsoutside`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactionsoutside` (
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactionsoutside20220101`
--

DROP TABLE IF EXISTS `transactionsoutside20220101`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactionsoutside20220101` (
  `no` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `removed` varchar(300) DEFAULT NULL,
  `logIndex` varchar(300) DEFAULT NULL,
  `transactionIndex` varchar(300) DEFAULT NULL,
  `transactionHash` varchar(300) DEFAULT NULL,
  `blockHash` varchar(300) DEFAULT NULL,
  `blockNumber` varchar(300) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `data` varchar(300) DEFAULT NULL,
  `topics` varchar(300) DEFAULT NULL,
  `id` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `useractions`
--

DROP TABLE IF EXISTS `useractions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useractions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `type` tinyint(4) DEFAULT NULL,
  `typestr` varchar(100) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `useruuid` varchar(80) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userprefs`
--

DROP TABLE IF EXISTS `userprefs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userprefs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `username` varchar(80) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `key_` varchar(50) DEFAULT NULL,
  `value_` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usertokens`
--

DROP TABLE IF EXISTS `usertokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `urllogo` varchar(400) DEFAULT NULL,
  `useruuid` varchar(80) DEFAULT NULL,
  `uuid` varchar(80) DEFAULT NULL,
  `amountissued` varchar(20) DEFAULT NULL,
  `tokenuuid` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-29  3:53:37
