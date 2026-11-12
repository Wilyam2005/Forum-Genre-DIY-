import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Quote, FolderCheck, Instagram } from 'lucide-react';
import { Member } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface MemberDetailModalProps {
  member: Member | null;
  onClose: () => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (member) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [member, onClose]);

  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window in Clean Light Mode */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col md:flex-row text-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors shadow-sm"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: High-Res Poster Image */}
          <div className="md:w-1/2 w-full h-80 md:h-auto relative bg-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
            
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-800 flex items-center gap-1.5 shadow-sm">
              <FolderCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Poster #{member.id}.png</span>
            </div>
          </div>

          {/* Right Column: Member Details */}
          <div className="md:w-1/2 w-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Division Badge (NO Koordinator badge) */}
              <div className="mb-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-300">
                  {member.divisionName}
                </span>
              </div>

              {/* Name & Position */}
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                {member.name}
              </h2>
              <p className="text-sm sm:text-base font-bold text-amber-600 mt-1">
                {member.role}
              </p>
              {member.subDivision && (
                <p className="text-xs text-slate-500 mt-0.5">
                  Sub-Bidang: <span className="text-slate-800 font-semibold">{member.subDivision}</span>
                </p>
              )}

              {/* Motivational Quote */}
              {member.quote && (
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 relative">
                  <Quote className="w-5 h-5 text-amber-400 absolute -top-2.5 left-4" />
                  <p className="text-xs sm:text-sm text-slate-700 italic pt-1 leading-relaxed font-medium">
                    "{member.quote}"
                  </p>
                </div>
              )}

              {/* Local File Path Reference */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-500">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                  Sumber Aset Terhubung:
                </div>
                <div className="truncate text-sky-700 select-all font-semibold" title={member.localPath}>
                  {member.localPath}
                </div>
              </div>

              {/* Tags & Skills */}
              <div className="mt-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  <span>Fokus & Bidang</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <a
                href="https://instagram.com/genre_diy"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-pink-600 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>@genre_diy</span>
              </a>

              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-extrabold transition-all shadow-sm"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
