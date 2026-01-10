@echo off
REM VS SPEED Firebase Deployment Script (Windows)
REM Developer: devjemz

echo =========================================
echo VS SPEED FIREBASE DEPLOYMENT
echo Developer: devjemz
echo =========================================
echo.

REM Step 1: Firebase Login
echo [1/3] Logging in to Firebase as devjemz...
call firebase login --email devjemz@vsspeed.org

if %ERRORLEVEL% NEQ 0 (
    echo X Firebase login failed. Please check credentials.
    pause
    exit /b 1
)

echo + Logged in successfully
echo.

REM Step 2: Firebase Init (if needed)
if not exist "firebase.json" (
    echo [2/3] Initializing Firebase project...
    echo Project prompt: Deploy VSSPEED
    call firebase init
) else (
    echo [2/3] Firebase already initialized, skipping...
)

echo.

REM Step 3: Deploy
echo [3/3] Deploying VSSPEED to Firebase...
echo Deploying: Functions, Firestore, Hosting, Storage
echo.

call firebase deploy --project vsspeed-global

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =========================================
    echo + DEPLOYMENT SUCCESSFUL!
    echo =========================================
    echo Website: https://vsspeed-global.web.app
    echo Firebase Console: https://console.firebase.google.com/project/vsspeed-global
    echo =========================================
) else (
    echo.
    echo X Deployment failed. Check errors above.
    pause
    exit /b 1
)

pause
