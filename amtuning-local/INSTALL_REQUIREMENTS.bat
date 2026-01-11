@echo off
REM =========================================
REM VSSPEED.IO - Automated System Setup
REM Installs all requirements automatically
REM =========================================

echo.
echo =========================================
echo VSSPEED.IO - System Requirements Setup
echo =========================================
echo.
echo This script will install:
echo - Chocolatey (Package Manager)
echo - MySQL 8.0
echo - Node.js dependencies
echo - Configure environment
echo.
pause

REM Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ERROR: This script requires Administrator privileges
    echo Right-click and select "Run as Administrator"
    echo.
    pause
    exit /b 1
)

echo.
echo [1/5] Checking Chocolatey...
where choco >nul 2>nul
if %errorLevel% neq 0 (
    echo Installing Chocolatey package manager...
    
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    
    if %errorLevel% neq 0 (
        echo Failed to install Chocolatey
        pause
        exit /b 1
    )
    echo Chocolatey installed successfully!
) else (
    echo Chocolatey already installed
)

echo.
echo [2/5] Checking MySQL...
where mysql >nul 2>nul
if %errorLevel% neq 0 (
    echo Installing MySQL Server 8.0...
    choco install mysql -y
    
    if %errorLevel% neq 0 (
        echo.
        echo WARNING: Automated MySQL install failed
        echo.
        echo Manual installation required:
        echo 1. Download: https://dev.mysql.com/downloads/installer/
        echo 2. Install MySQL Server 8.0
        echo 3. Set root password
        echo 4. Re-run this script
        echo.
        pause
        exit /b 1
    )
    
    echo MySQL installed successfully!
    echo.
    set /p MYSQL_ROOT_PASSWORD="Set MySQL root password: "
    
    REM Start MySQL service
    net start MySQL80
    
    REM Set root password
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '%MYSQL_ROOT_PASSWORD%';"
    
) else (
    echo MySQL already installed
)

echo.
echo [3/5] Checking Node.js...
where node >nul 2>nul
if %errorLevel% neq 0 (
    echo Installing Node.js...
    choco install nodejs -y
    
    if %errorLevel% neq 0 (
        echo Failed to install Node.js
        pause
        exit /b 1
    )
    
    echo Node.js installed successfully!
    
    REM Refresh PATH
    call refreshenv
) else (
    echo Node.js already installed
    node --version
)

echo.
echo [4/5] Installing npm packages...
cd /d "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

if not exist "node_modules" (
    echo Running npm install...
    call npm install
    
    if %errorLevel% neq 0 (
        echo Failed to install npm packages
        pause
        exit /b 1
    )
) else (
    echo npm packages already installed
)

echo.
echo [5/5] Configuring environment...

REM Check if .env exists
if not exist ".env" (
    echo Creating .env from template...
    copy .env.example .env
    
    echo.
    echo IMPORTANT: Edit .env file with your settings:
    echo - MYSQL_PASSWORD
    echo - SECURITY_EMAIL_PASSWORD (Gmail app password)
    echo - Firebase credentials
    echo.
) else (
    echo .env file already exists
)

echo.
echo =========================================
echo System Setup Complete!
echo =========================================
echo.
echo Installed:
where choco >nul 2>nul && echo [OK] Chocolatey || echo [X] Chocolatey
where mysql >nul 2>nul && echo [OK] MySQL || echo [X] MySQL
where node >nul 2>nul && echo [OK] Node.js || echo [X] Node.js
where npm >nul 2>nul && echo [OK] npm || echo [X] npm
echo.
echo Next steps:
echo 1. Edit .env file with your credentials
echo 2. Run: SETUP_DATABASE.bat
echo 3. Run: START_VSSPEED.bat
echo.
pause
