// =============================================================================
// Social Sign-In Buttons
// College Visit Platform
// =============================================================================
// Conditionally renders Google and Apple sign-in buttons.
// Auto-hides when credentials are not configured.
// =============================================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  isGoogleSignInAvailable,
  isAppleSignInAvailable,
  signInWithGoogle,
  signInWithApple,
} from '@/services/socialAuth';
import type { User } from '@/types';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SocialSignInButtonsProps {
  onSuccess: (user: User) => void;
  onError: (error: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SocialSignInButtons({
  onSuccess,
  onError,
}: SocialSignInButtonsProps) {
  const [loading, setLoading] = useState<'google' | 'apple' | null>(null);

  const googleAvailable = isGoogleSignInAvailable();
  const appleAvailable = isAppleSignInAvailable();

  if (!googleAvailable && !appleAvailable) return null;

  const handleGoogle = async () => {
    setLoading('google');
    try {
      const user = await signInWithGoogle();
      onSuccess(user);
    } catch (err: any) {
      onError(err?.message ?? 'Google sign-in failed');
    } finally {
      setLoading(null);
    }
  };

  const handleApple = async () => {
    setLoading('apple');
    try {
      const user = await signInWithApple();
      onSuccess(user);
    } catch (err: any) {
      onError(err?.message ?? 'Apple sign-in failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <View>
      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-[#334155]" />
        <Text className="text-slate-500 text-sm mx-4">OR</Text>
        <View className="flex-1 h-px bg-[#334155]" />
      </View>

      {/* Google */}
      {googleAvailable && (
        <TouchableOpacity
          className="bg-white rounded-lg py-3.5 items-center flex-row justify-center mb-3"
          onPress={handleGoogle}
          disabled={loading !== null}
          activeOpacity={0.8}
        >
          {loading === 'google' ? (
            <ActivityIndicator color="#333" />
          ) : (
            <>
              <Text className="text-lg mr-3">G</Text>
              <Text className="text-gray-800 text-base font-semibold">
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Apple */}
      {appleAvailable && (
        <TouchableOpacity
          className="bg-white rounded-lg py-3.5 items-center flex-row justify-center"
          onPress={handleApple}
          disabled={loading !== null}
          activeOpacity={0.8}
        >
          {loading === 'apple' ? (
            <ActivityIndicator color="#333" />
          ) : (
            <>
              <Text className="text-lg mr-3">{'\uF8FF'}</Text>
              <Text className="text-gray-800 text-base font-semibold">
                Continue with Apple
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
