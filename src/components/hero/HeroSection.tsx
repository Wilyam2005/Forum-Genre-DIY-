import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Users, MapPin, ShieldCheck } from 'lucide-react';
import { Interactive3DBackground } from '../3d/Interactive3DBackground';
import { Card3D } from '../common/Card3D';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F8FAFC] via-[#EFF8FF] to-[#F0F9FF] overflow-hidden"
    >
      {/* 3D Interactive Background (Expansive fluid 3D particle terrain & floating crystals) */}
      <Interactive3DBackground className="opacity-80" />

      {/* Floating Orbs — Decorative genre-blue ambient elements */}
      <motion.div
        animate={{ y: [0, -20, -10, -25, 0], x: [0, 10, -5, 8, 0], scale: [1, 1.05, 0.95, 1.02, 1], opacity: [0.4, 0.6, 0.3, 0.5, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 left-[8%] w-20 h-20 rounded-full bg-[#008dd3]/20 blur-2xl pointer-events-none"
        style={{ '--orb-duration': '6s' } as React.CSSProperties}
      />
      <motion.div
        animate={{ y: [0, -15, -8, -22, 0], x: [0, -8, 6, -10, 0], scale: [1, 0.98, 1.04, 0.97, 1], opacity: [0.3, 0.5, 0.25, 0.45, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-32 right-[10%] w-28 h-28 rounded-full bg-[#008dd3]/15 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -18, -5, -20, 0], x: [0, 5, -8, 4, 0], opacity: [0.25, 0.45, 0.2, 0.4, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-1/2 left-[3%] w-16 h-16 rounded-full bg-[#008dd3]/25 blur-xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -12, -20, -8, 0], x: [0, -6, 10, -4, 0], opacity: [0.35, 0.55, 0.3, 0.5, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
        className="absolute top-1/3 right-[5%] w-14 h-14 rounded-full bg-[#008dd3]/20 blur-xl pointer-events-none"
      />

      {/* Main Grid Content */}
      <div       className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Authentic Executive Typography (Clean, Solid, No Muddy AI Gradients) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Official Period Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 max-w-full px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sky-200/80 shadow-sm mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#008dd3] animate-pulse shrink-0" />
            <span className="text-xs font-bold text-sky-900 tracking-wide">
              Profil Resmi Forum Genre Daerah Istimewa Yogyakarta
            </span>
          </motion.div>

          {/* Main Title (Clean, Solid Color, High Prestige) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block text-sm sm:text-base font-extrabold uppercase tracking-widest text-slate-500 mb-1">
              Masa Bakti 2025 – 2027
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] font-display">
              Kabinet{' '}
              <motion.span
                animate={{ y: [0, -2, 0], rotateY: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
                className="text-[#008dd3]"
              >
                AnomAdiwarna
              </motion.span>
            </h1>
          </motion.div>

          {/* Slogan & Official Description from PDF */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal"
          >
            Wadah generasi muda D.I. Yogyakarta yang berkarakter unggul dalam keberagaman, bergerak bersama, dan berdampak nyata bagi lingkungan serta masyarakat menuju <strong>Indonesia Emas 2045</strong>.
          </motion.p>

          {/* Primary Action Buttons with 3D tactile lift */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <a
              href="#team"
              className="group flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-[#008dd3] hover:bg-[#0079b8] text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 animate-genre-glow"
            >
              <Users className="w-4 h-4 text-white/80 group-hover:rotate-6 transition-transform" />
              <span>Jajaran 45 Anggota & Divisi</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#about"
              className="flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0"
            >
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Filosofi & Profil Resmi</span>
            </a>
          </motion.div>

          {/* Official Representation Tagline Strip (5 Forum Kab/Kota & PIK-R) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-600 font-semibold"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>5 Forum Kab/Kota Se-DIY: Sleman • Bantul • Gunungkidul • Kulon Progo • Kota Yogyakarta</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Pusat Informasi & Konseling Remaja (PIK-R)</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: 3D Holographic Identity Showcase Card with Layered Depth */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          <Card3D
            maxTilt={12}
            scale={1.03}
            glareOpacity={0.25}
            className="w-full max-w-md"
          >
            <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl overflow-hidden p-7 [transform-style:preserve-3d]">
              
              {/* Subtle Ambient Corner Accent */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#008dd3]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header (Layer 1 - translateZ 20px) */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 [transform:translateZ(20px)]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                    KABINET AKTIF
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  2025 – 2027
                </span>
              </div>

              {/* Centerpiece 3D Emblem Showcase (Layer 2 - translateZ 40px) */}
              <div className="py-8 flex flex-col items-center justify-center text-center [transform:translateZ(40px)]">
                
                {/* 3D Floating Emblem Glow Container */}
                <div className="relative w-36 h-40 sm:w-40 sm:h-44 mb-4 flex items-center justify-center perspective-800">
                  <motion.div
                    animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.45, 0.75, 0.45] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-3 rounded-full bg-[#008dd3]/25 blur-xl"
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0], rotateY: [-12, 12, -12], rotateX: [3, -3, 3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.08, rotateY: 18 }}
                    style={{ transformStyle: 'preserve-3d', perspective: 800, backfaceVisibility: 'hidden' }}
                    className="relative w-full h-full [transform:translateZ(18px)]"
                  >
                    <img
                      src="/LOGO GENRE.png"
                      alt="Logo Forum Genre DIY"
                      className="w-full h-full object-contain filter drop-shadow-[0_14px_14px_rgba(15,23,42,0.28)]"
                    />
                  </motion.div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 font-display">
                  Forum Genre D.I. Yogyakarta
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Daerah Istimewa Yogyakarta
                </p>

                <p className="mt-4 text-xs italic text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                  "Saatnya Yang Muda Yang Berencana"
                </p>
              </div>

              {/* Division Acronym Badges with 3D Depth (Layer 3 - translateZ 30px) */}
              <div className="pt-4 border-t border-slate-100 [transform:translateZ(30px)]">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
                  6 Divisi Penggerak
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {[
                    { code: 'BPH', color: 'bg-amber-100 text-amber-900 border-amber-200' },
                    { code: 'EKRAF', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
                    { code: 'P4M', color: 'bg-sky-100 text-sky-900 border-sky-200' },
                    { code: 'PSDM', color: 'bg-purple-100 text-purple-900 border-purple-200' },
                    { code: 'HUMAS', color: 'bg-pink-100 text-pink-900 border-pink-200' },
                    { code: 'MEDKOM', color: 'bg-cyan-100 text-cyan-900 border-cyan-200' },
                  ].map((d) => (
                    <span
                      key={d.code}
                      className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border shadow-xs ${d.color} transition-transform hover:scale-110`}
                    >
                      {d.code}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </Card3D>

        </div>

      </div>
    </section>
  );
};
