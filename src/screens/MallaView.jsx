import { useState, useMemo } from 'react';
import { Topbar } from '../components/Topbar';
import { CoursePanel } from '../components/CoursePanel';
import { Icon } from '../ui';
import { useApp } from '../store';
import { STATUS_META } from '../data';

export function MallaView() {
  const { malla, progress, especialidad } = useApp();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const byCode = useMemo(() => Object.fromEntries(malla.map(r => [r.code, r])), [malla]);

  const groups = useMemo(() => {
    const map = {};
    malla.forEach(r => { (map[r.sem] = map[r.sem] || []).push(r); });
    return Object.keys(map).map(Number).sort((a, b) => a - b).map(sem => ({ sem, ramos: map[sem] }));
  }, [malla]);

  // related set: hovered course + all ancestors (prereqs) + all descendants (unlocks)
  const related = useMemo(() => {
    if (!hovered) return null;
    const set = new Set([hovered]);
    const up = (code) => (byCode[code]?.prereqs || []).forEach(p => { if (!set.has(p)) { set.add(p); up(p); } });
    const down = (code) => malla.filter(r => (r.prereqs || []).includes(code)).forEach(r => { if (!set.has(r.code)) { set.add(r.code); down(r.code); } });
    up(hovered); down(hovered);
    return set;
  }, [hovered, byCode, malla]);

  const totalCr = malla.reduce((s, r) => s + r.credits, 0);
  const doneCr = malla.filter(r => progress[r.code] === 'done').reduce((s, r) => s + r.credits, 0);

  return (
    <>
      <Topbar
        title="Malla curricular"
        subtitle={`${especialidad?.name} · ${malla.length} ramos · ${doneCr}/${totalCr} créditos aprobados`}
        actions={<Legend />}
      />

      <div style={{ padding: 24, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="info" size={15} color="var(--faint)" />
          Pasa el cursor sobre un ramo para ver su cadena de prerrequisitos. Haz clic para ver el detalle y cambiar su estado.
        </div>

        <div style={{ flex: 1, overflowX: 'auto', overflowY: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'flex', gap: 16, minWidth: 'min-content', alignItems: 'flex-start' }}>
            {groups.map(g => {
              const cr = g.ramos.reduce((s, r) => s + r.credits, 0);
              return (
                <div key={g.sem} style={{ width: 220, flexShrink: 0 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 4px 12px', position: 'sticky', top: 0,
                  }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>Semestre {g.sem}</span>
                    <span style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 600 }}>{cr} cr</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {g.ramos.map(r => (
                      <CourseCell
                        key={r.code} course={r} status={progress[r.code] || 'pending'}
                        dim={related && !related.has(r.code)}
                        focus={hovered === r.code}
                        onHover={() => setHovered(r.code)}
                        onLeave={() => setHovered(null)}
                        onClick={() => setSelected(r)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selected && (
        <CoursePanel course={selected} onClose={() => setSelected(null)} onNavigate={setSelected} />
      )}
    </>
  );
}

function CourseCell({ course, status, dim, focus, onHover, onLeave, onClick }) {
  const m = STATUS_META[status];
  return (
    <button
      onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}
      style={{
        textAlign: 'left', padding: '12px 13px', borderRadius: 'var(--r-md)',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderLeft: `4px solid ${m.dot}`, boxShadow: focus ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        opacity: dim ? 0.32 : 1, transform: focus ? 'translateY(-2px)' : 'none',
        transition: 'opacity .18s, transform .18s, box-shadow .18s', cursor: 'pointer', width: '100%',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--faint)', fontWeight: 600 }}>{course.code}</span>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: m.dot }} />
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3, marginBottom: 8, color: 'var(--ink)' }}>{course.name}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{course.credits} créditos</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: m.color }}>{m.label}</span>
      </div>
    </button>
  );
}

function Legend() {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      {Object.values(STATUS_META).map(m => (
        <span key={m.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: m.dot }} />{m.label}
        </span>
      ))}
    </div>
  );
}
