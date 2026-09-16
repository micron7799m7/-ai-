import React, { useState } from 'react';
import { Crown, Check, X, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface ProModalProps {
  isPro: boolean;
  onClose: () => void;
  onUpgradeToPro: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isPro, onClose, onUpgradeToPro }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Top Gold Badge */}
        <div className="text-center space-y-1.5">
          <div className="w-14 h-14 rounded-3xl bg-linear-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 mx-auto shadow-md shadow-amber-400/30">
            <Crown className="w-8 h-8 fill-slate-950" />
          </div>
          <h3 className="font-black text-2xl text-slate-900">
            사장님 AI 홍보실 PRO
          </h3>
          <p className="text-xs text-slate-500">
            제한 없는 AI 홍보물 제작과 고화질 인쇄 지원
          </p>
        </div>

        {/* Pricing Cycle Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`py-2 rounded-xl transition-all ${
              billingCycle === 'monthly' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500'
            }`}
          >
            월간 구독
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`py-2 rounded-xl transition-all relative ${
              billingCycle === 'yearly' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500'
            }`}
          >
            연간 구독 <span className="text-[10px] text-rose-600 font-extrabold">(25% 할인)</span>
          </button>
        </div>

        {/* Price Display */}
        <div className="text-center py-2 bg-amber-50/60 rounded-2xl border border-amber-200">
          <span className="text-2xl font-black text-slate-950">
            {billingCycle === 'yearly' ? '월 7,400원' : '월 9,900원'}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            {billingCycle === 'yearly' ? '연 89,000원 정기 결제 (Google Play)' : '매월 자동 갱신 (언제든 해지 가능)'}
          </span>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2 text-xs">
          {[
            'AI 생성 횟수 무제한 (일일 제한 없음)',
            '모든 포스터 및 전단지 워터마크 자동 제거',
            'A4 인쇄용 2K+ 초고해상도 JPG/PNG 출력',
            '여러 매장 브랜드 무제한 등록 및 관리',
            '불만 리뷰 전용 AI 실시간 대응 엔진',
            '신규 계절·명절 마케팅 템플릿 우선 제공'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-700">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          {isPro ? (
            <div className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold text-center">
              현재 PRO 멤버십 이용 중입니다
            </div>
          ) : (
            <button
              onClick={() => {
                onUpgradeToPro();
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-amber-500 via-rose-500 to-red-600 text-white font-black text-base shadow-lg shadow-rose-500/20 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              지금 PRO 구독 시작하기
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            나중에 하기
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-400">
          Google Play 스토어 계정으로 결제되며 설정에서 언제든지 해지할 수 있습니다.
        </p>
      </div>
    </div>
  );
};
