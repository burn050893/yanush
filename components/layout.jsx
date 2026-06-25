'use client';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Menu, X, Globe, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SITE } from '@/lib/site';
import { LANGS, t } from '@/lib/i18n';

export const Header = ({ view, setView, lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { key: 'home', view: 'home' },
    { key: 'fleet', view: 'fleet' },
    { key: 'sell', view: 'sell' },
    { key: 'services', view: 'services' },
    { key: 'about', view: 'about' },
    { key: 'contact', view: 'contact' },
  ];

  const go = (v) => { setView(v); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-[#d4af37]/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-2 group">
          <img src="/yanush-logo.png" alt="YANUSH Cars" className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300" />
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <button key={n.key} onClick={() => go(n.view)}
              className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 relative group ${view === n.view ? 'text-[#d4af37]' : 'text-white/80 hover:text-[#d4af37]'}`}>
              {t(lang, `nav.${n.key}`)}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#d4af37] transition-all duration-300 ${view === n.view ? 'w-6' : 'w-0 group-hover:w-6'}`} />
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 hover:border-[#d4af37]/50 transition-colors text-sm">
              <Globe className="w-4 h-4 text-[#d4af37]" />
              <span className="font-semibold">{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black/95 backdrop-blur-xl border border-[#d4af37]/30 rounded-md overflow-hidden shadow-2xl">
                {LANGS.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#d4af37]/10 transition-colors ${lang === l.code ? 'text-[#d4af37]' : 'text-white'}`}>
                    {l.label} — {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href={`tel:${SITE.phoneIntl}`} className="hidden xl:flex items-center gap-2 text-sm text-white/70 hover:text-[#d4af37]">
            <Phone className="w-4 h-4" />{SITE.phone}
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/20 overflow-hidden">
          <div className="flex flex-col p-4 gap-2">
            {nav.map((n) => (
              <button key={n.key} onClick={() => go(n.view)} className="text-left px-4 py-3 rounded-md hover:bg-[#d4af37]/10 text-white flex items-center justify-between">
                {t(lang, `nav.${n.key}`)}<ChevronRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            ))}
            <div className="flex gap-2 mt-2 flex-wrap">
              {LANGS.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} className={`px-3 py-1 rounded text-xs border ${lang === l.code ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-white/20 text-white/70'}`}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export const Footer = ({ lang, setView }) => {
  return (
    <footer className="border-t border-[#d4af37]/20 bg-black mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/yanush-logo.png" alt="YANUSH Cars" className="h-12 w-auto object-contain" />
          </div>
          <p className="text-sm text-white/60">{t(lang, 'footer.made')}</p>
        </div>
        <div>
          <h4 className="text-[#d4af37] font-semibold mb-3 text-sm uppercase tracking-wider">{t(lang, 'nav.contact')}</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />{SITE.address}</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#d4af37]" /><a href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#d4af37]" />{SITE.email}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#d4af37] font-semibold mb-3 text-sm uppercase tracking-wider">Menu</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><button onClick={() => setView('fleet')} className="hover:text-[#d4af37]">{t(lang, 'nav.fleet')}</button></li>
            <li><button onClick={() => setView('sell')} className="hover:text-[#d4af37]">{t(lang, 'nav.sell')}</button></li>
            <li><button onClick={() => setView('services')} className="hover:text-[#d4af37]">{t(lang, 'nav.services')}</button></li>
            <li><button onClick={() => setView('about')} className="hover:text-[#d4af37]">{t(lang, 'nav.about')}</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#d4af37] font-semibold mb-3 text-sm uppercase tracking-wider">Info</h4>
          <p className="text-sm text-white/70">BTW: {SITE.vat}</p>
          <p className="text-sm text-white/70 mt-1">© {new Date().getFullYear()} YANUSH Cars</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-white/40">{t(lang, 'footer.rights')}</div>
    </footer>
  );
};

export const WhatsAppFloat = () => {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="WhatsApp"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30" />
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        </svg>
      </div>
    </a>
  );
};
