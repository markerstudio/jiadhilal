/* Login / welcome screen — coaching app */
function LoginScreen({ onLogin }) {
  const { Button, Input } = window.JiadHilalDesignSystem_e787fe;
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--grad-ink)', color: 'var(--white)',
      padding: '64px 26px 30px', boxSizing: 'border-box',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <img src="../../assets/logo-mark-white.png" alt="Jiad Hilal" style={{ width: 64, marginBottom: 28 }} />
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 44, lineHeight: 0.96, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
          No<br/>excuses.
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--purple-300)', marginTop: 16 }}>
          Let's get to work
        </div>
        <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="" placeholder="Email" iconLeft={<Icon name="mail" size={18} />} style={{ '--x': 0 }} />
          <Input label="" placeholder="Password" type="password" iconLeft={<Icon name="lock" size={18} />} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Button variant="primary" size="lg" fullWidth onClick={onLogin}>Log in &amp; train</Button>
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)' }}>
          New here? <span style={{ color: 'var(--purple-300)', fontWeight: 700 }}>Start your plan</span>
        </div>
      </div>
    </div>
  );
}
window.LoginScreen = LoginScreen;
