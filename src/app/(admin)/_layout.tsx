import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';

// ---------------------------------------------------------------------------
// Admin Tab Layout
// ---------------------------------------------------------------------------

/**
 * Bottom tab navigator for admin users.
 * Four tabs: Dashboard, Analytics, Content, Profile.
 */
export default function AdminLayout() {
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
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\uD83D\uDCCA'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\uD83D\uDCC8'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="content"
        options={{
          title: 'Content',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\uD83D\uDCDD'}</Text>
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
    </Tabs>
  );
}
