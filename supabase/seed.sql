-- Optional starter content: one program with four workouts.
-- Run AFTER schema.sql. Clients/coach accounts are created via Supabase Auth
-- (Dashboard → Authentication → Add user), then promote the coach:
--
--   update public.profiles set role = 'coach' where email = 'coach@yourdomain.com';
--
-- Assign the program to a client:
--
--   insert into public.assignments (client_id, program_id)
--   select p.id, '11111111-1111-1111-1111-111111111111' from public.profiles p
--   where p.email = 'client@example.com';

insert into public.programs (id, name, description, days_per_week) values
  ('11111111-1111-1111-1111-111111111111', 'Hypertrophy Block 1',
   '4-day upper/lower split. Progressive overload on the big lifts, pump volume behind it.', 4);

insert into public.workouts (program_id, name, subtitle, ord, exercises) values
  ('11111111-1111-1111-1111-111111111111', 'Push Day A', 'chest, shoulders, triceps', 0, '[
    {"id":"e1","name":"Barbell Bench Press","sets":[{"w":135,"r":8},{"w":155,"r":8},{"w":175,"r":8},{"w":185,"r":6}]},
    {"id":"e2","name":"Incline DB Press","sets":[{"w":60,"r":10},{"w":65,"r":10},{"w":65,"r":9}]},
    {"id":"e3","name":"Cable Fly","sets":[{"w":30,"r":12},{"w":30,"r":12},{"w":35,"r":10}]},
    {"id":"e4","name":"Overhead Press","sets":[{"w":95,"r":8},{"w":105,"r":8},{"w":110,"r":6}]},
    {"id":"e5","name":"Triceps Pushdown","sets":[{"w":50,"r":12},{"w":55,"r":12},{"w":55,"r":10}]}
  ]'::jsonb),
  ('11111111-1111-1111-1111-111111111111', 'Pull Day A', 'back, biceps, rear delts', 1, '[
    {"id":"e1","name":"Deadlift","sets":[{"w":225,"r":5},{"w":275,"r":5},{"w":315,"r":3}]},
    {"id":"e2","name":"Weighted Pull-up","sets":[{"w":25,"r":8},{"w":25,"r":7},{"w":25,"r":6}]},
    {"id":"e3","name":"Barbell Row","sets":[{"w":135,"r":10},{"w":155,"r":8},{"w":155,"r":8}]},
    {"id":"e4","name":"Face Pull","sets":[{"w":40,"r":15},{"w":40,"r":15}]},
    {"id":"e5","name":"EZ-Bar Curl","sets":[{"w":60,"r":10},{"w":65,"r":8},{"w":65,"r":8}]}
  ]'::jsonb),
  ('11111111-1111-1111-1111-111111111111', 'Leg Day A', 'quads, glutes, hamstrings', 2, '[
    {"id":"e1","name":"Back Squat","sets":[{"w":185,"r":8},{"w":225,"r":6},{"w":255,"r":5},{"w":275,"r":3}]},
    {"id":"e2","name":"Romanian Deadlift","sets":[{"w":185,"r":10},{"w":205,"r":8},{"w":205,"r":8}]},
    {"id":"e3","name":"Leg Press","sets":[{"w":360,"r":12},{"w":400,"r":10},{"w":400,"r":10}]},
    {"id":"e4","name":"Standing Calf Raise","sets":[{"w":180,"r":15},{"w":180,"r":15},{"w":180,"r":12}]}
  ]'::jsonb),
  ('11111111-1111-1111-1111-111111111111', 'Upper B', 'full upper, pump work', 3, '[
    {"id":"e1","name":"Incline Bench Press","sets":[{"w":115,"r":10},{"w":135,"r":8},{"w":145,"r":8}]},
    {"id":"e2","name":"Lat Pulldown","sets":[{"w":130,"r":12},{"w":145,"r":10},{"w":145,"r":10}]},
    {"id":"e3","name":"DB Lateral Raise","sets":[{"w":20,"r":15},{"w":20,"r":15},{"w":25,"r":12}]},
    {"id":"e4","name":"Hammer Curl","sets":[{"w":35,"r":12},{"w":35,"r":12}]}
  ]'::jsonb);
