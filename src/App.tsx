import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LandingScreen } from './components/LandingScreen';
import { HomeScreen } from './components/HomeScreen';
import { AIPromotionWizard } from './components/AIPromotionWizard';
import { DesignEditor } from './components/DesignEditor';
import { CopywriterScreen } from './components/CopywriterScreen';
import { ReviewReplyScreen } from './components/ReviewReplyScreen';
import { MenuMakerScreen } from './components/MenuMakerScreen';
import { PhotoEnhanceScreen } from './components/PhotoEnhanceScreen';
import { ProjectsArchiveScreen } from './components/ProjectsArchiveScreen';
import { StoreProfileModal } from './components/StoreProfileModal';
import { ProModal } from './components/ProModal';
import { SettingsModal } from './components/SettingsModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { StoreProfile, PromotionProject } from './types';
import { DEFAULT_STORES, INITIAL_PROJECTS as SAMPLE_PROJECTS } from './data/defaultData';

export default function App() {
  // Local storage loaded state with fallbacks
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    return localStorage.getItem('boss_ai_started') === 'true';
  });

  const [stores, setStores] = useState<StoreProfile[]>(() => {
    const saved = localStorage.getItem('boss_ai_stores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return DEFAULT_STORES;
  });

  const [currentStoreId, setCurrentStoreId] = useState<string>(() => {
    return localStorage.getItem('boss_ai_store_id') || DEFAULT_STORES[0].id;
  });

  const [projects, setProjects] = useState<PromotionProject[]>(() => {
    const saved = localStorage.getItem('boss_ai_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return SAMPLE_PROJECTS;
  });

  const [isPro, setIsPro] = useState<boolean>(() => {
    return localStorage.getItem('boss_ai_is_pro') === 'true';
  });

  const [dailyUsageCount, setDailyUsageCount] = useState<number>(() => {
    const saved = localStorage.getItem('boss_ai_usage');
    return saved ? parseInt(saved, 10) : 1;
  });

  // Current view/tab state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [wizardMode, setWizardMode] = useState<string>('auto');
  const [editingProject, setEditingProject] = useState<PromotionProject | null>(null);

  // Modals
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('boss_ai_started', String(hasStarted));
  }, [hasStarted]);

  useEffect(() => {
    localStorage.setItem('boss_ai_stores', JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem('boss_ai_store_id', currentStoreId);
  }, [currentStoreId]);

  useEffect(() => {
    localStorage.setItem('boss_ai_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('boss_ai_is_pro', String(isPro));
  }, [isPro]);

  useEffect(() => {
    localStorage.setItem('boss_ai_usage', String(dailyUsageCount));
  }, [dailyUsageCount]);

  const currentStore = stores.find((s) => s.id === currentStoreId) || stores[0] || DEFAULT_STORES[0];

  const maxDailyCount = isPro ? 9999 : 3;

  const handleConsumeUsage = (): boolean => {
    if (isPro) return true;
    if (dailyUsageCount >= maxDailyCount) {
      setIsProModalOpen(true);
      return false;
    }
    setDailyUsageCount((prev) => prev + 1);
    return true;
  };

  const handleStartApp = () => {
    setHasStarted(true);
    setActiveTab('home');
  };

  const handleSaveProject = (updated: PromotionProject) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === updated.id);
      if (exists) {
        return prev.map((p) => (p.id === updated.id ? updated : p));
      } else {
        return [updated, ...prev];
      }
    });
    setEditingProject(updated);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('홍보물을 삭제하시겠습니까?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingProject?.id === id) {
        setEditingProject(null);
        setActiveTab('archive');
      }
    }
  };

  const handleDuplicateProject = (orig: PromotionProject) => {
    const copy: PromotionProject = {
      ...orig,
      id: 'proj_' + Date.now(),
      title: `${orig.title} (복사본)`,
      createdAt: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    setProjects((prev) => [copy, ...prev]);
    setEditingProject(copy);
    setActiveTab('editor');
  };

  const handleToggleFavorite = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleSaveStore = (updatedStore: StoreProfile) => {
    setStores((prev) => prev.map((s) => (s.id === updatedStore.id ? updatedStore : s)));
  };

  const handleAddNewStore = (newStore: StoreProfile) => {
    setStores((prev) => [...prev, newStore]);
    setCurrentStoreId(newStore.id);
  };

  const handleResetData = () => {
    localStorage.clear();
    setStores(DEFAULT_STORES);
    setCurrentStoreId(DEFAULT_STORES[0].id);
    setProjects(SAMPLE_PROJECTS);
    setIsPro(false);
    setDailyUsageCount(0);
    setHasStarted(false);
    setActiveTab('home');
  };

  // If user has not started yet, show high-converting Landing Screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <PWAInstallBanner />
        <LandingScreen
          onStartFree={handleStartApp}
          sampleProjects={projects}
          onSelectSample={(proj) => {
            setEditingProject(proj);
            setHasStarted(true);
            setActiveTab('editor');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <PWAInstallBanner />
      {/* Top Application Header */}
      <Header
        currentStore={currentStore}
        stores={stores}
        onSelectStore={(st) => setCurrentStoreId(st.id)}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        onOpenProModal={() => setIsProModalOpen(true)}
        isPro={isPro}
        dailyUsageCount={dailyUsageCount}
        maxDailyCount={maxDailyCount}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-2xl mx-auto">
        {activeTab === 'home' && (
          <HomeScreen
            currentStore={currentStore}
            onOpenWizard={(mode) => {
              setWizardMode(mode || 'auto');
              setActiveTab('wizard');
            }}
            onOpenMenuMaker={() => setActiveTab('menu')}
            onOpenCopywriter={() => setActiveTab('copy')}
            onOpenReviewReply={() => setActiveTab('reviews')}
            onOpenPhotoEnhance={() => setActiveTab('enhance')}
            onOpenArchive={() => setActiveTab('archive')}
            recentProjects={projects}
            onSelectProject={(proj) => {
              setEditingProject(proj);
              setActiveTab('editor');
            }}
          />
        )}

        {activeTab === 'wizard' && (
          <AIPromotionWizard
            currentStore={currentStore}
            initialMode={wizardMode}
            onBack={() => setActiveTab('home')}
            onComplete={(newProject) => {
              handleSaveProject(newProject);
            }}
            onOpenEditor={(newProject) => {
              setEditingProject(newProject);
              setActiveTab('editor');
            }}
            onConsumeUsage={handleConsumeUsage}
          />
        )}

        {activeTab === 'editor' && editingProject && (
          <DesignEditor
            project={editingProject}
            onBack={() => setActiveTab('home')}
            onSave={(updated) => handleSaveProject(updated)}
            isPro={isPro}
            onOpenProModal={() => setIsProModalOpen(true)}
          />
        )}

        {activeTab === 'copy' && (
          <CopywriterScreen
            currentStore={currentStore}
            onConsumeUsage={handleConsumeUsage}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewReplyScreen
            currentStore={currentStore}
            onConsumeUsage={handleConsumeUsage}
          />
        )}

        {activeTab === 'menu' && (
          <MenuMakerScreen
            currentStore={currentStore}
          />
        )}

        {activeTab === 'enhance' && (
          <PhotoEnhanceScreen
            onUsePhotoForPromo={(photoUrl) => {
              setActiveTab('wizard');
            }}
          />
        )}

        {activeTab === 'archive' && (
          <ProjectsArchiveScreen
            projects={projects}
            onSelectProject={(p) => {
              setEditingProject(p);
              setActiveTab('editor');
            }}
            onDeleteProject={handleDeleteProject}
            onDuplicateProject={handleDuplicateProject}
            onToggleFavorite={handleToggleFavorite}
            onCreateNew={() => setActiveTab('wizard')}
          />
        )}
      </main>

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab === 'editor' ? 'wizard' : activeTab}
        onSelectTab={(tab) => {
          if (tab === 'wizard' && activeTab === 'editor') {
            setActiveTab('wizard');
          } else {
            setActiveTab(tab);
          }
        }}
      />

      {/* Store Profile Management Modal */}
      {isStoreModalOpen && (
        <StoreProfileModal
          currentStore={currentStore}
          stores={stores}
          onClose={() => setIsStoreModalOpen(false)}
          onSaveStore={handleSaveStore}
          onAddNewStore={handleAddNewStore}
        />
      )}

      {/* Google Play Billing Pro Subscription Modal */}
      {isProModalOpen && (
        <ProModal
          isPro={isPro}
          onClose={() => setIsProModalOpen(false)}
          onUpgradeToPro={() => {
            setIsPro(true);
            setDailyUsageCount(0);
          }}
        />
      )}

      {/* App Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        isPro={isPro}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        onResetData={handleResetData}
      />
    </div>
  );
}
