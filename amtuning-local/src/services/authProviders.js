/**
 * VS SPEED - Multi-Provider OAuth Authentication
 * Supports Google, Microsoft, GitHub, Apple, and more
 */

import { 
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { usersDB } from './databaseService';
import cookieManager from './cookieManager';

/**
 * Google Sign-In
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create or update user in database
    await usersDB.create(user.uid, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'google'
    });

    // Migrate temp data if exists
    const migrationData = await cookieManager.migrateToAccount(user.uid);
    
    return { success: true, user, migrationData };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Microsoft Sign-In
 */
export const signInWithMicrosoft = async () => {
  try {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('email');
    provider.addScope('profile');
    provider.setCustomParameters({
      prompt: 'select_account',
      tenant: 'common' // Supports all Microsoft accounts
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await usersDB.create(user.uid, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'microsoft'
    });

    const migrationData = await cookieManager.migrateToAccount(user.uid);

    return { success: true, user, migrationData };
  } catch (error) {
    console.error('Microsoft sign-in error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * GitHub Sign-In
 */
export const signInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    provider.addScope('read:user');
    provider.addScope('user:email');

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await usersDB.create(user.uid, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'github'
    });

    const migrationData = await cookieManager.migrateToAccount(user.uid);

    return { success: true, user, migrationData };
  } catch (error) {
    console.error('GitHub sign-in error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Apple Sign-In
 */
export const signInWithApple = async () => {
  try {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    provider.setCustomParameters({
      locale: 'en'
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await usersDB.create(user.uid, {
      email: user.email,
      displayName: user.displayName || 'Apple User',
      photoURL: user.photoURL,
      provider: 'apple'
    });

    const migrationData = await cookieManager.migrateToAccount(user.uid);

    return { success: true, user, migrationData };
  } catch (error) {
    console.error('Apple sign-in error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Yahoo Sign-In
 */
export const signInWithYahoo = async () => {
  try {
    const provider = new OAuthProvider('yahoo.com');
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await usersDB.create(user.uid, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'yahoo'
    });

    const migrationData = await cookieManager.migrateToAccount(user.uid);

    return { success: true, user, migrationData };
  } catch (error) {
    console.error('Yahoo sign-in error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Twitter/X Sign-In
 */
export const signInWithTwitter = async () => {
  try {
    const provider = new OAuthProvider('twitter.com');
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await usersDB.create(user.uid, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'twitter'
    });

    const migrationData = await cookieManager.migrateToAccount(user.uid);

    return { success: true, user, migrationData };
  } catch (error) {
    console.error('Twitter sign-in error:', error);
    return { success: false, error: error.message };
  }
};

export default {
  signInWithGoogle,
  signInWithMicrosoft,
  signInWithGithub,
  signInWithApple,
  signInWithYahoo,
  signInWithTwitter
};
