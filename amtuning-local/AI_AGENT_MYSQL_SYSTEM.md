# AI Agent MySQL Management System

## Overview
Allow AI agent to autonomously:
- Start/stop MySQL server
- Create/manage databases
- Execute queries
- Deploy www.vsspeed.org to production
- Monitor database health
- Backup and restore data

---

## AI Agent Capabilities

### 1. MySQL Service Management

```javascript
// src/ai-agent/mysql-manager.js
export class MySQLManager {
  async startMySQL() {
    // Start MySQL portable or service
    const result = await exec('C:\\MySQL-Portable\\mysql\\bin\\mysqld.exe --console');
    await this.waitForReady();
    return { status: 'running', pid: result.pid };
  }

  async stopMySQL() {
    // Gracefully shutdown MySQL
    await exec('mysqladmin -u root shutdown');
    return { status: 'stopped' };
  }

  async getStatus() {
    try {
      await this.query('SELECT 1');
      return { running: true, healthy: true };
    } catch (error) {
      return { running: false, error: error.message };
    }
  }
}
```

### 2. Database Operations

```javascript
// src/ai-agent/database-ops.js
export class DatabaseOperations {
  constructor(config) {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'vsspeed_app',
      password: 'GB7Fvruk1w=JUj5T',
      database: 'vsspeed_db'
    });
  }

  async query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  }

  async createDatabase(name) {
    await this.query(`CREATE DATABASE IF NOT EXISTS ${name}`);
    return { database: name, created: true };
  }

  async importSchema(schemaFile) {
    const sql = fs.readFileSync(schemaFile, 'utf8');
    const statements = sql.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      await this.query(statement);
    }
    
    return { imported: true, statements: statements.length };
  }
}
```

### 3. Deployment Automation

```javascript
// src/ai-agent/deployment.js
export class DeploymentAgent {
  async deployToProduction() {
    const steps = [
      { name: 'Check MySQL', fn: () => this.mysql.getStatus() },
      { name: 'Run Migrations', fn: () => this.runMigrations() },
      { name: 'Build Frontend', fn: () => this.buildFrontend() },
      { name: 'Deploy to Vercel', fn: () => this.deployVercel() },
      { name: 'Configure DNS', fn: () => this.configureDNS() },
      { name: 'Test Live Site', fn: () => this.testLive() }
    ];

    const results = [];
    for (const step of steps) {
      console.log(`[AI Agent] ${step.name}...`);
      try {
        const result = await step.fn();
        results.push({ step: step.name, success: true, result });
      } catch (error) {
        results.push({ step: step.name, success: false, error: error.message });
        throw new Error(`Deployment failed at: ${step.name}`);
      }
    }

    return { deployed: true, url: 'https://www.vsspeed.org', steps: results };
  }

  async runMigrations() {
    const migrations = fs.readdirSync('./database/migrations');
    for (const file of migrations) {
      await this.db.importSchema(`./database/migrations/${file}`);
    }
    return { migrated: migrations.length };
  }

  async buildFrontend() {
    await exec('npm run build');
    return { built: true, output: './dist' };
  }

  async deployVercel() {
    const result = await exec('vercel --prod');
    return { deployed: true, url: result.stdout };
  }
}
```

### 4. Monitoring & Health Checks

```javascript
// src/ai-agent/monitor.js
export class DatabaseMonitor {
  constructor() {
    this.checkInterval = 60000; // 1 minute
    this.healthHistory = [];
  }

  async startMonitoring() {
    setInterval(async () => {
      const health = await this.checkHealth();
      this.healthHistory.push({ timestamp: Date.now(), ...health });
      
      if (!health.healthy) {
        await this.handleUnhealthy(health);
      }
    }, this.checkInterval);
  }

  async checkHealth() {
    try {
      // Check connection
      await this.db.query('SELECT 1');
      
      // Check table count
      const tables = await this.db.query('SHOW TABLES');
      
      // Check disk space
      const dbSize = await this.db.query(
        "SELECT SUM(data_length + index_length) / 1024 / 1024 AS size_mb FROM information_schema.TABLES WHERE table_schema = 'vsspeed_db'"
      );

      return {
        healthy: true,
        tables: tables.length,
        sizeM B: dbSize[0].size_mb,
        uptime: await this.getUptime()
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message
      };
    }
  }

  async handleUnhealthy(health) {
    console.error('[AI Agent] Database unhealthy:', health);
    
    // Attempt auto-recovery
    try {
      await this.mysql.stopMySQL();
      await sleep(2000);
      await this.mysql.startMySQL();
      
      // Send alert
      await this.sendAlert({
        type: 'database_recovery',
        status: 'attempted',
        reason: health.error
      });
    } catch (recoveryError) {
      await this.sendAlert({
        type: 'database_critical',
        status: 'failed',
        error: recoveryError.message
      });
    }
  }
}
```

### 5. Backup Automation

```javascript
// src/ai-agent/backup.js
export class BackupAgent {
  async createBackup() {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `vsspeed_backup_${timestamp}.sql`;
    
    await exec(
      `mysqldump -u vsspeed_app -pGB7Fvruk1w=JUj5T vsspeed_db > backups/${filename}`
    );

    // Upload to cloud
    await this.uploadToCloud(filename);
    
    // Cleanup old backups (keep last 30 days)
    await this.cleanupOldBackups(30);

    return { backup: filename, uploaded: true };
  }

  async scheduleBackups() {
    // Daily at 2 AM
    cron.schedule('0 2 * * *', async () => {
      console.log('[AI Agent] Running scheduled backup...');
      await this.createBackup();
    });
  }

  async uploadToCloud(filename) {
    // GitHub
    await exec(`git add backups/${filename}`);
    await exec(`git commit -m "Auto-backup: ${filename}"`);
    await exec('git push origin main');

    return { uploaded: true, location: 'github' };
  }
}
```

---

## Agent API Endpoints

### Start MySQL
```
POST /api/ai-agent/mysql/start
Response: { status: "running", pid: 12345 }
```

### Deploy to Production
```
POST /api/ai-agent/deploy
Body: { environment: "www.vsspeed.org" }
Response: { deployed: true, url: "https://www.vsspeed.org", steps: [...] }
```

### Create Backup
```
POST /api/ai-agent/backup
Response: { backup: "vsspeed_backup_2026-01-12.sql", uploaded: true }
```

### Get Health Status
```
GET /api/ai-agent/health
Response: { 
  healthy: true, 
  tables: 27, 
  sizeMB: 45.2,
  uptime: "3 days"
}
```

---

## Integration with www.vsspeed.org

### Auto-Deploy Script

```bash
#!/bin/bash
# deploy-agent.sh

echo "[AI Agent] Starting deployment to www.vsspeed.org..."

# 1. Check MySQL
node src/ai-agent/check-mysql.js || exit 1

# 2. Run migrations
node src/ai-agent/migrate.js || exit 1

# 3. Build
npm run build || exit 1

# 4. Deploy
vercel --prod || exit 1

# 5. Update DNS
node src/ai-agent/update-dns.js www.vsspeed.org || exit 1

# 6. Health check
node src/ai-agent/health-check.js https://www.vsspeed.org || exit 1

echo "[AI Agent] ✅ Deployment complete!"
```

### Continuous Monitoring

```javascript
// server.js
import { DatabaseMonitor } from './ai-agent/monitor.js';
import { BackupAgent } from './ai-agent/backup.js';

const monitor = new DatabaseMonitor();
const backup = new BackupAgent();

// Start monitoring
monitor.startMonitoring();

// Schedule backups
backup.scheduleBackups();

console.log('[AI Agent] Monitoring www.vsspeed.org...');
```

---

## Permission System

```javascript
// AI agent permissions for MySQL
const agentPermissions = {
  mysql: {
    read: true,
    write: true,
    createDatabase: true,
    dropDatabase: false, // Safety: prevent accidental deletion
    backup: true,
    restore: true
  },
  deployment: {
    build: true,
    deployStaging: true,
    deployProduction: true, // Requires approval in prod
    rollback: true
  },
  monitoring: {
    healthChecks: true,
    alerts: true,
    autoRecovery: true
  }
};
```

---

## Usage Examples

### Example 1: AI Agent Deploys www.vsspeed.org

```javascript
const agent = new DeploymentAgent();

// AI decides to deploy
const result = await agent.deployToProduction();

console.log(result);
// {
//   deployed: true,
//   url: 'https://www.vsspeed.org',
//   steps: [
//     { step: 'Check MySQL', success: true },
//     { step: 'Run Migrations', success: true },
//     { step: 'Build Frontend', success: true },
//     { step: 'Deploy to Vercel', success: true },
//     { step: 'Configure DNS', success: true },
//     { step: 'Test Live Site', success: true }
//   ]
// }
```

### Example 2: AI Agent Handles Database Issue

```javascript
const monitor = new DatabaseMonitor();

// Detects MySQL crashed
monitor.on('unhealthy', async (status) => {
  console.log('[AI Agent] Database issue detected:', status);
  
  // Auto-recovery
  await monitor.handleUnhealthy(status);
  
  // Notify humans
  await sendEmail({
    to: 'admin@vsspeed.org',
    subject: 'AI Agent: Database Auto-Recovery',
    body: `Database was down, I restarted it. Status: ${JSON.stringify(status)}`
  });
});
```

### Example 3: AI Agent Creates Scheduled Backup

```javascript
const backup = new BackupAgent();

// Every day at 2 AM
backup.scheduleBackups();

// Manual backup on demand
const result = await backup.createBackup();
console.log(result);
// { backup: "vsspeed_backup_2026-01-12.sql", uploaded: true }
```

---

## Setup Instructions

1. **Install AI Agent Dependencies:**
```bash
npm install mysql2 node-cron nodemailer
```

2. **Configure Agent:**
```javascript
// .env
MYSQL_HOST=localhost
MYSQL_USER=vsspeed_app
MYSQL_PASSWORD=GB7Fvruk1w=JUj5T
MYSQL_DATABASE=vsspeed_db

AI_AGENT_ENABLED=true
AI_AGENT_AUTO_DEPLOY=true
AI_AGENT_AUTO_BACKUP=true
AI_AGENT_MONITORING=true
```

3. **Start Agent:**
```bash
npm run ai-agent
```

4. **Verify:**
```bash
curl http://localhost:5174/api/ai-agent/health
```

**Agent is now monitoring www.vsspeed.org and can autonomously manage MySQL!**
