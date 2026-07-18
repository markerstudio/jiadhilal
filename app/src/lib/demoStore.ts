/* Demo-mode DataStore — localStorage-persisted, seeded on first run.
   Lets the whole app (client + admin) work with zero backend config. */
import type { DataStore, Profile, Program, Assignment, Session, CoachNote, NutritionPlan, NutritionLog, CheckIn, WellnessTargets } from './types';
import { DEMO_COACH, DEMO_CLIENTS, DEMO_PROGRAM, DEMO_ASSIGNMENTS, DEMO_SESSIONS, DEMO_NOTES } from './demoData';

const KEY = 'jh_demo_db_v1';

interface DB {
  profiles: Profile[];
  programs: Program[];
  assignments: Assignment[];
  sessions: Session[];
  notes: CoachNote[];
  nutritionPlans: NutritionPlan[];
  nutritionLogs: NutritionLog[];
  checkIns: CheckIn[];
  wellnessTargets: WellnessTargets[];
}

function seed(): DB {
  return {
    profiles: [DEMO_COACH, ...DEMO_CLIENTS],
    programs: [DEMO_PROGRAM],
    assignments: DEMO_ASSIGNMENTS,
    sessions: DEMO_SESSIONS,
    notes: DEMO_NOTES,
    nutritionPlans: [],
    nutritionLogs: [],
    checkIns: [],
    wellnessTargets: [],
  };
}

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const db = JSON.parse(raw) as DB;
      // migrate DBs persisted before nutrition / check-ins existed
      db.nutritionPlans ??= [];
      db.nutritionLogs ??= [];
      db.checkIns ??= [];
      db.wellnessTargets ??= [];
      return db;
    }
  } catch {
    /* corrupted storage → reseed */
  }
  const db = seed();
  save(db);
  return db;
}

function save(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

const uid = () => `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const demoStore: DataStore = {
  async getProfile(id) {
    return load().profiles.find((p) => p.id === id) ?? null;
  },
  async listClients() {
    return load().profiles.filter((p) => p.role === 'client');
  },

  async listPrograms() {
    return load().programs;
  },
  async getProgram(id) {
    return load().programs.find((p) => p.id === id) ?? null;
  },
  async saveProgram(program) {
    const db = load();
    const i = db.programs.findIndex((p) => p.id === program.id);
    if (i >= 0) db.programs[i] = program;
    else db.programs.push(program);
    save(db);
  },
  async deleteProgram(id) {
    const db = load();
    db.programs = db.programs.filter((p) => p.id !== id);
    db.assignments = db.assignments.filter((a) => a.programId !== id);
    save(db);
  },

  async getAssignment(clientId) {
    return load().assignments.find((a) => a.clientId === clientId) ?? null;
  },
  async assignProgram(clientId, programId) {
    const db = load();
    db.assignments = db.assignments.filter((a) => a.clientId !== clientId);
    db.assignments.push({ clientId, programId, startDate: new Date().toISOString().slice(0, 10) });
    save(db);
  },

  async listSessions(clientId) {
    return load().sessions.filter((s) => s.clientId === clientId);
  },
  async listAllSessions() {
    return load().sessions;
  },
  async addSession(s) {
    const db = load();
    const session: Session = { ...s, id: uid() };
    db.sessions.push(session);
    save(db);
    return session;
  },

  async listNotes(clientId) {
    return load()
      .notes.filter((n) => n.clientId === clientId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async addNote(n) {
    const db = load();
    const note: CoachNote = { ...n, id: uid(), createdAt: new Date().toISOString() };
    db.notes.push(note);
    save(db);
    return note;
  },

  async getNutritionPlan(clientId) {
    return load().nutritionPlans.find((p) => p.clientId === clientId) ?? null;
  },
  async saveNutritionPlan(plan) {
    const db = load();
    const i = db.nutritionPlans.findIndex((p) => p.clientId === plan.clientId);
    if (i >= 0) db.nutritionPlans[i] = plan;
    else db.nutritionPlans.push(plan);
    save(db);
  },
  async getNutritionLog(clientId, date) {
    return load().nutritionLogs.find((l) => l.clientId === clientId && l.date === date) ?? null;
  },
  async saveNutritionLog(log) {
    const db = load();
    const i = db.nutritionLogs.findIndex((l) => l.clientId === log.clientId && l.date === log.date);
    if (i >= 0) db.nutritionLogs[i] = log;
    else db.nutritionLogs.push(log);
    save(db);
  },
  async listNutritionLogs(clientId) {
    return load()
      .nutritionLogs.filter((l) => l.clientId === clientId)
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  async getCheckIn(clientId, date) {
    return load().checkIns.find((c) => c.clientId === clientId && c.date === date) ?? null;
  },
  async saveCheckIn(c) {
    const db = load();
    const i = db.checkIns.findIndex((x) => x.clientId === c.clientId && x.date === c.date);
    if (i >= 0) db.checkIns[i] = c;
    else db.checkIns.push(c);
    save(db);
  },
  async listCheckIns(clientId) {
    return load()
      .checkIns.filter((c) => c.clientId === clientId)
      .sort((a, b) => b.date.localeCompare(a.date));
  },
  async getWellnessTargets(clientId) {
    return load().wellnessTargets.find((t) => t.clientId === clientId) ?? null;
  },
  async saveWellnessTargets(t) {
    const db = load();
    const i = db.wellnessTargets.findIndex((x) => x.clientId === t.clientId);
    if (i >= 0) db.wellnessTargets[i] = t;
    else db.wellnessTargets.push(t);
    save(db);
  },
};

/** Reset demo data (useful from the profile screen / console). */
export function resetDemoData() {
  localStorage.removeItem(KEY);
}
