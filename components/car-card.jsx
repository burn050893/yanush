'use client';
import { motion } from 'framer-motion';
import { Calendar, Gauge, Fuel, Settings, MessageCircle, ChevronRight } from 'lucide-react';
import { SITE } from '@/lib/site';
import { t } from '@/lib/i18n';

const formatPrice = (p) => '€ ' + Number(p).toLocaleString('nl-BE');
const formatKm = (k) => Number(k).toLocaleString('nl-BE') + ' km';

export const CarCard = ({ car, lang, onClick }) => {
  const cover = car.images?.[0] || 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800';
  const waText = encodeURIComponent(`Hallo, ik heb interesse in de ${car.brand} ${car.model} (${car.year}) — ${formatPrice(car.price)}`);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="luxury-card group"
    >
      <button onClick={onClick} className="block w-full text-left">
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <img src={cover} alt={`${car.brand} ${car.model}`} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#d4af37]/90 text-black text-xs font-bold rounded-sm uppercase tracking-wider">
            {car.brand}
          </div>
          <div className="absolute bottom-3 right-3 text-2xl font-bold gold-text">
            {formatPrice(car.price)}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
            {car.brand} {car.model}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-white/70 mt-3 mb-4">
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" />{car.year}</div>
            <div className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-[#d4af37]" />{formatKm(car.mileage)}</div>
            <div className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5 text-[#d4af37]" />{car.fuel}</div>
            <div className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5 text-[#d4af37]" />{car.gearbox}</div>
          </div>
        </div>
      </button>
      <div className="px-5 pb-5 flex gap-2">
        <button onClick={onClick} className="flex-1 px-3 py-2.5 text-xs uppercase tracking-wider border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all rounded-md flex items-center justify-center gap-1">
          {t(lang, 'fleet.viewDetails')} <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <a href={`${SITE.whatsappUrl}?text=${waText}`} target="_blank" rel="noopener noreferrer"
          className="flex-1 px-3 py-2.5 text-xs uppercase tracking-wider bg-green-600 hover:bg-green-500 text-white rounded-md flex items-center justify-center gap-1 transition-all">
          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export { formatPrice, formatKm };
