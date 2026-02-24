// =============================================================================
// Auth Service (Dual-Mode: Firebase + AsyncStorage mock)
// College Visit Platform
// =============================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { isFirebaseConfigured, auth as firebaseAuth, db } from './firebase';
import type { User, UserRole } from '@/types';

const AUTH_STORAGE_KEY = 'college_visit_auth';

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

async function persistUser(user: User): Promise<void> {
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

async function clearPersistedUser(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
}

/** Map a Firebase Auth user to our app User type. */
async function firebaseUserToAppUser(fbUser: FirebaseUser): Promise<User> {
  // Try to read Firestore user doc for extra fields
  if (db) {
    const snap = await getDoc(doc(db, 'users', fbUser.uid));
    if (snap.exists()) {
      const data = snap.data();
      return {
        id: fbUser.uid,
        email: fbUser.email ?? '',
        displayName: data.displayName ?? fbUser.displayName ?? '',
        role: data.role ?? 'recruit',
        favorites: data.favorites ?? [],
        linkedRecruitId: data.linkedRecruitId,
        schoolId: data.schoolId,
        createdAt: data.createdAt ?? new Date().toISOString(),
      };
    }
  }
  // Fallback if no Firestore doc yet
  return {
    id: fbUser.uid,
    email: fbUser.email ?? '',
    displayName: fbUser.displayName ?? fbUser.email?.split('@')[0] ?? '',
    role: 'recruit',
    favorites: [],
    createdAt: new Date().toISOString(),
  };
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export async function signIn(email: string, password: string): Promise<User> {
  if (isFirebaseConfigured && firebaseAuth) {
    const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = await firebaseUserToAppUser(cred.user);
    await persistUser(user);
    return user;
  }

  // Mock mode
  const registryRaw = await AsyncStorage.getItem('college_visit_users');
  const registry: Record<string, { user: User; password: string }> =
    registryRaw ? JSON.parse(registryRaw) : {};

  const entry = Object.values(registry).find(
    (r) => r.user.email === email && r.password === password,
  );

  if (!entry) {
    throw new Error('Invalid email or password.');
  }

  await persistUser(entry.user);
  return entry.user;
}

export async function signUp(
  email: string,
  password: string,
  role: UserRole,
  displayName: string,
): Promise<User> {
  if (isFirebaseConfigured && firebaseAuth && db) {
    const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user: User = {
      id: cred.user.uid,
      email,
      displayName,
      role,
      favorites: [],
      createdAt: new Date().toISOString(),
    };
    // Create Firestore user doc
    await setDoc(doc(db, 'users', cred.user.uid), {
      email,
      displayName,
      role,
      favorites: [],
      createdAt: serverTimestamp(),
    });
    await persistUser(user);
    return user;
  }

  // Mock mode
  const registryRaw = await AsyncStorage.getItem('college_visit_users');
  const registry: Record<string, { user: User; password: string }> =
    registryRaw ? JSON.parse(registryRaw) : {};

  const exists = Object.values(registry).some((r) => r.user.email === email);
  if (exists) {
    throw new Error('An account with this email already exists.');
  }

  const user: User = {
    id: generateId(),
    email,
    displayName,
    role,
    favorites: [],
    createdAt: new Date().toISOString(),
  };

  registry[user.id] = { user, password };
  await AsyncStorage.setItem('college_visit_users', JSON.stringify(registry));
  await persistUser(user);
  return user;
}

export async function signOut(): Promise<void> {
  if (isFirebaseConfigured && firebaseAuth) {
    await firebaseSignOut(firebaseAuth);
  }
  await clearPersistedUser();
}

export async function getCurrentUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    await clearPersistedUser();
    return null;
  }
}

/**
 * Listen for Firebase auth state changes.
 * Returns an unsubscribe function. No-op in mock mode.
 */
export function onAuthChange(
  callback: (user: User | null) => void,
): () => void {
  if (isFirebaseConfigured && firebaseAuth) {
    return onAuthStateChanged(firebaseAuth, async (fbUser) => {
      if (fbUser) {
        const user = await firebaseUserToAppUser(fbUser);
        await persistUser(user);
        callback(user);
      } else {
        await clearPersistedUser();
        callback(null);
      }
    });
  }
  // Mock mode: no-op
  return () => {};
}
