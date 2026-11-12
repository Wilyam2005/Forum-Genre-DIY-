import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, Clock, Filter, ChevronDown } from 'lucide-react';
import { FLAGSHIP_PROGRAMS } from '../../data/programsData';
import { ProgramTimeline } from './ProgramTimeline';
import { Card3D } from '../common/Card3D';
import { sounds } from '../../utils/soundEffects';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Division filter pills — warna sesuai identitas divisi
const DIVISION_FILTERS = [
  { id: 'all',    label: 'Semua Program',  color: 'bg-slate-900 text-white border-slate-900' },
  { id: 'BPH',   label: 'BPH',            color: 'bg-amber-500 text-slate-950 border-amber-500' },
  { id: 'P4M',   label: 'P4M',            color: 'bg-sky-500 text-white border-sky-500' },
  { id: 'EKRAF', label: 'EKRAF',          color: 'bg-emerald-500 text-white border-emerald-500' },
  { id: 'MEDKOM',label: 'MEDKOM',         color: 'bg-cyan-500 text-white border-cyan-500' },
  { id: 'HUMAS', label: 'HUMAS',          color: 'bg-pink-500 text-white border-pink-500' },
  { id: 'PSDM',  label: 'PSDM',          color: 'bg-purple-500 text-white border-purple-500' },
];

// Badge color per division (category field)
const getCategoryBadge = (cat: string): string => {
  switch (cat) {
    case 'BPH':    return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'P4M':    return 'bg-sky-50 text-sky-900 border-sky-200';
    case 'EKRAF':  return 'bg-emerald-50 text-emerald-900 border-emerald-200';
    case 'MEDKOM': return 'bg-cyan-50 text-cyan-900 border-cyan-200';
    case 'HUMAS':  return 'bg-pink-50 text-pink-900 border-pink-200';
    case 'PSDM':   return 'bg-purple-50 text-purple-900 border-purple-200';
    default:       return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

// Status badge style
const getStatusBadge = (status: string): string => {
  switch (status) {
    case 'Selesai':          return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'Sedang Berjalan':  return 'bg-sky-50 text-sky-800 border-sky-200';
    case 'Mendatang':        return 'bg-slate-100 text-slate-600 border-slate-200';
    default:                 return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export const ProgramsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flagship' | 'timeline'>('flagship');
  const [activeDivFilter, setActiveDivFilter] = useState<string>('all');
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const updateCompactLayout = (event: MediaQueryListEvent) => setIsCompact(event.matches);
    setIsCompact(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateCompactLayout);
    return () => mediaQuery.removeEventListener('change', updateCompactLayout);
  }, []);

  const filteredPrograms = useMemo(() => {
    if (activeDivFilter === 'all') return FLAGSHIP_PROGRAMS;
    return FLAGSHIP_PROGRAMS.filter((p) => p.category === activeDivFilter);
  }, [activeDivFilter]);

  return (
    <section
      id="programs"
      className="relative py-14 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ambient decorative blobs */}
      <div className="absolute -top-24 right-0 w-80 h-80 bg-sky-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-amber-200"
        >
          <Zap className="w-4 h-4 text-amber-600" />
          <span>Aksi & Inovasi Nyata</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-display"
        >
          Program Kerja Unggulan &{' '}
          <span className="text-[#008dd3]">Roadmap 2025 — 2027</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed"
        >
          Agenda strategis 6 divisi penggerak Kabinet AnomAdiwarna — berorientasi dampak nyata bagi remaja di 5 Kabupaten/Kota se-Daerah Istimewa Yogyakarta.
        </motion.p>
      </div>

      <button
        type="button"
        aria-expanded={!isCompact || isExpanded}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className="lg:hidden relative z-10 mb-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white px-4 py-3.5 text-left shadow-sm transition-colors hover:border-[#008dd3] hover:bg-sky-50"
      >
        <span>
          <span className="block text-sm font-extrabold text-slate-900">Lihat program kerja</span>
          <span className="mt-0.5 block text-xs font-medium text-slate-500">Program unggulan dan timeline kegiatan</span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[#008dd3] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
      {(!isCompact || isExpanded) && (
      <motion.div
        id="programs-content"
        initial={isCompact ? { height: 0, opacity: 0 } : false}
        animate={{ height: 'auto', opacity: 1 }}
        exit={isCompact ? { height: 0, opacity: 0 } : undefined}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        {/* View Mode Switcher */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex max-w-full flex-wrap justify-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner gap-1"
          >
            <button
              onClick={() => { sounds.playClick(); setActiveTab('flagship'); }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'flagship'
                  ? 'bg-slate-900 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Program Kerja
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveTab('timeline'); }}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'timeline'
                  ? 'bg-slate-900 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Timeline Kegiatan
            </button>
          </motion.div>
        </div>

      {/* Division Filter Pills (only for flagship) */}
      <AnimatePresence>
        {activeTab === 'flagship' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10 relative z-10"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter Divisi:</span>
            </div>
            {DIVISION_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => { sounds.playClick(); setActiveDivFilter(f.id); }}
                onMouseEnter={() => sounds.playHover()}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold border transition-all duration-200 ${
                  activeDivFilter === f.id
                    ? `${f.color} scale-105 shadow-sm`
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {f.label}
                {f.id !== 'all' && (
                  <span className={`ml-1.5 text-[10px] font-bold ${
                    activeDivFilter === f.id ? 'opacity-80' : 'text-slate-400'
                  }`}>
                    {FLAGSHIP_PROGRAMS.filter((p) => p.category === f.id).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      {activeTab === 'flagship' ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDivFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 relative z-10"
          >
            {filteredPrograms.length > 0 ? filteredPrograms.map((program) => (
              <motion.div key={program.id} variants={cardVariants}>
                <Card3D maxTilt={8} glareOpacity={0.18} className="h-full">
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:border-amber-300/80 transition-all duration-300 flex flex-col justify-between h-full [transform-style:preserve-3d]">
                    <div>
                      {/* Header: Division Badge + Quarter */}
                      <div className="flex items-center justify-between mb-3 [transform:translateZ(20px)]">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getCategoryBadge(program.category)}`}>
                          {program.category}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                          {program.quarter}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 hover:text-amber-600 transition-colors font-display leading-snug [transform:translateZ(30px)]">
                        {program.title}
                      </h3>
                      <p className="text-xs text-sky-700 font-bold mt-1 [transform:translateZ(25px)]">
                        {program.tagline}
                      </p>
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed font-normal [transform:translateZ(20px)]">
                        {program.description}
                      </p>

                      {/* Impact Metrics */}
                      <div className="mt-5 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center [transform:translateZ(25px)]">
                        {program.impactMetrics.map((metric, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-xs sm:text-sm font-black text-slate-900 font-mono leading-tight">
                              {metric.value}
                            </span>
                            <span className="text-[10px] text-slate-500 mt-0.5 leading-tight font-semibold">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="mt-4 space-y-1.5 [transform:translateZ(20px)]">
                        {program.highlights.slice(0, 3).map((hl, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="font-medium">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Pelaksana + Status */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs [transform:translateZ(15px)]">
                      <span className="text-slate-500 font-medium">
                        Pelaksana: <strong className="text-slate-800">{program.division}</strong>
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusBadge(program.status)}`}>
                        {program.status}
                      </span>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            )) : (
              <div className="col-span-3 py-16 text-center text-slate-500 text-sm font-semibold">
                Tidak ada program untuk filter ini.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl mx-auto py-6 relative z-10"
        >
          <ProgramTimeline />
        </motion.div>
      )}
      </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
};
