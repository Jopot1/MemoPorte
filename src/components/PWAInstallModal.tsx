import React, { useState } from 'react';
import { Smartphone, Download, Share2, PlusSquare, CheckCircle2, X } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  onNativeInstall: () => void;
  initialTab?: 'ios' | 'android';
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  onNativeInstall,
  initialTab = 'ios',
}) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>(initialTab);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 id="pwa-install-title" className="text-lg font-bold text-slate-900">
              Installer sur votre mobile
            </h2>
            <p className="text-xs text-slate-500">
              Usage instantané sur chantier &amp; atelier, 100% hors-ligne
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ios'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>iPhone / iPad (iOS)</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'android'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Android / Chrome</span>
          </button>
        </div>

        {/* Content iOS */}
        {activeTab === 'ios' && (
          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  Ouvrez dans Safari et touchez Partager <Share2 className="w-4 h-4 text-blue-600 inline" />
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Le bouton de partage est l'icône de carré avec une flèche vers le haut (dans la barre du bas sur iPhone).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  Touchez "Sur l'écran d'accueil" <PlusSquare className="w-4 h-4 text-blue-600 inline" />
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Faites défiler le menu d'actions vers le bas pour trouver cette option.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Touchez "Ajouter" en haut à droite</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  L'icône de l'application <strong className="text-slate-800">MémoPorte</strong> apparaît sur votre écran d'accueil et se lance en plein écran sans barre d'adresse !
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Android */}
        {activeTab === 'android' && (
          <div className="space-y-4 text-sm text-slate-700">
            {isInstallable && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <p className="text-xs text-blue-900 mb-3 font-medium">
                  Votre navigateur est prêt pour l'installation directe en 1 clic :
                </p>
                <button
                  onClick={onNativeInstall}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-transform active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  Installer MémoPorte maintenant
                </button>
              </div>
            )}

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Dans Chrome, ouvrez le menu (⋮)</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Touchez les 3 points verticaux en haut à droite de l'écran.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Sélectionnez "Installer l'application"</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ou "Ajouter à l'écran d'accueil" : l'application <strong className="text-slate-800">MémoPorte</strong> sera ajoutée à vos applications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Benefits badge */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fonctionne 100% hors-ligne
          </span>
          <span>Zéro téléchargement store</span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};
