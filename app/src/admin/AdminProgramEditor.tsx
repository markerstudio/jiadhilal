import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Icon } from '../components/Icon';
import { PageTitle, Loading, DarkField, EmptyState } from '../components/ui';
import { ExercisePicker } from '../components/ExercisePicker';
import { exerciseDemoUrl } from '../lib/exerciseLibrary';
import { store } from '../lib/store';
import { useAsync } from '../lib/useAsync';
import type { Program, Workout, ExerciseSpec } from '../lib/types';

const setInput: React.CSSProperties = {
  width: 46,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'var(--white)',
  fontFamily: 'var(--font-mono)',
  fontSize: 13.5,
  fontWeight: 700,
  padding: 0,
  textAlign: 'center',
};

/* Program builder — edit workouts, exercises and set prescriptions; save or delete. */
export function AdminProgramEditor() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = React.useState<Program | null>(null);
  const [saving, setSaving] = React.useState(false);

  const { value: original, loading } = useAsync(() => store.getProgram(programId!), [programId]);
  React.useEffect(() => {
    if (original && !draft) setDraft(structuredClone(original));
  }, [original, draft]);

  if (loading) return <Loading />;
  if (!original || !draft) return <EmptyState title="Program not found" />;

  const patch = (p: Partial<Program>) => setDraft((d) => ({ ...d!, ...p }));
  const patchWorkout = (wi: number, p: Partial<Workout>) =>
    patch({ workouts: draft.workouts.map((w, i) => (i === wi ? { ...w, ...p } : w)) });
  const patchExercise = (wi: number, ei: number, p: Partial<ExerciseSpec>) =>
    patchWorkout(wi, {
      exercises: draft.workouts[wi].exercises.map((e, i) => (i === ei ? { ...e, ...p } : e)),
    });

  const addWorkout = () =>
    patch({
      workouts: [
        ...draft.workouts,
        { id: crypto.randomUUID(), name: `Workout ${String.fromCharCode(65 + draft.workouts.length)}`, subtitle: '', order: draft.workouts.length, exercises: [] },
      ],
    });

  const addExercise = (wi: number) =>
    patchWorkout(wi, {
      exercises: [
        ...draft.workouts[wi].exercises,
        { id: crypto.randomUUID(), name: '', sets: [{ w: 20, r: 10 }, { w: 20, r: 10 }, { w: 20, r: 10 }] },
      ],
    });

  const save = async () => {
    setSaving(true);
    await store.saveProgram({
      ...draft,
      workouts: draft.workouts.map((w, i) => ({ ...w, order: i })),
    });
    navigate('/admin/programs');
  };

  const remove = async () => {
    if (!confirm(`Delete "${draft.name}"? Clients assigned to it will lose their program.`)) return;
    await store.deleteProgram(draft.id);
    navigate('/admin/programs');
  };

  return (
    <div style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <IconButton aria-label="Back" variant="ghost" onClick={() => navigate('/admin/programs')} style={{ color: 'var(--white)' }}>
          <Icon name="chevron-left" size={22} />
        </IconButton>
        <div style={{ flex: 1, minWidth: 200 }}>
          <PageTitle kicker="Program builder">{draft.name}</PageTitle>
        </div>
        <Button variant="ghost" size="sm" style={{ color: 'var(--red-neon)' }} iconLeft={<Icon name="trash" size={15} />} onClick={() => void remove()}>
          Delete
        </Button>
        <Button variant="primary" size="md" disabled={saving} iconLeft={<Icon name="check" size={17} />} onClick={() => void save()}>
          {saving ? 'Saving…' : 'Save program'}
        </Button>
      </div>

      {/* meta */}
      <Card variant="dark" padding="16px">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <DarkField label="Name" value={draft.name} onChange={(v) => patch({ name: v })} />
          <DarkField
            label="Days per week"
            type="number"
            value={draft.daysPerWeek}
            onChange={(v) => patch({ daysPerWeek: Math.max(1, Math.min(7, Number(v) || 1)) })}
            mono
          />
          <DarkField label="Description" value={draft.description} onChange={(v) => patch({ description: v })} style={{ gridColumn: '1 / -1' }} />
        </div>
      </Card>

      {/* workouts */}
      {draft.workouts.map((w, wi) => (
        <Card key={w.id} variant="dark" padding="16px">
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <DarkField label={`Workout ${wi + 1}`} value={w.name} onChange={(v) => patchWorkout(wi, { name: v })} style={{ flex: 2, minWidth: 170 }} />
            <DarkField label="Focus" value={w.subtitle} onChange={(v) => patchWorkout(wi, { subtitle: v })} placeholder="chest, shoulders, triceps" style={{ flex: 3, minWidth: 200 }} />
            <IconButton
              aria-label="Delete workout"
              variant="ghost"
              style={{ color: 'var(--gray-500)' }}
              onClick={() => patch({ workouts: draft.workouts.filter((_, i) => i !== wi) })}
            >
              <Icon name="trash" size={17} />
            </IconButton>
          </div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {w.exercises.map((ex, ei) => (
              <div key={ex.id} style={{ background: 'var(--ink-800)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ExercisePicker
                    value={ex.name}
                    autoFocus={ex.name === ''}
                    onChange={(name) => patchExercise(wi, ei, { name })}
                  />
                  {ex.name && (
                    <a
                      href={exerciseDemoUrl(ex.name)}
                      target="_blank"
                      rel="noreferrer"
                      title="Watch demo"
                      style={{ display: 'inline-flex', color: 'var(--gray-500)' }}
                    >
                      <Icon name="external-link" size={15} />
                    </a>
                  )}
                  <IconButton
                    aria-label="Delete exercise"
                    variant="ghost"
                    size="sm"
                    style={{ color: 'var(--gray-500)' }}
                    onClick={() => patchWorkout(wi, { exercises: w.exercises.filter((_, i) => i !== ei) })}
                  >
                    <Icon name="x" size={15} />
                  </IconButton>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {ex.sets.map((s, si) => (
                    <span
                      key={si}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 2,
                        background: 'var(--ink-900)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '5px 7px',
                      }}
                    >
                      <input
                        type="number"
                        value={s.w}
                        onChange={(e) =>
                          patchExercise(wi, ei, { sets: ex.sets.map((x, i) => (i === si ? { ...x, w: Number(e.target.value) || 0 } : x)) })
                        }
                        style={setInput}
                        aria-label="Weight"
                      />
                      <span style={{ color: 'var(--gray-500)', fontSize: 12 }}>×</span>
                      <input
                        type="number"
                        value={s.r}
                        onChange={(e) =>
                          patchExercise(wi, ei, { sets: ex.sets.map((x, i) => (i === si ? { ...x, r: Number(e.target.value) || 0 } : x)) })
                        }
                        style={{ ...setInput, width: 34 }}
                        aria-label="Reps"
                      />
                      <button
                        onClick={() => patchExercise(wi, ei, { sets: ex.sets.filter((_, i) => i !== si) })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-600)', padding: '0 0 0 4px', display: 'inline-flex' }}
                        aria-label="Remove set"
                      >
                        <Icon name="x" size={12} />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => patchExercise(wi, ei, { sets: [...ex.sets, ex.sets.at(-1) ?? { w: 20, r: 10 }] })}
                    style={{
                      background: 'none',
                      border: '1px dashed var(--ink-700)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--purple-300)',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '6px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    + set
                  </button>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-600)', letterSpacing: '0.04em' }}>kg × reps</span>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" style={{ alignSelf: 'flex-start', color: 'var(--purple-300)' }} iconLeft={<Icon name="plus" size={15} />} onClick={() => addExercise(wi)}>
              Add exercise
            </Button>
          </div>
        </Card>
      ))}

      <Button variant="secondary" size="md" style={{ alignSelf: 'flex-start' }} iconLeft={<Icon name="plus" size={17} />} onClick={addWorkout}>
        Add workout
      </Button>
    </div>
  );
}
