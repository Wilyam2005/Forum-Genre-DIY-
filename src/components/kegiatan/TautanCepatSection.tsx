import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Link2, Sparkles } from 'lucide-react';
import type { TautanCepat } from '../../types/kegiatan';
import { kegiatanStore } from '../../utils/kegiatanStore';

export const TautanCepatSection: React.FC = () => {
  const [links, setLinks] = useState<TautanCepat[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const refresh = () => {
      kegiatanStore.getQuickLinks()
        .then((items) => {
          if (active) {
            setLinks(items);
            setError('');
          }
        })
        .catch((reason: unknown) => {
          console.error('Gagal memuat tautan cepat:', reason);
          if (active) setError('Informasi belum dapat dimuat. Silakan coba lagi nanti.');
        });
    };
    refresh();
    window.addEventListener('genre:quick-links-changed', refresh);
    return () => {
      active = false;
      window.removeEventListener('genre:quick-links-changed', refresh);
    };
  }, []);

  if (links.length === 0 && !error) return null;

  return (
    <section id="akses-informasi" aria-labelledby="access-heading" className="relative isolate overflow-hidden bg-gradient-to-b from-[#EEF8FD] via-white to-[#F8FAFC] py-14 sm:py-18 lg:py-20">
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#008dd3]/15 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0079b8] shadow-sm sm:text-xs">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Layanan & Informasi
          </div>
          <h2 id="access-heading" className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Pusat Informasi <span className="text-[#008dd3]">Genre DIY</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Akses pendaftaran, layanan, dan kanal resmi Forum Genre DIY dalam satu tempat.
          </p>
        </header>

        {error ? (
          <p role="alert" className="mx-auto mt-8 max-w-2xl rounded-2xl border border-rose-200 bg-white/90 p-4 text-center text-sm text-rose-700 shadow-sm">
            {error}
          </p>
        ) : (
          <div className={`mx-auto mt-9 grid w-full gap-4 sm:mt-10 sm:gap-5 ${
            links.length === 1
              ? 'max-w-2xl grid-cols-1'
              : 'max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-24 min-w-0 items-center gap-4 overflow-hidden rounded-3xl border border-white/90 bg-white/85 p-4 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.35)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-[0_20px_45px_-24px_rgba(0,141,211,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008dd3] focus-visible:ring-offset-2 sm:p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#008dd3] to-[#006da5] text-white shadow-lg shadow-sky-200/70 transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                  <Link2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-sm font-extrabold leading-snug text-slate-900 sm:text-base">
                    {link.label}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    Buka informasi
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#008dd3] transition-all duration-300 group-hover:bg-[#008dd3] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
