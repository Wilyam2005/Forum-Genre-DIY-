import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Users, Award, Shield, Target, 
  Layers, CheckCircle2, ArrowRight, Sparkles 
} from 'lucide-react';
import { OFFICIAL_PROFILE } from '../../data/cabinetData';
import { Card3D } from '../common/Card3D';
import { sounds } from '../../utils/soundEffects';

export const BentoGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'filosofi' | 'fokus' | 'pilar' | 'perbedaan'>('filosofi');

  return (
    <div className="w-full space-y-10">
      
      {/* 1. Profile Overview: Definition & Organizational Architecture (Clean & Balanced, No 9-Stat Box Clutter) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Definition Card with 3D Tilt */}
        <div className="lg:col-span-6">
          <Card3D maxTilt={7} className="h-full">
            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft flex flex-col justify-between [transform-style:preserve-3d]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200 [transform:translateZ(20px)]">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>Profil Lembaga</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display [transform:translateZ(30px)]">
                  Apa Itu <span className="text-amber-600">Forum Genre</span>?
                </h3>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                  {OFFICIAL_PROFILE.about.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-semibold [transform:translateZ(25px)]">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Visi Menuju Indonesia Emas 2045
                </span>
                <span className="text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold">
                  Berdiri Sejak 2010
                </span>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Organizational Ecosystem & Hierarchy Card with 3D Tilt */}
        <div className="lg:col-span-6">
          <Card3D maxTilt={7} className="h-full">
            <div className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft flex flex-col justify-between [transform-style:preserve-3d]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-200 [transform:translateZ(20px)]">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Struktur & Jejaring Pembinaan</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display [transform:translateZ(30px)]">
                  Jejaring Gerakan <span className="text-sky-600">Terintegrasi</span>
                </h3>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                  Forum Genre D.I. Yogyakarta merupakan simpul strategis yang menghubungkan pembinaan BKKBN RI dengan jejaring remaja akar rumput di seluruh pelosok Daerah Istimewa Yogyakarta.
                </p>

                {/* Vertical Step Connection Hierarchy */}
                <div className="mt-6 space-y-2.5 [transform:translateZ(25px)]">
                  {[
                    { level: 'BKKBN RI / Genre Indonesia', desc: 'Arah Kebijakan Nasional Remaja Berencana' },
                    { level: 'Forum Genre D.I. Yogyakarta', desc: 'Penggerak & Inovator Tingkat Provinsi (Kabinet AnomAdiwarna)' },
                    { level: '5 Forum Genre Kab/Kota Se-DIY', desc: 'Sleman, Bantul, Gunungkidul, Kulon Progo, Yogyakarta' },
                    { level: 'PIK-R Sekolah & Kalurahan', desc: 'Pusat Informasi & Konseling Remaja Berbasis Komunitas' },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-amber-50/50 hover:border-amber-200 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-800 block truncate">
                          {step.level}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-semibold [transform:translateZ(20px)]">
                Membina generasi sehat, cerdas, dan ceria secara berkesinambungan.
              </div>
            </div>
          </Card3D>
        </div>

      </div>

      {/* Navigation Sub-Tabs to explore Sections from PDF */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {[
          { id: 'filosofi', label: '1. Filosofi AnomAdiwarna' },
          { id: 'fokus', label: '2. Fokus Kabinet' },
          { id: 'pilar', label: '3. Tujuan, Fungsi, Peran & Sasaran' },
          { id: 'perbedaan', label: '4. Perbedaan Duta vs Forum Genre' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveTab(tab.id as any);
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white scale-105 shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display with 3D Tilt Cards */}
      <div className="w-full">
        
        {/* --- TAB 1: FILOSOFI ANOMADIWARNA (Page 8 PDF) --- */}
        {activeTab === 'filosofi' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ANOM */}
              <Card3D maxTilt={10}>
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col justify-between [transform-style:preserve-3d]">
                  <div>
                    <span className="inline-block px-3.5 py-1 rounded-xl bg-amber-50 text-amber-900 text-xs font-black tracking-wider uppercase border border-amber-200 [transform:translateZ(25px)]">
                      {OFFICIAL_PROFILE.philosophy.anom.term}
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-3 font-display [transform:translateZ(30px)]">
                      Jiwa Muda & Agen Perubahan
                    </h4>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                      {OFFICIAL_PROFILE.philosophy.anom.meaning}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-amber-700 font-bold [transform:translateZ(15px)]">
                    Karakter: Energik & Inovatif
                  </div>
                </div>
              </Card3D>

              {/* ADI */}
              <Card3D maxTilt={10}>
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col justify-between [transform-style:preserve-3d]">
                  <div>
                    <span className="inline-block px-3.5 py-1 rounded-xl bg-sky-50 text-sky-900 text-xs font-black tracking-wider uppercase border border-sky-200 [transform:translateZ(25px)]">
                      {OFFICIAL_PROFILE.philosophy.adi.term}
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-3 font-display [transform:translateZ(30px)]">
                      Keunggulan & Keteladanan Luhur
                    </h4>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                      {OFFICIAL_PROFILE.philosophy.adi.meaning}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-sky-700 font-bold [transform:translateZ(15px)]">
                    Karakter: Berintegritas & Bermoral
                  </div>
                </div>
              </Card3D>

              {/* ADIWARNA */}
              <Card3D maxTilt={10}>
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col justify-between [transform-style:preserve-3d]">
                  <div>
                    <span className="inline-block px-3.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-black tracking-wider uppercase border border-emerald-200 [transform:translateZ(25px)]">
                      {OFFICIAL_PROFILE.philosophy.adiwarna.term}
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-3 font-display [transform:translateZ(30px)]">
                      Keindahan Keberagaman
                    </h4>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                      {OFFICIAL_PROFILE.philosophy.adiwarna.meaning}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-bold [transform:translateZ(15px)]">
                    Karakter: Harmonis & Inklusif
                  </div>
                </div>
              </Card3D>
            </div>

            {/* Keseluruhan Synthesis Banner with 3D Tilt */}
            <Card3D maxTilt={6}>
              <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl [transform-style:preserve-3d]">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-2 [transform:translateZ(20px)]">
                  Makna Keseluruhan Kabinet AnomAdiwarna
                </span>
                <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-100 [transform:translateZ(35px)]">
                  "{OFFICIAL_PROFILE.philosophy.synthesis}"
                </p>
              </div>
            </Card3D>
          </motion.div>
        )}

        {/* --- TAB 2: FOKUS KABINET (Page 9 PDF) --- */}
        {activeTab === 'fokus' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {OFFICIAL_PROFILE.cabinetFocus.map((f, idx) => (
              <Card3D key={f.id} maxTilt={9}>
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col justify-between [transform-style:preserve-3d]">
                  <div>
                    <div className="flex items-center justify-between mb-4 [transform:translateZ(20px)]">
                      <span className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 font-mono font-black flex items-center justify-center text-sm border border-amber-200">
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Fokus Strategis
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug [transform:translateZ(30px)]">
                      {f.title}
                    </h4>

                    <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                      {f.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-700 [transform:translateZ(15px)]">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Prioritas Kerja 2025 — 2027</span>
                  </div>
                </div>
              </Card3D>
            ))}
          </motion.div>
        )}

        {/* --- TAB 3: 4 PILAR POKOK (Page 5 & 6 PDF) --- */}
        {activeTab === 'pilar' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* TUJUAN */}
            <Card3D maxTilt={10}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col [transform-style:preserve-3d]">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full self-start mb-4 border border-amber-200 [transform:translateZ(25px)]">
                  TUJUAN
                </span>
                <ul className="space-y-3 text-xs text-slate-600 flex-1 font-medium [transform:translateZ(20px)]">
                  {OFFICIAL_PROFILE.pillars.tujuan.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card3D>

            {/* FUNGSI */}
            <Card3D maxTilt={10}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col [transform-style:preserve-3d]">
                <span className="text-xs font-black uppercase tracking-wider text-sky-800 bg-sky-50 px-3.5 py-1 rounded-full self-start mb-4 border border-sky-200 [transform:translateZ(25px)]">
                  FUNGSI
                </span>
                <ul className="space-y-3 text-xs text-slate-600 flex-1 font-medium [transform:translateZ(20px)]">
                  {OFFICIAL_PROFILE.pillars.fungsi.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card3D>

            {/* PERAN */}
            <Card3D maxTilt={10}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col [transform-style:preserve-3d]">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full self-start mb-4 border border-emerald-200 [transform:translateZ(25px)]">
                  PERAN
                </span>
                <ul className="space-y-3 text-xs text-slate-600 flex-1 font-medium [transform:translateZ(20px)]">
                  {OFFICIAL_PROFILE.pillars.peran.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card3D>

            {/* SASARAN */}
            <Card3D maxTilt={10}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col [transform-style:preserve-3d]">
                <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-3.5 py-1 rounded-full self-start mb-4 border border-purple-200 [transform:translateZ(25px)]">
                  SASARAN
                </span>
                <ul className="space-y-3 text-xs text-slate-600 flex-1 font-medium [transform:translateZ(20px)]">
                  {OFFICIAL_PROFILE.pillars.sasaran.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card3D>
          </motion.div>
        )}

        {/* --- TAB 4: PERBEDAAN DUTA GENRE VS FORUM GENRE (Page 10 PDF) --- */}
        {activeTab === 'perbedaan' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* FORUM GENRE */}
            <Card3D maxTilt={8}>
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col justify-between [transform-style:preserve-3d]">
                <div>
                  <div className="flex items-center gap-2 mb-3 [transform:translateZ(25px)]">
                    <Users className="w-6 h-6 text-amber-600" />
                    <h4 className="text-xl font-black text-slate-900 font-display">
                      FORUM GENRE
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                    {OFFICIAL_PROFILE.distinction.forumGenre.desc}
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 [transform:translateZ(25px)]">
                  📌 Karakteristik: Wadah keorganisasian berhimpun, koordinasi jejaring PIK-R, dan perancang kebijakan serta program kerja daerah.
                </div>
              </div>
            </Card3D>

            {/* DUTA GENRE */}
            <Card3D maxTilt={8}>
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft h-full flex flex-col justify-between [transform-style:preserve-3d]">
                <div>
                  <div className="flex items-center gap-2 mb-3 [transform:translateZ(25px)]">
                    <Award className="w-6 h-6 text-sky-600" />
                    <h4 className="text-xl font-black text-slate-900 font-display">
                      DUTA GENRE
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal [transform:translateZ(20px)]">
                    {OFFICIAL_PROFILE.distinction.dutaGenre.desc}
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-900 [transform:translateZ(25px)]">
                  🌟 Karakteristik: Role model terpilih, ikon representatif, penyampai pesan edukatif di panggung publik dan media.
                </div>
              </div>
            </Card3D>
          </motion.div>
        )}

      </div>

    </div>
  );
};
