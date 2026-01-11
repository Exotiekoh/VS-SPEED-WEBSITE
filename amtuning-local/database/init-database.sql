-- ============================================
-- VSSPEED.IO - Complete Database Initialization
-- Creates database, user, and all tables
-- ============================================

-- Step 1: Create Database
CREATE DATABASE IF NOT EXISTS vsspeed_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Step 2: Create dedicated app user with secure password
-- IMPORTANT: Replace 'YOUR_SECURE_PASSWORD' with a strong password
DROP USER IF EXISTS 'vsspeed_app'@'localhost';
CREATE USER 'vsspeed_app'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';

-- Grant necessary permissions (least privilege principle)
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX ON vsspeed_db.* TO 'vsspeed_app'@'localhost';

-- For remote access (optional - only if backend on different server)
-- CREATE USER 'vsspeed_app'@'%' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';
-- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX ON vsspeed_db.* TO 'vsspeed_app'@'%';

FLUSH PRIVILEGES;

-- Step 3: Use the database
USE vsspeed_db;

-- Display confirmation
SELECT 'Database vsspeed_db created successfully!' AS Status;
SELECT CONCAT('User vsspeed_app created with permissions on vsspeed_db') AS Status;

-- ============================================
-- Now import the schemas:
-- Run these files after this initialization:
-- 1. SOURCE database/schema.sql;
-- 2. SOURCE database/diagnostic-database.sql;
-- ============================================
