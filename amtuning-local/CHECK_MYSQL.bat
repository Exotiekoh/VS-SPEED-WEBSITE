@echo off
REM =========================================
REM MySQL Installation Checker
REM Verifies if MySQL is ready for VSSPEED
REM =========================================

echo.
echo =========================================
echo MySQL Installation Checker
echo =========================================
echo.

REM Check if MySQL command is available
mysql --version >nul 2>nul
if %errorLevel% equ 0 (
    echo [OK] MySQL is installed!
    mysql --version
    echo.
    
    REM Check if MySQL service is running
    sc query MySQL80 | find "RUNNING" >nul 2>nul
    if %errorLevel% equ 0 (
        echo [OK] MySQL service is running
        echo.
        echo Ready to proceed with database setup!
        echo.
        echo Next step:
        echo   SETUP_DATABASE_COMPLETE.bat
        echo.
    ) else (
        echo [X] MySQL service not running
        echo.
        echo Starting MySQL service...
        net start MySQL80
        
        if %errorLevel% equ 0 (
            echo [OK] MySQL service started
            echo.
            echo Ready to proceed with database setup!
            echo.
            echo Next step:
            echo   SETUP_DATABASE_COMPLETE.bat
        ) else (
            echo [X] Failed to start MySQL service
            echo.
            echo Try manually:
            echo   services.msc
            echo   Find "MySQL80" and start it
        )
    )
) else (
    echo [X] MySQL not found in PATH
    echo.
    echo Installation Required:
    echo.
    echo 1. Download MySQL Installer:
    echo    https://dev.mysql.com/downloads/installer/
    echo.
    echo 2. Run the installer (mysql-installer-community-8.0.x.msi)
    echo.
    echo 3. Choose "Custom" setup type
    echo.
    echo 4. Select "MySQL Server 8.0.x"
    echo.
    echo 5. Configure:
    echo    - Development Computer
    echo    - Port: 3306
    echo    - Set root password (SAVE IT!)
    echo.
    echo 6. Run this script again after installation
    echo.
)

echo.
pause
