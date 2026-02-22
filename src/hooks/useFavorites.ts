import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FAVORITES_STORAGE_KEY = 'college_visit_favorites';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UseFavoritesResult {
  /** Array of favorited school IDs. */
  favorites: string[];
  /** Check whether a given school is currently favorited. */
  isFavorite: (schoolId: string) => boolean;
  /** Toggle a school's favorite status (add if missing, remove if present). */
  toggleFavorite: (schoolId: string) => Promise<void>;
  /** True while the initial favorites list is being loaded. */
  loading: boolean;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Manages the current user's favorite schools list.
 *
 * Reads favorites from the auth context's user object, provides helpers
 * for checking and toggling status, and persists changes to both the
 * auth context (via `updateProfile`) and AsyncStorage for offline support.
 */
export function useFavorites(): UseFavoritesResult {
  const { user, updateProfile } = useAuth();
  const [favorites, setFavorites] = useState<string[]>(user?.favorites ?? []);
  const [loading, setLoading] = useState(true);

  // Sync from auth user and hydrate from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        // If user has favorites in context, use those as primary source
        if (user?.favorites && user.favorites.length > 0) {
          setFavorites(user.favorites);
          // Sync to storage for offline access
          await AsyncStorage.setItem(
            FAVORITES_STORAGE_KEY,
            JSON.stringify(user.favorites),
          );
        } else {
          // Fall back to AsyncStorage if user context has none
          const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
          if (stored) {
            const parsed: string[] = JSON.parse(stored);
            setFavorites(parsed);
          }
        }
      } catch (error) {
        console.warn('[useFavorites] Failed to load favorites:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.favorites]);

  const isFavorite = useCallback(
    (schoolId: string): boolean => favorites.includes(schoolId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    async (schoolId: string) => {
      const updatedFavorites = favorites.includes(schoolId)
        ? favorites.filter((id) => id !== schoolId)
        : [...favorites, schoolId];

      // Update local state immediately for responsiveness
      setFavorites(updatedFavorites);

      // Persist to auth context
      try {
        await updateProfile({ favorites: updatedFavorites });
      } catch (error) {
        console.warn('[useFavorites] Failed to update profile:', error);
      }

      // Persist to AsyncStorage for offline support
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(updatedFavorites),
        );
      } catch (error) {
        console.warn('[useFavorites] Failed to persist to AsyncStorage:', error);
      }
    },
    [favorites, updateProfile],
  );

  return { favorites, isFavorite, toggleFavorite, loading };
}
