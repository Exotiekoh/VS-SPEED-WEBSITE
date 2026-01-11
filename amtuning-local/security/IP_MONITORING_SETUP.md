# VSSPEED Security Monitoring Configuration

## Environment Variables

Add these to your `.env` file:

```bash
# Email Configuration for Security Alerts
SECURITY_EMAIL_USER=vsspeedsupport@exotiekoh.github.io
SECURITY_EMAIL_PASSWORD=your_email_app_password

# Support Email (recipient of all alerts)
SUPPORT_EMAIL=vsspeedsupport@exotiekoh.github.io

# Security Settings
ENABLE_LOGIN_ALERTS=true
ENABLE_ATTACK_DETECTION=true
ALERT_ON_NEW_IP=true
ALERT_ON_SUSPICIOUS_ACTIVITY=true
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install nodemailer geoip-lite
```

### 2. Configure Email Service

For Gmail (recommended):
1. Go to Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password: https://myaccount.google.com/apppasswords
4. Use the app password in `SECURITY_EMAIL_PASSWORD`

### 3. Integrate with Auth System

```javascript
// In your auth routes (e.g., routes/auth.js)
import { loginMonitoringMiddleware, attackDetectionMiddleware } from '../security/ipMonitoring.js';

// Apply to all routes
app.use(attackDetectionMiddleware);

// Apply to login routes
app.post('/api/auth/login', loginMonitoringMiddleware, async (req, res) => {
  // Your login logic
  
  if (loginSuccessful) {
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        provider: 'email', // or 'google', 'microsoft', etc.
        createdAt: user.createdAt
      }
    });
    // Email will be sent automatically by middleware
  }
});
```

## What Gets Monitored

### Every Login
✅ User email & ID  
✅ IP address  
✅ Geographic location (country,  city, timezone)  
✅ Device type (mobile/desktop)  
✅ Browser & OS  
✅ Timestamp  
✅ OAuth provider  

### Security Threats Detected
🚨 Multiple rapid login attempts (>5 in 5 minutes)  
🚨 SQL injection attempts  
🚨 XSS attacks  
🚨 Path traversal attempts  
🚨 Suspicious user agents (bots, crawlers)  
🚨 Logins from new IP addresses  
🚨 VPN/proxy usage  

## Email Examples

### Normal Login Alert
```
Subject: 🔐 Login Alert: user@example.com from United States (192.168.1.1)

User logs in → Email sent to vsspeedsupport@exotiekoh.github.io with:
- User details
- IP address & location
- Device/browser info
- Security warnings (if any)
```

### Suspicious Activity Alert
```
Subject: 🚨 CRITICAL: Suspicious Login Activity - 185.xxx.xxx.xxx

Multiple warnings:
- Rapid login attempts detected
- Login from VPN network
- New IP address

Action Required: Verify legitimacy or block IP
```

### Attack Attempt Alert
```
Subject: 🚨 CRITICAL: SQL Injection Attempt - 194.xxx.xxx.xxx

Immediate action required:
- Block IP address
- Review server logs
- Check for data breaches
```

## Testing

Test the email system:

```bash
node -e "
const { sendCustomAlert } = require('./security/ipMonitoring.js');
sendCustomAlert('Test Alert', 'This is a test security alert', 'medium');
"
```

## Security Best Practices

1. **Check emails regularly** - vsspeedsupport@exotiekoh.github.io
2. **Block malicious IPs** immediately via Cloudflare
3. **Enable 2FA** for all admin accounts
4. **Review daily summaries** to spot patterns
5. **Whitelist known IPs** to reduce false positives

## Auto-Block Malicious IPs

To automatically block IPs after suspicious activity:

```javascript
import { sendSecurityThreatAlert } from './ipMonitoring.js';
import cloudflare from 'cloudflare';

const cf = new cloudflare({
  token: process.env.CLOUDFLARE_API_TOKEN
});

async function blockIP(ip, reason) {
  // Block in Cloudflare
  await cf.firewall.accessRules.create({
    mode: 'block',
    configuration: {
      target: 'ip',
      value: ip
    },
    notes: `Auto-blocked: ${reason}`
  });
  
  // Send alert
  await sendSecurityThreatAlert(
    'IP Auto-Blocked',
    {
      type: 'Auto-Block',
      severity: 'HIGH',
      description: reason
    },
    { ip }
  );
}
```

## Dashboard Integration

Monitor all alerts in a dashboard:

```javascript
// GET /api/security/alerts
app.get('/api/security/alerts', requireAdmin, async (req, res) => {
  const alerts = await getRecentAlerts();
  res.json(alerts);
});
```

## Pricing

**Email Sending (Nodemailer + Gmail):** FREE  
**GeoIP Lookups (geoip-lite):** FREE (offline database)  
**Total Cost:** $0/month

---

**All logins and security events are now monitored and reported to vsspeedsupport@exotiekoh.github.io!** 🛡️
