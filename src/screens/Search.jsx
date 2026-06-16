import { useState } from 'react';
import { Icon, StatusBadge } from '../ui';
import { STATUS } from '../ui';

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '0.5px solid #ECECEC' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>
        {title}
        <span style={{ transform: open ? 'none' : 'rotate(-90deg)', transition: 'transform .2s', display: 'flex' }}>
          <Icon name="chevDown" size={18} color="#9A9A9A" />
        </span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height .28s ease' }}>
        <div style={{ paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</div>
      </div>
    </div>
  );
}

function CheckRow({ label, checked, onToggle }) {
  return (
    <button onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
      <span style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, border: checked ? 'none' : '2px solid #DcDcDc', background: checked ? 'var(--olive)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
        {checked && <Icon name="check" size={14} color="#fff" strokeWidth={2.8} />}
      </span>
      <span style={{ fontFamily: 'Inter, system-ui', fontSize: 15, color: 'var(--ink)' }}>{label}</span>
    </button>
  );
}

function RamoCard({ r, onOpen }) {
  const s = STATUS[r.status];
  const [press, setPress] = useState(false);
  return (
    <div onClick={() => onOpen(r)}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)} onPointerLeave={() => setPress(false)}
      style={{
        background: '#fff', borderRadius: 14, padding: '14px 16px', cursor: 'pointer',
        borderLeft: `4px solid ${s.dot}`, boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex', alignItems: 'center', gap: 12,
        transform: press ? 'scale(0.985)' : 'scale(1)', transition: 'transform .12s ease',
        WebkitTapHighlightColor: 'transparent',
      }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 16, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#9A9A9A' }}>{r.code}</span>
          <span style={{ width: 3, height: 3, borderRadius: 9, background: '#D5D5D5' }} />
          <span style={{ fontFamily: 'Inter, system-ui', fontSize: 12.5, color: '#9A9A9A', fontWeight: 500 }}>{r.credits} créditos</span>
        </div>
      </div>
      <StatusBadge status={r.status} />
    </div>
  );
}

export function Search({ malla, onBack, onOpen }) {
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [sems, setSems] = useState({});
  const [creds, setCreds] = useState({});
  const [stat, setStat] = useState({ done: true, progress: true, pending: true });

  const allSems = [...new Set(malla.map(r => r.sem))].sort((a, b) => a - b);
  const allCreds = [...new Set(malla.map(r => r.credits))].sort((a, b) => a - b);
  const anySem = Object.values(sems).some(Boolean);
  const anyCred = Object.values(creds).some(Boolean);

  const results = malla.filter(r => {
    if (q && !(`${r.name} ${r.code} ${r.prof}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (anySem && !sems[r.sem]) return false;
    if (anyCred && !creds[r.credits]) return false;
    if (!stat[r.status]) return false;
    return true;
  });

  const clear = () => { setQ(''); setSems({}); setCreds({}); setStat({ done: true, progress: true, pending: true }); };

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '56px 20px 0', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, system-ui', fontSize: 16, color: 'var(--ink)', fontWeight: 500 }}>
            <Icon name="back" size={22} /> Atrás
          </button>
          <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, system-ui', fontSize: 15, color: 'var(--olive)', fontWeight: 600 }}>
            Limpiar
          </button>
        </div>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
            <Icon name="search" size={20} color="#9A9A9A" />
          </span>
          <input
            autoFocus value={q} onChange={e => setQ(e.target.value)}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            placeholder="Buscar ramos, códigos, profesores…"
            style={{
              width: '100%', height: 46, borderRadius: 12,
              border: `1.5px solid ${focus ? 'var(--olive)' : '#E4E4E4'}`,
              background: '#fff', padding: '0 14px 0 42px', boxSizing: 'border-box',
              fontFamily: 'Inter, system-ui', fontSize: 15.5, color: 'var(--ink)',
              outline: 'none', transition: 'border-color .15s',
            }}
          />
        </div>
      </div>

      <div style={{ padding: '4px 20px 0' }}>
        <FilterGroup title="Por semestre">
          {allSems.map(s => (
            <CheckRow key={s} label={`Semestre ${s}`} checked={!!sems[s]} onToggle={() => setSems(p => ({ ...p, [s]: !p[s] }))} />
          ))}
        </FilterGroup>
        <FilterGroup title="Por créditos" defaultOpen={false}>
          {allCreds.map(c => (
            <CheckRow key={c} label={`${c} créditos`} checked={!!creds[c]} onToggle={() => setCreds(p => ({ ...p, [c]: !p[c] }))} />
          ))}
        </FilterGroup>
        <FilterGroup title="Por estado" defaultOpen={false}>
          <CheckRow label="Cursados" checked={stat.done} onToggle={() => setStat(p => ({ ...p, done: !p.done }))} />
          <CheckRow label="En progreso" checked={stat.progress} onToggle={() => setStat(p => ({ ...p, progress: !p.progress }))} />
          <CheckRow label="Pendientes" checked={stat.pending} onToggle={() => setStat(p => ({ ...p, pending: !p.pending }))} />
        </FilterGroup>
      </div>

      <div style={{ padding: '18px 20px 36px', flex: 1 }}>
        <h3 style={{ fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 15, color: 'var(--ink)', margin: '0 0 12px' }}>
          Resultados ({results.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map(r => <RamoCard key={r.code} r={r} onOpen={onOpen} />)}
          {results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#A8A8A8', fontFamily: 'Inter, system-ui', fontSize: 14.5 }}>
              Sin resultados. Ajusta tu búsqueda o filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
