@echo off
REM VSSPEED MySQL Database Setup Script

echo =========================================
echo VSSPEED.IO - MySQL Database Setup
echo =========================================
echo.

REM Check if MySQL is installed
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X MySQL is not installed or not in PATH
    echo.
    echo Please install MySQL:
    echo 1. Download from: https://dev.mysql.com/downloads/installer/
    echo 2. Run installer and select "MySQL Server"
    echo 3. Set root password during installation
    echo 4. Add MySQL to PATH
    echo.
    pause
    exit /b 1
)

echo + MySQL found
echo.

REM Prompt for MySQL credentials
set /p MYSQL_USER="Enter MySQL username (default: root): " || set MYSQL_USER=root
set /p MYSQL_PASSWORD="Enter MySQL password: "

echo.
echo Creating VSSPEED database...
echo.

REM Create database and run schema
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% < database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =========================================
    echo + DATABASE SETUP SUCCESSFUL!
    echo =========================================
    echo.
    echo Database: vsspeed_production
    echo Tables: 14 created
    echo Sample data: Loaded
    echo.
    echo Next steps:
    echo 1. Update .env with database credentials
    echo 2. Test connection: npm run test-db
    echo 3. Start application: npm run dev
    echo.
) else (
    echo.
    echo X Database setup failed
    echo Check MySQL credentials and try again
    echo.
)

pause
