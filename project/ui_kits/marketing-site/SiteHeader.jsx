/* Sticky glass site header — marketing site */
function SiteHeader() {
  const { Button } = window.JiadHilalDesignSystem_e787fe;
  const links = ['Programs', 'Coaching', 'Results', 'About'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(20,17,24,0.72)', backdropFilter: 'var(--blur-glass)', WebkitBackdropFilter: 'var(--blur-glass)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="../../assets/logo-mark-white.png" alt="Jiad Hilal" style={{ height: 30 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 18, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Jiad Hilal</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {links.map(l => (
            <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontSize: 14.5, fontWeight: 600 }}>{l}</a>
          ))}
        </nav>
        <Button variant="primary" size="sm">Start your plan</Button>
      </div>
    </header>
  );
}
window.SiteHeader = SiteHeader;
