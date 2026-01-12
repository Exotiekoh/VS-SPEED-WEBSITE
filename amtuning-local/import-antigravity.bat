@echo off
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

REM Add MySQL to PATH for this session
set PATH=%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin
set PATH=%PATH%;C:\MySQL\MySQL80\bin

REM Import anti-gravity schema
echo Importing anti-gravity schema...
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db < database\antigravity-schema.sql

if %ERRORLEVEL% EQU 0 (
    echo [OK] Anti-gravity schema imported successfully!
) else (
    echo [ERROR] Failed to import schema
    pause
    exit /b 1
)

REM Verify tables
echo.
echo Verifying tables...
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db -e "SHOW TABLES;"

echo.
echo =========================================
echo MySQL Setup Complete!
echo =========================================
pause
