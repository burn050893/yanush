'use client';
import { useState, useEffect } from 'react';
import { AdminLogin, AdminDashboard } from '@/components/admin';

const AdminPage = () => {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/admin/me');
        const d = await r.json();
        setAuthed(!!d.authenticated);
      } catch { setAuthed(false); }
      finally { setChecked(true); }
    })();
  }, []);

  if (!checked) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40">Laden...</div>;
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={() => { setAuthed(false); }} />;
};

export default AdminPage;
