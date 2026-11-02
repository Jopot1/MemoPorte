import { DoorHandCode, HingeSide, SwingAction } from '../types';

/**
 * Détermine le sens de la porte selon la norme nord-américaine ANSI/BHMA
 * Règle d'or : On se place toujours à l'EXTÉRIEUR (côté couloir/voie d'accès)
 * face à la porte fermée.
 * 
 * @param hingeSide Côté des pentures ('left' ou 'right')
 * @param swingAction 'push' (pousser vers l'intérieur) ou 'pull' (tirer vers soi / extérieur)
 * @returns Code de main ('LH' | 'RH' | 'LHR' | 'RHR')
 */
export function determineDoorHanding(hingeSide: HingeSide, swingAction: SwingAction): DoorHandCode {
  if (swingAction === 'push') {
    return hingeSide === 'left' ? 'LH' : 'RH';
  } else {
    return hingeSide === 'left' ? 'LHR' : 'RHR';
  }
}

/**
 * Décomposition inverse d'un code de porte en côté de penture et action
 */
export function decomposeDoorHanding(code: DoorHandCode): { hingeSide: HingeSide; swingAction: SwingAction } {
  switch (code) {
    case 'LH':
      return { hingeSide: 'left', swingAction: 'push' };
    case 'RH':
      return { hingeSide: 'right', swingAction: 'push' };
    case 'LHR':
      return { hingeSide: 'left', swingAction: 'pull' };
    case 'RHR':
      return { hingeSide: 'right', swingAction: 'pull' };
  }
}

/**
 * Calcule l'angle effectif d'ouverture (en degrés) et la transformation géométrique
 * pour le dessin SVG en vue de dessus.
 * 
 * @param code Code de main de porte
 * @param openAngle Angle d'ouverture en degrés (0° fermé à 90° grand ouvert)
 */
export function getDoorRotationAngle(
  code: DoorHandCode,
  openAngle: number // 0° (fermé) à 90° (ouvert à 90°)
): number {
  const currentDegrees = Math.max(0, Math.min(90, openAngle));

  if (currentDegrees === 0) return 0;

  switch (code) {
    // LH : Penture à gauche, pousse vers le haut (intérieur) -> rotation sens anti-horaire (-90°)
    case 'LH':
      return -currentDegrees;
    
    // RH : Penture à droite, pousse vers le haut (intérieur) -> rotation sens horaire (+90°)
    case 'RH':
      return currentDegrees;

    // LHR : Penture à gauche, tire vers le bas (extérieur) -> rotation sens horaire (+90°)
    case 'LHR':
      return currentDegrees;

    // RHR : Penture à droite, tire vers le bas (extérieur) -> rotation sens anti-horaire (-90°)
    case 'RHR':
      return -currentDegrees;
  }
}
