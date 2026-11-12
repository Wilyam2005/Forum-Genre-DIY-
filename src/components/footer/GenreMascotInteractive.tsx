import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';

export const GenreMascotInteractive: React.FC = () => {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);

  const dialogs = [
    'Halo Remaja Jogja! Salam Genre: Sehat, Cerdas, Ceria! ✨',
    'Ingat ya, Katakan Tidak pada Pernikahan Dini, Seks Pranikah, dan NAPZA! 🛡️',
    'Saatnya Yang Muda Yang Berencana! Bersama Kabinet AnomAdiwarna 2025-2027! 🌟',
    'Cegah Stunting itu Penting! Minum TTD rutin ya buat remaja putri! 🍎',
    'Follow Instagram kita yuk di @genre_diy! Ada banyak info seru! 🚀',
  ];

  const handleMascotClick = () => {
    sounds.playChime();
    setIsWaving(true);
    setDialogIndex((prev) => (prev + 1) % dialogs.length);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#F59E0B', '#0EA5E9', '#10B981', '#EC4899'],
    });

    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogIndex}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="relative mb-3 px-4 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-soft max-w-xs text-center border-2 border-white select-none"
        >
          <span>{dialogs[dialogIndex]}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-amber-400" />
        </motion.div>
      </AnimatePresence>

      <motion.div
        onClick={handleMascotClick}
        whileHover={{ scale: 1.08, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 via-sky-400 to-emerald-400 p-1 shadow-card cursor-pointer relative group flex items-center justify-center"
        title="Klik Maskot Genre DIY untuk interaksi!"
      >
        <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center overflow-hidden relative border-2 border-white">
          <motion.div
            animate={{ rotate: isWaving ? [0, 15, -15, 10, 0] : 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-3 mb-1">
              <span className="w-2.5 h-3 bg-amber-500 rounded-full" />
              <span className="w-2.5 h-3 bg-amber-500 rounded-full" />
            </div>
            <div className="w-4 h-2 bg-rose-500 rounded-full" />
          </motion.div>

          <Sparkles className="w-3.5 h-3.5 text-amber-500 absolute top-2 right-2 animate-bounce" />
          <Heart className="w-3 h-3 text-pink-500 absolute bottom-2 left-2 animate-pulse" />
        </div>

        <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider whitespace-nowrap shadow-sm border border-white">
          Sapa Saya! ✨
        </span>
      </motion.div>
    </div>
  );
};
