/* Hero — marketing site */
function Hero() {
  const { Button, Badge, StatTile } = window.JiadHilalDesignSystem_e787fe;
  return (
    <section style={{ position: 'relative', background: 'var(--grad-brand)', overflow: 'hidden' }}>
      {/* watermark mark */}
      <img src="../../assets/logo-mark-white.png" alt="" aria-hidden="true"
        style={{ position: 'absolute', right: -80, top: -40, width: 520, opacity: 0.08, transform: 'rotate(-8deg)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px 88px', position: 'relative' }}>
        <Badge tone="dark" variant="solid" style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}>Personal Trainer &amp; Athlete</Badge>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900,
          fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.92, color: '#fff',
          textTransform: 'uppercase', letterSpacing: '-0.03em', margin: '22px 0 0', maxWidth: 14 + 'ch',
        }}>
          Build the body you train for
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.55, color: 'rgba(255,255,255,0.88)', maxWidth: '46ch', margin: '22px 0 0' }}>
          Coaching built around progressive overload, honest tracking, and the days you don't feel like
          showing up. Train with intent. Recover with discipline.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
          <Button variant="neon" size="lg" iconRight={<Icon name="arrow-right" size={20} />}>Start your plan</Button>
          <Button variant="secondary" size="lg" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>Watch a session</Button>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 56, maxWidth: 560 }}>
          <StatTile dark value="500+" label="Clients coached" style={{ flex: 1, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: 'none' }} />
          <StatTile dark value="4.9" label="Avg rating" style={{ flex: 1, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: 'none' }} />
          <StatTile dark value="12yr" label="Coaching" style={{ flex: 1, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: 'none' }} />
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
