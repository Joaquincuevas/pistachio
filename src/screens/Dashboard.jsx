import { useState } from 'react';
import { Icon, StatusBadge, Ring, PistachioMark } from '../ui';
import { STATUS } from '../ui';

function TopBar({ onMenu, onSearch }) {
  const iconBtn = {
    width: 40, height: 40, borderRadius: 99, border: 'none', background: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  };
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(248,248,248,0.82)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '0.5px solid rgba(0,0,0,0.07)',
      padding: '56px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <PistachioMark size={28} />
        <span style={{ fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 13, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--ink)' }}>Pistachio</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={onSearch} style={iconBtn}><Icon name="search" size={22} /></button>
        <button onClick={onMenu} style={iconBtn}><Icon name="menu" size={22} /></button>
      </div>
    </div>
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

function SemSection({ g, onOpen }) {
  const cr = g.ramos.reduce((s, r) => s + r.credits, 0);
  const allDone = g.ramos.every(r => r.status === 'done');
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{
        position: 'sticky', top: 108, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 2px', background: 'linear-gradient(var(--bg) 70%, transparent)', marginBottom: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <h2 style={{ fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 15, color: 'var(--ink)', margin: 0, letterSpacing: -0.2 }}>
            Semestre {g.sem}
          </h2>
          {allDone && <Icon name="check" size={15} color="var(--green)" strokeWidth={2.4} />}
        </div>
        <span style={{ fontFamily: 'Inter, system-ui', fontSize: 12, color: '#A8A8A8', fontWeight: 600 }}>{cr} cr</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {g.ramos.map(r => <RamoCard key={r.code} r={r} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

function groupBySem(malla) {
  const map = {};
  malla.forEach(r => { (map[r.sem] = map[r.sem] || []).push(r); });
  return Object.keys(map).map(Number).sort((a, b) => a - b).map(sem => ({ sem, ramos: map[sem] }));
}

export function Dashboard({ esp, malla, onOpen, onMenu, onSearch, onChangeEsp }) {
  const groups = groupBySem(malla);
  const totalCr = malla.reduce((s, r) => s + r.credits, 0);
  const doneCr = malla.filter(r => r.status === 'done').reduce((s, r) => s + r.credits, 0);
  const pct = doneCr / totalCr;

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)' }}>
      <TopBar onMenu={onMenu} onSearch={onSearch} />

      <div style={{ padding: '18px 20px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <div style={{ flex: 1 }}>
          <button onClick={onChangeEsp} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff', border: '1px solid #ECECEC', borderRadius: 999,
            padding: '5px 11px 5px 8px', cursor: 'pointer', marginBottom: 10,
            WebkitTapHighlightColor: 'transparent',
          }}>
            <span style={{ fontSize: 15 }}>{esp.icon}</span>
            <span style={{ fontFamily: 'Inter, system-ui', fontWeight: 600, fontSize: 12.5, color: 'var(--ink)' }}>{esp.tag}</span>
            <Icon name="swap" size={14} color="#9A9A9A" />
          </button>
          <h1 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 34, lineHeight: 1, color: 'var(--ink)', margin: 0, letterSpacing: -0.3 }}>
            {esp.name}
          </h1>
          <p style={{ fontFamily: 'Inter, system-ui', fontSize: 13.5, color: '#9A9A9A', margin: '7px 0 0' }}>
            Semestre 1 – 8 · {malla.length} ramos · {totalCr} créditos
          </p>
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <Ring value={pct} size={62} stroke={5} />
          <span style={{ position: 'absolute', top: 0, left: 0, width: 62, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: 15, color: 'var(--olive)' }}>
            {Math.round(pct * 100)}%
          </span>
          <span style={{ fontFamily: 'Inter, system-ui', fontSize: 10.5, color: '#9A9A9A', marginTop: 4, fontWeight: 600 }}>avance</span>
        </div>
      </div>

      <div style={{ padding: '12px 20px 36px' }}>
        {groups.map(g => <SemSection key={g.sem} g={g} onOpen={onOpen} />)}
      </div>
    </div>
  );
}
