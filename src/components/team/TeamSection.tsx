import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Info, ChevronDown } from 'lucide-react';
import { MEMBERS, DIVISIONS } from '../../data/cabinetData';
import { Member } from '../../types';
import { Roster3DCard } from './Roster3DCard';
import { DivisionSelector } from './DivisionSelector';
import { MemberDetailModal } from './MemberDetailModal';
import { Card3D } from '../common/Card3D';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const TeamSection: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
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

  // Active Division metadata
  const currentDivisionInfo = useMemo(() => {
    if (activeDivision === 'all') return null;
    return DIVISIONS.find((d) => d.id === activeDivision) || null;
  }, [activeDivision]);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return MEMBERS.filter((member) => {
      const matchesDivision =
        activeDivision === 'all' || member.divisionId === activeDivision;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.divisionName.toLowerCase().includes(query) ||
        (member.subDivision && member.subDivision.toLowerCase().includes(query));

      return matchesDivision && matchesSearch;
    });
  }, [activeDivision, searchQuery]);

  return (
    <section id="team" className="relative py-14 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-slate-200"
        >
          <Users className="w-4 h-4 text-sky-600" />
          <span>Jajaran Pengurus Resmi</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display"
        >
          Galeri Anggota Kabinet{' '}
          <span className="text-amber-600">AnomAdiwarna</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-slate-600 font-normal"
        >
          Dokumentasi poster resmi 45 insan muda Kabinet AnomAdiwarna. Hover kartu untuk merasakan tilt 3D interaktif — klik tombol putar untuk flip detail anggota.
        </motion.p>
      </div>

      <button
        type="button"
        aria-expanded={!isCompact || isExpanded}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className="lg:hidden relative z-10 mb-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white px-4 py-3.5 text-left shadow-sm transition-colors hover:border-[#008dd3] hover:bg-sky-50"
      >
        <span>
          <span className="block text-sm font-extrabold text-slate-900">Lihat galeri anggota</span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[#008dd3] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
      {(!isCompact || isExpanded) && (
      <motion.div
        id="team-gallery-content"
        initial={isCompact ? { height: 0, opacity: 0 } : false}
        animate={{ height: 'auto', opacity: 1 }}
        exit={isCompact ? { height: 0, opacity: 0 } : undefined}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
      {/* Search and Division Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="flex flex-col items-center gap-6 mb-12 relative z-10"
      >
        {/* Search Input Box */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama anggota, jabatan, atau divisi..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 text-sm text-slate-800 placeholder-slate-400 transition-all outline-none shadow-soft hover:shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Division Filter Badges */}
        <DivisionSelector
          activeDivision={activeDivision}
          onSelectDivision={setActiveDivision}
          totalMembers={MEMBERS.length}
        />
      </motion.div>

      {/* Active Division Banner Showcase — now with 3D Card tilt */}
      <AnimatePresence mode="wait">
        {currentDivisionInfo && (
          <motion.div
            key={currentDivisionInfo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-12 relative z-10"
          >
            <Card3D maxTilt={6} glareOpacity={0.12}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center gap-6 shadow-soft [transform-style:preserve-3d]">
                <div className="w-full md:w-44 h-44 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50 relative group [transform:translateZ(30px)]">
                  <img
                    src={currentDivisionInfo.groupImage}
                    alt={`Divisi ${currentDivisionInfo.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] text-amber-300 font-mono font-bold">
                      Poster ({currentDivisionInfo.shortName})
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left [transform:translateZ(20px)]">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${currentDivisionInfo.badgeColor}`}>
                      {currentDivisionInfo.shortName}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {currentDivisionInfo.memberCount} Anggota Terdaftar
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-display">
                    {currentDivisionInfo.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {currentDivisionInfo.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    {currentDivisionInfo.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-sky-800 font-bold hover:bg-sky-50 hover:border-sky-200 transition-colors"
                      >
                        ✓ {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Roster Card Grid with Stagger Reveal */}
      {filteredMembers.length > 0 ? (
        <motion.div
          key={activeDivision + searchQuery}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10"
        >
          {filteredMembers.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Roster3DCard
                member={member}
                onSelect={setSelectedMember}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center rounded-3xl bg-white border border-slate-200 p-8 shadow-soft relative z-10"
        >
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-800">Tidak ada anggota yang cocok</h4>
          <p className="text-sm text-slate-500 mt-1">
            Coba ubah kata kunci pencarian "{searchQuery}" atau pilih kategori divisi lain.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveDivision('all'); }}
            className="mt-4 px-5 py-2.5 rounded-full bg-slate-900 text-white font-extrabold text-xs shadow-sm hover:bg-slate-800 transition-colors"
          >
            Tampilkan Semua Anggota
          </button>
        </motion.div>
      )}

      </motion.div>
      )}
      </AnimatePresence>

      {/* Member Detail Modal */}
      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
};
