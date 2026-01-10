/**
 * VS SPEED - Antigravity Cloud Sync
 * Syncs Antigravity brain/artifacts with GitHub and Firebase Storage
 */

import { ref, uploadBytes, getDownloadURL, listAll, getBytes } from 'firebase/storage';
import { storage } from '../config/firebase';
import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_REPO_OWNER = 'Exotiekoh';
const GITHUB_REPO_NAME = 'VS-SPEED-ANTIGRAVITY-BRAIN';

const octokit = new Octokit({ auth: GITHUB_TOKEN });

/**
 * Sync Antigravity brain to Firebase Storage
 */
export const syncBrainToCloud = async (brainPath, sessionId) => {
  try {
    console.log('🧠 Syncing Antigravity brain to cloud...');

    // Read local brain files (would need to be passed from backend)
    const files = {
      task: localStorage.getItem(`antigravity_task_${sessionId}`),
      implementationPlan: localStorage.getItem(`antigravity_plan_${sessionId}`),
      walkthrough: localStorage.getItem(`antigravity_walkthrough_${sessionId}`)
    };

    // Upload to Firebase Storage
    const timestamp = Date.now();
    for (const [type, content] of Object.entries(files)) {
      if (content) {
        const storageRef = ref(storage, `antigravity/brain/${sessionId}/${type}_${timestamp}.md`);
        const blob = new Blob([content], { type: 'text/markdown' });
        await uploadBytes(storageRef, blob);
        console.log(`✅ Uploaded ${type} to cloud`);
      }
    }

    return { success: true, timestamp };
  } catch (error) {
    console.error('Brain sync error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sync Antigravity brain to GitHub (private repo)
 */
export const syncBrainToGitHub = async (sessionId, files) => {
  try {
    console.log('🔄 Syncing Antigravity brain to GitHub...');

    for (const [filename, content] of Object.entries(files)) {
      const path = `sessions/${sessionId}/${filename}`;
      
      // Check if file exists
      let sha;
      try {
        const { data } = await octokit.repos.getContent({
          owner: GITHUB_REPO_OWNER,
          repo: GITHUB_REPO_NAME,
          path
        });
        sha = data.sha;
      } catch (e) {
        // File doesn't exist, will create new
      }

      // Create or update file
      await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_REPO_OWNER,
        repo: GITHUB_REPO_NAME,
        path,
        message: `Update ${filename} - Session ${sessionId}`,
        content: Buffer.from(content).toString('base64'),
        sha
      });

      console.log(`✅ Synced ${filename} to GitHub`);
    }

    return { success: true };
  } catch (error) {
    console.error('GitHub sync error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Pull Antigravity brain from cloud
 */
export const pullBrainFromCloud = async (sessionId) => {
  try {
    console.log('📥 Pulling Antigravity brain from cloud...');

    const brainRef = ref(storage, `antigravity/brain/${sessionId}`);
    const fileList = await listAll(brainRef);

    const files = {};
    for (const item of fileList.items) {
      const url = await getDownloadURL(item);
      const response = await fetch(url);
      const content = await response.text();
      
      const filename = item.name.split('_')[0]; // Extract type from filename
      files[filename] = content;
    }

    return { success: true, files };
  } catch (error) {
    console.error('Pull brain error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Pull Antigravity brain from GitHub
 */
export const pullBrainFromGitHub = async (sessionId) => {
  try {
    console.log('📥 Pulling Antigravity brain from GitHub...');

    const { data } = await octokit.repos.getContent({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      path: `sessions/${sessionId}`
    });

    const files = {};
    for (const file of data) {
      if (file.type === 'file') {
        const { data: fileData } = await octokit.repos.getContent({
          owner: GITHUB_REPO_OWNER,
          repo: GITHUB_REPO_NAME,
          path: file.path
        });
        
        files[file.name] = Buffer.from(fileData.content, 'base64').toString('utf-8');
      }
    }

    return { success: true, files };
  } catch (error) {
    console.error('GitHub pull error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Store temporary cache data
 */
export const storeTempData = async (key, data, expiryMinutes = 60) => {
  try {
    const tempRef = ref(storage, `temp/${key}.json`);
    const blob = new Blob([JSON.stringify({
      data,
      expiry: Date.now() + (expiryMinutes * 60 * 1000)
    })], { type: 'application/json' });
    
    await uploadBytes(tempRef, blob);
    
    return { success: true };
  } catch (error) {
    console.error('Temp data storage error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Retrieve temporary cache data
 */
export const getTempData = async (key) => {
  try {
    const tempRef = ref(storage, `temp/${key}.json`);
    const url = await getDownloadURL(tempRef);
    const response = await fetch(url);
    const cached = await response.json();

    // Check expiry
    if (cached.expiry < Date.now()) {
      console.log('⚠️ Cached data expired');
      return { success: false, expired: true };
    }

    return { success: true, data: cached.data };
  } catch (error) {
    console.error('Temp data retrieval error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Store cookies/session data
 */
export const storeCookieData = async (sessionId, cookies) => {
  try {
    const cookieRef = ref(storage, `cookies/${sessionId}.json`);
    const blob = new Blob([JSON.stringify(cookies)], { type: 'application/json' });
    await uploadBytes(cookieRef, blob);
    
    return { success: true };
  } catch (error) {
    console.error('Cookie storage error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Auto-sync on interval
 */
export const startAutoSync = (sessionId, intervalMinutes = 30) => {
  console.log(`🔄 Starting auto-sync every ${intervalMinutes} minutes`);

  return setInterval(async () => {
    const files = {
      'task.md': localStorage.getItem(`antigravity_task_${sessionId}`),
      'implementation_plan.md': localStorage.getItem(`antigravity_plan_${sessionId}`),
      'walkthrough.md': localStorage.getItem(`antigravity_walkthrough_${sessionId}`)
    };

    // Sync to both GitHub and Firebase
    await syncBrainToCloud(null, sessionId);
    await syncBrainToGitHub(sessionId, files);

    console.log('✅ Auto-sync completed');
  }, intervalMinutes * 60 * 1000);
};

export default {
  syncBrainToCloud,
  syncBrainToGitHub,
  pullBrainFromCloud,
  pullBrainFromGitHub,
  storeTempData,
  getTempData,
  storeCookieData,
  startAutoSync
};
