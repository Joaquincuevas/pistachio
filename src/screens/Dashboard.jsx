import { useMemo } from 'react';
import { Topbar } from '../components/Topbar';
import { Card, Icon } from '../ui';
import { useApp } from '../store';
import { AREAS, STATUS_META } from '../data';

export function Dashboard() {
  const { malla, progress, especialidad } = useApp();

  const stats = useMemo(() => {
    const totalCr = malla.reduce((s, r) => s + r.credits, 0);
    const doneCr = malla.filter(r => progress[r.code] === 'done').reduce((s, r) => s + r.credits, 0);
    const doneN = malla.filter(r => progress[r.code] === 'done').length;
    const progN = malla.filter(r => progress[r.code] === 'progress').length;
    const pendN = malla.filter(r => progress[r.code] === 'pending').length;
    const pct = totalCr ? Math.round((doneCr / totalCr) * 100) : 0;
    return { totalCr, doneCr, doneN, progN, pendN, pct, total: malla.length };
  }, [malla, progress]);

  const bySem = useMemo(() => {
    const map = {};
    malla.forEach(r => {
      const g = map[r.sem] || (map[r.sem] = { total: 0, done: 0 });
      g.total += r.credits;
      if (progress[r.code] === 'done') g.done += r.credits;
    });
    return Object.keys(map).map(Number).sort((a, b) => a - b).map(sem => ({ sem, ...map[sem] }));
  }, [malla, progress]);

  const byArea = useMemo(() => AREAS.map(area => {
    const rs = malla.filter(r => r.area === area);
    const done = rs.filter(r => progress[r.code] === 'done').length;
    return { area, total: rs.length, done };
  }).filter(a => a.total > 0), [malla, progress]);

  return (
    <>
      <Topbar title="Mi progreso" subtitle={`Resumen de tu avance en ${especialidad?.name}`} />
      <div style={{ padding: 32, maxWidth: 1100 }}>
        {/* metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
          <Metric icon="target" label="Avance total" value={`${stats.pct}%`} accent />
          <Metric icon="award" label="Ramos aprobados" value={`${stats.doneN} / ${stats.total}`} />
          <Metric icon="layers" label="Créditos aprobados" value={`${stats.doneCr} / ${stats.totalCr}`} />
          <Metric icon="clock" label="Cursando ahora" value={stats.progN} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, alignItems: 'start' }}>
          {/* progress by semester */}
          <Card style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Avance por semestre</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Créditos aprobados sobre el total de cada semestre.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {bySem.map(s => {
                const pct = Math.round((s.done / s.total) * 100);
                return (
                  <div key={s.sem}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                      <span style={{ fontWeight: 600 }}>Semestre {s.sem}</span>
                      <span style={{ color: 'var(--muted)' }}>{s.done}/{s.total} cr · <b style={{ color: pct === 100 ? 'var(--done)' : 'var(--ink)' }}>{pct}%</b></span>
                    </div>
                    <div style={{ height: 8, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? 'var(--done)' : 'var(--olive)', borderRadius: 99, transition: 'width .6s' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* distribution */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Distribución de ramos</h3>
              <Donut done={stats.doneN} prog={stats.progN} pend={stats.pendN} total={stats.total} />
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <LegendRow meta={STATUS_META.done} n={stats.doneN} />
                <LegendRow meta={STATUS_META.progress} n={stats.progN} />
                <LegendRow meta={STATUS_META.pending} n={stats.pendN} />
              </div>
            </Card>

            {/* by area */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Por área</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {byArea.map(a => (
                  <div key={a.area}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                      <span style={{ fontWeight: 600 }}>{a.area}</span>
                      <span style={{ color: 'var(--muted)' }}>{a.done}/{a.total}</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(a.done / a.total) * 100}%`, background: 'var(--olive)', borderRadius: 99, transition: 'width .6s' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function Metric({ icon, label, value, accent }) {
  return (
    <Card style={{ padding: '18px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
        <span style={{ width: 32, height: 32, borderRadius: 'var(--r-sm)', background: accent ? 'var(--olive)' : 'var(--olive-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={17} color={accent ? '#fff' : 'var(--olive)'} />
        </span>
        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{label}</span>
      </div>
      <div className="serif" style={{ fontSize: 34, lineHeight: 1, color: 'var(--ink)' }}>{value}</div>
    </Card>
  );
}

function Donut({ done, prog, pend, total }) {
  const size = 150, stroke = 18, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const segs = [
    { v: done, color: STATUS_META.done.dot },
    { v: prog, color: STATUS_META.progress.dot },
    { v: pend, color: STATUS_META.pending.dot },
  ];
  let offset = 0;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {segs.map((s, i) => {
          const frac = total ? s.v / total : 0;
          const dash = frac * c;
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-offset} style={{ transition: 'stroke-dasharray .6s' }} />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span className="serif" style={{ fontSize: 30, lineHeight: 1 }}>{total ? Math.round((done / total) * 100) : 0}%</span>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>completado</span>
      </div>
    </div>
  );
}

function LegendRow({ meta, n }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <span style={{ width: 10, height: 10, borderRadius: 99, background: meta.dot }} />
      <span style={{ flex: 1, color: 'var(--muted)' }}>{meta.label}</span>
      <span style={{ fontWeight: 700 }}>{n}</span>
    </div>
  );
}
