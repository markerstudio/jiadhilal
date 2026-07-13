/* Loads everything the client screens need in one shot: assignment → program, sessions, notes. */
import React from 'react';
import { useAuth } from './AuthContext';
import { store } from './store';
import type { Program, Assignment, Session, CoachNote } from './types';

export interface ClientData {
  program: Program | null;
  assignment: Assignment | null;
  sessions: Session[];
  notes: CoachNote[];
}

export function useClientData(clientIdOverride?: string) {
  const { user } = useAuth();
  const clientId = clientIdOverride ?? user?.id;
  const [data, setData] = React.useState<ClientData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const reload = React.useCallback(async () => {
    if (!clientId) return;
    const [assignment, sessions, notes] = await Promise.all([
      store.getAssignment(clientId),
      store.listSessions(clientId),
      store.listNotes(clientId),
    ]);
    const program = assignment ? await store.getProgram(assignment.programId) : null;
    setData({ program, assignment, sessions, notes });
    setLoading(false);
  }, [clientId]);

  React.useEffect(() => {
    setLoading(true);
    void reload();
  }, [reload]);

  return { data, loading, reload, clientId };
}
