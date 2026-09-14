import React from 'react';
import { Compass, Map, Bookmark, Sparkles } from 'lucide-react';
import { AmbientSoundPlayer } from './AmbientSoundPlayer';

interface HeaderProps {
  onOpenMap: () => void;
  onOpenJournal: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMap,
  onOpenJournal,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#080C14]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
      {/* Editorial Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-900">
        <div className="flex items-center gap-3">
          <span className="text-blue-400 font-bold uppercase tracking-widest">
            HOKKAIDO ARCHIVE
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">日系極簡視覺雜誌</span>
        </div>
        <div className="flex items-center gap-4">
          <AmbientSoundPlayer />
          <span className="hidden md:inline text-slate-500">2026 WINTER SPECIAL ISSUE</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Magazine Title Brand */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-white flex items-baseline gap-2">
              北海道・風光誌
              <span className="text-xs font-mono font-normal tracking-widest text-slate-400 uppercase">
                / VOL.08
              </span>
            </h1>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              VISUAL JOURNEY THROUGH NORTHERN LANDS
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Interactive Map Button */}
          <button
            onClick={onOpenMap}
            className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl border border-slate-700/60 text-xs font-serif transition shadow-sm"
          >
            <Map className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">北海道行政區域圖</span>
            <span className="sm:hidden">地圖</span>
          </button>

          {/* Travel Journal Clippings Drawer Trigger */}
          <button
            onClick={onOpenJournal}
            className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-serif font-semibold transition shadow-md shadow-blue-900/30"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">風光手帳</span>
            {bookmarkCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-blue-900 text-[11px] font-mono font-bold flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
