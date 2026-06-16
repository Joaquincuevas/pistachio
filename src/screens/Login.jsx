import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, Button, Field, Icon } from '../ui';
import { useApp } from '../store';
import { PISTA_FACT } from '../data';

export function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState(false);

  const valid = /@(uandes|miuandes)\.cl\s*$/.test(email.trim());
  const error = touched && email && !valid ? 'Usa tu correo institucional @uandes.cl' : '';

  const inputStyle = (ok) => ({
    width: '100%', height: 48, borderRadius: 'var(--r-md)', padding: '0 14px 0 42px',
    border: `1.5px solid ${ok ? 'var(--olive)' : 'var(--border-strong)'}`, background: 'var(--surface)',
    outline: 'none', fontSize: 15,
  });

  function submit(e) {
    e.preventDefault();
    setTouched(true);
    if (!email) { setEmail('estudiante@uandes.cl'); login('estudiante@uandes.cl'); navigate('/'); return; }
    if (!valid) return;
    login(email.trim());
    navigate('/');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Brand panel */}
      <div style={{
        flex: '1 1 45%', background: 'var(--olive)', color: '#fff', padding: '56px 60px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <Logo size={36} light />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="serif" style={{ fontSize: 52, lineHeight: 1.04, marginBottom: 20 }}>
            Tu malla curricular,<br />con claridad.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: 420 }}>
            Planifica tu carrera de Ingeniería Civil en la Universidad de los Andes. Visualiza ramos,
            prerrequisitos y avance en una sola vista.
          </p>
        </div>
        <p style={{ position: 'relative', zIndex: 1, fontSize: 13.5, fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', maxWidth: 440, lineHeight: 1.55 }}>
          "{PISTA_FACT}"
        </p>
      </div>

      {/* Form */}
      <div style={{ flex: '1 1 55%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: 'var(--bg)' }}>
        <form onSubmit={submit} className="fade-up" style={{ width: '100%', maxWidth: 380 }}>
          <h2 className="serif" style={{ fontSize: 32, marginBottom: 6 }}>Inicia sesión</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 30 }}>Accede con tu cuenta U. Andes para continuar.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Field label="Correo institucional" icon="mail" error={error}>
              <input type="email" value={email} autoComplete="email" spellCheck={false}
                onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(true)}
                placeholder="tu.nombre@uandes.cl" style={inputStyle(valid)} />
              {valid && (
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 22, height: 22, borderRadius: 99, background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={13} color="#fff" strokeWidth={2.6} />
                </span>
              )}
            </Field>

            <Field label="Contraseña" icon="lock">
              <input type={show ? 'text' : 'password'} value={pass} autoComplete="current-password"
                onChange={e => setPass(e.target.value)} placeholder="••••••••" style={{ ...inputStyle(false), paddingRight: 44 }} />
              <button type="button" onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 6, opacity: show ? 1 : 0.5 }}>
                <Icon name="eye" size={19} color="var(--faint)" />
              </button>
            </Field>

            <div style={{ textAlign: 'right', marginTop: -6 }}>
              <button type="button" style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>¿Olvidaste tu clave?</button>
            </div>

            <Button type="submit" size="lg" full>Inicia sesión</Button>

            <p style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
              ¿No tienes cuenta?{' '}
              <button type="submit" style={{ background: 'none', border: 'none', fontWeight: 700, color: 'var(--olive)' }}>Regístrate</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
