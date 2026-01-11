@echo off
REM Simple installer that works without admin rights

echo =========================================
echo VSSPEED.IO - Simple Setup
echo =========================================
echo.

cd /d "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

echo Checking what you already have...
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorLevel% equ 0 (
    echo [OK] Node.js is installed
    node --version
) else (
    echo [X] Node.js not found
    echo    Download: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Installing npm packages (this may take a few minutes)...
echo.

REM Install packages using cmd instead of PowerShell
cmd /c "npm install"

if %errorLevel% neq 0 (
    echo.
    echo npm install failed. Trying alternative method...
    echo.
    
    REM Try with force
    cmd /c "npm install --force"
)

echo.
echo Setting up environment...
if not exist ".env" (
    copy .env.example .env
    echo .env file created
)

echo.
echo =========================================
echo Setup Status:
echo =========================================
echo.

REM Check installations
node --version >nul 2>&1 && echo [OK] Node.js || echo [X] Node.js

if exist "node_modules" (
    echo [OK] npm packages
) else (
    echo [X] npm packages - run: npm install
)

if exist ".env" (
    echo [OK] .env file
) else (
    echo [X] .env file
)

echo.
echo MySQL Status:
mysql --version >nul 2>&1
if %errorLevel% equ 0 (
    echo [OK] MySQL is installed
    mysql --version
    echo.
    echo Next: Run SETUP_DATABASE.bat
) else (
    echo [X] MySQL not installed
    echo.
    echo Install MySQL manually:
    echo 1. Download: https://dev.mysql.com/downloads/installer/
    echo 2. Install MySQL Server 8.0
    echo 3. Set root password
    echo 4. Run: SETUP_DATABASE.bat
)

echo.
echo =========================================
echo.

if exist "node_modules" (
    if exist ".env" (
        echo Ready to start!
        echo Run: START_VSSPEED.bat
    )
)

echo.
pause
