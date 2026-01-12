@echo off
echo ================================================
echo VSSPEED Phase 1: MySQL Portable Setup
echo ================================================
echo.

echo This script will help you setup MySQL portable.
echo.
echo Steps:
echo 1. Download XAMPP portable from SourceForge
echo 2. Extract to C:\MySQL-Portable
echo 3. Start MySQL server
echo 4. Import database schemas
echo.

echo Step 1: Download MySQL Portable
echo --------------------------------
echo.
echo Please download XAMPP portable from:
echo https://sourceforge.net/projects/xampp/files/XAMPP%%20Windows/8.2.12/xampp-portable-windows-x64-8.2.12-0-VS16.zip
echo.
echo OR download MySQL ZIP archive from:
echo https://dev.mysql.com/downloads/mysql/
echo.
echo Press any key after you have downloaded the file...
pause

echo.
echo Step 2: Extract Files
echo ---------------------
echo.
echo Please extract the downloaded ZIP file to: C:\MySQL-Portable
echo.
echo After extraction, you should have:
echo C:\MySQL-Portable\mysql\bin\mysqld.exe
echo.
echo Press any key after extraction is complete...
pause

echo.
echo Step 3: Starting MySQL Server
echo ------------------------------
echo.
echo Opening MySQL in a new window...
echo KEEP THAT WINDOW OPEN while using VSSPEED!
echo.

REM Check if MySQL portable exists
if not exist "C:\MySQL-Portable\mysql\bin\mysqld.exe" (
    echo [ERROR] MySQL not found at C:\MySQL-Portable\mysql\bin\mysqld.exe
    echo.
    echo Please make sure you extracted XAMPP to C:\MySQL-Portable
    echo.
    pause
    exit /b 1
)

REM Start MySQL in new window
start "MySQL Server" cmd /k "cd C:\MySQL-Portable\mysql\bin && mysqld.exe --console"

echo Waiting for MySQL to start (10 seconds)...
timeout /t 10 /nobreak

echo.
echo Step 4: Creating Database
echo -------------------------
echo.

REM Add MySQL to PATH
set PATH=%PATH%;C:\MySQL-Portable\mysql\bin

REM Test MySQL connection
mysql -u root -e "SELECT 1;" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Cannot connect to MySQL
    echo.
    echo Please make sure MySQL server window is still running.
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL is running!
echo.

REM Navigate to project
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

echo Creating database and user...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS vsspeed_db;"
mysql -u root -e "CREATE USER IF NOT EXISTS 'vsspeed_app'@'localhost' IDENTIFIED BY 'GB7Fvruk1w=JUj5T';"
mysql -u root -e "GRANT ALL PRIVILEGES ON vsspeed_db.* TO 'vsspeed_app'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Database and user created!
) else (
    echo [ERROR] Failed to create database
    pause
    exit /b 1
)

echo.
echo Importing schemas...
echo.

echo [1/3] Importing core schema...
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db < database\schema.sql
if %ERRORLEVEL% EQU 0 (
    echo [OK] Core schema imported
) else (
    echo [ERROR] Failed to import core schema
)

echo [2/3] Importing diagnostic schema...
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db < database\diagnostic-database.sql
if %ERRORLEVEL% EQU 0 (
    echo [OK] Diagnostic schema imported
) else (
    echo [ERROR] Failed to import diagnostic schema
)

echo [3/3] Importing anti-gravity schema...
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db < database\antigravity-schema.sql
if %ERRORLEVEL% EQU 0 (
    echo [OK] Anti-gravity schema imported
) else (
    echo [ERROR] Failed to import anti-gravity schema
)

echo.
echo Step 5: Verifying Installation
echo -------------------------------
echo.

echo Tables in vsspeed_db:
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db -e "SHOW TABLES;"

echo.
echo ================================================
echo Phase 1 Complete!
echo ================================================
echo.
echo MySQL is running and database is ready.
echo.
echo IMPORTANT: Keep the MySQL Server window open!
echo.
echo Next steps:
echo 1. Run Phase 2: npm run build
echo 2. Run Phase 3: Deploy to www.vsspeed.org
echo.
echo To start development server now:
echo   START_VSSPEED.bat
echo.
pause
