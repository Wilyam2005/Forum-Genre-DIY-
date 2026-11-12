import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, MapPin, Eye, Tag, User, ChevronLeft,
  ChevronRight, Share2, ExternalLink, Clock, Hash
} from 'lucide-react';
import type { Kegiatan } from '../../types/kegiatan';
import { KATEGORI_COLORS } from '../../types/kegiatan';
import { kegiatanStore } from '../../utils/kegiatanStore';

interface KegiatanDetailModalProps {
  kegiatan: Kegiatan | null;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function formatKonten(konten: string): string {
  // Basic markdown-like → HTML conversion
  return konten
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-black text-slate-900 mt-6 mb-3 font-display">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-slate-800 mt-5 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-slate-700">$1</em>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono text-[#008dd3]">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="flex gap-2 items-start"><span class="text-[#008dd3] font-bold mt-0.5">•</span><span>$1</span></li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="flex gap-2 items-start"><span class="text-[#008dd3] font-bold min-w-[18px]">$1.</span><span>$2</span></li>')
    .replace(/^✅ (.+)$/gm, '<li class="flex gap-2 items-start"><span class="text-emerald-500">✅</span><span>$1</span></li>')
    .replace(/^🎭 (.+)$/gm, '<li class="flex gap-2 items-start"><span>🎭</span><span class="font-semibold">$1</span></li>')
    .replace(/^🖼️ (.+)$/gm, '<li class="flex gap-2 items-start"><span>🖼️</span><span class="font-semibold">$1</span></li>')
    .replace(/^📋 (.+)$/gm, '<li class="flex gap-2 items-start"><span>📋</span><span class="font-semibold">$1</span></li>')
    .replace(/^📱 (.+)$/gm, '<li class="flex gap-2 items-start"><span>📱</span><span class="font-semibold">$1</span></li>')
    .replace(/^🌅 (.+)$/gm, '<li class="flex gap-2 items-start"><span>🌅</span><span>$1</span></li>')
    .replace(/^🏡 (.+)$/gm, '<li class="flex gap-2 items-start"><span>🏡</span><span>$1</span></li>')
    .replace(/^🩺 (.+)$/gm, '<li class="flex gap-2 items-start"><span>🩺</span><span>$1</span></li>')
    .replace(/^🍱 (.+)$/gm, '<li class="flex gap-2 items-start"><span>🍱</span><span>$1</span></li>')
    .replace(/^🌿 (.+)$/gm, '<li class="flex gap-2 items-start"><span>🌿</span><span>$1</span></li>')
    .replace(/^🎉 (.+)$/gm, '<li class="flex gap-2 items-start"><span>🎉</span><span>$1</span></li>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return `<tr class="border-b border-slate-100">${cells.map(c => `<td class="px-3 py-2 text-sm text-slate-700">${c.trim()}</td>`).join('')}</tr>`;
    })
    .replace(/\n\n/g, '</p><p class="text-slate-600 leading-relaxed mb-3">')
    .replace(/\n/g, ' ');
}

export const KegiatanDetailModal: React.FC<KegiatanDetailModalProps> = ({
  kegiatan,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (kegiatan) {
      kegiatanStore.incrementViews(kegiatan.id).catch((reason: unknown) => {
        console.error('Gagal memperbarui jumlah tayangan berita:', reason);
      });
      setCurrentImg(0);
      scrollRef.current?.scrollTo({ top: 0 });
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [kegiatan?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate?.('prev');
      if (e.key === 'ArrowRight' && hasNext) onNavigate?.('next');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasPrev, hasNext]);

  if (!kegiatan) return null;

  const kat = KATEGORI_COLORS[kegiatan.kategori];
  const allImages = [kegiatan.gambarUtama, ...kegiatan.galeri].filter(Boolean);
  const safeLinks = (kegiatan.tautan || []).filter((link) => {
    try {
      return ['http:', 'https:'].includes(new URL(link.url).protocol);
    } catch {
      return false;
    }
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: kegiatan.judul, text: kegiatan.ringkasan, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Image Hero */}
          <div className="relative h-48 sm:h-64 shrink-0 overflow-hidden bg-slate-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={allImages[currentImg]}
                alt={kegiatan.judul}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Kategori badge on image */}
            <div className="absolute top-4 left-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${kat.bg} ${kat.text} ${kat.border}`}>
                {kegiatan.kategori}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Gallery thumbnails */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentImg ? 'bg-white scale-125' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            )}

            {/* Gallery nav arrows */}
            {allImages.length > 1 && (
              <>
                <button onClick={() => setCurrentImg(p => Math.max(0, p - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all disabled:opacity-30"
                  disabled={currentImg === 0}>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setCurrentImg(p => Math.min(allImages.length - 1, p + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all disabled:opacity-30"
                  disabled={currentImg === allImages.length - 1}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Scrollable content */}
          <div ref={scrollRef} className="overflow-y-auto flex-1 p-5 sm:p-8">
            {/* Title & meta */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-display mb-4">
              {kegiatan.judul}
            </h2>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 text-xs text-slate-600 mb-5 pb-5 border-b border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#008dd3]" />
                {formatTanggal(kegiatan.tanggal)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {kegiatan.lokasi}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {kegiatan.penulis}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {kegiatan.jumlahViews} views
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                Divisi {kegiatan.divisi}
              </span>
            </div>

            {/* Summary */}
            <p className="text-sm text-slate-700 leading-relaxed bg-[#008dd3]/5 border border-[#008dd3]/20 rounded-2xl p-4 mb-5 italic">
              {kegiatan.ringkasan}
            </p>

            {safeLinks.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {safeLinks.map((link, index) => (
                  <a
                    key={`${link.url}-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#008dd3] text-white text-sm font-bold text-center hover:bg-[#0079b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008dd3] focus-visible:ring-offset-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span className="break-words">{link.label}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Full content */}
            <div
              className="text-sm text-slate-600 leading-relaxed space-y-1 prose-custom"
              dangerouslySetInnerHTML={{ __html: formatKonten(kegiatan.konten) }}
            />

            {/* Gallery grid */}
            {kegiatan.galeri.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Galeri Foto</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {kegiatan.galeri.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImg(i + 1)}
                      className="aspect-video rounded-xl overflow-hidden border border-slate-100 hover:border-[#008dd3]/50 transition-all group">
                      <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {kegiatan.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {kegiatan.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    <Hash className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="shrink-0 px-5 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {hasPrev && (
                <button onClick={() => onNavigate?.('prev')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-[#008dd3]/40 hover:text-[#008dd3] transition-all">
                  <ChevronLeft className="w-4 h-4" /> Sebelumnya
                </button>
              )}
              {hasNext && (
                <button onClick={() => onNavigate?.('next')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-[#008dd3]/40 hover:text-[#008dd3] transition-all">
                  Berikutnya <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            <button onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#008dd3] text-white text-xs font-bold hover:bg-[#0079b8] transition-all">
              <Share2 className="w-3.5 h-3.5" /> Bagikan
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
