import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Share2,
  Instagram,
  MessageCircle,
  FileText,
  Hash,
  Send
} from 'lucide-react';
import { StoreProfile, CategoryType } from '../types';
import { CATEGORIES_LIST } from '../data/defaultData';

interface CopywriterScreenProps {
  currentStore: StoreProfile;
  onConsumeUsage: () => boolean;
}

export const CopywriterScreen: React.FC<CopywriterScreenProps> = ({
  currentStore,
  onConsumeUsage
}) => {
  const [category, setCategory] = useState<CategoryType>(currentStore.category);
  const [content, setContent] = useState('가마솥 옛날통닭 2마리 19,900원 파격 할인 및 생맥주 첫잔 1,000원');
  const [tone, setTone] = useState<string>('친근하게');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Result state
  const [headline, setHeadline] = useState('오늘 저녁은 치맥 어때요? 2마리 19,900원!');
  const [subheadline, setSubheadline] = useState('바삭한 가마솥 옛날통닭과 시원한 생맥주 첫잔 1,000원');
  const [bodyCopy, setBodyCopy] = useState(
    '퇴근 후 맛있는 행복, 원조 솥뚜껑치킨에서 준비했습니다.\n매일 아침 깨끗한 기름으로 정성껏 튀겨 겉은 바삭하고 속은 촉촉합니다.\n오늘 저녁 사랑하는 가족과 함께 푸짐하게 즐겨보세요!'
  );
  const [cta, setCta] = useState('지금 전화로 포장 주문하세요');

  const [activeChannel, setActiveChannel] = useState<'instagram' | 'karrot' | 'kakao' | 'blog'>('karrot');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerate = async (selectedTone?: string) => {
    const toneToUse = selectedTone || tone;
    if (!onConsumeUsage()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, content, tone: toneToUse })
      });
      const data = await res.json();
      if (data.headline) {
        setHeadline(data.headline);
        setSubheadline(data.subheadline || '');
        setBodyCopy(data.body || '');
        setCta(data.cta || '지금 방문하기');
      }
    } catch (e) {
      console.warn('Fallback copy');
      if (toneToUse === '짧게') {
        setHeadline(`[특가] ${content}!`);
        setSubheadline('오늘만 이 가격, 놓치지 마세요');
        setBodyCopy('서두르세요! 선착순 한정 수량 소진 시 조기 마감됩니다.');
        setCta('지금 바로 주문하기');
      } else if (toneToUse === '더 강렬하게') {
        setHeadline(`초특급 파격 찬스! ${content} 폭탄 세일!`);
        setSubheadline('사장님이 미쳤어요! 역대급 최저가 혜택');
        setBodyCopy('단 하루, 마진 없이 시원하게 쏩니다. 지금 안 오시면 100% 손해!');
        setCta('당장 달려오세요!');
      } else {
        setHeadline(`마음을 담은 제안, ${content}`);
        setSubheadline('정성과 맛으로 고객님을 모십니다');
        setBodyCopy('소중한 분들과 함께 행복한 시간을 누려보세요.');
        setCta('매장에서 만나보세요');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const channelContents = {
    karrot: `안녕하세요 당근 이웃님들! [${currentStore.storeName}] 사장입니다 😊\n\n동네 이웃분들께 제일 먼저 기쁜 소식 전해드려요!\n\n${content}\n\n▶ 메인 혜택: ${headline}\n▶ 정성 가득: 매일 아침 엄선된 재료로 신선하게 조리합니다.\n\n오셔서 "당근 보고 왔어요" 하시면 작은 서비스도 챙겨드릴게요! 부담 없이 편하게 들러주세요. 날씨 추운데 감기 조심하세요! ❤️\n\n☎ 문의: ${currentStore.phone}\n📍 위치: ${currentStore.address}`,
    instagram: `📢 [${currentStore.storeName}] 긴급 이벤트 공지 ✨\n\n"${headline}"\n\n${bodyCopy}\n\n📌 혜택 요약:\n- ${subheadline}\n- ${cta}\n\n인스타 팔로우 인증 시 음료수 무료 증정! 🥤\n\n#${currentStore.storeName.replace(/\s+/g, '')} #${category.replace(/[\/\s]+/g, '')} #동네맛집 #오늘저녁 #맛스타그램 #맛집추천 #할인이벤트 #놓치면후회`,
    kakao: `[${currentStore.storeName} 단골 알림톡]\n\n항상 찾아주시는 고객님 감사드립니다.\n\n▶ 이번 주말 특별 혜택 안내:\n${headline}\n${subheadline}\n\n- ${cta}\n- 주소: ${currentStore.address}\n- 전화: ${currentStore.phone}\n\n오늘도 기분 좋은 하루 보내세요!`,
    blog: `[${currentStore.storeName}] ${headline} 안내드립니다.\n\n안녕하세요, 언제나 신선함과 정성을 최우선으로 생각하는 ${currentStore.storeName}입니다.\n\n이번에 고객님들의 성원에 보답하고자 특별한 혜택을 준비했습니다.\n${bodyCopy}\n\n많은 관심과 사랑 부탁드립니다!`
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-28 space-y-6 animate-in fade-in">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          AI 카피라이터 & SNS 마케터
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          홍보문구 & SNS 글 자동 완성
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          행사 내용만 넣으면 당근마켓, 인스타그램, 카카오톡 문구를 원터치로 바꿔드립니다.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] font-bold text-slate-500">업종</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-emerald-500 bg-white"
            >
              {CATEGORIES_LIST.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-500">기본 말투</span>
            <select
              value={tone}
              onChange={(e) => {
                setTone(e.target.value);
                handleGenerate(e.target.value);
              }}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-emerald-500 bg-white"
            >
              {['친근하게', '짧게', '더 강렬하게', '고급스럽게', '정중하게'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-bold text-slate-500">홍보하고 싶은 내용</span>
          <textarea
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="예: 생맥주 1,000원 할인, 신메뉴 출시, 오픈 기념 1+1"
            className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-emerald-500"
          />
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>새로운 문구 생성하기</span>
        </button>
      </div>

      {/* Result 1: Core Promotion Copy Card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            핵심 홍보 카피 세트
          </span>
          <button
            onClick={() => handleCopy(`${headline}\n${subheadline}\n\n${bodyCopy}\n\n${cta}`, 'all_copy')}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg"
          >
            {copiedId === 'all_copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            전체 복사
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h3 className="font-black text-lg text-slate-950 leading-snug">
            {headline}
          </h3>
          <p className="font-bold text-sm text-rose-600">
            {subheadline}
          </p>
          <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed pt-1">
            {bodyCopy}
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs">
              👉 {cta}
            </span>
          </div>
        </div>

        {/* Tone Switcher Chips (As required in prompt) */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
            말투 바로 바꾸기:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['짧게', '더 강렬하게', '친근하게', '고급스럽게', 'SNS용'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTone(t);
                  handleGenerate(t);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                {t}로 변경
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result 2: Channel-specific SNS Posts (당근/인스타/카카오/블로그) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-900">
            채널별 맞춤 게시물
          </span>
          <span className="text-[11px] text-slate-400">플랫폼별 말투 자동 최적화</span>
        </div>

        {/* Channel Tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'karrot', label: '당근마켓', color: 'text-orange-600' },
            { id: 'instagram', label: '인스타그램', color: 'text-pink-600' },
            { id: 'kakao', label: '카카오톡', color: 'text-amber-500' },
            { id: 'blog', label: '블로그', color: 'text-emerald-600' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChannel(tab.id as any)}
              className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all ${
                activeChannel === tab.id
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Channel Text Area */}
        <div className="relative">
          <textarea
            readOnly
            rows={7}
            value={channelContents[activeChannel]}
            className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono"
          />
          <button
            onClick={() => handleCopy(channelContents[activeChannel], 'channel_copy')}
            className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            {copiedId === 'channel_copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            이 글 복사하기
          </button>
        </div>
      </div>
    </div>
  );
};
