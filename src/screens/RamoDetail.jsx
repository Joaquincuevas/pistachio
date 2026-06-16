import { useState } from 'react';
import { Icon, StatusBadge, Button } from '../ui';

export function RamoDetail({ r, malla }) {
  const [openUnit, setOpenUnit] = useState(-1);
  if (!r) return null;

  const prereqNames = (r.prereqs || []).map(c => (malla.find(x => x.code === c) || {}).name || c);

  const metaRow = (k, v) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '0.5px solid #EFEFEF' }}>
      <span style={{ fontFamily: 'Inter, system-ui', fontSize: 14.5, color: '#8A8A8A' }}>{k}</span>
      <span style={{ fontFamily: 'Inter, system-ui', fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', textAlign: 'right', maxWidth: 200 }}>{v}</span>
    </div>
  );
  const h3 = (t) => (
    <h3 style={{ fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 16, color: 'var(--ink)', margin: '26px 0 10px' }}>{t}</h3>
  );

  return (
    <div style={{ padding: '4px 24px 36px' }}>
      <div style={{ marginBottom: 4 }}><StatusBadge status={r.status} /></div>
      <h1 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 36, lineHeight: 1.04, color: 'var(--ink)', margin: '10px 0 6px', letterSpacing: -0.3 }}>
        {r.name}
      </h1>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13.5, color: '#9A9A9A' }}>
        {r.code} · {r.credits} créditos
      </div>

      <div style={{ marginTop: 18, background: '#FAFAF8', borderRadius: 16, padding: '4px 16px' }}>
        {metaRow('Semestre', r.sem)}
        {metaRow('Área', r.area)}
        {metaRow('Profesor', r.prof)}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '13px 0' }}>
          <span style={{ fontFamily: 'Inter, system-ui', fontSize: 14.5, color: '#8A8A8A' }}>Prerrequisitos</span>
          <span style={{ fontFamily: 'Inter, system-ui', fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', textAlign: 'right', maxWidth: 210 }}>
            {prereqNames.length ? prereqNames.join(', ') : 'Ninguno'}
          </span>
        </div>
      </div>

      {h3('Descripción')}
      <p style={{ fontFamily: 'Inter, system-ui', fontSize: 15, lineHeight: 1.6, color: '#4A4A4A', margin: 0 }}>
        {r.description}
      </p>

      {h3('Objetivos')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {r.objectives.map((o, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ width: 20, height: 20, borderRadius: 99, background: '#EAF1EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <Icon name="check" size={12} color="var(--olive)" strokeWidth={2.6} />
            </span>
            <span style={{ fontFamily: 'Inter, system-ui', fontSize: 14.5, lineHeight: 1.5, color: '#4A4A4A' }}>{o}</span>
          </div>
        ))}
      </div>

      {h3('Contenidos')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {r.units.map((u, i) => {
          const isOpen = openUnit === i;
          return (
            <div key={i} style={{ border: '1px solid #ECECEC', borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => setOpenUnit(isOpen ? -1 : i)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 14px', background: '#fff', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, system-ui', fontWeight: 600, fontSize: 14.5, color: 'var(--ink)', textAlign: 'left',
              }}>
                {u.t}
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'flex' }}>
                  <Icon name="chevDown" size={18} color="#9A9A9A" />
                </span>
              </button>
              <div style={{ maxHeight: isOpen ? 200 : 0, overflow: 'hidden', transition: 'max-height .28s ease' }}>
                <div style={{ padding: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {u.items.map((it, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'Inter, system-ui', fontSize: 13.5, color: '#6A6A6A' }}>
                      <span style={{ width: 4, height: 4, borderRadius: 9, background: 'var(--olive)', flexShrink: 0 }} />{it}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <Button variant="olivesoft">
          <Icon name="book" size={18} color="var(--olive)" /> Ver más recursos
        </Button>
      </div>
    </div>
  );
}
