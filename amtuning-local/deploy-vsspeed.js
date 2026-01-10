#!/usr/bin/env node
/**
 * VS SPEED Advanced Deployment Script
 * Syncs all VSSPEED data, checks GitHub, and deploys
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PATHS = {
  sourceData: 'C:\\Users\\burri\\OneDrive\\Desktop\\VSSPEED',
  projectRoot: 'C:\\Users\\burri\\OneDrive\\Desktop\\first_project_Jamie_hamza\\amtuning-local',
  deployDir: 'C:\\Users\\burri\\OneDrive\\Desktop\\first_project_Jamie_hamza\\amtuning-local\\public\\vsspeed-data'
};

console.log('🚀 VS SPEED DEPLOYMENT SYSTEM\n');

// Step 1: Sync Images
console.log('[1/8] Syncing images...');
syncDirectory(
  path.join(PATHS.sourceData, 'Pictures'),
  path.join(PATHS.deployDir, 'images')
);

// Step 2: Sync AI Database
console.log('[2/8] Syncing AI database...');
syncDirectory(
  path.join(PATHS.sourceData, 'ai-shared-db'),
  path.join(PATHS.deployDir, 'ai-db')
);

// Step 3: Sync Product Data
console.log('[3/8] Syncing product data...');
const vsspeedDataPath = path.join(PATHS.sourceData, 'VSSPEED DATA 1', 'website', 'src', 'data');
if (fs.existsSync(vsspeedDataPath)) {
  syncDirectory(vsspeedDataPath, path.join(PATHS.projectRoot, 'src', 'data'));
}

// Step 4: Check Git Status
console.log('[4/8] Checking Git status...');
process.chdir(PATHS.projectRoot);
const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' });
const hasChanges = gitStatus.trim().length > 0;

if (hasChanges) {
  console.log('   ⚠️  Uncommitted changes detected:');
  console.log(gitStatus);
} else {
  console.log('   ✅ Working directory clean');
}

// Step 5: Check for missing files on GitHub
console.log('[5/8] Checking GitHub sync...');
try {
  execSync('git fetch origin', { stdio: 'inherit' });
  const behind = execSync('git rev-list HEAD..origin/main --count', { encoding: 'utf-8' }).trim();
  const ahead = execSync('git rev-list origin/main..HEAD --count', { encoding: 'utf-8' }).trim();
  
  console.log(`   📊 Commits ahead: ${ahead}, behind: ${behind}`);
  
  if (parseInt(behind) > 0) {
    console.log('   ⚠️  Remote has new commits. Consider pulling first.');
  }
} catch (error) {
  console.log('   ⚠️  Could not check remote status');
}

// Step 6: Build Production Bundle
console.log('[6/8] Building production bundle...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('   ✅ Build successful');
} catch (error) {
  console.error('   ❌ Build failed:', error.message);
  process.exit(1);
}

// Step 7: Generate Deployment Report
console.log('[7/8] Generating deployment report...');
const report = {
  timestamp: new Date().toISOString(),
  syncedDirectories: [
    'Pictures → public/vsspeed-data/images',
    'ai-shared-db → public/vsspeed-data/ai-db',
    'VSSPEED DATA 1/website/src/data → src/data'
  ],
  gitStatus: hasChanges ? 'Changes pending' : 'Clean',
  buildStatus: 'Success',
  nextSteps: [
    'Review changes: git status',
    'Commit: git add . && git commit -m "Deploy VSSPEED"',
    'Push: git push origin main',
    'Deploy: npm run deploy (or firebase deploy)'
  ]
};

fs.writeFileSync(
  path.join(PATHS.projectRoot, 'deployment-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('[8/8] Deployment preparation complete!\n');

// Display Summary
console.log('═══════════════════════════════════════');
console.log('📋 DEPLOYMENT SUMMARY');
console.log('═══════════════════════════════════════');
console.log(`✅ Images synced from: ${PATHS.sourceData}\\Pictures`);
console.log(`✅ AI database synced`);
console.log(`✅ Product data synced`);
console.log(`✅ Production build created`);
console.log(`📄 Report saved: deployment-report.json`);
console.log('═══════════════════════════════════════\n');

console.log('🎯 NEXT STEPS:');
report.nextSteps.forEach((step, i) => {
  console.log(`   ${i + 1}. ${step}`);
});

console.log('\n💡 Quick deploy: Run "DEPLOY_VSSPEED.bat" to execute all steps\n');

/**
 * Sync directory helper
 */
function syncDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    console.log(`   ⚠️  Source not found: ${source}`);
    return;
  }

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = getAllFiles(source);
  let synced = 0;

  files.forEach(file => {
    const relativePath = path.relative(source, file);
    const destPath = path.join(destination, relativePath);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Only copy if newer or doesn't exist
    if (!fs.existsSync(destPath) || 
        fs.statSync(file).mtime > fs.statSync(destPath).mtime) {
      fs.copyFileSync(file, destPath);
      synced++;
    }
  });

  console.log(`   ✅ Synced ${synced} files to ${path.basename(destination)}`);
}

/**
 * Get all files recursively
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}
