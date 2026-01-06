# VS SPEED - Local Server Setup Guide

## 🚀 Quick Start

### Launch the Server
1. **Right-click** `LAUNCH_VSSPEED.bat`
2. **Select** "Run as Administrator"
3. Browser will automatically open to **www.vsspeed.io:5174**

## 🌐 Access Your Website

Your website is now accessible at:
- **http://www.vsspeed.io:5174** (Primary)
- **http://vsspeed.io:5174**
- **http://localhost:5174** (Fallback)

## 📋 What Was Set Up

### 1. **Local Domain Configuration**
   - Modified Windows hosts file
   - Mapped `vsspeed.io` → `127.0.0.1`
   - Mapped `www.vsspeed.io` → `127.0.0.1`
   - DNS cache flushed automatically

### 2. **Automated Server Launch**
   - Checks Node.js installation
   - Starts development server (`npm run dev`)
   - Opens browser automatically
   - Shows all access URLs

### 3. **Product Updates**
   - ✅ Added VS SPEED GT86/BRZ Widebody Kit
   - ✅ Part #: VSS-GT86-WB-V3
   - ✅ Premium carbon fiber kit with AI-generated product image
   - ✅ Complete specifications and features

### 4. **Background Enhancements**
   - ✅ Rotating VS SPEED branded backgrounds (30-second intervals)
   - ✅ 5 high-quality images cycling automatically
   - ✅ Smooth cross-fade transitions

### 5. **Interactive Features**
   - ✅ 3D rotating product cards (cursor-tracking)
   - ✅ Functional wishlist (Heart button)
   - ✅ Quick view (Eye button)
   - ✅ GPU-accelerated animations

## 🛠️ Troubleshooting

### Server Won't Start
**Problem**: "Node.js not found"
**Solution**: Install Node.js from https://nodejs.org

### Domain Not Working
**Problem**: "vsspeed.io can't be reached"
**Solution**: 
1. Run `LAUNCH_VSSPEED.bat` as Administrator
2. Check that hosts file was modified
3. Run `ipconfig /flushdns` in PowerShell

### Port Already in Use
**Problem**: "Port 5174 is already in use"
**Solution**:
1. Close all node.js processes
2. Run: `taskkill /F /IM node.exe`
3. Restart the server

## 📁 Important Files

- **LAUNCH_VSSPEED.bat** - Main server launcher (run as admin)
- **HOST_PUBLIC.bat** - Public hosting with Cloudflare/Ngrok
- **package.json** - Project dependencies
- **vite.config.js** - Development server configuration

## 🔧 Manual Commands

If you prefer manual control:

```powershell
# Start the development server manually
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌍 Make It Public (Optional)

Use `HOST_PUBLIC.bat` to expose your site publicly:
- **Cloudflare Tunnel** (Recommended, Free HTTPS)
- **Ngrok** (Free tier available)
- **Local Network** (Wi-Fi only access)

## 📝 Notes

- Server runs on **port 5174** by default
- Hosts file located at: `C:\Windows\System32\drivers\etc\hosts`
- Backup created at: `C:\Windows\System32\drivers\etc\hosts.backup`
- To stop server: Press any key in the terminal window

## ✨ New Features

### Background Rotation System
- 5 VS SPEED branded images
- Changes every 30 seconds
- Smooth 1.5s fade transitions
- Located: `/public/images/backgrounds/`

### Product Catalog
- VS SPEED GT86/BRZ Widebody Kit added
- All products show VS SPEED branding
- Complete specifications and part numbers
- High-quality product images

---

**VS SPEED GLOBAL**
*Premium European Performance Parts & Tuning*
