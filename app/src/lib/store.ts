/* Active DataStore: Firebase when configured, demo (localStorage) otherwise. */
import type { DataStore } from './types';
import { demoStore } from './demoStore';
import { firebaseStore, isFirebaseConfigured } from './firebaseStore';

export const demoMode = !isFirebaseConfigured;
export const store: DataStore = demoMode ? demoStore : firebaseStore;
