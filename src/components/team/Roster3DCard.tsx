import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ExternalLink, User } from 'lucide-react';
import { Member } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface Roster3DCardProps {
  member: Member;
  onSelect: (member: Member) => void;
}

export const Roster3DCard: React.FC<Roster3DCardProps> = ({ member, onSelect }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Coordinates
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    setTilt({
      x: -percentY * 8,
      y: percentX * 8,
    });

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  }, []);

  const handleMouseEnter = () => {
    sounds.playHover();
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos((p) => ({ ...p, opacity: 0 }));
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleCardClick = () => {
    sounds.playClick();
    onSelect(member);
  };

  // Division badge styling - full acronyms (BPH, EKRAF, P4M, PSDM, HUMAS, MEDKOM)
  const getDivisionBadgeColor = (divName: string) => {
    const upper = divName.toUpperCase();
    if (upper.includes('BPH')) return 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm';
    if (upper.includes('EKRAF')) return 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-sm';
    if (upper.includes('P4M')) return 'bg-sky-100 text-sky-900 border-sky-300 shadow-sm';
    if (upper.includes('PSDM')) return 'bg-purple-100 text-purple-900 border-purple-300 shadow-sm';
    if (upper.includes('HUMAS')) return 'bg-pink-100 text-pink-900 border-pink-300 shadow-sm';
    if (upper.includes('MEDKOM')) return 'bg-cyan-100 text-cyan-900 border-cyan-300 shadow-sm';
    return 'bg-slate-100 text-slate-800 border-slate-300 shadow-sm';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-[430px] sm:h-[460px] perspective-[1200px] cursor-pointer select-none"
      onClick={handleCardClick}
    >
      {/* 3D Tilting & Flipping Card Body */}
      <div
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg) scale3d(${glarePos.opacity > 0 ? 1.02 : 1}, ${glarePos.opacity > 0 ? 1.02 : 1}, 1)`,
        }}
      >
        {/* ================= CARD FRONT (Bright Poster View) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white border border-slate-200/90 group-hover:border-amber-400 [backface-visibility:hidden] shadow-soft group-hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          
          {/* Official Poster Image */}
          <div className="relative w-full h-full overflow-hidden bg-slate-50">
            {!imageError ? (
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100 text-slate-500">
                <User className="w-16 h-16 text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-700">{member.name}</span>
                <span className="text-xs text-slate-500 mt-1">{member.role}</span>
              </div>
            )}

            {/* Subtle Gradient Overlay for bottom text clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

            {/* Top Division Badge (Clean, direct BPH, MEDKOM, etc. - NO "BADAN" cutoff, NO Koordinator badge) */}
            <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none [transform:translateZ(30px)]">
              <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${getDivisionBadgeColor(member.divisionName)}`}>
                {member.divisionName}
              </span>
            </div>

            {/* Bottom Floating Info Pill on Front */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md group-hover:border-amber-400 transition-colors z-10 [transform:translateZ(35px)]">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-sky-700 font-bold truncate">
                    {member.role}
                  </p>
                </div>

                {/* Flip Button */}
                <button
                  type="button"
                  onClick={handleFlip}
                  title="Klik untuk membalik kartu (3D Flip)"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-600 transition-all shrink-0 shadow-sm group/btn"
                >
                  <RotateCw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Holographic Sheen on Front */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-200 z-20"
              style={{
                opacity: !isFlipped ? glarePos.opacity : 0,
                background: `radial-gradient(circle 300px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%)`,
                mixBlendMode: 'overlay',
              }}
            />
          </div>
        </div>

        {/* ================= CARD BACK (Clean & Cheerful Light Detail View) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-gradient-to-br from-white via-amber-50/20 to-sky-50/30 border border-amber-300 text-slate-800 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-card-hover flex flex-col justify-between overflow-hidden">
          <div className="[transform:translateZ(25px)]">
            {/* Header Back */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <span className="text-[11px] font-mono tracking-wider text-amber-700 uppercase font-extrabold">
                Kabinet AnomAdiwarna
              </span>
              <button
                type="button"
                onClick={handleFlip}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Kembali ke foto"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Division & Name */}
            <div className="mb-4">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider border ${getDivisionBadgeColor(member.divisionName)}`}>
                {member.divisionName}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2 leading-tight">
                {member.name}
              </h3>
              <p className="text-xs font-bold text-amber-600 mt-0.5">
                {member.role}
              </p>
              {member.subDivision && (
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Sub-Bidang: <span className="text-slate-800 font-semibold">{member.subDivision}</span>
                </p>
              )}
            </div>

            {/* Quote */}
            {member.quote && (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm mb-4">
                <p className="text-xs text-slate-600 italic leading-relaxed font-medium">
                  "{member.quote}"
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer on Back */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between [transform:translateZ(20px)]">
            <div className="text-[10px] text-slate-400 font-mono">
              Poster ID: #{member.id}
            </div>

            <button
              onClick={handleCardClick}
              className="flex items-center gap-1 text-xs font-extrabold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>Lihat Detail</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
