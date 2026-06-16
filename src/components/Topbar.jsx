import { useApp } from '../store';

export function Topbar({ title, subtitle, actions }) {
  const { email } = useApp();
  const initial = (email[0] || 'E').toUpperCase();
  return (
    <header style={{
      height: 'var(--topbar-h)', flexShrink: 0, borderBottom: '1px solid var(--border)',
      background: 'rgba(244,246,243,0.8)', backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px',
    }}>
      <div>
        <h1 className="serif" style={{ fontSize: 26, lineHeight: 1.1, color: 'var(--ink)' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 1 }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {actions}
        <div style={{
          width: 38, height: 38, borderRadius: 99, background: 'var(--olive)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15,
          flexShrink: 0,
        }}>{initial}</div>
      </div>
    </header>
  );
}
