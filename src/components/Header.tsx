import React from 'react';
import { StoreProfile } from '../types';
import { Sparkles, Store, Crown, Bell, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentStore: StoreProfile;
  stores: StoreProfile[];
  onSelectStore: (store: StoreProfile) => void;
  onOpenStoreModal: () => void;
  onOpenProModal: () => void;
  isPro: boolean;
  dailyUsageCount: number;
  maxDailyCount: number;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStore,
  stores,
  onSelectStore,
  onOpenStoreModal,
  onOpenProModal,
  isPro,
  dailyUsageCount,
  maxDailyCount,
  onOpenSettings
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Store Selector & Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
            AI
          </div>
          <div>
            <div className="flex items-center gap-1.5 cursor-pointer relative" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="font-bold text-slate-900 text-base flex items-center gap-1 hover:text-blue-600 transition-colors">
                {currentStore.storeName}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {currentStore.category}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">사진 한 장이면 홍보가 시작됩니다</p>

            {/* Store Switcher Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-12 left-12 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-xs font-bold text-slate-500 px-3 py-1.5 border-b border-slate-100">
                  내 가게 목록
                </div>
                {stores.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      onSelectStore(st);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      st.id === currentStore.id ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{st.storeName}</span>
                    <span className="text-[10px] text-slate-400">{st.category}</span>
                  </button>
                ))}
                <div className="mt-1 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenStoreModal();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl flex items-center gap-1.5"
                  >
                    <Store className="w-3.5 h-3.5" />
                    가게 정보 수정 / 추가
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Usage Pill & Pro Badge */}
        <div className="flex items-center gap-2">
          {isPro ? (
            <button
              onClick={onOpenProModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black shadow-xs hover:brightness-105"
            >
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>PRO 무제한</span>
            </button>
          ) : (
            <button
              onClick={onOpenProModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>남은 생성: {maxDailyCount - dailyUsageCount}회</span>
            </button>
          )}

          <button
            onClick={onOpenSettings}
            aria-label="설정"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
