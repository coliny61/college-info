import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/context/AuthContext';
import { SchoolThemeProvider, registerSchoolData } from '@/context/SchoolThemeContext';
import { AnalyticsProvider } from '@/context/AnalyticsContext';
import { SCHOOLS } from '@/data/schools';
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
