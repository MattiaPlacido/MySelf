CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Dumping data for table `daily_tasks`
--

LOCK TABLES `daily_tasks` WRITE;
/*!40000 ALTER TABLE `daily_tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `task_categories_wip`
--

LOCK TABLES `task_categories_wip` WRITE;
/*!40000 ALTER TABLE `task_categories_wip` DISABLE KEYS */;
INSERT INTO `task_categories_wip` VALUES (1,'None',0);
/*!40000 ALTER TABLE `task_categories_wip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'prova','prova',0,'2025-02-12',26),(2,'Milk, eggs, bread, and fruit','Buy groceries',0,'2025-02-12',26);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (25,'prova.emailvalida@gmail.com','prova34','prova34','$2b$10$udQNf4biuBxf2W9WWDdahO7uaX63yUUx0vz0dkS12kYfP/rAFhUNC'),(26,'prova.emailvalida@gma.c','prova34','prova34','$2b$10$Q66DxMt4Yetgj/G92Vyv5.V4oPcvE2RoP2TINj2NVZMYOO55uBeui'),(27,'asd231@sd.co','adasd','asdasdasd','$2b$10$2X4NXJrkw2jNfHrogaPHN.HD1hSkveOwlCHiYWgOnG5nDZWE610J6'),(28,'prova10@email.com','prova10','prova10','$2b$10$wbk7HJblorqyrbHFKWEqr.eVoiGhGuXKJnv/TfB1YdnKlD9nMLQQe'),(29,'prova17@email.com','Prova17','Prova17','$2b$10$b.OTXB7TX63RYO.pBcNqDO81LKBAxXklhWpM4tHZhnfdt5tVgVQwO'),(31,'nuovaprova@email.com','Nuova','Prova','$2b$10$cfPuDnp7cJaQsfFS9nVt6uvvrk9YU.CjG7OB334bxuN4GruKF1G3y');
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

-- Dump completed on 2025-02-11 13:21:04
