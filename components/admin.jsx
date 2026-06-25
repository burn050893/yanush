'use client';
import { useState, useEffect } from 'react';
import { Lock, LogOut, Plus, Trash2, Edit2, Image as ImageIcon, X, ArrowLeft, Save, Eye, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { formatPrice, formatKm } from './car-card';

// ============ ADMIN LOGIN ============
export const AdminLogin = ({ onLogin }) => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) });
      if (!r.ok) { toast.error('Foute logingegevens'); return; }
      toast.success('Welkom!');
      onLogin();
    } catch { toast.error('Fout'); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/yanush-logo.png" alt="YANUSH" className="h-20 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold gold-text">Admin Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">Login om verder te gaan</p>
        </div>
        <form onSubmit={submit} className="glass rounded-xl p-8 space-y-5">
          <div>
            <Label className="text-white/80">Gebruikersnaam</Label>
            <Input value={u} onChange={(e) => setU(e.target.value)} required autoFocus className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" />
          </div>
          <div>
            <Label className="text-white/80">Wachtwoord</Label>
            <Input type="password" value={p} onChange={(e) => setP(e.target.value)} required className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" />
          </div>
          <Button type="submit" disabled={busy} className="w-full btn-gold border-0 py-6 rounded-md uppercase tracking-wider font-semibold">
            <Lock className="w-4 h-4 mr-2" /> {busy ? 'Inloggen...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

// ============ ADMIN DASHBOARD ============
export const AdminDashboard = ({ onLogout }) => {
  const [tab, setTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [sellReqs, setSellReqs] = useState([]);
  const [editing, setEditing] = useState(null); // car object or {} for new
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [c, s] = await Promise.all([
        fetch('/api/cars').then((r) => r.json()),
        fetch('/api/admin/sell-requests').then((r) => r.json()),
      ]);
      setCars(Array.isArray(c) ? c : []);
      setSellReqs(Array.isArray(s) ? s : []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    onLogout();
  };

  const deleteCar = async (id) => {
    if (!confirm('Auto verwijderen?')) return;
    await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
    toast.success('Verwijderd');
    load();
  };

  const deleteSell = async (id) => {
    if (!confirm('Verzoek verwijderen?')) return;
    await fetch(`/api/admin/sell-requests/${id}`, { method: 'DELETE' });
    toast.success('Verwijderd');
    load();
  };

  if (editing) {
    return <CarEditor car={editing} onClose={() => { setEditing(null); load(); }} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* TOP BAR */}
      <div className="border-b border-[#d4af37]/20 bg-black/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/yanush-logo.png" alt="YANUSH" className="h-10 w-auto" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37]">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-white/60 hover:text-[#d4af37]"><Eye className="w-4 h-4 inline mr-1" />Site bekijken</a>
            <button onClick={logout} className="text-sm text-white/60 hover:text-red-400 flex items-center gap-1"><LogOut className="w-4 h-4" /> Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* STATS */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-gold rounded-xl p-5">
            <div className="text-xs text-white/50 uppercase tracking-wider">Auto's in voorraad</div>
            <div className="text-4xl font-black gold-text mt-1">{cars.length}</div>
          </div>
          <div className="glass-gold rounded-xl p-5">
            <div className="text-xs text-white/50 uppercase tracking-wider">Verkoopaanvragen</div>
            <div className="text-4xl font-black gold-text mt-1">{sellReqs.length}</div>
          </div>
          <div className="glass-gold rounded-xl p-5">
            <div className="text-xs text-white/50 uppercase tracking-wider">Totale waarde</div>
            <div className="text-4xl font-black gold-text mt-1">{formatPrice(cars.reduce((s, c) => s + (c.price || 0), 0))}</div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 border-b border-white/10">
          <button onClick={() => setTab('cars')} className={`px-5 py-3 text-sm uppercase tracking-wider transition-colors ${tab === 'cars' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-white/60 hover:text-white'}`}>
            Auto's ({cars.length})
          </button>
          <button onClick={() => setTab('sell')} className={`px-5 py-3 text-sm uppercase tracking-wider transition-colors ${tab === 'sell' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-white/60 hover:text-white'}`}>
            Verkoopaanvragen ({sellReqs.length})
          </button>
        </div>

        {tab === 'cars' && (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={() => setEditing({})} className="btn-gold border-0 px-5 py-2.5 rounded-md uppercase tracking-wider text-sm">
                <Plus className="w-4 h-4 mr-2" /> Auto Toevoegen
              </Button>
            </div>
            {loading ? <div className="text-center py-12 text-white/40">Laden...</div> : cars.length === 0 ? (
              <div className="glass rounded-xl p-12 text-center text-white/60">Nog geen auto's. Voeg de eerste toe!</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map((c) => (
                  <div key={c.id} className="glass rounded-xl overflow-hidden border border-white/10 hover:border-[#d4af37]/30 transition-colors">
                    <div className="aspect-video bg-black overflow-hidden">
                      {c.images?.[0] ? <img src={c.images[0]} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon className="w-12 h-12" /></div>}
                    </div>
                    <div className="p-4">
                      <div className="font-bold">{c.brand} {c.model}</div>
                      <div className="text-sm text-white/60 mt-1">{c.year} · {formatKm(c.mileage)} · {c.fuel}</div>
                      <div className="text-lg gold-text font-bold mt-2">{formatPrice(c.price)}</div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => setEditing(c)} className="flex-1 border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"><Edit2 className="w-3 h-3 mr-1" />Bewerk</Button>
                        <Button size="sm" variant="outline" onClick={() => deleteCar(c.id)} className="border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'sell' && (
          <div className="space-y-3">
            {loading ? <div className="text-center py-12 text-white/40">Laden...</div> : sellReqs.length === 0 ? (
              <div className="glass rounded-xl p-12 text-center text-white/60">Nog geen verkoopaanvragen.</div>
            ) : (
              sellReqs.map((s) => (
                <div key={s.id} className="glass rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="font-bold text-lg">{s.name}</div>
                      <div className="text-xs text-white/40 mb-3 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(s.createdAt).toLocaleString('nl-BE')}</div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div><span className="text-white/40">Tel:</span> <a href={`tel:${s.phone}`} className="text-[#d4af37]">{s.phone}</a></div>
                        <div><span className="text-white/40">Email:</span> {s.email || '-'}</div>
                        <div><span className="text-white/40">Auto:</span> {s.brand} {s.model} ({s.year})</div>
                        <div><span className="text-white/40">KM:</span> {s.mileage}</div>
                      </div>
                      {s.message && <div className="mt-3 text-sm text-white/70 whitespace-pre-wrap glass rounded-md p-3">{s.message}</div>}
                      {s.images?.length > 0 && (
                        <div className="grid grid-cols-6 gap-2 mt-3">
                          {s.images.map((im, i) => (
                            <a key={i} href={im} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-md overflow-hidden block">
                              <img src={im} className="w-full h-full object-cover hover:opacity-80" alt="" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href={`https://wa.me/${s.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-500 text-white rounded-md text-center">WhatsApp</a>
                      <a href={`tel:${s.phone}`} className="px-3 py-1.5 text-xs border border-[#d4af37]/40 text-[#d4af37] rounded-md text-center hover:bg-[#d4af37] hover:text-black"><Phone className="w-3 h-3 inline" /></a>
                      <button onClick={() => deleteSell(s.id)} className="px-3 py-1.5 text-xs border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white rounded-md"><Trash2 className="w-3 h-3 inline" /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============ CAR EDITOR ============
export const CarEditor = ({ car, onClose }) => {
  const isNew = !car.id;
  const [form, setForm] = useState({
    brand: car.brand || '', model: car.model || '', year: car.year || new Date().getFullYear(),
    price: car.price || '', mileage: car.mileage || '', fuel: car.fuel || 'Benzine',
    gearbox: car.gearbox || 'Manueel', description: car.description || '',
  });
  const [images, setImages] = useState(car.images || []);
  const [busy, setBusy] = useState(false);

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    const reads = await Promise.all(files.map((f) => new Promise((res) => {
      const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f);
    })));
    setImages([...images, ...reads]);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.brand || !form.model || !form.price) { toast.error('Merk, model en prijs zijn verplicht'); return; }
    setBusy(true);
    try {
      const url = isNew ? '/api/admin/cars' : `/api/admin/cars/${car.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, images }) });
      if (!r.ok) throw new Error('Fout');
      toast.success(isNew ? 'Auto toegevoegd!' : 'Auto bijgewerkt!');
      onClose();
    } catch { toast.error('Fout bij opslaan'); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-[#d4af37]/20 bg-black/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-white/70 hover:text-[#d4af37]"><ArrowLeft className="w-4 h-4" /> Terug</button>
          <div className="text-sm uppercase tracking-widest text-[#d4af37]">{isNew ? 'Nieuwe Auto' : 'Auto Bewerken'}</div>
        </div>
      </div>
      <form onSubmit={submit} className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="glass rounded-xl p-6 grid md:grid-cols-2 gap-5">
          <div><Label>Merk *</Label><Input required value={form.brand} onChange={upd('brand')} placeholder="Mercedes-Benz" className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label>Model *</Label><Input required value={form.model} onChange={upd('model')} placeholder="C220d" className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label>Jaar *</Label><Input required type="number" value={form.year} onChange={upd('year')} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label>Prijs (€) *</Label><Input required type="number" value={form.price} onChange={upd('price')} placeholder="24500" className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label>Kilometerstand *</Label><Input required type="number" value={form.mileage} onChange={upd('mileage')} placeholder="85000" className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div>
            <Label>Brandstof</Label>
            <select value={form.fuel} onChange={upd('fuel')} className="mt-1.5 w-full px-3 py-2 rounded-md bg-black/50 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none h-10">
              <option>Benzine</option><option>Diesel</option><option>Hybride</option><option>Elektrisch</option><option>LPG</option>
            </select>
          </div>
          <div>
            <Label>Versnellingsbak</Label>
            <select value={form.gearbox} onChange={upd('gearbox')} className="mt-1.5 w-full px-3 py-2 rounded-md bg-black/50 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none h-10">
              <option>Manueel</option><option>Automaat</option>
            </select>
          </div>
          <div className="md:col-span-2"><Label>Beschrijving</Label><Textarea rows={5} value={form.description} onChange={upd('description')} placeholder="Volledig onderhoudshistoriek, eerste eigenaar, ..." className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
        </div>

        <div className="glass rounded-xl p-6">
          <Label>Foto's</Label>
          <input type="file" multiple accept="image/*" onChange={onFiles} className="mt-1.5 block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#f3d57a] file:cursor-pointer" />
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
              {images.map((im, i) => (
                <div key={i} className="relative aspect-video rounded-md overflow-hidden group">
                  <img src={im} className="w-full h-full object-cover" alt="" />
                  {i === 0 && <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#d4af37] text-black text-[10px] font-bold rounded">COVER</span>}
                  <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/80 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-white/40 mt-2">Eerste foto = cover</p>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="border-white/20 text-white hover:bg-white/10">Annuleer</Button>
          <Button type="submit" disabled={busy} className="btn-gold border-0 px-8 rounded-md uppercase tracking-wider">
            <Save className="w-4 h-4 mr-2" /> {busy ? 'Opslaan...' : (isNew ? 'Auto Toevoegen' : 'Opslaan')}
          </Button>
        </div>
      </form>
    </div>
  );
};
