import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  HelpCircle,
  RotateCcw,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Store,
  Crown,
  Download,
  FolderArchive,
  Copy,
  Check
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPro: boolean;
  onOpenProModal: () => void;
  onOpenStoreModal: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isPro,
  onOpenProModal,
  onOpenStoreModal,
  onResetData
}) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch {
      window.open(url, '_blank');
    }
  };

  const handleCopyLink = (urlPath: string, type: string) => {
    const fullUrl = `${window.location.origin}${urlPath}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-black text-lg text-slate-900">앱 설정</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {/* Subscription item */}
          <div
            onClick={() => {
              onClose();
              onOpenProModal();
            }}
            className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-200 cursor-pointer hover:bg-amber-100/70 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-600" />
              <div>
                <span className="font-bold text-slate-900 block">멤버십 구독 상태</span>
                <span className="text-[11px] text-amber-700">{isPro ? 'PRO 무제한 이용 중' : '무료 체험 중 (일일 3회)'}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Store management item */}
          <div
            onClick={() => {
              onClose();
              onOpenStoreModal();
            }}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-blue-600" />
              <div>
                <span className="font-bold text-slate-900 block">내 가게 관리</span>
                <span className="text-[11px] text-slate-500">상호명, 전화번호, 주소, 다점포</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Privacy Policy */}
          <div
            onClick={() => setShowPrivacy(true)}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-900 block">개인정보처리방침</span>
                <span className="text-[11px] text-slate-500">데이터 수집 및 보호 안내</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Terms */}
          <div
            onClick={() => setShowTerms(true)}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <div>
                <span className="font-bold text-slate-900 block">서비스 이용약관</span>
                <span className="text-[11px] text-slate-500">Google Play 운영 규정 준수</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Customer Help */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-slate-900">고객센터 및 제휴 문의</span>
            </div>
            <p className="text-[11px] text-slate-500">
              이메일: support@boss-ai-studio.kr<br />
              운영시간: 평일 10:00 ~ 18:00 (주말·공휴일 휴무)
            </p>
          </div>

          {/* Project Source Code & Android Studio ZIP Downloads */}
          <div className="pt-2 space-y-2 border-t border-slate-100">
            <span className="font-bold text-slate-800 block text-xs">프로젝트 파일 다운로드</span>
            
            {/* 1. Android Studio Project */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900 text-[11px]">안드로이드 스튜디오 전용 프로젝트</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded font-medium">android/ 폴더</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Android Studio에서 바로 열 수 있는 Gradle, Manifest, Java 소스가 포함된 압축파일입니다.
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDownload('/android-studio-project.zip', 'android-studio-project.zip')}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[11px] font-bold transition shadow-xs flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>다운로드</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyLink('/android-studio-project.zip', 'android')}
                  className="px-2.5 py-2 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-[11px] font-medium transition flex items-center gap-1"
                  title="다운로드 직링크 복사"
                >
                  {copiedType === 'android' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'android' ? '복사됨!' : '링크복사'}</span>
                </button>
              </div>
            </div>

            {/* 2. Full Project (Web + Server + Android) */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FolderArchive className="w-4 h-4 text-slate-700" />
                  <span className="font-bold text-slate-900 text-[11px]">전체 소스코드 풀 패키지</span>
                </div>
                <span className="text-[10px] text-slate-600 bg-slate-200/70 px-1.5 py-0.5 rounded font-medium">Full Stack</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                React 웹 프론트엔드 + Express AI 서버 + Android 폴더 전체가 포함된 압축파일입니다.
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDownload('/boss-ai-promotion.zip', 'boss-ai-promotion.zip')}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-[11px] font-bold transition shadow-xs flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>다운로드</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyLink('/boss-ai-promotion.zip', 'full')}
                  className="px-2.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-[11px] font-medium transition flex items-center gap-1"
                  title="다운로드 직링크 복사"
                >
                  {copiedType === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'full' ? '복사됨!' : '링크복사'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reset cache */}
          <div className="pt-1">
            <button
              onClick={() => {
                if (confirm('저장된 데이터를 초기화하시겠습니까?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 앱 데이터 초기화
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 text-center text-[10px] text-slate-400 space-y-0.5">
          <p>사장님 AI 홍보실 • 대한민국 자영업 상용화 버전</p>
          <p>버전 1.0.0 (Release Build: 2026.09)</p>
        </div>

        {/* Privacy Dialog */}
        {showPrivacy && (
          <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-5 max-w-xs w-full space-y-3 text-xs">
              <h4 className="font-black text-sm text-slate-900">개인정보처리방침</h4>
              <div className="max-h-60 overflow-y-auto space-y-2 text-slate-600 text-[11px] leading-relaxed">
                <p>1. [수집 항목] 본 서비스는 홍보물 제작을 위해 사용자가 직접 입력한 상호명, 연락처, 매장 주소, 업로드 사진만을 처리합니다.</p>
                <p>2. [AI 처리 안전성] 생성형 AI 모델(Gemini) 호출 시 개인 식별 고유키는 암호화 프록시 서버를 통해서만 안전하게 격리 전송되며 외부로 유출되지 않습니다.</p>
                <p>3. [파기 원칙] 사용자가 작업물을 삭제하거나 계정을 탈퇴할 경우 모든 로컬 캐시 및 임시 파일은 지체 없이 영구 파기됩니다.</p>
              </div>
              <button
                onClick={() => setShowPrivacy(false)}
                className="w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                확인
              </button>
            </div>
          </div>
        )}

        {/* Terms Dialog */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-5 max-w-xs w-full space-y-3 text-xs">
              <h4 className="font-black text-sm text-slate-900">서비스 이용약관</h4>
              <div className="max-h-60 overflow-y-auto space-y-2 text-slate-600 text-[11px] leading-relaxed">
                <p>1. 본 앱은 대한민국 소상공인 및 자영업자의 마케팅 홍보물 제작 지원을 목적으로 합니다.</p>
                <p>2. AI가 생성한 문구 및 디자인의 저작권은 전적으로 제작한 사용자에게 귀속되며 상업적 홍보에 자유롭게 사용할 수 있습니다.</p>
                <p>3. 타인의 상표권이나 저작권을 침해하는 무단 이미지 업로드는 금지됩니다.</p>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
