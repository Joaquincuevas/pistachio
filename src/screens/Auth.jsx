import { useState } from 'react';
import { PistachioMark, Wordmark, Button, Icon } from '../ui';
import { PISTA_FACT } from '../data';

export function Landing({ onStart, onLogin }) {
  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      padding: '0 24px 30px', boxSizing: 'border-box',
    }}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      }}>
        <PistachioMark size={68} />
        <div style={{ marginTop: 14 }}>
          <Wordmark size={13} />
        </div>
        <h1 style={{
          fontFamily: '"Instrument Serif", serif', fontWeight: 400,
          fontSize: 42, lineHeight: 1.05, color: 'var(--ink)',
          margin: '24px 0 0', letterSpacing: -0.3,
        }}>
          Tu malla curricular<br />al alcance
        </h1>
        <p style={{
          fontFamily: 'Inter, system-ui', fontStyle: 'italic',
          fontSize: 14.5, lineHeight: 1.55, color: '#7A7A7A',
          margin: '18px 0 0', maxWidth: 300,
        }}>
          "{PISTA_FACT}"
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
        <Button onClick={onStart}>Accede ahora</Button>
        <Button variant="secondary" onClick={onLogin}>Ya tengo cuenta</Button>
      </div>
    </div>
  );
}

export function Login({ onBack, onSubmit }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(null);

  const valid = /@uandes\.cl\s*$/.test(email.trim()) || /@miuandes\.cl\s*$/.test(email.trim());

  const field = (key) => ({
    height: 50, borderRadius: 12, padding: '0 14px', boxSizing: 'border-box', width: '100%',
    border: `1.5px solid ${focus === key ? 'var(--olive)' : '#E4E4E4'}`,
    background: '#fff', fontFamily: 'Inter, system-ui', fontSize: 16, color: 'var(--ink)',
    outline: 'none', transition: 'border-color .15s ease, box-shadow .15s ease',
    boxShadow: focus === key ? '0 0 0 4px rgba(74,124,89,0.1)' : 'none',
  });
  const lbl = {
    fontFamily: 'Inter, system-ui', fontSize: 13, fontWeight: 600,
    color: '#5A5A5A', marginBottom: 7, display: 'block',
  };

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '0 24px 24px', boxSizing: 'border-box' }}>
      <div style={{ paddingTop: 64 }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'Inter, system-ui', fontSize: 16, color: 'var(--ink)', fontWeight: 500 }}>
          <Icon name="back" size={22} /> Atrás
        </button>
      </div>

      <div style={{ marginTop: 22 }}>
        <PistachioMark size={48} />
        <h1 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 34, lineHeight: 1.08, color: 'var(--ink)', margin: '20px 0 6px', letterSpacing: -0.3 }}>
          Ingresa con tu email<br />U. Andes
        </h1>
        <p style={{ fontFamily: 'Inter, system-ui', fontSize: 14.5, color: '#8A8A8A' }}>
          Usa tu correo institucional para continuar.
        </p>
      </div>

      <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={lbl}>Correo institucional</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email" inputMode="email" autoCapitalize="none" spellCheck={false}
              placeholder="tu.nombre@uandes.cl" value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocus('email')} onBlur={() => setFocus(null)}
              style={field('email')}
            />
            {valid && (
              <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 22, height: 22, borderRadius: 99, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="check" size={14} color="#fff" strokeWidth={2.6} />
              </span>
            )}
          </div>
        </div>

        <div>
          <label style={lbl}>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={show ? 'text' : 'password'} placeholder="••••••••" value={pass}
              onChange={e => setPass(e.target.value)}
              onFocus={() => setFocus('pass')} onBlur={() => setFocus(null)}
              style={{ ...field('pass'), paddingRight: 44 }}
            />
            <button onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 6, opacity: show ? 1 : 0.5 }}>
              <Icon name="eye" size={20} color="#8A8A8A" />
            </button>
          </div>
          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, system-ui', fontSize: 13.5, fontWeight: 600, color: 'var(--olive)' }}>
              ¿Olvidaste tu clave?
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button onClick={() => onSubmit(email || 'estudiante@uandes.cl')}>Inicia sesión</Button>
        <div style={{ textAlign: 'center', fontFamily: 'Inter, system-ui', fontSize: 14, color: '#8A8A8A' }}>
          ¿No tienes cuenta?{' '}
          <button onClick={() => onSubmit(email || 'estudiante@uandes.cl')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, system-ui', fontSize: 14, fontWeight: 700, color: 'var(--olive)' }}>
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}
