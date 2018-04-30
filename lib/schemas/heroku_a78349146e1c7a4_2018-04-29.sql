# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: us-iron-auto-dca-05-b.cleardb.net (MySQL 5.6.36-log)
# Database: heroku_a78349146e1c7a4
# Generation Time: 2018-04-29 23:55:50 +0000
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
  `username` varchar(245) NOT NULL DEFAULT '',
  `email` varchar(245) NOT NULL,
  `password` varchar(1000) NOT NULL DEFAULT '',
  `is_valid` tinyint(1) NOT NULL,
  `is_subscribed` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;

INSERT INTO `accounts` (`id`, `username`, `email`, `password`, `is_valid`, `is_subscribed`, `created_date`, `updated_date`)
VALUES
	(0,'jonny','','$2a$10$UcFim58gl4nFSIXkfCBVaOpw1lS6MRCnv1nSEbAzfa0yBBU8lcDgi',0,1,'2017-11-18 00:38:41','2017-11-18 00:39:12'),
	(1,'oli','','$2a$10$OF2XBOwUwzCuW2802d5VLu1so5jd4V4rXBMVF/dWLZa.18MNzANq2',0,1,'2017-11-18 00:40:28','2017-11-18 01:10:18'),
	(8,'public','','',0,0,'2018-04-04 05:26:59','2018-04-04 05:33:32'),
	(1982,'Jonny-5','jon.ortiz@me.com','$2a$10$tHgCEab9nvJUI7Hs.iYp2erDPcADSzBifCJ1jeRX74500kQeN/SVu',1,0,'2018-04-29 17:45:36','2018-04-29 18:50:11');

/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table accounts_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `accounts_roles`;

CREATE TABLE `accounts_roles` (
  `account_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `accounts_roles` WRITE;
/*!40000 ALTER TABLE `accounts_roles` DISABLE KEYS */;

INSERT INTO `accounts_roles` (`account_id`, `role_id`)
VALUES
	(0,0),
	(0,1),
	(0,2),
	(0,3),
	(0,4),
	(692,9);

/*!40000 ALTER TABLE `accounts_roles` ENABLE KEYS */;
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

LOCK TABLES `bags` WRITE;
/*!40000 ALTER TABLE `bags` DISABLE KEYS */;

INSERT INTO `bags` (`id`, `customer_id`, `created_date`, `updated_date`)
VALUES
	(62,0,'2018-03-17 09:08:56','2018-03-17 09:08:56'),
	(72,0,'2018-03-17 09:09:48','2018-03-17 09:09:48');

/*!40000 ALTER TABLE `bags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bags_bag_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bags_bag_items`;

CREATE TABLE `bags_bag_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bag_id` int(11) NOT NULL,
  `bag_item_id` int(11) NOT NULL,
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

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;

INSERT INTO `contacts` (`id`, `email`, `reason`, `comments`, `created_date`)
VALUES
	(62,'jon.ortiz@me.com','1','asdfasdfasdfasdfadsfdsf','2018-03-31 01:58:25'),
	(72,'jon.ortiz@me.com','2','asdfasdfasdfasdfasdf','2018-03-31 01:59:14'),
	(82,'jon.ortiz@me.com','1','asdfasdfasdfasdfasdf','2018-03-31 07:14:37'),
	(92,'jon.ortiz@me.com','1','asdfadsasdfasdfasdfadsf','2018-03-31 07:15:50'),
	(102,'jon.ortiz@me.com','1','asdfasdfasdfasdfasdf','2018-03-31 07:17:07'),
	(112,'jon.ortiz@me.com','2','asdfasdfasdfasdfasdf','2018-03-31 07:18:32'),
	(122,'jon.ortiz@me.com','1','bcbcvcbcvbcvbccbcbvbcb','2018-03-31 07:43:19'),
	(132,'jon.ortiz@me.com','2','asdasdfasdfasdfasdfasdf','2018-03-31 07:46:56'),
	(142,'jon.ortiz@me.com','6','sddsfsdfsdfsdfsdfsfsdf','2018-03-31 14:05:19');

/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;


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
  `product_code` varchar(10) NOT NULL DEFAULT '',
  `quantity` smallint(9) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;

INSERT INTO `inventory` (`id`, `product_code`, `quantity`, `created_date`, `updated_date`)
VALUES
	(1,'1xlvgrymr1',6,'2017-12-17 00:17:52','2018-03-16 08:36:03');

/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order_status
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_status`;

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `details` varchar(500) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table order_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_types`;

CREATE TABLE `order_types` (
  `id` int(11) NOT NULL,
  `type` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `order_types` WRITE;
/*!40000 ALTER TABLE `order_types` DISABLE KEYS */;

INSERT INTO `order_types` (`id`, `type`)
VALUES
	(1,'order'),
	(2,'preorder');

/*!40000 ALTER TABLE `order_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_type_id` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  `bag_id` int(11) NOT NULL,
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
  `category` varchar(45) NOT NULL DEFAULT '',
  `size` varchar(4) NOT NULL,
  `color` varchar(20) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `release` tinyint(4) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `code`, `name`, `details`, `price`, `category`, `size`, `color`, `gender`, `release`, `created_date`, `updated_date`)
VALUES
	(1,'1xlvgrymr1','Squeak','A unique graphic on soft tri-blend crew neck tee.',0.99,'t-shirt','xl','grey','m',1,'2017-12-16 23:53:06','2018-04-29 23:25:57');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`id`, `role`)
VALUES
	(0,'god'),
	(1,'admin'),
	(2,'user'),
	(3,'cust'),
	(4,'merch'),
	(5,'merch_admin'),
	(6,'merch_emp'),
	(7,'club_ownr'),
	(8,'club_mbr'),
	(9,'public');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table shop
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shop`;

CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(245) NOT NULL,
  `details` varchar(245) NOT NULL,
  `owner` int(11) NOT NULL,
  `category` varchar(45) NOT NULL DEFAULT '',
  `is_open` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
