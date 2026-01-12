# Phase 1: Complete MySQL Setup - Quick Start Guide

## Current Issue

MySQL service is not running. You need to start it manually.

## Step 1: Start MySQL Service

### Option A: Using Services (GUI - EASIEST)

1. Press `Win + R`
2. Type: `services.msc` and press Enter
3. Find "MySQL" or "MySQL80" in the list
4. Right-click → **Start**

### Option B: Using Command Line (elevated CMD)

```cmd
net start MySQL
```

or

```cmd
sc start MySQL
```

## Step 2: Import Anti-Gravity Schema

Once MySQL is running, open your **elevated Administrator command prompt** (where `mysql --version` worked) and run:

```cmd
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db < database\antigravity-schema.sql
```

## Step 3: Verify Tables

```cmd
mysql -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db -e "SHOW TABLES;"
```

You should see 27 tables listed.

## Step 4: Update .env File

Create or edit `.env` file:

```bash
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=vsspeed_db
MYSQL_USER=vsspeed_app
MYSQL_PASSWORD=GB7Fvruk1w=JUj5T
```

## Step 5: Test Database Connection

```cmd
npm run test-db
```

Expected output: `✅ DATABASE TEST COMPLETE!`

## Step 6: Start VSSPEED Dev Server

```cmd
START_VSSPEED.bat
```

Then open browser to: `http://localhost:5174/`

---

## What's Next After Phase 1?

Once the above steps are complete, let me know and we'll proceed to:

- **Phase 2:** Setup web server (Nginx or PM2)
- **Phase 3:** Network configuration (port forwarding)
- **Phase 4:** Domain setup (vsspeed.io)
- **Phase 5:** SSL certificates
- **And so on...**

---

## Quick Troubleshooting

**If `mysql` command not found:**

Run this in your command prompt first:

```cmd
set PATH=%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin
```

**If MySQL service doesn't exist:**

The installation might have failed. Try reinstalling:

```cmd
choco install mysql -y --force
```

**Once MySQL is running, reply here with "Phase 1 complete" and I'll continue with the next phases!**

