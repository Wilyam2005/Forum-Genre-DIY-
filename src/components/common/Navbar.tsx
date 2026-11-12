import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, MessageCircle, Settings } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const navLinkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' },
  }),
};

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Beranda', href: '#hero', id: 'hero' },
    { name: 'Filosofi', href: '#about', id: 'about' },
    { name: 'Kegiatan', href: '#kegiatan', id: 'kegiatan' },
    { name: 'Anggota & Divisi', href: '#team', id: 'team' },
    { name: 'Program Kerja', href: '#programs', id: 'programs' },
    { name: 'Kontak', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'kegiatan', 'team', 'programs', 'contact'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Scrollspy: detect which section is currently on screen
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo & Brand — 3D Floating Effect */}
          <a
            href="#hero"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ rotateY: 15, scale: 1.08 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-9 h-12 sm:w-11 sm:h-14"
            >
              <img
                src="/LOGO GENRE.png"
                alt="Logo Genre DIY"
                className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,141,211,0.25)]"
              />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-[#008dd3] transition-colors">
                  Genre <span className="text-amber-500">DIY</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                  2025-2027
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                Kabinet AnomAdiwarna
              </span>
            </div>
          </a>

          {/* Desktop Nav Links — Scrollspy Active State */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 shadow-sm backdrop-blur-sm">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navLinkVariants}
                  onClick={() => sounds.playClick()}
                  onMouseEnter={() => sounds.playHover()}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#008dd3] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center gap-2">
            {/* WhatsApp Button */}
            <a
              href="https://api.whatsapp.com/send/?phone=6288802697580&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-sm transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Follow Instagram Button */}
            <a
              href="https://instagram.com/genre_diy"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#008dd3] hover:bg-[#0079b8] text-white font-extrabold text-xs shadow-sm transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>@genre_diy</span>
            </a>

            {/* Admin access (Shift+A) */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                title="Portal Admin Kegiatan (Shift+A)"
                className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-[#008dd3] hover:border-[#008dd3]/30 transition-all"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile & Tablet Menu Button (Visible on all screens < lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka Menu Navigasi"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-5 shadow-lg"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      sounds.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-sm transition-colors ${
                      isActive
                        ? 'text-[#008dd3] bg-[#008dd3]/10 font-black'
                        : 'text-slate-700 hover:text-[#008dd3] hover:bg-slate-50 font-semibold'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                <a
                  href="https://api.whatsapp.com/send/?phone=6288802697580&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 text-white font-bold text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/genre_diy"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#008dd3] text-white font-bold text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Instagram
                </a>
                {onOpenAdmin && (
                  <button
                    onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-xs"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Admin
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
