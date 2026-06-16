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
    <div style={{
      display: 'flex', minHeight: '100vh', position: 'relative', overflow: 'hidden',
      // background matched to the video's off-white backdrop (top-left #f3f3f3 → bottom-right #f9f9f9)
      background: 'linear-gradient(135deg, #f2f2f1 0%, #f5f5f4 45%, #f9f9f8 100%)',
    }}>
      {/* faint brand accents, kept away from the character so the video stays seamless */}
      <div style={{ position: 'absolute', top: -160, left: -120, width: 420, height: 420, borderRadius: '50%', background: 'rgba(74,124,89,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -140, left: '32%', width: 320, height: 320, borderRadius: '50%', background: 'rgba(74,124,89,0.04)', pointerEvents: 'none' }} />

      {/* ── Hero / character ── */}
      <div style={{
        flex: '1 1 54%', minWidth: 0, position: 'relative', display: 'flex', flexDirection: 'column',
        padding: '40px 0 0 56px',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Logo size={34} />
          <h1 className="serif" style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1.02, color: 'var(--ink)', margin: '40px 0 18px', maxWidth: 560 }}>
            Tu malla curricular,<br />con <span style={{ color: 'var(--olive)' }}>claridad.</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 460 }}>
            Planifica tu carrera de Ingeniería Civil en la Universidad de los Andes.
            Visualiza ramos, prerrequisitos y avance en una sola vista.
          </p>
        </div>

        {/* video character — blends into the matching background via feathered edges */}
        <div style={{ position: 'relative', flex: 1, minHeight: 280, marginTop: 4, paddingBottom: 44 }}>
          <video
            src="/pistachio-character.mp4"
            poster="/pistachio-character.jpg"
            autoPlay muted loop playsInline preload="auto"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'center center',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 95%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 95%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          />
        </div>

        <p style={{ position: 'absolute', bottom: 22, left: 56, right: 24, zIndex: 2, fontSize: 13, fontStyle: 'italic', color: 'var(--faint)', maxWidth: 480, lineHeight: 1.55 }}>
          "{PISTA_FACT}"
        </p>
      </div>

      {/* ── Form card ── */}
      <div style={{ flex: '1 1 46%', minWidth: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <form onSubmit={submit} className="fade-up" style={{
          width: '100%', maxWidth: 400, background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-lg)', padding: '36px 36px 32px',
        }}>
          <h2 className="serif" style={{ fontSize: 30, marginBottom: 6 }}>Inicia sesión</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>Accede con tu cuenta U. Andes para continuar.</p>

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
