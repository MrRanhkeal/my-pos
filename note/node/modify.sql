-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'amazon','hot_drink',1,'2024-12-04 15:18:13','ranh',0),(13,'green tea','soft_drink',1,'2025-04-03 14:41:22',NULL,0),(14,'coffee','soft_drink',1,'2025-04-03 14:41:54',NULL,0),(17,'blue tea','tea',1,'2025-04-16 15:14:16',NULL,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (4,'borith','012-12-13-13','borith@gmail.com','SHV','cust',NULL,'2025-04-16 16:29:15'),(6,'dara','015045421','dara@gmail.com','st131','staff',NULL,'2025-04-17 06:28:42');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `invoice_date` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `total_amount` decimal(7,2) DEFAULT NULL,
  `tax_amount` decimal(7,2) DEFAULT NULL,
  `disconnect_amount` decimal(7,2) DEFAULT NULL,
  `payment_method` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `paid_date` datetime DEFAULT NULL,
  `payment_status` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `discount` decimal(7,2) DEFAULT NULL,
  `total` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,32,NULL,1,2.00,0.00,2.00),(2,33,NULL,1,4.00,0.00,4.00),(3,34,8,1,2.00,0.00,2.00),(4,35,14,1,2.00,0.00,2.00),(5,35,12,1,2.00,0.00,2.00),(6,36,14,1,2.00,0.00,2.00),(7,36,19,1,2.00,0.00,2.00),(8,37,NULL,1,2.00,0.00,2.00),(9,38,9,1,4.00,0.00,4.00),(10,38,19,1,2.00,0.00,2.00),(11,39,14,1,2.00,0.00,2.00),(12,39,19,1,2.00,0.00,2.00),(13,40,12,1,2.00,0.00,2.00),(14,40,15,1,2.00,0.00,2.00),(15,41,12,1,2.00,0.00,2.00),(16,41,16,1,1.50,0.00,1.50),(17,42,9,1,4.00,0.00,4.00),(18,42,14,1,2.00,0.00,2.00),(19,42,16,1,1.50,0.00,1.50),(20,43,8,1,2.00,0.00,2.00),(21,43,16,1,1.50,0.00,1.50),(22,43,15,1,2.00,0.00,2.00),(23,43,14,1,2.00,0.00,2.00),(24,43,19,1,2.00,0.00,2.00),(25,44,8,1,2.00,0.00,2.00),(26,44,14,1,2.00,0.00,2.00),(27,44,15,1,2.00,0.00,2.00),(28,44,16,1,1.50,0.00,1.50),(29,44,19,1,2.00,0.00,2.00),(30,45,8,1,2.00,0.00,2.00),(31,45,14,1,2.00,0.00,2.00),(32,45,15,1,2.00,0.00,2.00),(33,45,16,1,1.50,0.00,1.50),(34,46,9,1,2.00,0.00,2.00),(35,46,16,1,1.50,0.00,1.50),(36,47,8,1,1.25,0.00,1.25),(37,48,8,1,1.25,0.00,1.25);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `customer_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `paid_amount` decimal(7,2) NOT NULL DEFAULT '0.00',
  `payment_method` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,'INV005',4,8,0.00,'Crypto',NULL,'ranh','2025-04-18 18:39:11',2.00),(6,'INV006',4,8,0.00,'Crypto',NULL,'ranh','2025-04-18 18:49:50',4.00),(7,'INV007',6,8,0.00,'Crypto',NULL,'ranh','2025-04-18 18:55:03',2.00),(8,'INV008',6,8,0.00,'Cash',NULL,'ranh','2025-04-18 18:58:13',2.00),(9,'INV009',4,16,0.00,'Cash','0','lan','2025-04-18 18:59:45',2.00),(10,'INV010',4,8,0.00,'Crypto',NULL,'ranh','2025-04-19 04:17:04',4.00),(11,'INV011',4,8,0.00,'Crypto','0','ranh','2025-04-19 05:10:51',4.00),(12,'INV012',4,8,0.00,'Cash','0','ranh','2025-04-19 06:02:48',2.00),(13,'INV013',4,8,0.00,'Cash','0','ranh','2025-04-19 06:33:42',4.00),(14,'INV014',4,8,0.00,'Cash','0','ranh','2025-04-19 11:52:51',2.00),(15,'INV015',4,8,0.00,'Cash','0','ranh','2025-04-19 14:25:07',2.00),(16,'INV016',4,8,0.00,'Cash','0','ranh','2025-04-19 14:26:20',2.00),(17,'INV017',6,8,0.00,'Cash','0','ranh','2025-04-19 14:27:28',8.00),(18,'INV018',4,8,0.00,'Cash','0','ranh','2025-04-19 14:29:01',8.00),(19,'INV019',4,8,0.00,'Cash','0','ranh','2025-04-19 14:29:27',4.00),(20,'INV020',4,8,0.00,'Cash','0','ranh','2025-04-19 14:30:44',4.00),(21,'INV021',4,8,0.00,'Cash','0','ranh','2025-04-19 14:32:01',2.00),(22,'INV022',4,8,0.00,'Cash','0','ranh','2025-04-19 15:32:01',2.00),(23,'INV023',4,8,0.00,'Crypto','0','ranh','2025-04-19 15:42:01',8.00),(24,'INV024',4,8,0.00,'Cash','0','ranh','2025-04-19 15:53:56',14.00),(25,'INV025',4,8,0.00,'Cash','2','ranh','2025-04-19 15:54:34',2.00),(26,'INV026',4,8,0.00,'Cash',NULL,'ranh','2025-04-19 16:03:22',6.00),(27,'INV027',4,8,0.00,'Cash',NULL,'ranh','2025-04-19 16:16:08',10.00),(28,'INV028',4,8,0.00,'Cash','0','ranh','2025-04-20 05:37:25',2.00),(29,'INV029',4,8,0.00,'Crypto','2.0','ranh','2025-04-20 09:35:24',4.00),(30,'INV030',4,8,0.00,'ABA','0','ranh','2025-04-20 15:59:38',2.00),(31,'INV031',4,8,0.00,'ABA','0','ranh','2025-04-20 16:04:30',6.00),(32,'INV032',4,8,0.00,'Cash','0','ranh','2025-04-20 16:30:43',2.00),(33,'INV033',4,8,0.00,'Cash','0','ranh','2025-04-20 16:34:48',4.00),(34,'INV034',4,8,0.00,'Cash','0','ranh','2025-04-20 17:37:21',2.00),(35,'INV035',4,16,0.00,'Cash','0','lan','2025-04-20 17:42:04',4.00),(36,'INV036',4,16,0.00,'Cash','0','lan','2025-04-20 17:42:27',4.00),(37,'INV037',4,16,0.00,'Cash','0','lan','2025-04-20 17:50:12',2.00),(38,'INV038',4,16,6.00,'ABA',NULL,'lan','2025-04-20 17:54:55',6.00),(39,'INV039',6,16,3.00,'Cash','0','lan','2025-04-20 18:01:30',4.00),(40,'INV040',4,16,5.00,'Cash','0','lan','2025-04-20 18:06:15',4.00),(41,'INV041',4,1,3.50,'Crypto','0','ranh','2025-04-21 15:03:05',4.00),(42,'INV042',4,1,7.50,'Crypto','0','ranh','2025-04-21 15:04:01',8.00),(43,'INV043',6,1,9.50,'ABA','0','ranh','2025-04-21 15:04:43',10.00),(44,'INV044',6,1,10.00,'Crypto','0','ranh','2025-04-21 15:10:48',10.00),(45,'INV045',4,1,7.50,'Crypto','0','ranh','2025-04-21 15:12:25',8.00),(46,'INV046',4,1,3.50,'Cash','0','ranh','2025-04-21 15:13:49',4.00),(47,'INV047',4,1,1.25,'Cash','0','ranh','2025-04-21 15:14:56',1.00),(48,'INV048',6,1,1.25,'Crypto','0','ranh','2025-04-21 15:28:34',1.25);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,8,'upload_image_optional-1744737368259-84761076'),(2,16,'upload_image_optional-1744738483927-887238508'),(3,16,'upload_image_optional-1744739983683-540398848');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `productype_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` blob,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `product_type_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`productype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'coffe',NULL,'2025-01-27 06:14:53','coffee');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `barcode` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `brand` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `qty` int NOT NULL DEFAULT '0',
  `price` decimal(7,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) DEFAULT '1',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `discount` decimal(5,2) NOT NULL DEFAULT '0.00',
  `productype_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `productype_id` (`productype_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`productype_id`) REFERENCES `product_type` (`productype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (8,1,'123','coffee','mondolkiri','coffee',4,1.25,1,'upload_image-1745073538026-552290675','admin','2025-01-27 06:27:48',0.00,1),(9,13,'123','tea','mondolkiri','soft_drink',7,2.00,1,'upload_image-1745073557495-797544134','ranh','2025-04-04 05:44:16',0.00,1),(12,13,'123','green tea','arabia','hot drink',7,2.00,1,'upload_image-1745073625266-330630551','ranh','2025-04-09 16:37:32',0.00,NULL),(14,1,'P014','black_coffee','arabia','coffee',3,2.00,1,'upload_image-1745073636578-81175154','ranh','2025-04-15 15:51:50',0.00,NULL),(15,1,'P015','amazon','arabia','coffee',6,2.00,1,'upload_image-1745073658691-453329945','ranh','2025-04-15 17:19:56',0.00,NULL),(16,13,'P016','blue tea','green-tea','tea',4,1.25,1,'upload_image-1745073806980-119492351','ranh','2025-04-15 17:20:58',0.00,NULL),(19,1,'P017','amz','arabia','test',5,2.00,1,'upload_image-1745077744859-854754053','ranh','2025-04-19 15:49:04',0.00,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `shipp_company` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ship_cost` decimal(7,2) DEFAULT NULL,
  `paid_amount` decimal(7,2) DEFAULT NULL,
  `paid_date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,1,'admin',1.00,1.00,'2025-01-01 00:00:00',1,NULL);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_products`
--

DROP TABLE IF EXISTS `purchase_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `cost` decimal(7,2) DEFAULT NULL,
  `discount` decimal(7,2) DEFAULT NULL,
  `amount` decimal(7,2) DEFAULT NULL,
  `retail_price` decimal(7,2) DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` tinyint(1) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `purchase_products_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`purchase_id`),
  CONSTRAINT `purchase_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_products`
--

LOCK TABLES `purchase_products` WRITE;
/*!40000 ALTER TABLE `purchase_products` DISABLE KEYS */;
INSERT INTO `purchase_products` VALUES (4,1,NULL,1,1.00,1.00,1.00,1.00,'admin',1,NULL);
/*!40000 ALTER TABLE `purchase_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `permissions` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','{\"all\": true}','2025-04-19 18:17:02','2025-04-19 18:17:02'),(2,'Cashier','{\"pos\": true, \"orders\": true}','2025-04-19 18:17:02','2025-04-19 18:17:02');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  `code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'admin','012-13-14-15','admin@gmail.com','pp','supplier',NULL,'kh-101');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'ranh','kealranh@gmail.com','$2b$10$df5aGiBAXhh8jWvcN2iOCO9EU3kqwkoeN2VTdCW11PMgTeA3YTLqa',1,'ranh','2024-12-11 15:32:21'),(2,2,'dara','dara@gmail.com','$2b$10$HQ.pQ.YB1ki9303rOF/78eQGLWiOQ56FVP1FoXlYdil2Y4Zv1796i',1,'ranh','2024-12-11 15:33:49'),(3,2,'nana','nana@gmail.com','$2b$10$Rkeegf/9FqYempPwo4RcLu.kLBUqH0Xe8FW5bpbgQgJmf3Kl2vjhe',1,'ranh','2024-12-26 17:43:05'),(4,2,'lan','jinlan@gmail.com','$2b$10$PM4.tB0LPpk4VFlPCZk/SuwG0FOv6DAXApScLCHEX4irmnZ3Id192',1,'Admin','2024-12-27 06:37:49'),(5,2,'sokha','sokha@gmail.com','$2b$10$/xz.OeYt81i1Deb2nxVIJ.eGvTOmmFvuqcyp.Xdsq/Fo0JObOKHmK',1,'ranh','2025-01-11 13:02:17'),(6,2,'lan','lan@gmail.com','$2b$10$.RrVBkUTjO2wouLSB/Z7D.uJIegaLLM2V/uYTSDZ80p6LAAohsDTS',1,'ranh','2025-01-20 17:19:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 22:29:55
