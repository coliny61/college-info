// =============================================================================
// Firebase Configuration
// College Visit Platform
// =============================================================================
// Replace with real Firebase config for MVP
//
// For the prototype, all data operations use AsyncStorage instead of Firestore.
// When ready to move to MVP, uncomment the Firebase initialization below and
// swap the mock service implementations in auth.ts and firestore.ts.
// =============================================================================

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
//
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_PROJECT.firebaseapp.com',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_PROJECT.appspot.com',
//   messagingSenderId: 'YOUR_SENDER_ID',
//   appId: 'YOUR_APP_ID',
//   measurementId: 'YOUR_MEASUREMENT_ID',
// };
//
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
// export default app;

/**
 * Mock Firebase object for prototype.
 * Provides stub references so service files can import without errors.
 * All actual data operations are routed through AsyncStorage.
 */
export const firebase = {
  app: null,
  auth: null,
  db: null,
  analytics: null,
  /** Indicates whether the app is using real Firebase or the mock layer. */
  isPrototype: true,
} as const;

export default firebase;
