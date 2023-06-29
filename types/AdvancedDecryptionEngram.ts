import { ValidateEnumList } from "@d2e/globals";
import { getExpansionBySeasonHash } from "./Expansion";
import {
  EAdvancedDecryptionEngramId,
  EArmorSlotId,
  EExpansionId,
} from "./IdEnums";

export const AdvancedDecrpytionEngramIdList = ValidateEnumList(
  Object.values(EAdvancedDecryptionEngramId),
  [
    EAdvancedDecryptionEngramId.RedWarHelm,
    EAdvancedDecryptionEngramId.RedWarChest,
    EAdvancedDecryptionEngramId.RedWarArms,
    EAdvancedDecryptionEngramId.RedWarLeg,
    EAdvancedDecryptionEngramId.Forsaken,
    EAdvancedDecryptionEngramId.Shadowkeep,
    EAdvancedDecryptionEngramId.BeyondLight,
    EAdvancedDecryptionEngramId.WitchQueen,
    EAdvancedDecryptionEngramId.Lightfall,
  ]
);

export type AdvancedDecryptionEngram = {
  id: EAdvancedDecryptionEngramId;
  name: string;
  expansionId: EExpansionId;
  armorSlotIdList: EArmorSlotId[];
  order: number;
  icon: string;
};

const allArmorSlots = [
  EArmorSlotId.Helm,
  EArmorSlotId.Arms,
  EArmorSlotId.Chest,
  EArmorSlotId.Leg,
];

const AdvancedDecryptionEngramIdToAdvancedDecryptionEngramMapping: Record<
  EAdvancedDecryptionEngramId,
  AdvancedDecryptionEngram
> = {
  [EAdvancedDecryptionEngramId.RedWarHelm]: {
    id: EAdvancedDecryptionEngramId.RedWarHelm,
    name: "Red War Helm Decryption",
    expansionId: EExpansionId.RedWar,
    armorSlotIdList: [EArmorSlotId.Helm],
    order: 0,
    icon: "https://www.bungie.net/common/destiny2_content/icons/fabde2a21cd50051c3b2d1413445b869.png",
  },
  [EAdvancedDecryptionEngramId.RedWarChest]: {
    id: EAdvancedDecryptionEngramId.RedWarChest,
    name: "Red War Chest Decryption",
    expansionId: EExpansionId.RedWar,
    armorSlotIdList: [EArmorSlotId.Chest],
    order: 1,
    icon: "https://www.bungie.net/common/destiny2_content/icons/77f7f3b69ce1701fc207427c809ff352.png",
  },
  [EAdvancedDecryptionEngramId.RedWarArms]: {
    id: EAdvancedDecryptionEngramId.RedWarArms,
    name: "Red War Arms Decryption",
    expansionId: EExpansionId.RedWar,
    armorSlotIdList: [EArmorSlotId.Arms],
    order: 2,
    icon: "https://www.bungie.net/common/destiny2_content/icons/2e52d360e879e9b72278767906980107.png",
  },

  [EAdvancedDecryptionEngramId.RedWarLeg]: {
    id: EAdvancedDecryptionEngramId.RedWarLeg,
    name: "Red War Leg Decryption",
    expansionId: EExpansionId.RedWar,
    armorSlotIdList: [EArmorSlotId.Leg],
    order: 3,
    icon: "https://www.bungie.net/common/destiny2_content/icons/57900c1f0c53562d23840b7828fee9eb.png",
  },
  [EAdvancedDecryptionEngramId.Forsaken]: {
    id: EAdvancedDecryptionEngramId.Forsaken,
    name: "Forsaken Armor Decryption",
    expansionId: EExpansionId.Forsaken,
    armorSlotIdList: allArmorSlots,
    order: 4,
    icon: "https://www.bungie.net/common/destiny2_content/icons/c12cbc8bd224756c9ae0b14a52c6cadd.png",
  },
  [EAdvancedDecryptionEngramId.Shadowkeep]: {
    id: EAdvancedDecryptionEngramId.Shadowkeep,
    name: "Shadowkeep Armor Decryption",
    expansionId: EExpansionId.Shadowkeep,
    armorSlotIdList: allArmorSlots,
    order: 5,
    icon: "https://www.bungie.net/common/destiny2_content/icons/2aa072577cdfa27431804321e0530ccf.png",
  },
  [EAdvancedDecryptionEngramId.BeyondLight]: {
    id: EAdvancedDecryptionEngramId.BeyondLight,
    name: "Beyond Light Armor Decryption",
    expansionId: EExpansionId.BeyondLight,
    armorSlotIdList: allArmorSlots,
    order: 6,
    icon: "https://www.bungie.net/common/destiny2_content/icons/4a285e8c81ee5d3315fb2640eb8d751c.png",
  },
  [EAdvancedDecryptionEngramId.WitchQueen]: {
    id: EAdvancedDecryptionEngramId.WitchQueen,
    name: "Witch Queen Armor Decryption",
    expansionId: EExpansionId.WitchQueen,
    armorSlotIdList: allArmorSlots,
    order: 7,
    icon: "https://www.bungie.net/common/destiny2_content/icons/ba6479c4d76469dc1a1b50b0286b2d2f.png",
  },
  [EAdvancedDecryptionEngramId.Lightfall]: {
    id: EAdvancedDecryptionEngramId.Lightfall,
    name: "Lightfall Armor Decryption",
    expansionId: EExpansionId.Lightfall,
    armorSlotIdList: allArmorSlots,
    order: 8,
    icon: "https://www.bungie.net/common/destiny2_content/icons/4de4f34813fdbc2c0f87f12d788d5c61.png",
  },
};

export const getAdvancedDecryptionEngramById = (
  id: EAdvancedDecryptionEngramId
) => {
  return AdvancedDecryptionEngramIdToAdvancedDecryptionEngramMapping[id];
};

export const getAdvancedDecryptionEngramsByExpansionId = (
  expansionId: EExpansionId
) => {
  return Object.values(
    AdvancedDecryptionEngramIdToAdvancedDecryptionEngramMapping
  ).filter(
    (advancedDecryptionEngram) =>
      advancedDecryptionEngram.expansionId === expansionId
  );
};

export const getAdvancedDecryptionEngram = (
  seasonHash: number,
  armorSlotId: EArmorSlotId
): AdvancedDecryptionEngram | undefined => {
  const expansion = getExpansionBySeasonHash(seasonHash);
  if (!expansion) {
    return undefined;
  }
  const engrams = getAdvancedDecryptionEngramsByExpansionId(expansion.id);
  if (!engrams) {
    return undefined;
  }
  return engrams.find((x) => x.armorSlotIdList.includes(armorSlotId));
};
