'use client';
import { useState, useEffect } from 'react';
import { Header, Footer, WhatsAppFloat } from '@/components/layout';
import { HomeView, FleetView, CarDetailView, SellView, ServicesView, AboutView, ContactView } from '@/components/views';
import { AdminLogin, AdminDashboard } from '@/components/admin';

const App = () => {
  // view can be string ('home','fleet','sell','services','about','contact','admin') or {name:'car-detail', id}
  const [view, setView] = useState('home');
  const [lang, setLang] = useState('nl');
  const [cars, setCars] = useState([]);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  // Handle URL hash for admin route
  useEffect(() => {
    const updateFromHash = () => {
      const h = window.location.hash.slice(1);
      if (h === 'admin') setView('admin');
    };
    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);
    // load language pref
    try {
      const saved = localStorage.getItem('yanush_lang');
      if (saved) setLang(saved);
    } catch {}
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('yanush_lang', lang); } catch {}
  }, [lang]);

  // Load cars
  const loadCars = async () => {
    try {
      const r = await fetch('/api/cars');
      const d = await r.json();
      setCars(Array.isArray(d) ? d : []);
    } catch {}
  };
  useEffect(() => { loadCars(); }, []);

  // Re-load on returning from admin
  useEffect(() => {
    if (view !== 'admin') loadCars();
  }, [view]);

  // Check admin session when view = 'admin'
  useEffect(() => {
    if (view === 'admin') {
      (async () => {
        try {
          const r = await fetch('/api/admin/me');
          const d = await r.json();
          setAdminAuthed(!!d.authenticated);
        } catch { setAdminAuthed(false); }
        finally { setAdminChecked(true); }
      })();
    }
  }, [view]);

  // ADMIN ROUTE
  if (view === 'admin') {
    if (!adminChecked) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40">Laden...</div>;
    if (!adminAuthed) return <AdminLogin onLogin={() => setAdminAuthed(true)} />;
    return <AdminDashboard onLogout={() => { setAdminAuthed(false); window.location.hash = ''; setView('home'); }} />;
  }

  // PUBLIC ROUTES
  const currentCar = typeof view === 'object' && view.name === 'car-detail' ? cars.find((c) => c.id === view.id) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header view={typeof view === 'string' ? view : view.name} setView={setView} lang={lang} setLang={setLang} />
      <main>
        {view === 'home' && <HomeView lang={lang} setView={setView} cars={cars} />}
        {view === 'fleet' && <FleetView lang={lang} setView={setView} cars={cars} />}
        {typeof view === 'object' && view.name === 'car-detail' && <CarDetailView lang={lang} setView={setView} car={currentCar} />}
        {view === 'sell' && <SellView lang={lang} />}
        {view === 'services' && <ServicesView lang={lang} />}
        {view === 'about' && <AboutView lang={lang} />}
        {view === 'contact' && <ContactView lang={lang} />}
      </main>
      <Footer lang={lang} setView={setView} />
      <WhatsAppFloat />
    </div>
  );
};

export default App;
