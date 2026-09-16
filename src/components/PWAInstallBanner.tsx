import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone app or dismissed, hide
  if (isInstalled || dismissed) {
    return null;
  }

  // Android / Chromium / Desktop install prompt
  if (isInstallable) {
    return (
      <div id="pwa-install-banner" className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <div className="truncate">
            <span className="font-bold">앱으로 더 편리하게!</span>
            <span className="hidden sm:inline text-red-100 ml-1.5">홈 화면에 추가하고 즉시 홍보물을 만들어보세요.</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="pwa-install-btn"
            onClick={install}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-700 font-bold rounded-lg hover:bg-red-50 active:scale-95 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>앱 설치</span>
          </button>
          <button
            id="pwa-dismiss-btn"
            onClick={() => setDismissed(true)}
            className="p-1 text-white/80 hover:text-white rounded hover:bg-white/10"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <div id="pwa-ios-banner" className="bg-slate-900 text-white px-4 py-2 shadow-md flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>홈 화면에 앱으로 추가하여 빠르게 사용하세요</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIOSGuide(true)}
              className="text-amber-300 underline font-medium hover:text-amber-200"
            >
              설치 방법
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-slate-900">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-red-600" />
                iPhone / iPad 홈 화면 추가
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                1. 사파리(Safari) 하단 메뉴의 <strong>공유(Share) 아이콘</strong>을 누릅니다.<br />
                2. 메뉴를 아래로 내려 <strong>'홈 화면에 추가'</strong>를 누르면 일반 앱처럼 홈 화면에 설치됩니다.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white hover:bg-slate-800 active:scale-95 transition"
              >
                확인했습니다
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
