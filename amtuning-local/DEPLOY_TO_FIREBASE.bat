@echo off
REM =========================================
REM VSSPEED.IO - Firebase Deployment Script
REM Deploy to www.vsspeed.io
REM =========================================

echo.
echo =========================================
echo VSSPEED.IO - Production Deployment
echo =========================================
echo.

cd /d "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

REM Check if Firebase CLI is installed
where firebase >nul 2>nul
if %errorLevel% neq 0 (
    echo Installing Firebase CLI...
    call npm install -g firebase-tools
    
    if %errorLevel% neq 0 (
        echo.
        echo ERROR: Failed to install Firebase CLI
        echo Please install manually: npm install -g firebase-tools
        pause
        exit /b 1
    )
)

echo [1/5] Firebase CLI ready
echo.

REM Check if logged in
firebase projects:list >nul 2>nul
if %errorLevel% neq 0 (
    echo You need to login to Firebase
    echo.
    firebase login
    
    if %errorLevel% neq 0 (
        echo.
        echo ERROR: Firebase login failed
        pause
        exit /b 1
    )
)

echo [2/5] Logged in to Firebase
echo.

REM Update vite config for production (remove localhost base)
echo [3/5] Configuring for production...
powershell -Command "(Get-Content vite.config.js) -replace \"base: '/VS-SPEED-WEBSITE/',\", \"base: '/',\" | Set-Content vite.config.js"
powershell -Command "(Get-Content vite.config.js) -replace \"base: '/',\", \"base: '/', // Production - change back to '/VS-SPEED-WEBSITE/' for GitHub Pages\" | Set-Content vite.config.js"

echo Configuration updated
echo.

REM Build production bundle
echo [4/5] Building production bundle...
echo This may take 1-2 minutes...
echo.

call npm run build

if %errorLevel% neq 0 (
    echo.
    echo ERROR: Build failed
    echo Check for errors above
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

REM Check if firebase.json exists
if not exist "firebase.json" (
    echo No firebase.json found. Initializing Firebase...
    echo.
    
    REM Create basic firebase.json
    (
        echo {
        echo   "hosting": {
        echo     "public": "dist",
        echo     "ignore": [
        echo       "firebase.json",
        echo       "**/.*",
        echo       "**/node_modules/**"
        echo     ],
        echo     "rewrites": [
        echo       {
        echo         "source": "**",
        echo         "destination": "/index.html"
        echo       }
        echo     ]
        echo   }
        echo }
    ) > firebase.json
    
    echo firebase.json created
    echo.
)

REM Deploy to Firebase
echo [5/5] Deploying to Firebase...
echo.

firebase deploy --only hosting

if %errorLevel% neq 0 (
    echo.
    echo ERROR: Deployment failed
    pause
    exit /b 1
)

echo.
echo =========================================
echo Deployment Successful!
echo =========================================
echo.
echo Your website is now live!
echo.
echo Next steps:
echo 1. Add custom domain in Firebase Console
echo 2. Update DNS records at your domain registrar
echo 3. Wait for DNS propagation (5 mins - 48 hours)
echo 4. Your site will be live at www.vsspeed.io
echo.
echo Firebase Console: https://console.firebase.google.com/
echo.
pause
