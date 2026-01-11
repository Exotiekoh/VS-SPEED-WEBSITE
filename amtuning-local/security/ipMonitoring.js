/**
 * VSSPEED.IO - Security Monitoring & IP Alert System
 * Sends email alerts to vsspeedsupport@exotiekoh.github.io for login verification
 * and security threat detection
 */

import nodemailer from 'nodemailer';
import geoip from 'geoip-lite';

// ============================================
// EMAIL CONFIGURATION
// ============================================

const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.SECURITY_EMAIL_USER || 'vsspeedsupport@exotiekoh.github.io',
    pass: process.env.SECURITY_EMAIL_PASSWORD
  }
};

const transporter = nodemailer.createTransporter(emailConfig);

const SUPPORT_EMAIL = 'vsspeedsupport@exotiekoh.github.io';

// ============================================
// IP TRACKING & GEO-LOCATION
// ============================================

/**
 * Get detailed IP information
 */
function getIPInfo(ip) {
  const geo = geoip.lookup(ip);
  
  return {
    ip,
    country: geo?.country || 'Unknown',
    region: geo?.region || 'Unknown',
    city: geo?.city || 'Unknown',
    timezone: geo?.timezone || 'Unknown',
    coordinates: geo ? `${geo.ll[0]}, ${geo.ll[1]}` : 'Unknown',
    isp: 'Unknown' // Would need additional API for ISP lookup
  };
}

/**
 * Extract real IP from request (considering proxies)
 */
function getRealIP(req) {
  // Cloudflare
  if (req.headers['cf-connecting-ip']) {
    return req.headers['cf-connecting-ip'];
  }
  
  // Standard proxy headers
  if (req.headers['x-forwarded-for']) {
    return req.headers['x-forwarded-for'].split(',')[0].trim();
  }
  
  if (req.headers['x-real-ip']) {
    return req.headers['x-real-ip'];
  }
  
  // Direct connection
  return req.ip || req.connection.remoteAddress;
}

// ============================================
// LOGIN VERIFICATION EMAIL
// ============================================

/**
 * Send login verification email to support
 */
async function sendLoginAlert(userInfo, ipInfo, loginDetails) {
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 20px; border-radius: 5px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }
        .warning { border-left-color: #f0ad4e; }
        .danger { border-left-color: #d9534f; }
        .label { font-weight: bold; color: #667eea; }
        .value { color: #333; }
        .footer { text-align: center; color: #999; margin-top: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🔐 VSSPEED Security Alert</h2>
          <p>New User Login Detected</p>
        </div>
        
        <div class="content">
          <h3>User Information</h3>
          <div class="info-box">
            <p><span class="label">User ID:</span> <span class="value">${userInfo.id}</span></p>
            <p><span class="label">Email:</span> <span class="value">${userInfo.email}</span></p>
            <p><span class="label">Username:</span> <span class="value">${userInfo.username || 'N/A'}</span></p>
            <p><span class="label">Provider:</span> <span class="value">${userInfo.provider || 'Email/Password'}</span></p>
            <p><span class="label">Account Created:</span> <span class="value">${userInfo.createdAt || 'Unknown'}</span></p>
          </div>
          
          <h3>IP Address Information</h3>
          <div class="info-box ${loginDetails.isSuspicious ? 'danger' : ''}">
            <p><span class="label">IP Address:</span> <span class="value">${ipInfo.ip}</span></p>
            <p><span class="label">Location:</span> <span class="value">${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}</span></p>
            <p><span class="label">Coordinates:</span> <span class="value">${ipInfo.coordinates}</span></p>
            <p><span class="label">Timezone:</span> <span class="value">${ipInfo.timezone}</span></p>
            <p><span class="label">ISP:</span> <span class="value">${ipInfo.isp}</span></p>
          </div>
          
          <h3>Login Details</h3>
          <div class="info-box">
            <p><span class="label">Timestamp:</span> <span class="value">${loginDetails.timestamp}</span></p>
            <p><span class="label">User Agent:</span> <span class="value">${loginDetails.userAgent}</span></p>
            <p><span class="label">Device:</span> <span class="value">${loginDetails.device}</span></p>
            <p><span class="label">Browser:</span> <span class="value">${loginDetails.browser}</span></p>
            <p><span class="label">OS:</span> <span class="value">${loginDetails.os}</span></p>
          </div>
          
          ${loginDetails.isSuspicious ? `
          <h3>⚠️ Security Warnings</h3>
          <div class="info-box danger">
            ${loginDetails.warnings.map(warning => `<p>❌ ${warning}</p>`).join('')}
          </div>
          ` : ''}
          
          ${loginDetails.isFirstTime ? `
          <div class="info-box warning">
            <p>🆕 <strong>First-time login from this IP address</strong></p>
          </div>
          ` : ''}
          
          <h3>Recommended Actions</h3>
          <div class="info-box">
            <ol>
              <li>Verify this login is legitimate</li>
              <li>Check user activity for suspicious behavior</li>
              <li>Monitor for unusual data access patterns</li>
              ${loginDetails.isSuspicious ? '<li><strong>Consider blocking this IP if activity is malicious</strong></li>' : ''}
            </ol>
          </div>
        </div>
        
        <div class="footer">
          <p>VSSPEED.IO Security System | ${new Date().toISOString()}</p>
          <p>This is an automated security alert. Do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"VSSPEED Security" <${emailConfig.auth.user}>`,
    to: SUPPORT_EMAIL,
    subject: `🔐 Login Alert: ${userInfo.email} from ${ipInfo.country} (${ipInfo.ip})`,
    html: emailBody,
    priority: loginDetails.isSuspicious ? 'high' : 'normal'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Login alert email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Failed to send login alert email:', error);
    return false;
  }
}

// ============================================
// ATTACK DETECTION EMAIL
// ============================================

/**
 * Send security threat alert
 */
async function sendSecurityThreatAlert(threatType, details, ipInfo) {
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #d9534f; color: white; padding: 20px; border-radius: 5px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
        .danger-box { background: #fff; padding: 15px; margin: 10px 0; 
                      border-left: 4px solid #d9534f; border-radius: 3px; }
        .label { font-weight: bold; color: #d9534f; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🚨 CRITICAL SECURITY ALERT</h2>
          <p>${threatType}</p>
        </div>
        
        <div class="content">
          <div class="danger-box">
            <h3>Threat Details</h3>
            <p><span class="label">Type:</span> ${details.type}</p>
            <p><span class="label">Severity:</span> ${details.severity}</p>
            <p><span class="label">Description:</span> ${details.description}</p>
          </div>
          
          <div class="danger-box">
            <h3>Source IP</h3>
            <p><span class="label">IP:</span> ${ipInfo.ip}</p>
            <p><span class="label">Location:</span> ${ipInfo.city}, ${ipInfo.country}</p>
            <p><span class="label">Requests:</span> ${details.requestCount || 'Unknown'}</p>
          </div>
          
          <div class="danger-box">
            <h3>⚡ Immediate Actions Required</h3>
            <ol>
              <li>Block IP address: ${ipInfo.ip}</li>
              <li>Review server logs</li>
              <li>Check for data breaches</li>
              <li>Enable rate limiting if not active</li>
            </ol>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"VSSPEED Security" <${emailConfig.auth.user}>`,
    to: SUPPORT_EMAIL,
    subject: `🚨 CRITICAL: ${threatType} - ${ipInfo.ip}`,
    html: emailBody,
    priority: 'high'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('🚨 Security threat alert sent');
  } catch (error) {
    console.error('Failed to send threat alert:', error);
  }
}

// ============================================
// SUSPICIOUS ACTIVITY DETECTION
// ============================================

// Track login attempts
const loginAttempts = new Map();
const ipHistory = new Map();

/**
 * Check if login is suspicious
 */
function analyzeLoginSecurity(ip, userAgent, userId) {
  const warnings = [];
  let isSuspicious = false;
  
  // Check for rapid login attempts
  const attempts = loginAttempts.get(ip) || [];
  const recentAttempts = attempts.filter(
    time => Date.now() - time < 5 * 60 * 1000 // Last 5 minutes
  );
  
  if (recentAttempts.length > 5) {
    warnings.push('Multiple rapid login attempts detected');
    isSuspicious = true;
  }
  
  // Check for new location
  const history = ipHistory.get(userId) || [];
  const isFirstTime = !history.includes(ip);
  
  if (isFirstTime && history.length > 0) {
    warnings.push('Login from new IP address');
  }
  
  // Check user agent
  if (!userAgent || userAgent.includes('bot') || userAgent.includes('crawler')) {
    warnings.push('Suspicious user agent detected');
    isSuspicious = true;
  }
  
  // Check for known malicious patterns
  if (ip.startsWith('185.') || ip.startsWith('194.')) {
    // Common VPN/proxy ranges - might be suspicious
    warnings.push('Login from VPN/proxy network');
  }
  
  // Update tracking
  attempts.push(Date.now());
  loginAttempts.set(ip, attempts);
  
  if (!history.includes(ip)) {
    history.push(ip);
    ipHistory.set(userId, history);
  }
  
  return {
    isSuspicious,
    isFirstTime,
    warnings,
    attemptCount: recentAttempts.length
  };
}

// ============================================
// MIDDLEWARE INTEGRATION
// ============================================

/**
 * Express middleware for login monitoring
 */
export const loginMonitoringMiddleware = async (req, res, next) => {
  const originalJson = res.json.bind(res);
  
  res.json = function(data) {
    // Only monitor successful logins
    if (data.success && data.user) {
      const ip = getRealIP(req);
      const ipInfo = getIPInfo(ip);
      
      const securityAnalysis = analyzeLoginSecurity(
        ip,
        req.headers['user-agent'],
        data.user.id
      );
      
      const loginDetails = {
        timestamp: new Date().toISOString(),
        userAgent: req.headers['user-agent'] || 'Unknown',
        device: detectDevice(req.headers['user-agent']),
        browser: detectBrowser(req.headers['user-agent']),
        os: detectOS(req.headers['user-agent']),
        ...securityAnalysis
      };
      
      // Send login alert email (async, don't block response)
      sendLoginAlert(data.user, ipInfo, loginDetails).catch(err => {
        console.error('Failed to send login alert:', err);
      });
      
      // If suspicious, send immediate threat alert
      if (securityAnalysis.isSuspicious) {
        sendSecurityThreatAlert(
          'Suspicious Login Activity',
          {
            type: 'Suspicious Login',
            severity: 'HIGH',
            description: securityAnalysis.warnings.join(', '),
            requestCount: securityAnalysis.attemptCount
          },
          ipInfo
        ).catch(err => console.error('Failed to send threat alert:', err));
      }
    }
    
    return originalJson(data);
  };
  
  next();
};

/**
 * Monitor for attack patterns
 */
export const attackDetectionMiddleware = (req, res, next) => {
  const ip = getRealIP(req);
  const path = req.path;
  
  // Detect SQL injection attempts
  if (path.match(/(\%27)|(\')|(\-\-)|(\%23)|(#)/i)) {
    const ipInfo = getIPInfo(ip);
    sendSecurityThreatAlert(
      'SQL Injection Attempt',
      {
        type: 'SQL Injection',
        severity: 'CRITICAL',
        description: `Attempted SQL injection on path: ${path}`,
        requestCount: 1
      },
      ipInfo
    );
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Detect XSS attempts
  if (path.match(/<script|javascript:|onerror=/i)) {
    const ipInfo = getIPInfo(ip);
    sendSecurityThreatAlert(
      'XSS Attack Attempt',
      {
        type: 'Cross-Site Scripting',
        severity: 'CRITICAL',
        description: `Attempted XSS on path: ${path}`,
        requestCount: 1
      },
      ipInfo
    );
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Detect path traversal
  if (path.match(/\.\.\/|\.\.\\|\.\.\%2f/i)) {
    const ipInfo = getIPInfo(ip);
    sendSecurityThreatAlert(
      'Path Traversal Attempt',
      {
        type: 'Directory Traversal',
        severity: 'HIGH',
        description: `Attempted path traversal: ${path}`,
        requestCount: 1
      },
      ipInfo
    );
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  next();
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function detectDevice(userAgent) {
  if (!userAgent) return 'Unknown';
  if (/mobile/i.test(userAgent)) return 'Mobile';
  if (/tablet/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
}

function detectBrowser(userAgent) {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
}

function detectOS(userAgent) {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Other';
}

// ============================================
// MANUAL ALERT FUNCTIONS
// ============================================

/**
 * Send custom security alert
 */
export async function sendCustomAlert(subject, message, severity = 'medium') {
  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: ${severity === 'high' ? '#d9534f' : '#f0ad4e'}; 
                  color: white; padding: 20px;">
        <h2>${subject}</h2>
      </div>
      <div style="padding: 20px; background: #f9f9f9;">
        <p>${message}</p>
        <p><small>Timestamp: ${new Date().toISOString()}</small></p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: emailConfig.auth.user,
    to: SUPPORT_EMAIL,
    subject: `VSSPEED Alert: ${subject}`,
    html: emailBody,
    priority: severity === 'high' ? 'high' : 'normal'
  });
}

/**
 * Daily security summary email
 */
export async function sendDailySecuritySummary() {
  const summary = {
    totalLogins: loginAttempts.size,
    uniqueIPs: ipHistory.size,
    suspiciousAttempts: 0 // Calculate from logs
  };

  const emailBody = `
    <h2>VSSPEED Daily Security Summary</h2>
    <p>Total Logins: ${summary.totalLogins}</p>
    <p>Unique IP Addresses: ${summary.uniqueIPs}</p>
    <p>Suspicious Attempts: ${summary.suspiciousAttempts}</p>
  `;

  await transporter.sendMail({
    from: emailConfig.auth.user,
    to: SUPPORT_EMAIL,
    subject: 'VSSPEED Daily Security Summary',
    html: emailBody
  });
}

export default {
  sendLoginAlert,
  sendSecurityThreatAlert,
  sendCustomAlert,
  sendDailySecuritySummary,
  loginMonitoringMiddleware,
  attackDetectionMiddleware
};
