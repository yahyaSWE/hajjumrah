import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/providers/AuthProvider';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    if (!displayName.trim()) {
      setError('Ange ditt namn.');
      return;
    }
    if (!email.trim()) {
      setError('Ange din e-postadress.');
      return;
    }
    if (password.length < 6) {
      setError('Lösenordet måste vara minst 6 tecken.');
      return;
    }

    setError('');
    setLoading(true);

    const { error: signUpError } = await signUp(email.trim(), password, displayName.trim());

    if (signUpError) {
      setError(signUpError.message || 'Kunde inte skapa konto. Försök igen.');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <BackgroundPattern>
        <View style={[styles.successContainer, { paddingTop: insets.top + SPACING.xxl }]}>
          <Ionicons name="checkmark-circle" size={64} color={COLORS.success} />
          <ThemedText variant="h2" style={styles.successTitle}>Konto skapat!</ThemedText>
          <ThemedText variant="body" color={COLORS.textSecondary} style={styles.successText}>
            Kontrollera din e-post för att verifiera ditt konto. Logga sedan in.
          </ThemedText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/auth/login')}
          >
            <ThemedText variant="body" color={COLORS.background} style={styles.buttonText}>
              Gå till inloggning
            </ThemedText>
          </TouchableOpacity>
        </View>
      </BackgroundPattern>
    );
  }

  return (
    <BackgroundPattern>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.xxl }]}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <ThemedText variant="arabicLarge" style={styles.bismillah}>
              بِسْمِ اللَّهِ
            </ThemedText>
            <ThemedText variant="h1" style={styles.title}>Skapa konto</ThemedText>
            <ThemedText variant="bodySmall" color={COLORS.textSecondary}>
              Registrera dig för att skapa din personliga reseplan
            </ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <ThemedText variant="caption" color={COLORS.textSecondary} style={styles.label}>
                Namn
              </ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ditt namn"
                  placeholderTextColor={COLORS.textMuted}
                  value={displayName}
                  onChangeText={setDisplayName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <ThemedText variant="caption" color={COLORS.textSecondary} style={styles.label}>
                E-postadress
              </ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="din@epost.se"
                  placeholderTextColor={COLORS.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <ThemedText variant="caption" color={COLORS.textSecondary} style={styles.label}>
                Lösenord
              </ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Minst 6 tecken"
                  placeholderTextColor={COLORS.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color={COLORS.error} />
                <ThemedText variant="bodySmall" color={COLORS.error} style={styles.errorText}>
                  {error}
                </ThemedText>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.background} />
              ) : (
                <ThemedText variant="body" color={COLORS.background} style={styles.buttonText}>
                  Skapa konto
                </ThemedText>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <ThemedText variant="bodySmall" color={COLORS.textSecondary}>
              Har du redan ett konto?{' '}
            </ThemedText>
            <TouchableOpacity onPress={() => router.replace('/auth/login')}>
              <ThemedText variant="bodySmall" color={COLORS.accent} style={styles.link}>
                Logga in
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  bismillah: {
    color: COLORS.accent,
    marginBottom: SPACING.sm,
  },
  title: {
    marginBottom: SPACING.xs,
  },
  form: {
    gap: SPACING.md,
  },
  inputContainer: {
    gap: SPACING.xs,
  },
  label: {
    marginLeft: SPACING.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 52,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontFamily: 'Inter-Variable',
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  errorText: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.md,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  successTitle: {
    marginTop: SPACING.md,
  },
  successText: {
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  link: {
    fontWeight: '600',
  },
});
