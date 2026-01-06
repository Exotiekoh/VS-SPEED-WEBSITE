@echo off
title VS SPEED - Launch Server
color 0C
cls

echo.
echo ========================================
echo    VS SPEED GLOBAL - SERVER LAUNCHER
echo ========================================
echo.
echo Setting up local domain: www.vsspeed.io
echo.

REM ============================================
REM STEP 1: Configure hosts file for vsspeed.io
REM ============================================

echo [1/3] Configuring local domain mapping...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires Administrator privileges!
    echo.
    echo Right-click this file and select "Run as Administrator"
    echo.
    pause
    exit /b 1
)

REM Backup hosts file
if not exist "C:\Windows\System32\drivers\etc\hosts.backup" (
    copy "C:\Windows\System32\drivers\etc\hosts" "C:\Windows\System32\drivers\etc\hosts.backup" >nul 2>&1
    echo - Hosts file backed up
)

REM Remove existing vsspeed.io entries
findstr /v /i "vsspeed.io" "C:\Windows\System32\drivers\etc\hosts" > "C:\Windows\System32\drivers\etc\hosts.tmp"
move /y "C:\Windows\System32\drivers\etc\hosts.tmp" "C:\Windows\System32\drivers\etc\hosts" >nul 2>&1

REM Add new entries for vsspeed.io
echo 127.0.0.1    vsspeed.io >> "C:\Windows\System32\drivers\etc\hosts"
echo 127.0.0.1    www.vsspeed.io >> "C:\Windows\System32\drivers\etc\hosts"
echo - Domain mapped: www.vsspeed.io --^> 127.0.0.1
echo.

REM Flush DNS cache
ipconfig /flushdns >nul 2>&1
echo - DNS cache flushed
echo.

REM ============================================
REM STEP 2: Check if Node.js is installed
REM ============================================

echo [2/3] Checking Node.js installation...
echo.

where node >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Node.js not found!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo - Node.js: INSTALLED
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo - Version: %NODE_VERSION%
echo.

REM ============================================
REM STEP 3: Start Development Server
REM ============================================

echo [3/3] Starting VS SPEED development server...
echo.
echo Server will be available at:
echo   - http://vsspeed.io:5174
echo   - http://www.vsspeed.io:5174
echo   - http://localhost:5174
echo.
echo.

REM Wait a moment for display
timeout /t 2 /nobreak >nul

REM Start the dev server
echo Starting server...
echo.
start "" cmd /c "npm run dev"

REM Wait for server to start
timeout /t 5 /nobreak >nul

REM Open browser
echo Opening browser to www.vsspeed.io:5174...
start http://www.vsspeed.io:5174

echo.
echo ========================================
echo    VS SPEED SERVER IS RUNNING!
echo ========================================
echo.
echo Press any key to stop the server...
pause >nul

REM Cleanup: Kill all node processes
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Server stopped.
echo.
pause
