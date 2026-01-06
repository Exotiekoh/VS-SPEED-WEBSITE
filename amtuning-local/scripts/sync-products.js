// VSSPEED GLOBAL - Automated Product Sync Script
/* global process */
// Run this script to sync products from all suppliers

import { performFullSync } from '../src/automation/product-sync.js';
import { scrapeAllSuppliers } from '../src/automation/supplier-scraper.js';
import { downloadAllProductImages } from '../src/automation/image-pipeline.js';

console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║         🚀 VSSPEED GLOBAL AUTOMATION SYSTEM 🚀        ║
║                                                       ║
║           Automated Dropshipping & Sync Tool          ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`);

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'full-sync';

const runCommand = async () => {
    switch (command) {
        case 'full-sync':
            console.log('\n📋 Running FULL SYNC (products + images)...\n');
            await performFullSync();
            break;
            
        case 'products-only': {
            console.log('\n📋 Scraping products only (no image download)...\n');
            const products = await scrapeAllSuppliers(30);
            console.log(`\n✅ Scraped ${products.length} products`);
            break;
        }
            
        case 'images-only':
            console.log('\n📋 Downloading images for existing products...\n');
            // Would load existing products and download their images
            console.log('⚠️  Load products from database first');
            break;
            
        case 'test': {
            console.log('\n📋 Running TEST SYNC (5 products per supplier)...\n');
            const testProducts = await scrapeAllSuppliers(5);
            const withImages = await downloadAllProductImages(testProducts);
            console.log(`\n✅ Test complete: ${withImages.length} products with images`);
            break;
        }
            
        default:
            console.log(`
Available commands:
    npm run sync              - Full sync (products + images)
    npm run sync:products     - Scrape products only
    npm run sync:images       - Download images only  
    npm run sync:test         - Test sync (5 products)
            `);
    }
};

// Run the sync
runCommand()
    .then(() => {
        console.log('\n✅ Automation complete!\n');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Automation failed:', error.message);
        process.exit(1);
    });
