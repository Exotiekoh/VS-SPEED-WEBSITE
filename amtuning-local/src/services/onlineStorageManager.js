/**
 * VS SPEED - Online Database Storage Manager
 * Handles online data storage, cache, and cookies with Firebase
 */

import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../config/firebase';

class OnlineStorageManager {
  constructor() {
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
    this.cookieExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days
  }

  /**
   * Store data in online database (Firestore)
   */
  async storeOnline(collection_name, documentId, data) {
    try {
      const docRef = doc(db, collection_name, documentId);
      await setDoc(docRef, {
        ...data,
        storedAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + this.cacheExpiry)
      }, { merge: true });

      console.log(`✅ Data stored online: ${collection_name}/${documentId}`);
      return { success: true, id: documentId };
    } catch (error) {
      console.error('Online storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Retrieve data from online database
   */
  async retrieveOnline(collection_name, documentId) {
    try {
      const docRef = doc(db, collection_name, documentId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return { success: false, error: 'Document not found' };
      }

      const data = docSnap.data();

      // Check expiry
      if (data.expiresAt && data.expiresAt.toDate() < new Date()) {
        await deleteDoc(docRef);
        return { success: false, error: 'Data expired' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Online retrieval error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store cache data online (Firebase Storage)
   */
  async storeCacheOnline(cacheKey, cacheData) {
    try {
      const cacheRef = ref(storage, `cache/${cacheKey}.json`);
      const cacheBlob = new Blob([JSON.stringify({
        data: cacheData,
        cachedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + this.cacheExpiry).toISOString()
      })], { type: 'application/json' });

      await uploadBytes(cacheRef, cacheBlob);

      // Also store metadata in Firestore for quick lookup
      await this.storeOnline('cache_metadata', cacheKey, {
        size: cacheBlob.size,
        type: 'cache',
        expiresAt: new Date(Date.now() + this.cacheExpiry)
      });

      console.log(`✅ Cache stored online: ${cacheKey}`);
      return { success: true };
    } catch (error) {
      console.error('Cache storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Retrieve cache from online storage
   */
  async retrieveCacheOnline(cacheKey) {
    try {
      const cacheRef = ref(storage, `cache/${cacheKey}.json`);
      const url = await getDownloadURL(cacheRef);
      const response = await fetch(url);
      const cached = await response.json();

      // Check expiry
      if (new Date(cached.expiresAt) < new Date()) {
        await deleteObject(cacheRef);
        await deleteDoc(doc(db, 'cache_metadata', cacheKey));
        return { success: false, error: 'Cache expired' };
      }

      return { success: true, data: cached.data };
    } catch (error) {
      console.error('Cache retrieval error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store cookies online (for cross-device sync)
   */
  async storeCookiesOnline(userId, cookieData) {
    try {
      await this.storeOnline('user_cookies', userId, {
        cookies: cookieData,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language
        },
        expiresAt: new Date(Date.now() + this.cookieExpiry)
      });

      console.log(`✅ Cookies stored online for user: ${userId}`);
      return { success: true };
    } catch (error) {
      console.error('Cookie storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Retrieve cookies from online storage
   */
  async retrieveCookiesOnline(userId) {
    try {
      const result = await this.retrieveOnline('user_cookies', userId);
      
      if (result.success) {
        return { success: true, cookies: result.data.cookies };
      }

      return result;
    } catch (error) {
      console.error('Cookie retrieval error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store user session data online
   */
  async storeSessionOnline(sessionId, sessionData) {
    try {
      await this.storeOnline('user_sessions', sessionId, {
        ...sessionData,
        lastActivity: serverTimestamp(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
      });

      return { success: true };
    } catch (error) {
      console.error('Session storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store product data cache
   */
  async storeProductCache(products) {
    return await this.storeCacheOnline('products_catalog', products);
  }

  /**
   * Retrieve product cache
   */
  async getProductCache() {
    return await this.retrieveCacheOnline('products_catalog');
  }

  /**
   * Store user preferences online
   */
  async storeUserPreferences(userId, preferences) {
    try {
      await this.storeOnline('user_preferences', userId, {
        theme: preferences.theme,
        language: preferences.language,
        notifications: preferences.notifications,
        privacy: preferences.privacy
      });

      return { success: true };
    } catch (error) {
      console.error('Preferences storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store shopping cart online
   */
  async storeCartOnline(userId, cartItems) {
    try {
      await this.storeOnline('user_carts', userId, {
        items: cartItems,
        itemCount: cartItems.length,
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      });

      return { success: true };
    } catch (error) {
      console.error('Cart storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Retrieve shopping cart from online
   */
  async getCartOnline(userId) {
    try {
      const result = await this.retrieveOnline('user_carts', userId);
      
      if (result.success) {
        return { success: true, cart: result.data };
      }

      return { success: true, cart: { items: [], itemCount: 0, total: 0 } };
    } catch (error) {
      console.error('Cart retrieval error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store browsing history online
   */
  async storeBrowsingHistory(userId, history) {
    try {
      const historyRef = doc(db, 'browsing_history', userId);
      const existing = await getDoc(historyRef);

      let historyData = history;
      if (existing.exists()) {
        // Merge with existing, keep last 100 items
        historyData = [...existing.data().items, ...history].slice(-100);
      }

      await setDoc(historyRef, {
        items: historyData,
        lastUpdated: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error('History storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Clear expired cache and cookies
   */
  async clearExpiredData() {
    try {
      const now = new Date();
      
      // Clear expired cache
      const cacheRef = ref(storage, 'cache/');
      const cacheList = await listAll(cacheRef);
      
      for (const item of cacheList.items) {
        try {
          const url = await getDownloadURL(item);
          const response = await fetch(url);
          const data = await response.json();
          
          if (new Date(data.expiresAt) < now) {
            await deleteObject(item);
            console.log(`🗑️ Deleted expired cache: ${item.name}`);
          }
        } catch (e) {
          // Skip if error
        }
      }

      console.log('✅ Expired data cleanup complete');
      return { success: true };
    } catch (error) {
      console.error('Cleanup error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get storage statistics
   */
  async getStorageStats() {
    try {
      const stats = {
        cache: 0,
        cookies: 0,
        sessions: 0,
        total: 0
      };

      // Count cache items
      const cacheRef = ref(storage, 'cache/');
      const cacheList = await listAll(cacheRef);
      stats.cache = cacheList.items.length;

      stats.total = stats.cache + stats.cookies + stats.sessions;

      return { success: true, stats };
    } catch (error) {
      console.error('Stats error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new OnlineStorageManager();
