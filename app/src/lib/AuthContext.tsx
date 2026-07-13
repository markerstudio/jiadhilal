/* Auth context — Firebase email/password when configured, demo quick-login otherwise. */
import React from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import type { Profile } from './types';
import { demoMode, store } from './store';
import { firebaseAuth, ensureProfile } from './firebaseStore';
import { DEMO_COACH, DEMO_CLIENTS } from './demoData';

interface AuthValue {
  user: Profile | null;
  loading: boolean;
  demoMode: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthValue | null>(null);
const DEMO_KEY = 'jh_demo_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (demoMode) {
      const id = localStorage.getItem(DEMO_KEY);
      if (id) store.getProfile(id).then(setUser).finally(() => setLoading(false));
      else setLoading(false);
      return;
    }
    // Firebase: react to auth state; bootstrap the profile doc on first sign-in.
    const unsub = onAuthStateChanged(firebaseAuth(), async (fbUser) => {
      if (fbUser) setUser(await ensureProfile(fbUser.uid, fbUser.email ?? ''));
      else setUser(null);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = React.useCallback(async (email: string, password: string) => {
    if (demoMode) {
      // any password; known demo emails pick the profile (coach@… → admin)
      const all = [DEMO_COACH, ...DEMO_CLIENTS];
      const match =
        all.find((p) => p.email.toLowerCase() === email.trim().toLowerCase()) ??
        DEMO_CLIENTS[0];
      localStorage.setItem(DEMO_KEY, match.id);
      setUser(match);
      return;
    }
    const cred = await signInWithEmailAndPassword(firebaseAuth(), email, password);
    setUser(await ensureProfile(cred.user.uid, cred.user.email ?? email));
  }, []);

  const signOut = React.useCallback(async () => {
    if (demoMode) {
      localStorage.removeItem(DEMO_KEY);
    } else {
      await fbSignOut(firebaseAuth());
    }
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({ user, loading, demoMode, signIn, signOut }),
    [user, loading, signIn, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
