import React from 'react';
import { ActiveTab } from '../types';
import { Compass, Key, ArrowRight, Smartphone, Check, Sparkles } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenInstallModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenInstallModal }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 md:p-10 shadow-sm overflow-hidden">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3.5">
          {/* Bulle bleue : juste "Standard Nord-Américain" */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Standard Nord-Américain</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Aide-mémoire Quincaillerie &amp; Portes
          </h1>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Vérifiez le sens d'une porte et le fonctionnement des poignées commerciales.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenInstallModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <Smartphone className="w-4 h-4 text-white" />
              <span>Installer l'app hors-ligne</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* LES 2 GRANDES CARTES CLIQUABLES RÉAMÉNAGÉES (SANS SOUS-BLOCS)  */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* CARTE 1 : Sens d'ouverture de porte */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onNavigate('sens-porte')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('sens-porte');
            }
          }}
          className="group text-left p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500 transition-all shadow-xs hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Normes LH / RH / LHR / RHR
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                Sens d'ouverture de porte
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Vérificateur rapide en 2 clics et schéma interactif en vue de dessus avec animation d'ouverture.
              </p>
            </div>

            {/* Puces visuelles esthétiques et épurées */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Schéma 2D interactif</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Animation 0° et 90°</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Fiche technique</span>
              </span>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
              Ouvrir le vérificateur
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-blue-600 text-slate-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* CARTE 2 : Types de poignées */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onNavigate('poignees')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('poignees');
            }
          }}
          className="group text-left p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-amber-500 transition-all shadow-xs hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs">
                <Key className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                Guide des fonctions
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                Types de poignées &amp; serrures
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Schémas en coupe transversale (intérieur vs extérieur), et simulation interactive d'état.
              </p>
            </div>

            {/* Puces visuelles esthétiques et épurées */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                <Check className="w-3.5 h-3.5 text-amber-600" />
                <span>Coupe transversale</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                <Check className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulation barré / débarré</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                <Check className="w-3.5 h-3.5 text-amber-600" />
                <span>Sécurité incendie</span>
              </span>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 group-hover:text-amber-700 transition-colors">
              Consulter les fonctions
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-amber-600 text-slate-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
