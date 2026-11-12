import React from 'react';
import { DIVISIONS } from '../../data/cabinetData';
import { sounds } from '../../utils/soundEffects';

interface DivisionSelectorProps {
  activeDivision: string;
  onSelectDivision: (id: string) => void;
  totalMembers: number;
}

export const DivisionSelector: React.FC<DivisionSelectorProps> = ({
  activeDivision,
  onSelectDivision,
  totalMembers,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto px-2">
      {/* 'Semua' button */}
      <button
        onClick={() => {
          sounds.playClick();
          onSelectDivision('all');
        }}
        onMouseEnter={() => sounds.playHover()}
        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 border ${
          activeDivision === 'all'
            ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-pill scale-105'
            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-soft'
        }`}
      >
        <span>Semua Jajaran</span>
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            activeDivision === 'all'
              ? 'bg-slate-950 text-amber-300'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {totalMembers}
        </span>
      </button>

      {/* Division buttons */}
      {DIVISIONS.map((div) => {
        const isSelected = activeDivision === div.id;
        return (
          <button
            key={div.id}
            onClick={() => {
              sounds.playClick();
              onSelectDivision(div.id);
            }}
            onMouseEnter={() => sounds.playHover()}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border ${
              isSelected
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-600 shadow-md scale-105'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-soft'
            }`}
          >
            <span>{div.shortName}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                isSelected
                  ? 'bg-white/25 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {div.memberCount}
            </span>
          </button>
        );
      })}
    </div>
  );
};
