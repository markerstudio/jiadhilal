/* Supabase-backed DataStore. Active when VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are set.
   Schema: see ../../supabase/schema.sql (snake_case columns mapped here). */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { DataStore, Profile, Program, Workout, Session, CoachNote } from './types';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient {
  if (!client) {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured');
    client = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
  }
  return client;
}

/* ---- row mappers ---- */
const toProfile = (r: any): Profile => ({
  id: r.id,
  name: r.name,
  email: r.email,
  role: r.role,
  goal: r.goal ?? undefined,
});

const toWorkout = (r: any): Workout => ({
  id: r.id,
  name: r.name,
  subtitle: r.subtitle ?? '',
  order: r.ord,
  exercises: r.exercises ?? [],
});

const toSession = (r: any): Session => ({
  id: r.id,
  clientId: r.client_id,
  workoutId: r.workout_id,
  workoutName: r.workout_name,
  date: r.date,
  durationMin: r.duration_min,
  exercises: r.exercises ?? [],
});

const toNote = (r: any): CoachNote => ({
  id: r.id,
  clientId: r.client_id,
  body: r.body,
  createdAt: r.created_at,
});

function toProgram(r: any, workoutRows: any[]): Program {
  return {
    id: r.id,
    name: r.name,
    description: r.description ?? '',
    daysPerWeek: r.days_per_week,
    workouts: workoutRows
      .filter((w) => w.program_id === r.id)
      .map(toWorkout)
      .sort((a, b) => a.order - b.order),
  };
}

function fail(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

export const supabaseStore: DataStore = {
  async getProfile(id) {
    const { data, error } = await supabase().from('profiles').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toProfile(data) : null;
  },
  async listClients() {
    const { data, error } = await supabase().from('profiles').select('*').eq('role', 'client').order('name');
    fail(error);
    return (data ?? []).map(toProfile);
  },

  async listPrograms() {
    const [p, w] = await Promise.all([
      supabase().from('programs').select('*').order('created_at'),
      supabase().from('workouts').select('*'),
    ]);
    fail(p.error);
    fail(w.error);
    return (p.data ?? []).map((r) => toProgram(r, w.data ?? []));
  },
  async getProgram(id) {
    const [p, w] = await Promise.all([
      supabase().from('programs').select('*').eq('id', id).maybeSingle(),
      supabase().from('workouts').select('*').eq('program_id', id),
    ]);
    fail(p.error);
    fail(w.error);
    return p.data ? toProgram(p.data, w.data ?? []) : null;
  },
  async saveProgram(program) {
    const sb = supabase();
    const { error: pe } = await sb.from('programs').upsert({
      id: program.id,
      name: program.name,
      description: program.description,
      days_per_week: program.daysPerWeek,
    });
    fail(pe);
    // replace workouts wholesale — simplest consistent write for a builder UI
    const { error: de } = await sb.from('workouts').delete().eq('program_id', program.id);
    fail(de);
    if (program.workouts.length) {
      const { error: we } = await sb.from('workouts').insert(
        program.workouts.map((w) => ({
          id: w.id,
          program_id: program.id,
          name: w.name,
          subtitle: w.subtitle,
          ord: w.order,
          exercises: w.exercises,
        })),
      );
      fail(we);
    }
  },
  async deleteProgram(id) {
    const { error } = await supabase().from('programs').delete().eq('id', id);
    fail(error);
  },

  async getAssignment(clientId) {
    const { data, error } = await supabase().from('assignments').select('*').eq('client_id', clientId).maybeSingle();
    fail(error);
    return data ? { clientId: data.client_id, programId: data.program_id, startDate: data.start_date } : null;
  },
  async assignProgram(clientId, programId) {
    const { error } = await supabase().from('assignments').upsert({
      client_id: clientId,
      program_id: programId,
      start_date: new Date().toISOString().slice(0, 10),
    });
    fail(error);
  },

  async listSessions(clientId) {
    const { data, error } = await supabase().from('sessions').select('*').eq('client_id', clientId).order('date');
    fail(error);
    return (data ?? []).map(toSession);
  },
  async listAllSessions() {
    const { data, error } = await supabase().from('sessions').select('*').order('date');
    fail(error);
    return (data ?? []).map(toSession);
  },
  async addSession(s) {
    const { data, error } = await supabase()
      .from('sessions')
      .insert({
        client_id: s.clientId,
        workout_id: s.workoutId,
        workout_name: s.workoutName,
        date: s.date,
        duration_min: s.durationMin,
        exercises: s.exercises,
      })
      .select()
      .single();
    fail(error);
    return toSession(data);
  },

  async listNotes(clientId) {
    const { data, error } = await supabase()
      .from('notes')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    fail(error);
    return (data ?? []).map(toNote);
  },
  async addNote(n) {
    const { data, error } = await supabase()
      .from('notes')
      .insert({ client_id: n.clientId, body: n.body })
      .select()
      .single();
    fail(error);
    return toNote(data);
  },
};
