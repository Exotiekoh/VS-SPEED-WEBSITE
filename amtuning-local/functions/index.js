/**
 * VS SPEED Cloud Functions - Secure Backend
 * CRITICAL: All transaction data is encrypted
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const CryptoJS = require('crypto-js');

admin.initializeApp();

// Encryption keys from Firebase config (set via: firebase functions:config:set)
const ENCRYPTION_KEY = functions.config().security?.encryption_key || process.env.ENCRYPTION_KEY;
const db = admin.firestore();

/**
 * Encrypt data using AES-256
 */
function encryptData(data, key) {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, key).toString();
}

/**
 * Process encrypted transaction - HTTPS Callable Function
 * Only authenticated users can call this
 */
exports.processTransaction = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to process transactions'
    );
  }

  try {
    const { transactionData, paymentMethod } = data;

    // Encrypt sensitive transaction data
    const encryptedTransaction = encryptData(transactionData, ENCRYPTION_KEY);

    // Store encrypted transaction
    const transactionRef = await db.collection('transactions').add({
      userId: context.auth.uid,
      encryptedData: encryptedTransaction,
      amount: transactionData.amount,
      currency: transactionData.currency || 'USD',
      status: 'pending',
      paymentMethod: paymentMethod,
      ipAddress: context.rawRequest.ip,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        userAgent: context.rawRequest.headers['user-agent'],
        origin: context.rawRequest.headers.origin
      }
    });

    // Log for security audit (no sensitive data)
    await db.collection('security_logs').add({
      action: 'TRANSACTION_CREATED',
      userId: context.auth.uid,
      transactionId: transactionRef.id,
      amount: transactionData.amount,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      success: true,
      transactionId: transactionRef.id
    };
  } catch (error) {
    console.error('Transaction processing error:', error.message);
    
    // Alert admin of error
    await db.collection('admin_alerts').add({
      type: 'TRANSACTION_ERROR',
      userId: context.auth.uid,
      error: error.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    throw new functions.https.HttpsError(
      'internal',
      'Transaction processing failed. Our team has been notified.'
    );
  }
});

/**
 * Create payment intent with Stripe
 */
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  const stripe = require('stripe')(functions.config().stripe?.secret_key);

  try {
    const { amount, currency, orderId } = data;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency || 'usd',
      metadata: {
        userId: context.auth.uid,
        orderId: orderId,
        source: 'vsspeed'
      }
    });

    // Log payment intent creation
    await db.collection('payment_logs').add({
      userId: context.auth.uid,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      currency: currency,
      status: paymentIntent.status,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    };
  } catch (error) {
    console.error('Payment intent error:', error.message);
    throw new functions.https.HttpsError('internal', 'Payment setup failed');
  }
});

/**
 * Create order with encrypted shipping data
 */
exports.createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  try {
    const { items, shipping, total } = data;

    // Encrypt shipping address
    const encryptedShipping = encryptData(shipping, ENCRYPTION_KEY);

    // Create order
    const orderRef = await db.collection('orders').add({
      userId: context.auth.uid,
      items: items,
      encryptedShipping: encryptedShipping,
      total: total,
      status: 'pending',
      trackingNumber: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Create Shop.app tracking (if enabled)
    if (functions.config().shop?.enabled) {
      await createShopTracking(orderRef.id, data);
    }

    return {
      success: true,
      orderId: orderRef.id
    };
  } catch (error) {
    console.error('Order creation error:', error.message);
    throw new functions.https.HttpsError('internal', 'Order creation failed');
  }
});

/**
 * Security monitoring - detect suspicious activity
 */
exports.monitorSecurity = functions.firestore
  .document('transactions/{transactionId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();

    // Alert on large transactions
    if (data.amount > 10000) {
      await db.collection('admin_alerts').add({
        type: 'LARGE_TRANSACTION',
        transactionId: context.params.transactionId,
        userId: data.userId,
        amount: data.amount,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Alert on rapid transactions from same user
    const recentTransactions = await db.collection('transactions')
      .where('userId', '==', data.userId)
      .where('timestamp', '>', new Date(Date.now() - 5 * 60 * 1000))
      .get();

    if (recentTransactions.size > 5) {
      await db.collection('admin_alerts').add({
        type: 'RAPID_TRANSACTIONS',
        userId: data.userId,
        count: recentTransactions.size,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  });

/**
 * Automated encrypted backup - Daily at 3 AM
 */
exports.dailyBackup = functions.pubsub
  .schedule('0 3 * * *')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    console.log('Starting daily encrypted backup...');

    try {
      // Backup transactions
      const transactions = await db.collection('transactions').get();
      const backupData = transactions.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Encrypt backup
      const encryptedBackup = encryptData(backupData, ENCRYPTION_KEY);

      // Save to Cloud Storage
      const bucket = admin.storage().bucket();
      const fileName = `backups/transactions_${Date.now()}.enc`;
      const file = bucket.file(fileName);

      await file.save(encryptedBackup, {
        contentType: 'application/octet-stream',
        metadata: {
          encrypted: true,
          timestamp: new Date().toISOString()
        }
      });

      console.log(`Backup saved: ${fileName}`);

      // Log backup completion
      await db.collection('admin_logs').add({
        action: 'BACKUP_COMPLETED',
        fileName: fileName,
        recordCount: backupData.length,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      return null;
    } catch (error) {
      console.error('Backup failed:', error);
      
      await db.collection('admin_alerts').add({
        type: 'BACKUP_FAILED',
        error: error.message,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      return null;
    }
  });

/**
 * Helper: Create Shop.app tracking
 */
async function createShopTracking(orderId, orderData) {
  // Implementation for Shop.app integration
  console.log(`Creating Shop.app tracking for order: ${orderId}`);
  // Add Shop.app API call here
}

// Export all functions
module.exports = {
  processTransaction: exports.processTransaction,
  createPaymentIntent: exports.createPaymentIntent,
  createOrder: exports.createOrder,
  monitorSecurity: exports.monitorSecurity,
  dailyBackup: exports.dailyBackup
};
