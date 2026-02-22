import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

// ---------------------------------------------------------------------------
// Role-Based Redirect
// ---------------------------------------------------------------------------

/**
 * Root index screen. Reads the current user from auth context and redirects
 * to the appropriate role-based group: /(recruit), /(parent), or /(admin).
 * If no user is signed in, redirects to the login screen.
 */
export default function IndexRedirect() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/(auth)/login');
      return;
    }

    switch (user.role) {
      case 'recruit':
        router.replace('/(recruit)');
        break;
      case 'parent':
        router.replace('/(parent)');
        break;
      case 'admin':
        router.replace('/(admin)');
        break;
      default:
        router.replace('/(auth)/login');
    }
  }, [user, loading]);

  // Show a loading spinner while auth state is being resolved
  return (
    <View className="flex-1 items-center justify-center bg-[#0F172A]">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
}
