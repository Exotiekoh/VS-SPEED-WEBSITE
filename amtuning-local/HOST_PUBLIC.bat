@echo off
title VS SPEED - Public Web Server
color 0E
echo.
echo ========================================
echo    VS SPEED - PUBLIC HOSTING SERVER
echo ========================================
echo.
echo This will make your website accessible
echo from ANYWHERE on the internet!
echo.
echo Requirements:
echo  - Your website must be running locally
echo  - Ngrok or Cloudflare Tunnel installed
echo.
pause

:MENU
cls
echo.
echo ========================================
echo    SELECT HOSTING METHOD
echo ========================================
echo.
echo [1] Using Cloudflare Tunnel (Recommended)
echo [2] Using Ngrok (Free Tier)
echo [3] Local Network Only (Current IP)
echo [4] Exit
echo.
set /p choice="Select option (1-4): "

if "%choice%"=="1" goto CLOUDFLARE
if "%choice%"=="2" goto NGROK
if "%choice%"=="3" goto LOCALNET
if "%choice%"=="4" exit
goto MENU

:CLOUDFLARE
cls
echo.
echo ========================================
echo    CLOUDFLARE TUNNEL SETUP
echo ========================================
echo.
echo Installing Cloudflare Tunnel (if needed)...
where cloudflared >nul 2>nul
if %errorLevel% neq 0 (
    echo Downloading Cloudflare Tunnel...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile 'cloudflared.exe'"
    echo.
)

echo.
echo Starting Public Tunnel...
echo Your website will be accessible at a FREE https://xxx.trycloudflare.com URL
echo.
echo IMPORTANT: Keep this window open!
echo.
cloudflared tunnel --url http://localhost:5173
pause
goto MENU

:NGROK
cls
echo.
echo ========================================
echo    NGROK SETUP
echo ========================================
echo.
where ngrok >nul 2>nul
if %errorLevel% neq 0 (
    echo ERROR: Ngrok not found!
    echo.
    echo Please download from: https://ngrok.com/download
    echo Extract ngrok.exe to this folder or add to PATH
    echo.
    pause
    goto MENU
)

echo.
echo Starting Ngrok Tunnel...
echo Your website will be accessible at a public URL
echo.
echo IMPORTANT: Keep this window open!
echo.
ngrok http 5173
pause
goto MENU

:LOCALNET
cls
echo.
echo ========================================
echo    LOCAL NETWORK ACCESS
echo ========================================
echo.
echo Your website is accessible on your local network at:
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    echo   http://%%a:5173
)
echo.
echo Share this URL with devices on the SAME WiFi network
echo.
echo To make it PUBLIC, use Option 1 or 2
echo.
pause
goto MENU
