/**
 * VSSPEED.IO - Database Connection Test
 * Tests MySQL connection and verifies schema
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabaseConnection() {
  console.log('🔍 Testing VSSPEED Database Connection...\n');

  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'vsspeed_production'
    });

    console.log('✅ Connected to MySQL');

    // Test queries
    const tests = [
      {
        name: 'Check Users Table',
        query: 'SELECT COUNT(*) as count FROM users'
      },
      {
        name: 'Check Vehicles Table',
        query: 'SELECT COUNT(*) as count FROM vehicles'
      },
      {
        name: 'Check Parts Catalog',
        query: 'SELECT COUNT(*) as count FROM parts_catalog'
      },
      {
        name: 'Check Sample Data',
        query: "SELECT * FROM users WHERE username = 'demo_user'"
      },
      {
        name: 'Check Reliability Data',
        query: "SELECT * FROM reliability_data WHERE make = 'BMW' AND model = '335i'"
      }
    ];

    console.log('\n📊 Running Schema Tests:\n');

    for (const test of tests) {
      try {
        const [rows] = await connection.execute(test.query);
        console.log(`✅ ${test.name}: PASSED`);
        if (test.name === 'Check Sample Data') {
          console.log(`   Found user: ${rows[0]?.email || 'None'}`);
        }
      } catch (error) {
        console.log(`❌ ${test.name}: FAILED`);
        console.log(`   Error: ${error.message}`);
      }
    }

    // Get table list
    const [tables] = await connection.execute(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'vsspeed_production'"
    );

    console.log('\n📋 Database Tables:\n');
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name || table.TABLE_NAME}`);
    });

    console.log(`\n✅ Total Tables: ${tables.length}`);

    await connection.end();

    console.log('\n=========================================');
    console.log('✅ DATABASE TEST COMPLETE!');
    console.log('=========================================\n');

    return true;

  } catch (error) {
    console.error('\n❌ Database Connection Failed:');
    console.error(`   ${error.message}\n`);

    console.log('Troubleshooting:');
    console.log('1. Ensure MySQL is running');
    console.log('2. Check credentials in .env file');
    console.log('3. Run SETUP_DATABASE.bat first');
    console.log('4. Verify database exists: SHOW DATABASES;\n');

    return false;
  }
}

// Run test if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  testDatabaseConnection();
}

export default testDatabaseConnection;
