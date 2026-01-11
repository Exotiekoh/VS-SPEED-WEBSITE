@echo off
REM =========================================
REM VSSPEED.IO - Complete Database Setup
REM Creates database, user, and imports all schemas
REM =========================================

echo.
echo =========================================
echo VSSPEED.IO - Database Setup
echo =========================================
echo.

REM Check if MySQL is accessible
where mysql >nul 2>nul
if %errorLevel% neq 0 (
    echo ERROR: MySQL not found in PATH
    echo.
    echo Please install MySQL:
    echo https://dev.mysql.com/downloads/installer/
    echo.
    pause
    exit /b 1
)

echo MySQL found!
mysql --version
echo.

REM Get MySQL root credentials
set /p MYSQL_ROOT_USER="Enter MySQL root username (default: root): " || set MYSQL_ROOT_USER=root
set /p MYSQL_ROOT_PASSWORD="Enter MySQL root password: "

echo.
echo Generating secure password for vsspeed_app user...

REM Generate random password using PowerShell
for /f "delims=" %%i in ('powershell -command "$password = -join ((65..90) + (97..122) + (48..57) + (33,35,37,38,42,43,45,61) | Get-Random -Count 16 | ForEach-Object {[char]$_}); Write-Output $password"') do set VSSPEED_APP_PASSWORD=%%i

echo Generated password: %VSSPEED_APP_PASSWORD%
echo.
echo IMPORTANT: Save this password! You'll need it in .env file
echo.
pause

REM Create temporary init file with password
echo Creating database initialization script...
(
    echo CREATE DATABASE IF NOT EXISTS vsspeed_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    echo DROP USER IF EXISTS 'vsspeed_app'@'localhost';
    echo CREATE USER 'vsspeed_app'@'localhost' IDENTIFIED BY '%VSSPEED_APP_PASSWORD%';
    echo GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX ON vsspeed_db.* TO 'vsspeed_app'@'localhost';
    echo FLUSH PRIVILEGES;
    echo USE vsspeed_db;
    echo SELECT 'Database vsspeed_db created successfully!' AS Status;
) > database\temp_init.sql

echo.
echo [1/3] Creating database and user...
mysql -u %MYSQL_ROOT_USER% -p%MYSQL_ROOT_PASSWORD% < database\temp_init.sql

if %errorLevel% neq 0 (
    echo.
    echo ERROR: Failed to create database
    del database\temp_init.sql
    pause
    exit /b 1
)

echo [OK] Database and user created!

echo.
echo [2/3] Importing main schema (14 tables)...
mysql -u %MYSQL_ROOT_USER% -p%MYSQL_ROOT_PASSWORD% vsspeed_db < database\schema.sql

if %errorLevel% neq 0 (
    echo.
    echo ERROR: Failed to import main schema
    del database\temp_init.sql
    pause
    exit /b 1
)

echo [OK] Main schema imported!

echo.
echo [3/3] Importing diagnostic database...
mysql -u %MYSQL_ROOT_USER% -p%MYSQL_ROOT_PASSWORD% vsspeed_db < database\diagnostic-database.sql

if %errorLevel% neq 0 (
    echo.
    echo WARNING: Diagnostic database import failed
    echo This is optional, main database is ready
)

echo [OK] Diagnostic database imported!

REM Clean up temp file
del database\temp_init.sql

echo.
echo =========================================
echo Database Setup Complete!
echo =========================================
echo.
echo Database: vsspeed_db
echo User: vsspeed_app
echo Password: %VSSPEED_APP_PASSWORD%
echo.
echo Next steps:
echo 1. Update .env file with database credentials:
echo.
echo    MYSQL_HOST=localhost
echo    MYSQL_DATABASE=vsspeed_db
echo    MYSQL_USER=vsspeed_app
echo    MYSQL_PASSWORD=%VSSPEED_APP_PASSWORD%
echo.
echo 2. Test database connection: npm run test-db
echo 3. Start application: START_VSSPEED.bat
echo.
pause
