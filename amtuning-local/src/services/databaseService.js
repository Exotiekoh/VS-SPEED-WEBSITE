/**
 * VS SPEED - Database Service
 * Firestore database operations for all collections
 */

import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import cookieManager from './cookieManager';

/**
 * Products Database
 */
export const productsDB = {
  /**
   * Get all products
   */
  async getAll() {
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  /**
   * Get product by ID
   */
  async getById(productId) {
    const productDoc = await getDoc(doc(db, 'products', productId));
    return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null;
  },

  /**
   * Search products
   */
  async search(searchTerm, category = null, brand = null) {
    let q = collection(db, 'products');

    if (category) {
      q = query(q, where('category', '==', category));
    }
    if (brand) {
      q = query(q, where('brand', '==', brand));
    }

    const snapshot = await getDocs(q);
    let results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Client-side search filtering
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(p => 
        p.title?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.mfgPart?.toLowerCase().includes(term)
      );
    }

    return results;
  },

  /**
   * Get featured products
   */
  async getFeatured(limitCount = 6) {
    const q = query(
      collection(db, 'products'),
      where('featured', '==', true),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

/**
 * Users Database
 */
export const usersDB = {
  /**
   * Create user profile
   */
  async create(userId, userData) {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      garageIds: [],
      ip: cookieManager.getIPInfo()
    });
    return userId;
  },

  /**
   * Get user profile
   */
  async get(userId) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
  },

  /**
   * Update user profile
   */
  async update(userId, updates) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      lastUpdated: serverTimestamp()
    });
  },

  /**
   * Update last login
   */
  async updateLastLogin(userId) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    });
  }
};

/**
 * Garages Database
 */
export const garagesDB = {
  /**
   * Create garage
   */
  async create(userId, garageName) {
    const garageId = `garage_${Date.now()}`;
    const garageRef = doc(db, 'garages', garageId);

    await setDoc(garageRef, {
      ownerId: userId,
      name: garageName,
      vehicles: [],
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    });

    // Add garage ID to user's garageIds array
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const garageIds = userDoc.data().garageIds || [];
      await updateDoc(userRef, {
        garageIds: [...garageIds, garageId]
      });
    }

    return garageId;
  },

  /**
   * Get user's garages
   */
  async getUserGarages(userId) {
    const q = query(
      collection(db, 'garages'),
      where('ownerId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  /**
   * Add vehicle to garage
   */
  async addVehicle(garageId, vehicleData) {
    const garageRef = doc(db, 'garages', garageId);
    const garageDoc = await getDoc(garageRef);

    if (!garageDoc.exists()) return null;

    const vehicles = garageDoc.data().vehicles || [];
    const newVehicle = {
      id: `veh_${Date.now()}`,
      ...vehicleData,
      addedAt: new Date().toISOString()
    };

    await updateDoc(garageRef, {
      vehicles: [...vehicles, newVehicle],
      lastUpdated: serverTimestamp()
    });

    return newVehicle.id;
  },

  /**
   * Update vehicle in garage
   */
  async updateVehicle(garageId, vehicleId, updates) {
    const garageRef = doc(db, 'garages', garageId);
    const garageDoc = await getDoc(garageRef);

    if (!garageDoc.exists()) return false;

    const vehicles = garageDoc.data().vehicles || [];
    const updatedVehicles = vehicles.map(v =>
      v.id === vehicleId ? { ...v, ...updates, updatedAt: new Date().toISOString() } : v
    );

    await updateDoc(garageRef, {
      vehicles: updatedVehicles,
      lastUpdated: serverTimestamp()
    });

    return true;
  },

  /**
   * Delete vehicle from garage
   */
  async deleteVehicle(garageId, vehicleId) {
    const garageRef = doc(db, 'garages', garageId);
    const garageDoc = await getDoc(garageRef);

    if (!garageDoc.exists()) return false;

    const vehicles = garageDoc.data().vehicles || [];
    const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);

    await updateDoc(garageRef, {
      vehicles: updatedVehicles,
      lastUpdated: serverTimestamp()
    });

    return true;
  }
};

/**
 * Temporary Users Database (for non-logged-in users)
 */
export const tempUsersDB = {
  /**
   * Store temporary session
   */
  async store(sessionId, data) {
    const tempRef = doc(db, 'temp_sessions', sessionId);
    await setDoc(tempRef, {
      data: data,
      ip: cookieManager.getIPInfo(),
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });
  },

  /**
   * Get temporary session
   */
  async get(sessionId) {
    const tempDoc = await getDoc(doc(db, 'temp_sessions', sessionId));
    if (!tempDoc.exists()) return null;

    const data = tempDoc.data();
    // Check if expired
    if (data.expiresAt && data.expiresAt.toDate() < new Date()) {
      await this.delete(sessionId);
      return null;
    }

    return data;
  },

  /**
   * Delete temporary session
   */
  async delete(sessionId) {
    await deleteDoc(doc(db, 'temp_sessions', sessionId));
  }
};

export default {
  products: productsDB,
  users: usersDB,
  garages: garagesDB,
  tempUsers: tempUsersDB
};
