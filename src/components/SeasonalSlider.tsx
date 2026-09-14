import React, { useState } from 'react';
import { Sun, Snowflake, ArrowLeftRight } from 'lucide-react';
import { SeasonalPair } from '../data/hokkaidoData';

interface SeasonalSliderProps {
  seasonalPair: SeasonalPair;
  regionName: string;
}

export const SeasonalSlider: React.FC<SeasonalSliderProps> = ({
  seasonalPair,
  regionName,
}) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, rect);
    }
  };

  return (
    <div className="my-16 magazine-grain bg-slate-900/60 p-6 md:p-8 border border-slate-800 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-slate-800/80 gap-4">
        <div>
          <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
            // SEASONAL DUALITY SPECTRUM
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-100 mt-1">
            {regionName} · 雙季風姿對比展演
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1 text-amber-300">
            <Sun className="w-4 h-4" /> 夏日綠彩 ({sliderPos.toFixed(0)}%)
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-cyan-300">
            <Snowflake className="w-4 h-4" /> 冬季粉雪 ({(100 - sliderPos).toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* Interactive Image Split Container */}
      <div
        className="relative w-full h-[380px] md:h-[500px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-700/50 shadow-2xl"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Winter Background Image (Right side) */}
        <div className="absolute inset-0 w-full h-full bg-slate-900">
          <img
            src={seasonalPair.winterImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = seasonalPair.winterFallback;
            }}
            alt={seasonalPair.winterTitle}
            className="w-full h-full object-cover"
          />
          {/* Winter Text Overlay */}
          <div className="absolute bottom-6 right-6 max-w-sm text-right bg-slate-950/70 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
            <div className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 mb-1">
              <Snowflake className="w-3.5 h-3.5" /> 冬季銀白刻度
            </div>
            <h4 className="font-serif text-lg font-bold text-white">
              {seasonalPair.winterTitle}
            </h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {seasonalPair.winterDesc}
            </p>
          </div>
        </div>

        {/* Summer Foreground Image (Left side clipped by sliderPos) */}
        <div
          className="absolute top-0 left-0 bottom-0 overflow-hidden bg-slate-900 transition-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={seasonalPair.summerImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = seasonalPair.summerFallback;
            }}
            alt={seasonalPair.summerTitle}
            className="absolute top-0 left-0 h-full max-w-none object-cover"
            style={{ width: '100%', minWidth: '1000px' }}
          />
          {/* Summer Text Overlay */}
          <div className="absolute bottom-6 left-6 max-w-sm text-left bg-slate-950/70 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
            <div className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 mb-1">
              <Sun className="w-3.5 h-3.5" /> 夏日熱情彩繪
            </div>
            <h4 className="font-serif text-lg font-bold text-white">
              {seasonalPair.summerTitle}
            </h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {seasonalPair.summerDesc}
            </p>
          </div>
        </div>

        {/* Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-xl flex items-center justify-center text-white">
            <ArrowLeftRight className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs font-mono text-slate-500">
        ⇄ 左右拖曳中央防護滑塊以切換夏冬兩季畫面
      </div>
    </div>
  );
};
