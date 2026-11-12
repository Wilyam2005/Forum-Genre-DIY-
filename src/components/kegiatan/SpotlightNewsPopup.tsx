import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Megaphone, X } from 'lucide-react';
import type { Kegiatan } from '../../types/kegiatan';

interface SpotlightNewsPopupProps {
  kegiatan: Kegiatan | null;
  onOpen: () => void;
  onClose: () => void;
}

export const SpotlightNewsPopup: React.FC<SpotlightNewsPopupProps> = ({
  kegiatan,
  onOpen,
  onClose,
}) => (
  <AnimatePresence>
    {kegiatan && (
      <motion.aside
        role="dialog"
        aria-label={`Sorotan berita: ${kegiatan.judul}`}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[150] sm:w-[min(24rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onOpen}
          className="group flex w-full items-center gap-3 p-3 pr-12 text-left hover:bg-sky-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008dd3]"
        >
          <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            {kegiatan.gambarUtama ? (
              <img src={kegiatan.gambarUtama} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[#008dd3]">
                <Megaphone className="h-6 w-6" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="mb-1 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-600">
              <Megaphone className="h-3 w-3" /> Sorotan Berita
            </span>
            <span className="block line-clamp-2 text-sm font-extrabold leading-snug text-slate-900">
              {kegiatan.judul}
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#008dd3]">
              Baca selengkapnya <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup sorotan berita"
          className="absolute right-2 top-2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008dd3]"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="h-1 bg-slate-100">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-[#008dd3] to-amber-400"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 7, ease: 'linear' }}
          />
        </div>
      </motion.aside>
    )}
  </AnimatePresence>
);
