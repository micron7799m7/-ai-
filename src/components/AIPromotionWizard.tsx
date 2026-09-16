import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  ArrowLeft,
  Check,
  Wand2,
  AlertCircle,
  HelpCircle,
  Tag,
  Palette,
  Layers,
  ChevronRight,
  RefreshCw,
  Edit3,
  Download,
  Share2
} from 'lucide-react';
import { StoreProfile, CategoryType, MoodType, DesignVariant, RatioType, PromotionProject } from '../types';
import { SAMPLE_IMAGES, QUICK_PROMO_CHIPS, CATEGORIES_LIST } from '../data/defaultData';

interface AIPromotionWizardProps {
  currentStore: StoreProfile;
  initialMode?: string;
  onBack: () => void;
  onComplete: (project: PromotionProject) => void;
  onOpenEditor: (project: PromotionProject) => void;
  onConsumeUsage: () => boolean;
}

export const AIPromotionWizard: React.FC<AIPromotionWizardProps> = ({
  currentStore,
  initialMode,
  onBack,
  onComplete,
  onOpenEditor,
  onConsumeUsage
}) => {
  // Form State
  const [storeName, setStoreName] = useState(currentStore.storeName);
  const [category, setCategory] = useState<CategoryType>(currentStore.category);
  const [promoContent, setPromoContent] = useState(() => {
    if (initialMode === 'flyer') return '오픈 기념 감사 대축제 1+1 이벤트';
    if (initialMode === 'sale') return '오늘만 파격 타임세일 반값 할인';
    if (initialMode === 'banner') return '신메뉴 런칭 기념 현수막 특가 안내';
    return '오늘만 파격 할인 1+1 이벤트';
  });
  const [price, setPrice] = useState(() => {
    if (initialMode === 'sale') return '파격 반값 50% 할인';
    return '파격 특가 9,900원';
  });
  const [period, setPeriod] = useState('선착순 50명 한정');
  const [phone, setPhone] = useState(currentStore.phone);
  const [address, setAddress] = useState(currentStore.address);
  const [mood, setMood] = useState<MoodType>(() => {
    if (initialMode === 'sale') return '강렬한';
    if (initialMode === 'flyer') return '깔끔한';
    return '맛있어 보이는';
  });
  const [ratio, setRatio] = useState<RatioType>(() => {
    if (initialMode === 'flyer') return 'A4';
    if (initialMode === 'banner') return '16:9';
    if (initialMode === 'sns') return '1:1';
    return '1:1';
  });
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_IMAGES[0].url);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Loading & Result State
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [generatedVariants, setGeneratedVariants] = useState<DesignVariant[] | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const moods: MoodType[] = [
    '맛있어 보이는',
    '강렬한',
    '깔끔한',
    '따뜻한',
    '고급스러운',
    '귀여운',
    '감성적인',
    '전통적인',
    '젊은 느낌'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!onConsumeUsage()) {
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setLoadingStep(1);

    // Progressive step simulation for visual feedback
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1100);

    try {
      const res = await fetch('/api/ai/generate-promotion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName,
          category,
          promoContent,
          price,
          period,
          phone,
          address,
          mood
        })
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (data.success && data.variants) {
        setGeneratedVariants(data.variants);
        setSelectedVariantIndex(0);
      } else {
        throw new Error('생성에 실패했습니다.');
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.warn('Using client-side fallback generation:', err);
      // Fallback fallback variants
      setGeneratedVariants([
        {
          id: 'bold_sale',
          styleName: '강렬한 할인형',
          styleDesc: '붉은색과 황금색의 시선 집중 특가 포스터',
          headline: `오늘만 파격 할인! ${promoContent}`,
          subheadline: `선착순 한정 혜택 놓치지 마세요`,
          bodyCopy: `${storeName}에서 정성껏 준비했습니다. 지금 바로 주문/방문하세요!`,
          priceBadge: price || '초특가 9,900원',
          cta: '지금 바로 포장/주문하기',
          bgTheme: 'red',
          primaryColor: '#DC2626',
          accentColor: '#FBBF24',
          tag: '인기 1위'
        },
        {
          id: 'clean_modern',
          styleName: '깔끔한 모던형',
          styleDesc: '신뢰감을 주는 정갈한 모던 디자인',
          headline: `${storeName}의 특별한 제안`,
          subheadline: `${promoContent}`,
          bodyCopy: `매일 아침 엄선된 재료로 고객 감동을 선물합니다.`,
          priceBadge: price || '특별 할인가',
          cta: '매장에서 직접 만나보세요',
          bgTheme: 'light',
          primaryColor: '#2563EB',
          accentColor: '#10B981',
          tag: '추천'
        },
        {
          id: 'warm_emotional',
          styleName: '따뜻한 감성형',
          styleDesc: '포근하고 친근한 동네 단골 감성 디자인',
          headline: `지친 하루, 든든한 한 끼의 위로`,
          subheadline: `${storeName}이 드리는 소박한 선물`,
          bodyCopy: `정직한 손맛과 정성으로 따뜻하게 준비했습니다.`,
          priceBadge: price || '착한 가격',
          cta: '따뜻한 온기를 포장해가세요',
          bgTheme: 'warm',
          primaryColor: '#B45309',
          accentColor: '#FDE68A',
          tag: '단골 추천'
        },
        {
          id: 'luxury',
          styleName: '프리미엄 고급형',
          styleDesc: '격조 높은 품격의 스페셜 디자인',
          headline: `비교할 수 없는 퀄리티, ${storeName}`,
          subheadline: `최상의 품격으로 초대합니다`,
          bodyCopy: `오직 당신만을 위한 프리미엄 오퍼. 특별한 순간을 완성하세요.`,
          priceBadge: `Special: ${price}`,
          cta: '프리미엄 예약하기',
          bgTheme: 'dark',
          primaryColor: '#0F172A',
          accentColor: '#F59E0B',
          tag: '고급형'
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const createFinalProject = (variant: DesignVariant): PromotionProject => {
    return {
      id: 'proj_' + Date.now(),
      storeName,
      category,
      title: `${promoContent} (${variant.styleName})`,
      ratio,
      photoUrl,
      headline: variant.headline,
      subheadline: variant.subheadline,
      bodyCopy: variant.bodyCopy,
      priceBadge: variant.priceBadge,
      cta: variant.cta,
      phone,
      address,
      primaryColor: variant.primaryColor,
      accentColor: variant.accentColor,
      bgTheme: variant.bgTheme,
      fontSizeLevel: 'large',
      fontFamily: variant.id === 'warm_emotional' ? 'serif' : 'display',
      createdAt: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isFavorite: true
    };
  };

  // 1. Loading Screen
  if (isGenerating) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-8 animate-in fade-in">
        <div className="relative w-28 h-28 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-rose-200 border-t-rose-600 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-linear-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-12 h-12 animate-pulse" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-700">
            AI 스마트 마케팅 엔진 작동 중
          </span>
          <h3 className="text-2xl font-black text-slate-900">
            {loadingStep === 1 && '사진과 매장 정보를 분석하고 있어요...'}
            {loadingStep === 2 && '눈길을 사로잡는 홍보문구를 짓고 있어요...'}
            {loadingStep === 3 && '4가지 맞춤 스타일 디자인을 완성하고 있어요...'}
          </h3>
          <p className="text-sm text-slate-500">
            전문 디자이너의 레이아웃과 배색 원칙을 적용하고 있습니다.
          </p>
        </div>

        <div className="max-w-xs mx-auto space-y-2 text-left text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className={`flex items-center gap-2 ${loadingStep >= 1 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
            <Check className="w-4 h-4" /> 1. 사진 최적화 및 업종 키워드 추출
          </div>
          <div className={`flex items-center gap-2 ${loadingStep >= 2 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
            <Check className="w-4 h-4" /> 2. 클릭을 부르는 메인 카피라이팅
          </div>
          <div className={`flex items-center gap-2 ${loadingStep >= 3 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
            <Check className="w-4 h-4" /> 3. 4종 멀티 디자인 자동 조판
          </div>
        </div>
      </div>
    );
  }

  // 2. Result Screen (4 Variants Comparison)
  if (generatedVariants) {
    const currentVariant = generatedVariants[selectedVariantIndex];
    const previewProject = createFinalProject(currentVariant);

    return (
      <div className="max-w-xl mx-auto px-4 py-4 pb-28 space-y-5 animate-in fade-in">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setGeneratedVariants(null)}
            className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> 다시 설정하기
          </button>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ 4가지 디자인 완성
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">
            마음에 드는 디자인을 골라보세요
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            원하는 스타일을 터치하여 바로 편집하거나 이미지로 저장할 수 있습니다.
          </p>
        </div>

        {/* 4 Variant Tabs */}
        <div className="grid grid-cols-2 gap-2">
          {generatedVariants.map((variant, idx) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantIndex(idx)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                selectedVariantIndex === idx
                  ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-2 ring-rose-400/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  selectedVariantIndex === idx ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {variant.tag}
                </span>
                {selectedVariantIndex === idx && <Check className="w-4 h-4 text-rose-600" />}
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">{variant.styleName}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{variant.styleDesc}</p>
            </button>
          ))}
        </div>

        {/* Selected Variant Big Preview Card */}
        <div className={`rounded-3xl p-5 border shadow-md relative overflow-hidden transition-colors ${
          currentVariant.bgTheme === 'red'
            ? 'bg-linear-to-b from-red-700 to-rose-900 text-white border-red-800'
            : currentVariant.bgTheme === 'dark'
            ? 'bg-linear-to-b from-slate-900 to-slate-950 text-white border-slate-800'
            : currentVariant.bgTheme === 'warm'
            ? 'bg-linear-to-b from-amber-50 to-orange-100 text-amber-950 border-amber-200'
            : 'bg-white text-slate-900 border-slate-200'
        }`}>
          {/* Ratio badge & Store */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-xs">
              {currentStore.category} • {storeName}
            </span>
            <span className="font-semibold opacity-75">{ratio} 비율</span>
          </div>

          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden bg-slate-200 mb-4 shadow-sm relative">
            <img
              src={photoUrl}
              alt="홍보 사진"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {currentVariant.priceBadge && (
              <div
                style={{ backgroundColor: currentVariant.accentColor }}
                className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-xl text-slate-950 font-black text-sm shadow-md"
              >
                ★ {currentVariant.priceBadge}
              </div>
            )}
          </div>

          {/* Typography Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-black leading-tight tracking-tight">
              {currentVariant.headline}
            </h3>
            <p className="text-sm font-bold opacity-90">
              {currentVariant.subheadline}
            </p>
            <p className="text-xs opacity-75 leading-relaxed">
              {currentVariant.bodyCopy}
            </p>
          </div>

          {/* CTA Bar */}
          <div
            style={{ backgroundColor: currentVariant.primaryColor }}
            className="mt-4 p-3 rounded-xl text-center text-white font-black text-sm shadow-sm"
          >
            {currentVariant.cta}
          </div>

          <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] opacity-75 font-medium">
            <span>☎ {phone}</span>
            <span>📍 {address}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              const project = createFinalProject(currentVariant);
              onComplete(project);
              onOpenEditor(project);
            }}
            className="w-full py-4 rounded-2xl bg-linear-to-r from-rose-600 to-amber-500 text-white font-black text-lg shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] transition-all"
          >
            <Edit3 className="w-5 h-5" />
            이 디자인으로 편집 & 저장하기
          </button>

          <button
            onClick={handleGenerate}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            다른 문구로 다시 만들기
          </button>
        </div>
      </div>
    );
  }

  // 3. Wizard Input Screen
  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-28 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> 홈으로
        </button>
        <div className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          AI 자동 제작 마법사
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black text-slate-900">
          사진과 내용을 입력해주세요
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          스마트폰에 있는 음식이나 매장 사진을 올리시면 AI가 완벽한 홍보물로 만들어드립니다.
        </p>
      </div>

      {/* Step 1: Photo Upload */}
      <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between">
          <label className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-rose-600" />
            1. 홍보할 사진 선택
          </label>
          <span className="text-[11px] text-slate-400 font-medium">1장 필수</span>
        </div>

        {/* Current Photo Preview */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 group">
          <img
            src={photoUrl}
            alt="선택된 사진"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4 text-rose-600" />
              내 사진으로 변경
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Quick Sample Photos Bar */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
            또는 추천 샘플 사진 즉시 선택:
          </span>
          <div className="grid grid-cols-6 gap-2">
            {SAMPLE_IMAGES.map((img) => (
              <div
                key={img.id}
                onClick={() => setPhotoUrl(img.url)}
                className={`h-12 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  photoUrl === img.url ? 'border-rose-600 scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 2: Store Info Check */}
      <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
        <label className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-blue-600" />
          2. 가게 정보
        </label>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-[11px] font-bold text-slate-500">상호명</span>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-blue-500"
            />
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-500">업종</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-blue-500 bg-white"
            >
              {CATEGORIES_LIST.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Step 3: Promo Event Content */}
      <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between">
          <label className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            3. 알리고 싶은 행사 내용
          </label>
          <span className="text-[11px] text-slate-400">간단하게 입력하세요</span>
        </div>

        <input
          type="text"
          value={promoContent}
          onChange={(e) => setPromoContent(e.target.value)}
          placeholder="예: 오늘만 치킨 2마리 19,900원, 신메뉴 출시, 첫방문 30% 할인"
          className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-base font-bold text-slate-900 focus:outline-rose-500"
        />

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
            자주 쓰는 추천 문구 (터치 시 자동 입력):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMO_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setPromoContent(chip)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Period Inputs */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div>
            <span className="text-[11px] font-bold text-slate-500">가격/할인 문구</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="예: 9,900원 특가"
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-rose-600 focus:outline-rose-500"
            />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500">행사 기간</span>
            <input
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="예: 이번 주말 한정"
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Step 4: Mood & Ratio Selection */}
      <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
        <label className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-purple-600" />
          4. 원하는 분위기 & 크기
        </label>

        {/* Mood Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">디자인 분위기:</span>
          <div className="flex flex-wrap gap-1.5">
            {moods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  mood === m
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Ratio Selector */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">홍보물 비율:</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '1:1', label: '1:1 SNS/당근' },
              { id: '4:5', label: '4:5 인스타그램' },
              { id: '9:16', label: '9:16 스토리/쇼츠' },
              { id: '16:9', label: '16:9 가로/배너' },
              { id: 'A4', label: 'A4 인쇄 전단지' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRatio(r.id as RatioType)}
                className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all ${
                  ratio === r.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Submit Button */}
      <div className="pt-2">
        <button
          onClick={handleGenerate}
          className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-rose-600 via-red-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-black text-xl shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span>AI로 만들기</span>
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2">
          4가지 디자인 후보와 SNS 맞춤 홍보글을 자동으로 생성합니다.
        </p>
      </div>
    </div>
  );
};
