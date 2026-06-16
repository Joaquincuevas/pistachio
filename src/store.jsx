import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { especialidades, mallaFor, defaultProgress } from './data';

const KEY = 'pistachio.session.v2';
const AppCtx = createContext(null);

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}

export function AppProvider({ children }) {
  const [session, setSession] = useState(() => load());

  useEffect(() => {
    if (session) localStorage.setItem(KEY, JSON.stringify(session));
    else localStorage.removeItem(KEY);
  }, [session]);

  const malla = useMemo(
    () => (session?.especialidad ? mallaFor(session.especialidad) : []),
    [session?.especialidad]
  );

  const login = useCallback((email) => {
    setSession(prev => ({ email, especialidad: prev?.especialidad || null, progress: prev?.progress || {} }));
  }, []);

  const logout = useCallback(() => setSession(null), []);

  const setEspecialidad = useCallback((espId) => {
    const m = mallaFor(espId);
    setSession(prev => ({
      ...prev,
      especialidad: espId,
      progress: defaultProgress(m),
    }));
  }, []);

  const setStatus = useCallback((code, status) => {
    setSession(prev => ({ ...prev, progress: { ...prev.progress, [code]: status } }));
  }, []);

  const cycleStatus = useCallback((code) => {
    setSession(prev => {
      const order = ['pending', 'progress', 'done'];
      const cur = prev.progress[code] || 'pending';
      const next = order[(order.indexOf(cur) + 1) % order.length];
      return { ...prev, progress: { ...prev.progress, [code]: next } };
    });
  }, []);

  const especialidad = especialidades.find(e => e.id === session?.especialidad) || null;

  const value = {
    session,
    email: session?.email || '',
    especialidad,
    progress: session?.progress || {},
    malla,
    isAuthed: !!session?.email,
    hasEspecialidad: !!session?.especialidad,
    login, logout, setEspecialidad, setStatus, cycleStatus,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
