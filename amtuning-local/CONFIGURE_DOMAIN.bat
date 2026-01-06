@echo off
title Configure vsspeed.io Domain
color 0E
echo.
echo ========================================
echo    VS SPEED - Domain Configuration
echo ========================================
echo.
echo This will add vsspeed.io to your hosts file
echo so you can access the site locally!
echo.
echo IMPORTANT: This requires ADMINISTRATOR access
echo.
pause

echo.
echo Checking for administrator rights...
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ERROR: This script must be run as Administrator!
    echo.
    echo Right-click this file and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo Administrator access confirmed!
echo.
echo Adding vsspeed.io to hosts file...

(
echo.
echo # VS SPEED Local Development
echo 127.0.0.1    vsspeed.io
echo 127.0.0.1    www.vsspeed.io
) >> C:\Windows\System32\drivers\etc\hosts

echo.
echo SUCCESS! Domain configured.
echo.
echo Flushing DNS cache...
ipconfig /flushdns >nul

echo.
echo ========================================
echo  Configuration Complete!
echo ========================================
echo.
echo You can now access VS SPEED at:
echo   - http://vsspeed.io:3000 (production)
echo   - http://vsspeed.io:5173 (development)
echo.
echo Next step: Run LAUNCH_VSSPEED_IO.bat
echo ========================================
echo.
pause
