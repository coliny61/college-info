import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { AuthProvider } from '@/context/AuthContext';
import { SchoolThemeProvider, registerSchoolData } from '@/context/SchoolThemeContext';
import { AnalyticsProvider } from '@/context/AnalyticsContext';
import { SCHOOLS } from '@/data/schools';
import { requestNotificationPermission } from '@/services/notifications';
import '../../global.css';

// ---------------------------------------------------------------------------
// Prevent splash screen from hiding until the app is ready
// ---------------------------------------------------------------------------
SplashScreen.preventAutoHideAsync();

// Register school data so SchoolThemeContext can look up brand colors
registerSchoolData(SCHOOLS);

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen on first render
    SplashScreen.hideAsync();

    // Request notification permission on first launch
    requestNotificationPermission();

    // Handle notification taps
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        // Future: navigate based on data.type
        console.log('[Notifications] Tapped:', data);
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <AuthProvider>
      <SchoolThemeProvider>
        <AnalyticsProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0F172A' },
              animation: 'fade',
            }}
          />
        </AnalyticsProvider>
      </SchoolThemeProvider>
    </AuthProvider>
  );
}
