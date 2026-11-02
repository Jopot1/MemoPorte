import React from 'react';
import { ActiveTab } from '../types';
import { Compass, Key, Home } from 'lucide-react';

interface MobileTabBarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({ activeTab, onNavigate }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-[env(safe-area-inset-bottom)] shadow-lg">
      <div className="grid grid-cols-3 items-center h-16 px-2">
        <button
          onClick={() => onNavigate('accueil')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'accueil' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Accueil</span>
        </button>

        <button
          onClick={() => onNavigate('sens-porte')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'sens-porte' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Sens porte</span>
        </button>

        <button
          onClick={() => onNavigate('poignees')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'poignees' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Key className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Poignées</span>
        </button>
      </div>
    </nav>
  );
};
