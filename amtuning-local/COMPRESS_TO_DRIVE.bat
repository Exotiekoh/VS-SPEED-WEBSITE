@echo off
echo ================================================
echo VSSPEED - Compress to Drive
echo ================================================
echo.

set "TARGET_DRIVE=D:\VSSPEED Website Template & VSSPEED Data Local Jun-11-26\VSSPEED"
set "SOURCE_DIR=C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
set "TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%"
set "TIMESTAMP=%TIMESTAMP: =0%"

echo Target: %TARGET_DRIVE%
echo Source: %SOURCE_DIR%
echo.

REM Check if target drive exists
if not exist "%TARGET_DRIVE%" (
    echo [ERROR] Target drive not found: %TARGET_DRIVE%
    echo.
    echo Creating directory...
    mkdir "%TARGET_DRIVE%"
)

echo Step 1: Renaming old templates...
echo.

REM Find existing template ZIPs and rename them with "Old"
if exist "%TARGET_DRIVE%\VSSPEED_Template_*.zip" (
    for %%F in ("%TARGET_DRIVE%\VSSPEED_Template_*.zip") do (
        if not "%%~nxF"=="%%~nxF:Old=%" (
            echo   Skipping %%~nxF (already marked as Old)
        ) else (
            echo   Renaming: %%~nxF
            ren "%%F" "Old_%%~nxF"
        )
    )
) else (
    echo   No existing templates found.
)

echo.
echo Step 2: Compressing current VSSPEED...
echo.

set "NEW_TEMPLATE=%TARGET_DRIVE%\VSSPEED_Template_%TIMESTAMP%.zip"

echo Creating: %NEW_TEMPLATE%
echo.

REM Use PowerShell to create ZIP
powershell -Command "Compress-Archive -Path '%SOURCE_DIR%\*' -DestinationPath '%NEW_TEMPLATE%' -CompressionLevel Optimal -Force"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [OK] Compression complete!
    echo.
    echo File saved to:
    echo %NEW_TEMPLATE%
    echo.
    
    REM Get file size
    for %%A in ("%NEW_TEMPLATE%") do (
        set "SIZE=%%~zA"
    )
    echo File size: %SIZE% bytes
    echo.
) else (
    echo.
    echo [ERROR] Compression failed!
    echo.
    pause
    exit /b 1
)

echo Step 3: Creating backup manifest...
echo.

REM Create manifest file
set "MANIFEST=%TARGET_DRIVE%\BACKUP_MANIFEST_%TIMESTAMP%.txt"
(
    echo VSSPEED Backup Manifest
    echo =======================
    echo.
    echo Date: %date% %time%
    echo Source: %SOURCE_DIR%
    echo Archive: %NEW_TEMPLATE%
    echo.
    echo Contents:
    echo ---------
    dir "%SOURCE_DIR%" /s /b
) > "%MANIFEST%"

echo [OK] Manifest created: %MANIFEST%
echo.

echo ================================================
echo Compression Complete!
echo ================================================
echo.
echo New template: %NEW_TEMPLATE%
echo Old templates renamed with "Old_" prefix
echo.
echo You can now:
echo 1. Extract this ZIP on any computer
echo 2. Run PHASE1_MYSQL_PORTABLE.bat
echo 3. Deploy to www.vsspeed.org
echo.
pause
