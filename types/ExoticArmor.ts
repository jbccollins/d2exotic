import { ExoticArmorHashToExoticArmorMapping } from "@d2e/generation/ExoticArmor/generated/mapping";
import { getAdvancedDecryptionEngram } from "./AdvancedDecryptionEngram";
import { getExpansion } from "./Expansion";
import {
  EAdvancedDecryptionEngramId,
  EArmorSlotId,
  EDestinyClassId,
} from "./IdEnums";

export type ExoticArmor = {
  name: string;
  hash: number;
  armorSlotId: EArmorSlotId;
  isWorldDrop: boolean;
  seasonHash: number;
  icon: string;
  destinyClassId: EDestinyClassId;
};

const getDefaultDestinyClassValue = (): Record<
  EArmorSlotId,
  ExoticArmor[]
> => ({
  [EArmorSlotId.Helm]: [],
  [EArmorSlotId.Arms]: [],
  [EArmorSlotId.Chest]: [],
  [EArmorSlotId.Leg]: [],
  [EArmorSlotId.ClassItem]: [],
});

export const getExoticsByAdvancedDecryptionEngramId = (
  advancedDecryptionEngramId: EAdvancedDecryptionEngramId
): Record<EDestinyClassId, Record<EArmorSlotId, ExoticArmor[]>> => {
  const result: Record<EDestinyClassId, Record<EArmorSlotId, ExoticArmor[]>> = {
    [EDestinyClassId.Hunter]: getDefaultDestinyClassValue(),
    [EDestinyClassId.Titan]: getDefaultDestinyClassValue(),
    [EDestinyClassId.Warlock]: getDefaultDestinyClassValue(),
  };

  const advancedDecryptionEngram = getAdvancedDecryptionEngram(
    advancedDecryptionEngramId
  );
  const expansionId = advancedDecryptionEngram.expansionId;
  const seasonHashList = getExpansion(expansionId).seasonHashList;
  Object.values(ExoticArmorHashToExoticArmorMapping).forEach(
    (exoticArmorItem) => {
      if (
        seasonHashList.includes(exoticArmorItem.seasonHash) &&
        advancedDecryptionEngram.armorSlotIdList.includes(
          exoticArmorItem.armorSlotId
        )
      ) {
        result[exoticArmorItem.destinyClassId][
          exoticArmorItem.armorSlotId
        ].push(exoticArmorItem);
      }
    }
  );
  return result;
};