import React, { useState, useEffect } from 'react';
import { HOKKAIDO_REGIONS, RegionData, Attraction } from './data/hokkaidoData';
import { Header } from './components/Header';
import { RegionNav } from './components/RegionNav';
import { RegionView } from './components/RegionView';
import { HokkaidoMapModal } from './components/HokkaidoMapModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { TravelJournalDrawer } from './components/TravelJournalDrawer';
import { Sparkles, Heart } from 'lucide-react';

export function App() {
  const [activeRegionId, setActiveRegionId] = useState<string>('otaru');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Attraction[]>(() => {
    try {
      const saved = localStorage.getItem('hokkaido_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('hokkaido_bookmarks', JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  const activeRegion = HOKKAIDO_REGIONS.find((r) => r.id === activeRegionId) || HOKKAIDO_REGIONS[0];
  const bookmarkedIds = new Set(bookmarks.map((b) => b.id));

  const toggleBookmark = (attraction: Attraction) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === attraction.id)) {
        return prev.filter((b) => b.id !== attraction.id);
      } else {
        return [...prev, attraction];
      }
    });
  };

  const removeBookmark = (attractionId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== attractionId));
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans selection:bg-blue-600 selection:text-white magazine-grain flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <Header
          onOpenMap={() => setIsMapOpen(true)}
          onOpenJournal={() => setIsJournalOpen(true)}
          bookmarkCount={bookmarks.length}
        />

        {/* Region Selector Tabs */}
        <RegionNav
          activeRegionId={activeRegionId}
          onSelectRegion={(id) => {
            setActiveRegionId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Region Page View */}
        <main>
          <RegionView
            region={activeRegion}
            onSelectAttraction={(spot) => setSelectedAttraction(spot)}
            onToggleBookmark={toggleBookmark}
            bookmarkedIds={bookmarkedIds}
          />
        </main>
      </div>

      {/* Editorial Magazine Footer */}
      <footer className="w-full bg-[#05080E] border-t border-slate-800/80 py-12 px-4 md:px-8 magazine-grain">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="font-serif text-lg font-bold text-slate-200">
              北海道・風光誌 (HOKKAIDO ARCHIVE)
            </div>
            <div>VOL.08 / SPECIAL WINTER & SUMMER VISUAL EDITION</div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMapOpen(true)}
              aria-label="打開北海道行政區域地圖"
              className="hover:text-white transition cursor-pointer"
            >
              行政區域地圖
            </button>
            <button
              onClick={() => setIsJournalOpen(true)}
              aria-label="打開風光手帳剪貼簿"
              className="hover:text-white transition cursor-pointer"
            >
              風光手帳 ({bookmarks.length})
            </button>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Hokkaido Travelers
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <HokkaidoMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelectRegion={(id) => {
          setActiveRegionId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeRegionId={activeRegionId}
      />

      <PhotoLightbox
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
        onToggleBookmark={toggleBookmark}
        isBookmarked={selectedAttraction ? bookmarkedIds.has(selectedAttraction.id) : false}
      />

      <TravelJournalDrawer
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={removeBookmark}
        onSelectAttraction={(spot) => setSelectedAttraction(spot)}
      />
    </div>
  );
}

export default App;
