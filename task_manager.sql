-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 08:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `due_date` date NOT NULL,
  `status` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `due_date`, `status`, `created_at`) VALUES
(1, 'CRUD Operation', 'Create, Read, Update and Delete', '2025-10-14', 'Completed', '2025-10-01 00:09:35'),
(2, 'React', 'User Management task', '2025-10-07', 'Completed', '2025-10-01 00:48:11'),
(5, 'Birthday', 'Birthday task', '2025-10-09', 'Completed', '2025-10-02 21:14:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Kamsa Nasi', 'kamsanasi@gmail.com', '$2b$10$WYDgk.wRANRSzxNB3eNHiuR', '0000-00-00 00:00:00'),
(2, 'Ayesha Nasliya', 'nasi@gmail.com', '$2b$10$z4W58TwBMVnjpY7/XGtbx.C', '0000-00-00 00:00:00'),
(4, 'Umar Mukthar', 'umar@gmail.com', '$2b$10$eb7RfcBylhsW.DxaV7mpi.x', '2025-10-02 01:56:39'),
(5, 'reyah', 'reyah@gmail.com', '$2b$10$aAbn89NrocTU09kGJxypf.I', '2025-10-02 16:11:31'),
(6, 'achu', 'achu@gmail.com', '$2b$10$WNHNvy5cZD4A0Hwf3o9X7.p', '2025-10-02 16:22:51'),
(13, 'ayesha', 'ayesh@gmail.com', 'ayesha', '2025-10-02 21:12:42'),
(14, 'test', 'test@gmail.com', '$2b$10$uRQSLHj64QQ1T/vFziTYJeO', '2025-10-02 21:32:27'),
(15, 'test', 'test@gmail.com', '$2b$10$1EHV024MbA/IUgY0amLGieP', '2025-10-03 01:22:48'),
(16, 'nnn', 'nnn@gmail.com', '$2b$10$iwDbmeCnZcFS2QihI87ayOB', '2025-10-03 21:08:30'),
(18, 'kkk', 'kkk@gmail.com', '$2b$10$OnCBEcKBc1LmJVpEWUYaBexMCDoP8LjfBxE9WQDc1S/o3svOs5fSW', '2025-10-03 22:09:40'),
(20, 'Admin', 'admin@gmail.com', '$2b$10$zaLJ/9y9TCyPfi3sc5oMk.oz2XSJ5FZpqkraNa2UNUKfRD1YVYVby', '2025-10-03 23:13:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
