import React from 'react';
import { Home, Sparkles, MessageSquareQuote, FolderHeart, UtensilsCrossed } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-4 shadow-lg safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px]">홈</span>
        </button>

        <button
          onClick={() => onSelectTab('copy')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'copy' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquareQuote className="w-5 h-5" />
          <span className="text-[11px]">문구/리뷰</span>
        </button>

        {/* Highlighted AI Center Action */}
        <button
          onClick={() => onSelectTab('wizard')}
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-13 h-13 rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 group-active:scale-95 transition-transform">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[11px] font-black text-rose-600 mt-1">AI 제작</span>
        </button>

        <button
          onClick={() => onSelectTab('menu')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'menu' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[11px]">메뉴판</span>
        </button>

        <button
          onClick={() => onSelectTab('archive')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'archive' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FolderHeart className="w-5 h-5" />
          <span className="text-[11px]">보관함</span>
        </button>
      </div>
    </nav>
  );
};
