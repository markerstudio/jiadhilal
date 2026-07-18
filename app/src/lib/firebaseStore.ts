/* Firebase-backed DataStore (Auth + Firestore). Active when the VITE_FIREBASE_* env
   vars are set. Data model — one document per entity, workouts embedded in programs:
     profiles/{uid}        { name, email, role, goal? }
     programs/{id}         { name, description, daysPerWeek, workouts: Workout[] }
     assignments/{clientId}{ programId, startDate }
     sessions/{id}         { clientId, workoutId, workoutName, date, durationMin, exercises }
     notes/{id}            { clientId, body, createdAt }
     nutritionPlans/{clientId}        { name, days: { training, rest } }
     nutritionLogs/{clientId_date}    { clientId, date, dayType, completedMeals, ... }
     checkins/{clientId_date}         { clientId, date, weightKg?, steps?, sleepHrs?, restingHr? }
     wellnessTargets/{clientId}       { stepsTarget, sleepTarget, weightGoalKg? }
   Security rules: ../../firebase/firestore.rules */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  type Firestore,
} from 'firebase/firestore';
import type { DataStore, Profile, Program, Session, CoachNote, NutritionPlan, NutritionLog, CheckIn, ProgressPhoto, ChatMessage } from './types';

/* Firebase web config is public by design (security comes from Firestore rules).
   Baked-in defaults point at the production project; env vars still override,
   and VITE_FIREBASE_DISABLED=true forces demo mode. */
const env = import.meta.env;
const config = {
  apiKey: (env.VITE_FIREBASE_API_KEY as string | undefined) ?? 'AIzaSyCN1Y8OAgQs-Lv8YXBEoKGAgzxiJMQVgtU',
  projectId: (env.VITE_FIREBASE_PROJECT_ID as string | undefined) ?? 'jiadhilal-coaching',
  authDomain: (env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined) ?? 'jiadhilal-coaching.firebaseapp.com',
  appId: (env.VITE_FIREBASE_APP_ID as string | undefined) ?? '1:259493260195:web:6f4c81f6a31ae587078816',
};

export const isFirebaseConfigured =
  env.VITE_FIREBASE_DISABLED !== 'true' && Boolean(config.apiKey && config.projectId);

let app: FirebaseApp | null = null;
function firebase(): FirebaseApp {
  if (!app) {
    if (!isFirebaseConfigured) throw new Error('Firebase is not configured');
    app = initializeApp(config);
  }
  return app;
}
export const firebaseAuth = (): Auth => getAuth(firebase());
const db = (): Firestore => getFirestore(firebase());

/* ---- mappers (doc data + id → domain types) ---- */
const toProfile = (id: string, d: any): Profile => ({
  id,
  name: d.name,
  email: d.email,
  role: d.role,
  goal: d.goal ?? undefined,
});

const toProgram = (id: string, d: any): Program => ({
  id,
  name: d.name,
  description: d.description ?? '',
  daysPerWeek: d.daysPerWeek ?? 4,
  workouts: (d.workouts ?? []).slice().sort((a: any, b: any) => a.order - b.order),
});

const toSession = (id: string, d: any): Session => ({
  id,
  clientId: d.clientId,
  workoutId: d.workoutId,
  workoutName: d.workoutName,
  date: d.date,
  durationMin: d.durationMin ?? 0,
  exercises: d.exercises ?? [],
});

const toNutritionPlan = (clientId: string, d: any): NutritionPlan => ({
  clientId,
  name: d.name ?? 'Nutrition plan',
  days: d.days,
});

const toNutritionLog = (d: any): NutritionLog => ({
  clientId: d.clientId,
  date: d.date,
  dayType: d.dayType ?? 'training',
  completedMeals: d.completedMeals ?? [],
  dayCompleted: d.dayCompleted ?? false,
  extraFoods: d.extraFoods ?? {},
  extraMeals: d.extraMeals ?? [],
});

const toNote = (id: string, d: any): CoachNote => ({
  id,
  clientId: d.clientId,
  body: d.body,
  createdAt: d.createdAt,
});

/** Create the profile doc on first sign-in (no server triggers on the free plan). */
export async function ensureProfile(uid: string, email: string): Promise<Profile> {
  const ref = doc(db(), 'profiles', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return toProfile(uid, snap.data());
  const fresh = { name: email.split('@')[0], email, role: 'client' as const };
  await setDoc(ref, fresh);
  return { id: uid, ...fresh };
}

export const firebaseStore: DataStore = {
  async getProfile(id) {
    const snap = await getDoc(doc(db(), 'profiles', id));
    return snap.exists() ? toProfile(id, snap.data()) : null;
  },
  async listClients() {
    const snap = await getDocs(query(collection(db(), 'profiles'), where('role', '==', 'client')));
    return snap.docs.map((d) => toProfile(d.id, d.data())).sort((a, b) => a.name.localeCompare(b.name));
  },

  async listPrograms() {
    const snap = await getDocs(collection(db(), 'programs'));
    return snap.docs.map((d) => toProgram(d.id, d.data())).sort((a, b) => a.name.localeCompare(b.name));
  },
  async getProgram(id) {
    const snap = await getDoc(doc(db(), 'programs', id));
    return snap.exists() ? toProgram(id, snap.data()) : null;
  },
  async saveProgram(p) {
    await setDoc(doc(db(), 'programs', p.id), {
      name: p.name,
      description: p.description,
      daysPerWeek: p.daysPerWeek,
      workouts: p.workouts,
    });
  },
  async deleteProgram(id) {
    await deleteDoc(doc(db(), 'programs', id));
    const stale = await getDocs(query(collection(db(), 'assignments'), where('programId', '==', id)));
    await Promise.all(stale.docs.map((d) => deleteDoc(d.ref)));
  },

  async getAssignment(clientId) {
    const snap = await getDoc(doc(db(), 'assignments', clientId));
    if (!snap.exists()) return null;
    const d = snap.data();
    return { clientId, programId: d.programId, startDate: d.startDate };
  },
  async assignProgram(clientId, programId) {
    await setDoc(doc(db(), 'assignments', clientId), {
      programId,
      startDate: new Date().toISOString().slice(0, 10),
    });
  },

  async listSessions(clientId) {
    const snap = await getDocs(query(collection(db(), 'sessions'), where('clientId', '==', clientId)));
    return snap.docs.map((d) => toSession(d.id, d.data())).sort((a, b) => a.date.localeCompare(b.date));
  },
  async listAllSessions() {
    const snap = await getDocs(collection(db(), 'sessions'));
    return snap.docs.map((d) => toSession(d.id, d.data())).sort((a, b) => a.date.localeCompare(b.date));
  },
  async addSession(s) {
    const ref = await addDoc(collection(db(), 'sessions'), s);
    return { ...s, id: ref.id };
  },

  async listNotes(clientId) {
    const snap = await getDocs(query(collection(db(), 'notes'), where('clientId', '==', clientId)));
    return snap.docs.map((d) => toNote(d.id, d.data())).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async addNote(n) {
    const data = { ...n, createdAt: new Date().toISOString() };
    const ref = await addDoc(collection(db(), 'notes'), data);
    return { ...data, id: ref.id };
  },

  async getNutritionPlan(clientId) {
    const snap = await getDoc(doc(db(), 'nutritionPlans', clientId));
    return snap.exists() ? toNutritionPlan(clientId, snap.data()) : null;
  },
  async saveNutritionPlan(p) {
    await setDoc(doc(db(), 'nutritionPlans', p.clientId), { name: p.name, days: p.days });
  },
  async getNutritionLog(clientId, date) {
    const snap = await getDoc(doc(db(), 'nutritionLogs', `${clientId}_${date}`));
    return snap.exists() ? toNutritionLog(snap.data()) : null;
  },
  async saveNutritionLog(log) {
    await setDoc(doc(db(), 'nutritionLogs', `${log.clientId}_${log.date}`), log);
  },
  async listNutritionLogs(clientId) {
    const snap = await getDocs(query(collection(db(), 'nutritionLogs'), where('clientId', '==', clientId)));
    return snap.docs.map((d) => toNutritionLog(d.data())).sort((a, b) => b.date.localeCompare(a.date));
  },

  async getCheckIn(clientId, date) {
    const snap = await getDoc(doc(db(), 'checkins', `${clientId}_${date}`));
    return snap.exists() ? (snap.data() as CheckIn) : null;
  },
  async saveCheckIn(c) {
    // strip undefined optionals — Firestore rejects undefined field values
    const data = Object.fromEntries(Object.entries(c).filter(([, v]) => v !== undefined));
    await setDoc(doc(db(), 'checkins', `${c.clientId}_${c.date}`), data);
  },
  async listCheckIns(clientId) {
    const snap = await getDocs(query(collection(db(), 'checkins'), where('clientId', '==', clientId)));
    return snap.docs.map((d) => d.data() as CheckIn).sort((a, b) => b.date.localeCompare(a.date));
  },
  async getWellnessTargets(clientId) {
    const snap = await getDoc(doc(db(), 'wellnessTargets', clientId));
    if (!snap.exists()) return null;
    const d = snap.data();
    return { clientId, stepsTarget: d.stepsTarget ?? 10000, sleepTarget: d.sleepTarget ?? 8, weightGoalKg: d.weightGoalKg ?? undefined };
  },
  async saveWellnessTargets(t) {
    const data: Record<string, unknown> = { stepsTarget: t.stepsTarget, sleepTarget: t.sleepTarget };
    if (t.weightGoalKg !== undefined) data.weightGoalKg = t.weightGoalKg;
    await setDoc(doc(db(), 'wellnessTargets', t.clientId), data);
  },

  async getIngestToken(clientId) {
    const snap = await getDoc(doc(db(), 'ingestTokens', clientId));
    return snap.exists() ? (snap.data().token as string) : null;
  },
  async saveIngestToken(clientId, token) {
    await setDoc(doc(db(), 'ingestTokens', clientId), { token });
  },

  async listPhotos(clientId) {
    const snap = await getDocs(query(collection(db(), 'photos'), where('clientId', '==', clientId)));
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Omit<ProgressPhoto, 'id'>) }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },
  async addPhoto(p) {
    const data = { ...p, createdAt: new Date().toISOString() };
    const ref = await addDoc(collection(db(), 'photos'), data);
    return { ...data, id: ref.id };
  },
  async deletePhoto(id) {
    await deleteDoc(doc(db(), 'photos', id));
  },

  async listMessages(clientId) {
    const snap = await getDocs(query(collection(db(), 'messages'), where('clientId', '==', clientId)));
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Omit<ChatMessage, 'id'>) }))
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
  async sendMessage(m) {
    const data = { ...m, createdAt: new Date().toISOString() };
    const ref = await addDoc(collection(db(), 'messages'), data);
    return { ...data, id: ref.id };
  },
};
