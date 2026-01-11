# VSSPEED.IO - Quick Start Guide

## 🚀 One-Click Setup (Recommended)

### **Option 1: PowerShell (Best)**
1. Right-click **PowerShell** → Run as Administrator
2. Run:
```powershell
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
.\INSTALL_ALL.ps1
```

### **Option 2: Batch File**
1. Right-click **INSTALL_REQUIREMENTS.bat** → Run as Administrator

---

## 📋 What Gets Installed

| Software | Purpose | Size |
|----------|---------|------|
| **Chocolatey** | Package manager | ~10 MB |
| **MySQL 8.0** | Database server | ~400 MB |
| **Node.js** | JavaScript runtime | ~50 MB |
| **npm packages** | Project dependencies | ~200 MB |

**Total:** ~660 MB

---

## ⚙️ Manual Installation (If Automatic Fails)

### 1. Install Chocolatey
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### 2. Install MySQL
**Option A - Chocolatey:**
```powershell
choco install mysql -y
```

**Option B - Manual:**
1. Download: https://dev.mysql.com/downloads/installer/
2. Run installer
3. Select "MySQL Server 8.0"
4. Set root password (remember this!)
5. Add to PATH

### 3. Install Node.js
```powershell
choco install nodejs -y
```

Or download: https://nodejs.org/

### 4. Install npm Packages
```cmd
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
npm install
```

### 5. Setup Environment
```cmd
copy .env.example .env
```

Edit `.env` with:
- MySQL password
- Gmail app password
- Firebase credentials

---

## 🗄️ Database Setup

After system requirements are installed:

```cmd
SETUP_DATABASE.bat
```

Enter your MySQL root password when prompted.

This creates:
- `vsspeed_production` database
- 14 tables
- Sample data (BMW 335i)

---

## ✅ Verify Installation

```cmd
# Check versions
choco --version
mysql --version
node --version
npm --version

# Test database
npm run test-db

# Start dev server
START_VSSPEED.bat
```

---

## 🔧 Troubleshooting

### PowerShell execution policy error
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### MySQL not in PATH
Add to System PATH:
```
C:\Program Files\MySQL\MySQL Server 8.0\bin
```

### npm install fails
```cmd
# Clear cache
npm cache clean --force

# Delete node_modules
rmdir /s node_modules

# Reinstall
npm install
```

### Port 5173 already in use
```cmd
# Find process using port
netstat -ano | findstr :5173

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

---

## 📧 Email Setup (For Security Alerts)

1. **Enable 2FA on Gmail:**
   - Go to: https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy 16-character password

3. **Update .env:**
```bash
SECURITY_EMAIL_USER=vsspeedsupport@exotiekoh.github.io
SECURITY_EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

---

## 🎯 Post-Installation Checklist

- [ ] Chocolatey installed
- [ ] MySQL installed and running
- [ ] Node.js installed
- [ ] npm packages installed
- [ ] .env file configured
- [ ] Database created (14 tables)
- [ ] Test connection successful
- [ ] Dev server running on localhost:5174
- [ ] Email alerts configured

---

## 🚀 Launch VSSPEED

```cmd
START_VSSPEED.bat
```

Visit: **http://localhost:5174/**

---

## 📞 Need Help?

**Email:** vsspeedsupport@exotiekoh.github.io  
**GitHub Issues:** https://github.com/Exotiekoh/VS-SPEED-WEBSITE/issues  
**Setup Guide:** SETUP_GUIDE.md

---

**Total setup time:** 15-30 minutes  
**Requirements:** Windows 10/11, Administrator access, 2GB free space
