/* CTA band + footer — marketing site */
function CtaFooter() {
  const { Button } = window.JiadHilalDesignSystem_e787fe;
  return (
    <>
      <section style={{ background: 'var(--grad-energy)', padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4.5rem)', textTransform: 'uppercase', letterSpacing: '-0.03em', color: '#fff', margin: 0, lineHeight: 0.95 }}>
          No excuses.<br/>Start today.
        </h2>
        <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 900, fontSize: 22, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.92)', marginTop: 14, textTransform: 'lowercase' }}>let's get to work</div>
        <div style={{ marginTop: 30, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="neon" size="lg" iconRight={<Icon name="arrow-right" size={20} />}>Claim your plan</Button>
          <Button size="lg" style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}>Book a free call</Button>
        </div>
      </section>

      <footer style={{ background: 'var(--ink-950)', color: 'var(--gray-400)', padding: '54px 32px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="../../assets/logo-mark-white.png" alt="Jiad Hilal" style={{ height: 28 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 16, color: '#fff', textTransform: 'uppercase' }}>Jiad Hilal</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 12 }}>Personal Trainer &amp; Athlete</div>
          </div>
          {[['Train', ['Programs', 'Coaching', '1-on-1', 'App']], ['Company', ['About', 'Results', 'Careers', 'Contact']], ['More', ['Instagram', 'YouTube', 'Privacy', 'Terms']]].map(([h, items]) => (
            <div key={h}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 14 }}>{h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(it => <a key={it} href="#" style={{ color: 'var(--gray-400)', textDecoration: 'none', fontSize: 14 }}>{it}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: '36px auto 0', paddingTop: 22, borderTop: '1px solid var(--ink-800)', fontSize: 12.5 }}>
          © 2026 Jiad Hilal™. All rights reserved.
        </div>
      </footer>
    </>
  );
}
window.CtaFooter = CtaFooter;
