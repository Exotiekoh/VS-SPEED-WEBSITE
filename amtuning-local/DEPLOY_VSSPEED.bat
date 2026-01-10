@echo off
REM VS SPEED Deployment Script
REM Syncs all local data and deploys to public website

echo ========================================
echo VS SPEED DEPLOYMENT SCRIPT
echo ========================================
echo.

REM Set paths
set SOURCE_DATA=C:\Users\burri\OneDrive\Desktop\VSSPEED
set PROJECT_ROOT=C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local
set DEPLOY_DIR=%PROJECT_ROOT%\public\vsspeed-data

echo [1/6] Creating deployment directory...
if not exist "%DEPLOY_DIR%" mkdir "%DEPLOY_DIR%"

echo [2/6] Syncing images from VSSPEED...
xcopy "%SOURCE_DATA%\Pictures\*.*" "%DEPLOY_DIR%\images\" /E /I /Y /D
echo    - Images synced

echo [3/6] Syncing AI shared database...
if exist "%SOURCE_DATA%\ai-shared-db" (
    xcopy "%SOURCE_DATA%\ai-shared-db\*.*" "%DEPLOY_DIR%\ai-db\" /E /I /Y /D
    echo    - AI database synced
)

echo [4/6] Syncing product data...
if exist "%SOURCE_DATA%\VSSPEED DATA 1\website\src\data" (
    xcopy "%SOURCE_DATA%\VSSPEED DATA 1\website\src\data\*.*" "%PROJECT_ROOT%\src\data\" /E /I /Y /D
    echo    - Product data synced
)

echo [5/6] Checking for missing files on GitHub...
cd /d "%PROJECT_ROOT%"
git status > deployment-status.txt
echo    - Git status saved to deployment-status.txt

echo [6/6] Preparing deployment package...
echo    - Building production bundle...
call npm run build

echo.
echo ========================================
echo DEPLOYMENT PREPARATION COMPLETE
echo ========================================
echo.
echo Next steps:
echo 1. Review: deployment-status.txt
echo 2. Push to GitHub: git add . ^&^& git commit -m "Deploy VSSPEED" ^&^& git push
echo 3. Deploy: npm run deploy (if using gh-pages)
echo.
echo Data synced from: %SOURCE_DATA%
echo Project location: %PROJECT_ROOT%
echo.
pause
