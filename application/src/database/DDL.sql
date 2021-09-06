-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: covid-reservation-system
-- ------------------------------------------------------
-- Server version       8.0.21

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
-- Table structure for table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslot`
--

LOCK TABLES `timeslot` WRITE;
/*!40000 ALTER TABLE `timeslot` DISABLE KEYS */;
INSERT INTO `timeslot` VALUES (1,'10-12'),(2,'2-4'),(3,'4-6'),(4,'6-8');
/*!40000 ALTER TABLE `timeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_vaccine_status`
--

DROP TABLE IF EXISTS `user_vaccine_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_vaccine_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nic` varchar(255) NOT NULL,
  `vaccineSlotId` int DEFAULT NULL,
  `status` enum('PENDING','COMPLETED') DEFAULT NULL,
  `selectedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_vaccine_status_nic` (`nic`),
  KEY `vaccineSlotId` (`vaccineSlotId`),
  CONSTRAINT `user_vaccine_status_ibfk_1` FOREIGN KEY (`vaccineSlotId`) REFERENCES `vaccine_center_availability` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_vaccine_status`
--

LOCK TABLES `user_vaccine_status` WRITE;
/*!40000 ALTER TABLE `user_vaccine_status` DISABLE KEYS */;
INSERT INTO `user_vaccine_status` VALUES (5,'G3678177W',88,'PENDING','2021-09-18 12:53:00');
/*!40000 ALTER TABLE `user_vaccine_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine_center`
--

DROP TABLE IF EXISTS `vaccine_center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine_center` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine_center`
--

LOCK TABLES `vaccine_center` WRITE;
/*!40000 ALTER TABLE `vaccine_center` DISABLE KEYS */;
INSERT INTO `vaccine_center` VALUES ('D1','Bedok Community Centre'),('D10','Potong Pasir Community Club'),('D2','Arena @ OTH'),('D3','Tampines East Community Center'),('D4','Marine Parade Community Club'),('D5','Wisma Geylang Serai'),('D6','Pasir Ris Elias Community Club'),('D7','Hougang Community Club'),('D8','Changi Airport Terminal 4 (Arrival Hall)'),('D9','Kolam Ayer Community Club');
/*!40000 ALTER TABLE `vaccine_center` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine_center_availability`
--

DROP TABLE IF EXISTS `vaccine_center_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine_center_availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vaccineCenterId` varchar(255) DEFAULT NULL,
  `timseSlotId` int DEFAULT NULL,
  `date` datetime NOT NULL,
  `count` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vaccine_center_availability_vaccine_center_id_timse_slot_id_date` (`vaccineCenterId`,`timseSlotId`,`date`),
  KEY `timseSlotId` (`timseSlotId`),
  CONSTRAINT `vaccine_center_availability_ibfk_1` FOREIGN KEY (`vaccineCenterId`) REFERENCES `vaccine_center` (`id`),
  CONSTRAINT `vaccine_center_availability_ibfk_2` FOREIGN KEY (`timseSlotId`) REFERENCES `timeslot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine_center_availability`
--

LOCK TABLES `vaccine_center_availability` WRITE;
/*!40000 ALTER TABLE `vaccine_center_availability` DISABLE KEYS */;
INSERT INTO `vaccine_center_availability` VALUES (1,'D1',1,'2021-09-01 00:00:00',10),(2,'D2',1,'2021-09-01 00:00:00',10),(3,'D3',1,'2021-09-01 00:00:00',10),(4,'D4',1,'2021-09-01 00:00:00',10),(5,'D5',1,'2021-09-01 00:00:00',10),(6,'D6',1,'2021-09-01 00:00:00',10),(7,'D7',1,'2021-09-01 00:00:00',10),(8,'D8',1,'2021-09-01 00:00:00',10),(9,'D9',1,'2021-09-01 00:00:00',10),(10,'D10',1,'2021-09-01 00:00:00',20),(11,'D1',2,'2021-09-01 00:00:00',25),(12,'D2',2,'2021-09-01 00:00:00',25),(13,'D3',2,'2021-09-01 00:00:00',30),(14,'D4',2,'2021-09-01 00:00:00',10),(15,'D5',2,'2021-09-01 00:00:00',20),(16,'D6',2,'2021-09-01 00:00:00',20),(17,'D7',2,'2021-09-01 00:00:00',20),(18,'D8',2,'2021-09-01 00:00:00',20),(19,'D9',2,'2021-09-01 00:00:00',20),(20,'D10',2,'2021-09-01 00:00:00',10),(21,'D1',3,'2021-09-01 00:00:00',30),(22,'D2',3,'2021-09-01 00:00:00',10),(23,'D3',3,'2021-09-01 00:00:00',20),(24,'D4',3,'2021-09-01 00:00:00',20),(25,'D5',3,'2021-09-01 00:00:00',25),(26,'D6',3,'2021-09-01 00:00:00',10),(27,'D7',3,'2021-09-01 00:00:00',10),(28,'D8',3,'2021-09-01 00:00:00',25),(29,'D9',3,'2021-09-01 00:00:00',20),(30,'D10',3,'2021-09-01 00:00:00',10),(31,'D1',1,'2021-09-07 00:00:00',25),(32,'D2',1,'2021-09-07 00:00:00',30),(33,'D3',1,'2021-09-07 00:00:00',10),(34,'D4',1,'2021-09-07 00:00:00',20),(35,'D5',1,'2021-09-07 00:00:00',20),(36,'D6',1,'2021-09-07 00:00:00',20),(37,'D7',1,'2021-09-07 00:00:00',20),(38,'D8',1,'2021-09-07 00:00:00',20),(39,'D9',1,'2021-09-07 00:00:00',10),(40,'D10',1,'2021-09-07 00:00:00',30),(41,'D1',2,'2021-09-07 00:00:00',10),(42,'D2',2,'2021-09-07 00:00:00',20),(43,'D3',2,'2021-09-07 00:00:00',20),(44,'D4',2,'2021-09-07 00:00:00',20),(45,'D5',2,'2021-09-07 00:00:00',20),(46,'D6',2,'2021-09-07 00:00:00',20),(47,'D7',2,'2021-09-07 00:00:00',10),(48,'D8',2,'2021-09-07 00:00:00',30),(49,'D9',2,'2021-09-07 00:00:00',10),(50,'D10',2,'2021-09-07 00:00:00',20),(51,'D1',3,'2021-09-07 00:00:00',20),(52,'D2',3,'2021-09-07 00:00:00',25),(53,'D3',3,'2021-09-07 00:00:00',10),(54,'D4',3,'2021-09-07 00:00:00',10),(55,'D5',3,'2021-09-07 00:00:00',10),(56,'D6',3,'2021-09-07 00:00:00',10),(57,'D7',3,'2021-09-07 00:00:00',10),(58,'D8',3,'2021-09-07 00:00:00',10),(59,'D9',3,'2021-09-07 00:00:00',10),(60,'D10',3,'2021-09-07 00:00:00',20),(61,'D1',1,'2021-09-14 00:00:00',25),(62,'D2',1,'2021-09-14 00:00:00',25),(63,'D3',1,'2021-09-14 00:00:00',30),(64,'D4',1,'2021-09-14 00:00:00',10),(65,'D5',1,'2021-09-14 00:00:00',20),(66,'D6',1,'2021-09-14 00:00:00',20),(67,'D7',1,'2021-09-14 00:00:00',20),(68,'D8',1,'2021-09-14 00:00:00',10),(69,'D9',1,'2021-09-14 00:00:00',30),(70,'D10',1,'2021-09-14 00:00:00',10),(71,'D1',2,'2021-09-14 00:00:00',20),(72,'D2',2,'2021-09-14 00:00:00',20),(73,'D3',2,'2021-09-14 00:00:00',25),(74,'D4',2,'2021-09-14 00:00:00',10),(75,'D5',2,'2021-09-14 00:00:00',10),(76,'D6',2,'2021-09-14 00:00:00',10),(77,'D7',2,'2021-09-14 00:00:00',10),(78,'D8',2,'2021-09-14 00:00:00',10),(79,'D9',2,'2021-09-14 00:00:00',20),(80,'D10',2,'2021-09-14 00:00:00',20),(81,'D1',3,'2021-09-14 00:00:00',10),(82,'D2',3,'2021-09-14 00:00:00',30),(83,'D3',3,'2021-09-14 00:00:00',10),(84,'D4',3,'2021-09-14 00:00:00',20),(85,'D5',3,'2021-09-14 00:00:00',20),(86,'D6',3,'2021-09-14 00:00:00',25),(87,'D7',3,'2021-09-14 00:00:00',10),(88,'D8',3,'2021-09-14 00:00:00',10),(89,'D9',3,'2021-09-14 00:00:00',25),(90,'D10',3,'2021-09-14 00:00:00',20),(91,'D1',1,'2021-09-21 00:00:00',10),(92,'D2',1,'2021-09-21 00:00:00',25),(93,'D3',1,'2021-09-21 00:00:00',20),(94,'D4',1,'2021-09-21 00:00:00',20),(95,'D5',1,'2021-09-21 00:00:00',10),(96,'D6',1,'2021-09-21 00:00:00',30),(97,'D7',1,'2021-09-21 00:00:00',10),(98,'D8',1,'2021-09-21 00:00:00',20),(99,'D9',1,'2021-09-21 00:00:00',20),(100,'D10',1,'2021-09-21 00:00:00',20),(101,'D1',2,'2021-09-21 00:00:00',20),(102,'D2',2,'2021-09-21 00:00:00',20),(103,'D3',2,'2021-09-21 00:00:00',10),(104,'D4',2,'2021-09-21 00:00:00',30),(105,'D5',2,'2021-09-21 00:00:00',10),(106,'D6',2,'2021-09-21 00:00:00',20),(107,'D7',2,'2021-09-21 00:00:00',20),(108,'D8',2,'2021-09-21 00:00:00',25),(109,'D9',2,'2021-09-21 00:00:00',10),(110,'D10',2,'2021-09-21 00:00:00',10),(111,'D1',3,'2021-09-21 00:00:00',10),(112,'D2',3,'2021-09-21 00:00:00',10),(113,'D3',3,'2021-09-21 00:00:00',10),(114,'D4',3,'2021-09-21 00:00:00',10),(115,'D5',3,'2021-09-21 00:00:00',10),(116,'D6',3,'2021-09-21 00:00:00',20),(117,'D7',3,'2021-09-21 00:00:00',25),(118,'D8',3,'2021-09-21 00:00:00',25),(119,'D9',3,'2021-09-21 00:00:00',30),(120,'D10',3,'2021-09-21 00:00:00',10),(121,'D1',1,'2021-09-28 00:00:00',20),(122,'D2',1,'2021-09-28 00:00:00',20),(123,'D3',1,'2021-09-28 00:00:00',10),(124,'D4',1,'2021-09-28 00:00:00',30),(125,'D5',1,'2021-09-28 00:00:00',10),(126,'D6',1,'2021-09-28 00:00:00',20),(127,'D7',1,'2021-09-28 00:00:00',20),(128,'D8',1,'2021-09-28 00:00:00',25),(129,'D9',1,'2021-09-28 00:00:00',10),(130,'D10',1,'2021-09-28 00:00:00',10),(131,'D1',2,'2021-09-28 00:00:00',10),(132,'D2',2,'2021-09-28 00:00:00',10),(133,'D3',2,'2021-09-28 00:00:00',10),(134,'D4',2,'2021-09-28 00:00:00',20),(135,'D5',2,'2021-09-28 00:00:00',20),(136,'D6',2,'2021-09-28 00:00:00',10),(137,'D7',2,'2021-09-28 00:00:00',30),(138,'D8',2,'2021-09-28 00:00:00',10),(139,'D9',2,'2021-09-28 00:00:00',20),(140,'D10',2,'2021-09-28 00:00:00',20),(141,'D1',3,'2021-09-28 00:00:00',25),(142,'D2',3,'2021-09-28 00:00:00',10),(143,'D3',3,'2021-09-28 00:00:00',10),(144,'D4',3,'2021-09-28 00:00:00',10),(145,'D5',3,'2021-09-28 00:00:00',10),(146,'D6',3,'2021-09-28 00:00:00',10),(147,'D7',3,'2021-09-28 00:00:00',20),(148,'D8',3,'2021-09-28 00:00:00',20),(149,'D9',3,'2021-09-28 00:00:00',10),(150,'D10',3,'2021-09-28 00:00:00',20);
/*!40000 ALTER TABLE `vaccine_center_availability` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-06  6:31:22