# 🚀 VS SPEED - Quick Launch Guide

## **FASTEST START** (One-Time Setup)

### Step 1: Configure Domain (Run Once)
1. **Right-click** `CONFIGURE_DOMAIN.bat`
2. Select **"Run as administrator"**
3. Click "Yes" when prompted
4. Wait for success message

### Step 2: Launch Website
**Double-click** `LAUNCH_VSSPEED.bat`

✅ That's it! Website opens at: **http://www.vsspeed.io:5173**

---

## 🔐 Admin Access

- **URL**: http://www.vsspeed.io:5173/admin-login
- **Username**: `335IZJEMZ`
- **Password**: `123456`

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `CONFIGURE_DOMAIN.bat` | One-time domain setup (run as admin) |
| `LAUNCH_VSSPEED.bat` | **Main launcher** - double-click to start |
| `QUICK_START.md` | Detailed automation guide |
| `SETUP_CHECKLIST.md` | Complete setup documentation |

---

## 🛠️ Manual Commands

```powershell
npm install          # Install dependencies (first time)
npm run dev          # Start dev server manually
npm run build        # Build for production
npm run sync         # Sync products from suppliers
```

---

## ❓ Troubleshooting

**Site won't load at www.vsspeed.io?**
- Run `CONFIGURE_DOMAIN.bat` as Administrator
- Restart your browser

**Port already in use?**
```powershell
netstat -ano | findstr :5173
taskkill /PID [number] /F
```

**Need to reset everything?**
```powershell
rmdir /s /q node_modules
npm install
```

---

## 📞 Support

**Email**: vsspeedhq@gmail.com

---

**VS SPEED** | Powered by www.vsspeed.io 🔥
