// =============================================================================
// Firebase Configuration (Dual-Mode)
// College Visit Platform
// =============================================================================
// When EXPO_PUBLIC_FIREBASE_API_KEY is set, uses real Firebase.
// Otherwise, falls back to AsyncStorage mock (existing prototype behavior).
// =============================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  type Auth,
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
};

// ---------------------------------------------------------------------------
// Dual-mode flag
// ---------------------------------------------------------------------------

/** True when real Firebase env vars are configured. */
export const isFirebaseConfigured: boolean =
  !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

// ---------------------------------------------------------------------------
// Initialization (only when configured)
// ---------------------------------------------------------------------------

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  db = getFirestore(app);
}

export { app, auth, db };
export default { app, auth, db, isFirebaseConfigured };
