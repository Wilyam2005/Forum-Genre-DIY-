import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          sounds.playChime();
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 700);
          }, 250);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 5;
        return Math.min(prev + step, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Subtle Warm Backdrop Glow */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/40 via-sky-200/30 to-pink-200/30 rounded-full blur-[100px] pointer-events-none animate-pulse" />

          {/* Centerpiece Logo */}
          <motion.div
            className="relative flex flex-col items-center z-10 px-4"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Soft Ambient Rings */}
            <motion.div
              className="absolute -inset-8 rounded-full border-2 border-amber-300/40"
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />

            {/* Logo */}
            <motion.div
              className="relative w-36 h-48 md:w-44 md:h-56 p-2 drop-shadow-[0_12px_24px_rgba(245,158,11,0.25)]"
              animate={{ y: [-4, 6, -4] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <img
                src="/LOGO GENRE.png"
                alt="Logo Genre D.I. Yogyakarta"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs md:text-sm font-bold tracking-wider text-amber-700 uppercase">
                Kabinet AnomAdiwarna 2025 - 2027
              </span>
            </motion.div>

            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight text-center">
              Forum Genre D.I. Yogyakarta
            </h1>

            <p className="text-xs md:text-sm text-slate-500 mt-1 italic tracking-wide">
              "Saatnya Yang Muda Yang Berencana"
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 md:w-80 mt-10 relative z-10">
            <div className="flex justify-between items-center mb-2 text-xs font-mono">
              <span className="text-sky-700 font-semibold tracking-wider">MENYIAPKAN PROFIL...</span>
              <span className="text-amber-600 font-bold">{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
