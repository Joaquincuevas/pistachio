import { HashRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import { Sidebar } from './components/Sidebar';
import { Login } from './screens/Login';
import { Onboarding } from './screens/Onboarding';
import { MallaView } from './screens/MallaView';
import { Dashboard } from './screens/Dashboard';
import { Search } from './screens/Search';
import { Profile } from './screens/Profile';

function AppLayout() {
  const { isAuthed, hasEspecialidad } = useApp();
  if (!isAuthed) return <Navigate to="/login" replace />;
  if (!hasEspecialidad) return <Navigate to="/onboarding" replace />;
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  );
}

function PublicOnly({ children }) {
  const { isAuthed, hasEspecialidad } = useApp();
  if (isAuthed && hasEspecialidad) return <Navigate to="/malla" replace />;
  return children;
}

function RouterRoot() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/onboarding" element={<OnboardingGuard />} />
      <Route element={<AppLayout />}>
        <Route path="/malla" element={<MallaView key={location.key} />} />
        <Route path="/progreso" element={<Dashboard />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/malla" replace />} />
    </Routes>
  );
}

function OnboardingGuard() {
  const { isAuthed } = useApp();
  if (!isAuthed) return <Navigate to="/login" replace />;
  return <Onboarding />;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <RouterRoot />
      </HashRouter>
    </AppProvider>
  );
}
