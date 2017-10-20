CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(245) NOT NULL,
  `phone` int(10) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(4) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `is_billing` tinyint(1) NOT NULL,
  `is_shipping` tinyint(1) NOT NULL,
  `created_date` varchar(45) NOT NULL,
  `updated_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=882 DEFAULT CHARSET=utf8;

CREATE TABLE `bags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buid` varchar(36) NOT NULL,
  `email` varchar(245) NOT NULL,
  `gender` varchar(140) NOT NULL,
  `size` varchar(500) NOT NULL,
  `quantity` smallint(9) NOT NULL,
  `release` smallint(9) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1992 DEFAULT CHARSET=utf8;

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(245) NOT NULL,
  `reason` varchar(50) NOT NULL,
  `comments` varchar(500) NOT NULL,
  `created_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8;

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `size` varchar(4) NOT NULL,
  `color` varchar(20) NOT NULL,
  `sex` varchar(2) NOT NULL,
  `quantity` smallint(9) NOT NULL,
  `release` decimal(3,2) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product` varchar(245) NOT NULL,
  `gender` varchar(140) NOT NULL,
  `size` varchar(500) NOT NULL,
  `quantity` smallint(9) NOT NULL,
  `created_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(245) NOT NULL,
  `created_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

CREATE TABLE `orders_order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `orders_order_status` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `orders_payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `step` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `created_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

CREATE TABLE `preorders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(245) NOT NULL,
  `preorder` varchar(10) NOT NULL,
  `size` varchar(4) NOT NULL,
  `reason` varchar(140) NOT NULL,
  `release` smallint(9) NOT NULL,
  `created_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=402 DEFAULT CHARSET=utf8;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(245) NOT NULL,
  `price` varchar(245) NOT NULL,
  `quantity` smallint(9) NOT NULL,
  `release` decimal(3,2) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8;
