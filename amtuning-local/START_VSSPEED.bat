@echo off
echo ================================================
echo    VS SPEED - Development Server Launcher
echo ================================================
echo.
echo Starting VS SPEED website...
echo.

cd /d "%~dp0"

echo Installing dependencies (if needed)...
call npm install

echo.
echo Starting development server...
echo.
echo The website will open at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

call npm run dev

pause
