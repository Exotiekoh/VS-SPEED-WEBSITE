/**
 * Shared AI Database Access Layer
 * Allows both MCP server and website AI systems to read/write data
 * Location: C:\Users\burri\OneDrive\Desktop\VSSPEED\ai-shared-db\
 */

const fs = require('fs').promises;
const path = require('path');

const DB_PATH = 'C:\\Users\\burri\\OneDrive\\Desktop\\VSSPEED\\ai-shared-db';

class SharedDatabase {
    constructor() {
        this.dbPath = DB_PATH;
    }

    async read(collection) {
        try {
            const filePath = path.join(this.dbPath, `${collection}.json`);
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading ${collection}:`, error.message);
            return null;
        }
    }

    async write(collection, data) {
        try {
            const filePath = path.join(this.dbPath, `${collection}.json`);
            const existingData = await this.read(collection);
            const updatedData = {
                ...existingData,
                [collection]: data,
                last_updated: new Date().toISOString()
            };
            await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));
            return true;
        } catch (error) {
            console.error(`Error writing ${collection}:`, error.message);
            return false;
        }
    }

    async append(collection, item) {
        try {
            const data = await this.read(collection);
            if (!data || !Array.isArray(data[collection])) {
                return false;
            }
            data[collection].push(item);
            return await this.write(collection, data[collection]);
        } catch (error) {
            console.error(`Error appending to ${collection}:`, error.message);
            return false;
        }
    }

    async query(collection, filter) {
        try {
            const data = await this.read(collection);
            if (!data || !Array.isArray(data[collection])) {
                return [];
            }
            return data[collection].filter(filter);
        } catch (error) {
            console.error(`Error querying ${collection}:`, error.message);
            return [];
        }
    }

    async getConfig() {
        return await this.read('config');
    }

    async updateConfig(updates) {
        const config = await this.getConfig();
        const updatedConfig = { ...config, ...updates };
        return await this.write('config', updatedConfig);
    }
}

module.exports = new SharedDatabase();
