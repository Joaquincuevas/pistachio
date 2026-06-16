import { useState, useEffect } from 'react';
import { Toast, Sheet } from './ui';
import { Landing, Login } from './screens/Auth';
import { Specialty } from './screens/Specialty';
import { Dashboard } from './screens/Dashboard';
import { RamoDetail } from './screens/RamoDetail';
import { Search } from './screens/Search';
import { Profile } from './screens/Profile';
import { especialidades, mallaFor } from './data';

function IOSStatusBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 24px 0', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
      pointerEvents: 'none',
    }}>
      <span style={{ fontFamily: '-apple-system, system-ui', fontWeight: 590, fontSize: 15, color: '#000' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="0.6" fill="#000" />
          <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.6" fill="#000" />
          <rect x="9" y="2" width="3" height="9" rx="0.6" fill="#000" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.6" fill="#000" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect x="0" y="1" width="22" height="10" rx="2.5" stroke="#000" strokeWidth="1" fill="none" opacity="0.35" />
          <rect x="23" y="4" width="2" height="4" rx="1" fill="#000" opacity="0.4" />
          <rect x="1.5" y="2.5" width="18" height="7" rx="1.5" fill="#000" />
        </svg>
      </div>
    </div>
  );
}

function IOSDevice({ children }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 54,
      background: '#fff', overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 10px #1a1a1a, 0 0 0 12px #333, 0 40px 80px rgba(0,0,0,0.4)',
    }}>
      {/* Dynamic Island */}
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#1a1a1a', borderRadius: 20, zIndex: 200 }} />
      <IOSStatusBar />
      {/* Home indicator */}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.18)', zIndex: 200 }} />
      {/* Scrollable screen */}
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [email, setEmail] = useState('');
  const [espId, setEspId] = useState(null);
  const [malla, setMalla] = useState([]);
  const [selectedRamo, setSelectedRamo] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pistachio_session') || 'null');
      if (saved?.espId) {
        setEmail(saved.email || '');
        setEspId(saved.espId);
        setMalla(mallaFor(saved.espId));
        setScreen('dashboard');
      }
    } catch (_) {}
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  function handleLogin(em) {
    setEmail(em);
    setScreen('specialty');
    showToast('¡Sesión iniciada!');
  }

  function handleSelectEsp(id) {
    setEspId(id);
    const m = mallaFor(id);
    setMalla(m);
    localStorage.setItem('pistachio_session', JSON.stringify({ email, espId: id }));
    setScreen('dashboard');
  }

  function handleLogout() {
    localStorage.removeItem('pistachio_session');
    setEmail(''); setEspId(null); setMalla([]);
    setScreen('landing');
  }

  function openRamo(r) {
    setSelectedRamo(r);
    setSheetOpen(true);
  }

  const esp = especialidades.find(e => e.id === espId) || especialidades[0];

  const screenBg = { landing: '#fff', login: '#fff', specialty: 'var(--bg)', dashboard: 'var(--bg)', search: 'var(--bg)', profile: 'var(--bg)' };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px 0' }}>
      <IOSDevice>
        <div style={{ minHeight: '100%', background: screenBg[screen] || 'var(--bg)' }}>
          <Toast show={!!toast}>{toast}</Toast>

          <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
            <RamoDetail r={selectedRamo} malla={malla} />
          </Sheet>

          {screen === 'landing' && (
            <Landing onStart={() => setScreen('login')} onLogin={() => setScreen('login')} />
          )}
          {screen === 'login' && (
            <Login onBack={() => setScreen('landing')} onSubmit={handleLogin} />
          )}
          {screen === 'specialty' && (
            <Specialty items={especialidades} onSelect={handleSelectEsp} onBack={() => setScreen('landing')} />
          )}
          {screen === 'dashboard' && (
            <Dashboard
              esp={esp} malla={malla}
              onOpen={openRamo}
              onMenu={() => setScreen('profile')}
              onSearch={() => setScreen('search')}
              onChangeEsp={() => setScreen('specialty')}
            />
          )}
          {screen === 'search' && (
            <Search malla={malla} onBack={() => setScreen('dashboard')} onOpen={openRamo} />
          )}
          {screen === 'profile' && (
            <Profile esp={esp} malla={malla} email={email}
              onClose={() => setScreen('dashboard')}
              onChangeEsp={() => setScreen('specialty')}
              onLogout={handleLogout}
            />
          )}
        </div>
      </IOSDevice>
    </div>
  );
}
