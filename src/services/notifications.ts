// =============================================================================
// Notifications Service
// College Visit Platform
// =============================================================================

import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NotificationPrefs {
  visitReminders: boolean;
  newSchoolAlerts: boolean;
  favoriteUpdates: boolean;
}

const PREFS_KEY = 'college_visit_notification_prefs';

const DEFAULT_PREFS: NotificationPrefs = {
  visitReminders: true,
  newSchoolAlerts: true,
  favoriteUpdates: true,
};

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ---------------------------------------------------------------------------
// Permission
// ---------------------------------------------------------------------------

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// ---------------------------------------------------------------------------
// Local Notifications
// ---------------------------------------------------------------------------

/**
 * Schedule a visit reminder notification.
 * Fires 24 hours before the visit date.
 */
export async function scheduleVisitReminder(
  schoolName: string,
  visitDate: Date,
  facilityName?: string,
): Promise<string | null> {
  const prefs = await getNotificationPrefs();
  if (!prefs.visitReminders) return null;

  // Schedule for 24h before visit
  const triggerDate = new Date(visitDate.getTime() - 24 * 60 * 60 * 1000);
  if (triggerDate <= new Date()) {
    // If the reminder time is already past, schedule for 5 seconds from now
    triggerDate.setTime(Date.now() + 5000);
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Visit Reminder: ${schoolName}`,
      body: facilityName
        ? `Your tour of ${facilityName} at ${schoolName} is tomorrow!`
        : `Your visit to ${schoolName} is tomorrow!`,
      data: { type: 'visit_reminder', schoolName },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
  return id;
}

/**
 * Schedule a weekly "Explore new schools" notification.
 */
export async function scheduleNewSchoolAlert(): Promise<string | null> {
  const prefs = await getNotificationPrefs();
  if (!prefs.newSchoolAlerts) return null;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Discover New Programs',
      body: 'Check out the latest schools and facilities on College Visit!',
      data: { type: 'new_school_alert' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: 2, // Monday
      hour: 10,
      minute: 0,
    },
  });
  return id;
}

/**
 * Cancel all scheduled notifications.
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// ---------------------------------------------------------------------------
// Preferences
// ---------------------------------------------------------------------------

export async function getNotificationPrefs(): Promise<NotificationPrefs> {
  const raw = await AsyncStorage.getItem(PREFS_KEY);
  if (!raw) return DEFAULT_PREFS;
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export async function setNotificationPrefs(
  prefs: Partial<NotificationPrefs>,
): Promise<NotificationPrefs> {
  const current = await getNotificationPrefs();
  const updated = { ...current, ...prefs };
  await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(updated));
  return updated;
}
