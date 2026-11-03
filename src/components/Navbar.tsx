import React from 'react';
import { ActiveTab } from '../types';
import { AppLogo } from './AppLogo';
import { Compass, Key, Home, WifiOff } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  isOnline,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Wordmark */}
        <button
          onClick={() => onNavigate('accueil')}
          className="flex items-center gap-3 text-left group transition-transform active:scale-[0.98]"
        >
          <AppLogo size={42} zoom={1.35} />
          <div>
            <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
              Quincaillerie &amp; Portes
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => onNavigate('accueil')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'accueil'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </button>

          <button
            onClick={() => onNavigate('sens-porte')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sens-porte'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Sens de porte</span>
          </button>

          <button
            onClick={() => onNavigate('poignees')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'poignees'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Types de poignées</span>
          </button>
        </nav>

        {/* Offline Chip if disconnected */}
        {!isOnline && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
            <WifiOff className="w-3.5 h-3.5 text-amber-600" />
            <span>Hors-ligne</span>
          </div>
        )}
      </div>
    </header>
  );
};
