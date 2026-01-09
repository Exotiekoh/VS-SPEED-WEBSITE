# VS SPEED Local Hosting Guide - vsspeed.io

## Quick Start (Easiest Method)

### Option 1: One-Click Production Launch
1. **Double-click** `LAUNCH_VSSPEED_IO.bat`
2. Wait for build to complete (1-2 minutes)
3. Website opens at `http://localhost:3000`

### Option 2: Development Server
1. **Double-click** `START_VSSPEED.bat`
2. Dev server starts at `http://localhost:5173`
3. Hot-reload enabled for code changes

---

## Setting Up vsspeed.io Domain Locally

### Step 1: Edit Windows Hosts File

1. **Open Notepad as Administrator**:
   - Press `Win + S`, type `notepad`
   - Right-click → "Run as administrator"

2. **Open hosts file**:
   - File → Open
   - Navigate to: `C:\Windows\System32\drivers\etc\`
   - Change filter from "Text Documents" to "All Files"
   - Open the file named `hosts`

3. **Add this line at the bottom**:
   ```
   127.0.0.1    vsspeed.io
   127.0.0.1    www.vsspeed.io
   ```

4. **Save and close**

### Step 2: Launch the Server

Run either:
- `LAUNCH_VSSPEED_IO.bat` (production build on port 3000)
- `START_VSSPEED.bat` (development on port 5173)

### Step 3: Access Your Site

Open browser and go to:
- `http://vsspeed.io:3000` (production)
- `http://vsspeed.io:5173` (development)

---

## Making Your Site Publicly Accessible

### Option 1: ngrok (Free, Easiest)

1. **Download ngrok**: https://ngrok.com/download
2. **Extract to project folder**
3. **Run production server**: Double-click `LAUNCH_VSSPEED_IO.bat`
4. **Start ngrok**: Open Command Prompt and run:
   ```
   ngrok http 3000
   ```
5. ngrok will give you a public URL like: `https://abc123.ngrok.io`
6. **Share this URL** - anyone can access your site!

**Free Limitations**:
- Random URL each time (upgrade for custom domain)
- Session expires when you close ngrok
- Perfect for testing/demos

### Option 2: Expose via Router (Port Forwarding)

**Requirements**: 
- Admin access to your router
- Static/known public IP

**Steps**:
1. Find your PC's local IP (run `ipconfig` in CMD)
2. Log in to your router (usually 192.168.1.1 or 192.168.0.1)
3. Find "Port Forwarding" settings
4. Forward external port 80 → internal port 3000 to your PC's IP
5. Find your public IP: https://whatismyipaddress.com/
6. Access via: `http://[your-public-ip]`

**Security Note**: Only do this if you understand the risks!

### Option 3: Cloudflare Tunnel (Free, Recommended)

1. **Install Cloudflare**: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
2. **Run production server**: `LAUNCH_VSSPEED_IO.bat`
3. **Start tunnel**:
   ```
   cloudflared tunnel --url http://localhost:3000
   ```
4. Get a free `https://xxx.trycloudflare.com` URL
5. Can upgrade to custom domain on free plan!

---

## Project Files Overview

| File | Purpose |
|------|---------|
| `START_VSSPEED.bat` | Development server (hot reload) |
| `LAUNCH_VSSPEED_IO.bat` | Production server (optimized build) |
| `OPEN_BROWSER.bat` | Opens site in browser |
| `server.js` | Node.js production server |
| `package.json` | Dependencies and scripts |

---

## Troubleshooting

### "Port already in use"
**Solution**: Another app is using port 3000
```bash
# Find what's using the port
netstat -ano | findstr :3000

# Kill the process (replace PID with number from above)
taskkill /PID [number] /F
```

### Site works on localhost but not vsspeed.io
**Solution**: Check hosts file
1. Open `C:\Windows\System32\drivers\etc\hosts` as admin
2. Verify these lines exist:
   ```
   127.0.0.1    vsspeed.io
   127.0.0.1    www.vsspeed.io
   ```
3. Save and flush DNS: `ipconfig /flushdns`

### Build fails
**Solution**: Clear node_modules and reinstall
```bash
rmdir /s /q node_modules
npm install
```

### Python not found error
**Install Python**: https://www.python.org/downloads/ OR
**Use Node instead**: Edit `LAUNCH_VSSPEED_IO.bat`, remove Python line

---

## Performance Optimization

### Current Settings
- Gzip compression: ✅ Enabled
- Caching: ✅ 1 day max-age
- Image optimization: ⚠️ Manual (see below)

### Optimize Images

**For faster loading**:
1. Install image optimizer:
   ```bash
   npm install -g sharp-cli
   ```
2. Compress all images:
   ```bash
   sharp -i "src/assets/*.{jpg,png}" -o "src/assets/optimized/" -f webp -q 80
   ```

### Enable HTTP/2

For Node server, install:
```bash
npm install spdy
```

Then update `server.js` to use HTTPS with HTTP/2 (requires SSL certificate).

---

## Free Hosting Alternatives

If you don't want to self-host from your computer:

### 1. **Vercel** (Recommended)
- Free tier: Unlimited sites
- Auto-deploy from GitHub
- Custom domain support
- CDN included
- **Setup**: https://vercel.com/

### 2. **Netlify**
- Free tier: 100GB/month bandwidth
- Drag & drop deployment
- Custom domain
- **Setup**: https://www.netlify.com/

### 3. **GitHub Pages**
- Free, unlimited bandwidth
- Requires GitHub repo
- Custom domain support
- **Setup**: https://pages.github.com/

### Deploying to Vercel (Easiest)
1. Install Vercel CLI: `npm i -g vercel`
2. Run in project folder: `vercel`
3. Follow prompts (create account if needed)
4. Get free `https://vsspeed.vercel.app` URL!
5. Add custom domain `vsspeed.io` in dashboard

---

## Advanced: Always-On Server

To keep your site running 24/7 on your PC:

### Windows Service Method

1. **Install NSSM** (service wrapper): https://nssm.cc/download
2. Extract `nssm.exe` to project folder
3. **Open Command Prompt as Admin**
4. Navigate to project folder
5. **Install as service**:
   ```bash
   nssm install VSSpeedWeb

node.exe "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local\server.js"
   ```
6. Start service: `nssm start VSSpeedWeb`

Now VS SPEED runs on boot automatically!

---

## Security Checklist

Before making site public:

- [ ] Change admin password in code
- [ ] Remove development API keys
- [ ] Enable HTTPS (use Cloudflare/ngrok for free SSL)
- [ ] Add rate limiting (prevent abuse)
- [ ] Set up firewall rules
- [ ] Regular backups of database/content

---

## Getting Help

**Issues?**
1. Check this guide's troubleshooting section
2. Verify all commands run as Administrator
3. Check Windows Firewall isn't blocking ports
4. Restart your computer (seriously, it helps!)

**Next Steps?**
- Once site works locally, try ngrok for public access
- When ready to scale, deploy to Vercel/Netlify
- Purchase vsspeed.io domain and point to hosting

---

*Last Updated: 2026-01-05*
*For: VS SPEED Performance Parts*
