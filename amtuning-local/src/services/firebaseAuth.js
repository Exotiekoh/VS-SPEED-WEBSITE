import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

/**
 * Firebase Authentication Service
 * Handles user authentication operations
 */

export const firebaseAuth = {
  /**
   * Sign up a new user with email and password
   */
  async signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: displayName || '',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        garageIds: []
      });

      return { success: true, user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign in an existing user
   */
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login timestamp
      await setDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp()
      }, { merge: true });

      return { success: true, user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign out current user
   */
  async signOut() {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    return auth.currentUser;
  },

  /**
   * Get user data from Firestore
   */
  async getUserData(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, error: 'User document not found' };
      }
    } catch (error) {
      console.error('Get user data error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Listen to authentication state changes
   */
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  }
};

export default firebaseAuth;
