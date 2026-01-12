@echo off
rem ------------------------------------------------------------
rem  install_and_setup_mysql.bat
rem  1️⃣ Checks for MySQL client (mysql.exe) on PATH
rem  2️⃣ If missing, installs Chocolatey (if needed) and MySQL Server 8.0
rem  3️⃣ Runs SETUP_DATABASE_COMPLETE.bat
rem  ------------------------------------------------------------

rem ----- Helper: print a nice header ---------------------------------
echo.
echo ==============================================================
echo   VSSPEED – MySQL installation ^& database setup
echo ==============================================================
echo.

rem ----- Step 1 – Is mysql.exe available? ---------------------------
where mysql >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] MySQL client already found on PATH.
    goto RunSetup
) else (
    echo [INFO] MySQL client NOT found – proceeding to install.
)

rem ----- Step 2 – Install Chocolatey (if not present) ----------------
where choco >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Chocolatey already installed.
) else (
    echo [INFO] Installing Chocolatey (required for silent MySQL install)…
    @powershell -NoProfile -ExecutionPolicy Bypass ^
        -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; ^
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Chocolatey installation failed. Abort.
        pause
        exit /b 1
    )
)

rem ----- Step 3 – Install MySQL Server 8.0 via Chocolatey -------------
echo [INFO] Installing MySQL Server 8.0 (this may take a few minutes)…
choco install mysql -y --params "/InstallDir:C:\MySQL\MySQL80"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] MySQL installation failed. Abort.
    pause
    exit /b 1
)

rem ----- Step 4 – Add MySQL bin folder to PATH for this session -------
set "MYSQL_BIN=C:\MySQL\MySQL80\bin"
set "PATH=%MYSQL_BIN%;%PATH%"

rem Verify installation
where mysql >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] mysql.exe still not found after install. Abort.
    pause
    exit /b 1
) else (
    echo [OK] MySQL client is now available.
)

rem ----- Step 5 – Run the VSSPEED database‑setup script ---------------
:RunSetup
echo.
echo -------------------------------------------------------------
echo Running SETUP_DATABASE_COMPLETE.bat …
echo -------------------------------------------------------------
call SETUP_DATABASE_COMPLETE.bat
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] SETUP_DATABASE_COMPLETE.bat returned an error.
    pause
    exit /b 1
)

echo.
echo ==============================================================
echo   All done! Your MySQL server is running and the VSSPEED
echo   database has been created. You can now start the dev server:
echo   > START_VSSPEED.bat
echo ==============================================================
pause
