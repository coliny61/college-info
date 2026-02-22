import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, UserRole } from '@/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    role: UserRole,
    displayName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Pick<User, 'displayName' | 'avatarUrl' | 'favorites' | 'linkedRecruitId'>>) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'college_visit_user';

/**
 * Mock users for the prototype. login() will match against these first,
 * falling back to creating a new user when no match is found.
 */
const MOCK_USERS: User[] = [
  {
    id: 'recruit-1',
    email: 'recruit@test.com',
    displayName: 'Marcus Johnson',
    role: 'recruit',
    favorites: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'parent-1',
    email: 'parent@test.com',
    displayName: 'Lisa Johnson',
    role: 'parent',
    favorites: [],
    linkedRecruitId: 'recruit-1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin-1',
    email: 'admin@test.com',
    displayName: 'Coach Williams',
    role: 'admin',
    favorites: [],
    schoolId: 'alabama',
    createdAt: new Date().toISOString(),
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a simple unique ID for prototype purposes. */
function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored) as User);
        }
      } catch (error) {
        console.warn('[AuthContext] Failed to restore session:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Look up the email in mock users first
      const found = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );

      const loggedInUser: User = found ?? {
        id: generateId(),
        email,
        displayName: email.split('@')[0],
        role: 'recruit',
        favorites: [],
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (
      email: string,
      _password: string,
      role: UserRole,
      displayName: string,
    ) => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newUser: User = {
          id: generateId(),
          email,
          displayName,
          role,
          favorites: [],
          createdAt: new Date().toISOString(),
        };

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<Pick<User, 'displayName' | 'avatarUrl' | 'favorites' | 'linkedRecruitId'>>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated: User = { ...prev, ...data };
        // Fire-and-forget persist
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(
          (err) => console.warn('[AuthContext] Failed to persist profile update:', err),
        );
        return updated;
      });
    },
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, logout, updateProfile }),
    [user, loading, login, register, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the current auth state and methods.
 * Must be used within an <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
