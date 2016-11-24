-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 24, 2016 at 07:50 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aprtmentFinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `flatimage`
--

CREATE TABLE `flatimage` (
  `id` int(20) NOT NULL,
  `path` varchar(200) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `flatimage`
--

INSERT INTO `flatimage` (`id`, `path`, `name`) VALUES
(7, 'IMG_20150408_205322.jpg', 'front'),
(7, 'IMG_20141022_224608.jpg', 'show'),
(8, 'image.jpg', 'front'),
(8, 'p61.png', 'side'),
(9, 'p62.png', 'front'),
(7, 'p62.png', 'pqr');

-- --------------------------------------------------------

--
-- Table structure for table `flatinfo`
--

CREATE TABLE `flatinfo` (
  `id` int(20) NOT NULL,
  `username` varchar(25) NOT NULL,
  `address` varchar(100) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `tags` varchar(250) NOT NULL,
  `rad` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `flatinfo`
--

INSERT INTO `flatinfo` (`id`, `username`, `address`, `lat`, `lon`, `tags`, `rad`) VALUES
(7, 'sagarkbhatt', 'B-10 , Wadianagar soc.,\nNr.nagardas hall,\nAdajan', '21.1925707', '72.79973559999996', 'nirma university', '15'),
(8, 'jenil', '16-Krupa apt\nThaltej', '23.0497364', '72.51172410000004', 'nirma university 3-bhk full-furnished', '15'),
(9, 'sagarkbhatt', 'Qwiches surat', '21.149186', '72.79778390000001', 'nirma university full-furnished', '15');

--
-- Triggers `flatinfo`
--
DELIMITER $$
CREATE TRIGGER `blog_after_insert` AFTER INSERT ON `flatinfo` FOR EACH ROW BEGIN
	
    
		INSERT INTO verify ( flatid,verfied,doc) VALUES (NEW.id,'false','NULL');
		
    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `username` varchar(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `ph` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `pwd` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`username`, `name`, `ph`, `email`, `pwd`) VALUES
('jenil', 'jenil calc', '99099125128', 'jenil@gmail.com', 'jenil'),
('sagarkbhatt', 'sagar', '7878893556', 'sagarkbhatt@yahoo.com', 'sagar');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tags` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tags`) VALUES
(1, '3-BHK'),
(2, '2-BHK'),
(3, '1-BHK'),
(4, 'FULL FURNISHED'),
(5, 'SEMI FURNISHED');

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `id` int(10) NOT NULL,
  `flatid` int(20) NOT NULL,
  `verfied` varchar(10) NOT NULL,
  `doc` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `verify`
--

INSERT INTO `verify` (`id`, `flatid`, `verfied`, `doc`) VALUES
(3, 7, 'true', 'p62.png'),
(4, 8, 'false', 'NULL'),
(5, 9, 'true', 'Screenshot from 2016-09-21 12-55-22.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flatinfo`
--
ALTER TABLE `flatinfo`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `flatinfo` ADD FULLTEXT KEY `tag` (`tags`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verify`
--
ALTER TABLE `verify`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flatinfo`
--
ALTER TABLE `flatinfo`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `verify`
--
ALTER TABLE `verify`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
