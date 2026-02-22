import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

// ---------------------------------------------------------------------------
// Login Screen
// ---------------------------------------------------------------------------

export default function LoginScreen() {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login(email.trim(), password);
      // Redirect is handled by the root index.tsx after user state updates
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Login failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0F172A]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-8">
          {/* ------- App Title ------- */}
          <View className="items-center mb-12">
            <Text className="text-white text-4xl font-bold tracking-wider">
              College Visit
            </Text>
            <Text className="text-slate-400 text-base mt-2">
              Your Official Visit, Digitized
            </Text>
          </View>

          {/* ------- Error Message ------- */}
          {error && (
            <View className="bg-red-900/40 border border-red-500 rounded-lg px-4 py-3 mb-4">
              <Text className="text-red-400 text-sm text-center">{error}</Text>
            </View>
          )}

          {/* ------- Email Input ------- */}
          <View className="mb-4">
            <Text className="text-slate-300 text-sm mb-2 font-medium">
              Email
            </Text>
            <TextInput
              className="bg-[#334155] text-white px-4 py-3.5 rounded-lg text-base"
              placeholder="you@example.com"
              placeholderTextColor="#64748B"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* ------- Password Input ------- */}
          <View className="mb-6">
            <Text className="text-slate-300 text-sm mb-2 font-medium">
              Password
            </Text>
            <TextInput
              className="bg-[#334155] text-white px-4 py-3.5 rounded-lg text-base"
              placeholder="Enter your password"
              placeholderTextColor="#64748B"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* ------- Login Button ------- */}
          <TouchableOpacity
            className={`rounded-lg py-4 items-center ${
              loading ? 'bg-blue-500/50' : 'bg-blue-500'
            }`}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-bold">Log In</Text>
            )}
          </TouchableOpacity>

          {/* ------- Register Link ------- */}
          <View className="mt-8 items-center">
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text className="text-slate-400 text-sm">
                  Don't have an account?{' '}
                  <Text className="text-blue-400 font-semibold">Register</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* ------- Demo Accounts Hint ------- */}
          <View className="mt-6 items-center">
            <Text className="text-slate-500 text-xs">
              Demo: recruit@demo.com | parent@demo.com | admin@demo.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
