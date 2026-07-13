/* Active DataStore: Supabase when configured, demo (localStorage) otherwise. */
import type { DataStore } from './types';
import { demoStore } from './demoStore';
import { supabaseStore, isSupabaseConfigured } from './supabaseStore';

export const demoMode = !isSupabaseConfigured;
export const store: DataStore = demoMode ? demoStore : supabaseStore;
