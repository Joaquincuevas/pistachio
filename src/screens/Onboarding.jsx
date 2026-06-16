import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, Button, Icon } from '../ui';
import { useApp } from '../store';
import { especialidades } from '../data';

export function Onboarding() {
  const { setEspecialidad } = useApp();
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  function confirm() {
    if (!sel) return;
    setEspecialidad(sel);
    navigate('/malla');
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 40px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <Logo size={30} />
      </div>

      <div className="fade-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 880 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--olive)', textTransform: 'uppercase', letterSpacing: 1.5 }}>Configuración inicial</span>
            <h1 className="serif" style={{ fontSize: 42, margin: '12px 0 8px' }}>Elige tu especialidad</h1>
            <p style={{ fontSize: 15, color: 'var(--muted)' }}>Determina tu malla de los semestres 5 al 8. Podrás cambiarla cuando quieras.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
            {especialidades.map(e => {
              const on = sel === e.id;
              return (
                <button key={e.id} onClick={() => setSel(e.id)} style={{
                  position: 'relative', textAlign: 'left', padding: 22, borderRadius: 'var(--r-lg)',
                  background: 'var(--surface)', border: `2px solid ${on ? 'var(--olive)' : 'var(--border)'}`,
                  boxShadow: on ? '0 8px 24px rgba(74,124,89,0.16)' : 'var(--shadow-sm)',
                  transform: on ? 'translateY(-2px)' : 'none', transition: 'all .2s',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 'var(--r-md)', fontSize: 26,
                    background: on ? 'var(--olive-light)' : 'var(--surface-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, transition: 'background .2s',
                  }}>{e.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{e.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{e.blurb}</div>
                  {on && (
                    <span style={{ position: 'absolute', top: 18, right: 18, width: 24, height: 24, borderRadius: 99, background: 'var(--olive)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="check" size={14} color="#fff" strokeWidth={2.8} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="lg" onClick={confirm} disabled={!sel} style={{ minWidth: 240 }}>
              Continuar <Icon name="chevron" size={18} color="#fff" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
