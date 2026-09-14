import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Printer, MapPin, ExternalLink, BookmarkCheck } from 'lucide-react';
import { Attraction } from '../data/hokkaidoData';

interface TravelJournalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Attraction[];
  onRemoveBookmark: (attractionId: string) => void;
  onSelectAttraction: (attraction: Attraction) => void;
}

export const TravelJournalDrawer: React.FC<TravelJournalDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onSelectAttraction,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#0C121E] border-l border-slate-800 text-slate-100 shadow-2xl magazine-grain flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest">
                    <BookmarkCheck className="w-4 h-4" />
                    MY TRAVEL CLIPPINGS
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mt-1">
                    風光手帳 · 景點剪貼簿 ({bookmarks.length})
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Saved Items List */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {bookmarks.length === 0 ? (
                  <div className="text-center py-16 text-slate-500">
                    <BookmarkCheck className="w-12 h-12 stroke-[1] mx-auto opacity-30 mb-3" />
                    <p className="font-serif text-base text-slate-400">尚無收藏的景點剪影</p>
                    <p className="text-xs mt-1">在各區域頁面瀏覽時，點擊「收藏此景點」即可存入個人手帳。</p>
                  </div>
                ) : (
                  bookmarks.map((item) => (
                    <div
                      key={item.id}
                      className="group relative bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex gap-4 hover:border-slate-700 transition"
                    >
                      <img
                        src={item.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = item.fallbackImage;
                        }}
                        alt={item.nameJP}
                        className="w-20 h-20 rounded-lg object-cover shrink-0 cursor-pointer"
                        onClick={() => {
                          onSelectAttraction(item);
                          onClose();
                        }}
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4
                              onClick={() => {
                                onSelectAttraction(item);
                                onClose();
                              }}
                              className="font-serif font-bold text-white hover:text-blue-400 cursor-pointer truncate"
                            >
                              {item.nameJP}
                            </h4>
                            <button
                              onClick={() => onRemoveBookmark(item.id)}
                              className="text-slate-500 hover:text-red-400 p-1 transition"
                              title="移除"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs text-slate-400 truncate">{item.nameEN}</div>
                        </div>

                        <div className="text-xs text-slate-400 line-clamp-1 mt-1 font-mono">
                          📷 {item.exif}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer Actions */}
              {bookmarks.length > 0 && (
                <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    已建立旅行清單
                  </div>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-serif text-sm font-semibold transition shadow-md shadow-blue-900/30"
                  >
                    <Printer className="w-4 h-4" /> 輸出行程誌
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
