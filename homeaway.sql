-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 07:43 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `booked_property`
--

CREATE TABLE `booked_property` (
  `bookid` int(255) NOT NULL,
  `pid` int(255) NOT NULL,
  `block_to` varchar(255) NOT NULL,
  `block_from` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booked_property`
--

INSERT INTO `booked_property` (`bookid`, `pid`, `block_to`, `block_from`, `email`) VALUES
(9, 25, '2019-02-05', '2019-02-02', 'reeya@yahoo.com'),
(10, 23, '2018-10-17', '2018-10-11', 'reeya@yahoo.com');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `pid` int(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  `headline` longtext NOT NULL,
  `description` varchar(255) NOT NULL,
  `apt_type` varchar(255) NOT NULL,
  `bedrooms` varchar(255) NOT NULL,
  `accomodates` int(255) NOT NULL,
  `bathrooms` varchar(255) NOT NULL,
  `images` varchar(500) NOT NULL,
  `availablefrom` varchar(255) NOT NULL,
  `availabletill` varchar(255) NOT NULL,
  `rent` varchar(255) NOT NULL,
  `owner_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`pid`, `country`, `street`, `city`, `state`, `zipcode`, `headline`, `description`, `apt_type`, `bedrooms`, `accomodates`, `bathrooms`, `images`, `availablefrom`, `availabletill`, `rent`, `owner_email`) VALUES
(12, 'USA', '201 ', 'San Jose', 'CA', '95112', 'HAPPY', 'property descp', 'townhome', '5', 5, '5', '[\"7.jpg\",\"8.jpg\"]', '2018-10-30', '2018-11-07', '588', 'k@g.com'),
(22, 'United state', 'Lakeview #342', 'Chicago', 'Illinois', '98755', 'Hip 2BR-C at The Plymouth by Sonder', 'Lakeview, aAt this Sonder, you\'ll love the modern interior design, fully-equipped kitchen with stainless steel appliances, and private gym in the building. Staying at The Plymouth in the South Loop, you\'re nearby local restaurants and just a few blocks aw', 'estate', '2', 4, '1', '[\"7.jpg\",\"8.jpg\",\"10.jpg\"]', '2018-10-10', '2018-10-25', '145', 'k@g.com'),
(23, 'United States', '201S 4th Street #716', 'San Jose', 'CA', '95112', 'Gold Coast, Celebrity Themed!!', '7 gorgeous units! Celebrity themed..The first three floors are made up of a one bedroom and a studio and the fourth floor is a two bedroom suite. A common area downstairs that leads to the back garden area with fire and water feature. ', 'estate', '1', 2, '1', '[\"15.jpg\",\"17.jpg\",\"18.jpg\",\"19.jpg\",\"20.jpg\"]', '2018-10-08', '2018-12-31', '150', 'reeya@gmail.com'),
(24, 'United States', '5th Street Dunford Way', 'Los Angeles', 'CA', '95875', 'Modern Studio | WiFi + Gym', 'Just a short ride from the iconic Magnificent Mile on Michigan Avenue and the nightlife of Rush Street, this stunning apartment-suite is perfect for travelers who seek top entertainment and cultural experiences.', 'house', '2', 5, '1', '[\"7.jpg\",\"8.jpg\",\"11.jpg\",\"12.jpg\"]', '2018-10-09', '2019-07-11', '187', 'reeya@gmail.com'),
(25, 'United States', 'West Town, #56', 'Chicago', 'Illinois', '52458', 'Urban Glamour in a great neighborhood', 'Charming and unique loft like space in the heart of West Town! Its located on the top floor of building and has lots of windows with great views. There a number of hot new restaurants/bars/brewery that are walkable. ', 'Bunglow', '2', 6, '2', '[\"21.jpg\",\"22.jpg\",\"23.jpg\",\"24.jpg\",\"25.jpg\"]', '2018-12-11', '2019-06-13', '255', 'reeya@gmail.com'),
(26, 'United States', 'Rush & Division #35', 'New York', 'New York', '54585', 'Hidden Gem - Gold Coast', '2 private bedrooms and 2 private baths. Gourmet Kitchen. Family room with pull out queen bed. WIFI and Sonos sound bar, laundry and location is close to lake shopping and dining. Quiet street walking distance to most attractions easy access . ', 'Tower', '2', 6, '2.5', '[\"27.jpg\",\"29.jpg\",\"30.jpg\"]', '2018-12-27', '2019-04-08', '500', 'lucy@g.com'),
(27, 'United States', 'Gemeli Park,', 'Los Angeles', 'CA', '656', 'Luxury 1 Bedroom Home', 'Luxurious completely renovated community featuring a one bedroom/one bath apartment home that sleeps four comfortably. Walking distance to restaurants and shops. The unit includes private parking, hardwood floors, central AC/heating, new kitchen, front lo', 'Tower', '1', 3, '1', '[\"31.jpg\",\"32.jpg\",\"33.jpg\"]', '2018-10-09', '2018-11-29', '130', 'lucy@g.com'),
(28, 'United States', '33rd S Street', 'Los Angeles', 'CA', '55212', 'Hollywood and Sunset!!!', 'Just below Hollywood Blvd. and steps away from the Famous Sunset Strip. Charming privately gated backyard Guest House. An historic California Craftsman property built in 1913. Totally remodeled with Professionally decorated interiors. ', 'Bunglow', '3', 9, '3', '[\"34.jpg\",\"35.jpg\",\"36.jpg\",\"37.jpg\"]', '2018-12-01', '2019-02-14', '800', 'jim@gmail.com'),
(29, 'United States', 'Balboa Peninsula #344', 'Los Angeles', 'CA', '524545', ' Popular Newport Dream Vacation Home', 'This 1-bedroom/1-bath rear downstairs unit on the Newport Beach Peninsula is newly renovated, immaculate and stylish. This is the right space for a refreshing beach getaway, surrounded by all the modern conveniences, such as central air conditioning, flat', 'cabin', '1', 4, '1', '[\"38.jpg\",\"39.jpg\",\"40.jpg\"]', '2018-10-17', '2018-12-13', '180', 'jim@gmail.com'),
(30, 'United States', 'Gold coats', 'Chicago', 'Illinois', '55465', 'Downstairs Beachside Getaway', 'This downstairs unit is fully furnished and stocked with everything you would need for a hassle-free, memorable vacation year-round! In the summer months, bookings are available on a weekly basis only (Saturday to Saturday) and a 3 night minimum in the of', 'farmhouse', '2', 5, '2', '[\"41.jpg\",\"42.jpg\",\"43.jpg\"]', '2019-01-31', '2019-04-10', '250', 'jim@gmail.com'),
(31, 'United State', '5th Plaza', 'San jose', 'California', '95112', 'Glamourous Hotel', 'Professionally designed hotel for maximum comfort and happy stay.', 'hotel suites', '1', 2, '1', '[\"7.jpg\",\"15.jpg\",\"16.jpg\"]', '2018-10-11', '2018-12-20', '100', 'reeya@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `uid` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `hometown` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `phoneno` varchar(10) DEFAULT NULL,
  `flag` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`uid`, `email`, `password`, `firstname`, `lastname`, `description`, `country`, `company`, `school`, `hometown`, `languages`, `gender`, `city`, `image`, `phoneno`, `flag`) VALUES
(27, 'ank@g.com', '$2a$10$tsR4tJ5RnpRaMO7vjZSi8OfnfTDuC4QbswIq3gLm0cC620yCAdixW', 'Ankita', 'Sadhu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'T'),
(30, 'jack@g.com', '$2a$10$SD7w0hYDcwUVa5Zfn1dtrO9rm6A5BxONRBL2gpXE/taPuUJyT5iMC', 'Jack', 'Perry', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'T'),
(34, 'jim@gmail.com', '$2a$10$ZYvjPAiX3SvNwY/JTLaRiujoa7YlBsu57/X7494h4/j9CxuROoDZi', 'Jim', 'Shen', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'O'),
(29, 'john@g.com', '$2a$10$tTjm6fE9MBwrcmC2s8FcPu2nevEAfRLhwEOvXrw5cByNPOETdTJqi', 'John', 'Mathew', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'T'),
(31, 'k@g.com', '$2a$10$4PXWNyqM.Ghl7VesOnjr/uxubss612AwUYVJ.fGzgASxjIjGxZNTe', 'Kavita', 'Morad', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'O'),
(33, 'lucy@g.com', '$2a$10$zDAnEgdHaYin4NyecTxJn.1b5x/vfKET6e7zHSznm5CA9PlNa8Yaq', 'Lucy', 'Penny', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'O'),
(35, 'mike@g.com', '$2a$10$YPVl1h2m8hB9O79yhbft1.uGjNIev1ypvAy52jwaE3EENB2ELVIuW', 'Mike', 'Hannigan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'O'),
(25, 'p@g.com', '$2a$10$dn7MFOC3nDCkleETBkOoT.CIt7i2yYABaAxJg7DSWCsBfMEKRbgN2', 'Preksha', 'Bhutani', 'MS in SE', 'USA', 'Google', 'SJSU', 'Ahmedabad', 'English', 'Female', 'San Jose', '2.jpg', '9998750333', 'T'),
(26, 'r@g.com', '$2a$10$cOYDH.QvpSWQ5sgYh/UqWetcRm8VNLjJd3N77HG6pz9g9AZsjRTfC', 'Rual', 'Patel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'T'),
(32, 'reeya@gmail.com', '$2a$10$Z1VudmSCAWjNQxyHbyqn6OhAm40K2.jAaxe8JaiIp4n0HW0vbYaYW', 'Reeya', 'Vani', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'O'),
(36, 'reeya@yahoo.com', '$2a$10$CfDtKwyUpAHPUtMpXIBP5.sx9K51iluINWUKr1UMMGBIeHlL8zCnC', 'Reeya', 'Vani', 'Student in MS SE', 'USA', 'SJSU', 'St. kabir', 'Ahmedabad', 'English', 'Female', 'San Jose', '2.jpg', '', 'T'),
(28, 't@g.com', '$2a$10$PiPzsKvLDgMtv3WP3Jo6b.wSJHWBRDrDwr0wymQgAXawE1miNyYXG', 'Tanmay', 'Shah', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'T');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booked_property`
--
ALTER TABLE `booked_property`
  ADD PRIMARY KEY (`bookid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `street` (`street`),
  ADD KEY `ForeigKey` (`owner_email`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booked_property`
--
ALTER TABLE `booked_property`
  MODIFY `bookid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `pid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `uid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booked_property`
--
ALTER TABLE `booked_property`
  ADD CONSTRAINT `booked_property_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `property` (`pid`),
  ADD CONSTRAINT `booked_property_ibfk_2` FOREIGN KEY (`email`) REFERENCES `userinfo` (`email`);

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `ForeigKey` FOREIGN KEY (`owner_email`) REFERENCES `userinfo` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
