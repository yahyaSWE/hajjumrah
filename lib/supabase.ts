import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// SecureStore-adapter som hanterar stora värden genom att chunka data
// (SecureStore har en 2048 byte-gräns per nyckel i vissa versioner)
const CHUNK_SIZE = 1800;

const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try { return globalThis.localStorage.getItem(key); } catch { return null; }
    }
    try {
      const chunkCount = await SecureStore.getItemAsync(`${key}_chunks`);
      if (chunkCount) {
        const count = parseInt(chunkCount, 10);
        const chunks: string[] = [];
        for (let i = 0; i < count; i++) {
          const chunk = await SecureStore.getItemAsync(`${key}_chunk_${i}`);
          if (chunk) chunks.push(chunk);
        }
        return chunks.join('');
      }
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try { globalThis.localStorage.setItem(key, value); } catch {}
      return;
    }
    try {
      // Rensa befintliga chunks
      const existingChunks = await SecureStore.getItemAsync(`${key}_chunks`);
      if (existingChunks) {
        const count = parseInt(existingChunks, 10);
        for (let i = 0; i < count; i++) {
          await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
        }
        await SecureStore.deleteItemAsync(`${key}_chunks`);
      }

      if (value.length <= CHUNK_SIZE) {
        await SecureStore.setItemAsync(key, value);
      } else {
        const chunks = Math.ceil(value.length / CHUNK_SIZE);
        await SecureStore.setItemAsync(`${key}_chunks`, chunks.toString());
        for (let i = 0; i < chunks; i++) {
          await SecureStore.setItemAsync(
            `${key}_chunk_${i}`,
            value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
          );
        }
      }
    } catch {}
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try { globalThis.localStorage.removeItem(key); } catch {}
      return;
    }
    try {
      const chunkCount = await SecureStore.getItemAsync(`${key}_chunks`);
      if (chunkCount) {
        const count = parseInt(chunkCount, 10);
        for (let i = 0; i < count; i++) {
          await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
        }
        await SecureStore.deleteItemAsync(`${key}_chunks`);
      }
      await SecureStore.deleteItemAsync(key);
    } catch {}
  },
};

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const isSupabaseConfigured =
  !!process.env.EXPO_PUBLIC_SUPABASE_URL && !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
