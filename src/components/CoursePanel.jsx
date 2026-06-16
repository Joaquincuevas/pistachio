import { useEffect, useState } from 'react';
import { Icon, Button } from '../ui';
import { STATUS_META } from '../data';
import { useApp } from '../store';

export function CoursePanel({ course, onClose, onNavigate }) {
  const { malla, progress, setStatus } = useApp();
  const [openUnit, setOpenUnit] = useState(0);

  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!course) return null;
  const status = progress[course.code] || 'pending';
  const prereqs = (course.prereqs || []).map(c => malla.find(x => x.code === c)).filter(Boolean);
  const unlocks = malla.filter(r => (r.prereqs || []).includes(course.code));

  const meta = (k, v) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>{k}</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: 'right' }}>{v}</span>
    </div>
  );

  return (
    <>
      <div onClick={onClose} className="fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(20,28,22,0.4)', zIndex: 900 }} />
      <div className="fade-in" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 460, maxWidth: '92vw', zIndex: 901,
        background: 'var(--surface)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column',
        animation: 'slideIn .3s cubic-bezier(.2,.7,.3,1) both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{course.code}</span>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 99, border: 'none', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="close" size={18} color="var(--muted)" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <h2 className="serif" style={{ fontSize: 32, lineHeight: 1.05, marginBottom: 8 }}>{course.name}</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
            <span style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{course.area}</span>
            <span style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{course.credits} créditos</span>
          </div>

          {/* status selector */}
          <div style={{ marginBottom: 22 }}>
            <span style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Estado del ramo</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {Object.entries(STATUS_META).map(([key, m]) => {
                const on = status === key;
                return (
                  <button key={key} onClick={() => setStatus(course.code, key)} style={{
                    flex: 1, padding: '9px 6px', borderRadius: 'var(--r-md)', fontSize: 12.5, fontWeight: 600,
                    border: `1.5px solid ${on ? m.dot : 'var(--border)'}`,
                    background: on ? m.bg : 'var(--surface)', color: on ? m.color : 'var(--muted)',
                    transition: 'all .15s',
                  }}>{m.label}</button>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--r-md)', padding: '2px 16px', marginBottom: 24 }}>
            {meta('Semestre', course.sem)}
            {meta('Profesor', course.prof)}
            {meta('Créditos', course.credits)}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0' }}>
              <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>Prerrequisitos</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: 'right' }}>{prereqs.length ? prereqs.map(p => p.code).join(', ') : 'Ninguno'}</span>
            </div>
          </div>

          {prereqs.length > 0 && (
            <Section title="Requiere">
              {prereqs.map(p => <RelRow key={p.code} c={p} onClick={() => onNavigate(p)} status={progress[p.code]} />)}
            </Section>
          )}
          {unlocks.length > 0 && (
            <Section title="Habilita">
              {unlocks.map(u => <RelRow key={u.code} c={u} onClick={() => onNavigate(u)} status={progress[u.code]} />)}
            </Section>
          )}

          <Section title="Descripción">
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)' }}>{course.description}</p>
          </Section>

          <Section title="Objetivos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {course.objectives.map((o, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 18, height: 18, borderRadius: 99, background: 'var(--olive-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon name="check" size={11} color="var(--olive)" strokeWidth={2.6} />
                  </span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>{o}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Contenidos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {course.units.map((u, i) => {
                const open = openUnit === i;
                return (
                  <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                    <button onClick={() => setOpenUnit(open ? -1 : i)} style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 14px', background: 'var(--surface)', border: 'none', fontWeight: 600, fontSize: 13.5, textAlign: 'left',
                    }}>
                      {u.t}
                      <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'flex' }}>
                        <Icon name="chevDown" size={16} color="var(--faint)" />
                      </span>
                    </button>
                    <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height .28s ease' }}>
                      <div style={{ padding: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {u.items.map((it, j) => (
                          <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--muted)' }}>
                            <span style={{ width: 4, height: 4, borderRadius: 9, background: 'var(--olive)', flexShrink: 0 }} />{it}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          <div style={{ marginTop: 24 }}>
            <Button variant="secondary" full><Icon name="book" size={17} /> Ver recursos del ramo</Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 10 }}>{title}</h3>
      {children}
    </div>
  );
}

function RelRow({ c, onClick, status }) {
  const m = STATUS_META[status] || STATUS_META.pending;
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', marginBottom: 6,
      background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', textAlign: 'left',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 99, background: m.dot, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{c.name}</span>
      <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11.5, color: 'var(--faint)' }}>{c.code}</span>
      <Icon name="chevron" size={15} color="var(--faint)" />
    </button>
  );
}
