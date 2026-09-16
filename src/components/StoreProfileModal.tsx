import React, { useState } from 'react';
import { Store, X, Plus, Check, MapPin, Phone, Palette, Building } from 'lucide-react';
import { StoreProfile, CategoryType } from '../types';
import { CATEGORIES_LIST } from '../data/defaultData';

interface StoreProfileModalProps {
  currentStore: StoreProfile;
  stores: StoreProfile[];
  onClose: () => void;
  onSaveStore: (updated: StoreProfile) => void;
  onAddNewStore: (newStore: StoreProfile) => void;
}

export const StoreProfileModal: React.FC<StoreProfileModalProps> = ({
  currentStore,
  stores,
  onClose,
  onSaveStore,
  onAddNewStore
}) => {
  const [storeName, setStoreName] = useState(currentStore.storeName);
  const [category, setCategory] = useState<CategoryType>(currentStore.category);
  const [phone, setPhone] = useState(currentStore.phone);
  const [address, setAddress] = useState(currentStore.address);
  const [primaryColor, setPrimaryColor] = useState(currentStore.primaryColor);
  const [tagline, setTagline] = useState(currentStore.tagline || '');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const colors = ['#DC2626', '#2563EB', '#D97706', '#059669', '#4F46E5', '#0F172A', '#E11D48'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingNew) {
      const newSt: StoreProfile = {
        id: 'store_' + Date.now(),
        storeName: storeName.trim() || '새 매장',
        category,
        phone,
        address,
        primaryColor,
        tagline
      };
      onAddNewStore(newSt);
    } else {
      const updated: StoreProfile = {
        ...currentStore,
        storeName,
        category,
        phone,
        address,
        primaryColor,
        tagline
      };
      onSaveStore(updated);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <h3 className="font-black text-lg text-slate-900">
              {isAddingNew ? '새 매장 등록' : '내 가게 정보 관리'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-extrabold text-slate-900 block mb-1">상호명</label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="font-extrabold text-slate-900 block mb-1">업종</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white"
            >
              {CATEGORIES_LIST.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-extrabold text-slate-900 block mb-1">대표 전화번호</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="예: 02-1234-5678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="font-extrabold text-slate-900 block mb-1">매장 주소</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="예: 서울시 마포구 독막로 123"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="font-extrabold text-slate-900 block mb-1">가게 슬로건 / 한 줄 소개</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="예: 30년 전통 겉바속촉 수제 치킨"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="font-extrabold text-slate-900 block mb-1.5">대표 브랜드 색상</label>
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <div
                  key={c}
                  onClick={() => setPrimaryColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full cursor-pointer transition-transform ${
                    primaryColor === c ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'opacity-80'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all"
            >
              {isAddingNew ? '새 매장 등록하기' : '가게 정보 저장하기'}
            </button>

            {!isAddingNew && (
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(true);
                  setStoreName('');
                  setPhone('');
                  setAddress('');
                  setTagline('');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> 다른 매장 추가하기 (다점포)
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
