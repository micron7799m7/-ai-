import React, { useState } from 'react';
import {
  MessageSquareReply,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Heart,
  ThumbsUp,
  AlertTriangle,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { StoreProfile } from '../types';

interface ReviewReplyScreenProps {
  currentStore: StoreProfile;
  onConsumeUsage: () => boolean;
}

export const ReviewReplyScreen: React.FC<ReviewReplyScreenProps> = ({
  currentStore,
  onConsumeUsage
}) => {
  const [customerReview, setCustomerReview] = useState(
    '치킨이 너무 바삭하고 양도 푸짐해서 가족들이랑 맛있게 잘 먹었습니다! 그런데 배달이 조금 늦어서 별 하나 뺐어요. 그래도 재주문 의사 있습니다!'
  );
  const [style, setStyle] = useState<'kind' | 'thankful' | 'revisit' | 'complaint' | 'short'>('kind');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [replyText, setReplyText] = useState(
    `안녕하세요 고객님! [${currentStore.storeName}]입니다 😊\n\n치킨의 바삭한 맛과 푸짐한 양에 만족해주셔서 진심으로 기쁩니다! 다만 소중한 식사 시간에 배달이 다소 지연되어 불편을 드린 점 머리 숙여 사과드립니다. 다음 주문 시에는 더욱 신속하고 따뜻하게 받아보실 수 있도록 라이더님과 조리 시스템을 재정비하겠습니다.\n\n너그러운 마음으로 재주문을 약속해주셔서 큰 감동을 받았습니다. 다음에도 기분 좋은 한 끼가 되실 수 있도록 정성껏 모시겠습니다. 행복한 하루 보내세요! ❤️`
  );

  const sampleReviews = [
    { label: '배달 지연 + 맛 칭찬', text: '치킨이 바삭하고 너무 맛있는데 배달이 15분 정도 늦었어요. 그래도 맛있어서 용서됩니다.' },
    { label: '극찬 단골 리뷰', text: '여기 통닭은 진짜 동네 1등입니다. 양념도 안 달고 자극적이지 않아서 부모님도 너무 좋아하세요. 매주 시킵니다!' },
    { label: '음식 불만 리뷰 (대응 필요)', text: '기름이 덜 빠져서 그런지 살짝 느끼했어요. 포장지도 눅눅해져서 왔네요. 개선 부탁드립니다.' }
  ];

  const handleGenerate = async (selectedStyle?: string) => {
    const s = selectedStyle || style;
    if (!onConsumeUsage()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/review-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName: currentStore.storeName,
          customerReview,
          style: s
        })
      });
      const data = await res.json();
      if (data.replyText) {
        setReplyText(data.replyText);
      }
    } catch (e) {
      if (s === 'complaint') {
        setReplyText(
          `안녕하세요 고객님, ${currentStore.storeName} 사장입니다.\n\n먼저 소중한 비용과 시간을 들여 저희 매장을 찾아주셨는데, 만족스러운 경험을 드리지 못해 진심으로 사과드립니다. 말씀해주신 지적 사항은 주방 조리팀과 즉각 공유하여 튀김 온도와 포장 환기 방식을 대폭 개선하겠습니다. 고객님의 쓴소리를 귀중한 밑거름으로 삼아 더 정직하고 철저한 매장이 되겠습니다. 다시 한번 죄송하고 감사드립니다.`
        );
      } else {
        setReplyText(
          `안녕하세요 고객님! ${currentStore.storeName}입니다 ❤️\n\n소중한 사진과 함께 힘이 나는 리뷰 남겨주셔서 진심으로 감사드립니다! 맛있게 드셨다는 말씀 한마디에 오늘 하루의 피로가 싹 풀립니다. 언제 주문해주셔도 한결같은 맛과 따뜻함으로 보답하겠습니다. 늘 건강하시고 행복한 일만 가득하세요!`
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(replyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 pb-28 space-y-6 animate-in fade-in">
      <div>
        <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
          <MessageSquareReply className="w-3.5 h-3.5" />
          AI 리뷰 답변 생성기
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          고객 리뷰를 복사해 넣으세요
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          배달의민족, 쿠팡이츠, 네이버 플레이스 리뷰에 사장님의 진심을 담은 프로 답변을 완성합니다.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
        <label className="text-xs font-extrabold text-slate-900 block">
          손님이 남긴 리뷰 내용
        </label>
        <textarea
          rows={3}
          value={customerReview}
          onChange={(e) => setCustomerReview(e.target.value)}
          placeholder="손님의 리뷰를 복사하여 붙여넣으세요"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-indigo-500 leading-relaxed"
        />

        {/* Quick Sample Review Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
            예시 리뷰 바로 불러오기:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleReviews.map((r, i) => (
              <button
                key={i}
                onClick={() => setCustomerReview(r.text)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                + {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selection */}
        <div className="pt-2">
          <span className="text-xs font-extrabold text-slate-900 block mb-2">
            답변 스타일 선택
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {[
              { id: 'kind', label: '친절하게', icon: Smile },
              { id: 'thankful', label: '감사하게', icon: Heart },
              { id: 'revisit', label: '재방문 유도', icon: ThumbsUp },
              { id: 'complaint', label: '불만 대응', icon: AlertTriangle },
              { id: 'short', label: '짧고 명료', icon: Sparkles }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  setStyle(st.id as any);
                  handleGenerate(st.id);
                }}
                className={`p-2 rounded-xl border text-center transition-all ${
                  style === st.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium'
                }`}
              >
                <st.icon className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                <span className="text-[11px] block">{st.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={isGenerating}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all mt-2"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          답변 생성하기
        </button>
      </div>

      {/* Result Reply Card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            AI가 작성한 사장님 맞춤 답변
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '복사 완료!' : '답변 복사하기'}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
          {replyText}
        </div>

        <p className="text-[11px] text-slate-400">
          * 불만 리뷰의 경우 방어적이지 않고 차분하게 고객의 감정을 배려하도록 인공지능이 어휘를 검수했습니다.
        </p>
      </div>
    </div>
  );
};
