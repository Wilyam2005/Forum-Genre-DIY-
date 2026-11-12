import React, { useState, useEffect, useCallback } from 'react';
import { Preloader } from './components/common/Preloader';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { TeamSection } from './components/team/TeamSection';
import { ProgramsSection } from './components/programs/ProgramsSection';
import { KegiatanSection } from './components/kegiatan/KegiatanSection';
import { TautanCepatSection } from './components/kegiatan/TautanCepatSection';
import { SpotlightNewsPopup } from './components/kegiatan/SpotlightNewsPopup';
import { ArsipKegiatanPage } from './components/kegiatan/ArsipKegiatanPage';
import { AdminPortal } from './components/kegiatan/AdminPortal';
import { Footer } from './components/footer/Footer';
import { kegiatanStore } from './utils/kegiatanStore';
import type { Kegiatan } from './types/kegiatan';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [spotlightNews, setSpotlightNews] = useState<Kegiatan | null>(null);
  const [requestedKegiatanId, setRequestedKegiatanId] = useState<string | null>(null);
  const [spotlightError, setSpotlightError] = useState('');
  const [isArchiveView, setIsArchiveView] = useState(() => {
    return window.location.search.includes('view=arsip') || window.location.hash.includes('arsip');
  });

  // Listen to popstate or hash change to toggle archive view dynamically
  useEffect(() => {
    const handleUrlChange = () => {
      setIsArchiveView(
        window.location.search.includes('view=arsip') || window.location.hash.includes('arsip')
      );
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  useEffect(() => {
    if (isLoading || isArchiveView) return;

    let active = true;
    let showTimer: number | undefined;
    let hideTimer: number | undefined;
    kegiatanStore.getFeaturedNews().then((featuredNews) => {
      if (!active || !featuredNews) return;
      showTimer = window.setTimeout(() => setSpotlightNews(featuredNews), 3000);
      hideTimer = window.setTimeout(() => {
        setSpotlightNews((current) => current?.id === featuredNews.id ? null : current);
      }, 10000);
    }).catch((reason: unknown) => {
      console.error('Gagal memuat sorotan berita:', reason);
      if (active) setSpotlightError('Sorotan berita belum dapat dimuat.');
    });

    return () => {
      active = false;
      if (showTimer !== undefined) window.clearTimeout(showTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, [isLoading, isArchiveView]);

  // Secret shortcut: Shift + A = Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'a') {
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackToHome = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('kategori');
    window.history.pushState({}, '', url.pathname + url.hash.replace('arsip', ''));
    setIsArchiveView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestedKegiatanOpened = useCallback(() => {
    setRequestedKegiatanId(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 relative selection:bg-[#008dd3]/30 selection:text-slate-900 font-sans">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {isArchiveView ? (
          <ArsipKegiatanPage onBackToHome={handleBackToHome} />
        ) : (
          <>
            <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
            <main>
              <HeroSection />
              <AboutSection />
              <TautanCepatSection />
              <KegiatanSection
                requestedKegiatanId={requestedKegiatanId}
                onRequestedKegiatanOpened={handleRequestedKegiatanOpened}
              />
              <TeamSection />
              <ProgramsSection />
            </main>
            <Footer />
          </>
        )}

        <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
        <SpotlightNewsPopup
          kegiatan={spotlightNews}
          onOpen={() => {
            if (spotlightNews) setRequestedKegiatanId(spotlightNews.id);
            setSpotlightNews(null);
          }}
          onClose={() => setSpotlightNews(null)}
        />
      </div>
      {spotlightError && (
        <p role="alert" className="fixed bottom-4 left-4 z-[600] rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-rose-700 shadow-lg">
          {spotlightError}
        </p>
      )}
    </div>
  );
};

export default App;
