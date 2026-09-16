import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Download,
  Share2,
  Save,
  Palette,
  Type,
  Maximize2,
  Check,
  Smartphone,
  Phone,
  MapPin,
  Sparkles,
  Copy,
  Layers,
  FileImage
} from 'lucide-react';
import { PromotionProject, RatioType } from '../types';
import { renderProjectToCanvas, downloadCanvas, getRatioDimensions } from '../utils/canvasRenderer';

interface DesignEditorProps {
  project: PromotionProject;
  onBack: () => void;
  onSave: (updated: PromotionProject) => void;
  isPro: boolean;
  onOpenProModal: () => void;
}

export const DesignEditor: React.FC<DesignEditorProps> = ({
  project: initialProject,
  onBack,
  onSave,
  isPro,
  onOpenProModal
}) => {
  const [project, setProject] = useState<PromotionProject>(initialProject);
  const [activeTab, setActiveTab] = useState<'text' | 'style' | 'info'>('text');
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redraw canvas whenever project changes
  useEffect(() => {
    if (canvasRef.current) {
      renderProjectToCanvas(project, canvasRef.current, { isPro });
    }
  }, [project, isPro]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDownload = async (format: 'jpg' | 'png') => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await renderProjectToCanvas(project, canvasRef.current, { isPro });
      const filename = `${project.storeName}_홍보물_${Date.now()}.${format}`;
      downloadCanvas(canvasRef.current, filename, format === 'png' ? 'image/png' : 'image/jpeg');
      showToast(`${format.toUpperCase()} 이미지로 저장되었습니다!`);
    } catch (e) {
      console.error(e);
      showToast('저장 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && canvasRef.current) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `${project.storeName}_홍보물.jpg`, { type: 'image/jpeg' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: project.headline,
                text: `${project.headline}\n${project.priceBadge}\n${project.cta}`,
                files: [file]
              });
              return;
            }
          }
          setShowShareModal(true);
        }, 'image/jpeg', 0.95);
      } catch (e) {
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const ratios: { id: RatioType; label: string }[] = [
    { id: '1:1', label: '1:1 정방형' },
    { id: '4:5', label: '4:5 인스타' },
    { id: '9:16', label: '9:16 스토리' },
    { id: '16:9', label: '16:9 배너' },
    { id: 'A4', label: 'A4 전단지' }
  ];

  const themes: { id: string; name: string; bg: string; text: string; primary: string }[] = [
    { id: 'red', name: '강렬 레드', bg: 'bg-red-600', text: 'text-white', primary: '#DC2626' },
    { id: 'light', name: '모던 블루', bg: 'bg-white', text: 'text-slate-900', primary: '#2563EB' },
    { id: 'warm', name: '따뜻한 감성', bg: 'bg-amber-100', text: 'text-amber-950', primary: '#D97706' },
    { id: 'dark', name: '고급 다크', bg: 'bg-slate-900', text: 'text-white', primary: '#0F172A' }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-28 space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl animate-in fade-in slide-in-from-top-4 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            onSave(project);
            onBack();
          }}
          className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> 뒤로가기
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onSave(project);
              showToast('작업물이 안전하게 저장되었습니다!');
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> 저장
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> 공유
          </button>
        </div>
      </div>

      {/* Live Canvas Stage */}
      <div className="bg-slate-800 rounded-3xl p-4 sm:p-6 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-3 px-1">
          <span className="font-semibold">{getRatioDimensions(project.ratio).label}</span>
          <span>실시간 미리보기</span>
        </div>

        {/* The Real Canvas Element */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-700">
          <canvas
            ref={canvasRef}
            className="w-full h-auto block"
            style={{ maxHeight: '420px', objectFit: 'contain' }}
          />
        </div>

        {/* Quick Ratio Pills inside preview */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto max-w-full py-1">
          {ratios.map((r) => (
            <button
              key={r.id}
              onClick={() => setProject({ ...project, ratio: r.id })}
              className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
                project.ratio === r.id
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Sub-tabs */}
      <div className="flex items-center border-b border-slate-200">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-3 text-center text-xs font-extrabold border-b-2 transition-all ${
            activeTab === 'text' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Type className="w-4 h-4" /> 문구 & 혜택 수정
          </span>
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-3 text-center text-xs font-extrabold border-b-2 transition-all ${
            activeTab === 'style' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Palette className="w-4 h-4" /> 색상 & 분위기
          </span>
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-3 text-center text-xs font-extrabold border-b-2 transition-all ${
            activeTab === 'info' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Phone className="w-4 h-4" /> 연락처 & 주소
          </span>
        </button>
      </div>

      {/* Tab 1: Text Content Editing */}
      {activeTab === 'text' && (
        <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-1">
              메인 타이틀 (큰 글씨)
            </label>
            <input
              type="text"
              value={project.headline}
              onChange={(e) => setProject({ ...project, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-1">
              가격 또는 파격 혜택 배지
            </label>
            <input
              type="text"
              value={project.priceBadge}
              onChange={(e) => setProject({ ...project, priceBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-rose-600 focus:outline-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-1">
              핵심 서브 카피
            </label>
            <input
              type="text"
              value={project.subheadline}
              onChange={(e) => setProject({ ...project, subheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-1">
              상세 설명 본문 (2~3줄)
            </label>
            <textarea
              rows={2}
              value={project.bodyCopy}
              onChange={(e) => setProject({ ...project, bodyCopy: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 focus:outline-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-1">
              하단 버튼 행동 문구 (CTA)
            </label>
            <input
              type="text"
              value={project.cta}
              onChange={(e) => setProject({ ...project, cta: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-blue-700 focus:outline-blue-500"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Style & Colors */}
      {activeTab === 'style' && (
        <div className="space-y-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <div>
            <span className="text-xs font-extrabold text-slate-900 block mb-2">배경 색상 테마</span>
            <div className="grid grid-cols-4 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setProject({ ...project, bgTheme: t.id, primaryColor: t.primary })}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    project.bgTheme === t.id
                      ? 'border-rose-500 ring-2 ring-rose-400/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl ${t.bg} mx-auto mb-1.5 shadow-2xs border border-slate-200`} />
                  <span className="text-[11px] font-bold text-slate-800 block">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-extrabold text-slate-900 block mb-2">폰트 분위기</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'display', name: '볼드 고딕 (강렬함)' },
                { id: 'serif', name: '정감 명조 (따뜻함)' },
                { id: 'sans', name: '깔끔 본문 (모던)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setProject({ ...project, fontFamily: f.id as any })}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all ${
                    project.fontFamily === f.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Store Contact Info */}
      {activeTab === 'info' && (
        <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-1">
              매장 전화번호
            </label>
            <input
              type="text"
              value={project.phone}
              onChange={(e) => setProject({ ...project, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-1">
              매장 주소 및 찾아오시는 길
            </label>
            <input
              type="text"
              value={project.address}
              onChange={(e) => setProject({ ...project, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-blue-500"
            />
          </div>
        </div>
      )}

      {/* Download Action Buttons */}
      <div className="space-y-2 pt-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleDownload('jpg')}
            disabled={isExporting}
            className="py-3.5 px-4 rounded-2xl bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-black text-sm shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            JPG 이미지로 저장
          </button>

          <button
            onClick={() => handleDownload('png')}
            disabled={isExporting}
            className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <FileImage className="w-4 h-4 text-amber-400" />
            고화질 PNG 저장
          </button>
        </div>

        {!isPro && (
          <div
            onClick={onOpenProModal}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 text-center cursor-pointer hover:bg-amber-100/70 transition-colors"
          >
            <span className="text-xs font-bold text-amber-900 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              PRO 구독 시 워터마크 제거 & 2K 초고해상도 출력 지원
            </span>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-black text-xl text-slate-900 text-center">홍보물 공유하기</h3>
            <p className="text-xs text-slate-500 text-center">
              아래 홍보문구를 복사하여 카카오톡이나 단체방에 바로 전송하세요.
            </p>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-900">{project.headline}</p>
              <p className="text-rose-600 font-bold">★ {project.priceBadge}</p>
              <p className="text-slate-600">{project.subheadline}</p>
              <p className="text-slate-400 text-[11px]">☎ {project.phone} | {project.address}</p>
            </div>

            <button
              onClick={() => {
                const text = `📢 [${project.storeName}] ${project.headline}\n\n★ 혜택: ${project.priceBadge}\n${project.subheadline}\n\n☎ 문의: ${project.phone}\n📍 위치: ${project.address}`;
                navigator.clipboard.writeText(text);
                showToast('카카오톡 홍보문구가 복사되었습니다!');
                setShowShareModal(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              카카오톡용 텍스트 복사하기
            </button>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-slate-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
