# VSSPEED.IO - Complete Setup Guide

## 📋 **System Requirements**

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ MySQL 8.0+ (not yet installed)
- ✅ Git installed
- ✅ Windows 10/11

---

## 🗄️ **Step 1: Install MySQL**

### Download & Install

1. **Download MySQL Installer:**
   - Go to: https://dev.mysql.com/downloads/installer/
   - Choose: "mysql-installer-community-8.x.x.msi"
   - Click "Download" (no login required)

2. **Run Installer:**
   - Choose "Custom" installation
   - Select components:
     - ✅ MySQL Server 8.0.x
     - ✅ MySQL Workbench (optional GUI)
     - ✅ MySQL Shell

3. **Configure MySQL Server:**
   - Type: Development Machine
   - Port: 3306 (default)
   - Authentication: Use Strong Password Encryption
   - **Set Root Password:** (remember this!)

4. **Add MySQL to PATH:**
   - During installation, check "Add to PATH"
   - Or manually add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`

5. **Verify Installation:**
   ```cmd
   mysql --version
   ```
   Should show: `mysql  Ver 8.0.x for Win64`

---

## 🔧 **Step 2: Setup VSSPEED Database**

### Option A: Automated Setup (Recommended)

1. **Run setup script:**
   ```cmd
   SETUP_DATABASE.bat
   ```

2. **Enter credentials:**
   - Username: `root`
   - Password: (your MySQL root password)

3. **✅ Database created automatically!**

### Option B: Manual Setup

1. **Login to MySQL:**
   ```cmd
   mysql -u root -p
   ```

2. **Create database:**
   ```sql
   CREATE DATABASE vsspeed_production;
   ```

3. **Run schema:**
   ```cmd
   mysql -u root -p vsspeed_production < database\schema.sql
   ```

4. **Verify:**
   ```sql
   USE vsspeed_production;
   SHOW TABLES;
   ```
   Should show 14 tables.

---

## ⚙️ **Step 3: Configure Environment**

1. **Copy environment template:**
   ```cmd
   copy .env.example .env
   ```

2. **Edit `.env` file:**
   ```bash
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password_here
   MYSQL_DATABASE=vsspeed_production
   ```

3. **Add email credentials:**
   ```bash
   SECURITY_EMAIL_USER=vsspeedsupport@exotiekoh.github.io
   SECURITY_EMAIL_PASSWORD=your_app_password
   ```

---

## 🧪 **Step 4: Test Database Connection**

```cmd
npm run test-db
```

Expected output:
```
✅ Connected to MySQL
✅ Check Users Table: PASSED
✅ Check Vehicles Table: PASSED
✅ Check Parts Catalog: PASSED
✅ Total Tables: 14
✅ DATABASE TEST COMPLETE!
```

---

## 🚀 **Step 5: Start Development Server**

```cmd
START_VSSPEED.bat
```

Visit: http://localhost:5174/

---

## 📧 **Step 6: Configure Email Alerts**

### Gmail Setup (for security alerts)

1. **Enable 2-Factor Authentication:**
   - Go to: https://myaccount.google.com/security
   - Enable 2FA

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password

3. **Update `.env`:**
   ```bash
   SECURITY_EMAIL_USER=vsspeedsupport@exotiekoh.github.io
   SECURITY_EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

---

## 🛡️ **Security Features Enabled**

Once MySQL and email are configured:

### IP Monitoring
- ✅ **Every login** sends IP, location, device info to support email
- ✅ **New IP alerts** when users login from different locations
- ✅ **Attack detection** for SQL injection, XSS, path traversal
- ✅ **Automatic blocking** of malicious IPs (optional)

### What Gets Monitored
```
User Login → Email to vsspeedsupport@exotiekoh.github.io

Subject: 🔐 Login Alert: user@example.com from United States (192.168.1.1)

Content:
- User ID & email
- IP address & geolocation
- Device (Mobile/Desktop)
- Browser & OS
- Security warnings (if suspicious)
```

### Attack Detection
```
SQL Injection Attempt → CRITICAL ALERT

Subject: 🚨 CRITICAL: SQL Injection Attempt - 194.xxx.xxx.xxx

Actions:
- IP blocked automatically
- Admin notified immediately
- Logs saved for review
```

---

## 📊 **Database Schema Overview**

**14 Tables Created:**

1. `users` - Authentication & profiles
2. `vehicles` - User vehicles
3. `parts_catalog` - 28,000+ performance parts
4. `vehicle_modifications` - Installed mods
5. `reliability_data` - Reliability scores
6. `build_cost_analysis` - Budget tracking
7. `ai_recommendations` - AI suggestions
8. `dtc_codes` - Diagnostic trouble codes
9. `vehicle_diagnostics` - Scan results
10. `user_decision_preferences` - User settings
11. `user_agreements` - Legal disclaimers
12. `tuning_legality_checks` - Regional laws
13. `ai_safety_flags` - Safety warnings
14. `decision_categories` - Navigation structure

**Sample Data Loaded:**
- Demo user: `demo@vsspeed.io`
- Sample vehicle: 2011 BMW 335i
- Reliability data for BMW N54 engine
- Decision categories (Diagnose, Maintain, Performance, etc.)

---

## 🔍 **Troubleshooting**

### MySQL not found
```
Error: 'mysql' is not recognized
```
**Fix:** Add MySQL to PATH
1. Search "Environment Variables" in Windows
2. Edit "Path" variable
3. Add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
4. Restart terminal

### Connection refused
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Fix:** Start MySQL service
```cmd
net start MySQL80
```

### Access denied
```
Error: Access denied for user 'root'@'localhost'
```
**Fix:** Check password in `.env` file

### Schema errors
```
Error: Table 'users' already exists
```
**Fix:** Drop database and recreate
```sql
DROP DATABASE vsspeed_production;
```
Then run `SETUP_DATABASE.bat` again

---

## 📦 **npm Scripts Available**

```bash
# Development
npm run dev              # Start dev server (port 5174)

# Database
npm run setup-db         # Run database setup
npm run test-db          # Test database connection

# Deployment
npm run build            # Build for production
npm run deploy-prep      # Sync VSSPEED data
npm run deploy           # Deploy to GitHub Pages
npm run deploy-firebase  # Deploy to Firebase

# Sync
npm run sync-vsspeed     # Sync local VSSPEED folder
```

---

## ✅ **Verification Checklist**

Before going live, verify:

- [ ] MySQL installed and running
- [ ] Database schema created (14 tables)
- [ ] `.env` file configured
- [ ] Test database connection (npm run test-db)
- [ ] Email alerts working
- [ ] Dev server running (localhost:5174)
- [ ] Sample data loaded
- [ ] Security monitoring active

---

## 🚀 **Next Steps**

1. **Install MySQL** (if not done)
2. **Run SETUP_DATABASE.bat**
3. **Configure .env file**
4. **Test connection: npm run test-db**
5. **Start server: START_VSSPEED.bat**
6. **Configure email alerts** (Gmail app password)
7. **Deploy to production** (Firebase/Cloudflare)

---

## 📞 **Support**

- **Email:** vsspeedsupport@exotiekoh.github.io
- **GitHub:** https://github.com/Exotiekoh/VS-SPEED-WEBSITE
- **Database Issues:** Check logs in `logs/database.log`
- **Security Alerts:** Monitor support email inbox

---

**All systems are ready! Install MySQL to activate the full VSSPEED platform.** 🚀
