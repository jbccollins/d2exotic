import { ExoticArmorHashToExoticArmorMapping } from "@d2e/generation/ExoticArmor/generated/mapping";
import { IntrinsicAttributes } from "@d2e/generation/ExoticArmor/staticMetadata";
import { getAdvancedDecryptionEngramById } from "./AdvancedDecryptionEngram";
import { ArmorSlotIdList } from "./ArmorSlot";
import { DestinyClassIdList } from "./DestinyClass";
import { getExpansion } from "./Expansion";
import {
  EAdvancedDecryptionEngramId,
  EArmorSlotId,
  EDestinyClassId,
  EExpansionId,
} from "./IdEnums";

export type ExoticArmor = {
  name: string;
  hash: number;
  armorSlotId: EArmorSlotId;
  isWorldDrop: boolean;
  seasonHash: number;
  icon: string;
  destinyClassId: EDestinyClassId;
  isFocusable: boolean;
  expansionIdCampaignCompletionRequired?: EExpansionId;
} & IntrinsicAttributes;

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

  const advancedDecryptionEngram = getAdvancedDecryptionEngramById(
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

export const getExotics = (): Record<
  EDestinyClassId,
  Record<EArmorSlotId, ExoticArmor[]>
> => {
  const result: Record<EDestinyClassId, Record<EArmorSlotId, ExoticArmor[]>> = {
    [EDestinyClassId.Hunter]: getDefaultDestinyClassValue(),
    [EDestinyClassId.Titan]: getDefaultDestinyClassValue(),
    [EDestinyClassId.Warlock]: getDefaultDestinyClassValue(),
  };
  Object.values(ExoticArmorHashToExoticArmorMapping).forEach(
    (exoticArmorItem) => {
      result[exoticArmorItem.destinyClassId][exoticArmorItem.armorSlotId].push(
        exoticArmorItem
      );
    }
  );
  DestinyClassIdList.forEach((destinyClassId) => {
    ArmorSlotIdList.forEach((armorSlotId) => {
      result[destinyClassId][armorSlotId] = result[destinyClassId][
        armorSlotId
      ].sort((a, b) => a.name.localeCompare(b.name));
    });
  });
  return result;
};
