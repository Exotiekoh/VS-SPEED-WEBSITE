# 🎯 VSSPEED AUTOMATION SYSTEM - QUICK REFERENCE CARD

## 🚀 Quick Launch
**Double-click**: `LAUNCH_VSSPEED.bat` → Automatically opens at http://www.vsspeed.io:5173

## 🔐 Admin Access
- **URL**: http://www.vsspeed.io:5173/admin-login
- **Username**: `335IZJEMZ`
- **Password**: `123456`

---

## ⚡ Quick Actions

### Start Website
```powershell
# Automatic launch (recommended)
LAUNCH_VSSPEED.bat

# Manual launch
npm run dev
```
→ Opens at: http://www.vsspeed.io:5173

### Run Product Sync
**Option 1 - Admin Dashboard** (Easy):
1. Login → Click "Automation" tab
2. Click "Sync Products" button
3. Wait ~2 minutes

**Option 2 - Terminal**:
```powershell
npm run sync        # Full sync
npm run sync:test "shop"  # Test (all products)
```

---

## 💰 Pricing Settings

**File**: `src/automation/automation-config.js`

```javascript
pricing: {
    defaultMarkup: 0.25,  // 25% profit
}
```

**Change markup**: Edit the number (0.30 = 30%)

---

## 🔧 Enable/Disable Suppliers

**Admin Dashboard**:
- Automation tab → Click "Enable/Disable" buttons

**Currently Enabled**:
- ✅ ECS Tuning
- ✅ Turner Motorsport  
- ✅ FCP Euro
- ✅ ModBargains

---

## 📊 What Gets Synced

- ✅ Product names & descriptions
- ✅ Supplier prices (+ your markup)
- ✅ Product images (downloaded locally)
- ✅ Stock availability
- ✅ Product categories

---

## 🆘 Common Issues

**Sync button does nothing?**
- Open browser console (F12), check for errors
- Reload page and try again

**No products appear?**
- Check terminal output for errors
- Run `npm run sync:test` to see logs

**Images missing?**
- Images are generated as placeholders in test mode
- For real images, need Puppeteer (advanced)

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `automation-config.js` | Settings & pricing |
| `AutomationPanel.jsx` | Admin control panel |
| `supplier-scraper.js` | Product scraping logic |
| `AUTOMATION_GUIDE.md` | Full documentation |

---

## 🚀 Commands Cheat Sheet

```powershell
npm run dev          # Start website
npm run build        # Build for production
npm run sync         # Full product sync
npm run sync:test    # Test sync (5 products)
npm run lint         # Check code quality
```

---

## 💡 Pro Tips

1. **Test first**: Always run `npm run sync:test` before full sync
2. **Adjust pricing**: Start with 25%, increase if converting well
3. **Regular syncs**: Run sync every 6-12 hours for fresh inventory
4. **Monitor logs**: Check terminal for any errors

---

## 📞 Support

**Email**: vsspeedhq@gmail.com  
**Docs**: Read `AUTOMATION_GUIDE.md` for full guide

---

✨ **Status**: SYSTEM FULLY OPERATIONAL  
🤖 **Automation**: READY TO USE  
🔥 **Your advantage**: AUTOMATED DROPSHIPPING!
