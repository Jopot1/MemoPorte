/**
 * Types pour l'application d'Aide-mémoire Quincaillerie & Portes
 * Normes ANSI/BHMA & Standard Canadien / Québécois
 */

export type HingeSide = 'left' | 'right';
export type SwingAction = 'push' | 'pull';
export type DoorHandCode = 'LH' | 'RH' | 'LHR' | 'RHR';

export interface DoorHandingInfo {
  code: DoorHandCode;
  nameFr: string;
  nameEn: string;
  shortLabel: string;
  hingeSide: HingeSide;
  swingAction: SwingAction;
  pushPullLabel: string;
  hingeLabel: string;
  handleLabel: string;
  lockButtonLocation: string;
  standardType: 'Standard' | 'Reverse';
  buildingCodeNote: string;
  mnemonicTip: string;
  summary: string;
}

export type LockFunctionKey = 'passage' | 'intimite' | 'bureau' | 'classe' | 'depot' | 'factice';

export interface LockFunctionInfo {
  key: LockFunctionKey;
  seriesCode: string;
  ansiCode?: string;
  nameFr: string;
  nameEn: string;
  subtitle: string;
  exteriorDescription: string;
  exteriorMechanism: 'free' | 'emergency-slot' | 'cylinder-key' | 'rigid-always-locked' | 'surface-mount-dummy';
  interiorDescription: string;
  interiorMechanism: 'free' | 'push-button' | 'turn-push-button' | 'always-free-no-button' | 'none-dummy';
  mechanicalBehavior: string;
  warningAlert?: string;
  typicalUses: string[];
  securityLevel: 'Nul (libre)' | 'Intimité (urgence)' | 'Contrôlé (clé)' | 'Haute sécurité (accès restreint)' | 'Aucun (tirage fixe)';
}

export interface GlossaryTerm {
  quebecTerm: string;
  standardFrenchTerm: string;
  englishTerm: string;
  definition: string;
  exampleOrNote?: string;
}

export type ActiveTab = 'accueil' | 'sens-porte' | 'poignees';
