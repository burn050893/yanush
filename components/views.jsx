'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Shield, TrendingUp, Calendar, Gauge, Fuel, Settings, MessageCircle, MapPin, Phone, Mail, Send, ChevronDown, Search, X, Wrench, Truck, AlertCircle, ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/site';
import { t } from '@/lib/i18n';
import { CarCard, formatPrice, formatKm } from './car-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const HERO_IMAGES_RAW = [
  { url: '/heroes/porsche.jpg', label: 'Porsche 911' },
  { url: '/heroes/audi-r8.jpg', label: 'Audi R8' },
  { url: '/heroes/bmw-m5.jpg', label: 'BMW M5' },
  { url: '/heroes/mercedes.jpg', label: 'Mercedes-Benz' },
  { url: '/heroes/range-rover.jpg', label: 'Range Rover' },
  { url: '/heroes/volvo.jpg', label: 'Volvo XC' },
  { url: '/heroes/audi-a3.jpg', label: 'Audi A3' },
  { url: '/heroes/peugeot.jpg', label: 'Peugeot 3008' },
  { url: '/heroes/takel.jpg', label: 'Takeldienst 24/7' },
];

// Fisher-Yates shuffle for random order each load
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ============ HOME VIEW ============
export const HomeView = ({ lang, setView, cars }) => {
  const [idx, setIdx] = useState(0);
  // Shuffle hero images once on mount for variety on each visit
  const [heroImages] = useState(() => shuffle(HERO_IMAGES_RAW));

  useEffect(() => {
    const i = setInterval(() => setIdx((p) => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(i);
  }, [heroImages.length]);

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        {heroImages.map((img, i) => (
          <motion.div key={img.url} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1 : 1.1 }} transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img.url})` }} />
        ))}
        {/* Top fade for navigation legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
        {/* Subtle bottom fade for footer/dots legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
        {/* Left side darkening for hero text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase font-medium">Lievegem · Belgium</span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              <span className="block gold-text">YANUSH</span>
              <span className="block text-white">CARS</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-white/90 font-light tracking-wide">{t(lang, 'hero.subtitle')}</p>
            <p className="mt-4 text-base text-white/60 max-w-xl">{t(lang, 'hero.tagline')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => setView('fleet')} className="px-8 py-4 btn-gold rounded-md uppercase tracking-wider text-sm flex items-center gap-2">
                {t(lang, 'hero.cta1')} <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setView('about')} className="px-8 py-4 btn-outline-gold rounded-md uppercase tracking-wider text-sm">
                {t(lang, 'hero.cta2')}
              </button>
              <button onClick={() => setView('contact')} className="px-8 py-4 rounded-md uppercase tracking-wider text-sm border border-white/20 text-white hover:border-white/50 hover:bg-white/5 transition-all">
                {t(lang, 'hero.cta3')}
              </button>
            </div>
          </motion.div>

          {/* slider dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`h-1 transition-all duration-500 ${i === idx ? 'w-12 bg-[#d4af37]' : 'w-6 bg-white/30'}`} />
            ))}
          </div>

          {/* scroll hint */}
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-12 bg-black border-y border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, t: t(lang, 'usp.t1'), d: t(lang, 'usp.t1d') },
            { icon: Shield, t: t(lang, 'usp.t2'), d: t(lang, 'usp.t2d') },
            { icon: Star, t: t(lang, 'usp.t3'), d: t(lang, 'usp.t3d') },
            { icon: TrendingUp, t: t(lang, 'usp.t4'), d: t(lang, 'usp.t4d') },
          ].map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center group-hover:border-[#d4af37] transition-colors duration-300">
                <it.icon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white uppercase tracking-wider">{it.t}</div>
                <div className="text-xs text-white/55 mt-1 leading-relaxed">{it.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LATEST CARS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase">Collection</span>
            <div className="h-px w-12 bg-[#d4af37]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold gold-text mb-3">{t(lang, 'home.latest')}</h2>
          <p className="text-white/60">{t(lang, 'home.latestSub')}</p>
        </div>
        {cars.length === 0 ? (
          <div className="text-center py-16 glass rounded-xl">
            <p className="text-white/60">Nog geen auto's beschikbaar. De admin kan auto's toevoegen via /admin.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.slice(0, 6).map((car) => (
              <CarCard key={car.id} car={car} lang={lang} onClick={() => setView({ name: 'car-detail', id: car.id })} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <button onClick={() => setView('fleet')} className="px-8 py-3 btn-outline-gold rounded-md uppercase tracking-wider text-sm inline-flex items-center gap-2">
            {t(lang, 'home.viewAll')} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold gold-text mb-3">{t(lang, 'home.services')}</h2>
            <p className="text-white/60">{t(lang, 'home.servicesSub')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: t(lang, 'services.s1'), desc: t(lang, 'services.s1d') },
              { icon: Truck, title: t(lang, 'services.s2'), desc: t(lang, 'services.s2d') },
              { icon: AlertCircle, title: t(lang, 'services.s3'), desc: t(lang, 'services.s3d') },
              { icon: Wrench, title: t(lang, 'services.s4'), desc: t(lang, 'services.s4d') },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover:border-[#d4af37]/50 border border-white/10 transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-[#d4af37]" />
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ============ FLEET VIEW ============
export const FleetView = ({ lang, setView, cars }) => {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [fuel, setFuel] = useState('');
  const [gearbox, setGearbox] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const brands = [...new Set(cars.map((c) => c.brand))].sort();
  const fuels = [...new Set(cars.map((c) => c.fuel))];
  const gearboxes = [...new Set(cars.map((c) => c.gearbox))];

  const filtered = cars.filter((c) => {
    const q = search.toLowerCase();
    if (q && !`${c.brand} ${c.model}`.toLowerCase().includes(q)) return false;
    if (brand && c.brand !== brand) return false;
    if (fuel && c.fuel !== fuel) return false;
    if (gearbox && c.gearbox !== gearbox) return false;
    if (maxPrice && c.price > Number(maxPrice)) return false;
    return true;
  });

  const clear = () => { setSearch(''); setBrand(''); setFuel(''); setGearbox(''); setMaxPrice(''); };

  return (
    <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold gold-text mb-3">{t(lang, 'fleet.title')}</h1>
        <p className="text-white/60">{t(lang, 'fleet.subtitle')}</p>
      </div>

      <div className="glass rounded-xl p-5 mb-8">
        <div className="grid md:grid-cols-5 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input placeholder={t(lang, 'fleet.search')} value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-black/50 border-white/10 focus:border-[#d4af37]" />
          </div>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="px-3 py-2 rounded-md bg-black/50 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none">
            <option value="">{t(lang, 'fleet.brand')}: {t(lang, 'fleet.all')}</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="px-3 py-2 rounded-md bg-black/50 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none">
            <option value="">{t(lang, 'fleet.fuel')}: {t(lang, 'fleet.all')}</option>
            {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select value={gearbox} onChange={(e) => setGearbox(e.target.value)} className="px-3 py-2 rounded-md bg-black/50 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none">
            <option value="">{t(lang, 'fleet.gearbox')}: {t(lang, 'fleet.all')}</option>
            {gearboxes.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Input type="number" placeholder={`Max ${t(lang, 'fleet.price')} (€)`} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-black/50 border-white/10 max-w-xs focus:border-[#d4af37]" />
          {(search || brand || fuel || gearbox || maxPrice) && (
            <button onClick={clear} className="text-xs text-[#d4af37] hover:underline flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
          <span className="ml-auto text-sm text-white/50">{filtered.length} {filtered.length === 1 ? 'auto' : "auto's"}</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 glass rounded-xl">
          <p className="text-white/60">{t(lang, 'fleet.noResults')}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} lang={lang} onClick={() => setView({ name: 'car-detail', id: car.id })} />
          ))}
        </div>
      )}
    </section>
  );
};

// ============ CAR DETAIL ============
export const CarDetailView = ({ lang, setView, car }) => {
  const [imgIdx, setImgIdx] = useState(0);
  if (!car) return <div className="pt-32 text-center text-white/60">Loading...</div>;
  const images = car.images?.length ? car.images : ['https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1200'];
  const waText = encodeURIComponent(`Hallo, ik heb interesse in de ${car.brand} ${car.model} (${car.year}) — ${formatPrice(car.price)}`);

  return (
    <section className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={() => setView('fleet')} className="text-sm text-[#d4af37] hover:underline mb-6 flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" /> {t(lang, 'car.back')}
      </button>
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black mb-3">
            <img src={images[imgIdx]} alt={car.brand} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <>
                <button onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#d4af37] hover:text-black text-white rounded-full flex items-center justify-center transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setImgIdx((imgIdx + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#d4af37] hover:text-black text-white rounded-full flex items-center justify-center transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((im, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`aspect-video rounded-md overflow-hidden border-2 ${i === imgIdx ? 'border-[#d4af37]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={im} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] mb-2">{car.brand}</div>
          <h1 className="text-3xl font-bold mb-4">{car.model}</h1>
          <div className="text-4xl font-bold gold-text mb-6">{formatPrice(car.price)}</div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-gold rounded-md p-3"><div className="text-xs text-white/50 uppercase">{t(lang, 'car.year')}</div><div className="font-semibold flex items-center gap-1.5 mt-1"><Calendar className="w-4 h-4 text-[#d4af37]" />{car.year}</div></div>
            <div className="glass-gold rounded-md p-3"><div className="text-xs text-white/50 uppercase">{t(lang, 'car.km')}</div><div className="font-semibold flex items-center gap-1.5 mt-1"><Gauge className="w-4 h-4 text-[#d4af37]" />{formatKm(car.mileage)}</div></div>
            <div className="glass-gold rounded-md p-3"><div className="text-xs text-white/50 uppercase">{t(lang, 'car.fuel')}</div><div className="font-semibold flex items-center gap-1.5 mt-1"><Fuel className="w-4 h-4 text-[#d4af37]" />{car.fuel}</div></div>
            <div className="glass-gold rounded-md p-3"><div className="text-xs text-white/50 uppercase">{t(lang, 'car.gearbox')}</div><div className="font-semibold flex items-center gap-1.5 mt-1"><Settings className="w-4 h-4 text-[#d4af37]" />{car.gearbox}</div></div>
          </div>
          {car.description && <p className="text-sm text-white/70 mb-6 whitespace-pre-wrap leading-relaxed">{car.description}</p>}
          <a href={`${SITE.whatsappUrl}?text=${waText}`} target="_blank" rel="noopener noreferrer"
            className="w-full block text-center px-6 py-4 bg-green-600 hover:bg-green-500 text-white rounded-md uppercase tracking-wider font-semibold transition-all">
            <MessageCircle className="w-5 h-5 inline mr-2" /> {t(lang, 'fleet.interested')}
          </a>
          <a href={`tel:${SITE.phoneIntl}`} className="w-full block text-center mt-3 px-6 py-3 btn-outline-gold rounded-md uppercase tracking-wider text-sm">
            <Phone className="w-4 h-4 inline mr-2" /> {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

// ============ SELL VIEW ============
export const SellView = ({ lang }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', brand: '', model: '', year: '', mileage: '', message: '' });
  const [images, setImages] = useState([]);
  const [busy, setBusy] = useState(false);

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []).slice(0, 8);
    const reads = await Promise.all(files.map((f) => new Promise((res) => {
      const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f);
    })));
    setImages([...images, ...reads]);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error('Naam en telefoon zijn verplicht'); return; }
    setBusy(true);
    try {
      const r = await fetch('/api/sell-requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, images }) });
      if (!r.ok) throw new Error('Failed');
      toast.success(t(lang, 'sell.success'));
      setForm({ name: '', phone: '', email: '', brand: '', model: '', year: '', mileage: '', message: '' });
      setImages([]);
    } catch (e) { toast.error('Fout bij verzenden'); }
    finally { setBusy(false); }
  };

  return (
    <section className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold gold-text mb-3">{t(lang, 'sell.title')}</h1>
        <p className="text-white/60">{t(lang, 'sell.subtitle')}</p>
      </div>
      <form onSubmit={submit} className="glass rounded-xl p-8 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div><Label className="text-white/80">{t(lang, 'sell.name')} *</Label><Input value={form.name} onChange={upd('name')} required className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label className="text-white/80">{t(lang, 'sell.phone')} *</Label><Input value={form.phone} onChange={upd('phone')} required className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div className="md:col-span-2"><Label className="text-white/80">{t(lang, 'sell.email')}</Label><Input type="email" value={form.email} onChange={upd('email')} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label className="text-white/80">{t(lang, 'sell.brand')}</Label><Input value={form.brand} onChange={upd('brand')} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label className="text-white/80">{t(lang, 'sell.model')}</Label><Input value={form.model} onChange={upd('model')} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label className="text-white/80">{t(lang, 'sell.year')}</Label><Input value={form.year} onChange={upd('year')} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label className="text-white/80">{t(lang, 'sell.mileage')}</Label><Input value={form.mileage} onChange={upd('mileage')} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
        </div>
        <div><Label className="text-white/80">{t(lang, 'sell.message')}</Label><Textarea value={form.message} onChange={upd('message')} rows={4} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
        <div>
          <Label className="text-white/80">{t(lang, 'sell.photos')}</Label>
          <input type="file" multiple accept="image/*" onChange={onFiles} className="mt-1.5 block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#f3d57a] file:cursor-pointer" />
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {images.map((im, i) => (
                <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                  <img src={im} className="w-full h-full object-cover" alt="" />
                  <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white text-xs flex items-center justify-center">×</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" disabled={busy} className="w-full btn-gold border-0 py-6 rounded-md uppercase tracking-wider font-semibold">
          {busy ? t(lang, 'sell.uploading') : (<><Send className="w-4 h-4 mr-2" />{t(lang, 'sell.submit')}</>)}
        </Button>
      </form>
    </section>
  );
};

// ============ SERVICES ============
export const ServicesView = ({ lang }) => {
  const services = [
    { icon: Shield, title: t(lang, 'services.s1'), intro: t(lang, 'services.s1d'), desc: t(lang, 'services.s1l') },
    { icon: Truck, title: t(lang, 'services.s2'), intro: t(lang, 'services.s2d'), desc: t(lang, 'services.s2l') },
    { icon: AlertCircle, title: t(lang, 'services.s3'), intro: t(lang, 'services.s3d'), desc: t(lang, 'services.s3l') },
    { icon: Wrench, title: t(lang, 'services.s4'), intro: t(lang, 'services.s4d'), desc: t(lang, 'services.s4l') },
  ];
  return (
    <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#d4af37]" />
          <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase">Services</span>
          <div className="h-px w-12 bg-[#d4af37]" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold gold-text mb-4">{t(lang, 'services.title')}</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">{t(lang, 'services.subtitle')}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((s, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 p-8 sm:p-10 transition-all duration-500 hover:border-[#d4af37]/50 hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.25)]"
          >
            {/* Decorative gold accent corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#d4af37]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            {/* Service number */}
            <div className="absolute top-6 right-6 text-7xl font-black text-[#d4af37]/[0.08] leading-none pointer-events-none select-none">0{i + 1}</div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center mb-6 group-hover:border-[#d4af37] transition-colors duration-500">
                <s.icon className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-[#d4af37] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-white/80 text-base font-medium mb-4 leading-relaxed">{s.intro}</p>
              <div className="h-px w-12 bg-[#d4af37]/40 mb-4 group-hover:w-20 transition-all duration-500" />
              <p className="text-white/60 text-sm sm:text-[15px] leading-relaxed">{s.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTA strip below services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 glass-gold rounded-2xl p-8 sm:p-10 text-center"
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-3"><span className="gold-text">YANUSH Cars</span> — {t(lang, 'nav.contact')}</h3>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">{t(lang, 'services.subtitle')}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md uppercase tracking-wider text-sm font-semibold transition-all inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href={`tel:${SITE.phoneIntl}`} className="px-6 py-3 btn-outline-gold rounded-md uppercase tracking-wider text-sm inline-flex items-center gap-2">
            <Phone className="w-4 h-4" /> {SITE.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// ============ COUNT UP HOOK ============
const useCountUp = (target, duration = 1800, trigger = true) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    if (target === 0) { setValue(0); return; }
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return value;
};

// Parse a stat label like "5+", "100+", "24/7" into { num, suffix }
const parseStat = (raw) => {
  const s = String(raw).trim();
  if (s === '24/7' || s === '7/24') return { num: 24, suffix: s === '24/7' ? '/7' : '/24', renderPrefix: '' };
  const m = s.match(/^(\d+)(.*)$/);
  if (m) return { num: parseInt(m[1], 10), suffix: m[2], renderPrefix: '' };
  return { num: 0, suffix: s, renderPrefix: '' };
};

const StatCounter = ({ value, label, delay = 0, inView }) => {
  const parsed = parseStat(value);
  const animated = useCountUp(parsed.num, 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass-gold rounded-2xl p-6 sm:p-8 text-center group hover:border-[#d4af37] transition-all duration-500 hover:-translate-y-1"
    >
      <div className="text-5xl sm:text-6xl font-black gold-text leading-none">
        {animated}{parsed.suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/60 mt-3 uppercase tracking-wider leading-snug">{label}</div>
    </motion.div>
  );
};

// ============ ABOUT ============
export const AboutView = ({ lang }) => {
  const [statsInView, setStatsInView] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('about-stats');
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) setStatsInView(true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const strengths = [
    { icon: Award, t: t(lang, 'about.st1t'), d: t(lang, 'about.st1d') },
    { icon: Shield, t: t(lang, 'about.st2t'), d: t(lang, 'about.st2d') },
    { icon: Star, t: t(lang, 'about.st3t'), d: t(lang, 'about.st3d') },
    { icon: MessageCircle, t: t(lang, 'about.st4t'), d: t(lang, 'about.st4d') },
  ];
  const stats = [
    { v: t(lang, 'about.stat1v'), l: t(lang, 'about.stat1l') },
    { v: t(lang, 'about.stat2v'), l: t(lang, 'about.stat2l') },
    { v: t(lang, 'about.stat3v'), l: t(lang, 'about.stat3l') },
    { v: t(lang, 'about.stat4v'), l: t(lang, 'about.stat4l') },
  ];
  const process = [
    { t: t(lang, 'about.pr1t'), d: t(lang, 'about.pr1d') },
    { t: t(lang, 'about.pr2t'), d: t(lang, 'about.pr2d') },
    { t: t(lang, 'about.pr3t'), d: t(lang, 'about.pr3d') },
    { t: t(lang, 'about.pr4t'), d: t(lang, 'about.pr4d') },
  ];
  const gallery = [
    { src: '/about/showroom.jpg', label: 'Showroom' },
    { src: '/about/inspection.jpg', label: 'Inspection' },
    { src: '/about/handover.jpg', label: 'Delivery' },
    { src: '/about/garage.jpg', label: 'Workshop' },
  ];

  return (
    <>
      {/* HERO / INTRO */}
      <section className="pt-32 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase">YANUSH Cars</span>
            <div className="h-px w-12 bg-[#d4af37]" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gold-text mb-6">{t(lang, 'about.title')}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">{t(lang, 'about.lead')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 sm:p-10 mt-12 space-y-5 text-white/75 leading-relaxed"
        >
          <p className="text-lg text-white">{t(lang, 'about.p1')}</p>
          <p>{t(lang, 'about.p2')}</p>
          <p>{t(lang, 'about.p3')}</p>
        </motion.div>
      </section>

      {/* STRENGTHS */}
      <section className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold gold-text mb-3">{t(lang, 'about.strengthsTitle')}</h2>
            <p className="text-white/60 max-w-xl mx-auto">{t(lang, 'about.strengthsSub')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group glass rounded-2xl p-6 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(212,175,55,0.3)]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center mb-4 group-hover:border-[#d4af37] transition-colors">
                  <s.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <h3 className="font-bold text-white text-base mb-2 group-hover:text-[#d4af37] transition-colors">{s.t}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS COUNTERS */}
      <section id="about-stats" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold gold-text mb-3">{t(lang, 'about.statsTitle')}</h2>
            <p className="text-white/60">{t(lang, 'about.statsSub')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <StatCounter key={i} value={s.v} label={s.l} delay={i * 0.1} inView={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / APPROACH */}
      <section className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold gold-text mb-3">{t(lang, 'about.processTitle')}</h2>
            <p className="text-white/60">{t(lang, 'about.processSub')}</p>
          </div>
          <div className="relative">
            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent -translate-x-1/2" />
            <div className="space-y-8 md:space-y-12">
              {process.map((p, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.05 * i }}
                    className={`relative md:grid md:grid-cols-2 gap-8 items-center ${isLeft ? '' : 'md:[direction:rtl]'}`}
                  >
                    {/* Dot on the line */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-[#d4af37] ring-4 ring-black shadow-[0_0_20px_rgba(212,175,55,0.7)]" />
                    </div>
                    <div className={`${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:[direction:ltr]'}`}>
                      <div className="glass rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#d4af37]/40 transition-colors duration-500">
                        <div className="flex items-center gap-3 mb-3" style={isLeft ? { justifyContent: 'flex-end' } : {}}>
                          <span className="text-3xl font-black gold-text leading-none">{String(i + 1).padStart(2, '0')}</span>
                          <h3 className="text-xl font-bold text-white">{p.t}</h3>
                        </div>
                        <p className="text-sm text-white/65 leading-relaxed">{p.d}</p>
                      </div>
                    </div>
                    <div /> {/* placeholder for other side */}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-gold rounded-2xl p-8 sm:p-12 text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">{t(lang, 'hero.title')}</h3>
            <p className="text-white/70 mb-7 max-w-xl mx-auto">{t(lang, 'about.lead')}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md uppercase tracking-wider text-sm font-semibold transition-all inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href={`tel:${SITE.phoneIntl}`} className="px-6 py-3 btn-outline-gold rounded-md uppercase tracking-wider text-sm inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ============ CONTACT ============
export const ContactView = ({ lang }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setBusy(true);
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      toast.success(t(lang, 'contact.sent'));
      setForm({ name: '', email: '', message: '' });
    } catch { toast.error('Error'); }
    finally { setBusy(false); }
  };
  return (
    <section className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold gold-text mb-3">{t(lang, 'contact.title')}</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="glass rounded-xl p-6 flex gap-4">
            <MapPin className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
            <div><div className="text-xs uppercase tracking-wider text-white/50 mb-1">{t(lang, 'contact.address')}</div><div className="font-semibold">{SITE.address}</div></div>
          </div>
          <div className="glass rounded-xl p-6 flex gap-4">
            <Phone className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
            <div><div className="text-xs uppercase tracking-wider text-white/50 mb-1">{t(lang, 'contact.phone')}</div><a href={`tel:${SITE.phoneIntl}`} className="font-semibold hover:text-[#d4af37]">{SITE.phone}</a></div>
          </div>
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-6 flex gap-4 hover:border-green-500/50 border border-white/10 transition-colors">
            <MessageCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div><div className="text-xs uppercase tracking-wider text-white/50 mb-1">{t(lang, 'contact.whatsapp')}</div><div className="font-semibold">{SITE.phoneIntl}</div></div>
          </a>
          <div className="glass rounded-xl p-6 flex gap-4">
            <Mail className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
            <div><div className="text-xs uppercase tracking-wider text-white/50 mb-1">{t(lang, 'contact.vat')}</div><div className="font-semibold">{SITE.vat}</div></div>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
            <iframe src={SITE.mapsEmbed} className="w-full h-full" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <form onSubmit={submit} className="glass rounded-xl p-8 space-y-5">
          <div><Label className="text-white/80">{t(lang, 'contact.name')}</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label className="text-white/80">{t(lang, 'contact.email')}</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <div><Label className="text-white/80">{t(lang, 'contact.message')}</Label><Textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 bg-black/50 border-white/10 focus:border-[#d4af37]" /></div>
          <Button type="submit" disabled={busy} className="w-full btn-gold border-0 py-6 rounded-md uppercase tracking-wider font-semibold">
            <Send className="w-4 h-4 mr-2" /> {t(lang, 'contact.send')}
          </Button>
        </form>
      </div>
    </section>
  );
};
