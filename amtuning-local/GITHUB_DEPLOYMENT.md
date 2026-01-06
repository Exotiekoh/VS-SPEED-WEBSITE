# GitHub Pages Deployment Guide

## 🚀 Deploy VSSPEED Global to GitHub Pages (Free Hosting)

### Prerequisites
- Git installed on your computer
- GitHub account (free)
- Node.js installed

---

## Step 1: Create Production Build

```bash
cd c:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local
npm run build
```

This creates a `dist/` folder with optimized static files.

---

## Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name: `vsspeed-global` (or any name)
3. Make it **Public** (required for free GitHub Pages)
4. Click **Create repository**

---

## Step 3: Push Code to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial VSSPEED Global deployment"

# Add remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/vsspeed-global.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to GitHub Pages

### Option A: Using gh-pages (Recommended)

```bash
# Install gh-pages
npm install gh-pages --save-dev
```

Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/vsspeed-global"
}
```

Then run:
```bash
npm run deploy
```

### Option B: Manual GitHub Pages Setup

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** (or **main** → `/dist`)
5. Click **Save**

---

## Step 5: Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/vsspeed-global
```

---

## Step 6: Custom Domain Setup (vsspeed.org)

### Configure DNS (at your domain registrar)

Add these DNS records:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | YOUR_USERNAME.github.io |

### Add CNAME file

Create `public/CNAME` with:
```
vsspeed.org
```

### Enable in GitHub

1. Go to **Settings** → **Pages**
2. Custom domain: `vsspeed.org`
3. Check **Enforce HTTPS**
4. Wait 24-48 hours for DNS propagation

---

## Troubleshooting

### Blank Page?
Add to `vite.config.js`:
```js
export default {
  base: '/vsspeed-global/', // your repo name
}
```

### 404 on Refresh?
Create `public/404.html` that redirects to `index.html` for SPA routing.

---

## 🎉 Done!

Your VSSPEED Global site is now live and free on GitHub Pages!
