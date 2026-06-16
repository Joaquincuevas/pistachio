import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../components/Topbar';
import { Card, Button, Icon, Modal } from '../ui';
import { useApp } from '../store';
import { especialidades, PISTA_FACT } from '../data';

export function Profile() {
  const { email, especialidad, malla, progress, setEspecialidad, logout } = useApp();
  const navigate = useNavigate();
  const [changeOpen, setChangeOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const doneN = malla.filter(r => progress[r.code] === 'done').length;
  const doneCr = malla.filter(r => progress[r.code] === 'done').reduce((s, r) => s + r.credits, 0);
  const totalCr = malla.reduce((s, r) => s + r.credits, 0);
  const pct = totalCr ? Math.round((doneCr / totalCr) * 100) : 0;

  function doChange(id) {
    setEspecialidad(id);
    setChangeOpen(false);
    navigate('/malla');
  }
  function doLogout() {
    logout();
    navigate('/login');
  }

  return (
    <>
      <Topbar title="Perfil" subtitle="Tu cuenta y preferencias" />
      <div style={{ padding: 32, maxWidth: 720 }}>
        {/* identity */}
        <Card style={{ padding: 28, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 99, background: 'var(--olive)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="serif" style={{ fontSize: 34 }}>{(email[0] || 'E').toUpperCase()}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Estudiante U. Andes</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 2 }}>{email || 'tu.nombre@uandes.cl'}</p>
            <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--olive-light)', borderRadius: 999, padding: '5px 12px' }}>
              <span style={{ fontSize: 15 }}>{especialidad?.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--olive)' }}>{especialidad?.name}</span>
            </div>
          </div>
        </Card>

        {/* quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
          <Stat n={`${pct}%`} l="Avance" />
          <Stat n={`${doneN}`} l="Ramos aprobados" />
          <Stat n={`${doneCr}`} l="Créditos" />
        </div>

        {/* account */}
        <Card style={{ overflow: 'hidden', marginBottom: 20 }}>
          <Row icon="swap" label="Cambiar especialidad" right={especialidad?.name} onClick={() => setChangeOpen(true)} />
          <Row icon="grid" label="Ver malla curricular" onClick={() => navigate('/malla')} />
          <Row icon="chart" label="Ver mi progreso" onClick={() => navigate('/progreso')} last />
        </Card>

        <Card style={{ overflow: 'hidden', marginBottom: 28 }}>
          <Row icon="logout" label="Cerrar sesión" danger onClick={() => setLogoutOpen(true)} last />
        </Card>

        {/* easter egg */}
        <div style={{ textAlign: 'center', padding: '8px 24px 24px' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🥜</div>
          <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--faint)', maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
            "{PISTA_FACT}"
          </p>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--border-strong)', marginTop: 12, letterSpacing: 1 }}>PISTACHIO · v2.0 · WEB</div>
        </div>
      </div>

      {/* change specialty modal */}
      <Modal open={changeOpen} onClose={() => setChangeOpen(false)} width={520}>
        <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="serif" style={{ fontSize: 24 }}>Cambiar especialidad</h3>
          <button onClick={() => setChangeOpen(false)} style={{ background: 'none', border: 'none' }}><Icon name="close" size={20} color="var(--muted)" /></button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto' }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Al cambiar de especialidad se reiniciará tu progreso de los semestres 5 al 8.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {especialidades.map(e => {
              const on = e.id === especialidad?.id;
              return (
                <button key={e.id} onClick={() => doChange(e.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: 14, textAlign: 'left',
                  borderRadius: 'var(--r-md)', border: `1.5px solid ${on ? 'var(--olive)' : 'var(--border)'}`,
                  background: on ? 'var(--olive-light)' : 'var(--surface)',
                }}>
                  <span style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{e.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{e.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{e.blurb}</div>
                  </div>
                  {on && <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--olive)' }}>Actual</span>}
                </button>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* logout modal */}
      <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)} width={400}>
        <div style={{ padding: 28, textAlign: 'center' }}>
          <h3 className="serif" style={{ fontSize: 24, marginBottom: 8 }}>¿Cerrar sesión?</h3>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Tu progreso queda guardado en este equipo.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="secondary" full onClick={() => setLogoutOpen(false)}>Cancelar</Button>
            <Button variant="danger" full onClick={doLogout}>Cerrar sesión</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Stat({ n, l }) {
  return (
    <Card style={{ padding: '18px 20px', textAlign: 'center' }}>
      <div className="serif" style={{ fontSize: 32, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6, fontWeight: 600 }}>{l}</div>
    </Card>
  );
}

function Row({ icon, label, right, onClick, danger, last }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '15px 20px', textAlign: 'left',
      background: 'var(--surface)', border: 'none', borderBottom: last ? 'none' : '1px solid var(--border)',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}>
      <span style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: danger ? 'var(--red-bg)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={18} color={danger ? 'var(--red)' : 'var(--muted)'} />
      </span>
      <span style={{ flex: 1, fontWeight: 600, fontSize: 14.5, color: danger ? 'var(--red)' : 'var(--ink)' }}>{label}</span>
      {right && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{right}</span>}
      {!danger && <Icon name="chevron" size={17} color="var(--faint)" />}
    </button>
  );
}
