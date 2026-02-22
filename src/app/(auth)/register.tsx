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
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

// ---------------------------------------------------------------------------
// Role Card Data
// ---------------------------------------------------------------------------

interface RoleOption {
  role: UserRole;
  emoji: string;
  title: string;
  description: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'recruit',
    emoji: '\uD83C\uDFC8', // football emoji
    title: 'Recruit',
    description: 'I am a prospective student-athlete exploring schools.',
  },
  {
    role: 'parent',
    emoji: '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66', // family emoji
    title: 'Parent',
    description: 'I am supporting my child through the recruiting process.',
  },
  {
    role: 'admin',
    emoji: '\uD83C\uDFEB', // school emoji
    title: 'Admin',
    description: 'I manage a school profile and recruiting content.',
  },
];

// ---------------------------------------------------------------------------
// Register Screen
// ---------------------------------------------------------------------------

export default function RegisterScreen() {
  const { register, updateProfile, loading } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('recruit');
  const [linkedRecruitCode, setLinkedRecruitCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);

    if (!displayName.trim()) {
      setError('Please enter your display name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter a password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await register(email.trim(), password, selectedRole, displayName.trim());
      if (selectedRole === 'parent' && linkedRecruitCode.trim()) {
        await updateProfile({ linkedRecruitId: linkedRecruitCode.trim() });
      }
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0F172A]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-8">
          {/* ------- Title ------- */}
          <View className="items-center mb-8">
            <Text className="text-white text-3xl font-bold">
              Create Account
            </Text>
            <Text className="text-slate-400 text-sm mt-2">
              Join the College Visit platform
            </Text>
          </View>

          {/* ------- Error Message ------- */}
          {error && (
            <View className="bg-red-900/40 border border-red-500 rounded-lg px-4 py-3 mb-4">
              <Text className="text-red-400 text-sm text-center">{error}</Text>
            </View>
          )}

          {/* ------- Display Name ------- */}
          <View className="mb-4">
            <Text className="text-slate-300 text-sm mb-2 font-medium">
              Display Name
            </Text>
            <TextInput
              className="bg-[#334155] text-white px-4 py-3.5 rounded-lg text-base"
              placeholder="Your name"
              placeholderTextColor="#64748B"
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>

          {/* ------- Email ------- */}
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

          {/* ------- Password ------- */}
          <View className="mb-4">
            <Text className="text-slate-300 text-sm mb-2 font-medium">
              Password
            </Text>
            <TextInput
              className="bg-[#334155] text-white px-4 py-3.5 rounded-lg text-base"
              placeholder="At least 6 characters"
              placeholderTextColor="#64748B"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* ------- Confirm Password ------- */}
          <View className="mb-6">
            <Text className="text-slate-300 text-sm mb-2 font-medium">
              Confirm Password
            </Text>
            <TextInput
              className="bg-[#334155] text-white px-4 py-3.5 rounded-lg text-base"
              placeholder="Re-enter your password"
              placeholderTextColor="#64748B"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* ------- Role Selector ------- */}
          <Text className="text-slate-300 text-sm mb-3 font-medium">
            I am a...
          </Text>
          <View className="mb-4">
            {ROLE_OPTIONS.map((option) => {
              const isSelected = selectedRole === option.role;
              return (
                <TouchableOpacity
                  key={option.role}
                  className={`flex-row items-center p-4 rounded-xl mb-3 border ${
                    isSelected
                      ? 'bg-blue-500/10 border-blue-500'
                      : 'bg-[#1E293B] border-[#334155]'
                  }`}
                  onPress={() => setSelectedRole(option.role)}
                  activeOpacity={0.7}
                >
                  <Text className="text-3xl mr-4">{option.emoji}</Text>
                  <View className="flex-1">
                    <Text
                      className={`text-base font-bold ${
                        isSelected ? 'text-blue-400' : 'text-white'
                      }`}
                    >
                      {option.title}
                    </Text>
                    <Text className="text-slate-400 text-xs mt-1">
                      {option.description}
                    </Text>
                  </View>
                  {/* Selection indicator */}
                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      isSelected ? 'border-blue-500' : 'border-slate-500'
                    }`}
                  >
                    {isSelected && (
                      <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ------- Parent: Linked Recruit Code ------- */}
          {selectedRole === 'parent' && (
            <View className="mb-6">
              <Text className="text-slate-300 text-sm mb-2 font-medium">
                Recruit Email or Code (optional)
              </Text>
              <TextInput
                className="bg-[#334155] text-white px-4 py-3.5 rounded-lg text-base"
                placeholder="Enter recruit's email or invite code"
                placeholderTextColor="#64748B"
                autoCapitalize="none"
                value={linkedRecruitCode}
                onChangeText={setLinkedRecruitCode}
              />
              <Text className="text-slate-500 text-xs mt-2">
                Link your account to your child's recruit profile to follow their visit activity.
              </Text>
            </View>
          )}

          {/* ------- Register Button ------- */}
          <TouchableOpacity
            className={`rounded-lg py-4 items-center mt-2 ${
              loading ? 'bg-blue-500/50' : 'bg-blue-500'
            }`}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-bold">
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* ------- Login Link ------- */}
          <View className="mt-6 items-center">
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-slate-400 text-sm">
                  Already have an account?{' '}
                  <Text className="text-blue-400 font-semibold">Log In</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
