import React from 'react';
import { Stack } from 'expo-router';

// ---------------------------------------------------------------------------
// Auth Layout
// ---------------------------------------------------------------------------

/**
 * Stack layout for authentication screens (login, register).
 * Uses a dark background with no headers -- each screen renders its own UI.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F172A' },
        animation: 'slide_from_right',
      }}
    />
  );
}
