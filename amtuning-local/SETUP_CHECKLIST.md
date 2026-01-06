# VS SPEED - Quick Setup Checklist

## ✅ What's Been Done

### 1. Product Catalog
- ✅ Added 8 new hose/line products
- ✅ New category: "Air/Coolant/Fuel/Oil Lines"
- ✅ Pricing: Small $24.99, Medium $44.99, Large $67.99
- ✅ All products VS SPEED branded
- ✅ Images imported and ready

### 2. Local Hosting Setup
- ✅ Created `LAUNCH_VSSPEED_IO.bat` - Production server
- ✅ Created `server.js` - Node.js server with compression
- ✅ Created `CONFIGURE_DOMAIN.bat` - Sets up vsspeed.io domain
- ✅ Updated `package.json` with express dependencies
- ✅ Complete hosting guide created

### 3. Files Created
- `LAUNCH_VSSPEED_IO.bat` - One-click production launch
- `server.js` - Production HTTP server
- `CONFIGURE_DOMAIN.bat` - Domain setup (run as admin)
- `HOSTING_GUIDE.md` - Complete hosting documentation
- `START_VSSPEED.bat` - Development server (existing)
- `OPEN_BROWSER.bat` - Auto-open browser (existing)

---

## 🚀 Quick Start (3 Steps)

### Step 1: Configure Domain (One Time Only)
1. **Right-click** `CONFIGURE_DOMAIN.bat`
2. Select **"Run as administrator"**
3. Press any key when prompted
4. Wait for "Configuration Complete!" message

### Step 2: Install Dependencies (First Time)
1. Open Command Prompt in project folder
2. Run: `npm install`
3. Wait for packages to install (~2 minutes)

### Step 3: Launch Website
**Recommended: Double-click** `LAUNCH_VSSPEED.bat`
- Automatically opens at `http://www.vsspeed.io:5173`
- Checks domain configuration
- One-click launch

**Alternative Options:**

**Production Server** (For sharing)
- Double-click `LAUNCH_VSSPEED_IO.bat`
- Builds optimized version
- Opens at `http://www.vsspeed.io:3000`

**Manual Development** (For advanced users)
- Run: `npm run dev`
- Opens at `http://www.vsspeed.io:5173`

---

## 📊 Product Categories

### Air/Coolant/Fuel/Oil Lines (NEW! 🎉)
- Complete Hose Kits: $67.99
- Large Elbows/Reducers: $44.99
- Small Couplers/Elbows: $24.99

Products available:
- VS SPEED Blue Silicone Hose Kit (ID: 500)
- 90° Silicone Elbow - Large (ID: 501)
- 45° Silicone Elbow - Medium (ID: 502)
- Straight Silicone Coupler - Small (ID: 503)
- Silicone Reducer - Large (ID: 504)
- Silicone Hump Hose - Medium (ID: 505)
- Silicone T-Piece - Medium (ID: 506)
- 135° Silicone Elbow - Small (ID: 507)

---

## 🌐 Making Site Public (Free Options)

### Easiest: ngrok
1. Download: https://ngrok.com/download
2. Extract to project folder
3. Run `LAUNCH_VSSPEED_IO.bat`
4. Open new Command Prompt: `ngrok http 3000`
5. Share the https URL ngrok gives you!

### Best: Cloudflare Tunnel (Free SSL)
1. Install: https://developers.cloudflare.com/cloudflare-one/
2. Run `LAUNCH_VSSPEED_IO.bat`
3. Run: `cloudflared tunnel --url http://localhost:3000`
4. Get free `https://xxx.trycloudflare.com` URL

### Free Permanent Hosting
- **Vercel**: `npm i -g vercel` then `vercel` (free custom domain)
- **Netlify**: Drag & drop `dist` folder after running `npm run build`
- **GitHub Pages**: Free with GitHub repo

---

## 🔧 Troubleshooting

### "npm: command not found"
**Install Node.js**: https://nodejs.org/ (reboot after)

### "Port 3000 already in use"
```bash
netstat -ano | findstr :3000
taskkill /PID [number] /F
```

### Site works on localhost but not www.vsspeed.io
1. Run `CONFIGURE_DOMAIN.bat` as administrator
2. Check `C:\Windows\System32\drivers\etc\hosts` contains:
   ```
   127.0.0.1    vsspeed.io
   127.0.0.1    www.vsspeed.io
   ```
3. Run: `ipconfig /flushdns`

### Build errors
```bash
rmdir /s /q node_modules
npm install
npm run build
```

---

## 📁 File Structure

```
amtuning-local/
├── CONFIGURE_DOMAIN.bat       ← Run as admin (one time)
├── LAUNCH_VSSPEED.bat         ← **MAIN LAUNCHER** (recommended)
├── LAUNCH_VSSPEED_IO.bat      ← Production server
├── START_VSSPEED.bat          ← Development server (manual)
├── OPEN_BROWSER.bat           ← Opens browser
├── server.js                  ← Node.js HTTP server
├── HOSTING_GUIDE.md           ← Full documentation
├── package.json               ← Dependencies
├── src/
│   ├── assets/
│   │   ├── hoses_blue_catalog_1.jpg
│   │   ├── hoses_black_catalog.jpg
│   │   ├── hoses_red_catalog_1.jpg
│   │   └── hoses_blue_set.jpg
│   └── data/
│       └── productDatabase.js  ← All products (updated!)
└── dist/                      ← Built website (after npm run build)
```

---

## ✨ Next Steps

1. **Test Locally**:
   - Run `CONFIGURE_DOMAIN.bat` (as admin)
   - Double-click `LAUNCH_VSSPEED.bat`
   - Visit `http://www.vsspeed.io:5173`
   - Browse new hose products!

2. **Make Public**:
   - Use ngrok for instant sharing
   - Or deploy to Vercel for permanent hosting

3. **Custom Domain**:
   - Register vsspeed.io on Namecheap (~$10/year)
   - Point to Vercel/Netlify (free hosting)
   - Or use Cloudflare for advanced features

4. **Buy Domain**:
   - vsspeed.io available on Namecheap, GoDaddy
   - ~$10-15/year
   - Point to free hosting (Vercel recommended)

---

## 💡 Performance Tips

- Images auto-optimized during build
- Gzip compression enabled
- Static files cached (1 day)
- For more speed: Deploy to Vercel (free CDN)

---

## 🎯 Summary

**What Works Now**:
- ✅ 800+ products in catalog
- ✅ 8 new hose/line products
- ✅ Local hosting on vsspeed.io
- ✅ Production-ready builds
- ✅ One-click launchers

**To Go Public**:
1. Use ngrok (5 minutes, temporary)
2. OR deploy to Vercel (10 minutes, permanent)
3. Buy vsspeed.io domain later ($10/year)

**Questions?** Check `HOSTING_GUIDE.md` for detailed instructions!

---

*Last Updated: 2026-01-05*
*VS SPEED - vsspeed.io*
