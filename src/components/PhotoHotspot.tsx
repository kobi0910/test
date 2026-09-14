import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Info, X } from 'lucide-react';
import { Hotspot } from '../data/hokkaidoData';

interface PhotoHotspotProps {
  hotspot: Hotspot;
}

export const PhotoHotspot: React.FC<PhotoHotspotProps> = ({ hotspot }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="absolute z-20"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      {/* Hotspot Pulse Pin */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group focus:outline-none"
        title={hotspot.title}
      >
        <span className="absolute -inset-2 rounded-full bg-white/30 animate-ping group-hover:bg-blue-400/40" />
        <div className="relative w-7 h-7 rounded-full bg-slate-950/90 border-2 border-white text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-blue-400 transition">
          <Camera className="w-3.5 h-3.5 text-blue-400" />
        </div>
      </button>

      {/* Interactive Info Card Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 md:w-72 bg-slate-950/90 backdrop-blur-xl border border-slate-700/80 rounded-xl p-4 shadow-2xl z-30 magazine-grain"
          >
            <div className="flex items-start justify-between">
              <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded uppercase">
                {hotspot.tag}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-serif font-bold text-slate-100 text-base mt-2">
              {hotspot.title}
            </h4>
            <div className="text-xs text-slate-400 font-sans mt-0.5 font-medium">
              {hotspot.subtitle}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              {hotspot.description}
            </p>

            {hotspot.exif && (
              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Camera className="w-3 h-3 text-blue-400" />
                <span>EXIF: {hotspot.exif}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
