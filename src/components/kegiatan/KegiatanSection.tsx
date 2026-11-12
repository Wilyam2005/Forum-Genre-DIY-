import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper, ExternalLink, Sparkles, TrendingUp
} from 'lucide-react';
import type { Kegiatan, KategoriKegiatan } from '../../types/kegiatan';
import { KATEGORI_COLORS } from '../../types/kegiatan';
import { kegiatanStore } from '../../utils/kegiatanStore';
import { KegiatanCard } from './KegiatanCard';
import { KegiatanDetailModal } from './KegiatanDetailModal';

interface KegiatanSectionProps {
  requestedKegiatanId?: string | null;
  onRequestedKegiatanOpened?: () => void;
}

export const KegiatanSection: React.FC<KegiatanSectionProps> = ({
  requestedKegiatanId,
  onRequestedKegiatanOpened,
}) => {
  const [all, setAll] = useState<Kegiatan[]>([]);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState<Kegiatan | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  const refresh = useCallback(async () => {
    const data = await kegiatanStore.getPublished();
    setAll(data);
    setLoadError('');
  }, []);

  useEffect(() => {
    refresh().catch((reason: unknown) => {
      console.error('Gagal memuat berita dan kegiatan:', reason);
      setLoadError('Berita dan kegiatan belum dapat dimuat. Silakan coba lagi nanti.');
    });
  }, [refresh]);

  // Top 3 items for the left column (1 Atas, 2 Bawah)
  const featuredItem = all[0] || null;
  const subItems = all.slice(1, 3);
  const hasMore = all.length > 3;

  // Sidebar items
  const latestKegiatan = all.slice(0, 4);

  const openKegiatan = useCallback((item: Kegiatan) => {
    const idx = all.findIndex(k => k.id === item.id);
    setSelected(item);
    setSelectedIdx(idx >= 0 ? idx : 0);
  }, [all]);

  useEffect(() => {
    if (!requestedKegiatanId || all.length === 0) return;
    const requestedKegiatan = all.find((item) => item.id === requestedKegiatanId);
    if (requestedKegiatan) openKegiatan(requestedKegiatan);
    onRequestedKegiatanOpened?.();
  }, [requestedKegiatanId, all, onRequestedKegiatanOpened, openKegiatan]);

  const navigate = (dir: 'prev' | 'next') => {
    const newIdx = dir === 'prev' ? selectedIdx - 1 : selectedIdx + 1;
    if (newIdx >= 0 && newIdx < all.length) {
      setSelected(all[newIdx]);
      setSelectedIdx(newIdx);
    }
  };

  return (
    <section id="kegiatan" className="relative py-20 sm:py-28 bg-gradient-to-b from-[#F0F9FF] via-white to-[#F8FAFC] overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#008dd3]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#008dd3]/10 border border-[#008dd3]/25 text-[#008dd3] text-xs font-bold uppercase tracking-widest mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            Pusat Informasi Kegiatan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display leading-tight">
            Kegiatan <span className="text-[#008dd3]">Genre DIY</span>
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Dokumentasi lengkap seluruh program, aksi nyata, dan kabar terkini Forum Genre D.I. Yogyakarta.
          </p>
        </motion.div>

        {all.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p role={loadError ? 'alert' : undefined} className="font-semibold">
              {loadError || 'Belum ada kegiatan yang dipublikasikan'}
            </p>
          </div>
        ) : (
          /* ── GRID UTAMA: 2/3 KOLOM KIRI (3 BANNER) + 1/3 KOLOM KANAN (SIDEBAR) ── */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* ── KOLOM KIRI: 1 ATAS + 2 BAWAH + TOMBOL ARAH KE TAB LAIN ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* 1. Item Atas (Featured Headline) */}
              {featuredItem && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <KegiatanCard
                    kegiatan={featuredItem}
                    onClick={() => openKegiatan(featuredItem)}
                    index={0}
                    variant="featured"
                  />
                </motion.div>
              )}

              {/* 2. Dua Item Bawah (2 Kolom Berdampingan) */}
              {subItems.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {subItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (idx + 1) * 0.1 }}
                    >
                      <KegiatanCard
                        kegiatan={item}
                        onClick={() => openKegiatan(item)}
                        index={idx + 1}
                        variant="regular"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 3. Tombol Baca Berita Lainnya -> Membuka tab lain (arsip berita) */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="pt-2"
                >
                  <a
                    href="?view=arsip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#008dd3] hover:bg-[#0079b8] text-white font-extrabold text-sm tracking-wide shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Lihat Semua Berita & Kegiatan Lainnya ({all.length})</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </motion.div>
              )}

            </div>

            {/* ── KOLOM KANAN: SIDEBAR SAMPING ── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm sticky top-24 space-y-6"
              >
                {/* Header Sidebar: Kegiatan Terbaru */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-[#008dd3]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                      Kegiatan Terbaru
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {latestKegiatan.map((item, i) => (
                      <KegiatanCard
                        key={item.id}
                        kegiatan={item}
                        onClick={() => openKegiatan(item)}
                        index={i}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>

                {/* Bagian Per Kategori (Hanya jenis kategori, tanpa divisi) */}
                <div className="pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Per Kategori
                  </h4>
                  <div className="space-y-1.5">
                    {Object.entries(
                      all.reduce((acc, k) => {
                        acc[k.kategori] = (acc[k.kategori] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([kat, count]) => {
                      const c = KATEGORI_COLORS[kat as KategoriKegiatan];
                      return (
                        <a
                          key={kat}
                          href={`?view=arsip&kategori=${encodeURIComponent(kat)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between text-xs hover:bg-slate-50 rounded-xl px-2.5 py-1.5 transition-all group"
                        >
                          <span className={`font-semibold ${c.text} group-hover:underline`}>
                            {kat}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                            {count}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        )}
      </div>

      {/* Modal Detail Kegiatan */}
      {selected && (
        <KegiatanDetailModal
          kegiatan={selected}
          onClose={() => setSelected(null)}
          onNavigate={navigate}
          hasPrev={selectedIdx > 0}
          hasNext={selectedIdx < all.length - 1}
        />
      )}
    </section>
  );
};
