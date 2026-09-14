import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, Thermometer, Calendar, Camera, Bookmark, Sparkles, Eye } from 'lucide-react';
import { RegionData, Attraction } from '../data/hokkaidoData';
import { PhotoHotspot } from './PhotoHotspot';
import { SeasonalSlider } from './SeasonalSlider';

interface RegionViewProps {
  region: RegionData;
  onSelectAttraction: (attraction: Attraction) => void;
  onToggleBookmark: (attraction: Attraction) => void;
  bookmarkedIds: Set<string>;
}

export const RegionView: React.FC<RegionViewProps> = ({
  region,
  onSelectAttraction,
  onToggleBookmark,
  bookmarkedIds,
}) => {
  return (
    <motion.div
      key={region.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full pb-24"
    >
      {/* ========================================================================= */}
      {/* 1. HERO MAGAZINE COVER SECTION (超大幅封面攝影) */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-slate-950 flex items-end">
        {/* Full-bleed Photography Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={region.coverImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = region.coverFallback;
            }}
            alt={region.nameJP}
            className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/90 via-transparent to-transparent" />
          <div className="absolute inset-0 magazine-grain" />
        </div>

        {/* Interactive Photo Hotspots */}
        {region.hotspots.map((hotspot) => (
          <PhotoHotspot key={hotspot.id} hotspot={hotspot} />
        ))}

        {/* Hero Magazine Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Left Text Block */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-600/50 px-2.5 py-1 rounded">
                {region.issueNo}
              </span>
              <span className="text-xs font-mono text-slate-300 tracking-widest uppercase">
                {region.nameRomaji} ARCHIVAL COLLECTION
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tight text-white drop-shadow-lg">
              {region.nameJP}
            </h2>

            <p className="text-lg md:text-xl font-serif text-slate-200 mt-3 font-medium drop-shadow leading-relaxed">
              {region.subTitleJP}
            </p>

            <p className="text-sm font-sans text-slate-300 mt-4 leading-relaxed max-w-xl">
              {region.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-700/60 pt-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Compass className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{region.coordinates}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{region.bestSeason}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Thermometer className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{region.averageTemp}</span>
              </div>
            </div>
          </div>

          {/* Right Vertical Japanese Editorial Banner (日系豎排文字標籤) */}
          <div className="hidden lg:flex items-center gap-6 border-l border-slate-700/50 pl-8 py-2">
            <div className="vertical-text font-serif text-2xl font-bold tracking-widest text-slate-200 leading-loose">
              「{region.tagline}」
            </div>
            <div className="text-[10px] font-mono text-slate-500 vertical-text tracking-widest uppercase">
              HOKKAIDO TRAVEL ARCHIVE
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16">
        {/* ========================================================================= */}
        {/* 2. EDITORIAL QUOTE & MAGAZINE STORY SECTION */}
        {/* ========================================================================= */}
        <section className="my-12 p-8 md:p-12 bg-slate-900/40 border-y border-slate-800 magazine-grain rounded-2xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Sparkles className="w-6 h-6 text-blue-400 mx-auto opacity-70" />
            <blockquote className="font-serif text-2xl md:text-3xl font-medium text-slate-100 italic leading-relaxed">
              "{region.editorialQuote}"
            </blockquote>
            <cite className="block text-xs font-mono text-slate-400 uppercase tracking-widest">
              —— {region.quoteAuthor}
            </cite>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SEASONAL DUALITY SLIDER (夏冬雙季風姿) */}
        {/* ========================================================================= */}
        <SeasonalSlider
          seasonalPair={region.seasonalPair}
          regionName={region.nameJP}
        />

        {/* ========================================================================= */}
        {/* 4. ATTRACTION SPOTLIGHT CARDS (景點攝影大圖巡禮) */}
        {/* ========================================================================= */}
        <section className="my-20">
          {/* Section Header */}
          <div className="flex items-end justify-between border-b border-slate-800 pb-4 mb-10">
            <div>
              <span className="font-mono text-xs text-blue-400 tracking-widest uppercase">
                // ARCHIVAL SPOTLIGHTS ({region.attractions.length})
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 mt-1">
                {region.nameJP} · 風光景致深度巡禮
              </h3>
            </div>
            <span className="hidden md:inline font-mono text-xs text-slate-500">
              點擊相片可檢視相機參數與隱藏建議
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {region.attractions.map((spot) => {
              const isBookmarked = bookmarkedIds.has(spot.id);

              return (
                <div
                  key={spot.id}
                  className="group relative bg-[#0C121E] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-500 shadow-xl magazine-grain flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative h-64 overflow-hidden bg-slate-950 cursor-pointer" onClick={() => onSelectAttraction(spot)}>
                    <img
                      src={spot.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = spot.fallbackImage;
                      }}
                      alt={spot.nameJP}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C121E] via-transparent to-transparent opacity-80" />

                    {/* Bookmark Button Badge */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(spot);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition border ${
                        isBookmarked
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-950/60 text-slate-300 hover:text-white border-slate-700/60'
                      }`}
                      title={isBookmarked ? '已存入風光手帳' : '收藏景點'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    {/* EXIF Tag Overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-slate-300 px-2.5 py-1 rounded-md border border-slate-800">
                      <Camera className="w-3 h-3 text-blue-400" />
                      {spot.exif}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-sans text-slate-400 font-medium tracking-wider">
                        {spot.nameEN}
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-blue-400 transition">
                        {spot.nameJP}
                      </h4>
                      <p className="text-xs font-serif text-slate-300 mt-2 font-medium border-l-2 border-blue-500 pl-2.5">
                        {spot.tagline}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-3 line-clamp-3">
                        {spot.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-amber-300/90 truncate max-w-[190px]">
                        ⏱ {spot.bestTime}
                      </span>
                      <button
                        onClick={() => onSelectAttraction(spot)}
                        className="flex items-center gap-1 text-xs font-serif text-blue-400 hover:text-blue-300 font-semibold group-hover:translate-x-0.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> 檢視詳情
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
