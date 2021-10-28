-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-10-28 13:49:16
-- 伺服器版本： 10.4.18-MariaDB-log
-- PHP 版本： 7.4.16

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
CREATE TABLE `absentees` (
  `conference` int(11) NOT NULL,
  `absentees` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='缺席者';

--
-- 資料表新增資料前，先清除舊資料 `absentees`
--

TRUNCATE TABLE `absentees`;
-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `amount` int(11) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `receipt` varchar(50) NOT NULL,
  `status` char(1) NOT NULL,
  `uploadBy` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收支紀錄';

--
-- 資料表新增資料前，先清除舊資料 `account`
--

TRUNCATE TABLE `account`;
--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`ID`, `date`, `category`, `name`, `amount`, `content`, `receipt`, `status`, `uploadBy`) VALUES
(1, '2019-06-21 00:00:00', 0, '利息收入', 88, '存款利息收入\n', 'undefined', '1', '財務長'),
(2, '2019-06-28 00:00:00', 15, '籃球隊用品', -1922, '男籃球隊用品', 'undefined', '1', '體育長'),
(3, '2019-07-06 00:00:00', 0, '印章換新', -320, '因會章資訊未更新，需重新刻製。', 'undefined', '1', '財務長'),
(4, '2019-07-10 00:00:00', 0, '手續費', -50, '郵局更換印鑑', 'undefined', '1', '財務長'),
(5, '2019-07-22 00:00:00', 2, '場勘交通費', -1250, '', 'undefined', '1', '會長'),
(9, '2019-07-24 00:00:00', 2, '遊覽車訂金', -15600, '', 'undefined', '1', '公關長'),
(10, '2019-07-22 21:08:45', 0, '贊助收入', 1601, '街喜鍋 - 時尚迴轉鍋物 | 1,001 \r\n烏龍麵所 | 200\r\n痞客啡 Pico\'fe | 200\r\n牛仔Beef炙燒牛排 | 200', 'undefined', '1', '公關長'),
(11, '2019-07-24 00:00:00', 0, '贊助收入', 800, '呆豬House早餐 200\r\n破吐司早餐 100\r\n美綠早午餐 200\r\n肉蛋吐司 300', 'undefined', '1', '公關長'),
(12, '2019-07-24 00:00:00', 0, '影印費', -21, '印製贊助條例', 'undefined', '1', '公關長'),
(13, '2019-07-25 00:00:00', 0, '文具用品', -80, '印泥 | 80', 'undefined', '1', '財務長'),
(14, '2019-08-19 00:00:00', 0, '贊助收入', 600, '魯廣眾鮮蔬滷味 | 100\n藍獸亓關東煮 | 200\n包荷小麵 | 200\n有家炒飯 | 100', 'undefined', '1', '公關長'),
(15, '2019-08-20 00:00:00', 12, '茶會點心', -1186, '', 'undefined', '1', '生活長'),
(16, '2019-08-20 00:00:00', 2, '祭拜供品', -1768, '', 'undefined', '1', '生活長'),
(17, '2019-08-21 00:00:00', 2, '場勘交通費', -380, '', 'undefined', '1', '財務長'),
(18, '2019-08-22 00:00:00', 0, '影印費', -40, '新生茶會邀請卡 | 40', 'undefined', '1', '美宣長'),
(19, '2019-08-27 00:00:00', 0, '贊助收入', 1000, '日初冰屋 | 200 \nHello 早安 | 300 \n三個漢堡 | 200 \n阿珠麵店 | 300 ', 'undefined', '1', '公關長'),
(20, '2019-08-28 00:00:00', 12, '活動用品', -24, '數字籤', 'undefined', '1', '活動長'),
(21, '2019-08-28 00:00:00', 0, '影印費', -32, '科費繳交通知單 | 32', 'undefined', '1', '財務長'),
(22, '2019-08-28 00:00:00', 2, '影印費', -49, '活動行前通知單 | 49', 'undefined', '1', '活動長'),
(23, '2019-08-28 00:00:00', 0, '冷氣卡', -300, '購買 | 100\n儲值 | 200', 'undefined', '1', '財務長'),
(24, '2019-08-29 00:00:00', 12, '影印紙', -58, '', 'undefined', '1', '活動長'),
(25, '2019-08-30 00:00:00', 2, '影印費', -50, '家長同意書 | 50', 'undefined', '1', '活動長'),
(26, '2019-08-30 00:00:00', 0, '美宣用品', -128, '雙面膠、奇異筆', 'undefined', '1', '美宣長'),
(27, '2019-09-06 00:00:00', 0, '美宣用品', -99, '透明膠帶', 'undefined', '1', '美宣長'),
(28, '2019-09-06 00:00:00', 2, '夜遊用品', -270, '火把 | 270', 'undefined', '1', '公關長'),
(29, '2019-09-06 00:00:00', 2, '木炭', -398, '', 'undefined', '1', '器材長'),
(30, '2019-09-06 00:00:00', 2, '野炊用品', -1479, '紙盤、瓦斯罐、卡式爐、烤肉夾', 'undefined', '1', '生活長'),
(31, '2019-09-07 00:00:00', 0, '贊助收入', 200, '學會幹部贊助 | 200', 'undefined', '1', '公關長'),
(32, '2019-09-09 00:00:00', 0, '科費收入', 60000, '4000元 * 15人 | 60000', 'undefined', '1', '財務長'),
(33, '2019-09-10 00:00:00', 0, '科費收入', 44000, '4000元 * 11人 | 44000', 'undefined', '1', '財務長'),
(34, '2019-09-10 00:00:00', 2, '活動用品', -217, '垃圾袋、麵粉、紙杯', 'undefined', '1', '活動長'),
(35, '2019-09-11 00:00:00', 0, '科費收入', 40000, '4000元 * 10人 | 40000', 'undefined', '1', '財務長'),
(36, '2019-09-11 00:00:00', 2, '活動用品', -218, '刮鬍泡', 'undefined', '1', '活動長'),
(37, '2019-09-12 00:00:00', 2, '影印費', -35, '家長同意書', 'undefined', '1', '活動長'),
(38, '2019-09-12 00:00:00', 0, '影印費', -6, '科費減免單、科費轉出單', 'undefined', '1', '財務長'),
(39, '2019-09-12 00:00:00', 0, '科費收入', 2000, '科費減免 (4000 - 2000)元 * 1人 | 2000', 'undefined', '1', '財務長'),
(40, '2019-09-12 00:00:00', 2, '燈光音響訂金', -4500, '', 'undefined', '1', '器材長'),
(41, '2019-09-12 00:00:00', 2, '活動用品', -143, '保鮮膜、紙盤、吸管', 'undefined', '1', '活動長'),
(42, '2019-09-12 00:00:00', 2, '夜遊用品', -295, '手套、火把', 'undefined', '1', '公關長'),
(43, '2019-09-16 00:00:00', 2, '活動用品', -449, '膠帶、絲襪、蠟筆、線、針', 'undefined', '1', '活動長'),
(44, '2019-09-16 00:00:00', 2, '夜遊用品', -200, '白布', 'undefined', '1', '公關長'),
(45, '2019-09-16 00:00:00', 2, '美宣用品', -395, '油漆筆、水彩、氣球、瓦楞紙、紙', 'undefined', '1', '美宣長'),
(46, '2019-09-16 00:00:00', 0, '轉科退費', -5400, '一升二 1800 * 3人 | 5400', 'undefined', '1', '財務長'),
(47, '2019-09-16 00:00:00', 0, '科費收入', 40000, '4000元 * 10人 | 40000', 'undefined', '1', '財務長'),
(48, '2019-09-17 00:00:00', 0, '科費收入', 12000, '4000元 * 3人 | 12000', 'undefined', '1', '財務長'),
(49, '2019-09-18 00:00:00', 0, '科費收入', 12000, '4000元 * 3人 | 12000', 'undefined', '1', '財務長'),
(50, '2019-09-18 00:00:00', 0, '轉科退費', -1800, '一升二 1800 * 1人 | 1800', 'undefined', '1', '財務長'),
(51, '2019-09-19 00:00:00', 2, '場勘交通費', -1790, '', 'undefined', '1', '財務長'),
(52, '2019-09-22 00:00:00', 0, '贊助收入', 200, '勃根地桌遊休閒館 | 200', 'undefined', '1', '公關長'),
(53, '2019-09-25 00:00:00', 2, '夜遊用品', -119, '爆炸頭 | 119', 'undefined', '1', '公關長'),
(54, '2019-09-25 00:00:00', 2, '活動用品', -108, '麵粉、保鮮盒', 'undefined', '1', '活動長'),
(55, '2019-09-25 00:00:00', 2, '野炊食材', -284, '麵、調味料、洋蔥、水', 'undefined', '1', '生活長'),
(56, '2019-09-26 00:00:00', 2, '影印費', -72, '大迎新企劃書及人員名單', 'undefined', '1', '活動長'),
(57, '2019-09-27 00:00:00', 15, '報名費', -1200, '女籃球隊 系科盃籃球比賽 報名費', 'undefined', '1', '體育長'),
(58, '2019-09-30 00:00:00', 2, '場勘交通費', -1590, '', 'undefined', '1', '財務長'),
(59, '2019-10-01 00:00:00', 2, '活動用品', -213, '膠帶', 'undefined', '1', '活動長'),
(60, '2019-10-03 00:00:00', 2, '野炊食材及用品', -377, '麵、白醬塊、湯碗、免洗筷、煎匙、刨刀', 'undefined', '1', '生活長'),
(61, '2019-10-03 00:00:00', 2, '平安符及金紙', -550, '', 'undefined', '1', '公關長'),
(62, '2019-10-03 00:00:00', 0, '轉科退費', -300, '三升四 300 * 1人 | 300', 'undefined', '1', '財務長'),
(63, '2019-10-04 00:00:00', 0, '醫療用品', -540, '藥用酒精', 'undefined', '1', '會長'),
(64, '2019-10-04 00:00:00', 0, '財務用品', -84, '收據本及紅包袋', 'undefined', '1', '財務長'),
(65, '2019-10-07 00:00:00', 2, '場勘交通費', -2635, '', 'undefined', '1', '活動長'),
(66, '2019-10-07 00:00:00', 2, '影印費', -97, '', 'undefined', '1', '活動長'),
(67, '2019-10-07 00:00:00', 2, '活動收入', 5200, '1300 * 4人 | 5200', 'undefined', '1', '財務長'),
(68, '2019-10-08 00:00:00', 2, '活動收入', 6500, '1300 * 5人 | 6500', 'undefined', '1', '財務長'),
(69, '2019-10-09 00:00:00', 2, '活動收入', 5200, '1300 * 4人 | 5200', 'undefined', '1', '財務長'),
(70, '2019-10-14 00:00:00', 15, '球衣補助', -7200, '男籃球隊 球衣補助', 'undefined', '1', '體育長'),
(71, '2019-10-14 00:00:00', 15, '報名費', -2400, '男籃球隊', 'undefined', '1', '體育長'),
(72, '2019-10-14 00:00:00', 2, '場勘交通費', -610, '', 'undefined', '1', '活動長'),
(73, '2019-10-14 00:00:00', 0, '科服', -22440, '', 'undefined', '1', '美宣長'),
(74, '2019-10-14 00:00:00', 2, '美宣用品', -336, '紙', 'undefined', '1', '美宣長'),
(75, '2019-10-14 00:00:00', 2, '活動收入', 5200, '1300 * 4人 | 5200', 'undefined', '1', '財務長'),
(76, '2019-10-15 00:00:00', 0, '科服收入', 7800, '300 * 26人 | 7800', 'undefined', '1', '財務長'),
(77, '2019-10-14 00:00:00', 0, '科服收入', 300, '300 * 1人 | 300', 'undefined', '1', '財務長'),
(78, '2019-10-15 00:00:00', 2, '野炊食材及用品', -8107, '', 'undefined', '1', '生活長'),
(79, '2019-10-16 00:00:00', 2, '活動收入', 1300, '1300 * 1人 | 1300', 'undefined', '1', '財務長'),
(80, '2019-10-16 00:00:00', 0, '科服收入', 900, '300 * 3人 | 900', 'undefined', '1', '財務長'),
(81, '2019-10-16 00:00:00', 2, '活動手冊', -2009, '', 'undefined', '1', '美宣長'),
(82, '2019-10-16 00:00:00', 2, '美宣用品', -272, '護貝紙、奇異筆', 'undefined', '1', '美宣長'),
(83, '2019-10-16 00:00:00', 2, '影印費', -23, '簽到表', 'undefined', '1', '活動長'),
(84, '2019-10-16 00:00:00', 0, '文具用品', -222, '膠帶', 'undefined', '1', '活動長'),
(85, '2019-10-16 00:00:00', 2, '活動用品', -402, '', 'undefined', '1', '活動長'),
(86, '2019-10-16 00:00:00', 2, '野炊食材及用品', -1512, '', 'undefined', '1', '生活長'),
(87, '2019-10-16 00:00:00', 2, '飲用水', -245, '', 'undefined', '1', '生活長'),
(88, '2019-10-16 00:00:00', 2, '晚會用品', -228, '面具、鐵絲', 'undefined', '1', '體育長'),
(89, '2019-10-17 00:00:00', 2, '美宣用品', -209, '護貝紙', 'undefined', '1', '美宣長'),
(90, '2019-10-17 00:00:00', 2, '飲用水', -5400, '', 'undefined', '1', '生活長'),
(91, '2019-10-17 00:00:00', 2, '野炊食材', -3097, '', 'undefined', '1', '生活長'),
(92, '2019-10-17 00:00:00', 0, '器材用品', -1340, '延長線', 'undefined', '1', '器材長'),
(93, '2019-10-17 00:00:00', 2, '祭拜用品', -520, '', 'undefined', '1', '公關長'),
(94, '2019-10-17 00:00:00', 2, '祭拜用品', -300, '金爐', 'undefined', '1', '公關長'),
(95, '2019-10-18 00:00:00', 2, '保險費用', -6222, '', 'undefined', '1', '活動長'),
(96, '2019-10-18 00:00:00', 2, '活動收入', 1300, '1300 * 1人 | 1300', 'undefined', '1', '財務長'),
(97, '2019-10-18 00:00:00', 0, '科服收入', 2100, '300 * 7人 | 2100', 'undefined', '1', '財務長'),
(98, '2019-10-18 00:00:00', 2, '飲用水', -436, '', 'undefined', '1', '生活長'),
(99, '2019-10-18 00:00:00', 2, '野炊用品', -444, '瓦斯罐(12入) | 444', 'undefined', '1', '生活長'),
(100, '2019-10-18 00:00:00', 2, '器材用品', -534, '膠帶、哨子、電池', 'undefined', '1', '器材長'),
(101, '2019-10-20 00:00:00', 2, '烤肉用品', -13000, '', 'undefined', '1', '生活長'),
(102, '2019-10-20 00:00:00', 2, '遊覽車尾款', -36400, '', 'undefined', '1', '公關長'),
(103, '2019-10-20 00:00:00', 2, '器材用品', -19750, '', 'undefined', '1', '器材長'),
(104, '2019-10-20 00:00:00', 2, '晚會用品', -2840, '營火木材', 'undefined', '1', '體育長'),
(105, '2019-10-20 00:00:00', 2, '燈光音響尾款', -10500, '', 'undefined', '1', '器材長'),
(106, '2019-10-20 00:00:00', 2, '器材用品', -2400, '無線電租金', 'undefined', '1', '器材長'),
(107, '2019-10-20 00:00:00', 2, '野炊食材及用品', -3202, '', 'undefined', '1', '生活長'),
(108, '2019-10-20 00:00:00', 2, '先遣交通費', -735, '', 'undefined', '1', '體育長'),
(109, '2019-10-20 00:00:00', 2, '紅包費用', -9400, '司機 | 1200\n學長姐 | 8200', 'undefined', '1', '財務長'),
(110, '2019-10-20 00:00:00', 2, '野炊食材及用品', -7220, '', 'undefined', '1', '生活長'),
(111, '2019-10-20 00:00:00', 2, '活動用品', -99, '喉糖、芥末', 'undefined', '1', '活動長'),
(112, '2019-10-20 00:00:00', 2, '影印費', -108, '', 'undefined', '1', '活動長'),
(113, '2019-10-25 00:00:00', 2, '還願用品', -606, '金紙、供品', 'undefined', '1', '財務長'),
(114, '2019-10-25 00:00:00', 0, 'All Pass 糖', -433, '糖果、卡片、包裝紙', 'undefined', '1', '財務長'),
(115, '2019-11-06 00:00:00', 0, '科費收入', 2000, '分期1/2 (4000 / 2)元 * 1人 | 2000', 'undefined', '1', '財務長'),
(116, '2019-11-14 00:00:00', 0, '感謝狀紙', -128, '', 'undefined', '1', '公關長'),
(117, '2019-11-20 00:00:00', 15, '報名費', -8500, '女籃球隊 中資杯 報名費 | 5500\n男籃球隊 中資杯 報名費 | 3000', 'undefined', '1', '體育長'),
(118, '2019-11-22 00:00:00', 0, '比賽獎金', -1800, '躲避球比賽獎金', 'undefined', '1', '體育長'),
(119, '2019-11-27 00:00:00', 0, '科費收入', 4200, '二年級 分期1/2 (3200 / 2)元 * 3人 | 4200', 'undefined', '1', '財務長'),
(120, '2019-11-29 00:00:00', 15, '紅色緞帶', -128, '', 'undefined', '1', '體育長'),
(121, '2019-11-29 00:00:00', 15, '精神總錦標獎勵', 20000, 'OK禮卷', 'undefined', '1', '財務長'),
(122, '2019-12-01 00:00:00', 16, '影印費', -265, '海報、宣傳單', 'undefined', '1', '美宣長'),
(123, '2019-12-01 00:00:00', 16, '攤位食材及用品', -4197, '', 'undefined', '1', '生活長'),
(124, '2019-12-01 00:00:00', 16, '攤位收入', 9985, '', 'undefined', '1', '財務長'),
(125, '2019-12-03 00:00:00', 0, '科費收入', 2000, '', 'undefined', '1', '財務長'),
(126, '2019-12-05 00:00:00', 0, '贊助收入', 400, '', 'undefined', '1', '公關長'),
(127, '2019-12-09 00:00:00', 0, '科費收入', 4900, '', 'undefined', '1', '財務長'),
(128, '2019-12-11 00:00:00', 0, '科費收入', 2400, '', 'undefined', '1', '財務長'),
(129, '2019-12-05 00:00:00', 4, '燈光音響訂金', -2500, '收據於尾款交付時給予', 'undefined', '1', '器材長'),
(130, '2019-12-11 00:00:00', 15, '桌球比賽獎金', -1700, 'OK禮券', 'undefined', '1', '器材長'),
(131, '2019-12-19 00:00:00', 4, '聖誕小卡收入', 850, '10 * 85張 | 850', 'undefined', '1', '財務長'),
(132, '2019-12-19 00:00:00', 4, '活動收入', 1875, '1人收費150元，有非本科系或資工系學生參加，收入依比例分配，故無法整除', 'undefined', '1', '財務長'),
(133, '2019-12-20 00:00:00', 4, '活動食材與用具', -5564, '資管:資工 = 7:3\n7948 * 0.7 = 5564', 'undefined', '1', '生活長'),
(134, '2019-12-20 00:00:00', 4, '美宣用品', -956, '包裝紙、海報、工作牌\n資管:資工 = 5:5\n1912 / 2 = 956', 'undefined', '1', '美宣長'),
(135, '2019-12-20 00:00:00', 4, '器材用品', -199, '彩燈、垃圾袋\n資管:資工 = 5:5\n398 / 2 = 199', 'undefined', '1', '器材長'),
(136, '2019-12-20 00:00:00', 4, '抽獎品項', -1147, '資管:資工 = 5:5\n2294 / 2 = 1147', 'undefined', '1', '活動長'),
(137, '2019-12-20 00:00:00', 4, '燈光音響尾款', -2500, '資管:資工 = 5:5\n5000 / 2 = 2500', 'undefined', '1', '器材長'),
(138, '2019-12-20 00:00:00', 0, '美宣用品', -122, '剪刀、膠帶、標籤', 'undefined', '1', '美宣長'),
(139, '2019-12-20 00:00:00', 15, '球隊用品', -1394, '女籃球隊 球、球袋', 'undefined', '1', '體育長'),
(140, '2019-12-20 00:00:00', 4, '冬至湯圓', -750, '湯圓、薑', 'undefined', '1', '生活長'),
(141, '2019-12-27 00:00:00', 15, '球衣補助', -1500, '女籃球隊 (部分申請)', 'undefined', '1', '體育長'),
(142, '2020-01-01 00:00:00', 0, '利息收入', 98, '存款利息收入', 'undefined', '1', '財務長'),
(143, '2020-03-16 00:00:00', 15, '男籃比賽', -2400, '', 'undefined', '1', '體育長'),
(144, '2020-03-16 00:00:00', 15, '女籃比賽', -1100, '', 'undefined', '1', '體育長'),
(145, '2020-03-16 00:00:00', 15, '裁判費用', -1700, '', 'undefined', '1', '體育長'),
(146, '2020-03-26 00:00:00', 14, '活動食材', -2041, '餅乾、奶酪材料費', 'undefined', '1', '會長'),
(147, '2020-03-26 00:00:00', 14, '小卡', -57, '', 'undefined', '1', '活動長'),
(148, '2020-03-26 00:00:00', 14, '影印費', -180, '活動海報', 'undefined', '1', '美宣長'),
(149, '2020-03-26 00:00:00', 14, '活動收入', 4170, '', 'undefined', '1', '財務長'),
(150, '2020-05-11 00:00:00', 0, '科費收入', 1200, '補繳(二升三)', 'undefined', '1', '財務長'),
(151, '2020-05-14 00:00:00', 17, '影印費', -1241, '證件海報、選票', 'undefined', '1', '會長'),
(152, '2019-06-01 00:00:00', 0, '上期結餘', 71892, '證件海報、選票', 'undefined', '1', '財務長');

--
-- 觸發器 `account`
--
DROP TRIGGER IF EXISTS `account_DELETE`;
DELIMITER $$
CREATE TRIGGER `account_DELETE` AFTER DELETE ON `account` FOR EACH ROW BEGIN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=OLD.uploadBy),"刪除","收支","account",OLD.ID);

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `account_INSERT`;
DELIMITER $$
CREATE TRIGGER `account_INSERT` AFTER INSERT ON `account` FOR EACH ROW BEGIN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=NEW.uploadBy),"新增","收支","account",NEW.ID);

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `account_UPDATE_CONTENT`;
DELIMITER $$
CREATE TRIGGER `account_UPDATE_CONTENT` AFTER UPDATE ON `account` FOR EACH ROW IF OLD.status = NEW.status THEN
INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=NEW.uploadBy),"修改","收支","account",OLD.ID);
END IF
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `account_UPDATE_STATUS`;
DELIMITER $$
CREATE TRIGGER `account_UPDATE_STATUS` AFTER UPDATE ON `account` FOR EACH ROW IF OLD.status <> NEW.status THEN
INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=NEW.uploadBy),"修改",NEW.status,"account",OLD.ID);
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `account_comment`
--

DROP TABLE IF EXISTS `account_comment`;
CREATE TABLE `account_comment` (
  `accountID` int(11) NOT NULL,
  `commentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表新增資料前，先清除舊資料 `account_comment`
--

TRUNCATE TABLE `account_comment`;
--
-- 傾印資料表的資料 `account_comment`
--

INSERT INTO `account_comment` (`accountID`, `commentID`) VALUES
(7, 1),
(7, 32),
(7, 37),
(29, 2),
(32, 3),
(38, 4);

-- --------------------------------------------------------

--
-- 資料表結構 `attendees`
--

DROP TABLE IF EXISTS `attendees`;
CREATE TABLE `attendees` (
  `conference` int(11) NOT NULL,
  `attendees` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='出席者';

--
-- 資料表新增資料前，先清除舊資料 `attendees`
--

TRUNCATE TABLE `attendees`;
-- --------------------------------------------------------

--
-- 資料表結構 `budget`
--

DROP TABLE IF EXISTS `budget`;
CREATE TABLE `budget` (
  `ID` int(11) NOT NULL,
  `cID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `cost` int(11) NOT NULL,
  `date` date NOT NULL,
  `review` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='預算';

--
-- 資料表新增資料前，先清除舊資料 `budget`
--

TRUNCATE TABLE `budget`;
-- --------------------------------------------------------

--
-- 資料表結構 `budgetcategory`
--

DROP TABLE IF EXISTS `budgetcategory`;
CREATE TABLE `budgetcategory` (
  `bID` int(11) NOT NULL,
  `category` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='預算分類';

--
-- 資料表新增資料前，先清除舊資料 `budgetcategory`
--

TRUNCATE TABLE `budgetcategory`;
-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活動類別';

--
-- 資料表新增資料前，先清除舊資料 `category`
--

TRUNCATE TABLE `category`;
--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`ID`, `name`, `status`) VALUES
(0, '其他項目', 0),
(2, '大迎新', 1),
(3, '小迎新', 1),
(4, '聖誕系列', 1),
(12, '新生茶會', 1),
(14, '資管週', 1),
(15, '體育項目', 1),
(16, '校慶活動', 1),
(17, '會長選舉', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `ID` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `content` varchar(500) NOT NULL,
  `status` char(1) NOT NULL,
  `isHide` tinyint(1) NOT NULL,
  `sID` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='留言';

--
-- 資料表新增資料前，先清除舊資料 `comment`
--

TRUNCATE TABLE `comment`;
--
-- 觸發器 `comment`
--
DROP TRIGGER IF EXISTS `comment_DELETE`;
DELIMITER $$
CREATE TRIGGER `comment_DELETE` AFTER UPDATE ON `comment` FOR EACH ROW IF NEW.isHide = 1 THEN

INSERT INTO events (who,action,content,type,objectID) VALUES (NEW.sID,"刪除","留言","comment",NEW.ID);

END IF
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `comment_INSERT`;
DELIMITER $$
CREATE TRIGGER `comment_INSERT` AFTER INSERT ON `comment` FOR EACH ROW BEGIN

INSERT INTO events (who,action,content,type,objectID) VALUES (NEW.sID,"新增","留言","comment",NEW.ID);

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `comment_UPDATE_CONTENT`;
DELIMITER $$
CREATE TRIGGER `comment_UPDATE_CONTENT` AFTER UPDATE ON `comment` FOR EACH ROW IF (OLD.status = NEW.status && NEW.isHide <> 1)THEN

INSERT INTO events (who,action,content,type,objectID) VALUES (NEW.sID,"修改","留言","comment",NEW.ID);

END IF
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `comment_UPDATE_STATUS`;
DELIMITER $$
CREATE TRIGGER `comment_UPDATE_STATUS` AFTER UPDATE ON `comment` FOR EACH ROW IF OLD.status <> NEW.status THEN

INSERT INTO events (who,action,content,type,objectID) VALUES (NEW.sID,"修改",NEW.status,"comment",NEW.ID);

END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `conference`
--

DROP TABLE IF EXISTS `conference`;
CREATE TABLE `conference` (
  `ID` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `attached_file` varchar(50) DEFAULT NULL,
  `content` varchar(500) NOT NULL,
  `host` varchar(10) NOT NULL,
  `recorder` varchar(10) NOT NULL,
  `status` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='會議紀錄';

--
-- 資料表新增資料前，先清除舊資料 `conference`
--

TRUNCATE TABLE `conference`;
--
-- 觸發器 `conference`
--
DROP TRIGGER IF EXISTS `conference_DELETE`;
DELIMITER $$
CREATE TRIGGER `conference_DELETE` AFTER DELETE ON `conference` FOR EACH ROW BEGIN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=OLD.recorder),"刪除","會議記錄","conference",OLD.ID);

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `conference_INSERT`;
DELIMITER $$
CREATE TRIGGER `conference_INSERT` AFTER INSERT ON `conference` FOR EACH ROW BEGIN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=NEW.recorder),"新增","會議記錄","conference",NEW.ID);

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `conference_UPDATE_CONTENT`;
DELIMITER $$
CREATE TRIGGER `conference_UPDATE_CONTENT` AFTER UPDATE ON `conference` FOR EACH ROW IF OLD.status = NEW.status THEN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=OLD.recorder),"修改","會議記錄","conference",OLD.ID);

END IF
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `conference_UPDATE_STATUS`;
DELIMITER $$
CREATE TRIGGER `conference_UPDATE_STATUS` AFTER UPDATE ON `conference` FOR EACH ROW IF OLD.status <> NEW.status THEN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=OLD.recorder),"修改",NEW.status,"conference",OLD.ID);

END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `conference_comment`
--

DROP TABLE IF EXISTS `conference_comment`;
CREATE TABLE `conference_comment` (
  `conferenceID` int(11) NOT NULL,
  `commentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表新增資料前，先清除舊資料 `conference_comment`
--

TRUNCATE TABLE `conference_comment`;
-- --------------------------------------------------------

--
-- 資料表結構 `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `statement` int(11) NOT NULL,
  `account` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表新增資料前，先清除舊資料 `content`
--

TRUNCATE TABLE `content`;
--
-- 傾印資料表的資料 `content`
--

INSERT INTO `content` (`statement`, `account`) VALUES
(1, 1),
(1, 2),
(1, 152),
(2, 3),
(2, 4),
(2, 5),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(4, 14),
(4, 15),
(4, 16),
(4, 17),
(4, 18),
(4, 19),
(4, 20),
(4, 21),
(4, 22),
(4, 23),
(4, 24),
(4, 25),
(4, 26),
(5, 27),
(5, 28),
(5, 29),
(5, 30),
(5, 31),
(5, 32),
(5, 33),
(5, 34),
(5, 35),
(5, 36),
(5, 37),
(5, 38),
(5, 39),
(5, 40),
(5, 41),
(5, 42),
(5, 43),
(5, 44),
(5, 45),
(5, 46),
(5, 47),
(5, 48),
(5, 49),
(5, 50),
(5, 51),
(5, 52),
(5, 53),
(5, 54),
(5, 55),
(5, 56),
(5, 57),
(5, 58),
(6, 59),
(6, 60),
(6, 61),
(6, 62),
(6, 63),
(6, 64),
(6, 65),
(6, 66),
(6, 67),
(6, 68),
(6, 69),
(6, 70),
(6, 71),
(6, 72),
(6, 73),
(6, 74),
(6, 75),
(6, 76),
(6, 77),
(6, 78),
(6, 79),
(6, 80),
(6, 81),
(6, 82),
(6, 83),
(6, 84),
(6, 85),
(6, 86),
(6, 87),
(6, 88),
(6, 89),
(6, 90),
(6, 91),
(6, 92),
(6, 93),
(6, 94),
(6, 95),
(6, 96),
(6, 97),
(6, 98),
(6, 99),
(6, 100),
(6, 101),
(6, 102),
(6, 103),
(6, 104),
(6, 105),
(6, 106),
(6, 107),
(6, 108),
(6, 109),
(6, 110),
(6, 111),
(6, 112),
(6, 113),
(6, 114),
(7, 115),
(7, 116),
(7, 117),
(7, 118),
(7, 119),
(7, 120),
(7, 121),
(8, 122),
(8, 123),
(8, 124),
(8, 125),
(8, 126),
(8, 127),
(8, 128),
(8, 129),
(8, 130),
(8, 131),
(8, 132),
(8, 133),
(8, 134),
(8, 135),
(8, 136),
(8, 137),
(8, 138),
(8, 139),
(8, 140),
(8, 141),
(9, 142);

-- --------------------------------------------------------

--
-- 資料表結構 `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `who` char(10) NOT NULL,
  `action` varchar(20) NOT NULL,
  `content` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `objectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='通知';

--
-- 資料表新增資料前，先清除舊資料 `events`
--

TRUNCATE TABLE `events`;
-- --------------------------------------------------------

--
-- 資料表結構 `events_member`
--

DROP TABLE IF EXISTS `events_member`;
CREATE TABLE `events_member` (
  `ID` int(11) NOT NULL,
  `sID` char(10) NOT NULL,
  `content` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `objectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表新增資料前，先清除舊資料 `events_member`
--

TRUNCATE TABLE `events_member`;
-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `sID` char(10) NOT NULL,
  `password` char(60) NOT NULL,
  `name` varchar(10) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `sex` char(1) NOT NULL,
  `birth` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成員';

--
-- 資料表新增資料前，先清除舊資料 `member`
--

TRUNCATE TABLE `member`;
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
('1110634007', '$2b$10$Z3WqwGAU3JgI5tKY3bVFy.xQiqwLVQUWfFwC6BzP3JEMDkbqbJ1ci', '王小明', '小王', '男', '2021-07-14'),
('1110634015', '$2b$10$X4UkvXoMVY2VWFGjrcZvWuCLBHOUnV0Yqya0PjSY.13w9/mKeo6CW', '林均蓉', '小林', '女', '2001-09-10'),
('1110634025', '$2b$10$MSASNfqCaMFfEyNaLI8PQuyXg5q385CSW2vH2BFtEAnOQQ2pVENo6', '廖建榕', 'Jrong', '男', '2001-09-13'),
('1110634029', '$2b$10$ohzC5BtDJKoe.FMMiHKA9Ol5TxSuCvMn8PZ44eXs/dPZHqeCApXAe', '蔣明諭', '小蔣', '男', '2002-02-01'),
('1110634034', '$2b$10$teUq4d2xRjKzfmhhJDfF4uxkR17aHqOeBT/DEmEn3khQ930HHgTKW', '洪柚喆', '小洪', '男', '2021-07-14'),
('1110634039', '$2b$10$n1OQpYXkpqZM6PNedfr9gOJLBdOfJMjdznVjPb5uGfE.e/F582lki', '陳言睿', '小陳', '男', '2001-11-21'),
('1110634041', '$2b$10$FmhLWguxE.5ItiXNdILVLOsZrkdgywbHJtn/bTAZw2kyg/f8sN/Uu', '詹翔壹', '小詹', '男', '2002-02-28'),
('1110634042', '$2b$10$ZhRlHOI00XR4AiKkAfWQQOM3h39WZkwsCvQ90xMDG4pRWM4rO7s/.', '王小明', '小王', '男', '2021-07-14');

-- --------------------------------------------------------

--
-- 資料表結構 `officer`
--

DROP TABLE IF EXISTS `officer`;
CREATE TABLE `officer` (
  `permission` varchar(10) NOT NULL DEFAULT '一般幹部',
  `position` varchar(10) NOT NULL,
  `sID` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='幹部';

--
-- 資料表新增資料前，先清除舊資料 `officer`
--

TRUNCATE TABLE `officer`;
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
CREATE TABLE `statement` (
  `ID` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  `status` char(1) NOT NULL,
  `uploadBy` varchar(10) NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='財務報表';

--
-- 資料表新增資料前，先清除舊資料 `statement`
--

TRUNCATE TABLE `statement`;
--
-- 傾印資料表的資料 `statement`
--

INSERT INTO `statement` (`ID`, `category`, `name`, `date`, `status`, `uploadBy`, `balance`) VALUES
(0, 0, 'Root', '2019-05-31 11:30:54', '1', '財務長', 71892),
(1, 0, '【108】六月份', '2021-10-24 00:00:00', '1', '財務長', 0),
(2, 0, '【108】七月份', '2021-10-24 00:00:00', '1', '財務長', 0),
(4, 0, '【108】八月份', '2021-10-24 00:00:00', '1', '財務長', 0),
(5, 0, '【108】九月份', '2021-10-25 00:00:00', '0', '財務長', 0),
(6, 0, '【108】十月份', '2021-10-25 00:00:00', '0', '財務長', 0),
(7, 0, '【108】十一月份', '2021-10-25 00:00:00', '0', '財務長', 0),
(8, 0, '【108】十二月份', '2021-10-25 00:00:00', '0', '財務長', 0),
(9, 0, '【108】一月份', '2021-10-25 00:00:00', '0', '財務長', 0),
(10, 0, '【108】二月份', '2021-10-25 00:00:00', '0', '財務長', 0);

--
-- 觸發器 `statement`
--
DROP TRIGGER IF EXISTS `statement_DELETE`;
DELIMITER $$
CREATE TRIGGER `statement_DELETE` AFTER DELETE ON `statement` FOR EACH ROW BEGIN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=OLD.uploadBy),"刪除","財務報表","statement",OLD.ID);

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `statement_INSERT`;
DELIMITER $$
CREATE TRIGGER `statement_INSERT` AFTER INSERT ON `statement` FOR EACH ROW BEGIN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=NEW.uploadBy),"新增","財務報表","statement",NEW.ID);

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `statement_UPDATE_CONTENT`;
DELIMITER $$
CREATE TRIGGER `statement_UPDATE_CONTENT` AFTER UPDATE ON `statement` FOR EACH ROW IF OLD.status = NEW.status THEN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=OLD.uploadBy),"修改","財務報表","statement",OLD.ID);

END IF
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `statement_UPDATE_STATUS`;
DELIMITER $$
CREATE TRIGGER `statement_UPDATE_STATUS` AFTER UPDATE ON `statement` FOR EACH ROW IF OLD.status <> NEW.status THEN

INSERT INTO events (who,action,content,type,objectID) VALUES ((SELECT sID FROM officer WHERE officer.position=OLD.uploadBy),"修改",NEW.status,"statement",OLD.ID);

END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `statement_comment`
--

DROP TABLE IF EXISTS `statement_comment`;
CREATE TABLE `statement_comment` (
  `statementID` int(11) NOT NULL,
  `commentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表新增資料前，先清除舊資料 `statement_comment`
--

TRUNCATE TABLE `statement_comment`;
--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `absentees`
--
ALTER TABLE `absentees`
  ADD PRIMARY KEY (`conference`,`absentees`);

--
-- 資料表索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`,`category`) USING BTREE,
  ADD KEY `category_ID_account` (`category`),
  ADD KEY `officer_position_account` (`uploadBy`);

--
-- 資料表索引 `account_comment`
--
ALTER TABLE `account_comment`
  ADD PRIMARY KEY (`accountID`,`commentID`);

--
-- 資料表索引 `attendees`
--
ALTER TABLE `attendees`
  ADD PRIMARY KEY (`conference`,`attendees`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- 資料表索引 `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `sID_comment` (`sID`);

--
-- 資料表索引 `conference`
--
ALTER TABLE `conference`
  ADD PRIMARY KEY (`ID`,`category`) USING BTREE,
  ADD KEY `category_ID_conference` (`category`),
  ADD KEY `recorder` (`recorder`),
  ADD KEY `host` (`host`);

--
-- 資料表索引 `conference_comment`
--
ALTER TABLE `conference_comment`
  ADD PRIMARY KEY (`conferenceID`,`commentID`);

--
-- 資料表索引 `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`statement`,`account`);

--
-- 資料表索引 `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `who` (`who`);

--
-- 資料表索引 `events_member`
--
ALTER TABLE `events_member`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `sID_events` (`sID`);

--
-- 資料表索引 `statement`
--
ALTER TABLE `statement`
  ADD PRIMARY KEY (`ID`) USING BTREE,
  ADD KEY `officer_position_statement` (`uploadBy`),
  ADD KEY `category_ID_statement` (`category`);

--
-- 資料表索引 `statement_comment`
--
ALTER TABLE `statement_comment`
  ADD PRIMARY KEY (`statementID`,`commentID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `account`
--
ALTER TABLE `account`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comment`
--
ALTER TABLE `comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `conference`
--
ALTER TABLE `conference`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `events_member`
--
ALTER TABLE `events_member`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `statement`
--
ALTER TABLE `statement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
