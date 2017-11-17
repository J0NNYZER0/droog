# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: us-iron-auto-dca-05-b.cleardb.net (MySQL 5.6.36-log)
# Database: heroku_a78349146e1c7a4
# Generation Time: 2017-11-17 02:32:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table accounts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(245) NOT NULL,
  `password` varchar(245) NOT NULL,
  `is_subscribed` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;

INSERT INTO `accounts` (`id`, `user_name`, `password`, `is_subscribed`, `created_date`, `updated_date`)
VALUES
	(12,'jonny','0',0,'2017-11-16 17:56:33','2017-11-16 17:56:33');

/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table addresses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `addresses`;

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `email` varchar(245) NOT NULL,
  `phone` int(10) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(4) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `is_billing` tinyint(1) NOT NULL,
  `is_shipping` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;

INSERT INTO `addresses` (`id`, `customer_id`, `email`, `phone`, `address1`, `address2`, `city`, `state`, `zip`, `is_billing`, `is_shipping`, `created_date`, `updated_date`)
VALUES
	(882,456456,'jon.ortiz@me.com',2147483647,'3010 Ironside Court','','San Jose','CA','95132',1,1,'2017-11-06 17:18:28','2017-11-06 17:24:03'),
	(892,123123,'jon.ortiz@me.com',2147483647,'3010 Ironside Court','','Cupertino','CA','95050',1,1,'2017-11-06 18:19:51','2017-11-06 18:19:51');

/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bag_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bag_items`;

CREATE TABLE `bag_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bag_id` int(11) NOT NULL,
  `inventory_id` int(11) NOT NULL,
  `quantity` smallint(9) NOT NULL,
  `type` varchar(10) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table bags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bags`;

CREATE TABLE `bags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table contacts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(245) NOT NULL,
  `reason` varchar(50) NOT NULL,
  `comments` varchar(500) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(245) NOT NULL,
  `last_name` varchar(245) NOT NULL,
  `email` varchar(245) NOT NULL,
  `phone` int(10) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table customers_orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers_orders`;

CREATE TABLE `customers_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table inventory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` smallint(9) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table order_status
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_status`;

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `step` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `details` varchar(500) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bag_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table payments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `pp_id` varchar(140) NOT NULL,
  `intent` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `cart` varchar(45) NOT NULL,
  `created_time` varchar(45) NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  `status` varchar(25) NOT NULL,
  `email` varchar(245) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `middle_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `payer_id` varchar(45) NOT NULL,
  `country_code` varchar(4) NOT NULL,
  `shipping_recipient_name` varchar(100) NOT NULL,
  `shipping_line1_street` varchar(100) NOT NULL,
  `shipping_line2_street` varchar(100) NOT NULL,
  `shipping_city` varchar(50) NOT NULL,
  `shipping_state` varchar(4) NOT NULL,
  `shipping_postal_code` varchar(10) NOT NULL,
  `shipping_country_code` varchar(4) NOT NULL,
  `transaction_total` varchar(10) NOT NULL,
  `transaction_currency` varchar(5) NOT NULL,
  `sale_id` varchar(32) NOT NULL,
  `sale_state` varchar(20) NOT NULL,
  `sale_payment_mode` varchar(45) NOT NULL,
  `sale_protection_eligibility` varchar(20) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(245) NOT NULL,
  `details` varchar(245) NOT NULL,
  `price` decimal(2,2) NOT NULL,
  `size` varchar(4) NOT NULL,
  `color` varchar(20) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `release` decimal(3,2) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`id`, `role`)
VALUES
	(22,'admin'),
	(32,'user'),
	(42,'customer'),
	(52,'merchant');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(245) NOT NULL,
  `password` varchar(245) NOT NULL,
  `is_subscribed` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `user_name`, `password`, `is_subscribed`, `created_date`, `updated_date`)
VALUES
	(272,'jonny','000',1,'2017-11-06 19:11:12','2017-11-14 22:43:28'),
	(281,'tootsmcgee','funkystarfish',1,'2017-11-16 03:20:02','2017-11-16 03:20:02');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
