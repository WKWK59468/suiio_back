-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3308
-- 產生時間： 2021-07-31 18:05:02
-- 伺服器版本： 5.7.31
-- PHP 版本： 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `suiio`
--
CREATE DATABASE IF NOT EXISTS `suiio` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `suiio`;

-- --------------------------------------------------------

--
-- 資料表結構 `absentees`
--

DROP TABLE IF EXISTS `absentees`;
CREATE TABLE IF NOT EXISTS `absentees` (
  `conference` int(11) NOT NULL,
  `absentees` varchar(10) NOT NULL,
  PRIMARY KEY (`conference`,`absentees`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='缺席者';

--
-- 傾印資料表的資料 `absentees`
--

INSERT INTO `absentees` (`conference`, `absentees`) VALUES
(8, '副會長'),
(8, '會長'),
(8, '活動長'),
(8, '財務長');

-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(20) NOT NULL,
  `cost` int(11) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `receipt` varchar(50) NOT NULL,
  `review` char(1) NOT NULL,
  `uploadBy` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='收支紀錄';

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`ID`, `date`, `name`, `cost`, `content`, `receipt`, `review`, `uploadBy`) VALUES
(1, '2021-07-07 17:58:06', '大迎新場地租借', 150000, '僅包含場地租借費用', '', '0', '0'),
(2, '2021-07-09 03:32:27', '小迎新場地費', 5000, '僅包含場地費用', '', '0', '0');

-- --------------------------------------------------------

--
-- 資料表結構 `attendees`
--

DROP TABLE IF EXISTS `attendees`;
CREATE TABLE IF NOT EXISTS `attendees` (
  `conference` int(11) NOT NULL,
  `attendees` varchar(10) NOT NULL,
  PRIMARY KEY (`conference`,`attendees`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='出席者';

--
-- 傾印資料表的資料 `attendees`
--

INSERT INTO `attendees` (`conference`, `attendees`) VALUES
(8, '器材長'),
(8, '體育長');

-- --------------------------------------------------------

--
-- 資料表結構 `budget`
--

DROP TABLE IF EXISTS `budget`;
CREATE TABLE IF NOT EXISTS `budget` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `cost` int(11) NOT NULL,
  `date` date NOT NULL,
  `review` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`,`cID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='預算';

-- --------------------------------------------------------

--
-- 資料表結構 `budgetcategory`
--

DROP TABLE IF EXISTS `budgetcategory`;
CREATE TABLE IF NOT EXISTS `budgetcategory` (
  `bID` int(11) NOT NULL,
  `category` varchar(10) NOT NULL,
  PRIMARY KEY (`bID`,`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='預算分類';

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='活動類別';

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`ID`, `name`, `status`) VALUES
(1, '大迎新', 0),
(2, '小迎新', 0),
(3, '聖誕晚會', 0),
(4, '籃球比賽', 0),
(5, '躲避球比賽', 0),
(13, '民歌', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `conference`
--

DROP TABLE IF EXISTS `conference`;
CREATE TABLE IF NOT EXISTS `conference` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `attached_file` varchar(50) DEFAULT NULL,
  `content` varchar(500) NOT NULL,
  `host` varchar(10) NOT NULL,
  `status` char(1) NOT NULL,
  PRIMARY KEY (`ID`,`category`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='會議紀錄';

--
-- 傾印資料表的資料 `conference`
--

INSERT INTO `conference` (`ID`, `category`, `name`, `date`, `attached_file`, `content`, `host`, `status`) VALUES
(1, 1, '大迎新會議', '2021-07-14', NULL, '內容', '會長', '0'),
(2, 2, '小迎新會議', '2021-07-05', NULL, '暫無', '會長', '0'),
(3, 3, '聖誕晚會會議', '2021-12-08', NULL, '編列預算、人員配置', '會長', '0'),
(4, 4, '籃球比賽會議', '2021-07-23', NULL, '無', '體育長', '0'),
(5, 4, '籃球比賽第二次會議', '2021-07-15', NULL, '調整獎金金額', '會長', '0'),
(6, 3, '聖誕晚會第二次會議', '2021-07-25', NULL, '表演獎金增加', '活動長', '0'),
(7, 2, '小迎新第二次會議', '2021-07-28', NULL, '表演獎金增加', '活動長', '0'),
(8, 1, '大迎新第二次會議', '2021-07-28', 'new.doc', '場地費用增加', '活動長', '0');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `sID` char(10) NOT NULL,
  `password` char(60) NOT NULL,
  `name` varchar(10) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `sex` char(1) NOT NULL,
  `birth` date NOT NULL,
  `phone` char(10) NOT NULL,
  PRIMARY KEY (`sID`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成員';

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`sID`, `password`, `name`, `nickname`, `sex`, `birth`, `phone`) VALUES
('1110634000', '$2b$10$2ZzyVyXQrPeFy7U/Jq8ZkeyUkynzjmfMlrVvcxoDL.pnUDGs/g0xe', '姓名', '暱稱', '男', '2021-07-14', '0912345678'),
('1110634001', '$2b$10$mlCH6.r9WdQLPMsErOYaTuyYfeQocTGWgV/aElT4MxykNMIWGLYnK', '何宛珊', '小何', '女', '2002-05-01', '0966610085'),
('1110634002', '$2b$10$eZQ9Mo1Goo.x8f/TNOhGXuDyRtIsk9KWnvRfoG8SPb2jCkiCRKmCC', '李品萱', '小李', '女', '2002-06-23', '0937662585'),
('1110634003', '$2b$10$Pcq2oBufpcQetFOOjollferCTUFwX1sDzEcYFN4Ij2s8j1mROo15e', '施羽珊', '小施', '女', '2002-02-02', '0933449557'),
('1110634004', '$2b$10$ZsI6RiiOJD.tJAOfeufuGu.qryKCWcnXm6YgOqd/vPuIYNiFIKT22', '張芸菱', '小張', '女', '2002-02-08', '0987416535'),
('1110634006', '$2b$10$3mgQHwb3hw6N5iSggoKn4umiifi/tkRj.bQDsuDwUkPaZ6CkgZp/C', '黃子瑜', '小黃', '女', '2001-10-07', '0901371613'),
('1110634015', '$2b$10$X4UkvXoMVY2VWFGjrcZvWuCLBHOUnV0Yqya0PjSY.13w9/mKeo6CW', '林均蓉', '小林', '女', '2001-09-10', '0981616858'),
('1110634025', '$2b$10$3SpXuHeaRuS3zGArGYpHEuwG/qHOZbOcxAUIcDnQh/NcIq3zFF8.6', '廖建榕', '小廖', '男', '2001-09-13', '0928047882'),
('1110634029', '$2b$10$ohzC5BtDJKoe.FMMiHKA9Ol5TxSuCvMn8PZ44eXs/dPZHqeCApXAe', '蔣明諭', '小蔣', '男', '2002-02-01', '0985100485'),
('1110634039', '$2b$10$n1OQpYXkpqZM6PNedfr9gOJLBdOfJMjdznVjPb5uGfE.e/F582lki', '陳言睿', '小陳', '男', '2001-11-21', '0968775633'),
('1110634041', '$2b$10$FmhLWguxE.5ItiXNdILVLOsZrkdgywbHJtn/bTAZw2kyg/f8sN/Uu', '詹翔壹', '小詹', '男', '2002-02-28', '0975349939');

-- --------------------------------------------------------

--
-- 資料表結構 `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `uID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='留言';

-- --------------------------------------------------------

--
-- 資料表結構 `officer`
--

DROP TABLE IF EXISTS `officer`;
CREATE TABLE IF NOT EXISTS `officer` (
  `permission` varchar(10) NOT NULL DEFAULT '一般幹部',
  `position` varchar(10) NOT NULL,
  `sID` char(10) NOT NULL,
  PRIMARY KEY (`position`,`sID`),
  UNIQUE KEY `position` (`position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='幹部';

--
-- 傾印資料表的資料 `officer`
--

INSERT INTO `officer` (`permission`, `position`, `sID`) VALUES
('財務負責人', '公關長', '1110634006'),
('組織負責人', '副會長', '1110634029'),
('一般幹部', '器材長', '1110634038'),
('組織負責人', '會長', '1110634039'),
('一般幹部', '活動長', '1110634006'),
('會議負責人', '秘書長', '1110634000'),
('財務負責人', '財務長', '1110634025'),
('一般幹部', '體育長', '1110634041');

-- --------------------------------------------------------

--
-- 資料表結構 `statement`
--

DROP TABLE IF EXISTS `statement`;
CREATE TABLE IF NOT EXISTS `statement` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  `review` varchar(10) NOT NULL,
  `uploadBy` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`,`category`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='財務報表';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
