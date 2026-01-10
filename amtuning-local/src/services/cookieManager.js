/**
 * VS SPEED - Cookie Consent & Temporary User Storage
 * Handles cookie consent, temporary user data, and cache management
 */

import { ref, uploadBytes, getBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

class CookieManager {
  constructor() {
    this.CONSENT_KEY = 'vsspeed_cookie_consent';
    this.TEMP_USER_KEY = 'vsspeed_temp_user';
    this.SESSION_KEY = 'vsspeed_session_id';
  }

  /**
   * Check if user has accepted cookies
   */
  hasConsent() {
    const consent = localStorage.getItem(this.CONSENT_KEY);
    return consent === 'accepted';
  }

  /**
   * Set cookie consent
   */
  setConsent(accepted) {
    if (accepted) {
      localStorage.setItem(this.CONSENT_KEY, 'accepted');
      localStorage.setItem('consent_date', new Date().toISOString());
    } else {
      localStorage.setItem(this.CONSENT_KEY, 'declined');
      this.clearAllData();
    }
  }

  /**
   * Get or create session ID
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  /**
   * Store temporary user data (before signup)
   */
  storeTempUser(data) {
    if (!this.hasConsent()) {
      console.warn('Cookie consent not given. Data not stored.');
      return false;
    }

    const tempUser = {
      sessionId: this.getSessionId(),
      data: data,
      ip: this.getIPInfo(),
      timestamp: new Date().toISOString(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };

    localStorage.setItem(this.TEMP_USER_KEY, JSON.stringify(tempUser));
    return true;
  }

  /**
   * Get temporary user data
   */
  getTempUser() {
    const data = localStorage.getItem(this.TEMP_USER_KEY);
    if (!data) return null;

    const tempUser = JSON.parse(data);
    
    // Check if expired
    if (new Date(tempUser.expires) < new Date()) {
      this.clearTempUser();
      return null;
    }

    return tempUser;
  }

  /**
   * Clear temporary user data
   */
  clearTempUser() {
    localStorage.removeItem(this.TEMP_USER_KEY);
  }

  /**
   * Store temporary garage data
   */
  storeTempGarage(garageData) {
    if (!this.hasConsent()) return false;

    const sessionId = this.getSessionId();
    const key = `vsspeed_temp_garage_${sessionId}`;
    
    localStorage.setItem(key, JSON.stringify({
      data: garageData,
      timestamp: new Date().toISOString()
    }));

    return true;
  }

  /**
   * Get temporary garage data
   */
  getTempGarage() {
    const sessionId = this.getSessionId();
    const key = `vsspeed_temp_garage_${sessionId}`;
    const data = localStorage.getItem(key);
    
    return data ? JSON.parse(data).data : null;
  }

  /**
   * Store cart data
   */
  storeCart(cartItems) {
    if (!this.hasConsent()) return false;

    localStorage.setItem('vsspeed_cart', JSON.stringify({
      items: cartItems,
      timestamp: new Date().toISOString()
    }));

    return true;
  }

  /**
   * Get cart data
   */
  getCart() {
    const data = localStorage.getItem('vsspeed_cart');
    return data ? JSON.parse(data).items : [];
  }

  /**
   * Get IP information (client-side approximation)
   */
  getIPInfo() {
    // This will be enhanced with actual IP from backend
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  /**
   * Sync temporary data to cloud (Firebase Storage)
   */
  async syncToCloud() {
    if (!this.hasConsent()) return false;

    try {
      const sessionId = this.getSessionId();
      const tempUser = this.getTempUser();
      const tempGarage = this.getTempGarage();
      const cart = this.getCart();

      const cacheData = {
        session: sessionId,
        tempUser,
        tempGarage,
        cart,
        timestamp: new Date().toISOString()
      };

      // Upload to Firebase Storage
      const cacheRef = ref(storage, `temp_users/${sessionId}/cache.json`);
      const blob = new Blob([JSON.stringify(cacheData)], { type: 'application/json' });
      await uploadBytes(cacheRef, blob);

      console.log('✅ Temporary data synced to cloud');
      return true;
    } catch (error) {
      console.error('Cloud sync error:', error);
      return false;
    }
  }

  /**
   * Restore from cloud
   */
  async restoreFromCloud(sessionId) {
    try {
      const cacheRef = ref(storage, `temp_users/${sessionId}/cache.json`);
      const snapshot = await getBytes(cacheRef);
      const cacheData = JSON.parse(new TextDecoder().decode(snapshot));

      // Restore to localStorage
      if (cacheData.tempUser) {
        localStorage.setItem(this.TEMP_USER_KEY, JSON.stringify(cacheData.tempUser));
      }
      if (cacheData.cart) {
        this.storeCart(cacheData.cart);
      }

      console.log('✅ Data restored from cloud');
      return true;
    } catch (error) {
      console.error('Cloud restore error:', error);
      return false;
    }
  }

  /**
   * Clear all temporary data
   */
  clearAllData() {
    localStorage.removeItem(this.TEMP_USER_KEY);
    localStorage.removeItem('vsspeed_cart');
    const _sessionId = this.getSessionId(); // Used for cleanup reference
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('vsspeed_temp_')) {
        localStorage.removeItem(key);
      }
    });
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Migrate temp user to permanent account
   */
  async migrateToAccount() {
    const tempUser = this.getTempUser();
    const tempGarage = this.getTempGarage();
    const cart = this.getCart();

    const migrationData = {
      tempUserData: tempUser,
      garage: tempGarage,
      cart: cart,
      migratedAt: new Date().toISOString()
    };

    // This will be used by backend to populate user's account
    this.clearAllData();
    
    return migrationData;
  }
}

export default new CookieManager();
