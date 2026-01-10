# Antigravity Cloud Sync Setup

Sync Antigravity's brain/artifacts with GitHub and cloud storage for persistent AI memory.

## Architecture

```
Local Machine (.gemini/antigravity/brain)
    ↕️
Firebase Storage (temp/cache/cookies)
    ↕️
GitHub Private Repo (VS-SPEED-ANTIGRAVITY-BRAIN)
```

## Setup Instructions

### Step 1: Create Private GitHub Repository

1. Go to https://github.com/new
2. Repository name: `VS-SPEED-ANTIGRAVITY-BRAIN`
3. **Set to PRIVATE** ✅
4. Description: "Antigravity AI brain and artifacts storage"
5. Create repository

### Step 2: Generate GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "VS SPEED Antigravity Sync"
4. Scopes: Select `repo` (full control of private repositories)
5. Generate token and **copy it**

### Step 3: Configure Environment Variables

Add to `.env`:
```bash
# Antigravity GitHub Sync
VITE_GITHUB_TOKEN=ghp_your_token_here
VITE_ANTIGRAVITY_SYNC_ENABLED=true
VITE_ANTIGRAVITY_AUTO_SYNC_MINUTES=30
```

### Step 4: Install Dependencies

```bash
npm install @octokit/rest
```

### Step 5: Firebase Storage Rules

Add to `storage.rules`:
```javascript
// Antigravity brain storage
match /antigravity/{allPaths=**} {
  allow read, write: if request.auth != null 
    && request.auth.token.email == 'vsspeedhq@gmail.com';
}

// Temporary cache
match /temp/{tempFile} {
  allow read, write: if request.auth != null;
}

// Cookie storage
match /cookies/{sessionId} {
  allow read, write: if request.auth != null;
}
```

## Usage

### Sync Brain to Cloud

```javascript
import { syncBrainToCloud, syncBrainToGitHub } from './services/antigravitySync';

// Sync to Firebase Storage
await syncBrainToCloud(null, 'session-id-123');

// Sync to GitHub
const files = {
  'task.md': taskContent,
  'implementation_plan.md': planContent,
  'walkthrough.md': walkthroughContent
};
await syncBrainToGitHub('session-id-123', files);
```

### Pull Brain from Cloud

```javascript
import { pullBrainFromCloud, pullBrainFromGitHub } from './services/antigravitySync';

// Pull from Firebase
const { files } = await pullBrainFromCloud('session-id-123');

// Pull from GitHub
const { files } = await pullBrainFromGitHub('session-id-123');
```

### Auto-Sync

```javascript
import { startAutoSync } from './services/antigravitySync';

// Start auto-sync every 30 minutes
const syncInterval = startAutoSync('session-id-123', 30);

// Stop auto-sync
clearInterval(syncInterval);
```

### Store Temporary Data

```javascript
import { storeTempData, getTempData } from './services/antigravitySync';

// Store with 60-minute expiry
await storeTempData('product-cache', productData, 60);

// Retrieve
const { data, expired } = await getTempData('product-cache');
```

## Cloud Functions for Backend Sync

Create `functions/antigravitSync.js`:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Octokit } = require('@octokit/rest');

exports.syncBrainToGitHub = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated');
  }

  const { sessionId, files } = data;
  const octokit = new Octokit({
    auth: functions.config().github.token
  });

  for (const [filename, content] of Object.entries(files)) {
    await octokit.repos.createOrUpdateFileContents({
      owner: 'Exotiekoh',
      repo: 'VS-SPEED-ANTIGRAVITY-BRAIN',
      path: `sessions/${sessionId}/${filename}`,
      message: `Auto-sync: ${filename}`,
      content: Buffer.from(content).toString('base64')
    });
  }

  return { success: true };
});
```

## Automatic Sync Script

Create `.github/workflows/sync-brain.yml`:

```yaml
name: Sync Antigravity Brain

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync from Firebase to GitHub
        run: |
          echo "Syncing Antigravity brain..."
          # Add sync logic here
```

## Directory Structure

```
VS-SPEED-ANTIGRAVITY-BRAIN/
├── sessions/
│   ├── session-2026-01-09/
│   │   ├── task.md
│   │   ├── implementation_plan.md
│   │   └── walkthrough.md
│   ├── session-2026-01-10/
│   └── ...
├── cache/
│   ├── products.json
│   ├── analytics.json
│   └── ...
└── README.md
```

## Firebase Storage Structure

```
antigravity/
├── brain/
│   ├── session-id-123/
│   │   ├── task_1736483920.md
│   │   ├── implementation_plan_1736483920.md
│   │   └── walkthrough_1736483920.md
temp/
├── product-cache.json
└── analytics-cache.json
cookies/
└── session-id-123.json
```

## Security

- ✅ GitHub repo is **PRIVATE**
- ✅ GitHub token stored in environment variables
- ✅ Firebase Storage rules restrict access to admin
- ✅ All syncs encrypted in transit (HTTPS)
- ✅ Tokens never committed to git

## Cost Estimate

- **GitHub:** FREE (private repo included)
- **Firebase Storage:** FREE (first 5GB)
- **Total:** $0/month

## Benefits

1. **Persistence:** AI memory persists across sessions
2. **Backup:** Automatic backup to multiple locations
3. **Sync:** Work from multiple machines
4. **Recovery:** Restore AI context from any session
5. **Collaboration:** Share AI artifacts with team (future)
