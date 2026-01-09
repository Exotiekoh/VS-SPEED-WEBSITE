# 🤖 VS SPEED GLOBAL - Dropshipping Automation

## Quick Start Guide for Non-Coders

### What This Does

Automatically scrapes products from suppliers (ECS Tuning, Turner, FCP Euro, ModBargains), downloads images, applies your markup pricing, and updates your website catalog.

---

## How to Use

### Option 1: From Admin Dashboard (Recommended)

1. Navigate to your website: `http://localhost:5173`
2. Click "Account" → "Admin Login"
3. Login with:
   - **Username**: `335IZJEMZ`
   - **Password**: `123456`
4. Click **"Automation"** tab on the left
5. Click the big **"Sync Products"** button
6. Wait 2-5 minutes for the magic to happen! ✨

### Option 2: From Command Line

Open PowerShell in your project folder and run:

```powershell
# Full sync (products + images) - Recommended
npm run sync

# Products only (no image download)
npm run sync:products

# Images only (for existing products)
npm run sync:images

# Test mode (only 5 products per supplier)
npm run sync:test
```

---

## Configuration

### Set Your Profit Margins

Edit `src/automation/automation-config.js`:

```javascript
pricing: {
    defaultMarkup: 0.25,  // 25% profit margin
    categoryMarkups: {
        'Performance Tuning': 0.30,  // 30% on tuning parts
        'Custom Fabrication': 0.35   // 35% on custom work
    }
}
```

### Enable/Disable Suppliers

In the admin dashboard → Automation tab, click "Enable" or "Disable" next to each supplier.

---

## What Happens During Sync

1. **🔍 Scraping**: Connects to each supplier website
2. **📥 Downloading**: Grabs product names, prices, descriptions, images
3. **💰 Pricing**: Applies your markup (e.g., supplier price $100 → you charge $125)
4. **🖼️ Images**: Downloads and saves images locally
5. **💾 Database**: Updates your product catalog
6. **✅ Done**: New products appear on your website!

---

## Automation Schedule

By default, the system runs automatically:

- **Product sync**: Every 6 hours
- **Price updates**: Once daily
- **Inventory check**: Once per hour

You can change this in `automation-config.js`:

```javascript
automation: {
    syncInterval: 21600000,  // 6 hours in milliseconds
    enableAutoSync: true      // Set to false to disable auto-sync
}
```

---

## Troubleshooting

### "Sync button does nothing"

- Check browser console (F12) for errors
- Make sure dev server is running (`npm run dev`)

### "No products appear after sync"

- Run `npm run sync:test` in terminal to see detailed logs
- Check `src/data/productDatabase.js` for new products

### "Images not downloading"

- Images are mocked in test mode
- Real implementation requires Puppeteer (advanced setup)

---

## Next Steps

### For Production (Real Dropshipping)

1. **Install Puppeteer** for real web scraping:

   ```powershell
   npm install puppeteer axios sharp
   ```

2. **Get supplier API keys** (if available):

   - Add to `.env` file:

     ```text
     ECS_API_KEY=your_key_here
     TURNER_API_KEY=your_key_here
     ```

3. **Set up email notifications**:

   - Sign up for SendGrid or Mailgun
   - Add API key to automation-config.js

4. **Deploy to cloud** for 24/7 automation:

   - Use Netlify, Vercel, or AWS
   - Set up cron jobs for scheduled syncs

---

## Support

Need help? Email: `vsspeedhq@gmail.com`

Built with 🔥 by VS SPEED GLOBAL Automation Team
