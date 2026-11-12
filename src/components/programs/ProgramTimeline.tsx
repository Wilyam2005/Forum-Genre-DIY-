import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { TIMELINE_EVENTS } from '../../data/programsData';

export const ProgramTimeline: React.FC = () => {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber-300 via-sky-300 to-slate-200 rounded-full" />

      <div className="space-y-8">
        {TIMELINE_EVENTS.map((event, idx) => {
          const isCompleted = event.status === 'Selesai';
          const isOngoing = event.status === 'Sedang Berjalan';

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative pl-14 group"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-0 top-2 w-10 h-10 rounded-2xl border-2 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 ${
                  isCompleted
                    ? 'bg-amber-400 border-amber-300'
                    : isOngoing
                    ? 'bg-sky-500 border-sky-400 animate-pulse'
                    : 'bg-white border-slate-300'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : isOngoing ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </div>

              {/* Event Card */}
              <motion.div
                whileHover={{ x: 6, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 transition-all duration-300 shadow-soft hover:shadow-md cursor-default"
              >
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-amber-800 flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{event.date}</span>
                  </span>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : isOngoing
                        ? 'bg-sky-100 text-sky-800 border border-sky-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {event.status}
                  </span>

                  <span className="text-[11px] text-slate-500 font-semibold">
                    Bidang: <strong className="text-slate-800">{event.division}</strong>
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {event.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {event.desc}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
