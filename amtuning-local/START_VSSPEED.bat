@echo off
REM VS SPEED Local Development Server
echo =========================================
echo VSSPEED.IO - Local Development Server
echo =========================================
echo.
echo Starting server at http://localhost:5173/
echo.

REM Navigate to project directory
cd /d "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Start development server
echo Starting Vite dev server...
call npm run dev

pause
