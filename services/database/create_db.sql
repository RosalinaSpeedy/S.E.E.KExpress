CREATE DATABASE `seek_forum` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE USER IF NOT EXISTS 'seek_forum_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON seek_forum.* TO 'seek_forum_app'@'localhost';

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hashedPassword` varchar(255) DEFAULT NULL,
  `clearance` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `forumposts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `body` varchar(100) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `edited` datetime DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `forumposts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `forumcomments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `edited` datetime DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `forumcomments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `forumposts` (`id`),
  CONSTRAINT `forumcomments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reported` (
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `reported_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `forumposts` (`id`),
  CONSTRAINT `reported_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

