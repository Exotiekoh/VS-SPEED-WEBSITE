# Deploy VSSPEED to www.vsspeed.org - Complete Guide

## ⚠️ Important: VSSPEED is NOT a Static Website

**VSSPEED requires:**
- Node.js server (backend)
- MySQL database
- Server-side API endpoints
- Dynamic content generation

**GitHub Pages only supports:**
- Pure HTML/CSS/JavaScript
- No server-side code
- No databases
- Static files only

---

## Solution: Hybrid Deployment Architecture

### Architecture
```
Frontend (Static) → GitHub Pages
    ↓
Backend API → Vercel/Railway/Render (free tiers)
    ↓
Database → PlanetScale/Cloud MySQL (free tier)
```

---

## Deployment Option 1: Full GitHub Pages + Backend Services (Recommended)

### Step 1: Build Static Frontend

```cmd
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
npm run build
```

This creates a `dist/` folder with static files.

### Step 2: Create GitHub Repository

1. **Create new repo on GitHub:**
   - Go to: <https://github.com/new>
   - Name: `vsspeed-website`
   - Public repository
   - Don't initialize with README

2. **Push your code:**

```cmd
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vsspeed-website.git
git push -u origin main
```

### Step 3: Deploy Frontend to GitHub Pages

```cmd
npm install -g gh-pages
npm run build
gh-pages -d dist
```

**OR use GitHub Actions (automated):**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 4: Configure Custom Domain

1. **In GitHub repo settings:**
   - Go to Settings → Pages
   - Custom domain: `www.vsspeed.org`
   - Click Save

2. **At your domain registrar (where you bought vsspeed.org):**

Add these DNS records:

```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io

Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### Step 5: Deploy Backend API

**Option A: Vercel (Easiest, Free)**

```cmd
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Railway (Free, Good for MySQL)**

1. Go to: <https://railway.app/>
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your vsspeed-website repo
5. Add MySQL database service
6. Set environment variables

**Option C: Render (Free tier available)**

1. Go to: <https://render.com/>
2. Sign up
3. New → Web Service
4. Connect GitHub repo
5. Add PostgreSQL or MySQL database

### Step 6: Deploy Database

**Option A: PlanetScale (Free tier, 5GB)**

```cmd
# Install CLI
npm install -g @planetscale/cli

# Login
pscale auth login

# Create database
pscale database create vsspeed-db --region us-east

# Connect
pscale connect vsspeed-db main

# Import schema
mysql -h 127.0.0.1 -P 3306 -u root < database/schema.sql
mysql -h 127.0.0.1 -P 3306 -u root < database/diagnostic-database.sql
mysql -h 127.0.0.1 -P 3306 -u root < database/antigravity-schema.sql
```

**Option B: Railway MySQL (Included with backend)**

- Automatically provisioned when you add MySQL service
- No extra setup needed

### Step 7: Connect Frontend to Backend

Update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/',
  define: {
    'process.env.API_URL': JSON.stringify('https://your-backend.vercel.app')
  }
})
```

Update API calls in your React components:

```javascript
const API_URL = process.env.API_URL || 'http://localhost:5174';

// Example API call
fetch(`${API_URL}/api/products`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Deployment Option 2: All-in-One Platform (Simpler)

### Netlify (Static + Functions)

```cmd
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Pros:**
- One platform for everything
- Serverless functions for backend
- Free SSL
- Custom domains easy

**Cons:**
- Limited database options (use external DB)

### Vercel (Best for React + API)

```cmd
npm install -g vercel
vercel login
vercel --prod
```

**Pros:**
- Perfect for React apps
- Serverless functions
- Free SSL
- Great performance

**Cons:**
- Need external database

---

## Deployment Option 3: Traditional Web Host

### Use Your PC as Server (Self-Hosted)

**If you insist on hosting from your PC:**

1. **Setup Dynamic DNS** (since your IP changes):
   - No-IP.com or DuckDNS.org

2. **Port Forwarding on Router:**
   - Forward ports 80 (HTTP) and 443 (HTTPS)

3. **Install Nginx:**

```cmd
choco install nginx -y
```

4. **Configure Nginx** (`C:\nginx\conf\nginx.conf`):

```nginx
server {
    listen 80;
    server_name www.vsspeed.org vsspeed.org;
    
    location / {
        proxy_pass http://localhost:5174;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Start Services:**

```cmd
# Start Nginx
cd C:\nginx
start nginx.exe

# Start VSSPEED
cd "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"
START_VSSPEED.bat
```

6. **Get SSL Certificate:**

```cmd
choco install certbot -y
certbot certonly --standalone -d vsspeed.org -d www.vsspeed.org
```

**⚠️ Warning:** Self-hosting requires:
- Static IP or Dynamic DNS
- 24/7 PC running
- Security hardening
- Regular backups
- Higher electricity costs

---

## Recommended: Best Solution for VSSPEED

**I recommend this combination:**

1. **Frontend:** GitHub Pages (Free, Fast CDN)
2. **Backend API:** Vercel (Free tier, 100GB bandwidth)
3. **Database:** PlanetScale (Free tier, 5GB storage)
4. **Images:** Cloudflare R2 or AWS S3 (Cheap/Free)

**Total Cost:** $0-5/month

**Setup Time:** 30-60 minutes

---

## Quick Start Script

I'll create an automated deployment script for you:

```bat
@echo off
echo ================================================
echo VSSPEED - Deploy to Production
echo ================================================
echo.

echo Step 1: Building frontend...
call npm run build

echo Step 2: Deploying to GitHub Pages...
call gh-pages -d dist

echo Step 3: Deploying backend to Vercel...
call vercel --prod

echo Step 4: Database migration...
REM (Manual step - connect to PlanetScale and run migrations)

echo.
echo ================================================
echo Deployment Complete!
echo ================================================
echo.
echo Frontend: https://YOUR_USERNAME.github.io/vsspeed-website
echo Backend: https://vsspeed-api.vercel.app
echo.
echo Next: Configure custom domain (www.vsspeed.org)
echo.
pause
```

---

## What Should You Do Right Now?

1. **Choose deployment option:**
   - Option 1 (Hybrid, Recommended): Best performance, free/cheap
   - Option 2 (All-in-One): Simpler, slightly more expensive
   - Option 3 (Self-Hosted): Most control, requires always-on PC

2. **Tell me which option you prefer** and I'll create:
   - Detailed step-by-step guide
   - Automated deployment scripts
   - Configuration files
   - DNS setup instructions

3. **Once deployed, I'll help you:**
   - Set up custom domain (www.vsspeed.org)
   - Configure SSL certificate
   - Optimize performance
   - Setup monitoring

**Which deployment option do you want to use?**
