/* App shell — phone frame, status bar, bottom tab bar, simple routing */
function AppShell() {
  const [authed, setAuthed] = React.useState(false);
  const [tab, setTab] = React.useState('today');
  const [inWorkout, setInWorkout] = React.useState(false);

  const tabs = [
    { id: 'today', icon: 'house', label: 'Today' },
    { id: 'train', icon: 'dumbbell', label: 'Train' },
    { id: 'progress', icon: 'trending-up', label: 'Progress' },
    { id: 'profile', icon: 'user', label: 'Profile' },
  ];

  let screen;
  if (!authed) {
    screen = <LoginScreen onLogin={() => setAuthed(true)} />;
  } else if (inWorkout) {
    screen = <WorkoutScreen onBack={() => setInWorkout(false)} />;
  } else if (tab === 'today' || tab === 'train') {
    screen = <TodayScreen onStartWorkout={() => setInWorkout(true)} />;
  } else if (tab === 'progress') {
    screen = <ProgressScreen />;
  } else {
    screen = <ProfileScreen />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 0%, #2a2140, #0c0a12 70%)', padding: 24, fontFamily: 'var(--font-sans)' }}>
      {/* phone */}
      <div style={{ width: 390, height: 844, borderRadius: 52, background: '#000', padding: 11, boxShadow: '0 40px 90px rgba(0,0,0,0.6), 0 0 0 2px #2a2633', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 42, overflow: 'hidden', position: 'relative', background: 'var(--surface-dark)', display: 'flex', flexDirection: 'column' }}>
          {/* status bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', zIndex: 20, color: 'var(--white)', pointerEvents: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>9:41</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Icon name="signal" size={15} color="#fff" />
              <Icon name="wifi" size={15} color="#fff" />
              <Icon name="battery-full" size={17} color="#fff" />
            </div>
          </div>
          {/* notch */}
          <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 120, height: 30, background: '#000', borderRadius: 18, zIndex: 21 }} />

          {/* scrollable screen */}
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: authed && !inWorkout ? 44 : 0 }}>
            {screen}
          </div>

          {/* bottom tab bar */}
          {authed && !inWorkout && (
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 14px 26px', background: 'rgba(20,17,24,0.9)', backdropFilter: 'var(--blur-glass)', WebkitBackdropFilter: 'var(--blur-glass)', borderTop: '1px solid var(--border-dark)' }}>
              {tabs.map(t => {
                const on = (tab === t.id) || (t.id === 'train' && false);
                return (
                  <button key={t.id} onClick={() => setTab(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 12px', color: on ? 'var(--purple-300)' : 'var(--gray-500)' }}>
                    <Icon name={t.icon} size={22} color={on ? 'var(--purple-300)' : 'var(--gray-500)'} strokeWidth={on ? 2.4 : 2} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.02em' }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
window.AppShell = AppShell;

/* lightweight profile screen kept here to keep the kit compact */
function ProfileScreen() {
  const { Card, Avatar, Switch, Badge, Button } = window.JiadHilalDesignSystem_e787fe;
  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--white)', minHeight: '100%', paddingBottom: 20 }}>
      <div style={{ padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Avatar name="Sam Rivera" ring status="online" size={64} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 24, textTransform: 'uppercase' }}>Sam Rivera</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <Badge tone="purple" variant="solid">Hypertrophy</Badge>
            <Badge tone="green" variant="soft" dot>12-day streak</Badge>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card variant="dark" padding="6px 16px">
          {[['bell', 'Workout reminders', true], ['moon', 'Rest-day notifications', true], ['ruler', 'Metric units', false]].map(([ic, label, def], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: i ? '1px solid var(--border-dark)' : 'none' }}>
              <Icon name={ic} size={18} color="var(--purple-300)" />
              <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600 }}>{label}</span>
              <Switch defaultChecked={def} />
            </div>
          ))}
        </Card>
        <Button variant="secondary" fullWidth>Message your coach</Button>
      </div>
    </div>
  );
}
window.ProfileScreen = ProfileScreen;
