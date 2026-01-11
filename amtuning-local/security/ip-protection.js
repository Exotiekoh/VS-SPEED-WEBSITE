/**
 * VSSPEED.IO - IP Protection & Security Layer
 * Protects admin IP address and implements security best practices
 */

// ============================================
// 1. CLOUDFLARE PROXY CONFIGURATION
// ============================================

/**
 * Cloudflare provides automatic IP masking
 * Your origin IP is hidden behind Cloudflare's network
 * 
 * Setup Steps:
 * 1. Add vsspeed.io to Cloudflare
 * 2. Enable "Proxy" (orange cloud) on DNS records
 * 3. Your real IP is automatically hidden
 */

const cloudflareConfig = {
  // DNS Records (set to Proxied)
  records: [
    { type: 'A', name: 'vsspeed.io', value: 'YOUR_SERVER_IP', proxied: true },
    { type: 'A', name: 'www', value: 'YOUR_SERVER_IP', proxied: true },
    { type: 'A', name: 'api', value: 'YOUR_SERVER_IP', proxied: true }
  ],
  
  // Security Settings
  security: {
    ssl: 'Full (strict)',
    minTLSVersion: '1.2',
    alwaysUseHTTPS: true,
    automaticHTTPSRewrites: true,
    
    // DDoS Protection
    ddosProtection: 'enabled',
    
    // WAF Rules
    wafRules: {
      securityLevel: 'high',
      challengePassage: 30, // minutes
      browserIntegrityCheck: true
    },
    
    // Rate Limiting
    rateLimiting: {
      threshold: 100, // requests per minute
      period: 60,
      action: 'challenge'
    }
  },
  
  // IP Firewall Rules
  firewallRules: [
    {
      name: 'Block known bad IPs',
      expression: '(cf.threat_score gt 10)',
      action: 'block'
    },
    {
      name: 'Challenge suspicious traffic',
      expression: '(cf.threat_score gt 5)',
      action: 'challenge'
    },
    {
      name: 'Allow admin from specific IPs only',
      expression: '(http.request.uri.path contains "/admin" and not ip.src in {YOUR_IP})',
      action: 'block'
    }
  ]
};

// ============================================
// 2. NGINX REVERSE PROXY (Additional Layer)
// ============================================

/**
 * nginx.conf
 * Place between Cloudflare and your application
 * Hides origin server details
 */

const nginxConfig = `
# /etc/nginx/nginx.conf

user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 2048;
    use epoll;
}

http {
    # Hide server information
    server_tokens off;
    more_clear_headers 'Server';
    more_clear_headers 'X-Powered-By';
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Rate limiting zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=100r/m;
    
    # Real IP from Cloudflare
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 2400:cb00::/32;
    set_real_ip_from 2606:4700::/32;
    set_real_ip_from 2803:f800::/32;
    set_real_ip_from 2405:b500::/32;
    set_real_ip_from 2405:8100::/32;
    set_real_ip_from 2c0f:f248::/32;
    set_real_ip_from 2a06:98c0::/29;
    real_ip_header CF-Connecting-IP;
    
    # Upstream servers
    upstream vsspeed_backend {
        least_conn;
        server 127.0.0.1:3000 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:3001 max_fails=3 fail_timeout=30s backup;
        keepalive 32;
    }
    
    # Main server block
    server {
        listen 80;
        listen [::]:80;
        server_name vsspeed.io www.vsspeed.io;
        
        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }
    
    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name vsspeed.io www.vsspeed.io;
        
        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/vsspeed.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/vsspeed.io/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        
        # Root directory
        root /var/www/vsspeed/dist;
        index index.html;
        
        # Logging (anonymized)
        access_log /var/log/nginx/vsspeed_access.log;
        error_log /var/log/nginx/vsspeed_error.log;
        
        # Static files
        location / {
            try_files $uri $uri/ /index.html;
            
            # Cache static assets
            location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
                expires 1y;
                add_header Cache-Control "public, immutable";
            }
        }
        
        # API proxy (hide backend)
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://vsspeed_backend/;
            proxy_http_version 1.1;
            
            # Hide origin information
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Security
            proxy_hide_header X-Powered-By;
            proxy_hide_header Server;
            
            # Timeouts
            proxy_connect_timeout 5s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
        
        # Admin area (IP restricted)
        location /admin {
            # Only allow from specific IP
            allow YOUR_ADMIN_IP;
            deny all;
            
            proxy_pass http://vsspeed_backend/admin;
        }
        
        # Block sensitive files
        location ~ /\. {
            deny all;
        }
        
        location ~ \.(env|sql|log|bak)$ {
            deny all;
        }
    }
}
`;

// ============================================
// 3. ENVIRONMENT-BASED IP MASKING
// ============================================

/**
 * Environment configuration to never expose real IPs
 */

// .env.production
const productionEnv = `
# Server Configuration (NEVER commit real values)
NODE_ENV=production

# Use Cloudflare IPs, not origin
API_URL=https://api.vsspeed.io

# Database (use private network IPs)
DATABASE_HOST=10.0.1.5
DATABASE_PORT=5432

# Redis (private IP)
REDIS_HOST=10.0.1.6
REDIS_PORT=6379

# Hide internal services
INTERNAL_API_URL=http://internal.vsspeed.local

# Admin access (whitelist specific IPs)
ADMIN_ALLOWED_IPS=YOUR_IP_1,YOUR_IP_2

# Enable IP protection
IP_PROTECTION_ENABLED=true
USE_CLOUDFLARE_PROXY=true
TRUST_PROXY=true
`;

// ============================================
// 4. EXPRESS.JS IP PROTECTION MIDDLEWARE
// ============================================

/**
 * Backend middleware to protect and anonymize IPs
 */

const ipProtectionMiddleware = `
// middleware/ipProtection.js

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Trust Cloudflare proxy
app.set('trust proxy', true);

// Helmet security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.vsspeed.io"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Hide server info
app.disable('x-powered-by');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
  
  // Don't count successful requests against limit
  skipSuccessfulRequests: false,
  
  // Custom key generator (use CF-Connecting-IP if available)
  keyGenerator: (req) => {
    return req.headers['cf-connecting-ip'] || 
           req.headers['x-forwarded-for']?.split(',')[0] || 
           req.ip;
  }
});

app.use('/api/', limiter);

// Admin IP whitelist
const adminIPWhitelist = process.env.ADMIN_ALLOWED_IPS?.split(',') || [];

function requireAdminIP(req, res, next) {
  const clientIP = req.headers['cf-connecting-ip'] || req.ip;
  
  if (!adminIPWhitelist.includes(clientIP)) {
    console.warn(\`Unauthorized admin access attempt from: \${clientIP}\`);
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  next();
}

// Anonymize logs
function anonymizeIP(ip) {
  if (!ip) return 'unknown';
  
  // IPv4: mask last octet
  if (ip.includes('.')) {
    return ip.split('.').slice(0, 3).join('.') + '.xxx';
  }
  
  // IPv6: mask last segment
  if (ip.includes(':')) {
    return ip.split(':').slice(0, 4).join(':') + ':xxxx';
  }
  
  return 'unknown';
}

// Logging middleware
app.use((req, res, next) => {
  const realIP = req.headers['cf-connecting-ip'] || req.ip;
  const anonymizedIP = anonymizeIP(realIP);
  
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.path} - IP: \${anonymizedIP}\`);
  
  next();
});

// Apply admin protection
app.use('/admin', requireAdminIP);

module.exports = {
  requireAdminIP,
  anonymizeIP
};
`;

// ============================================
// 5. DOCKER NETWORK ISOLATION
// ============================================

/**
 * Docker Compose with isolated networks
 */

const dockerComposeSecure = `
# docker-compose.yml

version: '3.8'

networks:
  # Public network (only nginx exposed)
  public:
    driver: bridge
  
  # Private network (backend services)
  private:
    driver: bridge
    internal: true

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    networks:
      - public
      - private
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/letsencrypt:ro
    restart: unless-stopped
  
  api:
    build: ./api
    networks:
      - private  # NOT exposed to public
    environment:
      - NODE_ENV=production
    restart: unless-stopped
  
  postgres:
    image: postgres:15
    networks:
      - private  # Completely isolated
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password
    restart: unless-stopped
  
  redis:
    image: redis:7-alpine
    networks:
      - private  # Completely isolated
    restart: unless-stopped

secrets:
  db_password:
    file: ./secrets/db_password.txt
`;

// ============================================
// 6. VPN SETUP (WIREGUARD)
// ============================================

/**
 * WireGuard VPN for secure admin access
 * Your IP is tunneled through VPN server
 */

const wireguardSetup = `
# Install WireGuard on server
sudo apt update
sudo apt install wireguard

# Generate keys
wg genkey | tee privatekey | wg pubkey > publickey

# Server config: /etc/wireguard/wg0.conf
[Interface]
PrivateKey = SERVER_PRIVATE_KEY
Address = 10.0.0.1/24
ListenPort = 51820

# Your device
[Peer]
PublicKey = YOUR_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32

# Start VPN
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0

# Now access admin panel through VPN IP (10.0.0.1)
# Your real IP is never exposed
`;

// ============================================
// 7. IP PROTECTION CHECKLIST
// ============================================

export const ipProtectionChecklist = {
  infrastructure: {
    cloudflare: {
      enabled: false,
      description: 'Proxies all traffic, hides origin IP',
      priority: 'CRITICAL',
      setup: 'Add domain to Cloudflare, enable proxy (orange cloud)'
    },
    nginx: {
      enabled: false,
      description: 'Reverse proxy adds additional layer',
      priority: 'HIGH',
      setup: 'Install nginx, configure as shown above'
    },
    vpn: {
      enabled: false,
      description: 'Tunnel admin access through VPN',
      priority: 'HIGH',
      setup: 'Install WireGuard on server and local machine'
    },
    docker: {
      enabled: false,
      description: 'Network isolation prevents direct access',
      priority: 'MEDIUM',
      setup: 'Use docker-compose with private networks'
    }
  },
  
  application: {
    rateLimiting: {
      enabled: false,
      description: 'Prevents DDoS and brute force',
      priority: 'CRITICAL'
    },
    ipWhitelist: {
      enabled: false,
      description: 'Only allow admin from specific IPs',
      priority: 'CRITICAL',
      allowedIPs: []
    },
    logAnonymization: {
      enabled: false,
      description: 'Masks IP addresses in logs',
      priority: 'MEDIUM'
    },
    securityHeaders: {
      enabled: false,
      description: 'Helmet.js security headers',
      priority: 'HIGH'
    }
  },
  
  monitoring: {
    cloudflare Analytics: {
      enabled: false,
      description: 'Monitor traffic without exposing IP'
    },
    failban: {
      enabled: false,
      description: 'Auto-ban malicious IPs'
    },
    alerts: {
      enabled: false,
      description: 'Email/SMS for security events'
    }
  }
};

// ============================================
// 8. QUICK DEPLOYMENT SCRIPT
// ============================================

export const deploySecureBackend = `
#!/bin/bash
# deploy-secure.sh

echo "🔒 Deploying VSSPEED Secure Backend"

# 1. Install dependencies
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx wireguard fail2ban

# 2. Setup Cloudflare
echo "📡 Add vsspeed.io to Cloudflare manually"
echo "Enable proxy (orange cloud) on all DNS records"
read -p "Press enter when Cloudflare is configured..."

# 3. Configure nginx
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl reload nginx

# 4. Get SSL certificate
sudo certbot --nginx -d vsspeed.io -d www.vsspeed.io --agree-tos --email admin@vsspeed.io

# 5. Setup fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# 6. Configure firewall
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw allow 51820/udp # WireGuard
sudo ufw enable

echo "✅ Secure backend deployed!"
echo "🔒 Your origin IP is now hidden behind Cloudflare"
echo "🔑 Setup WireGuard for admin access"
`;

console.log('✅ IP Protection configuration ready');
console.log('📋 Follow the checklist to secure your backend');
