import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Firebase Garage Database Service
 * Handles garage and vehicle data operations
 */

export const firebaseGarage = {
  /**
   * Create a new garage for a user
   */
  async createGarage(userId, garageName) {
    try {
      const garageId = `garage_${Date.now()}`;
      
      await setDoc(doc(db, 'garages', garageId), {
        garageId,
        ownerId: userId,
        name: garageName,
        vehicles: [],
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });

      // Add garage ID to user's garageIds array
      await updateDoc(doc(db, 'users', userId), {
        garageIds: arrayUnion(garageId)
      });

      return { success: true, garageId };
    } catch (error) {
      console.error('Create garage error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all garages for a user
   */
  async getGarages(userId) {
    try {
      const q = query(collection(db, 'garages'), where('ownerId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const garages = [];
      querySnapshot.forEach((doc) => {
        garages.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, garages };
    } catch (error) {
      console.error('Get garages error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get a specific garage by ID
   */
  async getGarage(garageId) {
    try {
      const garageDoc = await getDoc(doc(db, 'garages', garageId));
      
      if (garageDoc.exists()) {
        return { success: true, garage: { id: garageDoc.id, ...garageDoc.data() } };
      } else {
        return { success: false, error: 'Garage not found' };
      }
    } catch (error) {
      console.error('Get garage error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Add a vehicle to a garage
   */
  async addVehicle(garageId, vehicleData) {
    try {
      const vehicleId = `veh_${Date.now()}`;
      const vehicle = {
        vehicleId,
        ...vehicleData,
        addedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'garages', garageId), {
        vehicles: arrayUnion(vehicle),
        lastUpdated: serverTimestamp()
      });

      return { success: true, vehicleId };
    } catch (error) {
      console.error('Add vehicle error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update a vehicle in a garage
   */
  async updateVehicle(garageId, vehicleId, updates) {
    try {
      // Get current garage data
      const garageDoc = await getDoc(doc(db, 'garages', garageId));
      if (!garageDoc.exists()) {
        return { success: false, error: 'Garage not found' };
      }

      const garageData = garageDoc.data();
      const vehicles = garageData.vehicles || [];
      
      // Find and update the vehicle
      const updatedVehicles = vehicles.map(vehicle => 
        vehicle.vehicleId === vehicleId 
          ? { ...vehicle, ...updates, updatedAt: new Date().toISOString() }
          : vehicle
      );

      await updateDoc(doc(db, 'garages', garageId), {
        vehicles: updatedVehicles,
        lastUpdated: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error('Update vehicle error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete a vehicle from a garage
   */
  async deleteVehicle(garageId, vehicleId) {
    try {
      // Get current garage data
      const garageDoc = await getDoc(doc(db, 'garages', garageId));
      if (!garageDoc.exists()) {
        return { success: false, error: 'Garage not found' };
      }

      const garageData = garageDoc.data();
      const vehicles = garageData.vehicles || [];
      
      // Filter out the vehicle to delete
      const updatedVehicles = vehicles.filter(vehicle => vehicle.vehicleId !== vehicleId);

      await updateDoc(doc(db, 'garages', garageId), {
        vehicles: updatedVehicles,
        lastUpdated: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error('Delete vehicle error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete a garage
   */
  async deleteGarage(garageId, userId) {
    try {
      await deleteDoc(doc(db, 'garages', garageId));

      // Remove garage ID from user's garageIds array
      await updateDoc(doc(db, 'users', userId), {
        garageIds: arrayRemove(garageId)
      });

      return { success: true };
    } catch (error) {
      console.error('Delete garage error:', error);
      return { success: false, error: error.message };
    }
  }
};

export default firebaseGarage;
