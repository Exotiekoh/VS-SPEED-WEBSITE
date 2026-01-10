/**
 * VS SPEED - MySQL Database Service
 * Provides MySQL access for you, AI, team members, and Antigravity
 */

import mysql from 'mysql2/promise';

class MySQLService {
  constructor() {
    this.pool = null;
    this.initialize();
  }

  async initialize() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'vsspeed_production',
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    console.log('✅ MySQL connection pool created');
  }

  /**
   * Get products filtered by vehicle compatibility
   */
  async getProductsByVehicle(make, model, year) {
    const [rows] = await this.pool.execute(
      `SELECT * FROM products 
       WHERE JSON_CONTAINS(vehicle_compatibility, JSON_OBJECT('make', ?, 'model', ?, 'year', ?))
       ORDER BY title`,
      [make, model, year.toString()]
    );
    return rows;
  }

  /**
   * Get all products for a specific category
   */
  async getProductsByCategory(category) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM products WHERE category = ? ORDER BY title',
      [category]
    );
    return rows;
  }

  /**
   * Search products
   */
  async searchProducts(searchTerm) {
    const [rows] = await this.pool.execute(
      `SELECT * FROM products 
       WHERE title LIKE ? OR description LIKE ? 
       ORDER BY title LIMIT 100`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    return rows;
  }

  /**
   * Log AI interaction
   */
  async logAIInteraction(userId, aiType, query, response, vehicleContext) {
    const [result] = await this.pool.execute(
      `INSERT INTO ai_interactions 
       (user_id, ai_type, query, response, vehicle_context) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, aiType, query, response, JSON.stringify(vehicleContext)]
    );
    return result.insertId;
  }

  /**
   * Get AI interaction history for user
   */
  async getAIHistory(userId, aiType = null, limit = 50) {
    let query = 'SELECT * FROM ai_interactions WHERE user_id = ?';
    const params = [userId];

    if (aiType) {
      query += ' AND ai_type = ?';
      params.push(aiType);
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);

    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  /**
   * Store cache in MySQL
   */
  async setCache(key, data, expiryMinutes = 60) {
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
    await this.pool.execute(
      `INSERT INTO cache (cache_key, cache_data, expires_at) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE cache_data = ?, expires_at = ?`,
      [key, JSON.stringify(data), expiresAt, JSON.stringify(data), expiresAt]
    );
  }

  /**
   * Get cache from MySQL
   */
  async getCache(key) {
    const [rows] = await this.pool.execute(
      'SELECT cache_data FROM cache WHERE cache_key = ? AND expires_at > NOW()',
      [key]
    );
    return rows.length > 0 ? JSON.parse(rows[0].cache_data) : null;
  }

  /**
   * Clear expired cache
   */
  async clearExpiredCache() {
    const [result] = await this.pool.execute(
      'DELETE FROM cache WHERE expires_at < NOW()'
    );
    return result.affectedRows;
  }

  /**
   * Create user in MySQL
   */
  async createUser(userId, userData) {
    await this.pool.execute(
      `INSERT INTO users (id, email, display_name, provider, created_at, last_login) 
       VALUES (?, ?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE last_login = NOW()`,
      [userId, userData.email, userData.displayName, userData.provider]
    );
  }

  /**
   * Get user data
   */
  async getUser(userId) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    return rows[0] || null;
  }

  /**
   * Create order in MySQL
   */
  async createOrder(orderId, orderData) {
    await this.pool.execute(
      `INSERT INTO orders (id, user_id, total, status, payment_method, created_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [orderId, orderData.userId, orderData.total, orderData.status, orderData.paymentMethod]
    );
  }

  /**
   * Get user orders
   */
  async getUserOrders(userId) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  /**
   * Sync product from Firebase to MySQL
   */
  async syncProduct(productId, productData) {
    await this.pool.execute(
      `INSERT INTO products (id, title, category, brand, price, stock, vehicle_compatibility) 
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         title = ?, category = ?, brand = ?, price = ?, stock = ?, vehicle_compatibility = ?`,
      [
        productId,
        productData.title,
        productData.category,
        productData.brand,
        productData.price,
        productData.stock || 0,
        JSON.stringify(productData.compatibility),
        // Update values
        productData.title,
        productData.category,
        productData.brand,
        productData.price,
        productData.stock || 0,
        JSON.stringify(productData.compatibility)
      ]
    );
  }

  /**
   * Execute custom query (for admin/team access)
   */
  async executeQuery(query, params = []) {
    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  /**
   * Get database statistics
   */
  async getStats() {
    const [userCount] = await this.pool.execute('SELECT COUNT(*) as count FROM users');
    const [productCount] = await this.pool.execute('SELECT COUNT(*) as count FROM products');
    const [orderCount] = await this.pool.execute('SELECT COUNT(*) as count FROM orders');
    const [aiCount] = await this.pool.execute('SELECT COUNT(*) as count FROM ai_interactions');

    return {
      users: userCount[0].count,
      products: productCount[0].count,
      orders: orderCount[0].count,
      aiInteractions: aiCount[0].count
    };
  }

  /**
   * Close connection pool
   */
  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log('✅ MySQL connection pool closed');
    }
  }
}

export default new MySQLService();
