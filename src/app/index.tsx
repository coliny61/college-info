import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';

// ---------------------------------------------------------------------------
// Role-Based Redirect
// ---------------------------------------------------------------------------

const ONBOARDING_KEY = 'college_visit_onboarding_complete';

/**
 * Root index screen. Reads the current user from auth context and redirects
 * to the appropriate role-based group: /(recruit), /(parent), or /(admin).
 * If no user is signed in, checks whether onboarding has been completed.
 * First-time users are sent to the onboarding flow; returning users go to login.
 */
export default function IndexRedirect() {
  const { user, loading } = useAuth();
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Check onboarding status from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
      setOnboardingComplete(value === 'true');
      setOnboardingChecked(true);
    });
  }, []);

  useEffect(() => {
    if (loading || !onboardingChecked) return;

    if (!user) {
      if (!onboardingComplete) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(auth)/login');
      }
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
  }, [user, loading, onboardingChecked, onboardingComplete]);

  // Show a loading spinner while auth state is being resolved
  return (
    <View className="flex-1 items-center justify-center bg-[#0F172A]">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
}
