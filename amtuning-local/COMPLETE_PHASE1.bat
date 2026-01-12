@echo off
echo ================================================
echo VSSPEED - Complete Phase 1 MySQL Setup
echo ================================================
echo.

REM Add MySQL to PATH
set PATH=%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin
set PATH=%PATH%;C:\MySQL\MySQL80\bin

REM Navigate to project
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

echo Step 1: Importing anti-gravity schema...
echo.
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db < database\antigravity-schema.sql

if %ERRORLEVEL% EQU 0 (
    echo [OK] Anti-gravity schema imported successfully!
    echo.
) else (
    echo [ERROR] Failed to import schema
    echo.
    echo Make sure MySQL service is running:
    echo - Press Win+R, type: services.msc
    echo - Find "MySQL" or "MySQL80"
    echo - Right-click and click "Start"
    echo.
    pause
    exit /b 1
)

echo Step 2: Verifying tables...
echo.
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db -e "SHOW TABLES;"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================
    echo SUCCESS! Phase 1 Complete
    echo ================================================
    echo.
    echo You should see 27 tables listed above.
    echo.
    echo Next steps:
    echo 1. Start dev server: START_VSSPEED.bat
    echo 2. Open browser: http://localhost:5174/
    echo.
    echo When ready for Phase 2-20 (template packaging),
    echo let me know and I'll begin!
    echo.
) else (
    echo [ERROR] Could not verify tables
)

pause
