@echo off
REM VS SPEED - Create Standalone EXE
title Creating VS SPEED Executable
color 0B

echo.
echo ========================================
echo    VS SPEED - EXE Builder
echo ========================================
echo.
echo This will create a standalone .exe file
echo that runs VS SPEED without dependencies
echo.
pause

echo.
echo [1/4] Installing pkg (Node.js to EXE compiler)...
call npm install -g pkg

echo.
echo [2/4] Building production website...
call npm run build

echo.
echo [3/4] Compiling server to executable...
call pkg server.js --targets node18-win-x64 --output VSSpeed.exe

echo.
echo [4/4] Creating launcher...

(
echo @echo off
echo title VS SPEED - vsspeed.io
echo color 0A
echo echo.
echo echo ========================================
echo echo    VS SPEED Server - vsspeed.io
echo echo ========================================
echo echo.
echo echo Starting server...
echo echo Access at: http://localhost:3000
echo echo           http://vsspeed.io:3000
echo echo.
echo echo Press Ctrl+C to stop
echo echo ========================================
echo echo.
echo VSSpeed.exe
echo pause
) > RUN_VSSPEED.bat

echo.
echo ========================================
echo  SUCCESS!
echo ========================================
echo.
echo Created files:
echo   - VSSpeed.exe (standalone server)
echo   - RUN_VSSPEED.bat (launcher)
echo.
echo To run:
echo   1. Right-click CONFIGURE_DOMAIN.bat
echo   2. Run as administrator (one time only)
echo   3. Double-click RUN_VSSPEED.bat
echo.
echo The .exe file is portable - you can
echo copy it to any Windows PC!
echo ========================================
echo.
pause
