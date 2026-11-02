import React from 'react';
import { LockFunctionKey } from '../types';
import { LOCK_FUNCTIONS_DATA } from '../data/lockFunctionsData';

interface LockMechanismSvgProps {
  functionKey: LockFunctionKey;
  isSimulatedLocked: boolean;
}

export const LockMechanismSvg: React.FC<LockMechanismSvgProps> = ({
  functionKey,
  isSimulatedLocked,
}) => {
  const info = LOCK_FUNCTIONS_DATA[functionKey];

  // Specific state resolution per lock function:
  const isPassage = functionKey === 'passage';
  const isStoreroom = functionKey === 'depot';
  const isClasse = functionKey === 'classe';
  const isFactice = functionKey === 'factice';

  const exteriorIsLocked = isPassage || isFactice
    ? false
    : isStoreroom
    ? true
    : isSimulatedLocked;

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative w-full aspect-[580/340] max-w-[620px] bg-slate-50/90 rounded-2xl border border-slate-200/90 shadow-inner overflow-hidden p-2">
        <svg
          viewBox="0 0 580 340"
          className="w-full h-full font-sans drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic gradients for levers and rosettes */}
            <linearGradient id="leverChrome" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient id="rosetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="doorWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="25%" stopColor="#f1f5f9" />
              <stop offset="75%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="spindleSteel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient id="brassCylinder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Hatching for wood core */}
            <pattern id="doorWoodHatch" width="8" height="8" patternTransform="rotate(25 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.8" />
            </pattern>
          </defs>

          {/* ZONE GAUCHE : EXTÉRIEUR */}
          <rect x="0" y="0" width="240" height="340" fill="#f0f9ff" fillOpacity="0.85" />
          <g transform="translate(20, 64)">
            <rect x="0" y="0" width="180" height="26" rx="6" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="12" y="17" fill="#1d4ed8" fontSize="12" fontWeight="700" letterSpacing="0.04em">
              EXTÉRIEUR (Couloir)
            </text>
          </g>

          {/* ZONE DROITE : INTÉRIEUR */}
          <rect x="340" y="0" width="240" height="340" fill="#f0fdf4" fillOpacity="0.85" />
          <g transform="translate(380, 24)">
            <rect x="0" y="0" width="180" height="26" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
            <text x="12" y="17" fill="#047857" fontSize="12" fontWeight="700" letterSpacing="0.04em">
              INTÉRIEUR (Pièce)
            </text>
          </g>

          {/* TRANCHE DE PORTE (Centre : x=240 à x=340, épaisseur 100px) */}
          <g transform="translate(240, 50)">
            {/* Corps de la porte */}
            <rect x="0" y="0" width="100" height="250" rx="4" fill="url(#doorWood)" stroke="#64748b" strokeWidth="2" />
            <rect x="0" y="0" width="100" height="250" fill="url(#doorWoodHatch)" />

            {!isFactice ? (
              <>
                {/* Boîtier mortaisé / tubulaire au centre */}
                <rect x="15" y="65" width="70" height="120" rx="4" fill="#334155" stroke="#475569" strokeWidth="1.5" />

                {/* Pêne demi-tour (Latch bolt) au centre supérieur de la porte */}
                <g transform="translate(35, 105)">
                  <rect x="0" y="0" width="30" height="20" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
                  {/* Biseau du pêne sortant */}
                  <path d="M 30 0 L 44 8 L 44 20 L 30 20 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
                </g>
              </>
            ) : (
              /* MODÈLE FACTICE : Tranche pleine, aucun boîtier mortaisé ni pêne */
              <g transform="translate(50, 115)">
                <rect x="-42" y="-14" width="84" height="28" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="0" y="3" fill="#64748b" fontSize="9.5" fontWeight="700" textAnchor="middle">
                  AUCUN PÊNE
                </text>
                <text x="0" y="24" fill="#94a3b8" fontSize="8.5" fontWeight="600" textAnchor="middle">
                  (Porte pleine)
                </text>
              </g>
            )}

            {/* Cote d'épaisseur standard */}
            <line x1="0" y1="262" x2="100" y2="262" stroke="#64748b" strokeWidth="1.5" />
            <line x1="0" y1="257" x2="0" y2="267" stroke="#64748b" strokeWidth="1.5" />
            <line x1="100" y1="257" x2="100" y2="267" stroke="#64748b" strokeWidth="1.5" />
            <text x="50" y="278" fill="#475569" fontSize="11" fontWeight="700" textAnchor="middle">
              Épaisseur standard (1-3/4")
            </text>
          </g>

          {/* AXE CARRÉ / TIGE TRAVERSANTE (Spindle) - Absent sur Factice */}
          {!isFactice && (
            <rect x="160" y="172" width="260" height="8" rx="2" fill="url(#spindleSteel)" stroke="#475569" strokeWidth="1" />
          )}

          {/* ============================================================== */}
          {/* CÔTÉ EXTÉRIEUR (Gauche) : Rosace + Levier + Mécanisme Spécifique */}
          {/* ============================================================== */}
          <g transform="translate(180, 176)">
            {/* Rosace extérieure fixée contre la porte */}
            <rect x="35" y="-36" width="25" height="72" rx="4" fill="url(#rosetteGradient)" stroke="#475569" strokeWidth="1.5" />
            
            {/* Vis apparentes de fixation en surface pour Factice */}
            {isFactice && (
              <g>
                {/* Vis supérieure */}
                <circle cx="47" cy="-24" r="3.5" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="45" y1="-24" x2="49" y2="-24" stroke="#ffffff" strokeWidth="1" />
                {/* Vis inférieure */}
                <circle cx="47" cy="24" r="3.5" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="45" y1="24" x2="49" y2="24" stroke="#ffffff" strokeWidth="1" />
                {/* Indicateur de montage en surface */}
                <g transform="translate(-30, -50)">
                  <rect x="0" y="0" width="105" height="20" rx="4" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
                  <text x="52" y="14" fill="#334155" fontSize="9" fontWeight="700" textAnchor="middle">
                    Montage en surface
                  </text>
                </g>
              </g>
            )}

            {/* Collerette / Bossage du levier */}
            <circle cx="20" cy="0" r="28" fill="url(#rosetteGradient)" stroke="#64748b" strokeWidth="2" />

            {/* LEVIER EXTÉRIEUR (Part vers la gauche) */}
            <path
              d="M 20 -9 L -90 -9 Q -115 -9 -115 0 Q -115 9 -90 9 L 20 9 Z"
              fill="url(#leverChrome)"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            {/* Finition arrondie du levier */}
            <circle cx="-100" cy="0" r="10" fill="url(#leverChrome)" />

            {/* MÉCANISME AU CENTRE DE LA ROSACE EXTÉRIEURE SELON LE TYPE */}
            {(isPassage || isFactice) && (
              /* PASSAGE & FACTICE : Surface lisse sans trou ni barillet */
              <g>
                <circle cx="20" cy="0" r="14" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="20" cy="0" r="4" fill={isFactice ? '#64748b' : '#10b981'} />
              </g>
            )}

            {functionKey === 'intimite' && (
              /* INTIMITÉ : Fente de sécurité pour tournevis plat */
              <g>
                <circle cx="20" cy="0" r="15" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
                {/* Fente tournevis d'urgence */}
                <rect x="11" y="-2" width="18" height="4" rx="1" fill="#ffffff" />
                {/* Icône d'urgence tournevis */}
                <g transform="translate(-15, -45)">
                  <rect x="0" y="0" width="70" height="20" rx="4" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
                  <text x="35" y="14" fill="#b45309" fontSize="9" fontWeight="700" textAnchor="middle">
                    Tournevis d'urg.
                  </text>
                </g>
              </g>
            )}

            {(functionKey === 'bureau' || functionKey === 'depot' || functionKey === 'classe') && (
              /* BUREAU, CLASSE ou DÉPÔT : Cylindre de serrure à clé */
              <g>
                {/* Barillet en laiton */}
                <circle cx="20" cy="0" r="16" fill="url(#brassCylinder)" stroke="#b45309" strokeWidth="1.5" />
                {/* Fente de clé verticale */}
                <rect x="18.5" y="-9" width="3" height="18" rx="1.5" fill="#1e293b" />
                <circle cx="20" cy="4" r="2.5" fill="#1e293b" />
              </g>
            )}
          </g>

          {/* ÉTIQUETTE D'ÉTAT EXTÉRIEUR */}
          <g transform="translate(110, 275)">
            {isFactice ? (
              <g>
                <rect x="-85" y="-14" width="170" height="28" rx="6" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="4" fill="#334155" fontSize="11" fontWeight="800" textAnchor="middle">
                  ✋ POIGNÉE FIXE (Tirage)
                </text>
                <text x="0" y="24" fill="#64748b" fontSize="9.5" fontWeight="600" textAnchor="middle">
                  (Aucun mécanisme interne)
                </text>
              </g>
            ) : exteriorIsLocked ? (
              <g>
                <rect x="-85" y="-14" width="170" height="28" rx="6" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
                <text x="0" y="4" fill="#b91c1c" fontSize="11" fontWeight="800" textAnchor="middle">
                  🔒 EXTÉRIEUR BARRÉ
                </text>
                {isStoreroom && (
                  <text x="0" y="24" fill="#dc2626" fontSize="9.5" fontWeight="700" textAnchor="middle">
                    (Clé requise 100% du temps)
                  </text>
                )}
                {isClasse && (
                  <text x="0" y="24" fill="#dc2626" fontSize="9.5" fontWeight="700" textAnchor="middle">
                    (Barré avec la clé extérieure)
                  </text>
                )}
                {functionKey === 'bureau' && (
                  <text x="0" y="24" fill="#dc2626" fontSize="9.5" fontWeight="700" textAnchor="middle">
                    (Clé requise pour entrer)
                  </text>
                )}
              </g>
            ) : (
              <g>
                <rect x="-85" y="-14" width="170" height="28" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
                <text x="0" y="4" fill="#047857" fontSize="11" fontWeight="800" textAnchor="middle">
                  🔓 EXTÉRIEUR LIBRE
                </text>
                {isClasse && (
                  <text x="0" y="24" fill="#047857" fontSize="9.5" fontWeight="700" textAnchor="middle">
                    (Débarré avec la clé extérieure)
                  </text>
                )}
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* CÔTÉ INTÉRIEUR (Droite) : Rosace + Levier + Bouton spécifique  */}
          {/* ============================================================== */}
          {!isFactice ? (
            <g transform="translate(400, 176)">
              {/* Rosace intérieure fixée contre la porte */}
              <rect x="-60" y="-36" width="25" height="72" rx="4" fill="url(#rosetteGradient)" stroke="#475569" strokeWidth="1.5" />
              
              {/* Collerette / Bossage du levier */}
              <circle cx="-20" cy="0" r="28" fill="url(#rosetteGradient)" stroke="#64748b" strokeWidth="2" />

              {/* LEVIER INTÉRIEUR (Part vers la droite) */}
              <path
                d="M -20 -9 L 90 -9 Q 115 -9 115 0 Q 115 9 90 9 L -20 9 Z"
                fill="url(#leverChrome)"
                stroke="#64748b"
                strokeWidth="1.5"
              />
              {/* Finition arrondie du levier */}
              <circle cx="100" cy="0" r="10" fill="url(#leverChrome)" />

              {/* MÉCANISME AU CENTRE DE LA ROSACE INTÉRIEURE SELON LE TYPE */}
              {isPassage && (
                /* PASSAGE : Aucun bouton, lisse */
                <g>
                  <circle cx="-20" cy="0" r="14" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                  <circle cx="-20" cy="0" r="4" fill="#10b981" />
                </g>
              )}

              {functionKey === 'intimite' && (
                /* INTIMITÉ : Bouton poussoir */
                <g>
                  <circle cx="-20" cy="0" r="15" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Bouton poussoir enfoncé ou sorti */}
                  <circle
                    cx="-20"
                    cy="0"
                    r={isSimulatedLocked ? 6.5 : 9}
                    fill={isSimulatedLocked ? '#dc2626' : '#64748b'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <g transform="translate(-55, -45)">
                    <rect x="0" y="0" width="70" height="20" rx="4" fill="#ffffff" stroke="#dc2626" strokeWidth="1" />
                    <text x="35" y="14" fill="#b91c1c" fontSize="9" fontWeight="700" textAnchor="middle">
                      Bouton poussoir
                    </text>
                  </g>
                </g>
              )}

              {functionKey === 'bureau' && (
                /* BUREAU : Bouton tournant / poussoir */
                <g>
                  <circle cx="-20" cy="0" r="15" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Molette rotative / poussoir */}
                  <rect
                    x="-23"
                    y="-10"
                    width="6"
                    height="20"
                    rx="2"
                    fill={isSimulatedLocked ? '#dc2626' : '#2563eb'}
                    stroke="#ffffff"
                    strokeWidth="1"
                    transform={isSimulatedLocked ? 'rotate(90 -20 0)' : 'rotate(0 -20 0)'}
                  />
                  <g transform="translate(-60, -45)">
                    <rect x="0" y="0" width="80" height="20" rx="4" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
                    <text x="40" y="14" fill="#1d4ed8" fontSize="9" fontWeight="700" textAnchor="middle">
                      Bouton tournant
                    </text>
                  </g>
                </g>
              )}

              {(isStoreroom || isClasse) && (
                /* DÉPÔT & CLASSE : AUCUN BOUTON SUR LE LEVIER INTÉRIEUR */
                <g>
                  <circle cx="-20" cy="0" r="16" fill="#334155" stroke="#64748b" strokeWidth="2" />
                  <line x1="-28" y1="-8" x2="-12" y2="8" stroke="#10b981" strokeWidth="2.5" />
                  <line x1="-28" y1="8" x2="-12" y2="-8" stroke="#10b981" strokeWidth="2.5" />
                  <g transform="translate(-65, -45)">
                    <rect x="0" y="0" width="95" height="20" rx="4" fill="#ffffff" stroke="#059669" strokeWidth="1" />
                    <text x="47" y="14" fill="#047857" fontSize="9" fontWeight="700" textAnchor="middle">
                      AUCUN BOUTON !
                    </text>
                  </g>
                </g>
              )}
            </g>
          ) : (
            /* MODÈLE FACTICE : Aucun levier ni rosace côté intérieur (face aveugle) */
            <g transform="translate(420, 176)">
              <rect x="-40" y="-45" width="130" height="90" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="25" y="-12" fill="#475569" fontSize="11" fontWeight="800" textAnchor="middle">
                FACE AVEUGLE
              </text>
              <text x="25" y="8" fill="#64748b" fontSize="9.5" fontWeight="600" textAnchor="middle">
                Aucune poignée
              </text>
              <text x="25" y="26" fill="#94a3b8" fontSize="9" fontWeight="500" textAnchor="middle">
                (Montage simple face)
              </text>
            </g>
          )}

          {/* ÉTIQUETTE D'ÉTAT INTÉRIEUR */}
          <g transform="translate(470, 275)">
            {!isFactice ? (
              <g>
                <rect x="-85" y="-14" width="170" height="28" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
                <text x="0" y="4" fill="#047857" fontSize="11" fontWeight="800" textAnchor="middle">
                  🏃 SORTIE TOUJOURS LIBRE
                </text>
                <text x="0" y="24" fill="#059669" fontSize="9" fontWeight="600" textAnchor="middle">
                  (Sécurité incendie / Sans clé)
                </text>
              </g>
            ) : (
              <g>
                <rect x="-85" y="-14" width="170" height="28" rx="6" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="4" fill="#475569" fontSize="11" fontWeight="700" textAnchor="middle">
                  DOS DE PORTE LISSE
                </text>
                <text x="0" y="24" fill="#64748b" fontSize="9" fontWeight="500" textAnchor="middle">
                  (Maintien par loqueteau)
                </text>
              </g>
            )}
          </g>
        </svg>

        {/* Indicateur de badge de fonction */}
        <div className="absolute top-3 left-3 bg-white/95 border border-slate-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-slate-800 shadow-xs">
          Série {info.seriesCode}
        </div>
      </div>
    </div>
  );
};
