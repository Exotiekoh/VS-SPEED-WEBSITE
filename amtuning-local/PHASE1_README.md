# Phase 1: MySQL Portable - Quick Instructions

## What This Does
Sets up MySQL without installing a Windows service. Perfect for quick testing!

## Steps

### 1. Download MySQL Portable

**Option A: XAMPP Portable (Easier - includes phpMyAdmin):**
Download: <https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-portable-windows-x64-8.2.12-0-VS16.zip>

**Option B: MySQL ZIP Archive:**
Download: <https://dev.mysql.com/downloads/mysql/>
- Select "Windows (x86, 64-bit), ZIP Archive"

### 2. Extract

Extract the downloaded file to: `C:\MySQL-Portable`

### 3. Run the Setup Script

```cmd
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
PHASE1_MYSQL_PORTABLE.bat
```

The script will:
- ✅ Start MySQL server (in a new window)
- ✅ Create `vsspeed_db` database
- ✅ Create `vsspeed_app` user
- ✅ Import all 3 schemas (27 tables)
- ✅ Verify installation

### 4. Expected Output

You should see:
```
================================================
Phase 1 Complete!
================================================

MySQL is running and database is ready.

Tables in vsspeed_db:
+-----------------------------+
| Tables_in_vsspeed_db        |
+-----------------------------+
| ai_recommendations          |
| antigravity_configs         |
| ...                         |
+-----------------------------+
27 rows in set
```

## Important Notes

⚠️ **Keep the MySQL Server window open** while using VSSPEED!

If you close it, MySQL stops and the website won't work.

## Next Steps

After Phase 1 completes:

**Option A: Test locally first**
```cmd
START_VSSPEED.bat
```
Then open: <http://localhost:5174/>

**Option B: Build for production**
```cmd
npm run build
npm run preview
```

**Option C: Continue to deployment**
See Phase 2 in the implementation plan.

## Troubleshooting

**MySQL won't start?**
- Check if port 3306 is already in use
- Try running as Administrator
- Check Windows Firewall settings

**Can't import schemas?**
- Make sure MySQL server window is still open
- Check that you're in the correct directory
- Verify database files exist in `database/` folder

**Need help?**
Run `CHECK_PREREQUISITES.bat` to verify all requirements.
