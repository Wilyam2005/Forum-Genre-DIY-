import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Eye, ArrowRight, Tag } from 'lucide-react';
import type { Kegiatan } from '../../types/kegiatan';
import { KATEGORI_COLORS } from '../../types/kegiatan';

interface KegiatanCardProps {
  kegiatan: Kegiatan;
  onClick: () => void;
  index?: number;
  variant?: 'featured' | 'regular' | 'compact';
}

function formatTanggalPendek(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export const KegiatanCard: React.FC<KegiatanCardProps> = ({
  kegiatan,
  onClick,
  index = 0,
  variant = 'regular',
}) => {
  const kat = KATEGORI_COLORS[kegiatan.kategori];

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        onClick={onClick}
        className="group relative cursor-pointer rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 md:flex"
      >
        {/* Image */}
        <div className="relative md:w-2/5 h-52 md:h-auto overflow-hidden shrink-0 bg-slate-100">
          <img
            src={kegiatan.gambarUtama}
            alt={kegiatan.judul}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 md:block hidden" />
          {/* Kategori badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${kat.bg} ${kat.text} ${kat.border}`}>
              {kegiatan.kategori}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-5 sm:p-7 flex-1">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mb-2 flex-wrap">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#008dd3]" />{formatTanggalPendek(kegiatan.tanggal)}</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-500" />{kegiatan.lokasi}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight font-display group-hover:text-[#008dd3] transition-colors mb-2">
              {kegiatan.judul}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {kegiatan.ringkasan}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Divisi {kegiatan.divisi}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Eye className="w-3 h-3" />{kegiatan.jumlahViews}
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-[#008dd3] group-hover:gap-2 transition-all">
              Baca selengkapnya <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.06 }}
        onClick={onClick}
        className="group cursor-pointer flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <img src={kegiatan.gambarUtama} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${kat.bg} ${kat.text} ${kat.border}`}>
            {kegiatan.kategori}
          </span>
          <h4 className="text-xs font-bold text-slate-800 mt-1 leading-snug line-clamp-2 group-hover:text-[#008dd3] transition-colors">
            {kegiatan.judul}
          </h4>
          <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5" /> {formatTanggalPendek(kegiatan.tanggal)}
          </span>
        </div>
      </motion.article>
    );
  }

  // Regular card
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100 shrink-0">
        <img
          src={kegiatan.gambarUtama}
          alt={kegiatan.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${kat.bg} ${kat.text} ${kat.border}`}>
            {kegiatan.kategori}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-white/80 font-semibold">
          <Eye className="w-3 h-3" /> {kegiatan.jumlahViews}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold mb-2 flex-wrap">
          <Calendar className="w-3 h-3 text-[#008dd3]" />
          <span>{formatTanggalPendek(kegiatan.tanggal)}</span>
          <span className="text-slate-300">•</span>
          <Tag className="w-3 h-3 text-purple-400" />
          <span>{kegiatan.divisi}</span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#008dd3] transition-colors font-display mb-2">
          {kegiatan.judul}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {kegiatan.ringkasan}
        </p>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 truncate max-w-[60%]">
            <MapPin className="w-2.5 h-2.5 inline mr-1 text-amber-400" />
            {kegiatan.lokasi}
          </span>
          <span className="flex items-center gap-0.5 text-[11px] font-bold text-[#008dd3] group-hover:gap-1.5 transition-all">
            Baca <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};
