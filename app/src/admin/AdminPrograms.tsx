import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { PageTitle, Loading, EmptyState } from '../components/ui';
import { store } from '../lib/store';
import { useAsync } from '../lib/useAsync';

/* Programs — every training program, plus create-new. */
export function AdminPrograms() {
  const navigate = useNavigate();
  const { value, loading } = useAsync(async () => {
    const [programs, clients] = await Promise.all([store.listPrograms(), store.listClients()]);
    const assignments = await Promise.all(clients.map((c) => store.getAssignment(c.id)));
    return { programs, assignments };
  }, []);

  if (loading || !value) return <Loading />;
  const { programs, assignments } = value;

  const createProgram = async () => {
    const id = crypto.randomUUID();
    await store.saveProgram({
      id,
      name: 'New program',
      description: '',
      daysPerWeek: 4,
      workouts: [],
    });
    navigate(`/admin/programs/${id}`);
  };

  return (
    <div style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <PageTitle kicker={`${programs.length} total`}>Programs</PageTitle>
        <Button variant="primary" size="md" iconLeft={<Icon name="plus" size={17} />} onClick={() => void createProgram()}>
          New program
        </Button>
      </div>

      {programs.length === 0 && (
        <Card variant="dark" padding="20px">
          <EmptyState title="No programs yet" hint="Create your first training program and assign it to clients." />
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12 }}>
        {programs.map((p) => {
          const assignedCount = assignments.filter((a) => a?.programId === p.id).length;
          return (
            <Link key={p.id} to={`/admin/programs/${p.id}`} style={{ textDecoration: 'none' }}>
              <Card variant="dark" interactive padding="18px" style={{ height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 16.5, color: 'var(--white)' }}>{p.name}</div>
                  <Icon name="pencil" size={15} color="var(--gray-500)" />
                </div>
                {p.description && (
                  <div style={{ fontSize: 13, color: 'var(--gray-400)', marginTop: 6, lineHeight: 1.45 }}>{p.description}</div>
                )}
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  <Badge tone="purple" variant="soft" size="sm">
                    {p.daysPerWeek}×/week
                  </Badge>
                  <Badge tone="neutral" variant="soft" size="sm">
                    {p.workouts.length} workouts
                  </Badge>
                  <Badge tone={assignedCount ? 'green' : 'neutral'} variant="soft" size="sm" dot={assignedCount > 0}>
                    {assignedCount} assigned
                  </Badge>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
