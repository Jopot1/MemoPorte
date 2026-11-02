import React from 'react';
import { DoorHandCode } from '../types';
import { DOOR_HANDING_DATA } from '../data/doorHandingData';
import { getDoorRotationAngle } from '../utils/doorHandingLogic';

interface DoorPlanSvgProps {
  code: DoorHandCode;
  openAngle: number; // 0 to 90 degrees
}

export const DoorPlanSvg: React.FC<DoorPlanSvgProps> = ({ code, openAngle }) => {
  const info = DOOR_HANDING_DATA[code];
  const isLeftHinge = info.hingeSide === 'left';
  const isPush = info.swingAction === 'push';

  // Fixed geometry on canvas 540 x 440
  // Wall line Y=220. Wall thickness: 24 (208 to 232)
  // Opening: 180 to 360 (Width: 180)
  const pivotX = isLeftHinge ? 180 : 360;
  const pivotY = 220;
  const doorWidth = 180;
  const doorThickness = 12;

  // Rotation angle calculation
  const rotationAngle = getDoorRotationAngle(code, openAngle);

  // SVG arc path for swing trajectory
  // Arc center: (pivotX, pivotY), radius: 180
  let arcPath = '';
  let arrowAngle = 0;
  let arrowX = 0;
  let arrowY = 0;

  if (code === 'LH') {
    // Pivot (180, 220). Arc from (360, 220) counter-clockwise to (180, 40)
    arcPath = 'M 360 220 A 180 180 0 0 0 180 40';
    arrowX = 295;
    arrowY = 110;
    arrowAngle = -35;
  } else if (code === 'RH') {
    // Pivot (360, 220). Arc from (180, 220) clockwise to (360, 40)
    arcPath = 'M 180 220 A 180 180 0 0 1 360 40';
    arrowX = 245;
    arrowY = 110;
    arrowAngle = 35;
  } else if (code === 'LHR') {
    // Pivot (180, 220). Arc from (360, 220) clockwise to (180, 400)
    arcPath = 'M 360 220 A 180 180 0 0 1 180 400';
    arrowX = 295;
    arrowY = 330;
    arrowAngle = 35;
  } else {
    // RHR: Pivot (360, 220). Arc from (180, 220) counter-clockwise to (360, 400)
    arcPath = 'M 180 220 A 180 180 0 0 0 360 400';
    arrowX = 245;
    arrowY = 330;
    arrowAngle = -35;
  }

  // Handle position relative to door leaf
  const handleOffsetFromPivot = isLeftHinge ? 145 : -145;

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative w-full aspect-[540/440] max-w-[560px] bg-slate-50/90 rounded-2xl border border-slate-200/90 shadow-inner overflow-hidden p-2">
        <svg
          viewBox="0 0 540 440"
          className="w-full h-full drop-shadow-xs font-sans"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Wall hatch pattern */}
            <pattern id="wallHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#94a3b8" strokeWidth="2" strokeOpacity="0.6" />
            </pattern>

            {/* Gradients */}
            <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            {/* Marker arrow */}
            <marker id="swingArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb" />
            </marker>
          </defs>

          {/* ZONE HAUT : INTÉRIEUR (Pièce) */}
          <rect x="0" y="0" width="540" height="208" fill="#f8fafc" />
          <g transform="translate(10, 16)">
            <rect x="0" y="0" width="160" height="24" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="8" y="16" fill="#334155" fontSize="10.5" fontWeight="700" letterSpacing="0.03em">
              ZONE INTÉRIEURE (Pièce)
            </text>
          </g>

          {/* ZONE BAS : EXTÉRIEUR (Couloir) */}
          <rect x="0" y="232" width="540" height="208" fill="#f0f9ff" fillOpacity="0.85" />
          <g transform="translate(10, 244)">
            <rect x="0" y="0" width="160" height="24" rx="6" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="7" y="16" fill="#1d4ed8" fontSize="10.5" fontWeight="700" letterSpacing="0.02em">
              ZONE EXTÉRIEURE (Couloir)
            </text>
          </g>

          {/* OBSERVATEUR (Vue de dessus) */}
          <g transform="translate(270, 390)">
            {/* Person icon standing outside looking towards door */}
            <circle cx="0" cy="0" r="13" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            {/* Nose pointing UP toward door */}
            <path d="M -5 -7 L 0 -18 L 5 -7 Z" fill="#2563eb" />
            {/* Shoulders */}
            <path d="M -20 8 Q 0 3 20 8" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" fill="none" />
            <text x="0" y="26" fill="#1e40af" fontSize="10" fontWeight="700" textAnchor="middle">
              OBSERVATEUR (Couloir)
            </text>
            <text x="0" y="38" fill="#2563eb" fontSize="9" fontWeight="600" textAnchor="middle">
              Face à la porte fermée
            </text>
          </g>

          {/* MURS ET CLOISONS */}
          {/* Mur Gauche */}
          <rect x="0" y="208" width="180" height="24" fill="url(#wallHatch)" stroke="#64748b" strokeWidth="2" />
          {/* Cadre chambranle gauche */}
          <rect x="174" y="204" width="8" height="32" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
          
          {/* Mur Droit */}
          <rect x="360" y="208" width="180" height="24" fill="url(#wallHatch)" stroke="#64748b" strokeWidth="2" />
          {/* Cadre chambranle droit */}
          <rect x="358" y="204" width="8" height="32" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1" />

          {/* Ligne d'axe d'ouverture / Cote de passage */}
          <line x1="182" y1="220" x2="358" y2="220" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* ARC DE CERCLE DE BATTEMENT */}
          <path
            d={arcPath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            markerEnd="url(#swingArrow)"
          />

          {/* LABEL DE SENS D'ACTION SUR L'ARC */}
          <g transform={`translate(${arrowX}, ${arrowY}) rotate(${arrowAngle})`}>
            <rect x="-42" y="-12" width="84" height="22" rx="4" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            <text x="0" y="3" fill="#1d4ed8" fontSize="10" fontWeight="700" textAnchor="middle">
              {isPush ? 'POUSSE ➔' : 'TIRE ➔'}
            </text>
          </g>

          {/* BATTANT DE LA PORTE (En rotation selon pivotX, pivotY) */}
          <g transform={`translate(${pivotX}, ${pivotY}) rotate(${rotationAngle})`}>
            {/* Panneau de porte */}
            {isLeftHinge ? (
              <rect
                x="0"
                y={-doorThickness / 2}
                width={doorWidth}
                height={doorThickness}
                rx="3"
                fill="url(#doorGradient)"
                stroke="#0369a1"
                strokeWidth="1.5"
                className="transition-transform duration-75"
              />
            ) : (
              <rect
                x={-doorWidth}
                y={-doorThickness / 2}
                width={doorWidth}
                height={doorThickness}
                rx="3"
                fill="url(#doorGradient)"
                stroke="#0369a1"
                strokeWidth="1.5"
                className="transition-transform duration-75"
              />
            )}

            {/* POIGNÉES / LEVIERS SUR LE BATTANT */}
            <g transform={`translate(${handleOffsetFromPivot}, 0)`}>
              {/* Rosace centrale traversante */}
              <circle cx="0" cy="0" r="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* LEVIER CÔTÉ INTÉRIEUR (vers Y négatif) */}
              <line x1="0" y1="-6" x2="0" y2="-22" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-22" x2={isLeftHinge ? "14" : "-14"} y2="-22" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
              
              {/* LEVIER CÔTÉ EXTÉRIEUR (vers Y positif) */}
              <line x1="0" y1="6" x2="0" y2="22" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="22" x2={isLeftHinge ? "14" : "-14"} y2="22" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            </g>
          </g>

          {/* PENTURES / CHARNIÈRES (Sur le cadre fixe) */}
          <g transform={`translate(${pivotX}, ${pivotY})`}>
            {/* Halo lumineux de repérage */}
            <circle cx="0" cy="0" r="14" fill="#f59e0b" fillOpacity="0.3" className="animate-pulse" />
            <circle cx="0" cy="0" r="7" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
          </g>

          {/* ÉTIQUETTE FLÉCHÉE SUR LA PENTURE */}
          <g transform={`translate(${isLeftHinge ? 95 : 445}, 180)`}>
            <rect x="-85" y="-14" width="170" height="26" rx="6" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="0" y="3" fill="#b45309" fontSize="11" fontWeight="800" textAnchor="middle">
              ● PENTURES À {isLeftHinge ? 'GAUCHE' : 'DROITE'}
            </text>
          </g>
        </svg>

        {/* Badge d'état de l'angle */}
        <div className="absolute top-3 right-3 bg-white/95 border border-slate-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-blue-700 shadow-xs">
          Angle : {openAngle}°
        </div>
      </div>
    </div>
  );
};
