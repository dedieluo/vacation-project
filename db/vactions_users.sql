-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: vactions
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dedi','eliyahu','dedi@gmail.com','12345678','USER'),(2,'GUY','ML','guy@gmail.com','12345678','ADMIN'),(3,'shalev','aharon','shalev@gmail.com','12345678','USER'),(4,'roni','eliyahu','roni@gmail.com','12345678','USER'),(5,'hi','eliyahu','noy@gmail.com','12345678','USER'),(6,'h1','eliyahu','test@gmail.com','12345678','USER'),(7,'h2','eliyahu2','test@gmail.com','12345678','USER'),(8,'h3','hi3','test3@gmail.com','12345678','USER'),(9,'h4','hi4','test4@gmail.com','12345678','USER'),(10,'h5','hi5','test5@gmail.com','12345678','USER'),(11,'h6','hi6','test6@gmail.com','12345678','USER'),(12,'hi7','hi7','test7@gmail.com','12345678','USER'),(13,'joy','avraham','joy@gmail.com','1234567','USER'),(14,'roni','eliyahu','ronig@gmail.com','12345678','USER'),(15,'asdsdasdas','adsadasdd','asddsa@gmail.com','12345678','USER'),(16,'asdasdasd','asdasdasd','asdasd@gmail.com','12345678','USER'),(17,'ronironi','eliyahu','ronironi@gmail.com','12345678','USER'),(18,'aaa','aaa','aaa@gmail.com','12345678','USER'),(19,'rrrrrr','rrrrr','rrrr@gmai.com','12345678','USER'),(20,'hhhh','hhhh','hhhh@gmail.com','12345678','USER'),(21,'asdasd','asdsad','aa@gmai.com','12345678','USER'),(22,'ttt','ttt','tt@gmail.com','12345678','USER'),(23,'joya','joya','joya@gmail.com','12345678','USER'),(24,'yes','yes','yes@gmail.com','12345678','USER'),(25,'vvvvv','vvvvv','vv@gmail.com','12345678','USER'),(26,'cccc','cccc','cc@gmail.com','12345678','USER'),(27,'zz','zz','zz@gmail.com','12345678','USER'),(28,'zz','zz','zz@gmail.com','12345678','USER'),(29,'zz','zz','zz@gmail.com','12345678','USER'),(30,'zzzz','zzzz','zzzz@gmail.com','12345678','USER'),(31,'zzzzzz','zzzzzz','zzzzzz@gmail.com','12345678','USER'),(32,'zzzzzzzz','zzzzzzzz','zzzzzzzz@gmail.com','12345678','USER'),(33,'aasd','asda','asdsdasd@gamail.com','12345678','USER'),(34,'aaaa','aaaa','aaaa@gmail.com','12345678','USER'),(35,'asdasd','asdasd','asdasd@gmai.com','12345678','USER'),(36,'eee','eee','ee@gmail.com','12345678','USER'),(37,'eeeee','eeeee','eeee@gmail.com','12345678','USER'),(38,'eeeeeee','eeeeeee','eeeeeee@gmail.com','12345678','USER'),(39,'rrrrr','rrrrr','rrrr@gmail.com','12345678','USER'),(40,'asdasd','asdasd','asdasdasd@gmail.com','12345678','USER'),(41,'asdasdas','asdasdas','asdasdasasasad@gmail.com','12345678','USER'),(42,'asdasdas','asdasdas','asdasdasaassasad@gmail.com','12345678','USER'),(43,'zxxzcxzxzc','zxczxczxc','zxczc@gmail.com','12345678','USER'),(44,'asd','asdads','dedi@gmail.com','12345678','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-25 14:42:27
