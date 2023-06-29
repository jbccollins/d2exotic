import { EArmorStatId, EExpansionId } from "@d2e/types/IdEnums";

export type IntrinsicAttributes = {
  intrinsicStats?: Partial<Record<EArmorStatId, number>>;
  intrinsicFocus?: EArmorStatId;
  isPartialIntrinsicFocus?: boolean;
  expansionIdCampaignCompletionRequired?: EExpansionId;
};
// Armor Hash -> Intrinsic Attributes
export const IntrinsicAttributes: Record<number, IntrinsicAttributes> = {
  3216110440: {
    // An Insurmountable Skullfort
    intrinsicFocus: EArmorStatId.Strength,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1096253259: {
    // Apotheosis Veil
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3874247549: {
    // Armamentarium
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1734844650: {
    // Ashen Wake
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
    },
  },
  2415768376: {
    // Athrys's Embrace
    intrinsicFocus: EArmorStatId.Strength,
  },
  1321354573: {
    // Celestial Nighthawk
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1190497097: {
    // Citan's Ramparts
    intrinsicFocus: EArmorStatId.Resilience,
  },
  3288917178: {
    // Claws of Ahamkara
    intrinsicFocus: EArmorStatId.Strength,
    intrinsicStats: {
      [EArmorStatId.Recovery]: 2,
    },
  },
  1906093346: {
    // Contraverse Hold
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Recovery]: 2,
    },
  },
  2321120637: {
    // Cuirass of the Falling Star
    intrinsicFocus: EArmorStatId.Intellect,
  },
  2808156426: {
    // Eternal Warrior
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
    },
  },
  1163283805: {
    // Gemini Jester
    intrinsicFocus: EArmorStatId.Mobility,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
    },
  },
  3084282676: {
    // Getaway Artist
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1474735276: {
    // Gwisin Vest
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Resilience]: 1,
    },
  },
  106575079: {
    // Helm of Saint-14
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1467044898: {
    // Icefall Mantle
    intrinsicFocus: EArmorStatId.Resilience,
  },
  2757274117: {
    // Khepri's Sting
    intrinsicFocus: EArmorStatId.Strength,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  903984858: {
    // Lucky Raspberry
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Resilience]: 1,
    },
  },
  4136768282: {
    // Lunafaction Boots
    intrinsicFocus: EArmorStatId.Recovery,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1619425569: {
    // Mask of Bakris
    intrinsicFocus: EArmorStatId.Mobility,
  },
  300502917: {
    // Nothing Manacles
    intrinsicFocus: EArmorStatId.Discipline,
  },
  978537162: {
    // Ophidia Spathe
    intrinsicFocus: EArmorStatId.Strength,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Recovery]: 1,
    },
  },
  193869523: {
    // Orpheus Rig
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
    },
  },
  2255796155: {
    // Peregrine Greaves
    intrinsicFocus: EArmorStatId.Strength,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  4057299719: {
    // Phoenix Protocol
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Recovery]: 1,
    },
  },
  235591051: {
    // Promethium Spur
    intrinsicFocus: EArmorStatId.Intellect,
  },
  2766109872: {
    // Raiden Flux
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Resilience]: 1,
    },
  },
  2268523867: {
    // Raiju's Harness
    intrinsicFocus: EArmorStatId.Intellect,
  },
  3070555693: {
    // Sanguine Alchemy
    intrinsicFocus: EArmorStatId.Recovery,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 2,
    },
  },
  691578979: {
    // Shards of Galanor
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1053737370: {
    // Shinobu's Vow
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1030017949: {
    // Skull of Dire Ahamkara
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1001356380: {
    // Star-Eater Scales
    intrinsicFocus: EArmorStatId.Intellect,
  },
  2082483156: {
    // Starfire Protocol
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 2,
    },
  },
  1996008488: {
    // Stormdancer's Brace
    intrinsicFocus: EArmorStatId.Intellect,
    expansionIdCampaignCompletionRequired: EExpansionId.Shadowkeep,
  },
  1219761634: {
    // The Bombardiers
    intrinsicFocus: EArmorStatId.Mobility,
  },
  2766109874: {
    // The Dragon's Shadow
    intrinsicFocus: EArmorStatId.Mobility,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 2,
    },
  },
  1474735277: {
    // The Sixth Coyote
    intrinsicFocus: EArmorStatId.Mobility,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1848640623: {
    // Ursa Furiosa
    intrinsicFocus: EArmorStatId.Intellect,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
    },
    isPartialIntrinsicFocus: true,
  },
  1725917554: {
    // Vesper of Radius
    intrinsicFocus: EArmorStatId.Recovery,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3562696927: {
    // Wormhusk Crown
    intrinsicFocus: EArmorStatId.Mobility,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  475652357: {
    // Young Ahamkara's Spine
    intrinsicFocus: EArmorStatId.Discipline,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  121305948: {
    // Geomag Stabilizers
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 2,
    },
  },
  136355432: {
    // Mk. 44 Stand Asides
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  138282166: {
    // Transversive Steps
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  193869520: {
    // St0mp-EE5
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
    },
  },
  193869522: {
    // Lucky Pants
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  241462141: {
    // Doom Fang Pauldron
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  241462142: {
    // Synthoceps
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  370930766: {
    // Wings of Sacred Dawn
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Recovery]: 1,
    },
  },
  609852545: {
    // Fr0st-EE5
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
    },
  },
  691578978: {
    // Oathkeeper
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,

      [EArmorStatId.Recovery]: 1,
    },
  },
  896224899: {
    // Foetracer
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
    },
  },
  1160559849: {
    // Dunemarchers
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1192890598: {
    // Hallowfire Heart
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1321354572: {
    // Knucklehead Radar
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1341951177: {
    // Heart of Inmost Light
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1591207518: {
    // Actium War Rig
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1591207519: {
    // Crest of Alpha Lupi
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  1654461647: {
    // Aeon Safe
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 2,
    },
  },
  1688602431: {
    // Sealed Ahamkara Grasps
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  1734144409: {
    // Mechaneer's Tricksleeves,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
    },
  },
  1734844651: {
    // Wormgod Caress
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  2177524718: {
    // The Stag
    intrinsicStats: {
      [EArmorStatId.Recovery]: 2,
    },
  },
  2240152949: {
    // Stronghold
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
    },
  },

  2384488862: {
    // Khepri's Horn,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  2423243921: {
    // Antaeus Wards
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  2428181146: {
    // Verity's Brow,
    intrinsicStats: {
      [EArmorStatId.Recovery]: 2,
    },
  },
  2563444729: {
    // ACD/0 Feedback Fence,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
    },
  },
  2578771006: {
    // One-Eyed Mask
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  2773056939: {
    // Graviton Forfeit
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  2950045886: {
    // Aeon Soul
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3381022969: {
    // Crown of Tempests
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,

      [EArmorStatId.Recovery]: 1,
    },
  },
  3381022970: {
    // Eye of Another World
    intrinsicStats: {
      [EArmorStatId.Recovery]: 2,
    },
  },
  3381022971: {
    // Nezarec's Sin,
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3539357318: {
    // Lion Rampant
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
    },
  },
  3539357319: {
    // Peacekeepers
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
    },
  },
  3627185503: {
    // Ophidian Aspect
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3787517196: {
    // Sunbracers
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3844826440: {
    // Karnstein Armlets
    intrinsicStats: {
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3844826443: {
    // Winter's Guile,
    intrinsicStats: {
      [EArmorStatId.Recovery]: 2,
    },
  },
  3883866764: {
    // Mask of the Quiet One
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
    },
  },
  3942036043: {
    // Aeon Swift
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Resilience]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  3948284065: {
    // Astrocyte Verse
    intrinsicStats: {
      [EArmorStatId.Mobility]: 1,
      [EArmorStatId.Recovery]: 1,
    },
  },
  4057299718: {
    // Chromatic Fire
    intrinsicStats: {
      [EArmorStatId.Resilience]: 2,
      [EArmorStatId.Recovery]: 1,
    },
  },
  4165919945: {
    // Liar's Handshake,
    intrinsicStats: {
      [EArmorStatId.Mobility]: 2,
    },
  },
  2203146422: {
    // Assassin's Cowl
    expansionIdCampaignCompletionRequired: EExpansionId.Shadowkeep,
  },
  1537074069: {
    // Phoenix Cradle
    expansionIdCampaignCompletionRequired: EExpansionId.Shadowkeep,
  },
};

export const getIntrinsicAttributes = (itemHash: number) => {
  return IntrinsicAttributes[itemHash];
};
