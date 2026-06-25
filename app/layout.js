import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'YANUSH Cars — Kwaliteit op wielen, vertrouwen bij elke kilometer',
  description: 'Zorgvuldig geselecteerde tweedehands voertuigen, transparante service en een persoonlijke aanpak. Bierstal 48, 9920 Lievegem.',
  keywords: 'YANUSH Cars, autohandel, premium auto, tweedehands, Lievegem, Belgium',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className="dark">
      <body className="antialiased bg-[#0a0a0a] text-white selection:bg-[#d4af37] selection:text-black">
        {children}
        <Toaster theme="dark" position="top-center" richColors />
      </body>
    </html>
  );
}
