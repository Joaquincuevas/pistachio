import { useState } from 'react';
import { Icon } from '../ui';

export function Specialty({ items, onSelect, onBack }) {
  const [sel, setSel] = useState(null);
  const choose = (id) => { setSel(id); setTimeout(() => onSelect(id), 240); };

  return (
    <div style={{ minHeight: '100%', paddingBottom: 30 }}>
      <div style={{ padding: '64px 24px 8px' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0 14px', fontFamily: 'Inter, system-ui', fontSize: 15, color: 'var(--ink)', fontWeight: 500 }}>
          <Icon name="back" size={20} /> Atrás
        </button>
        <h1 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 34, lineHeight: 1.08, color: 'var(--ink)', margin: 0, letterSpacing: -0.3 }}>
          ¿Cuál es tu<br />especialidad?
        </h1>
        <p style={{ fontFamily: 'Inter, system-ui', fontSize: 14.5, color: '#8A8A8A', margin: '8px 0 0' }}>
          Define tu malla. Podrás cambiarla luego.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 24px 0' }}>
        {items.map(it => {
          const on = sel === it.id;
          return (
            <button key={it.id} onClick={() => choose(it.id)} style={{
              position: 'relative', textAlign: 'left', cursor: 'pointer', width: '100%',
              display: 'flex', alignItems: 'center', gap: 14, background: '#fff',
              borderRadius: 16, padding: '14px 16px', minHeight: 80,
              border: `2px solid ${on ? 'var(--olive)' : 'transparent'}`,
              boxShadow: on ? '0 8px 22px rgba(74,124,89,0.16)' : '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'all .2s ease', transform: on ? 'scale(1.01)' : 'scale(1)',
              WebkitTapHighlightColor: 'transparent',
            }}>
              <span style={{
                width: 50, height: 50, borderRadius: 14,
                background: on ? '#EAF1EC' : '#F4F2EC',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, flexShrink: 0, transition: 'background .2s',
              }}>{it.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 17, color: 'var(--ink)' }}>{it.name}</div>
                <div style={{ fontFamily: 'Inter, system-ui', fontSize: 13.5, color: '#9A9A9A', marginTop: 2 }}>{it.tag}</div>
              </div>
              <span style={{
                width: 24, height: 24, borderRadius: 99, flexShrink: 0,
                border: on ? 'none' : '2px solid #DcDcDc',
                background: on ? 'var(--olive)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
              }}>
                {on && <Icon name="check" size={14} color="#fff" strokeWidth={2.8} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
