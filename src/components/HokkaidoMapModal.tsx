import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Sparkles } from 'lucide-react';
import { HOKKAIDO_REGIONS, RegionData } from '../data/hokkaidoData';

interface HokkaidoMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRegion: (regionId: string) => void;
  activeRegionId: string;
}

// Map positions relative to vector viewBox (0 0 600 450)
const MAP_PINS: { [key: string]: { x: number; y: number } } = {
  sapporo: { x: 250, y: 260 },
  hakodate: { x: 180, y: 380 },
  otaru: { x: 225, y: 235 },
  furano: { x: 330, y: 230 },
  asahikawa: { x: 340, y: 180 },
  shiretoko: { x: 500, y: 120 },
};

export const HokkaidoMapModal: React.FC<HokkaidoMapModalProps> = ({
  isOpen,
  onClose,
  onSelectRegion,
  activeRegionId,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0C121D] border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 magazine-grain"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase">
                  <Navigation className="w-3.5 h-3.5" />
                  HOKKAIDO GEOGRAPHICAL ARCHIVE
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-slate-100 font-bold mt-1">
                  北海道行政區域指南圖
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* SVG Vector Map */}
              <div className="lg:col-span-8 relative bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 flex items-center justify-center">
                <svg
                  viewBox="0 0 600 450"
                  className="w-full h-auto max-h-[380px] drop-shadow-[0_0_20px_rgba(0,102,255,0.15)]"
                >
                  {/* Hokkaido Island Silhouette Path */}
                  <path
                    d="M 120 340 C 130 310, 160 280, 200 240 C 210 220, 240 210, 260 190 C 270 170, 310 140, 350 130 C 390 120, 440 90, 490 80 C 530 75, 560 90, 540 130 C 510 160, 470 180, 440 210 C 410 240, 380 270, 350 300 C 310 320, 260 340, 220 350 Z M 160 410 C 145 390, 170 370, 195 385 Z"
                    fill="#152033"
                    stroke="#2A3B5C"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* Simplified Hokkaido Boundary Outline */}
                  <path
                    d="M 110 330 Q 140 260 210 230 T 320 180 T 480 90 Q 550 80 520 140 T 420 230 T 310 310 T 200 370 Q 140 430 170 370 Z"
                    fill="url(#hokkaidoGradient)"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    opacity="0.9"
                  />

                  <defs>
                    <linearGradient id="hokkaidoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="50%" stopColor="#0F172A" />
                      <stop offset="100%" stopColor="#0B132B" />
                    </linearGradient>
                  </defs>

                  {/* Region Hotspot Pins */}
                  {HOKKAIDO_REGIONS.map((region) => {
                    const pos = MAP_PINS[region.id] || { x: 300, y: 200 };
                    const isActive = region.id === activeRegionId;

                    return (
                      <g
                        key={region.id}
                        onClick={() => {
                          onSelectRegion(region.id);
                          onClose();
                        }}
                        className="cursor-pointer group"
                      >
                        {/* Pulse Ring */}
                        {isActive && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="16"
                            className="fill-blue-500/20 stroke-blue-400 stroke-[1.5] animate-ping"
                          />
                        )}

                        {/* Outer Glow */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isActive ? 12 : 8}
                          className={`transition-all duration-300 ${
                            isActive
                              ? 'fill-blue-500 stroke-white stroke-2'
                              : 'fill-slate-800 stroke-blue-400/80 group-hover:fill-blue-600 group-hover:scale-125'
                          }`}
                        />

                        {/* Inner Dot */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="3"
                          fill="#FFFFFF"
                        />

                        {/* Label Badge */}
                        <g transform={`translate(${pos.x + 12}, ${pos.y - 12})`}>
                          <rect
                            x="0"
                            y="0"
                            width={region.nameJP.length * 16 + 24}
                            height="24"
                            rx="4"
                            className={`transition-all duration-300 ${
                              isActive
                                ? 'fill-blue-600 shadow-lg shadow-blue-500/40'
                                : 'fill-slate-900/90 stroke-slate-700 group-hover:fill-slate-800'
                            }`}
                          />
                          <text
                            x="12"
                            y="16"
                            fill="#FFFFFF"
                            fontSize="12"
                            fontWeight="bold"
                            fontFamily="Zen Mincho, serif"
                          >
                            {region.nameJP}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* Map Floating Tip */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  點擊圖中紅標快速切換區域頁面
                </div>
              </div>

              {/* Region Selector Grid */}
              <div className="lg:col-span-4 space-y-2.5">
                <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
                  REGIONS DIRECTORY ({HOKKAIDO_REGIONS.length})
                </div>

                {HOKKAIDO_REGIONS.map((region) => {
                  const isActive = region.id === activeRegionId;
                  return (
                    <button
                      key={region.id}
                      onClick={() => {
                        onSelectRegion(region.id);
                        onClose();
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                        isActive
                          ? 'bg-blue-950/40 border-blue-500/80 text-white shadow-md shadow-blue-900/20'
                          : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {region.issueNo.replace('ISSUE ', '')}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-base flex items-center gap-2">
                            {region.nameJP}
                            <span className="text-xs font-sans font-normal text-slate-400">
                              {region.nameRomaji}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {region.tagline}
                          </div>
                        </div>
                      </div>
                      <MapPin
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-blue-400 scale-110' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
