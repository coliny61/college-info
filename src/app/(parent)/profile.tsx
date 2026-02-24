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
import { MOCK_USERS } from '@/data/mockUsers';
import {
  getNotificationPrefs,
  setNotificationPrefs,
  type NotificationPrefs,
} from '@/services/notifications';

// ---------------------------------------------------------------------------
// Parent Profile Screen
// ---------------------------------------------------------------------------

export default function ParentProfileScreen() {
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

  const linkedRecruit = user?.linkedRecruitId
    ? MOCK_USERS.find((u) => u.id === user.linkedRecruitId)
    : null;

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

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ------- Profile Header ------- */}
        <View className="items-center pt-8 pb-6">
          <View className="w-20 h-20 rounded-full bg-emerald-600 items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">{initials}</Text>
          </View>
          <Text className="text-white text-xl font-bold">
            {user?.displayName ?? 'Unknown'}
          </Text>
          <Text className="text-slate-400 text-sm mt-1">
            {user?.email ?? ''}
          </Text>
          <View className="bg-emerald-500/20 rounded-full px-3 py-1 mt-2">
            <Text className="text-emerald-400 text-xs font-semibold uppercase">
              Parent
            </Text>
          </View>
        </View>

        {/* ------- Linked Recruit ------- */}
        <View className="mx-4 mb-6">
          <View className="bg-[#1E293B] rounded-xl p-4">
            <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Linked Recruit
            </Text>
            {user?.linkedRecruitId ? (
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mr-3">
                  <Text className="text-white font-bold">
                    {linkedRecruit?.displayName?.charAt(0)?.toUpperCase() ?? '?'}
                  </Text>
                </View>
                <View>
                  <Text className="text-white font-bold">
                    {linkedRecruit?.displayName ?? 'Unknown Recruit'}
                  </Text>
                  <Text className="text-slate-400 text-xs">
                    {linkedRecruit?.email ?? ''}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text className="text-slate-400 text-sm">
                  No recruit linked yet
                </Text>
                <TouchableOpacity className="mt-2">
                  <Text className="text-blue-400 text-sm font-semibold">
                    Link a Recruit Account
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* ------- Stats ------- */}
        <View className="flex-row mx-4 mb-6">
          <View className="flex-1 bg-[#1E293B] rounded-xl p-4 mr-2 items-center">
            <Text className="text-white text-2xl font-bold">5</Text>
            <Text className="text-slate-400 text-xs mt-1">Schools Viewed</Text>
          </View>
          <View className="flex-1 bg-[#1E293B] rounded-xl p-4 ml-2 items-center">
            <Text className="text-white text-2xl font-bold">
              {user?.favorites?.length ?? 0}
            </Text>
            <Text className="text-slate-400 text-xs mt-1">Favorites</Text>
          </View>
        </View>

        {/* ------- Notifications ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Notifications
          </Text>
          <View className="bg-[#1E293B] rounded-xl">
            <NotifRow
              label="Visit Reminders"
              description="Get reminded before scheduled visits"
              value={prefs.visitReminders}
              onToggle={() => togglePref('visitReminders')}
            />
            <View className="h-px bg-[#334155]" />
            <NotifRow
              label="New School Alerts"
              description="Weekly updates about new programs"
              value={prefs.newSchoolAlerts}
              onToggle={() => togglePref('newSchoolAlerts')}
            />
            <View className="h-px bg-[#334155]" />
            <NotifRow
              label="Favorite Updates"
              description="Updates about your favorited schools"
              value={prefs.favoriteUpdates}
              onToggle={() => togglePref('favoriteUpdates')}
            />
          </View>
        </View>

        {/* ------- Quick Actions ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Quick Actions
          </Text>
          <TouchableOpacity
            className="bg-[#1E293B] rounded-xl p-4 mb-3 flex-row items-center"
            onPress={() => router.push('/(parent)')}
            activeOpacity={0.7}
          >
            <Text className="text-xl mr-3">{'\uD83C\uDFC8'}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold">Browse Schools</Text>
              <Text className="text-slate-400 text-xs mt-0.5">
                Explore programs together
              </Text>
            </View>
            <Text className="text-slate-500">{'\u203A'}</Text>
          </TouchableOpacity>
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
// Notification Toggle Row
// ---------------------------------------------------------------------------

function NotifRow({
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
