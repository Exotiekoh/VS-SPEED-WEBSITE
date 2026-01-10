/**
 * VS SPEED - Database Setup Script
 * Creates MySQL database and tables
 */

import mysql from 'mysql2/promise';

const DB_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD
};

async function setupDatabase() {
  console.log('🚀 VS SPEED Database Setup\n');

  try {
    // Connect to MySQL
    const connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ Connected to MySQL');

    // Create database
    await connection.query('CREATE DATABASE IF NOT EXISTS vsspeed_production');
    console.log('✅ Database created: vsspeed_production');

    await connection.query('USE vsspeed_production');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255),
        provider VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table created: users');

    // Create products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        brand VARCHAR(100),
        price DECIMAL(10,2),
        stock INT DEFAULT 0,
        image_url VARCHAR(500),
        vehicle_compatibility JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_brand (brand),
        INDEX idx_price (price)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table created: products');

    // Create orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255),
        total DECIMAL(10,2),
        status VARCHAR(50),
        payment_method VARCHAR(50),
        items JSON,
        shipping_address JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        INDEX idx_user (user_id),
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table created: orders');

    // Create garages table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS garages (
        id VARCHAR(255) PRIMARY KEY,
        owner_id VARCHAR(255),
        name VARCHAR(255),
        vehicles JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id),
        INDEX idx_owner (owner_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table created: garages');

    // Create ai_interactions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ai_interactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255),
        ai_type ENUM('tuner', 'mechanic', 'consultant'),
        query TEXT,
        response TEXT,
        vehicle_context JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        INDEX idx_user_ai (user_id, ai_type),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table created: ai_interactions');

    // Create cache table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cache (
        cache_key VARCHAR(255) PRIMARY KEY,
        cache_data LONGTEXT,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_expires (expires_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table created: cache');

    // Create payment_logs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS payment_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(255),
        payment_method VARCHAR(50),
        amount DECIMAL(10,2),
        status VARCHAR(50),
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_order (order_id),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table created: payment_logs');

    await connection.end();

    console.log('\n✅ Database setup complete!');
    console.log('📊 Database: vsspeed_production');
    console.log('📁 Tables: 7 created');
    console.log('\nNext steps:');
    console.log('1. Run: npm run import-products');
    console.log('2. Run: npm run sync-vsspeed');
    console.log('3. Start app: npm run dev');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
