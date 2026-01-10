/**
 * VS SPEED - Transaction Encryption Service
 * AES-256 encryption for sensitive transaction data
 * CRITICAL: Never log decrypted data
 */

import CryptoJS from 'crypto-js';

// Encryption key from environment variable (stored in GitHub Secrets)
const ENCRYPTION_KEY = import.meta.env.VITE_TRANSACTION_ENCRYPTION_KEY;
const BACKUP_KEY = import.meta.env.VITE_BACKUP_ENCRYPTION_KEY;

/**
 * Encrypt transaction data before storing
 * @param {Object} transactionData - Transaction details
 * @returns {string} Encrypted string
 */
export const encryptTransaction = (transactionData) => {
  try {
    if (!ENCRYPTION_KEY) {
      throw new Error('Encryption key not configured');
    }

    // Remove any undefined or null values
    const cleanData = JSON.parse(JSON.stringify(transactionData));
    
    // Convert to JSON string
    const jsonString = JSON.stringify(cleanData);
    
    // Encrypt using AES-256
    const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
    
    return encrypted;
  } catch (error) {
    console.error('Encryption error (details hidden for security)');
    throw new Error('Failed to encrypt transaction data');
  }
};

/**
 * Decrypt transaction data (admin only)
 * @param {string} encryptedData - Encrypted transaction string
 * @returns {Object} Decrypted transaction object
 */
export const decryptTransaction = (encryptedData) => {
  try {
    if (!ENCRYPTION_KEY) {
      throw new Error('Encryption key not configured');
    }

    // Decrypt using AES-256
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    
    // Convert to UTF-8 string
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!jsonString) {
      throw new Error('Decryption failed - invalid key or corrupted data');
    }
    
    // Parse JSON
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decryption error (details hidden for security)');
    throw new Error('Failed to decrypt transaction data');
  }
};

/**
 * Hash sensitive data for indexing/lookup (one-way)
 * @param {string} data - Data to hash
 * @returns {string} SHA-256 hash
 */
export const hashSensitiveData = (data) => {
  return CryptoJS.SHA256(data).toString();
};

/**
 * Encrypt credit card data (PCI compliance)
 * @param {Object} cardData - Card information
 * @returns {string} Encrypted card data
 */
export const encryptCardData = (cardData) => {
  const sanitized = {
    lastFour: cardData.number.slice(-4),
    brand: cardData.brand,
    expiryMonth: cardData.expiryMonth,
    expiryYear: cardData.expiryYear,
    // Never store full card number
  };
  
  return encryptTransaction(sanitized);
};

/**
 * Create encrypted backup of transaction
 * @param {Object} transactionData - Transaction to backup
 * @returns {string} Backup-encrypted data
 */
export const createEncryptedBackup = (transactionData) => {
  try {
    if (!BACKUP_KEY) {
      throw new Error('Backup key not configured');
    }

    const jsonString = JSON.stringify(transactionData);
    const encrypted = CryptoJS.AES.encrypt(jsonString, BACKUP_KEY).toString();
    
    return encrypted;
  } catch (error) {
    console.error('Backup encryption error');
    throw new Error('Failed to create encrypted backup');
  }
};

/**
 * Sanitize transaction data for logging (remove sensitive fields)
 * @param {Object} transaction - Transaction data
 * @returns {Object} Sanitized transaction
 */
export const sanitizeForLogging = (transaction) => {
  return {
    transactionId: transaction.id,
    userId: transaction.userId,
    amount: transaction.amount,
    currency: transaction.currency,
    status: transaction.status,
    timestamp: transaction.timestamp,
    // Sensitive data removed
  };
};

export default {
  encryptTransaction,
  decryptTransaction,
  hashSensitiveData,
  encryptCardData,
  createEncryptedBackup,
  sanitizeForLogging
};
