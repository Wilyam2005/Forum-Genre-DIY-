import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { BentoGrid } from './BentoGrid';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient decorative blobs (no 3D canvas here — just atmospheric color) */}
      <div className="absolute -top-20 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-amber-200"
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Profil Resmi Forum Genre DIY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display"
        >
          Filosofi & Pilar Strategis <span className="text-amber-600">Kabinet</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
        >
          Membedah landasan berdirinya Forum Genre, makna nama <strong>AnomAdiwarna</strong>, 4 pilar pokok, 3 fokus kepengurusan 2025–2027, serta pemahaman komprehensif peran organisasi.
        </motion.p>
      </div>

      {/* Bento & Profile Grid */}
      <div className="relative z-10">
        <BentoGrid />
      </div>
    </section>
  );
};
