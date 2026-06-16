import { Icon } from '../ui';
import { PISTA_FACT } from '../data';

export function Profile({ esp, malla, email, onClose, onChangeEsp, onLogout }) {
  const totalCr = malla.reduce((s, r) => s + r.credits, 0);
  const doneCr = malla.filter(r => r.status === 'done').reduce((s, r) => s + r.credits, 0);
  const doneN = malla.filter(r => r.status === 'done').length;

  const settingsRow = (icon, label, right, onClick, danger) => (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', background: '#fff', border: 'none', borderBottom: '0.5px solid #F0F0F0', cursor: onClick ? 'pointer' : 'default', textAlign: 'left', WebkitTapHighlightColor: 'transparent' }}>
      <span style={{ width: 30, height: 30, borderRadius: 8, background: danger ? '#FBEAE8' : '#EFEFEF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={18} color={danger ? 'var(--red)' : '#5A5A5A'} />
      </span>
      <span style={{ flex: 1, fontFamily: 'Inter, system-ui', fontSize: 15.5, color: danger ? 'var(--red)' : 'var(--ink)', fontWeight: 500 }}>{label}</span>
      {right && <span style={{ fontFamily: 'Inter, system-ui', fontSize: 14, color: '#9A9A9A' }}>{right}</span>}
      {onClick && !danger && <Icon name="chevron" size={17} color="#CFCFCF" />}
    </button>
  );

  const stat = (n, l) => (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 30, color: 'var(--ink)', lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: 'Inter, system-ui', fontSize: 11.5, color: '#9A9A9A', marginTop: 5, fontWeight: 600 }}>{l}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)' }}>
      <div style={{ padding: '56px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, color: 'var(--ink)' }}>Perfil</span>
        <button onClick={onClose} style={{ width: 38, height: 38, borderRadius: 99, border: 'none', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', WebkitTapHighlightColor: 'transparent' }}>
          <Icon name="close" size={20} />
        </button>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 64, height: 64, borderRadius: 99, background: 'var(--olive)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Instrument Serif", serif', fontSize: 30, color: '#fff', flexShrink: 0 }}>
          {(email[0] || 'A').toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 18, color: 'var(--ink)' }}>Estudiante U. Andes</div>
          <div style={{ fontFamily: 'Inter, system-ui', fontSize: 13.5, color: '#9A9A9A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {email || 'tu.nombre@uandes.cl'}
          </div>
          <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 5, background: '#fff', borderRadius: 99, padding: '3px 9px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 13 }}>{esp.icon}</span>
            <span style={{ fontFamily: 'Inter, system-ui', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{esp.name}</span>
          </div>
        </div>
      </div>

      <div style={{ margin: '20px 20px 0', background: '#fff', borderRadius: 18, padding: '16px 8px', display: 'flex', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        {stat(doneN, 'Ramos cursados')}
        <div style={{ width: 1, background: '#EFEFEF' }} />
        {stat(doneCr, 'Créditos')}
        <div style={{ width: 1, background: '#EFEFEF' }} />
        {stat(`${Math.round(doneCr / totalCr * 100)}%`, 'Avance')}
      </div>

      <div style={{ margin: '24px 20px 0' }}>
        <div style={{ fontFamily: 'Inter, system-ui', fontSize: 12.5, fontWeight: 600, color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, paddingLeft: 4 }}>Cuenta</div>
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
          {settingsRow('swap', 'Cambiar especialidad', esp.name, onChangeEsp)}
          {settingsRow('bell', 'Notificaciones', 'Activadas', () => {})}
          {settingsRow('star', 'Ramos favoritos', '3', () => {})}
          {settingsRow('user', 'Editar perfil', null, () => {})}
        </div>
      </div>

      <div style={{ margin: '20px 20px 0' }}>
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
          {settingsRow('back', 'Cerrar sesión', null, onLogout, true)}
        </div>
      </div>

      {/* Pistacho easter egg */}
      <div style={{ margin: '28px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 26, marginBottom: 8 }}>🥜</div>
        <p style={{ fontFamily: 'Inter, system-ui', fontStyle: 'italic', fontSize: 12.5, lineHeight: 1.55, color: '#B0A88E', margin: 0 }}>
          "{PISTA_FACT}"
        </p>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10.5, color: '#C8C8C8', marginTop: 10, letterSpacing: 1 }}>
          PISTACHIO · v1.0
        </div>
      </div>
    </div>
  );
}
