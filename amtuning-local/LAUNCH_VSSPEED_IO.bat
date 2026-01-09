@echo off
title VS SPEED - Local Web Server
color 0A
echo.
echo ========================================
echo    VS SPEED - vsspeed.io Launcher
echo ========================================
echo.
echo [1] Installing dependencies...
call npm install --silent

echo.
echo [2] Building production files...
call npm run build

echo.
echo [3] Starting web server on vsspeed.io...
echo.
echo Website will be accessible at:
echo   - http://localhost:3000
echo   - http://vsspeed.io:3000 (after hosts file config)
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd dist
python -m http.server 3000 2>nul || (
    echo Python not found, using Node server instead...
    npx -y serve -s . -p 3000
)
pause
