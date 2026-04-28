import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useCreateTravelPlan } from '@/hooks/useTravelPlan';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

export default function CreatePlanScreen() {
  const router = useRouter();
  const createPlan = useCreateTravelPlan();

  const [pilgrimageType, setPilgrimageType] = useState<'hajj' | 'umrah' | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (date: Date | null) => {
    if (!date) return 'Välj datum';
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDepartureChange = (_: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowDeparturePicker(false);
    if (date) setDepartureDate(date);
  };

  const handleReturnChange = (_: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowReturnPicker(false);
    if (date) setReturnDate(date);
  };

  const handleCreate = async () => {
    if (!pilgrimageType) {
      setError('Välj Hajj eller Umrah.');
      return;
    }
    if (!departureDate) {
      setError('Välj avresedatum.');
      return;
    }

    setError('');
    try {
      await createPlan.mutateAsync({
        pilgrimageType,
        departureDate: departureDate.toISOString().split('T')[0],
        returnDate: returnDate ? returnDate.toISOString().split('T')[0] : undefined,
      });
      router.replace('/plan' as any);
    } catch {
      setError('Kunde inte skapa planen. Försök igen.');
    }
  };

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="h2" style={styles.sectionTitle}>
          Välj pilgrimsfärd
        </ThemedText>

        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[
              styles.typeCard,
              pilgrimageType === 'hajj' && styles.typeCardSelected,
            ]}
            onPress={() => setPilgrimageType('hajj')}
          >
            <Ionicons
              name="star"
              size={32}
              color={pilgrimageType === 'hajj' ? COLORS.accent : COLORS.textMuted}
            />
            <ThemedText
              variant="h3"
              color={pilgrimageType === 'hajj' ? COLORS.accent : COLORS.text}
            >
              Hajj
            </ThemedText>
            <ThemedText variant="caption" color={COLORS.textSecondary}>
              Den stora pilgrimsfärden
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeCard,
              pilgrimageType === 'umrah' && styles.typeCardSelected,
            ]}
            onPress={() => setPilgrimageType('umrah')}
          >
            <Ionicons
              name="moon"
              size={32}
              color={pilgrimageType === 'umrah' ? COLORS.accent : COLORS.textMuted}
            />
            <ThemedText
              variant="h3"
              color={pilgrimageType === 'umrah' ? COLORS.accent : COLORS.text}
            >
              Umrah
            </ThemedText>
            <ThemedText variant="caption" color={COLORS.textSecondary}>
              Den lilla pilgrimsfärden
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText variant="h2" style={styles.sectionTitle}>
          Resedatum
        </ThemedText>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDeparturePicker(!showDeparturePicker)}
        >
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={22} color={COLORS.accent} />
            <View style={styles.dateText}>
              <ThemedText variant="caption" color={COLORS.textSecondary}>Avresedatum</ThemedText>
              <ThemedText
                variant="body"
                color={departureDate ? COLORS.text : COLORS.textMuted}
              >
                {formatDate(departureDate)}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>

        {showDeparturePicker && (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={departureDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={handleDepartureChange}
              textColor={COLORS.text}
              themeVariant="dark"
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.pickerDone}
                onPress={() => setShowDeparturePicker(false)}
              >
                <ThemedText variant="body" color={COLORS.accent}>Klar</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowReturnPicker(!showReturnPicker)}
        >
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={22} color={COLORS.textMuted} />
            <View style={styles.dateText}>
              <ThemedText variant="caption" color={COLORS.textSecondary}>
                Returdatum (valfritt)
              </ThemedText>
              <ThemedText
                variant="body"
                color={returnDate ? COLORS.text : COLORS.textMuted}
              >
                {formatDate(returnDate)}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>

        {showReturnPicker && (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={returnDate || departureDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={departureDate || new Date()}
              onChange={handleReturnChange}
              textColor={COLORS.text}
              themeVariant="dark"
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.pickerDone}
                onPress={() => setShowReturnPicker(false)}
              >
                <ThemedText variant="body" color={COLORS.accent}>Klar</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        )}

        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color={COLORS.error} />
            <ThemedText variant="bodySmall" color={COLORS.error}>{error}</ThemedText>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.createButton, createPlan.isPending && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={createPlan.isPending}
        >
          {createPlan.isPending ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={22} color={COLORS.background} />
              <ThemedText variant="body" color={COLORS.background} style={styles.buttonText}>
                Skapa min plan
              </ThemedText>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  typeRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  typeCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  typeCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.surfaceElevated,
  },
  dateButton: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  dateText: {
    flex: 1,
    gap: 2,
  },
  pickerContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  pickerDone: {
    alignItems: 'flex-end',
    padding: SPACING.md,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.md,
    height: 52,
    marginTop: SPACING.xl,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: '600',
  },
});
