import React, { useState, useRef } from 'react';
import {
  UtensilsCrossed,
  Plus,
  Trash2,
  Download,
  Share2,
  Sparkles,
  Edit2,
  Check,
  Star
} from 'lucide-react';
import { StoreProfile, MenuItem } from '../types';
import { DEFAULT_MENU_ITEMS } from '../data/defaultData';

interface MenuMakerScreenProps {
  currentStore: StoreProfile;
}

export const MenuMakerScreen: React.FC<MenuMakerScreenProps> = ({ currentStore }) => {
  const [menus, setMenus] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<'메인메뉴' | '사이드' | '음료/주류' | '세트'>('메인메뉴');
  const [menuTheme, setMenuTheme] = useState<'chalk' | 'clean' | 'warm'>('clean');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const menuCanvasRef = useRef<HTMLDivElement>(null);

  const handleAddMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice.trim()) return;

    const item: MenuItem = {
      id: 'm_' + Date.now(),
      name: newName.trim(),
      price: newPrice.includes('원') ? newPrice.trim() : `${newPrice.trim()}원`,
      category: newCategory,
      isPopular: false
    };

    setMenus([...menus, item]);
    setNewName('');
    setNewPrice('');
  };

  const handleDeleteMenu = (id: string) => {
    setMenus(menus.filter((m) => m.id !== id));
  };

  const handleTogglePopular = (id: string) => {
    setMenus(
      menus.map((m) => (m.id === id ? { ...m, isPopular: !m.isPopular } : m))
    );
  };

  const handlePriceChange = (id: string, val: string) => {
    setMenus(
      menus.map((m) => (m.id === id ? { ...m, price: val } : m))
    );
  };

  const handleExport = () => {
    // Generate simple canvas snapshot download
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = menuTheme === 'chalk' ? '#1E293B' : menuTheme === 'warm' ? '#FFFBEB' : '#FFFFFF';
    ctx.fillRect(0, 0, 1200, 1600);

    // Border
    ctx.strokeStyle = menuTheme === 'chalk' ? '#475569' : '#E2E8F0';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 1140, 1540);

    // Header
    ctx.textAlign = 'center';
    ctx.fillStyle = menuTheme === 'chalk' ? '#F8FAFC' : '#0F172A';
    ctx.font = 'bold 56px sans-serif';
    ctx.fillText(currentStore.storeName, 600, 140);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = menuTheme === 'chalk' ? '#94A3B8' : '#64748B';
    ctx.fillText(`MENU & PRICE • ${currentStore.category}`, 600, 190);

    // Categories
    const categories: ('메인메뉴' | '사이드' | '음료/주류' | '세트')[] = ['메인메뉴', '사이드', '음료/주류', '세트'];
    let currentY = 270;

    categories.forEach((cat) => {
      const catItems = menus.filter((m) => m.category === cat);
      if (catItems.length === 0) return;

      // Section Header
      ctx.textAlign = 'left';
      ctx.fillStyle = menuTheme === 'chalk' ? '#F59E0B' : '#DC2626';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(`[ ${cat} ]`, 80, currentY);

      currentY += 50;

      catItems.forEach((item) => {
        ctx.font = '30px sans-serif';
        ctx.fillStyle = menuTheme === 'chalk' ? '#F1F5F9' : '#1E293B';
        const popularTag = item.isPopular ? '★ ' : '';
        ctx.fillText(popularTag + item.name, 90, currentY);

        ctx.textAlign = 'right';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillStyle = menuTheme === 'chalk' ? '#FBBF24' : '#0F172A';
        ctx.fillText(item.price, 1100, currentY);

        ctx.textAlign = 'left';
        currentY += 55;
      });

      currentY += 30;
    });

    // Footer contact
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748B';
    ctx.font = '24px sans-serif';
    ctx.fillText(`☎ ${currentStore.phone}  |  ${currentStore.address}`, 600, 1500);

    const link = document.createElement('a');
    link.download = `${currentStore.storeName}_메뉴판.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-28 space-y-6 animate-in fade-in">
      <div>
        <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full mb-2">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          메뉴판 & 가격표 제작기
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          메뉴와 가격을 넣으면 자동 완성
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          가격을 수정하면 포스터 메뉴판에 즉시 반영되며, A4 인쇄용 이미지로 바로 저장할 수 있습니다.
        </p>
      </div>

      {/* Theme selection & Action */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-1">테마:</span>
          {[
            { id: 'clean', label: '화이트 깔끔' },
            { id: 'chalk', label: '칠판 다크' },
            { id: 'warm', label: '베이지 감성' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setMenuTheme(t.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                menuTheme === t.id
                  ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-all"
        >
          <Download className="w-4 h-4" />
          {downloadSuccess ? '다운로드 완료!' : '메뉴판 이미지 저장'}
        </button>
      </div>

      {/* Live Menu Visual Sheet */}
      <div
        ref={menuCanvasRef}
        className={`p-6 rounded-3xl border-4 shadow-lg transition-colors ${
          menuTheme === 'chalk'
            ? 'bg-slate-900 border-slate-700 text-white'
            : menuTheme === 'warm'
            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="text-center pb-4 border-b border-dashed border-current/20">
          <span className="text-[11px] font-bold opacity-60 tracking-wider">
            {currentStore.category} • MENU
          </span>
          <h3 className="text-2xl font-black mt-1">{currentStore.storeName}</h3>
          <p className="text-xs opacity-75 mt-0.5">{currentStore.tagline || '정성을 다해 조리합니다'}</p>
        </div>

        {/* Categories grouping */}
        <div className="py-4 space-y-5">
          {(['메인메뉴', '사이드', '음료/주류', '세트'] as const).map((cat) => {
            const catItems = menus.filter((m) => m.category === cat);
            if (catItems.length === 0) return null;

            return (
              <div key={cat} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    {cat}
                  </span>
                  <div className="h-px bg-current/15 flex-1" />
                </div>

                <div className="space-y-2">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-sm py-1 border-b border-current/5"
                    >
                      <div className="flex items-center gap-2">
                        {item.isPopular && (
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                            BEST
                          </span>
                        )}
                        <span className="font-bold">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          className="w-24 text-right px-2 py-0.5 rounded-md border border-current/20 text-xs font-black bg-transparent focus:bg-white focus:text-slate-900 focus:outline-amber-500"
                        />
                        <button
                          onClick={() => handleTogglePopular(item.id)}
                          title="대표 메뉴 지정"
                          className={`p-1 rounded-md transition-colors ${
                            item.isPopular ? 'text-amber-500' : 'opacity-40 hover:opacity-80'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => handleDeleteMenu(item.id)}
                          title="삭제"
                          className="opacity-40 hover:opacity-100 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-dashed border-current/20 text-center text-xs opacity-60">
          ☎ {currentStore.phone} • 📍 {currentStore.address}
        </div>
      </div>

      {/* Add New Menu Form */}
      <form
        onSubmit={handleAddMenu}
        className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs space-y-3"
      >
        <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
          <Plus className="w-4 h-4 text-amber-500" />
          새 메뉴 추가하기
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <span className="text-[10px] font-bold text-slate-500 block mb-1">분류</span>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white"
            >
              <option value="메인메뉴">메인메뉴</option>
              <option value="사이드">사이드</option>
              <option value="음료/주류">음료/주류</option>
              <option value="세트">세트</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 block mb-1">메뉴 이름</span>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="예: 마늘간장 치킨"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 block mb-1">가격</span>
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="예: 11,900원"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> 메뉴판에 추가하기
        </button>
      </form>
    </div>
  );
};
