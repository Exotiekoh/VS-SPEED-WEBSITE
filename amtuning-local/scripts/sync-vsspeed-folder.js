/**
 * VS SPEED - VSSPEED Folder Sync Script
 * Syncs images, AI database, and product data from VSSPEED folder
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE = 'C:\\Users\\burri\\OneDrive\\Desktop\\VSSPEED';
const PROJECT_ROOT = path.join(__dirname, '..');
const DEST = path.join(PROJECT_ROOT, 'public', 'vsspeed-data');

console.log('🚀 VSSPEED Folder Sync\n');

function syncDirectory(source, dest, name) {
  try {
    if (!fs.existsSync(source)) {
      console.log(`⚠️  Source not found: ${source}`);
      return 0;
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    fs.cpSync(source, dest, { recursive: true });
    
    const files = getAllFiles(dest);
    console.log(`✅ ${name}: ${files.length} files synced`);
    return files.length;

  } catch (error) {
    console.error(`❌ Error syncing ${name}:`, error.message);
    return 0;
  }
}

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

async function syncVSSPEED() {
  let totalFiles = 0;

  // Sync Pictures/Images
  console.log('[1/3] Syncing images...');
  totalFiles += syncDirectory(
    path.join(SOURCE, 'Pictures'),
    path.join(DEST, 'images'),
    'Images'
  );

  // Sync AI Database
  console.log('\n[2/3] Syncing AI database...');
  totalFiles += syncDirectory(
    path.join(SOURCE, 'ai-shared-db'),
    path.join(DEST, 'ai-db'),
    'AI Database'
  );

  // Sync Product Data
  console.log('\n[3/3] Syncing product data...');
  const productDataSource = path.join(SOURCE, 'VSSPEED DATA 1', 'website', 'src', 'data');
  totalFiles += syncDirectory(
    productDataSource,
    path.join(DEST, 'product-data'),
    'Product Data'
  );

  console.log('\n' + '='.repeat(50));
  console.log('✅ VSSPEED Sync Complete!');
  console.log('='.repeat(50));
  console.log(`📁 Total files synced: ${totalFiles}`);
  console.log(`📂 Destination: ${DEST}`);
  console.log('\nFiles are now accessible at:');
  console.log('- /vsspeed-data/images/');
  console.log('- /vsspeed-data/ai-db/');
  console.log('- /vsspeed-data/product-data/');
}

syncVSSPEED();
