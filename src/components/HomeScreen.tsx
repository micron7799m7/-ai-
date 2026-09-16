import React from 'react';
import {
  Sparkles,
  FileText,
  UtensilsCrossed,
  Instagram,
  Tag,
  Flag,
  MessageSquareQuote,
  MessageSquareReply,
  Wand2,
  FolderHeart,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { PromotionProject, StoreProfile } from '../types';

interface HomeScreenProps {
  currentStore: StoreProfile;
  onOpenWizard: (mode?: string) => void;
  onOpenMenuMaker: () => void;
  onOpenCopywriter: () => void;
  onOpenReviewReply: () => void;
  onOpenPhotoEnhance: () => void;
  onOpenArchive: () => void;
  recentProjects: PromotionProject[];
  onSelectProject: (proj: PromotionProject) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentStore,
  onOpenWizard,
  onOpenMenuMaker,
  onOpenCopywriter,
  onOpenReviewReply,
  onOpenPhotoEnhance,
  onOpenArchive,
  recentProjects,
  onSelectProject
}) => {
  return (
    <div className="space-y-6 pb-24 max-w-xl mx-auto px-4 pt-4">
      {/* Top Greeting Banner */}
      <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-blue-100 text-[11px] font-bold backdrop-blur-xs">
            <span>{currentStore.storeName}</span>
            <span>•</span>
            <span>{currentStore.category}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            사장님, 오늘은<br />
            어떤 홍보물을 만들어볼까요?
          </h2>
          <p className="text-xs text-blue-200 pt-1 font-medium">
            사진 1장만 있으면 AI가 전문 디자이너처럼 완성해드립니다.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />
      </div>

      {/* Hero Mega Button: ⚡ AI에게 맡기기 (Most important feature) */}
      <div
        onClick={() => onOpenWizard('auto')}
        className="group relative bg-linear-to-r from-amber-500 via-rose-500 to-red-600 rounded-3xl p-5 text-white shadow-xl shadow-rose-500/25 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/25 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-yellow-200" />
              가장 추천하는 기능
            </div>
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-2 text-white">
              AI에게 맡기기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </h3>
            <p className="text-xs text-rose-100 font-medium leading-relaxed">
              가게 정보 + 사진 1장 + 행사 내용만 넣으면 4가지 디자인과 SNS 홍보글까지 3분 완성!
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 group-hover:rotate-6 transition-transform">
            <Wand2 className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 9 Major Menu Grid (Senior Friendly, Big Touch Targets) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <span>자주 찾는 홍보물 메뉴</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">터치해서 바로 시작</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* 1. 전단지 만들기 */}
          <button
            onClick={() => onOpenWizard('flyer')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">01</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-blue-600">
              전단지 만들기
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">인쇄 및 배포용 A4 전단지</p>
          </button>

          {/* 2. 메뉴판 만들기 */}
          <button
            onClick={onOpenMenuMaker}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">02</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-amber-600">
              메뉴판 만들기
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">가격표 및 카테고리 자동정렬</p>
          </button>

          {/* 3. SNS 홍보 이미지 */}
          <button
            onClick={() => onOpenWizard('sns')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-pink-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Instagram className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">03</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-pink-600">
              SNS 홍보 이미지
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">인스타/당근 피드 1:1 맞춤</p>
          </button>

          {/* 4. 이벤트/할인 포스터 */}
          <button
            onClick={() => onOpenWizard('sale')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-red-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Tag className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">04</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-red-600">
              할인/이벤트 포스터
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">강렬한 혜택 강조 디자인</p>
          </button>

          {/* 5. 배너 만들기 */}
          <button
            onClick={() => onOpenWizard('banner')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Flag className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">05</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-purple-600">
              배너/현수막
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">가로 16:9 디스플레이</p>
          </button>

          {/* 6. 홍보문구 만들기 */}
          <button
            onClick={onOpenCopywriter}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">06</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-emerald-600">
              홍보문구 만들기
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">톤앤매너별 카피 자동 생성</p>
          </button>

          {/* 7. 리뷰 답변 만들기 */}
          <button
            onClick={onOpenReviewReply}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MessageSquareReply className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">07</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-indigo-600">
              리뷰 답변 만들기
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">배달/플레이스 진심 답변</p>
          </button>

          {/* 8. AI 사진 보정 */}
          <button
            onClick={onOpenPhotoEnhance}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-cyan-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Wand2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">08</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-cyan-600">
              AI 사진 보정
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">음식 맛있게, 배경 정리</p>
          </button>

          {/* 9. 내 홍보물 */}
          <button
            onClick={onOpenArchive}
            className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-rose-400 text-left transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FolderHeart className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400">09</span>
            <h4 className="font-black text-slate-900 text-base group-hover:text-rose-600">
              내 홍보물 보관함
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">저장된 포스터 및 재편집</p>
          </button>
        </div>
      </div>

      {/* Recent Works Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-600" />
            최근 작업물 이어하기
          </h3>
          <button
            onClick={onOpenArchive}
            className="text-xs font-bold text-blue-600 flex items-center gap-0.5 hover:underline"
          >
            전체보기 ({recentProjects.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {recentProjects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="bg-white border border-slate-200/90 rounded-2xl p-3 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer hover:border-blue-300"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={proj.photoUrl}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {proj.ratio}
                  </span>
                  <span className="text-[11px] text-slate-400">{proj.createdAt}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm truncate mt-0.5">
                  {proj.headline || proj.title}
                </h4>
                <p className="text-xs text-rose-600 font-semibold truncate">
                  {proj.priceBadge}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
