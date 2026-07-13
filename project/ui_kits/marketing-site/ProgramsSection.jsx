/* Programs grid — marketing site */
function ProgramsSection() {
  const { Card, Badge, Tag } = window.JiadHilalDesignSystem_e787fe;
  const programs = [
    { name: 'Hypertrophy', tag: 'Build muscle', wk: '12 weeks', lv: '4 days / week', icon: 'dumbbell', featured: true },
    { name: 'Strength', tag: 'Get stronger', wk: '8 weeks', lv: '3 days / week', icon: 'trending-up' },
    { name: 'Shred', tag: 'Lose fat', wk: '10 weeks', lv: '5 days / week', icon: 'flame' },
  ];
  return (
    <section style={{ background: 'var(--surface-page)', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--purple-500)' }}>Choose your path</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '10px 0 0', color: 'var(--text-primary)' }}>
          Programs that fit your goal
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 40 }}>
          {programs.map((p, i) => (
            <Card key={i} variant={p.featured ? 'brand' : 'surface'} interactive padding="26px">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Icon name={p.icon} size={30} color={p.featured ? 'rgba(255,255,255,0.9)' : 'var(--purple-500)'} />
                {p.featured && <Badge tone="green" variant="solid">Most popular</Badge>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 18, color: p.featured ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)' }}>{p.tag}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 30, textTransform: 'uppercase', letterSpacing: '-0.02em', marginTop: 2, color: p.featured ? '#fff' : 'var(--text-primary)' }}>{p.name}</div>
              <div style={{ display: 'flex', gap: 18, marginTop: 16, fontSize: 13.5, fontWeight: 600, color: p.featured ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="calendar" size={15} color="currentColor" />{p.wk}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="repeat" size={15} color="currentColor" />{p.lv}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProgramsSection = ProgramsSection;
