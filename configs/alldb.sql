-- MySQL dump 10.19  Distrib 10.3.32-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	10.3.32-MariaDB-0ubuntu0.20.04.1

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
-- Current Database: `metaplanet`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `metaplanet` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `metaplanet`;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (2,'2021-12-09 13:59:46',NULL,'leejh16@gmail.com','0x5106E8e624416DdC88b9A9b44c3DB879745293Bb','0xb42988b56f3d8b3b6b303cdc04f20bacb200712b8fb1f4df2aa6fcfae65d7094','ETH-TESTNET'),(17,'2021-12-10 11:57:38',NULL,'abcdefg@gmail.com','0x9164ab430a818c8F0b57A5B647706fBed63Db1d3','0x0839b3de685727cb1dc9760c7c081b658b74330409c4246137bd53d029eec1e7','ETH-TESTNET'),(18,'2021-12-10 11:59:06',NULL,'abcdefghij@gmail.com','0x35b9c7E01bC93e994CB1DB42e7b6C6C9a13BF4dC','0x9c25c11651c588f28cfffedd2423daec86693f69a2c0e903bdb4fc545df89e8d','ETH-TESTNET'),(32,'2021-12-15 10:07:55',NULL,'mmaingc@gmail.com','0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed','0xcaceedbd0912a415744beaea5cf3f2fbca535ca7ccbe0dc780ac005488657132','ETH-TESTNET'),(33,'2021-12-24 13:43:57',NULL,'metaPlanet1214@gmail.com','0xEA378e06179E17c15c9564f46288880401A29cCB','0x16df26bf57fece35a063e0f2e7a7165b86fe3619ea442d235e66381be9134be2','ETH-TESTNET');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balances`
--

LOCK TABLES `balances` WRITE;
/*!40000 ALTER TABLE `balances` DISABLE KEYS */;
INSERT INTO `balances` VALUES (2,'2021-12-12 23:43:17','2021-12-19 19:30:51',NULL,'leejh16@gmail.com','12','METAPLANET','ETH-TESTNET',NULL),(3,'2021-12-14 18:17:04',NULL,NULL,'leejh16@gmail.com','0.1','ETH',NULL,NULL),(4,'2021-12-19 18:41:10','2021-12-20 11:51:03',NULL,'mmaingc@gmail.com','23','METAPLANET',NULL,NULL);
/*!40000 ALTER TABLE `balances` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailverifycode`
--

LOCK TABLES `emailverifycode` WRITE;
/*!40000 ALTER TABLE `emailverifycode` DISABLE KEYS */;
INSERT INTO `emailverifycode` VALUES (1,'2021-12-09 11:00:30','2021-12-09 12:14:48','leejh16@gmail.com','2021-12-09T03:14:45','842008'),(2,'2021-12-09 11:02:53','2021-12-19 19:54:58','mmaingc@gmail.com','2021-12-19T10:54:56','052036'),(3,'2021-12-10 11:40:28','2021-12-10 11:40:55','mmaingc@gamil.com','2021-12-10T02:40:53','011330'),(4,'2021-12-14 12:16:56','2021-12-14 12:25:10','maingc@naver.com','2021-12-14T03:25:08','260213'),(5,'2021-12-24 13:42:46',NULL,'metaPlanet1214@gmail.com','2021-12-24T04:42:44','135476');
/*!40000 ALTER TABLE `emailverifycode` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

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
  `token` varchar(48) DEFAULT NULL,
  `ipaddress` varchar(64) DEFAULT NULL,
  `useragent` varchar(1000) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `lastactive` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessionkeys`
--

LOCK TABLES `sessionkeys` WRITE;
/*!40000 ALTER TABLE `sessionkeys` DISABLE KEYS */;
INSERT INTO `sessionkeys` VALUES (1,'2021-12-09 18:05:40','2021-12-17 18:36:07','leejh16@gmail.com','PTT9nreWlFUkRTgsL45VOaWxRy6lCdLMe2OfDZ9Kg3jvRogW','::ffff:106.243.241.171','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',1,'2021-12-17T09:36:07'),(2,'2021-12-10 11:59:06',NULL,'abcdefghij@gmail.com','bNQWC8etcNu2utaj2NvnvRvwCmx6TY7aJIRYiuYz77sJCIJF','::ffff:106.243.241.171','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',1,NULL),(3,'2021-12-10 12:26:55',NULL,'mmaingc@gmail.com','zfdXCeWRi8CHCIFGnAOoMXyE0SxcXRByFr8VkipWhi9U1ouS','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(4,'2021-12-10 12:27:49',NULL,'mmaingc@gmail.com','vyGzV6BmySyvCS9bceLWrj2YN8f6uVSoWghI00BV5YmSldL8','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(5,'2021-12-10 12:29:26',NULL,'mmaingc@gmail.com','5VMghbdnJbwBJKdYzwDbIiZrnz0Qn9Kd1IJYdF7ItV4nFT2c','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(6,'2021-12-10 12:34:53',NULL,'mmaingc@gmail.com','5XQar44YT6TB9BkOgogovrBt0IfoFaNndUDmqwgqMcIde6It','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(7,'2021-12-10 13:01:23',NULL,'abcdefghij@gmail.com','OsXeLaMBJw0bIB6fK8NrSDyyXPfIhQHcNsyfwNr5QBSJu2F9','::ffff:106.243.241.171','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',1,NULL),(8,'2021-12-10 13:01:33',NULL,'mmaingc@gmail.com','T7NL1pvP7ytxIZwQmyFXkBAOrACK64diwCttG7yn2gT5f4Fe','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(9,'2021-12-10 13:02:10',NULL,'mmaingc@gmail.com','dyJfsxQUZC0XcuW18TY8okCrzjfDfoXTs4gF3hRK3BRmee2f','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(10,'2021-12-10 13:59:12','2021-12-10 15:15:52','mmaingc@gmail.com','TIrHmj6zBo9HBQvWm95h6u4iqSrtVO7DIvo4Clm23lT9KWqg','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T06:15:52'),(11,'2021-12-10 15:16:38','2021-12-10 15:16:48','mmaingc@gmail.com','4PicF5CAgMdSYsKXxR4BsRsPZMsSoF1bYpQDacne0oxjzFFU','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',0,'2021-12-10T06:16:48'),(12,'2021-12-10 15:23:50','2021-12-10 17:59:29','mmaingc@gmail.com','6fs4JkNhwAiPwoNUxol46D8fSSE4DmxnwejuZqJEhkJ6AsBO','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T08:59:29'),(13,'2021-12-10 18:07:46','2021-12-10 18:11:25','mmaingc@gmail.com','t4HlqByKfyeEvHF02Xa0CPceejziolrXMKefEfn1E7d4aD2b','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:11:25'),(14,'2021-12-10 18:11:25','2021-12-10 18:29:44','mmaingc@gmail.com','MbOSworTk8GQh25WbeyCo2GMNS5WHkDcYqYJtpk69W28xZE5','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:29:44'),(15,'2021-12-10 18:29:44','2021-12-10 18:29:50','mmaingc@gmail.com','BQghiZT6h3x4YLn4940HnQOKN8WhnM85L442jXdncBmABgcG','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',0,'2021-12-10T09:29:50'),(16,'2021-12-10 18:30:09','2021-12-10 18:31:22','mmaingc@gmail.com','dO70zt8HEcyzbOzzzuoQdehC5FewRny8tptGzSJuAnS1R3TO','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:31:22'),(17,'2021-12-10 18:31:22','2021-12-10 18:32:36','mmaingc@gmail.com','hFW68IhFpyjKenxCFeSfzNrbuZd9Ckqt4X4zMjADOLTukkLN','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:32:36'),(18,'2021-12-10 18:31:48',NULL,'mmaingc@gmail.com','iwkiadUGWdbtakSnffKkfsRLMU1t0t5XOOPFDYVYM0OyO62D','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(19,'2021-12-10 18:32:01',NULL,'mmaingc@gmail.com','ZFyI4A8YmSj2pshg6kkUTOuTjqO3Wf3Fu0d5KNbrMOTM0GXX','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(20,'2021-12-10 18:32:03',NULL,'mmaingc@gmail.com','Flnf5o5XMCdPB6Qtp1Xb48zMwrZpQ1fb0JiA6D4QF9FU5KbC','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(21,'2021-12-10 18:32:12',NULL,'mmaingc@gmail.com','d4wztMr9bhvdPhS8mEak7rRDO5lLGE5WdZ4Ikjmend4dcWtH','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(22,'2021-12-10 18:32:36',NULL,'mmaingc@gmail.com','7MynhWxSFo0uwIVWQeRUB0egmJOR0xYp2K45BvwjQoqk0cwd','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(23,'2021-12-10 18:32:49',NULL,'mmaingc@gmail.com','eNZSSeyrjwX74ESEkOXhDY3hos9Js2QWrA1e4RqRGWGV6OiV','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(24,'2021-12-10 18:33:11',NULL,'mmaingc@gmail.com','FO0liyAgnfomMbpnJqdmPLk8Y0toaL6FnoIR105wxSBHt25a','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(25,'2021-12-10 18:33:26',NULL,'mmaingc@gmail.com','LqR5LELHGtuicIsrw7zMtwB4UF3OVFd0YoStElz5aQ6deOYh','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(26,'2021-12-10 18:33:52',NULL,'mmaingc@gmail.com','rI7pE6qlnT9rrg93YTF1Zx6Ee6Qex2dY4oRlbSkY8EfLwoY0','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(27,'2021-12-10 18:34:06','2021-12-10 18:35:16','mmaingc@gmail.com','3MHzeDG93NwP617jmKkyJEpePm2PHfUhx7yrDHyNPoozo5Gi','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:35:16'),(28,'2021-12-10 18:35:16','2021-12-10 18:35:31','mmaingc@gmail.com','8R5AxaiiSOG6M0v24OQ0ZDYbOKDnrQZ44IQjZNhQ9OSGF66r','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:35:31'),(29,'2021-12-10 18:35:31','2021-12-10 18:35:58','mmaingc@gmail.com','6SqdDShitgqDjB69f3YaCBljllehKnMKGzzr9INcLGhF1gxn','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:35:57'),(30,'2021-12-10 18:35:58','2021-12-10 18:35:58','mmaingc@gmail.com','Z7n7dc28aqCB3KebOhkE2cn50uYuQAT0DdsWENW1rDgjQG3d','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:35:58'),(31,'2021-12-10 18:37:14',NULL,'mmaingc@gmail.com','7BgrjThzowzDKK03bh1z72fx6IzKl2Ki1irON8h6EH4Zvw2I','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(32,'2021-12-10 18:38:14',NULL,'mmaingc@gmail.com','0JoGPq73CMoJGfHi7jPeLwFlN5rP4UvuQ3MSfxGOBL9ix4Is','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(33,'2021-12-10 18:38:22',NULL,'mmaingc@gmail.com','Klj4IFBbTufPgi0i5Qw7RSyCUfnecwwV9xzHFhUXtRG94fpZ','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(34,'2021-12-10 18:38:37',NULL,'mmaingc@gmail.com','CMoNiOJhfCVacCaNur42TO2vxX1ExRjADgmjBDntYZhFIEL2','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(35,'2021-12-10 18:40:01','2021-12-10 18:43:32','mmaingc@gmail.com','QN334LT36sL0G7drmXLAtkp83b4dqNCRdcxpiabZIHwbf6CA','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:43:32'),(36,'2021-12-10 18:40:21',NULL,'mmaingc@gmail.com','dLevdW9HyYeOyrI2swbozDEO1Gy0Yj7VU54qPS6910Qf0hqy','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(37,'2021-12-10 18:43:24',NULL,'mmaingc@gmail.com','9WEIzZVxGZbhvBqKsi1wYZycltykFgMpzVxsptUTgsI2B7JJ','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,NULL),(38,'2021-12-10 18:43:32','2021-12-10 18:45:17','mmaingc@gmail.com','4dTOyD1DpNiMFIjB9T1reyoUqQaPkNibQYdGci9tvpGxsXK4','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:45:17'),(39,'2021-12-10 18:54:40','2021-12-10 18:54:57','mmaingc@gmail.com','JAiFkhQsKZ0r46uAl05gQ9XOOLLHO7Touofdp32AQNyRASru','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:54:57'),(40,'2021-12-10 18:56:25','2021-12-10 18:56:36','mmaingc@gmail.com','QOVq6AVzAcqcOgy4QMrFPWkUDB9PrdUnW55v0ATP8efmBGKb','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:56:36'),(41,'2021-12-10 18:56:53','2021-12-10 18:56:53','mmaingc@gmail.com','Wv0MpRnLR4yz7vrHS3yV0YkgIAq2gRrsJYPFhQ0cULiWZxRG','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-10T09:56:53'),(42,'2021-12-10 19:39:37','2021-12-10 20:10:59','mmaingc@gmail.com','SenlSAqvMxCRyBAU85LoroQh6lkNadHRPSgXweDdDyrxgj3N','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',0,'2021-12-10T11:10:59'),(43,'2021-12-10 19:49:57','2021-12-10 19:50:53','mmaingc@gmail.com','zvigp8VqrCHBQrXJr7YAmvEmpwASU3JUjG9uKkHxZjGkucub','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',1,'2021-12-10T10:50:53'),(44,'2021-12-10 19:50:53','2021-12-10 19:51:16','mmaingc@gmail.com','WtsgjlqHSLks1chJhjApGB1Krs08Eh4HoovjhRnqyTI0lm0S','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',1,'2021-12-10T10:51:16'),(45,'2021-12-10 19:51:16','2021-12-10 19:56:18','mmaingc@gmail.com','UML77y5SvUtavjQZKjEw7dIj1a9Fuyszkbh5LWRIHSw6txMl','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',1,'2021-12-10T10:56:18'),(46,'2021-12-10 19:56:18','2021-12-10 19:56:32','mmaingc@gmail.com','zpgvUjQ7BnCoNx0r1GCVyYrVbva71sTX5rtXQwYEwiqPYyp2','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',0,'2021-12-10T10:56:32'),(47,'2021-12-10 20:11:21','2021-12-12 08:37:41','mmaingc@gmail.com','3FGTj6DrgEUiygiEcKZgw9kOeFmAMGr0dbsX38M4dvKd4gvA','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-11T23:37:41'),(48,'2021-12-11 10:50:29','2021-12-11 10:52:39','mmaingc@gmail.com ','WfpbIja9Ue6PwPt8CDIX0EJiQTgC5bxbpkJRehyH5xdvDS9x','::ffff:106.243.241.171','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',0,'2021-12-11T01:52:39'),(49,'2021-12-11 10:53:36','2021-12-11 10:53:36','mmaingc@gmail.com','tuIhMr9NFfcGmLxz1PnNusYtn1HqkmxK8NNxgwN90RyWfUjU','::ffff:106.243.241.171','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',1,'2021-12-11T01:53:36'),(50,'2021-12-13 14:41:24','2021-12-13 15:18:14','mmaingc@gmail.com','38y7v1NfBezc8veNwhw80vvWaOQaZwdTq1jhdBIogJnYK2NT','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',1,'2021-12-13T06:18:14'),(51,'2021-12-13 18:24:52','2021-12-13 18:44:53','mmaingc@gmail.com','TCjxYHr2Nu4JDDvgXpnPrQzrLyBPxaH0xzOgUhzQlfyezb1U','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-13T09:44:53'),(52,'2021-12-14 09:19:12','2021-12-14 09:42:02','mmaingc@gmail.com','XG2KMaRwU0OxBg5qcySXinIcyaplhZJdvr0GKp0NzYo2D9ol','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-14T00:42:02'),(53,'2021-12-14 09:58:07','2021-12-14 11:50:11','mmaingc@gmail.com','uwxTOg3TxUi9dOmrXZdpphCF8XGzx72MOm5dQts14Ld8v5AS','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-14T02:50:11'),(54,'2021-12-14 12:12:49','2021-12-14 12:15:18','mmaingc@gmail.com','sLbzTMjYwLD0yl3JdRCqOvX9xUAFnYVYdje9PBHP0ac9ccF9','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-14T03:15:18'),(55,'2021-12-14 12:15:18','2021-12-14 13:15:40','mmaingc@gmail.com','GxYKzQeSwZD3iHjM2yOtRoWBMLlUS6UWZos8wdkb8sTUtvdu','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-14T04:15:40'),(56,'2021-12-14 15:16:17','2021-12-14 16:41:24','mmaingc@gmail.com','1vL7WjgfbL0NVZrHzjewiIybQX9KgCCfowSS2a1sSfoL6jH9','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-14T07:41:24'),(57,'2021-12-15 10:13:36','2021-12-15 10:20:10','mmaingc@gmail.com','7vvqSSGgHCeOspGqinCyPXqw36HmeYKoSSGOZeCDgdIc7rI7','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-15T01:20:10'),(58,'2021-12-15 10:20:10','2021-12-15 10:20:10','mmaingc@gmail.com','mNedtGHR6ciwllof06i1L1yCN49UzZiGNtXhCijt0rDf89c0','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',1,'2021-12-15T01:20:10'),(59,'2021-12-15 10:21:17','2021-12-15 10:39:00','mmaingc@gmail.com','GBYsciXV39neFNktViJdu2M0C9yTXiDIVcGsrQpLK7RbuPJE','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',0,'2021-12-15T01:39:00'),(60,'2021-12-15 10:39:43','2021-12-15 12:48:25','leejh16@gmail.com','wG67eptuAxZntl65DO3Dx0eL2mMT3fUUEtItWecfzEdAmF3A','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-15T03:48:25'),(61,'2021-12-15 12:43:42','2021-12-15 13:50:17','mmaingc@gmail.com','fGpt4uJoX3BIRQCFVjnnqYAuTK0IU1V7tIkSfbbv5KkNWSE3','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-15T04:50:17'),(62,'2021-12-15 13:59:11','2021-12-15 18:30:07','mmaingc@gmail.com','lQTcMuvYVEnwBPcyjt30POlQ5txkM1dmIkzb5LbyaB38TLmf','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-15T09:30:07'),(63,'2021-12-15 17:32:16','2021-12-15 17:32:21','mmaingc@gmail.com','IDdbOo7DOItWhVLpBaZH3Bm6qrVc92KUpY36ybk52BnJmOfy','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-15T08:32:21'),(64,'2021-12-15 18:34:59','2021-12-15 18:53:28','mmaingc@gmail.com','dew6FSgRsacjqciks6VnRTNxzfbNlwO61XhWKeNQkrMOokcp','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-15T09:53:28'),(65,'2021-12-15 18:52:58',NULL,'mmaingc@gmail.com','4gUCHL7jigDKkujL3ZuQ1tWYIH3mf9pk0vNTJgOPLtmjFpZg','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(66,'2021-12-15 18:52:59',NULL,'mmaingc@gmail.com','15sehcM7YpsKh6tIwVeuKvX0Td7w0y2DeanQEE7hwhlMyoCJ','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(67,'2021-12-15 18:53:02',NULL,'mmaingc@gmail.com','VMcAsNn8pT1QPjmIjIfuTeNxbDlIbbKWuJ9AasHPcu9leJQ2','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(68,'2021-12-15 18:53:28',NULL,'mmaingc@gmail.com','0v33SiFcK8S04lFyAKUszkVfQLU8Shfsv0LB3uY02qgwuSmr','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(69,'2021-12-15 18:53:43',NULL,'mmaingc@gmail.com','NzfWMYYRIiu5Ao6NbLsGoBj3sWwgODuTAMTCcPUFU1vhPdNm','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(70,'2021-12-15 18:53:50',NULL,'mmaingc@gmail.com','iycLCHC3bKy1SYsrzVftVgetKucbEh2S8MCwcAiUK8nKkbIV','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(71,'2021-12-15 18:53:57',NULL,'mmaingc@gmail.com','ZLjwoKzauzWjLQIcjRHQY4tprsHMbKtINyWqNEc1RtGMZPpL','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(72,'2021-12-15 18:53:57',NULL,'mmaingc@gmail.com','9caiTpeqhkuuWRajee3jRLe5W5gFCXQuG1uNlatOYZLUNVw2','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(73,'2021-12-15 18:53:57',NULL,'mmaingc@gmail.com','cFaeWsVtoz8Ri4bP2XSseVnqrmZWp8qhTykmAfZMeoSDnGYN','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(74,'2021-12-15 18:53:57',NULL,'mmaingc@gmail.com','jmSBXtcNXC4SZ9OSSulSPuqWkVtwqkund3OgqZ2WvIZRjHGY','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(75,'2021-12-15 19:08:07',NULL,'mmaingc@gmail.com','3ltOEbAqCPdG9wjM4bgrfLFO5CTrQIIHpiwTTZyElJwMyIRW','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,NULL),(76,'2021-12-15 19:08:21','2021-12-15 19:14:06','mmaingc@gmail.com','dE4UeubEGvJXP5Z5H68cXgYIMAnxLkW2oy6fAwpHDD8dznYu','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-15T10:14:06'),(77,'2021-12-16 09:03:37','2021-12-16 10:35:00','mmaingc@gmail.com','EjlgFdYue7HvylTkyhtxcdvumAKXBOtpVdG6AwXk8vOXV6vD','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-16T01:35:00'),(78,'2021-12-16 10:45:12','2021-12-16 12:22:53','mmaingc@gmail.com','KTeCAnEY0ib2JFjBtnOJniiie0JbFlv8QyYg4wxpnx7M4YMR','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-16T03:22:53'),(79,'2021-12-16 16:26:52','2021-12-16 16:27:09','mmaingc@gmail.com','ZdofAd77tzS09Swqbh54fbrpKf9R2GQwmj3SAgSvl6CuV0YX','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-16T07:27:09'),(80,'2021-12-16 18:30:45','2021-12-17 11:30:21','mmaingc@gmail.com','mcbyLKOphf07Q7IyCWngZLVzNoBI0b9vXwjJI4ZgRm1e05Yg','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-17T02:30:21'),(81,'2021-12-17 11:33:14','2021-12-17 11:37:06','mmaingc@gmail.com','54ukokE2XtzbVomwQMBMpZZKmSFMQQJH7llQ3BjQGfvNVOAc','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-17T02:37:06'),(82,'2021-12-17 11:56:16','2021-12-17 13:01:38','mmaingc@gmail.com','t1h2XQrzmnJhKMxut7N5pEL8tg7bL8keXeXjQEaiDOCTVqWe','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',0,'2021-12-17T04:01:38'),(83,'2021-12-17 13:01:59','2021-12-17 13:05:24','mmaingc@gmail.com','3FO05JmlSj5XY8t7A8GJD8XSRrcYR2CcwZKRLOb00MDxbYlM','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-17T04:05:24'),(84,'2021-12-17 14:01:59','2021-12-17 14:02:02','mmaingc@gmail.com','wEoyKeSwKrioLvjxvvC087605COsNEvX4888f1Oci3Y39pRJ','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-17T05:02:02'),(85,'2021-12-17 14:04:00','2021-12-17 14:04:02','mmaingc@gmail.com','3ghgjVOym0j1n86h34ksNxoqMOwGNE9j8d7kuRbVnYy93lAi','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-17T05:04:02'),(86,'2021-12-17 14:09:26','2021-12-17 14:09:29','mmaingc@gmail.com','iKIhJXMECulqXVEzT7Md6gWpn2h5HdyyanMDc36cOFdXzcGd','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-17T05:09:29'),(87,'2021-12-17 14:13:38','2021-12-17 14:13:41','mmaingc@gmail.com','fZusd0OjJgZN4MlKMA0tOW6PPJDcjiV04Cu59cXOT9DfOoGZ','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-17T05:13:41'),(88,'2021-12-17 16:15:32','2021-12-17 16:15:34','mmaingc@gmail.com','ps8YDOh1HPwrNjroaVqAX8Pa3Cr5Gc6vXrJyJnZTWh9rBRuo','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-17T07:15:34'),(89,'2021-12-17 16:20:55','2021-12-17 16:24:56','mmaingc@gmail.com','eoTgvtOMiDd6hKWVWdBkMgbT8G9hZvr6yH9pCoj0Uld91pu2','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-17T07:24:56'),(90,'2021-12-17 16:40:22','2021-12-17 16:40:24','mmaingc@gmail.com','ap1Nx2sPtYDm3sD6edTrQEbpC7Ys7DrspNJlNeJBCJZLXSvs','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-17T07:40:24'),(91,'2021-12-17 16:42:53','2021-12-17 16:43:07','mmaingc@gmail.com','41lcgo6wVnsvFuST5Eb9QFwULETNjKnnDH3mg4Yx6zxst6iF','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-17T07:43:07'),(92,'2021-12-17 16:44:20','2021-12-17 16:51:05','mmaingc@gmail.com','ZUC7ViVfhj7kRVICeFxmJLnEAd4igbbKP207Zm9XEwvLiJWn','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-17T07:51:05'),(93,'2021-12-17 18:44:57','2021-12-17 18:53:18','leejh16@gmail.com','rG6fczdsCdATzjgjUhot6eFOKJH0GcYKpYiDVcyRhghBVhPc','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-17T09:53:18'),(94,'2021-12-18 14:47:59','2021-12-18 14:56:02','mmaingc@gmail.com','5sDCxaJ40hymGEUwXWrRjRbQdmR4WNMUIIVBZzSAOXE5C1O6','::ffff:58.227.48.234','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-18T05:56:02'),(95,'2021-12-18 18:21:19','2021-12-18 18:21:43','mmaingc@gmail.com','NcELgL3IydWyRzi6FVZRvN91Lp8LygboORnIUi6oUjGxcS6H','::ffff:58.227.48.234','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-18T09:21:43'),(96,'2021-12-18 20:33:32','2021-12-18 20:35:11','mmaingc@gmail.com','FZa9UWZd2oAVxloyqwbegFc0Y384kniwhjWd7m7pmrOuUqe3','::ffff:58.227.48.234','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-18T11:35:11'),(97,'2021-12-19 00:19:03','2021-12-19 00:19:06','mmaingc@gmail.com','peqgfI0A9vWKe16E5li9WgyE0QqSKDQmCiIOCMf1q7Wzrldx','::ffff:58.227.48.234','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-18T15:19:06'),(98,'2021-12-19 01:01:59','2021-12-19 01:22:24','mmaingc@gmail.com','ofLRRouHRZx96ofCoyrwhToDqah3JqoA629Aaxy7TKwsW9dw','::ffff:58.227.48.234','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-18T16:22:24'),(99,'2021-12-20 10:56:25','2021-12-20 11:51:43','mmaingc@gmail.com','LMX0IXRwwsKzpzhLVowy5skWCk5vzmrtsbJhWEbKGDoLc5WG','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-20T02:51:43'),(100,'2021-12-22 15:55:05','2021-12-22 16:37:50','mmaingc@gmail.com','g2rLoJec2DcUsNHKuSynQHEb7Y0yEFgzAgXsvRoVGkzcX1jV','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',1,'2021-12-22T07:37:50'),(101,'2021-12-22 16:51:08','2021-12-22 19:00:08','mmaingc@gmail.com','X7YjLnT4eoYkLit6D2fIDyE6oAT6bOdYsLZvDIPPNyYhFdA4','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',1,'2021-12-22T10:00:08'),(102,'2021-12-24 13:33:00','2021-12-24 13:42:32','mmaingc@gmail.com','wT9WeX2vzOMUCUBKsZxoEIwGyfMQpTlUCQXFTWMZzrRZT3Ey','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36',0,'2021-12-24T04:42:32'),(103,'2021-12-24 13:43:57','2021-12-24 13:43:57','metaPlanet1214@gmail.com','Zv5kAMtRD0nm8djzmhh2Wx4dDArrIvGirM3QEDJCxadS6FLS','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36',1,'2021-12-24T04:43:57'),(104,'2021-12-24 15:09:04','2021-12-24 17:16:11','mmaingc@gmail.com','AVHdroocykim03R4aFbE1dlNVk6g3DOf5Gqw7kSEwhe8bBcf','::ffff:106.243.241.171','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36',1,'2021-12-24T08:16:11'),(105,'2021-12-24 18:27:30','2021-12-24 18:32:24','mmaingc@gmail.com','OLyZUpric9KkZklBLzKPvcovjnHi0YyH4pVbyxhkITgL3l1g','::ffff:106.243.241.171','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',1,'2021-12-24T09:32:24');
/*!40000 ALTER TABLE `sessionkeys` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'2021-12-09 01:46:33',NULL,'MAX_DELAY_CONSECUTIVE_EMAIL_SEND_IN_MILI','10000',NULL),(2,'2021-12-20 03:24:11',NULL,'ACTIVE_NETWORK','ETH-TESTNET',NULL);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmppw`
--

LOCK TABLES `tmppw` WRITE;
/*!40000 ALTER TABLE `tmppw` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmppw` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,'2021-12-12 07:42:14','2021-12-20 11:15:06','ETH',NULL,NULL,'0x0000000000000000000000000000000000000000','root000',1,'ETH-TESTNET',0),(2,'2021-12-12 07:44:04','2021-12-19 18:37:15','METAPLANET',NULL,NULL,'0x70e509a0d868f023a8a16787bd659a3bb1357ee1','root000',1,'ETH-TESTNET',1),(3,'2021-12-12 23:02:55','2021-12-17 19:10:26','TEST001',NULL,NULL,'0x12345','admin000',0,NULL,1),(4,'2021-12-13 14:20:09','2021-12-19 16:09:51','tokenName',NULL,NULL,'setAddress','admin000',0,NULL,1),(5,'2021-12-13 14:20:58','2021-12-19 16:09:55','test_token_name123',NULL,NULL,'test_token_address123','admin000',0,NULL,1),(6,'2021-12-20 17:31:53',NULL,'testToken1',NULL,NULL,'a','admin000',1,NULL,1),(7,'2021-12-20 17:32:01',NULL,'testToken2',NULL,NULL,'2','admin000',1,NULL,1),(8,'2021-12-20 17:32:05','2021-12-23 09:32:18','testToken3',NULL,NULL,'3','admin000',0,NULL,1),(9,'2021-12-20 17:32:10','2021-12-23 09:32:17','testToken4',NULL,NULL,'4','admin000',0,NULL,1),(10,'2021-12-20 17:32:15','2021-12-23 09:32:16','testToken5',NULL,NULL,'5','admin000',0,NULL,1),(11,'2021-12-20 17:33:31',NULL,'testtoken7',NULL,NULL,'7','admin000',1,NULL,1),(12,'2021-12-22 10:25:27',NULL,'zxc',NULL,NULL,'0xaaaa','admin000',1,NULL,1);
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionsinside`
--

LOCK TABLES `transactionsinside` WRITE;
/*!40000 ALTER TABLE `transactionsinside` DISABLE KEYS */;
INSERT INTO `transactionsinside` VALUES (1,'2021-12-14 18:00:58','2021-12-14 09:33:14','leejh16@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','dc601449-5cc0-11ec-95e3-02b184b75e84'),(2,'2021-12-14 18:10:24','2021-12-14 09:33:14','leejh16@gmail.com','-5','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','dc601673-5cc0-11ec-95e3-02b184b75e84'),(3,'2021-12-14 18:10:43','2021-12-14 09:33:14','leejh16@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','dc601713-5cc0-11ec-95e3-02b184b75e84'),(4,'2021-12-14 18:11:09','2021-12-14 09:33:14','leejh16@gmail.com','-10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','dc60178b-5cc0-11ec-95e3-02b184b75e84'),(5,'2021-12-14 18:14:15','2021-12-14 09:33:14','leejh16@gmail.com','8','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','dc6017fc-5cc0-11ec-95e3-02b184b75e84'),(6,'2021-12-14 18:14:38','2021-12-14 09:33:14','leejh16@gmail.com','-8','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','dc60186e-5cc0-11ec-95e3-02b184b75e84'),(7,'2021-12-14 18:17:04',NULL,'leejh16@gmail.com','0.1','ETH',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','e9b6a1da-e470-4bc8-bbfc-5cd9f41b1d2b'),(8,'2021-12-17 18:24:15',NULL,'leejh16@gmail.com','1','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','1ed9c936-6ae8-4b75-9a46-cc8f7342fc38'),(9,'2021-12-17 18:24:22',NULL,'leejh16@gmail.com','-3','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','ff133f86-36d0-42e7-b52c-a65fe5dbf413'),(10,'2021-12-17 18:25:58',NULL,'leejh16@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','8386fcdd-704a-4538-bf9e-5c64b1c53b68'),(11,'2021-12-17 18:26:08',NULL,'leejh16@gmail.com','-10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','4ca46a08-5fac-48b5-bc7b-f1613c641b9c'),(12,'2021-12-17 18:38:16',NULL,'leejh16@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','eb0ecb36-6c35-4c7e-8c7c-089d9b98cd5a'),(13,'2021-12-19 16:09:22',NULL,'leejh16@gmail.com','-10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','8809dee0-bea0-44dc-a9a8-a08b34f9ff21'),(14,'2021-12-19 18:40:37',NULL,'leejh16@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','57f944b0-5e7d-41c2-a18d-e4954f048160'),(15,'2021-12-19 18:41:10',NULL,'mmaingc@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','dfcbbf0d-6407-4de0-9cf9-f0546506ed8c'),(16,'2021-12-19 18:43:51',NULL,'leejh16@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','8b092ade-57d3-4ee1-91fa-d939a444c114'),(17,'2021-12-19 18:50:18',NULL,'leejh16@gmail.com','-10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','ecb40eda-7444-49d6-9580-909d463daf19'),(18,'2021-12-19 18:50:51',NULL,'leejh16@gmail.com','-3','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','4614af94-c258-41df-8ebc-47e839469708'),(19,'2021-12-19 19:28:20',NULL,'mmaingc@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','6a568cb3-e35d-4e72-9ff0-d70d89ad32b5'),(20,'2021-12-19 19:28:27',NULL,'mmaingc@gmail.com','-7','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','bbee8b96-408d-4922-8d43-506cf70a7aff'),(21,'2021-12-19 19:30:33',NULL,'leejh16@gmail.com','-4','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','eb5363dd-a4c2-45ee-8b97-07326a4c0863'),(22,'2021-12-19 19:30:51',NULL,'leejh16@gmail.com','-4','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'DECREMENT','db752ee4-c0ef-4d8c-b8e0-c83cd7b10e6a'),(23,'2021-12-20 11:51:03',NULL,'mmaingc@gmail.com','10','METAPLANET',NULL,NULL,NULL,'ETH-TESTNET',NULL,'INCREMENT','f2e657cb-bad2-4717-ac56-ae049980b84d');
/*!40000 ALTER TABLE `transactionsinside` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionsoutside`
--

LOCK TABLES `transactionsoutside` WRITE;
/*!40000 ALTER TABLE `transactionsoutside` DISABLE KEYS */;
INSERT INTO `transactionsoutside` VALUES (1,'2021-12-22 16:04:12',NULL,'mmaingc@gmail.com',NULL,NULL,'0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed','100000000000000000','ETHER','ETH-TESTNET',NULL,NULL,'SEND-ETH'),(2,'2021-12-22 16:17:42',NULL,'mmaingc@gmail.com',NULL,NULL,'0x53f4a0302d070e86a2ef4913f98182efb469dc9ee09d255676bca97fc61865ad','100000000000000000','ETHER','ETH-TESTNET',NULL,NULL,'SEND-ETH'),(3,'2021-12-22 16:21:13',NULL,'mmaingc@gmail.com',NULL,NULL,'0x672a3d5b41cb3a4bf39cc6cb96522655807c1a02fd46f7a6a17dc849c167c71c','200000000000000','ETHER','ETH-TESTNET',NULL,NULL,'SEND-ETH'),(4,'2021-12-22 16:37:03',NULL,'mmaingc@gmail.com','0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed','0x147aB6Aa345d0a5939bcfACA85394673f285Ed84','0x8231ca70f4a7581b0ca63913bb58872093eeda5723590fb7f338aede1ed2a1b5','45000000000','ETHER','ETH-TESTNET',NULL,NULL,'SEND-ETH'),(5,'2021-12-22 16:51:30',NULL,'mmaingc@gmail.com','0xaeC2f4Dd8b08EeF0C71B02F97978106D875464Ed','0x147aB6Aa345d0a5939bcfACA85394673f285Ed84','0xb12ddd83a75ffecf0ccffb87b67314c3998fd183efd03638df3010571c4264e5','110000000000','ETHER','ETH-TESTNET',NULL,NULL,'SEND-ETH');
/*!40000 ALTER TABLE `transactionsoutside` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprefs`
--

LOCK TABLES `userprefs` WRITE;
/*!40000 ALTER TABLE `userprefs` DISABLE KEYS */;
INSERT INTO `userprefs` VALUES (1,'2021-12-15 00:48:12','2021-12-15 11:39:19','leejh16@gmail.com',1,'NOTIFY_TRANSACTIONS_OUTSIDE','0'),(2,'2021-12-15 11:35:02','2021-12-15 11:39:19','leejh16@gmail.com',1,'NOTIFY_NOTIFIES','0'),(3,'2021-12-15 11:35:02','2021-12-15 11:39:19','leejh16@gmail.com',1,'NOTIFY_TRANSACTIONS_INSIDE','0'),(4,'2021-12-15 11:35:02','2021-12-15 11:39:19','leejh16@gmail.com',1,'NOTIFY_PROMOEVENTS','0'),(5,'2021-12-17 08:55:23','2021-12-17 12:56:16','mmaingc@gmail.com',1,'NOTIFY_NOTIFIES','0'),(6,'2021-12-17 08:55:23','2021-12-17 12:56:17','mmaingc@gmail.com',1,'NOTIFY_TRANSACTIONS_INSIDE','1'),(7,'2021-12-17 08:55:23','2021-12-17 12:56:20','mmaingc@gmail.com',1,'NOTIFY_TRANSACTIONS_OUTSIDE','1'),(8,'2021-12-17 08:55:23','2021-12-17 12:56:20','mmaingc@gmail.com',1,'NOTIFY_PROMOEVENTS','0');
/*!40000 ALTER TABLE `userprefs` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'2021-12-09 13:59:45','2021-12-20 17:40:17',NULL,'::ffff:106.243.241.171','abcdefghijklmn',NULL,NULL,'leejh16@gmail.com',1,NULL,NULL,0,NULL,NULL,1,NULL,0,'2021-12-17T09:53:18'),(18,'2021-12-10 11:57:38','2021-12-19 18:40:50',NULL,'::ffff:106.243.241.171','abcdefg',NULL,NULL,'abcdefg@gmail.com',1,NULL,NULL,0,NULL,NULL,1,NULL,1,NULL),(19,'2021-12-10 11:59:06','2021-12-19 18:40:48',NULL,'::ffff:106.243.241.171','abcdefghij',NULL,NULL,'abcdefghij@gmail.com',1,NULL,NULL,0,NULL,NULL,0,NULL,1,NULL),(31,'2021-12-11 15:23:48',NULL,NULL,NULL,'BLoETm1tEJ',NULL,NULL,'root000',1,'root000',NULL,0,NULL,NULL,0,NULL,1,NULL),(33,'2021-12-14 12:15:18','2021-12-24 18:32:24',NULL,'::ffff:106.243.241.171','pw123456',NULL,NULL,'mmaingc@gmail.com',1,'mmaingc@gmail.com','nick2',0,NULL,NULL,1,NULL,1,'2021-12-24T09:32:24'),(34,'2021-12-20 07:37:02',NULL,NULL,NULL,'test1pw',NULL,NULL,'test1',1,'test1@gmail.com','nick1',0,NULL,NULL,1,NULL,1,NULL),(35,'2021-12-20 07:37:19',NULL,NULL,NULL,'test2pw',NULL,NULL,'test2',1,'test2@gmail.com','nick2',0,NULL,NULL,1,NULL,1,NULL),(36,'2021-12-20 07:37:29',NULL,NULL,NULL,'test3pw',NULL,NULL,'test3',1,'test3@gmail.com','nick3',0,NULL,NULL,1,NULL,1,NULL),(37,'2021-12-20 07:37:39',NULL,NULL,NULL,'test4pw',NULL,NULL,'test4',1,'test4@gmail.com','nick4',0,NULL,NULL,1,NULL,1,NULL),(38,'2021-12-20 07:37:49',NULL,NULL,NULL,'test5pw',NULL,NULL,'test5',1,'test5@gmail.com','nick5',0,NULL,NULL,1,NULL,1,NULL),(39,'2021-12-20 07:37:59',NULL,NULL,NULL,'test6pw',NULL,NULL,'test6',1,'test6@gmail.com','nick6',0,NULL,NULL,1,NULL,1,NULL),(40,'2021-12-20 07:38:08',NULL,NULL,NULL,'test7pw',NULL,NULL,'test7',1,'test7@gmail.com','nick7',0,NULL,NULL,1,NULL,1,NULL),(41,'2021-12-20 07:38:17',NULL,NULL,NULL,'test8pw',NULL,NULL,'test8',1,'test8@gmail.com','nick8',0,NULL,NULL,1,NULL,1,NULL),(42,'2021-12-20 07:38:27',NULL,NULL,NULL,'test9pw',NULL,NULL,'test9',1,'test9@gmail.com','nick9',0,NULL,NULL,1,NULL,1,NULL),(43,'2021-12-20 07:38:40',NULL,NULL,NULL,'test10pw',NULL,NULL,'test10',1,'test10@gmail.com','nick10',0,NULL,NULL,1,NULL,1,NULL),(44,'2021-12-20 07:39:49',NULL,NULL,NULL,'test11pw',NULL,NULL,'test11',1,'test11@gmail.com','nick11',0,NULL,NULL,1,NULL,1,NULL),(50,'2021-12-20 07:41:17',NULL,NULL,NULL,'test12pw',NULL,NULL,'test12',1,'test12@gmail.com','nick12',0,NULL,NULL,1,NULL,1,NULL),(51,'2021-12-20 07:41:27',NULL,NULL,NULL,'test13pw',NULL,NULL,'test13',1,'test13@gmail.com','nick13',0,NULL,NULL,1,NULL,1,NULL),(52,'2021-12-20 07:41:36',NULL,NULL,NULL,'test14pw',NULL,NULL,'test14',1,'test14@gmail.com','nick14',0,NULL,NULL,1,NULL,1,NULL),(53,'2021-12-20 07:41:44',NULL,NULL,NULL,'test15pw',NULL,NULL,'test15',1,'test15@gmail.com','nick15',0,NULL,NULL,1,NULL,1,NULL),(54,'2021-12-20 07:42:02',NULL,NULL,NULL,'test16pw',NULL,NULL,'test16',1,'test16@gmail.com','nick16',0,NULL,NULL,1,NULL,1,NULL),(55,'2021-12-24 13:43:57','2021-12-24 13:43:57',NULL,'::ffff:106.243.241.171','dbs1fl2dhk1tk4ghl',NULL,NULL,'metaPlanet1214@gmail.com',1,'metaPlanet1214@gmail.com','meta8',0,NULL,NULL,0,NULL,1,'2021-12-24T04:43:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-24 10:35:50
