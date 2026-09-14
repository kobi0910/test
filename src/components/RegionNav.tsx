import React from 'react';
import { motion } from 'framer-motion';
import { HOKKAIDO_REGIONS, RegionData } from '../data/hokkaidoData';

interface RegionNavProps {
  activeRegionId: string;
  onSelectRegion: (regionId: string) => void;
}

export const RegionNav: React.FC<RegionNavProps> = ({
  activeRegionId,
  onSelectRegion,
}) => {
  return (
    <nav className="w-full bg-[#080C14] border-b border-slate-800/80 sticky top-[77px] z-30 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-1 md:gap-2 py-2">
        {HOKKAIDO_REGIONS.map((region) => {
          const isActive = region.id === activeRegionId;
          return (
            <button
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className={`relative shrink-0 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2.5 ${
                isActive
                  ? 'text-white font-bold bg-slate-900 border border-slate-700/80 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              {/* Issue Number Badge */}
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {region.issueNo.replace('ISSUE ', '')}
              </span>

              {/* Region Kanji Name */}
              <span className="font-serif text-base md:text-lg">
                {region.nameJP}
              </span>

              {/* Romaji subtitle */}
              <span className="hidden lg:inline text-[11px] font-sans text-slate-400 font-normal uppercase tracking-wider">
                {region.nameRomaji}
              </span>

              {/* Active Indicator Underline Bar */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3B82F6]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
