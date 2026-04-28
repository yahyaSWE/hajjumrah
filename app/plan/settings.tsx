import { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/providers/AuthProvider';
import { useActiveTravelPlan, useDeleteTravelPlan } from '@/hooks/useTravelPlan';
import { supabase } from '@/lib/supabase';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';
import type { NotificationPreferences } from '@/lib/types';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { data: plan } = useActiveTravelPlan();
  const deletePlan = useDeleteTravelPlan();

  const [prefs, setPrefs] = useState<NotificationPreferences | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setPrefs(data as NotificationPreferences);
      });
  }, [user]);

  const updatePref = async (updates: Partial<NotificationPreferences>) => {
    if (!prefs) return;
    const newPrefs = { ...prefs, ...updates };
    setPrefs(newPrefs);

    await supabase
      .from('notification_preferences')
      .update(updates)
      .eq('user_id', user!.id);
  };

  const handleDeletePlan = () => {
    if (!plan) return;
    Alert.alert(
      'Ta bort reseplan',
      'Är du säker? Alla förberedelser och framsteg raderas.',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Ta bort',
          style: 'destructive',
          onPress: async () => {
            await deletePlan.mutateAsync(plan.id);
            router.replace('/plan' as any);
          },
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Logga ut',
      'Vill du logga ut?',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Logga ut',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  const displayName = user?.user_metadata?.display_name || user?.email || '';

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={COLORS.accent} />
          </View>
          <ThemedText variant="h2">{displayName}</ThemedText>
          <ThemedText variant="bodySmall" color={COLORS.textSecondary}>
            {user?.email}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText variant="h3" style={styles.sectionTitle}>Påminnelser</ThemedText>

          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <ThemedText variant="body">Påminnelser</ThemedText>
              <ThemedText variant="caption" color={COLORS.textSecondary}>
                Få notiser om kommande förberedelser
              </ThemedText>
            </View>
            <Switch
              value={prefs?.push_enabled ?? true}
              onValueChange={(val) => updatePref({ push_enabled: val })}
              trackColor={{ false: COLORS.border, true: COLORS.accent }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <ThemedText variant="body">1 vecka före avresa</ThemedText>
              <ThemedText variant="caption" color={COLORS.textSecondary}>
                Påminnelse en vecka innan du reser
              </ThemedText>
            </View>
            <Switch
              value={prefs?.week_before_reminder ?? true}
              onValueChange={(val) => updatePref({ week_before_reminder: val })}
              trackColor={{ false: COLORS.border, true: COLORS.accent }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <ThemedText variant="body">Dagen före avresa</ThemedText>
              <ThemedText variant="caption" color={COLORS.textSecondary}>
                Påminnelse dagen innan du reser
              </ThemedText>
            </View>
            <Switch
              value={prefs?.day_before_reminder ?? true}
              onValueChange={(val) => updatePref({ day_before_reminder: val })}
              trackColor={{ false: COLORS.border, true: COLORS.accent }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {plan && (
          <View style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>Reseplan</ThemedText>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={handleDeletePlan}
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              <ThemedText variant="body" color={COLORS.error}>
                Ta bort reseplan
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <ThemedText variant="h3" style={styles.sectionTitle}>Konto</ThemedText>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <ThemedText variant="body" color={COLORS.error}>
              Logga ut
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
    gap: SPACING.lg,
  },
  profileSection: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingText: {
    flex: 1,
    marginRight: SPACING.md,
    gap: 2,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
});
