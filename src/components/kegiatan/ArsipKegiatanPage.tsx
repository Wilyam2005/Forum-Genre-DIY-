import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, LayoutGrid, List, Newspaper,
  Calendar, MapPin, Tag, TrendingUp, Sparkles, Filter
} from 'lucide-react';
import type { Kegiatan, KategoriKegiatan } from '../../types/kegiatan';
import { KATEGORI_COLORS } from '../../types/kegiatan';
import { kegiatanStore } from '../../utils/kegiatanStore';
import { KegiatanCard } from './KegiatanCard';
import { KegiatanDetailModal } from './KegiatanDetailModal';

const SEMUA_KATEGORI: Array<KategoriKegiatan | 'Semua'> = [
  'Semua', 'Seminar', 'Workshop', 'Pelatihan', 'Kampanye', 'Sosial', 'Lomba', 'Kunjungan', 'Rapat', 'Lainnya',
];

interface ArsipKegiatanPageProps {
  onBackToHome?: () => void;
}

export const ArsipKegiatanPage: React.FC<ArsipKegiatanPageProps> = ({ onBackToHome }) => {
  const [all, setAll] = useState<Kegiatan[]>([]);
  const [loadError, setLoadError] = useState('');
  const [filtered, setFiltered] = useState<Kegiatan[]>([]);
  const [selectedKat, setSelectedKat] = useState<KategoriKegiatan | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [selected, setSelected] = useState<Kegiatan | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  const refresh = useCallback(async () => {
    const data = await kegiatanStore.getPublished();
    setAll(data);
    setLoadError('');
  }, []);

  useEffect(() => {
    refresh().catch((reason: unknown) => {
      console.error('Gagal memuat arsip berita dan kegiatan:', reason);
      setLoadError('Arsip berita dan kegiatan belum dapat dimuat.');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Read URL param for initial category filter if any
    const params = new URLSearchParams(window.location.search);
    const katParam = params.get('kategori');
    if (katParam && SEMUA_KATEGORI.includes(katParam as any)) {
      setSelectedKat(katParam as KategoriKegiatan);
    }
  }, [refresh]);

  useEffect(() => {
    let result = [...all];
    if (selectedKat !== 'Semua') {
      result = result.filter(k => k.kategori === selectedKat);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(k =>
        k.judul.toLowerCase().includes(q) ||
        k.ringkasan.toLowerCase().includes(q) ||
        k.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [all, selectedKat, searchQuery]);

  const openKegiatan = (item: Kegiatan) => {
    const idx = filtered.findIndex(k => k.id === item.id);
    setSelected(item);
    setSelectedIdx(idx >= 0 ? idx : 0);
  };

  const navigate = (dir: 'prev' | 'next') => {
    const newIdx = dir === 'prev' ? selectedIdx - 1 : selectedIdx + 1;
    if (newIdx >= 0 && newIdx < filtered.length) {
      setSelected(filtered[newIdx]);
      setSelectedIdx(newIdx);
    }
  };

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* ── Top Header Bar ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#008dd3]" />
            <span>Kembali ke Beranda</span>
          </button>

          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-9">
              <img
                src="/LOGO GENRE.png"
                alt="Logo Genre DIY"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 hidden sm:inline">
              Genre <span className="text-amber-500">DIY</span>
            </span>
          </a>

          {/* Badge Portal Arsip */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#008dd3]/10 border border-[#008dd3]/20 text-[#008dd3] text-xs font-bold">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Portal Berita & Kegiatan</span>
          </div>
        </div>
      </header>

      {/* ── Hero Headline Arsip ── */}
      <div className="bg-gradient-to-b from-[#EBF5FB] via-white to-[#F8FAFC] pt-12 pb-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#008dd3]/30 text-[#008dd3] text-xs font-bold shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Arsip Resmi Berita & Kegiatan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Semua Berita & <span className="text-[#008dd3]">Kegiatan</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Jelajahi seluruh dokumentasi program, kegiatan sosial, seminar, workshop, dan aksi nyata Forum Genre D.I. Yogyakarta.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">

        {/* Toolbar: Search, Filters & View Switcher */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-5">

          {/* Search + View Switcher */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan judul, kata kunci, materi kegiatan..."
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
              />
            </div>

            {/* View Switcher: Grid vs Compact List */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#008dd3] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid Kartu</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'compact'
                    ? 'bg-white text-[#008dd3] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Thumbnail & Judul</span>
              </button>
            </div>
          </div>

          {/* Filter Kategori SAJA (HANYA jenis kategori, TIDAK ADA filter divisi!) */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              <Filter className="w-3.5 h-3.5 text-[#008dd3]" />
              <span>Filter Kategori Kegiatan:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SEMUA_KATEGORI.map((kat) => {
                const isActive = selectedKat === kat;
                const colors = kat !== 'Semua' ? KATEGORI_COLORS[kat as KategoriKegiatan] : null;
                return (
                  <button
                    key={kat}
                    onClick={() => setSelectedKat(kat as KategoriKegiatan | 'Semua')}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-[#008dd3] text-white border-[#008dd3] shadow-xs'
                        : colors
                        ? `${colors.bg} ${colors.text} ${colors.border} hover:opacity-85`
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {kat}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Menampilkan <strong>{filtered.length}</strong> kegiatan</span>
          {selectedKat !== 'Semua' && (
            <button
              onClick={() => setSelectedKat('Semua')}
              className="text-[#008dd3] font-bold hover:underline"
            >
              Reset Filter Kategori ({selectedKat})
            </button>
          )}
        </div>

        {/* Listing Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 text-slate-400">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p role={loadError ? 'alert' : undefined} className="font-bold text-base text-slate-700">
              {loadError || 'Tidak ada kegiatan ditemukan'}
            </p>
            {!loadError && <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci atau ubah pilihan kategori</p>}
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <KegiatanCard
                key={item.id}
                kegiatan={item}
                onClick={() => openKegiatan(item)}
                index={idx}
                variant="regular"
              />
            ))}
          </div>
        ) : (
          /* Compact View: Thumbnail & Judul Dulu */
          <div className="bg-white rounded-3xl border border-slate-200 p-3 sm:p-5 divide-y divide-slate-100">
            {filtered.map((item, idx) => (
              <KegiatanCard
                key={item.id}
                kegiatan={item}
                onClick={() => openKegiatan(item)}
                index={idx}
                variant="compact"
              />
            ))}
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
          <p>© {new Date().getFullYear()} Forum Genre D.I. Yogyakarta • Kabinet AnomAdiwarna 2025–2027.</p>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="font-extrabold text-[#008dd3] bg-[#008dd3]/10 px-2.5 py-0.5 rounded-full border border-[#008dd3]/20">
            @By:Webtagons
          </span>
        </div>
      </footer>

      {/* Modal Detail Kegiatan */}
      {selected && (
        <KegiatanDetailModal
          kegiatan={selected}
          onClose={() => setSelected(null)}
          onNavigate={navigate}
          hasPrev={selectedIdx > 0}
          hasNext={selectedIdx < filtered.length - 1}
        />
      )}
    </div>
  );
};
