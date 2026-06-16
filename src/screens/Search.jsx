import { useState, useMemo } from 'react';
import { Topbar } from '../components/Topbar';
import { CoursePanel } from '../components/CoursePanel';
import { Icon, StatusPill } from '../ui';
import { useApp } from '../store';
import { STATUS_META, AREAS } from '../data';

export function Search() {
  const { malla, progress } = useApp();
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);
  const [sem, setSem] = useState('all');
  const [area, setArea] = useState('all');
  const [stat, setStat] = useState('all');
  const [sort, setSort] = useState('sem');

  const sems = useMemo(() => [...new Set(malla.map(r => r.sem))].sort((a, b) => a - b), [malla]);

  const results = useMemo(() => {
    let rs = malla.filter(r => {
      if (q && !`${r.name} ${r.code} ${r.prof}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (sem !== 'all' && r.sem !== Number(sem)) return false;
      if (area !== 'all' && r.area !== area) return false;
      if (stat !== 'all' && (progress[r.code] || 'pending') !== stat) return false;
      return true;
    });
    rs = [...rs].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'credits') return b.credits - a.credits;
      return a.sem - b.sem || a.name.localeCompare(b.name);
    });
    return rs;
  }, [malla, q, sem, area, stat, sort, progress]);

  const selectStyle = {
    height: 38, borderRadius: 'var(--r-md)', border: '1px solid var(--border-strong)',
    background: 'var(--surface)', padding: '0 30px 0 12px', fontSize: 13.5, fontWeight: 600,
    appearance: 'none', cursor: 'pointer',
    backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='%239AA09B' d='M0 0h10L5 6z'/></svg>\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center',
  };

  return (
    <>
      <Topbar title="Buscar ramos" subtitle={`${results.length} de ${malla.length} ramos`} />
      <div style={{ padding: 32, maxWidth: 1100 }}>
        {/* search + filters */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ position: 'relative', flex: '1 1 280px', minWidth: 240 }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--faint)' }}><Icon name="search" size={18} /></span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nombre, código o profesor…"
              style={{ width: '100%', height: 42, borderRadius: 'var(--r-md)', border: '1px solid var(--border-strong)', background: 'var(--surface)', padding: '0 14px 0 42px', fontSize: 14, outline: 'none' }} />
          </div>
          <select value={sem} onChange={e => setSem(e.target.value)} style={selectStyle}>
            <option value="all">Todos los semestres</option>
            {sems.map(s => <option key={s} value={s}>Semestre {s}</option>)}
          </select>
          <select value={area} onChange={e => setArea(e.target.value)} style={selectStyle}>
            <option value="all">Todas las áreas</option>
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={stat} onChange={e => setStat(e.target.value)} style={selectStyle}>
            <option value="all">Cualquier estado</option>
            <option value="done">Aprobado</option>
            <option value="progress">Cursando</option>
            <option value="pending">Pendiente</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>
            <option value="sem">Ordenar: semestre</option>
            <option value="name">Ordenar: nombre</option>
            <option value="credits">Ordenar: créditos</option>
          </select>
        </div>

        {/* table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                <Th style={{ width: 90 }}>Código</Th>
                <Th>Ramo</Th>
                <Th style={{ width: 110 }}>Área</Th>
                <Th style={{ width: 70, textAlign: 'center' }}>Sem.</Th>
                <Th style={{ width: 70, textAlign: 'center' }}>Cr.</Th>
                <Th style={{ width: 130 }}>Estado</Th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.code} onClick={() => setSelected(r)} className="row"
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Td style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12.5, color: 'var(--muted)' }}>{r.code}</Td>
                  <Td style={{ fontWeight: 600 }}>{r.name}<div style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 400, marginTop: 1 }}>{r.prof}</div></Td>
                  <Td style={{ color: 'var(--muted)', fontSize: 13 }}>{r.area}</Td>
                  <Td style={{ textAlign: 'center', color: 'var(--muted)' }}>{r.sem}</Td>
                  <Td style={{ textAlign: 'center', color: 'var(--muted)' }}>{r.credits}</Td>
                  <Td><StatusPill status={progress[r.code] || 'pending'} meta={STATUS_META} /></Td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr><td colSpan={6} style={{ padding: '48px 0', textAlign: 'center', color: 'var(--faint)', fontSize: 14 }}>
                  No se encontraron ramos con esos filtros.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <CoursePanel course={selected} onClose={() => setSelected(null)} onNavigate={setSelected} />}
    </>
  );
}

function Th({ children, style }) {
  return <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.4, ...style }}>{children}</th>;
}
function Td({ children, style }) {
  return <td style={{ padding: '13px 16px', fontSize: 13.5, ...style }}>{children}</td>;
}
