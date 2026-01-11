# VSSPEED.IO - Database Setup Guide

## Quick Setup (Automated)

### Run the automated setup:
```cmd
SETUP_DATABASE_COMPLETE.bat
```

This will:
1. ✅ Generate a secure random password
2. ✅ Create `vsspeed_db` database
3. ✅ Create `vsspeed_app` user with least-privilege permissions
4. ✅ Import all schemas (14 core tables + diagnostic tables)
5. ✅ Show you the credentials to add to `.env`

---

## Manual Setup

### Step 1: Generate Secure Password

**PowerShell:**
```powershell
$password = -join ((65..90) + (97..122) + (48..57) + (33,35,37,38,42,43,45,61) | Get-Random -Count 16 | ForEach-Object {[char]$_})
Write-Output $password
```

**Or use online generator:** https://passwordsgenerator.net/

**Example output:** `aB3#xZ9*pQ2+mN7=`

### Step 2: Login to MySQL

```cmd
mysql -u root -p
```

Enter your MySQL root password.

### Step 3: Create Database and User

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS vsspeed_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create app user (replace YOUR_GENERATED_PASSWORD)
DROP USER IF EXISTS 'vsspeed_app'@'localhost';
CREATE USER 'vsspeed_app'@'localhost' 
IDENTIFIED BY 'YOUR_GENERATED_PASSWORD';

-- Grant permissions (least privilege)
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX 
ON vsspeed_db.* 
TO 'vsspeed_app'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Switch to database
USE vsspeed_db;
```

### Step 4: Import Schemas

**From MySQL prompt:**
```sql
SOURCE C:/Users/burri/OneDrive/Desktop/first_project_Jamie_hamza/amtuning-local/database/schema.sql;
SOURCE C:/Users/burri/OneDrive/Desktop/first_project_Jamie_hamza/amtuning-local/database/diagnostic-database.sql;
```

**Or from command line:**
```cmd
mysql -u root -p vsspeed_db < database\schema.sql
mysql -u root -p vsspeed_db < database\diagnostic-database.sql
```

### Step 5: Verify Tables Created

```sql
USE vsspeed_db;
SHOW TABLES;
```

You should see 22+ tables:

**Core Tables (14):**
- users
- vehicles
- parts_catalog
- vehicle_modifications
- reliability_data
- build_cost_analysis
- ai_recommendations
- dtc_codes
- vehicle_diagnostics
- user_decision_preferences
- user_agreements
- tuning_legality_checks
- ai_safety_flags
- decision_categories

**Diagnostic Tables (8+):**
- performance_issues
- issue_solutions
- tuning_recommendations
- maintenance_schedules
- dtc_solutions
- parts_compatibility

### Step 6: Update .env File

Edit `.env` with your database credentials:

```bash
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=vsspeed_db
MYSQL_USER=vsspeed_app
MYSQL_PASSWORD=aB3#xZ9*pQ2+mN7=  # Your generated password
```

---

## Verify Database Connection

### Test with Node.js:
```cmd
npm run test-db
```

### Test with MySQL CLI:
```cmd
mysql -u vsspeed_app -p vsspeed_db
```

Enter the password from `.env`.

### Check sample data:
```sql
SELECT * FROM users WHERE username = 'demo_user';
SELECT * FROM vehicles WHERE make = 'BMW';
SELECT * FROM performance_issues;
```

---

## Security Best Practices

### ✅ DO:
- Use generated strong passwords (16+ characters)
- Store password in `.env` file (git-ignored)
- Use `vsspeed_app` user for application (not root)
- Grant only necessary permissions
- Backup database regularly

### ❌ DON'T:
- Use weak passwords (password123)
- Commit `.env` to git
- Grant ALL PRIVILEGES
- Use root user in application
- Allow remote access unless required

---

## Remote Access (Optional)

If your backend runs on a different server:

```sql
-- Allow access from specific IP
CREATE USER 'vsspeed_app'@'192.168.1.100' 
IDENTIFIED BY 'YOUR_GENERATED_PASSWORD';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX 
ON vsspeed_db.* 
TO 'vsspeed_app'@'192.168.1.100';

-- Or allow from any IP (less secure)
CREATE USER 'vsspeed_app'@'%' 
IDENTIFIED BY 'YOUR_GENERATED_PASSWORD';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX 
ON vsspeed_db.* 
TO 'vsspeed_app'@'%';

FLUSH PRIVILEGES;
```

**Update firewall:**
```cmd
# Windows Firewall
netsh advfirewall firewall add rule name="MySQL" dir=in action=allow protocol=TCP localport=3306
```

---

## Database Backup

### Backup entire database:
```cmd
mysqldump -u vsspeed_app -p vsspeed_db > backup_vsspeed_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql
```

### Restore from backup:
```cmd
mysql -u vsspeed_app -p vsspeed_db < backup_vsspeed_20260111.sql
```

### Automated daily backups (Windows Task Scheduler):
```cmd
# Create backup script
echo mysqldump -u vsspeed_app -p%MYSQL_PASSWORD% vsspeed_db > "C:\backups\vsspeed_%%date:~-4,4%%%%date:~-10,2%%%%date:~-7,2%%.sql" > backup_daily.bat

# Schedule in Task Scheduler to run daily at 2 AM
```

---

## Database Performance

### Check table sizes:
```sql
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "vsspeed_db"
ORDER BY (data_length + index_length) DESC;
```

### Optimize tables:
```sql
OPTIMIZE TABLE users, vehicles, parts_catalog;
```

### Check indexes:
```sql
SHOW INDEX FROM parts_catalog;
```

---

## Troubleshooting

### Can't connect to MySQL:
```cmd
# Check if MySQL service is running
net start MySQL80

# Or via Services:
services.msc
# Look for "MySQL80", make sure Status = Running
```

### Access denied error:
```sql
-- Verify user exists
SELECT User, Host FROM mysql.user WHERE User = 'vsspeed_app';

-- Check permissions
SHOW GRANTS FOR 'vsspeed_app'@'localhost';

-- Reset password if needed
ALTER USER 'vsspeed_app'@'localhost' IDENTIFIED BY 'NEW_PASSWORD';
```

### Tables not found:
```sql
-- Check which database you're using
SELECT DATABASE();

-- Switch to correct database
USE vsspeed_db;

-- Verify tables exist
SHOW TABLES;
```

---

## Next Steps

After database setup:

1. ✅ Database created
2. ✅ User configured
3. ✅ Schemas imported
4. ✅ `.env` updated
5. ⏭️ Test connection: `npm run test-db`
6. ⏭️ Start server: `START_VSSPEED.bat`
7. ⏭️ Visit: http://localhost:5174/

---

**Database is ready for VSSPEED.IO!** 🗄️
