// =============================================================================
// Firestore Service (Dual-Mode: Firebase + AsyncStorage mock)
// College Visit Platform
// =============================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { isFirebaseConfigured, db } from './firebase';
import type {
  School,
  AnalyticsEvent,
  JerseySelection,
} from '@/types';

// Storage key constants
const FAVORITES_KEY = 'college_visit_favorites';
const ANALYTICS_KEY = 'college_visit_analytics';
const JERSEY_KEY = 'college_visit_jerseys';

// -----------------------------------------------------------------------------
// Schools
// -----------------------------------------------------------------------------

export async function getSchools(): Promise<School[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'schools'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as School));
  }

  const raw = await AsyncStorage.getItem('college_visit_schools');
  if (raw) {
    try {
      return JSON.parse(raw) as School[];
    } catch {
      // fall through
    }
  }
  return [];
}

export async function getSchool(id: string): Promise<School | null> {
  if (isFirebaseConfigured && db) {
    const snap = await getDoc(doc(db, 'schools', id));
    if (snap.exists()) return { id: snap.id, ...snap.data() } as School;
    return null;
  }

  const schools = await getSchools();
  return schools.find((s) => s.id === id) ?? null;
}

// -----------------------------------------------------------------------------
// Favorites
// -----------------------------------------------------------------------------

async function loadFavoritesMap(): Promise<Record<string, string[]>> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, string[]>;
  } catch {
    return {};
  }
}

async function saveFavoritesMap(map: Record<string, string[]>): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(map));
}

export async function getUserFavorites(userId: string): Promise<string[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) return (snap.data().favorites as string[]) ?? [];
    return [];
  }

  const map = await loadFavoritesMap();
  return map[userId] ?? [];
}

export async function toggleFavorite(
  userId: string,
  schoolId: string,
): Promise<string[]> {
  if (isFirebaseConfigured && db) {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    const current: string[] = snap.exists() ? (snap.data().favorites ?? []) : [];
    const isFav = current.includes(schoolId);

    await updateDoc(userRef, {
      favorites: isFav ? arrayRemove(schoolId) : arrayUnion(schoolId),
    });

    return isFav ? current.filter((id) => id !== schoolId) : [...current, schoolId];
  }

  // Mock mode
  const map = await loadFavoritesMap();
  const current = map[userId] ?? [];
  const index = current.indexOf(schoolId);
  if (index === -1) {
    current.push(schoolId);
  } else {
    current.splice(index, 1);
  }
  map[userId] = current;
  await saveFavoritesMap(map);
  return current;
}

// -----------------------------------------------------------------------------
// Analytics
// -----------------------------------------------------------------------------

export async function getAnalyticsForSchool(
  schoolId: string,
): Promise<AnalyticsEvent[]> {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'analytics'), where('schoolId', '==', schoolId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AnalyticsEvent));
  }

  const raw = await AsyncStorage.getItem(ANALYTICS_KEY);
  if (!raw) return [];
  try {
    const events = JSON.parse(raw) as AnalyticsEvent[];
    return events.filter((e) => e.schoolId === schoolId);
  } catch {
    return [];
  }
}

export async function getAnalyticsForRecruit(
  userId: string,
): Promise<AnalyticsEvent[]> {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'analytics'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AnalyticsEvent));
  }

  const raw = await AsyncStorage.getItem(ANALYTICS_KEY);
  if (!raw) return [];
  try {
    const events = JSON.parse(raw) as AnalyticsEvent[];
    return events.filter((e) => e.userId === userId);
  } catch {
    return [];
  }
}

// -----------------------------------------------------------------------------
// Jersey Selections
// -----------------------------------------------------------------------------

export async function saveJerseySelection(
  selection: JerseySelection,
): Promise<void> {
  if (isFirebaseConfigured && db) {
    await addDoc(collection(db, 'jerseySelections'), {
      ...selection,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Mock mode
  const raw = await AsyncStorage.getItem(JERSEY_KEY);
  let selections: JerseySelection[] = [];
  if (raw) {
    try {
      selections = JSON.parse(raw) as JerseySelection[];
    } catch {
      selections = [];
    }
  }

  const existingIndex = selections.findIndex(
    (s) => s.userId === selection.userId && s.schoolId === selection.schoolId,
  );

  if (existingIndex !== -1) {
    selections[existingIndex] = selection;
  } else {
    selections.push(selection);
  }

  await AsyncStorage.setItem(JERSEY_KEY, JSON.stringify(selections));
}

export async function getJerseySelections(
  schoolId: string,
): Promise<JerseySelection[]> {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, 'jerseySelections'), where('schoolId', '==', schoolId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as JerseySelection);
  }

  const raw = await AsyncStorage.getItem(JERSEY_KEY);
  if (!raw) return [];
  try {
    const selections = JSON.parse(raw) as JerseySelection[];
    return selections.filter((s) => s.schoolId === schoolId);
  } catch {
    return [];
  }
}
