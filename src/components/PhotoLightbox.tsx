import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Bookmark, Clock, Utensils, Lightbulb, Check } from 'lucide-react';
import { Attraction } from '../data/hokkaidoData';

interface PhotoLightboxProps {
  attraction: Attraction | null;
  onClose: () => void;
  onToggleBookmark: (attraction: Attraction) => void;
  isBookmarked: boolean;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  attraction,
  onClose,
  onToggleBookmark,
  isBookmarked,
}) => {
  if (!attraction) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Lightbox Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-5xl bg-[#090E17] border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl magazine-grain my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/90 backdrop-blur-md transition border border-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto lg:overflow-visible">
            {/* Image Full-bleed Section */}
            <div className="lg:col-span-7 relative bg-slate-950 min-h-[300px] lg:min-h-[550px] flex items-center justify-center overflow-hidden">
              <img
                src={attraction.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = attraction.fallbackImage;
                }}
                alt={attraction.nameJP}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

              {/* Image EXIF Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md text-xs font-mono text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800">
                <Camera className="w-3.5 h-3.5 text-blue-400" />
                {attraction.exif}
              </div>
            </div>

            {/* Editorial Information Sidepanel */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">
                    SPOTLIGHT ARCHIVE
                  </span>
                  <button
                    onClick={() => onToggleBookmark(attraction)}
                    className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full transition border ${
                      isBookmarked
                        ? 'bg-blue-600/30 text-blue-300 border-blue-500/50'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isBookmarked ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-400" /> 已存入風光手帳
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5 text-slate-400" /> 收藏此景點
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-3xl font-serif font-bold text-white mt-3">
                  {attraction.nameJP}
                </h3>
                <div className="text-sm font-sans text-slate-400 font-medium tracking-wider">
                  {attraction.nameEN}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-4 font-sans border-l-2 border-blue-500 pl-3">
                  {attraction.tagline}
                </p>

                <p className="text-sm text-slate-400 leading-relaxed mt-4">
                  {attraction.description}
                </p>

                <div className="mt-6 space-y-3 border-t border-slate-800 pt-4 text-xs font-sans">
                  {attraction.bestTime && (
                    <div className="flex items-start gap-2.5 text-slate-300">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-200">最佳光影時段：</span>
                        {attraction.bestTime}
                      </div>
                    </div>
                  )}

                  {attraction.gourmetNote && (
                    <div className="flex items-start gap-2.5 text-slate-300">
                      <Utensils className="w-4 h-4 text-crimson text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-200">雜誌美饌推薦：</span>
                        {attraction.gourmetNote}
                      </div>
                    </div>
                  )}

                  {attraction.secretTip && (
                    <div className="flex items-start gap-2.5 text-slate-300">
                      <Lightbulb className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-200">攝影隱藏建議：</span>
                        {attraction.secretTip}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>HOKKAIDO ARCHIVE // ISSUE 08</span>
                <span>JAPANESE EDITORIAL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
