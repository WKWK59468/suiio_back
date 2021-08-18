-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3308
-- 產生時間： 2021-08-18 04:38:52
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
  PRIMARY KEY (`conference`,`absentees`),
  KEY `officer_position_absentees` (`absentees`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='缺席者';

--
-- 傾印資料表的資料 `absentees`
--

INSERT INTO `absentees` (`conference`, `absentees`) VALUES
(1, '副會長'),
(2, '副會長'),
(3, '副會長'),
(4, '副會長'),
(5, '副會長'),
(6, '副會長'),
(7, '副會長'),
(8, '副會長'),
(9, '副會長'),
(11, '副會長'),
(1, '會長'),
(2, '會長'),
(3, '會長'),
(4, '會長'),
(5, '會長'),
(6, '會長'),
(7, '會長'),
(8, '會長'),
(9, '會長'),
(11, '會長'),
(1, '活動長'),
(2, '活動長'),
(3, '活動長'),
(4, '活動長'),
(5, '活動長'),
(6, '活動長'),
(7, '活動長'),
(8, '活動長'),
(9, '活動長'),
(11, '活動長'),
(8, '財務長'),
(9, '財務長'),
(11, '財務長'),
(1, '資訊長'),
(2, '資訊長'),
(3, '資訊長'),
(4, '資訊長'),
(5, '資訊長'),
(6, '資訊長'),
(7, '資訊長');

-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `cost` int(11) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `receipt` varchar(50) DEFAULT NULL,
  `status` char(1) NOT NULL,
  `uploadBy` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`,`category`) USING BTREE,
  KEY `category_ID_account` (`category`),
  KEY `officer_position_account` (`uploadBy`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8 COMMENT='收支紀錄';

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`ID`, `date`, `category`, `name`, `cost`, `content`, `receipt`, `status`, `uploadBy`) VALUES
(7, '2019-10-01 16:42:15', 2, '膠帶', -213, '', '膠帶收據.jpg', '0', '活動長'),
(8, '2019-10-03 15:47:29', 2, '食材用品及生活組用品', -377, '', '食材用品及生活組用品費用收據.jpg', '0', '生活長'),
(9, '2019-10-03 15:48:23', 2, '平安符及金紙', -550, '', '平安符及金紙收據.jpg', '0', '公關長'),
(10, '2019-10-03 15:54:00', 9, '退費', -300, '轉科退費', '退費收據.jpg', '0', '財務長'),
(11, '2019-10-04 11:50:42', 9, '醫療用品', -540, '藥用酒精', '酒精收據.jpg', '0', '會長'),
(12, '2019-10-04 11:50:28', 9, '文具用品', -84, '收據本及紅包袋', '文具收據.jpg', '0', '財務長'),
(13, '2019-10-07 14:57:02', 2, '場勘', -2635, '車費', '車費收據.jpg', '0', '活動長'),
(14, '2019-10-07 14:57:35', 2, '影印', -97, '影印費', '影印費收據.jpg', '0', '活動長'),
(15, '2019-10-07 14:58:26', 9, '科費補收', 5200, '大迎新(4人)', '科費收據.jpg', '0', '財務長'),
(16, '2019-10-08 11:52:02', 9, '科費補收', 6500, '大迎新(5人)', '科費收據.jpg', '0', '財務長'),
(17, '2019-10-09 09:58:46', 9, '科費補收', 5200, '大迎新(4人)', '科費收據.jpg', '0', '財務長'),
(18, '2019-10-14 14:32:47', 5, '男籃球隊', -7200, '球衣補助', '輔助收據.jpg', '0', '體育長'),
(19, '2019-10-14 14:33:21', 5, '男籃球隊', -2400, '比賽報名費', '報名收據.jpg', '0', '體育長'),
(20, '2019-10-14 14:34:53', 2, '場勘', -610, '車費', '車費收據.jpg', '0', '活動長'),
(21, '2019-10-14 14:35:37', 9, '科服費用', -22440, '', '科服費用收據.jpg', '0', '美宣長'),
(22, '2019-10-14 14:37:31', 2, '美宣用品', -336, '文具', '文具用品收據.jpg', '0', '美宣長'),
(23, '2019-10-14 14:38:57', 9, '科費補收', 5200, '大迎新(4人)', '科費收據.jpg', '0', '財務長'),
(24, '2019-10-14 14:40:45', 9, '科服收入', 300, '1人', '科服收據.jpg', '0', '財務長'),
(25, '2019-10-15 16:30:05', 9, '科服收入', 7800, '26人', '科服收據.jpg', '0', '財務長'),
(26, '2019-10-15 16:32:50', 2, '食材用品及生活組用品', -8107, '', '食材用品及生活組用品收據.jpg', '0', '生活長'),
(27, '2019-10-16 16:20:12', 9, '科費補收', 1300, '大迎新(1人)', '科費收據.jpg', '0', '財務長'),
(28, '2019-10-16 16:22:44', 9, '科服收入', 900, '3人', '科服收據.jpg', '0', '財務長'),
(29, '2019-10-16 16:24:15', 2, '小冊子', -2009, '', '文具收據.jpg', '0', '美宣長'),
(30, '2019-10-16 16:26:22', 2, '美宣用品', -272, '', '文具收據.jpg', '0', '美宣長'),
(31, '2019-10-16 16:28:52', 2, '影印費', -23, '', '影印費收據.jpg', '0', '活動長'),
(32, '2019-10-16 16:31:17', 9, '膠帶', -222, '', '膠帶收據.jpg', '0', '活動長'),
(33, '2019-10-16 16:33:51', 2, '活動用品', -402, '', '活動用品收據.jpg', '0', '活動長'),
(34, '2019-10-16 16:35:00', 2, '食材用品及生活組用品', -1512, '', '食材用品及生活組用品收據.jpg', '0', '生活長'),
(35, '2019-10-16 16:36:02', 2, '水', -245, '', '百貨收據.jpg', '0', '生活長'),
(36, '2019-10-16 16:37:26', 2, '晚會用品', -228, '', '晚會用品收據.jpg', '0', '體育長'),
(37, '2019-10-17 12:30:45', 2, '美宣用品', -209, '', '美宣用品收據.jpg', '0', '美宣長'),
(38, '2019-10-17 12:32:23', 2, '水', -5400, '', '水收據.jpg', '0', '生活長'),
(39, '2019-10-17 12:36:02', 2, '食材用品', -3097, '', '食材用品收據.jpg', '0', '生活長'),
(40, '2019-10-17 12:37:40', 9, '延長線', -1340, '', '五金行收據.jpg', '0', '器材長'),
(41, '2019-10-17 12:40:56', 2, '祭拜用品', -520, '香、打火機、紙錢...', '祭拜用品收據.jpg', '0', '公關長'),
(42, '2019-10-17 12:41:39', 9, '金爐', -300, '', '金爐收據.jpg', '0', '公關長'),
(43, '2019-10-17 12:43:20', 2, '保險費', -6222, '', '保險收據.jpg', '0', '活動長'),
(44, '2019-10-18 20:19:49', 9, '活動收入', 1300, '', '活動收據.jpg', '0', '財務長'),
(45, '2019-10-18 20:21:41', 9, '科服收入', 2100, '', '科服收據.jpg', '0', '財務長'),
(46, '2019-10-18 20:23:22', 2, '水', -436, '', '水收據.jpg', '0', '生活長'),
(47, '2019-10-18 20:26:44', 2, '瓦斯罐', -444, '', '瓦斯罐收據.jpg', '0', '生活長'),
(48, '2019-10-18 20:29:32', 2, '器材用品', -534, '', '器材用品收據.jpg', '0', '器材長'),
(49, '2019-10-18 20:30:52', 2, '烤肉用品', -13000, '', '烤肉用品收據.jpg', '0', '生活長'),
(50, '2019-10-18 20:32:34', 2, '遊覽車尾款', -36400, '', '遊覽車尾款收據.jpg', '0', '公關長'),
(51, '2019-10-18 20:35:48', 2, '器材用品', -19750, '', '器材用品收據.jpg', '0', '器材長'),
(52, '2019-10-20 23:10:15', 2, '營火木材', -2840, '', '木材收據.jpg', '0', '體育長'),
(53, '2019-10-20 23:13:43', 2, '音響燈光尾款', -10500, '', '音響燈光尾款收據.jpg', '0', '器材長'),
(54, '2019-10-20 23:16:34', 2, '無線電租金', -2400, '', '無線電租金收據.jpg', '0', '器材長'),
(55, '2019-10-20 23:20:14', 2, '食材用品及生活組用品', -3202, '', '食材用品及生活組用品收據.jpg', '0', '生活長'),
(56, '2019-10-20 23:25:25', 2, '先遣車費', -735, '', '車費收據.jpg', '0', '體育長'),
(57, '2019-10-20 23:27:16', 2, '紅包費', -1200, '司機紅包', '紅包收據.jpg', '0', '財務長'),
(58, '2019-10-20 23:30:45', 2, '紅包費', -8200, '學長姐紅包', '紅包收據.jpg', '0', '財務長'),
(59, '2019-10-20 23:35:04', 2, '食材用品及生活組用品', -7220, '', '食材用品及生活組用品收據.jpg', '0', '生活長'),
(60, '2019-10-20 23:36:29', 2, '活動用品', -99, '', '活動用品收據.jpg', '0', '活動長'),
(61, '2019-10-20 23:39:04', 2, '影印費', -108, '', '影印費收據.jpg', '0', '活動長'),
(62, '2019-10-25 20:56:41', 2, '還願供品', -606, '', '影印費收據.jpg', '0', '財務長'),
(63, '2019-10-25 20:59:39', 9, 'ALL PASS 糖', -433, '糖果、卡片、包裝紙', '糖果收據.jpg', '0', '財務長'),
(64, '2019-11-06 16:58:45', 9, '科費收入', 2000, '分期(1/2)(1人)', '科費收據.jpg', '0', '財務長'),
(65, '2019-11-14 14:24:11', 9, '感謝狀', -128, '', '影印收據.jpg', '0', '公關長'),
(66, '2019-11-20 15:22:36', 5, '報名費', -5500, '中資杯', '中資杯報名費收據(女籃).jpg', '0', '體育長'),
(67, '2019-11-20 15:24:58', 5, '報名費', -3000, '中資杯', '中資杯報名費收據(男籃).jpg', '0', '體育長'),
(68, '2019-11-22 15:05:14', 6, '比賽獎金', -1800, '', '躲避球比賽獎金收據.jpg', '0', '體育長'),
(69, '2019-11-27 19:25:54', 9, '科費收入', 4200, '分期(1/2)(3人)', '科費收據.jpg', '0', '財務長'),
(70, '2019-11-29 18:09:40', 9, '紅緞帶', -128, '', '緞帶收據.jpg', '0', '體育長'),
(71, '2019-11-29 18:11:33', 9, 'OK禮卷', 20000, '精神總金標獎勵', '獎金收入收據.jpg', '0', '財務長'),
(72, '2019-12-01 19:06:40', 9, '美宣用品', -265, '海報、傳單', '美宣用品收據.jpg', '0', '美宣長'),
(73, '2019-12-01 19:10:41', 9, '園遊會用品', -4197, '食材、器具', '園遊會用品收據.jpg', '0', '生活長'),
(74, '2019-12-01 19:15:29', 9, '園遊會收入', 9985, '', '園遊會收入收據.jpg', '0', '財務長'),
(75, '2019-12-03 15:08:21', 9, '科費收入', 2000, '分期(2/2)(2人)', '科費收據.jpg', '0', '財務長'),
(76, '2019-12-05 13:09:28', 4, '聖誕晚會', -2500, '燈光、音響訂金', '訂金收據.jpg', '0', '器材長'),
(77, '2019-12-05 13:12:03', 9, '贊助收入', 400, '', '贊助收據.jpg', '0', '公關長'),
(78, '2019-12-09 12:10:45', 9, '科費收入', 1000, '分期(2/2)(1人)', '科費收據.jpg', '0', '財務長'),
(79, '2019-12-09 12:12:04', 9, '科費收入', 1500, '分期(1/2)(1人)', '科費收據.jpg', '0', '財務長'),
(80, '2019-12-09 12:15:27', 9, '科費收入', 2400, '補繳', '科費收據.jpg', '0', '財務長'),
(81, '2019-12-11 23:11:36', 9, '科費收入', 2400, '補繳', '科費收據.jpg', '0', '財務長'),
(82, '2019-12-11 23:15:38', 10, '桌球比賽獎金', -1700, 'OK禮券', '桌球比賽獎金收據.jpg', '0', '體育長'),
(83, '2019-12-19 20:14:07', 9, '聖誕小卡', 850, '', '聖誕小卡收據.jpg', '0', '財務長'),
(84, '2019-12-19 20:15:30', 9, '活動收入', 1875, '', '活動收入收據.jpg', '0', '財務長'),
(85, '2019-12-20 16:15:39', 4, '生活組食材與用具', -5564, '', '生活組食材與用具收據.jpg', '0', '生活長'),
(86, '2019-12-20 16:18:31', 4, '美宣用品', -956, '包裝紙、海報、工作牌', '美宣用品收據.jpg', '0', '美宣長'),
(87, '2019-12-20 16:20:03', 4, '器材用品', -199, '彩燈、垃圾袋', '器材用品收據.jpg', '0', '器材長'),
(88, '2019-12-20 16:23:42', 4, '抽獎獎品', -1147, '', '獎品收據.jpg', '0', '活動長'),
(89, '2019-12-20 16:26:24', 4, '音響燈光尾款', -2500, '', '音響燈光尾款收據.jpg', '0', '器材長'),
(90, '2019-12-20 16:33:24', 9, '美宣用品', -122, '剪刀、膠帶、標籤', '美宣用品收據.jpg', '0', '美宣長'),
(91, '2019-12-20 16:36:54', 5, '體育用品', -1394, '籃球、球袋', '體育用品收據.jpg', '0', '體育長'),
(92, '2019-12-27 12:38:01', 5, '球衣補助', -1500, '女籃', '球衣補助收據.jpg', '0', '體育長'),
(93, '2019-12-20 16:39:20', 11, '冬至湯圓', -750, '湯圓、薑', '湯圓收據.jpg', '0', '生活長');

-- --------------------------------------------------------

--
-- 資料表結構 `attendees`
--

DROP TABLE IF EXISTS `attendees`;
CREATE TABLE IF NOT EXISTS `attendees` (
  `conference` int(11) NOT NULL,
  `attendees` varchar(10) NOT NULL,
  PRIMARY KEY (`conference`,`attendees`),
  KEY `officer_position_attendees` (`attendees`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='出席者';

--
-- 傾印資料表的資料 `attendees`
--

INSERT INTO `attendees` (`conference`, `attendees`) VALUES
(1, '公關長'),
(2, '公關長'),
(3, '公關長'),
(4, '公關長'),
(5, '公關長'),
(6, '公關長'),
(7, '公關長'),
(1, '器材長'),
(2, '器材長'),
(3, '器材長'),
(4, '器材長'),
(5, '器材長'),
(6, '器材長'),
(7, '器材長'),
(8, '器材長'),
(9, '器材長'),
(11, '器材長'),
(1, '秘書長'),
(2, '秘書長'),
(3, '秘書長'),
(4, '秘書長'),
(5, '秘書長'),
(6, '秘書長'),
(7, '秘書長'),
(1, '體育長'),
(2, '體育長'),
(3, '體育長'),
(4, '體育長'),
(5, '體育長'),
(6, '體育長'),
(7, '體育長'),
(8, '體育長'),
(9, '體育長'),
(11, '體育長');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='活動類別';

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`ID`, `name`, `status`) VALUES
(1, '例行會議', 0),
(2, '大迎新', 1),
(3, '小迎新', 1),
(4, '聖誕晚會', 0),
(5, '籃球比賽', 0),
(6, '躲避球比賽', 1),
(7, '民歌', 0),
(8, '卡K', 0),
(9, '餘額', 0),
(10, '桌球比賽', 0),
(11, '冬至', 0);

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
  `recorder` varchar(10) NOT NULL,
  `status` char(1) NOT NULL,
  PRIMARY KEY (`ID`,`category`) USING BTREE,
  KEY `category_ID_conference` (`category`),
  KEY `recorder` (`recorder`),
  KEY `host` (`host`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='會議紀錄';

--
-- 傾印資料表的資料 `conference`
--

INSERT INTO `conference` (`ID`, `category`, `name`, `date`, `attached_file`, `content`, `host`, `recorder`, `status`) VALUES
(1, 2, '大迎新會議', '2020-08-14', NULL, '內容', '會長', '副會長', '0'),
(2, 3, '小迎新會議', '2020-08-15', NULL, '暫無', '會長', '副會長', '0'),
(3, 4, '聖誕晚會會議', '2020-12-20', NULL, '編列預算、人員配置', '會長', '副會長', '0'),
(4, 5, '籃球比賽會議', '2020-06-23', NULL, '無', '體育長', '副會長', '0'),
(5, 5, '籃球比賽第二次會議', '2020-06-30', NULL, '調整獎金金額', '會長', '副會長', '0'),
(6, 4, '聖誕晚會第二次會議', '2020-12-24', NULL, '表演獎金增加', '活動長', '副會長', '0'),
(7, 3, '小迎新第二次會議', '2020-08-22', NULL, '表演獎金增加', '活動長', '副會長', '0'),
(8, 2, '大迎新第二次會議', '2020-08-21', 'new.doc', '場地費用增加', '活動長', '副會長', '0'),
(9, 6, '躲避球比賽會議', '2020-10-15', 'new.doc', '獎金總金額10000', '會長', '副會長', '0'),
(11, 8, '卡K會議', '2021-03-18', '卡K.doc', '獎金總金額10000', '活動長', '副會長', '0');

-- --------------------------------------------------------

--
-- 資料表結構 `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `statement` int(11) NOT NULL,
  `account` int(11) NOT NULL,
  PRIMARY KEY (`statement`,`account`),
  KEY `account_ID` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `content`
--

INSERT INTO `content` (`statement`, `account`) VALUES
(12, 7),
(12, 8),
(12, 9),
(12, 13),
(12, 14),
(13, 18),
(13, 19),
(12, 20),
(12, 22),
(12, 26);

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
  PRIMARY KEY (`sID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成員';

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`sID`, `password`, `name`, `nickname`, `sex`, `birth`) VALUES
('1110634000', '$2b$10$uOjQlRbgS4XSds1UC72nmuHOW8t2ada141aUa3El3wyGcWFVfnK76', '王小明', '小王', '男', '2021-07-14'),
('1110634001', '$2b$10$mlCH6.r9WdQLPMsErOYaTuyYfeQocTGWgV/aElT4MxykNMIWGLYnK', '何宛珊', '小何', '女', '2002-05-01'),
('1110634002', '$2b$10$eZQ9Mo1Goo.x8f/TNOhGXuDyRtIsk9KWnvRfoG8SPb2jCkiCRKmCC', '李品萱', '小李', '女', '2002-06-23'),
('1110634003', '$2b$10$Pcq2oBufpcQetFOOjollferCTUFwX1sDzEcYFN4Ij2s8j1mROo15e', '施羽珊', '小施', '女', '2002-02-02'),
('1110634004', '$2b$10$ZsI6RiiOJD.tJAOfeufuGu.qryKCWcnXm6YgOqd/vPuIYNiFIKT22', '張芸菱', '小張', '女', '2002-02-08'),
('1110634006', '$2b$10$3mgQHwb3hw6N5iSggoKn4umiifi/tkRj.bQDsuDwUkPaZ6CkgZp/C', '黃子瑜', '小黃', '女', '2001-10-07'),
('1110634015', '$2b$10$X4UkvXoMVY2VWFGjrcZvWuCLBHOUnV0Yqya0PjSY.13w9/mKeo6CW', '林均蓉', '小林', '女', '2001-09-10'),
('1110634025', '$2b$10$3SpXuHeaRuS3zGArGYpHEuwG/qHOZbOcxAUIcDnQh/NcIq3zFF8.6', '廖建榕', '小廖', '男', '2001-09-13'),
('1110634029', '$2b$10$ohzC5BtDJKoe.FMMiHKA9Ol5TxSuCvMn8PZ44eXs/dPZHqeCApXAe', '蔣明諭', '小蔣', '男', '2002-02-01'),
('1110634034', '$2b$10$teUq4d2xRjKzfmhhJDfF4uxkR17aHqOeBT/DEmEn3khQ930HHgTKW', '王小明', '小王', '男', '2021-07-14'),
('1110634039', '$2b$10$n1OQpYXkpqZM6PNedfr9gOJLBdOfJMjdznVjPb5uGfE.e/F582lki', '陳言睿', '小陳', '男', '2001-11-21'),
('1110634041', '$2b$10$FmhLWguxE.5ItiXNdILVLOsZrkdgywbHJtn/bTAZw2kyg/f8sN/Uu', '詹翔壹', '小詹', '男', '2002-02-28');

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
  UNIQUE KEY `position` (`position`),
  KEY `user_sID_officer` (`sID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='幹部';

--
-- 傾印資料表的資料 `officer`
--

INSERT INTO `officer` (`permission`, `position`, `sID`) VALUES
('財務負責人', '公關長', '1110634003'),
('組織負責人', '副會長', '1110634029'),
('一般幹部', '器材長', '1110634015'),
('組織負責人', '會長', '1110634039'),
('一般幹部', '活動長', '1110634006'),
('一般幹部', '生活長', '1110634004'),
('會議負責人', '秘書長', '1110634001'),
('一般幹部', '美宣長', '1110634002'),
('財務負責人', '財務長', '1110634025'),
('一般幹部', '資訊長', '1110634000'),
('會議負責人', '體育長', '1110634041');

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
  `status` char(1) NOT NULL,
  `uploadBy` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`,`category`) USING BTREE,
  KEY `officer_position_statement` (`uploadBy`),
  KEY `category_ID_statement` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='財務報表';

--
-- 傾印資料表的資料 `statement`
--

INSERT INTO `statement` (`ID`, `category`, `name`, `date`, `status`, `uploadBy`) VALUES
(12, 2, '大迎新財務報表', '2021-09-14 00:00:00', '0', '財務長'),
(13, 5, '籃球比賽報表', '2021-09-01 00:00:00', '0', '財務長');

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `absentees`
--
ALTER TABLE `absentees`
  ADD CONSTRAINT `confernece_ID_absentees` FOREIGN KEY (`conference`) REFERENCES `conference` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `officer_position_absentees` FOREIGN KEY (`absentees`) REFERENCES `officer` (`position`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `category_ID_account` FOREIGN KEY (`category`) REFERENCES `category` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `officer_position_account` FOREIGN KEY (`uploadBy`) REFERENCES `officer` (`position`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `attendees`
--
ALTER TABLE `attendees`
  ADD CONSTRAINT `confernece_ID_attendees` FOREIGN KEY (`conference`) REFERENCES `conference` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `officer_position_attendees` FOREIGN KEY (`attendees`) REFERENCES `officer` (`position`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `conference`
--
ALTER TABLE `conference`
  ADD CONSTRAINT `category_ID_conference` FOREIGN KEY (`category`) REFERENCES `category` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `officer_position_conference_host` FOREIGN KEY (`host`) REFERENCES `officer` (`position`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `officer_position_conference_recorder` FOREIGN KEY (`recorder`) REFERENCES `officer` (`position`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `account_ID` FOREIGN KEY (`account`) REFERENCES `account` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `statement_ID` FOREIGN KEY (`statement`) REFERENCES `statement` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `officer`
--
ALTER TABLE `officer`
  ADD CONSTRAINT `user_sID_officer` FOREIGN KEY (`sID`) REFERENCES `member` (`sID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `statement`
--
ALTER TABLE `statement`
  ADD CONSTRAINT `category_ID_statement` FOREIGN KEY (`category`) REFERENCES `category` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `officer_position_statement` FOREIGN KEY (`uploadBy`) REFERENCES `officer` (`position`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
