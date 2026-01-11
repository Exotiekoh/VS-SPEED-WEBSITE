# VSSPEED.IO - Production Deployment Guide
# Deploy to www.vsspeed.io

## 🌐 Deployment Options

### **Option 1: Firebase Hosting (Recommended)**
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Easy deployment
- ✅ Automatic scaling
- ✅ Free tier available

### **Option 2: Netlify**
- ✅ Free SSL
- ✅ Easy Git integration
- ✅ Automatic builds
- ✅ Great performance

### **Option 3: Cloudflare Pages**
- ✅ Free hosting
- ✅ DDoS protection
- ✅ Fast CDN
- ✅ Analytics

---

## 📋 Prerequisites

1. **Domain Ownership**
   - Own `vsspeed.io` domain
   - Access to DNS settings

2. **Build Ready**
   - ✅ Node.js installed
   - ✅ npm packages installed
   - ✅ MySQL configured (for backend)

3. **Firebase Account** (if using Firebase)
   - Create at: https://console.firebase.google.com/

---

## 🚀 Quick Deploy - Firebase (15 minutes)

### Step 1: Install Firebase CLI

```cmd
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```cmd
firebase login
```

### Step 3: Initialize Firebase

```cmd
firebase init
```

**Select:**
- ☑ Hosting
- ☑ Firestore (optional - for database)
- ☑ Storage (optional - for files)
- ☑ Functions (optional - for backend)

**Configuration:**
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub automatic builds: `No` (for now)

### Step 4: Build Production Bundle

```cmd
npm run build
```

### Step 5: Deploy to Firebase

```cmd
firebase deploy
```

**You'll get a URL like:**
```
https://your-project.web.app
https://your-project.firebaseapp.com
```

### Step 6: Connect Custom Domain

**In Firebase Console:**
1. Go to Hosting → Add custom domain
2. Enter: `vsspeed.io` and `www.vsspeed.io`
3. Copy the DNS records shown

**In Your Domain Registrar:**
1. Go to DNS settings
2. Add records:

```dns
Type: A
Name: @
Value: 151.101.1.195
        151.101.65.195

Type: A
Name: www
Value: 151.101.1.195
        151.101.65.195

Type: TXT
Name: @
Value: <verification code from Firebase>
```

3. Wait for DNS propagation (5 minutes - 48 hours)

### Step 7: Verify & Enable SSL

Firebase automatically provisions SSL certificate.

**Your site will be live at:**
- ✅ https://www.vsspeed.io
- ✅ https://vsspeed.io

---

## 📦 Automated Deployment Script

Run this for one-click deployment:

```cmd
DEPLOY_TO_FIREBASE.bat
```

This will:
1. Build production bundle
2. Deploy to Firebase
3. Show deployment URL

---

## 🔧 Option 2: Netlify Deployment

### Step 1: Install Netlify CLI

```cmd
npm install -g netlify-cli
```

### Step 2: Login

```cmd
netlify login
```

### Step 3: Build & Deploy

```cmd
npm run build
netlify deploy --prod --dir=dist
```

### Step 4: Configure Domain

```cmd
netlify domains:add vsspeed.io
```

Follow DNS instructions shown.

---

## ⚙️ DNS Configuration

**For Cloudflare (Recommended for Security):**

1. **Add site to Cloudflare:**
   - Go to: https://dash.cloudflare.com/
   - Add `vsspeed.io`

2. **Update Nameservers** at your domain registrar:
   ```
   NS: teri.ns.cloudflare.com
   NS: walt.ns.cloudflare.com
   ```

3. **Add DNS Records:**
   ```
   Type: A
   Name: @
   Value: <your_server_ip>
   Proxy: Orange cloud (enabled)

   Type: CNAME
   Name: www
   Value: vsspeed.io
   Proxy: Orange cloud (enabled)
   ```

4. **Enable SSL:**
   - SSL/TLS → Full (strict)
   - Edge Certificates → Always Use HTTPS

---

## 🗄️ Backend Deployment

### Database Options:

**1. Firebase Firestore** (Serverless)
```cmd
firebase deploy --only firestore
```

**2. MySQL on Cloud:**
- **DigitalOcean:** Managed MySQL ($15/mo)
- **AWS RDS:** MySQL instance (~$20/mo)
- **PlanetScale:** Serverless MySQL (free tier)

**3. Self-Hosted:**
- Deploy MySQL server
- Configure firewall (port 3306)
- Update `.env` with public IP

---

## 🔐 Environment Variables

**For Firebase Functions:**

```cmd
firebase functions:config:set mysql.host="YOUR_HOST"
firebase functions:config:set mysql.user="vsspeed_app"
firebase functions:config:set mysql.password="YOUR_PASSWORD"
firebase functions:config:set mysql.database="vsspeed_db"
```

**For Netlify:**

In Netlify Dashboard → Site settings → Environment variables:
```
MYSQL_HOST=your_host
MYSQL_USER=vsspeed_app
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=vsspeed_db
```

---

## 📊 Deployment Checklist

### Pre-Deployment:
- [ ] Domain purchased (vsspeed.io)
- [ ] Hosting chosen (Firebase/Netlify/etc)
- [ ] Production build tested locally
- [ ] Database deployed/accessible
- [ ] Environment variables configured
- [ ] SSL certificate ready

### During Deployment:
- [ ] Build production bundle (`npm run build`)
- [ ] Deploy front-end
- [ ] Configure DNS
- [ ] Set up custom domain
- [ ] Enable SSL/HTTPS
- [ ] Deploy backend/functions

### Post-Deployment:
- [ ] Test website at www.vsspeed.io
- [ ] Verify all pages load
- [ ] Test payment system
- [ ] Check database connections
- [ ] Monitor analytics
- [ ] Set up error tracking (Sentry)

---

## 🎯 Performance Optimization

### Before deployment, optimize:

**1. Image Optimization:**
```cmd
npm install -D vite-plugin-imagemin
```

**2. Code Splitting:**
Already configured in Vite

**3. Lazy Loading:**
Implemented for routes

**4. Compression:**
Enable gzip in hosting config

**5. CDN:**
Firebase/Netlify includes CDN

---

## 📈 Monitoring & Analytics

### Google Analytics:

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Firebase Analytics:
Already integrated if using Firebase.

### Sentry Error Tracking:
```cmd
npm install @sentry/react
```

---

## 💰 Estimated Costs

| Service | Cost |
|---------|------|
| **Domain (vsspeed.io)** | $12/year |
| **Firebase Hosting** | FREE (or $25/mo for Blaze) |
| **SSL Certificate** | FREE (included) |
| **Database (Firebase)** | FREE tier available |
| **Database (MySQL Cloud)** | $15-50/month |
| **Email (Google Workspace)** | $6/user/month |
| **Total (Basic)** | **~$30/month** |

---

## 🚨 Troubleshooting

### Build fails:
```cmd
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### DNS not propagating:
- Wait 24-48 hours
- Check: https://dnschecker.org/

### SSL errors:
- Ensure Force HTTPS enabled
- Clear browser cache
- Wait for certificate provisioning (can take hours)

### 404 errors:
- Verify `dist` folder exists
- Check hosting configuration
- Ensure rewrites configured for SPA

---

## 📞 Support

- **Deployment Issues:** Firebase Support
- **Domain Issues:** Your registrar support
- **Technical Issues:** vsspeedsupport@exotiekoh.github.io

---

**Ready to deploy! Run `DEPLOY_TO_FIREBASE.bat` to start!** 🚀
