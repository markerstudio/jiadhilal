-- Jiad Hilal Coaching Platform — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

-- ============ tables ============

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'client' check (role in ('client', 'coach')),
  goal text,
  created_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  days_per_week int not null default 4 check (days_per_week between 1 and 7),
  created_at timestamptz not null default now()
);

create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  name text not null,
  subtitle text not null default '',
  ord int not null default 0,
  -- [{ id, name, sets: [{ w, r }] }]
  exercises jsonb not null default '[]'
);

create table public.assignments (
  client_id uuid primary key references public.profiles (id) on delete cascade,
  program_id uuid not null references public.programs (id) on delete cascade,
  start_date date not null default current_date
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete cascade,
  workout_id uuid not null,
  workout_name text not null,
  date date not null default current_date,
  duration_min int not null default 0,
  -- [{ name, sets: [{ w, r, done }] }]
  exercises jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index sessions_client_date on public.sessions (client_id, date);
create index notes_client_created on public.notes (client_id, created_at desc);
create index workouts_program on public.workouts (program_id);

-- ============ auto-create profile on signup ============
-- name/role can be passed via auth signUp options.data ({ name, role }).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'client')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ row-level security ============

alter table public.profiles enable row level security;
alter table public.programs enable row level security;
alter table public.workouts enable row level security;
alter table public.assignments enable row level security;
alter table public.sessions enable row level security;
alter table public.notes enable row level security;

-- helper: is the current user a coach?
create or replace function public.is_coach()
returns boolean
language sql stable
security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'coach');
$$;

-- profiles: read own; coach reads all; own row updatable; coach updates any
create policy "profiles read own or coach" on public.profiles
  for select using (id = auth.uid() or public.is_coach());
create policy "profiles update own or coach" on public.profiles
  for update using (id = auth.uid() or public.is_coach());

-- programs/workouts: any signed-in user can read; only coach writes
create policy "programs read" on public.programs
  for select using (auth.uid() is not null);
create policy "programs write coach" on public.programs
  for all using (public.is_coach()) with check (public.is_coach());

create policy "workouts read" on public.workouts
  for select using (auth.uid() is not null);
create policy "workouts write coach" on public.workouts
  for all using (public.is_coach()) with check (public.is_coach());

-- assignments: client reads own; coach reads/writes all
create policy "assignments read own or coach" on public.assignments
  for select using (client_id = auth.uid() or public.is_coach());
create policy "assignments write coach" on public.assignments
  for all using (public.is_coach()) with check (public.is_coach());

-- sessions: client reads/inserts own; coach reads all
create policy "sessions read own or coach" on public.sessions
  for select using (client_id = auth.uid() or public.is_coach());
create policy "sessions insert own" on public.sessions
  for insert with check (client_id = auth.uid());

-- notes: client reads own; coach reads/writes all
create policy "notes read own or coach" on public.notes
  for select using (client_id = auth.uid() or public.is_coach());
create policy "notes write coach" on public.notes
  for insert with check (public.is_coach());
