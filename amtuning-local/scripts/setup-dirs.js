// Create public/images/products directory if it doesn't exist
import { mkdir } from 'fs/promises';

const createDirectories = async () => {
    const dirs = [
        'public/images/products',
        'scripts',
        'src/automation'
    ];

    for (const dir of dirs) {
        try {
            await mkdir(dir, { recursive: true });
            console.log(`✅ Created directory: ${dir}`);
        } catch {
            console.log(`ℹ️  Directory exists: ${dir}`);
        }
    }
};

createDirectories();
