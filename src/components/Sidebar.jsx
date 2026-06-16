import { NavLink } from 'react-router-dom';
import { Logo, Icon } from '../ui';
import { useApp } from '../store';

const NAV = [
  { to: '/malla',    icon: 'grid',   label: 'Malla curricular' },
  { to: '/progreso', icon: 'chart',  label: 'Mi progreso' },
  { to: '/buscar',   icon: 'search', label: 'Buscar ramos' },
  { to: '/perfil',   icon: 'user',   label: 'Perfil' },
];

export function Sidebar() {
  const { especialidad, malla, progress } = useApp();
  const total = malla.length;
  const done = malla.filter(r => progress[r.code] === 'done').length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <aside style={{
      width: 'var(--sidebar-w)', flexShrink: 0, background: 'var(--surface)',
      borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0,
    }}>
      <div style={{ padding: '22px 22px 18px' }}>
        <Logo size={32} />
      </div>

      <nav style={{ padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
            borderRadius: 'var(--r-md)', fontWeight: 600, fontSize: 14,
            color: isActive ? 'var(--olive)' : 'var(--muted)',
            background: isActive ? 'var(--olive-light)' : 'transparent',
            transition: 'background .15s, color .15s',
          })}>
            <Icon name={item.icon} size={19} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: 16 }}>
        {especialidad && (
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)', padding: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{especialidad.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 13.5 }}>{especialidad.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
              <span>Avance</span>
              <span style={{ fontWeight: 700, color: 'var(--olive)' }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--olive)', borderRadius: 99, transition: 'width .5s' }} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
