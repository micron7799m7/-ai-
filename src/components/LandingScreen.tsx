import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Image as ImageIcon, Sparkle } from 'lucide-react';
import { PromotionProject } from '../types';

interface LandingScreenProps {
  onStartFree: () => void;
  sampleProjects: PromotionProject[];
  onSelectSample: (project: PromotionProject) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartFree,
  sampleProjects,
  onSelectSample
}) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-slate-50 text-slate-900 pb-20 flex flex-col">
      {/* Top Brand Bar */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-amber-100/60 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 via-rose-500 to-red-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
            AI
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg tracking-tight">
              사장님 AI 홍보실
            </h1>
            <p className="text-[11px] font-semibold text-rose-600">
              사진 한 장이면 홍보가 시작됩니다
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowOnboarding(true)}
          className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
        >
          이용 방법
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-xl mx-auto px-5 pt-8 pb-6 flex-1 flex flex-col">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            대한민국 600만 자영업자·소상공인 전용
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            사진만 올리세요.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 via-rose-600 to-amber-600">
              AI가 홍보를 만들어드립니다.
            </span>
          </h2>

          <p className="text-base text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
            디자이너 없이도 스마트폰에서 단 3분 만에 전단지, 메뉴판, SNS 홍보 이미지를 완성하세요.
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="space-y-3 max-w-md mx-auto w-full mb-10">
          <button
            onClick={onStartFree}
            className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-rose-600 via-red-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-black text-xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>무료로 홍보물 만들기</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>

          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 회원가입 없이 즉시 체험
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 40~60대 쉬운 큰 글씨
            </span>
          </div>
        </div>

        {/* Sample Results Grid (As required in prompt) */}
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              실제 사장님들이 만든 홍보물
            </h3>
            <span className="text-xs text-slate-500 font-semibold">터치해서 바로 수정하기</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {sampleProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectSample(project)}
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-rose-300"
              >
                <div className="flex gap-3">
                  <div className="w-22 h-22 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                    <img
                      src={project.photoUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 text-[10px] text-white font-bold">
                      {project.category}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <span className="text-[11px] font-bold text-rose-600 block mb-0.5">
                        {project.priceBadge}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-rose-600 transition-colors">
                        {project.headline}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {project.subheadline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                      <span>{project.storeName}</span>
                      <span className="font-bold text-blue-600 flex items-center gap-0.5">
                        편집하기 <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Steps Overview Card */}
        <div className="mt-8 bg-amber-500/10 border border-amber-300/40 rounded-2xl p-4.5 space-y-3">
          <div className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
            <Sparkle className="w-4 h-4 text-amber-600" />
            단 3단계로 완성되는 원스톱 마케팅
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white/80 rounded-xl p-2.5 shadow-2xs border border-amber-200/50">
              <span className="text-[10px] font-black text-rose-600 block">STEP 1</span>
              <span className="font-bold text-slate-800 mt-1 block">사진 올리기</span>
            </div>
            <div className="bg-white/80 rounded-xl p-2.5 shadow-2xs border border-amber-200/50">
              <span className="text-[10px] font-black text-rose-600 block">STEP 2</span>
              <span className="font-bold text-slate-800 mt-1 block">내용 적기</span>
            </div>
            <div className="bg-white/80 rounded-xl p-2.5 shadow-2xs border border-amber-200/50">
              <span className="text-[10px] font-black text-rose-600 block">STEP 3</span>
              <span className="font-bold text-slate-800 mt-1 block">AI 홍보물 완성</span>
            </div>
          </div>
        </div>
      </main>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center font-black text-xl mb-2">
                123
              </div>
              <h3 className="font-black text-xl text-slate-900">
                어떻게 만드나요?
              </h3>
              <p className="text-xs text-slate-500">
                스마트폰으로 딱 3가지만 하시면 끝납니다.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">사진을 올리세요</h4>
                  <p className="text-xs text-slate-500 mt-0.5">매장이나 음식, 상품 사진을 1장 선택하세요.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">홍보 내용을 적으세요</h4>
                  <p className="text-xs text-slate-500 mt-0.5">할인 금액이나 신메뉴 소식을 간단히 적으세요.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">AI가 홍보물을 완성합니다</h4>
                  <p className="text-xs text-slate-500 mt-0.5">마음에 드는 디자인을 골라 이미지로 바로 저장하세요!</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowOnboarding(false);
                onStartFree();
              }}
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-md transition-all"
            >
              지금 무료로 만들어보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
