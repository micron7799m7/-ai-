import React, { useState } from 'react';
import {
  Wand2,
  Sliders,
  Sparkles,
  ArrowRight,
  SunMedium,
  Flame,
  Contrast,
  RotateCcw,
  Check,
  Camera,
  Upload
} from 'lucide-react';
import { SAMPLE_IMAGES } from '../data/defaultData';

interface PhotoEnhanceScreenProps {
  onUsePhotoForPromo: (photoUrl: string) => void;
}

export const PhotoEnhanceScreen: React.FC<PhotoEnhanceScreenProps> = ({
  onUsePhotoForPromo
}) => {
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_IMAGES[0].url);
  const [activeFilter, setActiveFilter] = useState<'delicious' | 'bright' | 'vivid' | 'clean'>('delicious');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isApplying, setIsApplying] = useState(false);

  const filterStyles = {
    delicious: 'brightness(1.1) saturate(1.35) contrast(1.15) sepia(0.08)',
    bright: 'brightness(1.25) contrast(1.05) saturate(1.1)',
    vivid: 'saturate(1.5) contrast(1.25) brightness(1.05)',
    clean: 'contrast(1.2) brightness(1.15) saturate(1.05)'
  };

  const filterNames = [
    { id: 'delicious', label: '음식 맛깔 보정', desc: '따뜻한 색감과 채도를 살려 식욕을 돋우는 보정', icon: Flame },
    { id: 'bright', label: '어두운 사진 밝게', desc: '실내 조명이 어두운 매장 사진을 화사하게', icon: SunMedium },
    { id: 'vivid', label: '선명하고 쨍하게', desc: '디테일과 질감을 살리는 고대비 선명도', icon: Contrast },
    { id: 'clean', label: '깔끔한 상품 중심', desc: '배경 잡티를 정돈하고 상품을 돋보이게', icon: Sparkles }
  ];

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      onUsePhotoForPromo(photoUrl);
    }, 600);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-28 space-y-6 animate-in fade-in">
      <div>
        <div className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full mb-2">
          <Wand2 className="w-3.5 h-3.5" />
          AI 스마트 사진 보정실
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          맛있고 화사하게 사진 업그레이드
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          실제 메뉴의 매력을 100% 살릴 수 있도록 밝기, 채도, 선명도를 최적화합니다.
        </p>
      </div>

      {/* Before / After Interactive Visual Slider */}
      <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-bold text-slate-300">좌: 원본 ⟷ 우: AI 보정본</span>
          <span className="text-[11px] text-amber-400 font-semibold">슬라이더를 좌우로 드래그하세요</span>
        </div>

        {/* Dual Layer Container */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden select-none bg-black">
          {/* Base Layer: Filtered (After) */}
          <img
            src={photoUrl}
            alt="AI 보정본"
            referrerPolicy="no-referrer"
            style={{ filter: filterStyles[activeFilter] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-cyan-500/90 text-white font-black text-[10px] shadow-sm">
            AI 보정 후
          </div>

          {/* Top Layer: Original (Before) clipped by sliderPosition */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={photoUrl}
              alt="원본"
              referrerPolicy="no-referrer"
              className="absolute inset-y-0 left-0 max-w-none h-full object-cover"
              style={{ width: '100%' }}
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white font-bold text-[10px]">
              원본
            </div>
          </div>

          {/* Dividing Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-slate-900 font-bold text-xs">
              ↔
            </div>
          </div>

          {/* Hidden input range for dragging */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
          />
        </div>

        {/* Slider manual control */}
        <div className="pt-1 flex items-center gap-3">
          <span className="text-[11px] text-slate-400">원본 비율</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="flex-1 accent-cyan-500"
          />
          <span className="text-[11px] text-slate-400">{sliderPosition}%</span>
        </div>
      </div>

      {/* Preset Filters Grid */}
      <div className="space-y-2">
        <span className="text-xs font-extrabold text-slate-900 block px-1">
          보정 모드 선택
        </span>

        <div className="grid grid-cols-2 gap-2">
          {filterNames.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeFilter === f.id
                  ? 'border-cyan-500 bg-cyan-50/70 shadow-2xs ring-2 ring-cyan-400/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  activeFilter === f.id ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <f.icon className="w-4 h-4" />
                </div>
                {activeFilter === f.id && <Check className="w-4 h-4 text-cyan-600" />}
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">{f.label}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{f.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Use photo button */}
      <button
        onClick={handleApply}
        disabled={isApplying}
        className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-black text-base shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <Sparkles className="w-5 h-5" />
        <span>이 사진으로 홍보물 만들기</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
