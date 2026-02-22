// =============================================================================
// Auth Service (Mock – AsyncStorage backed)
// College Visit Platform
// =============================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, UserRole } from '@/types';

const AUTH_STORAGE_KEY = 'college_visit_auth';

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** Generate a pseudo-random ID suitable for prototype use. */
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/** Persist the authenticated user to AsyncStorage. */
async function persistUser(user: User): Promise<void> {
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

/** Remove the stored user from AsyncStorage. */
async function clearPersistedUser(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Sign in with email and password.
 *
 * For the prototype this performs a simple lookup against previously-registered
 * users stored in AsyncStorage. In MVP this will delegate to Firebase Auth.
 */
export async function signIn(
  email: string,
  password: string,
): Promise<User> {
  // Look up registered users
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

/**
 * Register a new account.
 *
 * Creates a User object, persists it to the mock user registry, and sets
 * it as the current authenticated user.
 */
export async function signUp(
  email: string,
  password: string,
  role: UserRole,
  displayName: string,
): Promise<User> {
  // Ensure email is not already registered
  const registryRaw = await AsyncStorage.getItem('college_visit_users');
  const registry: Record<string, { user: User; password: string }> =
    registryRaw ? JSON.parse(registryRaw) : {};

  const exists = Object.values(registry).some(
    (r) => r.user.email === email,
  );

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

  // Persist to the mock user registry
  registry[user.id] = { user, password };
  await AsyncStorage.setItem(
    'college_visit_users',
    JSON.stringify(registry),
  );

  // Set as current authenticated user
  await persistUser(user);
  return user;
}

/**
 * Sign the current user out and clear persisted auth state.
 */
export async function signOut(): Promise<void> {
  await clearPersistedUser();
}

/**
 * Retrieve the currently authenticated user, if any.
 *
 * Returns `null` when no user is signed in.
 */
export async function getCurrentUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    // Corrupted data – clear and return null
    await clearPersistedUser();
    return null;
  }
}
