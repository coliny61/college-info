import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';

// ---------------------------------------------------------------------------
// Recruit Tab Layout
// ---------------------------------------------------------------------------

/**
 * Bottom tab navigator for recruit users.
 * Three tabs: Home (marketplace), Favorites, Profile.
 */
export default function RecruitLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E293B',
          borderTopColor: '#334155',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\uD83C\uDFE0'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\u2B50'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\uD83D\uDC64'}</Text>
          ),
        }}
      />
      {/* Hide the school/[id] route from the tab bar */}
      <Tabs.Screen
        name="school/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
