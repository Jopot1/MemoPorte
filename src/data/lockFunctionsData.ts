import { LockFunctionInfo, LockFunctionKey } from '../types';

export const LOCK_FUNCTIONS_DATA: Record<LockFunctionKey, LockFunctionInfo> = {
  passage: {
    key: 'passage',
    seriesCode: 'EM1010',
    nameFr: 'Passage',
    nameEn: 'Passage Latchset',
    subtitle: 'Libre des deux côtés',
    exteriorDescription: 'Sans bouton ni serrure, toujours libre des deux côtés. Aucun trou d\'urgence, ni fente, ni barillet à clé.',
    exteriorMechanism: 'free',
    interiorDescription: 'Levier libre en tout temps. Aucun bouton de verrouillage.',
    interiorMechanism: 'free',
    mechanicalBehavior: 'Les leviers extérieur et intérieur actionnent le pêne demi-tour librement et en permanence. La porte ne peut jamais être barrée.',
    typicalUses: [
      'Couloirs de distribution',
      'Portes de placards / garde-robes avec loquet',
      'Salles de réunion ouvertes ou zones de passage continu',
      'Portes de transition entre aires de service'
    ],
    securityLevel: 'Nul (libre)'
  },
  intimite: {
    key: 'intimite',
    seriesCode: 'EM1042',
    nameFr: 'Intimité',
    nameEn: 'Privacy Lockset',
    subtitle: 'Bouton int. & urgence ext.',
    exteriorDescription: 'Petit trou de sécurité d\'urgence (déverrouillage possible avec un petit tournevis plat, une pièce de monnaie ou une goupille).',
    exteriorMechanism: 'emergency-slot',
    interiorDescription: 'Bouton poussoir à l\'intérieur pour barrer le levier extérieur. Levier intérieur toujours opérationnel pour sortir.',
    interiorMechanism: 'push-button',
    mechanicalBehavior: 'Tourner le levier intérieur débarre immédiatement la serrure pour une sortie instantanée. Dans la plupart des serrures commerciales, claquer la porte libère également le bouton poussoir pour éviter de s\'enfermer dehors.',
    typicalUses: [
      'Toilettes et salles de bain (résidentielles et commerciales)',
      'Vestiaires individuels',
      'Cabines d\'essayage',
      'Salles de repos privées ou d\'allaitement'
    ],
    securityLevel: 'Intimité (urgence)'
  },
  bureau: {
    key: 'bureau',
    seriesCode: 'EM1053',
    nameFr: 'Entrée / Bureau',
    nameEn: 'Office / Entry Lockset',
    subtitle: 'Clé ext. & bouton int.',
    exteriorDescription: 'Serrure à clé au centre du levier. Quand la porte est barrée, la clé rétracte le pêne demi-tour pour autoriser l\'entrée. Quand elle est débarrée, le levier fonctionne librement.',
    exteriorMechanism: 'cylinder-key',
    interiorDescription: 'Bouton poussoir/rotatif permettant de barrer la porte ou de la laisser débarrée pendant la journée. Le levier intérieur ouvre toujours la porte pour sortir.',
    interiorMechanism: 'turn-push-button',
    mechanicalBehavior: 'Polyvalence horaire : en tournant ou enfonçant le bouton intérieur, l\'occupant décide si la porte reste débarrée (mode accueil pendant la journée) ou barrée (clé requise pour entrer). Sortie d\'urgence toujours libre de l\'intérieur sans clé.',
    typicalUses: [
      'Bureaux individuels de direction ou d\'employés',
      'Salles de consultation médicale',
      'Locaux administratifs d\'entreprises',
      'Portes d\'accès secondaires contrôlées'
    ],
    securityLevel: 'Contrôlé (clé)'
  },
  classe: {
    key: 'classe',
    seriesCode: 'EM1070',
    nameFr: 'Salle de classe',
    nameEn: 'Classroom Lockset',
    subtitle: 'Clé ext. uniquement',
    exteriorDescription: 'Serrure à clé qui permet de barrer ou débarrer le levier extérieur. Quand la porte est débarrée, le levier extérieur actionne librement le pêne.',
    exteriorMechanism: 'cylinder-key',
    interiorDescription: 'Levier toujours libre, aucun bouton de verrouillage (impossible de s\'enfermer ou de barrer la porte depuis l\'intérieur).',
    interiorMechanism: 'always-free-no-button',
    mechanicalBehavior: 'Particularité essentielle (différence avec Bureau EM1053) : empêche toute personne à l\'intérieur de barrer la porte, tout en permettant au responsable de laisser la porte débarrée pendant la journée à l\'aide de la clé extérieure.',
    typicalUses: [
      'Salles de classe primaires, secondaires et collégiales',
      'Salles de conférence et de formation',
      'Laboratoires scolaires et universitaires',
      'Locaux polyvalents et d\'activités collectives'
    ],
    securityLevel: 'Contrôlé (clé)'
  },
  depot: {
    key: 'depot',
    seriesCode: 'EM1080',
    nameFr: 'Entreposage / Dépôt',
    nameEn: 'Storeroom Lockset',
    subtitle: 'Toujours barrée dehors',
    exteriorDescription: 'Serrure à clé à l\'extérieur avec levier rigide toujours barré à 100 % du temps. La clé est obligatoire à chaque ouverture pour rétracter le pêne.',
    exteriorMechanism: 'rigid-always-locked',
    interiorDescription: 'Aucun bouton à l\'intérieur (toujours libre pour sortir). Levier intérieur opérationnel en tout temps pour une sortie garantie sans clé.',
    interiorMechanism: 'always-free-no-button',
    mechanicalBehavior: 'Mécanisme sans état débarré permanent : le levier extérieur ne peut JAMAIS être laissé en mode passage libre. Dès que la clé est retirée et que la porte se referme, la porte est instantanément barrée de l\'extérieur.',
    typicalUses: [
      'Locaux techniques, électriques et chaufferies',
      'Entrepôts d\'outillage et de quincaillerie',
      'Salles de serveurs informatiques (Data closets)',
      'Locaux d\'entretien et d\'archives confidentielles'
    ],
    securityLevel: 'Haute sécurité (accès restreint)'
  },
  factice: {
    key: 'factice',
    seriesCode: 'EM1017',
    nameFr: 'Factice (Dummy)',
    nameEn: 'Single Dummy Lever',
    subtitle: 'Tirage fixe sans pêne',
    exteriorDescription: '1 seul levier rigide et fixe vissé en surface sans perçage traversant. Aucun loquet, bouton ni serrure.',
    exteriorMechanism: 'surface-mount-dummy',
    interiorDescription: 'Rien à l\'intérieur (face arrière de porte lisse sans rosace ni levier).',
    interiorMechanism: 'none-dummy',
    mechanicalBehavior: 'Poignée fixe de tirage (aucun mécanisme). Ne possède aucun pêne dans la tranche de porte. Le maintien de la porte fermée est assuré par un loqueteau à rouleau, à bille ou aimanté.',
    typicalUses: [
      'Portes de garde-robes et placards',
      'Battant inactif / passif d\'une porte double',
      'Penderies résidentielles et armoires intégrées',
      'Portes de rangement avec loqueteau à bille'
    ],
    securityLevel: 'Aucun (tirage fixe)'
  }
};
