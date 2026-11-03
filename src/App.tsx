import React, { useState } from 'react';
import { ActiveTab } from './types';
import { usePWA } from './hooks/usePWA';
import { Navbar } from './components/Navbar';
import { MobileTabBar } from './components/MobileTabBar';
import { HomeView } from './components/HomeView';
import { DoorHandingModule } from './components/DoorHandingModule';
import { LockFunctionsModule } from './components/LockFunctionsModule';
import { PWAInstallModal } from './components/PWAInstallModal';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('accueil');
  const { isInstallable, isOnline, isModalOpen, openModal, closeModal, triggerInstall } = usePWA();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={setActiveTab}
        isOnline={isOnline}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 pb-24 md:pb-12">
        {/* Quick back button when inside a module (without breadcrumb trail) */}
        {activeTab !== 'accueil' && (
          <div className="mb-6">
            <button
              onClick={() => setActiveTab('accueil')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-xs active:scale-[0.98]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'accueil</span>
            </button>
          </div>
        )}

        {/* Dynamic Views */}
        {activeTab === 'accueil' && (
          <HomeView
            onNavigate={setActiveTab}
            onOpenInstallModal={openModal}
          />
        )}

        {activeTab === 'sens-porte' && <DoorHandingModule />}

        {activeTab === 'poignees' && <LockFunctionsModule />}
      </main>

      {/* Footer épuré */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 hidden md:block shadow-xs">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            Aide-mémoire Quincaillerie de bâtiment · Normes ANSI/BHMA A156 &amp; CCQ / CNB
          </p>
        </div>
      </footer>

      {/* Mobile Sticky Tab Bar */}
      <MobileTabBar activeTab={activeTab} onNavigate={setActiveTab} />

      {/* PWA Install Instructions Modal */}
      <PWAInstallModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isInstallable={isInstallable}
        onNativeInstall={triggerInstall}
      />
    </div>
  );
}
