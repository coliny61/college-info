import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { SCHOOLS } from '@/data/schools';
import {
  getNotificationPrefs,
  setNotificationPrefs,
  type NotificationPrefs,
} from '@/services/notifications';

// ---------------------------------------------------------------------------
// Admin Profile Screen
// ---------------------------------------------------------------------------

export default function AdminProfileScreen() {
  const { user, logout } = useAuth();
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    visitReminders: true,
    newSchoolAlerts: true,
    favoriteUpdates: true,
  });

  useEffect(() => {
    getNotificationPrefs().then(setPrefs);
  }, []);

  const togglePref = async (key: keyof NotificationPrefs) => {
    const updated = await setNotificationPrefs({ [key]: !prefs[key] });
    setPrefs(updated);
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  const initials = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : '?';

  const adminSchool = user?.schoolId
    ? SCHOOLS.find((s) => s.id === user.schoolId)
    : null;

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ------- Profile Header ------- */}
        <View className="items-center pt-8 pb-6">
          <View className="w-20 h-20 rounded-full bg-amber-600 items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">{initials}</Text>
          </View>
          <Text className="text-white text-xl font-bold">
            {user?.displayName ?? 'Unknown'}
          </Text>
          <Text className="text-slate-400 text-sm mt-1">
            {user?.email ?? ''}
          </Text>
          <View className="bg-amber-500/20 rounded-full px-3 py-1 mt-2">
            <Text className="text-amber-400 text-xs font-semibold uppercase">
              Admin
            </Text>
          </View>
        </View>

        {/* ------- School Info ------- */}
        {adminSchool && (
          <View className="mx-4 mb-6">
            <View
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: adminSchool.colors.primary + '15',
                borderColor: adminSchool.colors.primary + '40',
              }}
            >
              <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Managing School
              </Text>
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: adminSchool.colors.primary }}
                >
                  <Text className="text-white font-bold text-sm">
                    {adminSchool.shortName}
                  </Text>
                </View>
                <View>
                  <Text className="text-white font-bold">
                    {adminSchool.name}
                  </Text>
                  <Text className="text-slate-400 text-xs">
                    {adminSchool.mascot} | {adminSchool.conference}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ------- Notification Preferences ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Notifications
          </Text>
          <View className="bg-[#1E293B] rounded-xl">
            <NotificationRow
              label="Visit Reminders"
              description="Get reminded about upcoming recruit visits"
              value={prefs.visitReminders}
              onToggle={() => togglePref('visitReminders')}
            />
            <View className="h-px bg-[#334155]" />
            <NotificationRow
              label="New School Alerts"
              description="Weekly platform activity updates"
              value={prefs.newSchoolAlerts}
              onToggle={() => togglePref('newSchoolAlerts')}
            />
            <View className="h-px bg-[#334155]" />
            <NotificationRow
              label="Favorite Updates"
              description="When recruits favorite your school"
              value={prefs.favoriteUpdates}
              onToggle={() => togglePref('favoriteUpdates')}
            />
          </View>
        </View>

        {/* ------- Account Info ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Account
          </Text>
          <View className="bg-[#1E293B] rounded-xl p-4">
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-400 text-sm">Role</Text>
              <Text className="text-white text-sm font-medium">
                School Administrator
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-400 text-sm">Member Since</Text>
              <Text className="text-white text-sm font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'N/A'}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-slate-400 text-sm">User ID</Text>
              <Text className="text-slate-500 text-xs font-mono">
                {user?.id ?? 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* ------- Logout ------- */}
        <View className="px-4">
          <TouchableOpacity
            className="bg-red-500/10 border border-red-500/30 rounded-xl py-4 items-center"
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text className="text-red-400 font-bold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Notification Row
// ---------------------------------------------------------------------------

function NotificationRow({
  label,
  description,
  value,
  onToggle,
}: {
  label: string;
  description: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between p-4">
      <View className="flex-1 mr-4">
        <Text className="text-white text-sm font-medium">{label}</Text>
        <Text className="text-slate-500 text-xs mt-0.5">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#334155', true: '#3B82F6' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}
