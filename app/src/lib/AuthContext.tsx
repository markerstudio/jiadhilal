/* Auth context — Supabase email/password when configured, demo quick-login otherwise. */
import React from 'react';
import type { Profile } from './types';
import { demoMode, store } from './store';
import { supabase } from './supabaseStore';
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
    const sb = supabase();
    sb.auth.getSession().then(async ({ data }) => {
      const uid = data.session?.user.id;
      if (uid) setUser(await store.getProfile(uid));
      setLoading(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange(async (_event, session) => {
      const uid = session?.user.id;
      setUser(uid ? await store.getProfile(uid) : null);
    });
    return () => sub.subscription.unsubscribe();
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
    const { data, error } = await supabase().auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    setUser(await store.getProfile(data.user.id));
  }, []);

  const signOut = React.useCallback(async () => {
    if (demoMode) localStorage.removeItem(DEMO_KEY);
    else await supabase().auth.signOut();
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
