import React, { useState, useEffect } from 'react';
import { DoorHandCode, HingeSide, SwingAction } from '../types';
import { DOOR_HANDING_DATA } from '../data/doorHandingData';
import { determineDoorHanding, decomposeDoorHanding } from '../utils/doorHandingLogic';
import { DoorPlanSvg } from './DoorPlanSvg';
import { CheckCircle2, Play, Square, Compass } from 'lucide-react';

export const DoorHandingModule: React.FC = () => {
  // Current active door hand code
  const [selectedCode, setSelectedCode] = useState<DoorHandCode>('LH');

  // Fast 2-click verifier states (strictly synchronized)
  const [hingeSide, setHingeSide] = useState<HingeSide>('left');
  const [swingAction, setSwingAction] = useState<SwingAction>('push');

  // Animation angle in degrees (0 to 90)
  const [openAngle, setOpenAngle] = useState<number>(30);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Sync verifier buttons when direct 4-standard buttons are clicked
  const handleSelectCode = (code: DoorHandCode) => {
    setSelectedCode(code);
    const decomposed = decomposeDoorHanding(code);
    setHingeSide(decomposed.hingeSide);
    setSwingAction(decomposed.swingAction);
  };

  // Sync direct standard when verifier Q1 or Q2 buttons are clicked
  const handleHingeChange = (side: HingeSide) => {
    setHingeSide(side);
    const newCode = determineDoorHanding(side, swingAction);
    setSelectedCode(newCode);
  };

  const handleSwingChange = (action: SwingAction) => {
    setSwingAction(action);
    const newCode = determineDoorHanding(hingeSide, action);
    setSelectedCode(newCode);
  };

  // Door opening animation loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setInterval(() => {
        setOpenAngle((prev) => {
          if (prev >= 90) {
            setIsAnimating(false);
            return 90;
          }
          return Math.min(90, prev + 2);
        });
      }, 20);
    }
    return () => clearInterval(timer);
  }, [isAnimating]);

  const toggleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
    } else {
      if (openAngle >= 88) {
        setOpenAngle(0);
      }
      setIsAnimating(true);
    }
  };

  const currentInfo = DOOR_HANDING_DATA[selectedCode];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ============================================================== */}
      {/* 1. OUTIL VÉRIFICATEUR RAPIDE (En haut du module)               */}
      {/* ============================================================== */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-5 md:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Compass className="w-5 h-5" />
              </span>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                Vérificateur rapide
              </h2>
            </div>
            <p className="text-xs md:text-sm text-blue-700 font-semibold mt-1">
              Position de référence : Placez-vous à l'EXTÉRIEUR (couloir / entrée), face à la porte fermée.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
            <span>Norme ANSI/BHMA</span>
            <span className="text-slate-400">·</span>
            <span className="text-amber-700 font-bold">Standard Nord-Américain</span>
          </div>
        </div>

        {/* The 2 questions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1 : Côté des pentures */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              1. Côté des pentures (charnières) :
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleHingeChange('left')}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                  hingeSide === 'left'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>Pentures à GAUCHE</span>
                {hingeSide === 'left' && <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-950" />}
              </button>

              <button
                type="button"
                onClick={() => handleHingeChange('right')}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                  hingeSide === 'right'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>Pentures à DROITE</span>
                {hingeSide === 'right' && <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-950" />}
              </button>
            </div>
          </div>

          {/* Question 2 : Comment s'ouvre la porte pour entrer ? */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              2. Comment s'ouvre la porte pour entrer ?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSwingChange('push')}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                  swingAction === 'push'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>Je POUSSE (intérieur)</span>
                {swingAction === 'push' && <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />}
              </button>

              <button
                type="button"
                onClick={() => handleSwingChange('pull')}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                  swingAction === 'pull'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>Je TIRE (vers moi)</span>
                {swingAction === 'pull' && <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Résultat immédiat mis en évidence */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-mono font-extrabold text-xl shadow-xs">
              {currentInfo.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-bold text-slate-900">
                  {currentInfo.nameFr}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white text-slate-600 font-mono border border-slate-200">
                  {currentInfo.nameEn}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {currentInfo.summary}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className={`text-xs px-3 py-1.5 rounded-xl font-semibold border ${
              currentInfo.standardType === 'Reverse' 
                ? 'bg-amber-50 border-amber-300 text-amber-900' 
                : 'bg-blue-50 border-blue-300 text-blue-900'
            }`}>
              {currentInfo.standardType === 'Reverse' ? '⚠️ Main Inversée (Sortie de secours)' : '✓ Main Standard'}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SÉLECTEUR DIRECT DES 4 NORMES (100% synchronisé)            */}
      {/* ============================================================== */}
      <section className="space-y-2">
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
          Sélection directe parmi les 4 normes ANSI/BHMA :
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(['LH', 'RH', 'LHR', 'RHR'] as DoorHandCode[]).map((code) => {
            const item = DOOR_HANDING_DATA[code];
            const isSelected = selectedCode === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelectCode(code)}
                className={`p-3.5 rounded-2xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-base font-mono font-black ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                    {code}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    item.standardType === 'Reverse' 
                      ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {item.standardType}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {item.nameFr}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {item.hingeLabel} · {item.pushPullLabel.replace("Je ", "")}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SCHÉMA SVG INTERACTIF & FICHE MÉMO TECHNIQUE               */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Colonne Schéma SVG (7 colonnes sur desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-4 md:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Vue en plan (Au-dessus)
              </h3>
            </div>

            {/* SVG Canvas */}
            <DoorPlanSvg code={selectedCode} openAngle={openAngle} />

            {/* Contrôles d'animation */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAnimation}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    isAnimating
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isAnimating ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Arrêter l'animation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Ouvrir / Fermer la porte</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setOpenAngle(openAngle === 0 ? 90 : 0)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
                >
                  {openAngle > 0 ? 'Fermer (0°)' : 'Ouvrir (90°)'}
                </button>
              </div>

              {/* Slider d'ouverture manuelle */}
              <div className="flex items-center gap-2.5 flex-1 max-w-xs">
                <span className="text-[11px] font-mono text-slate-600 shrink-0 font-medium">Angle :</span>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={openAngle}
                  onChange={(e) => {
                    setIsAnimating(false);
                    setOpenAngle(Number(e.target.value));
                  }}
                  aria-label="Angle d'ouverture de la porte"
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] font-mono font-bold text-blue-700 w-10 text-right">
                  {openAngle}°
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Fiche Mémo (5 colonnes sur desktop) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Fiche récapitulative */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-700 font-mono">
                Fiche technique d'installation
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {currentInfo.nameFr} ({currentInfo.code})
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-medium">Position des pentures :</span>
                <span className="font-bold text-amber-700">{currentInfo.hingeLabel}</span>
              </div>

              <div className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-medium">Position de la serrure / poignée :</span>
                <span className="font-bold text-slate-800">{currentInfo.handleLabel}</span>
              </div>

              <div className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 font-medium">Sens de déplacement :</span>
                <span className="font-bold text-blue-700">{currentInfo.pushPullLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
