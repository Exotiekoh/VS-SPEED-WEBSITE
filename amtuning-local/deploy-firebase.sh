#!/bin/bash
# VS SPEED Firebase Deployment Script
# Developer: devjemz

echo "========================================="
echo "VS SPEED FIREBASE DEPLOYMENT"
echo "Developer: devjemz"
echo "========================================="
echo ""

# Step 1: Firebase Login
echo "[1/3] Logging in to Firebase as devjemz..."
firebase login --email devjemz@vsspeed.org

if [ $? -ne 0 ]; then
    echo "❌ Firebase login failed. Please check credentials."
    exit 1
fi

echo "✅ Logged in successfully"
echo ""

# Step 2: Firebase Init (if needed)
if [ ! -f "firebase.json" ]; then
    echo "[2/3] Initializing Firebase project..."
    echo "Project prompt: Deploy VSSPEED"
    firebase init
else
    echo "[2/3] Firebase already initialized, skipping..."
fi

echo ""

# Step 3: Deploy
echo "[3/3] Deploying VSSPEED to Firebase..."
echo "Deploying: Functions, Firestore, Hosting, Storage"
echo ""

firebase deploy --project vsspeed-global

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo "========================================="
    echo "🌐 Website: https://vsspeed-global.web.app"
    echo "🔥 Firebase Console: https://console.firebase.google.com/project/vsspeed-global"
    echo "========================================="
else
    echo ""
    echo "❌ Deployment failed. Check errors above."
    exit 1
fi
