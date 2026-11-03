import React, { useState } from 'react';
import { LockFunctionKey } from '../types';
import { LOCK_FUNCTIONS_DATA } from '../data/lockFunctionsData';
import { LockMechanismSvg } from './LockMechanismSvg';
import { Lock, Unlock, ShieldCheck, Key, Check, Info } from 'lucide-react';

export const LockFunctionsModule: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<LockFunctionKey>('passage');
  const [isSimulatedLocked, setIsSimulatedLocked] = useState<boolean>(true);

  const currentInfo = LOCK_FUNCTIONS_DATA[selectedKey];

  const handleSelectKey = (key: LockFunctionKey) => {
    setSelectedKey(key);
    // Default simulated state based on function type
    if (key === 'passage' || key === 'factice') {
      setIsSimulatedLocked(false);
    } else if (key === 'depot') {
      setIsSimulatedLocked(true);
    } else {
      setIsSimulatedLocked(true);
    }
  };

  const toggleSimulation = () => {
    if (selectedKey === 'passage' || selectedKey === 'factice') return; // No locking mechanism
    if (selectedKey === 'depot') return; // Cannot unlock depot exterior lever
    setIsSimulatedLocked(!isSimulatedLocked);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ============================================================== */}
      {/* SÉLECTEUR DE TYPE DE POIGNÉE                                    */}
      {/* ============================================================== */}
      <section className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Types &amp; fonctions de poignées</span>
            </h2>
            <p className="text-xs text-slate-600">
              Spécifications &amp; séries commerciales de référence
            </p>
          </div>
        </div>

        {/* 6 Cards selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {(['passage', 'intimite', 'bureau', 'classe', 'depot', 'factice'] as LockFunctionKey[]).map((key) => {
            const item = LOCK_FUNCTIONS_DATA[key];
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectKey(key)}
                className={`p-3 rounded-2xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20 scale-[1.01]'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-bold text-blue-700">
                    Série {item.seriesCode}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {item.nameFr}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {item.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* AFFICHAGE DYNAMIQUE CÔTE À CÔTE (SCHÉMA SVG + SPÉCIFICATIONS)  */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Colonne Gauche : Schéma SVG Technique (7 colonnes sur desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-4 md:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Vue en coupe transversale de la porte
                </h3>
              </div>
            </div>

            {/* Schéma SVG */}
            <LockMechanismSvg
              functionKey={selectedKey}
              isSimulatedLocked={isSimulatedLocked}
            />

            {/* Barre interactive de simulation barré/débarré */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedKey === 'passage' ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-2 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Passage libre : cette fonction ne peut jamais être barrée</span>
                  </div>
                ) : selectedKey === 'factice' ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300 px-3 py-2 rounded-xl">
                    <Info className="w-4 h-4 text-slate-500" />
                    <span>Poignée fixe de tirage (aucun mécanisme)</span>
                  </div>
                ) : selectedKey === 'depot' ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-300 px-3 py-2 rounded-xl">
                    <Lock className="w-4 h-4 text-rose-600" />
                    <span>Poignée extérieure rigide : toujours barrée à 100%</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={toggleSimulation}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      isSimulatedLocked
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                    }`}
                  >
                    {isSimulatedLocked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {selectedKey === 'classe'
                            ? 'Simuler clé extérieure : BARRÉ (Cliquer pour débarrer)'
                            : 'Simuler : Actuellement BARRÉ (Cliquer pour débarrer)'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4" />
                        <span>
                          {selectedKey === 'classe'
                            ? 'Simuler clé extérieure : DÉBARRÉ (Cliquer pour barrer)'
                            : 'Simuler : Actuellement DÉBARRÉ (Cliquer pour barrer)'}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="text-[11px] text-slate-500">
                Niveau : <span className="text-slate-800 font-bold">{currentInfo.securityLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Fiche de spécifications complète (5 colonnes sur desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-700 font-mono">
                  Spécification Quincaillerie
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Modèle {currentInfo.seriesCode}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Fonction {currentInfo.nameFr}
              </h3>
              <p className="text-xs text-slate-500">
                {currentInfo.subtitle}
              </p>
            </div>

            {/* Détails Côté Extérieur vs Côté Intérieur */}
            <div className="space-y-3 text-xs">
              {/* Côté Extérieur */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center gap-1.5 font-bold text-blue-800 mb-1">
                  <Key className="w-3.5 h-3.5 text-blue-600" />
                  <span>Côté Extérieur (Couloir / Accès) :</span>
                </div>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  {currentInfo.exteriorDescription}
                </p>
              </div>

              {/* Côté Intérieur */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Côté Intérieur (Pièce / Sortie) :</span>
                </div>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  {currentInfo.interiorDescription}
                </p>
              </div>

              {/* Particularité mécanique */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <Info className="w-3.5 h-3.5 text-amber-700" />
                  <span>Comportement mécanique essentiel :</span>
                </div>
                <p className="text-slate-700 text-[11.5px] leading-relaxed">
                  {currentInfo.mechanicalBehavior}
                </p>
              </div>
            </div>

            {/* Exemples d'utilisation typiques */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Exemples d'utilisation typiques :
              </h4>
              <ul className="space-y-1.5 text-xs">
                {currentInfo.typicalUses.map((use, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
