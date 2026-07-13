/* Results / testimonial — marketing site (dark) */
function ResultsSection() {
  const { StatTile, Avatar, Card } = window.JiadHilalDesignSystem_e787fe;
  return (
    <section style={{ background: 'var(--surface-dark)', color: '#fff', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--purple-300)' }}>The receipts</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '10px 0 0' }}>
              Results, not hype
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40 }}>
          <StatTile dark value="500+" label="Clients coached" delta="Since 2014" deltaTone="neutral" />
          <StatTile dark value="92%" label="Stick past 12 wks" delta="+industry avg" />
          <StatTile dark value="18k" unit="lb" label="Avg PR added" delta="per client / yr" deltaTone="neutral" />
          <StatTile dark value="4.9" label="App store rating" delta="2.1k reviews" deltaTone="neutral" />
        </div>

        <Card variant="dark" padding="32px" style={{ marginTop: 24, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar name="Maya Chen" size={64} ring />
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
              "Jiad didn't just hand me a program — he changed how I think about training.
              Down 22 lbs, benching more than ever, and I actually look forward to the gym now."
            </p>
            <div style={{ marginTop: 16, fontSize: 14, color: 'var(--gray-400)', fontWeight: 600 }}>Maya Chen · 6 months coaching</div>
          </div>
        </Card>
      </div>
    </section>
  );
}
window.ResultsSection = ResultsSection;
