import { ExoticArmorHashToExoticArmorMapping } from "@d2e/generation/ExoticArmor/generated/mapping";
import { IntrinsicAttributes } from "@d2e/generation/ExoticArmor/staticMetadata";
import {
  AdvancedDecrpytionEngramIdList,
  getAdvancedDecryptionEngramById,
} from "./AdvancedDecryptionEngram";
import { ArmorSlotIdList } from "./ArmorSlot";
import { DestinyClassIdList, getDestinyClass } from "./DestinyClass";
import { getExpansion } from "./Expansion";
import { EGroupById } from "./GroupBy";
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

export type NestedGroup = {
  name: string;
  id: string;
  icon?: string;
  childGroups?: NestedGroup[];
  items?: ExoticArmor[];
};

const groupExoticsByAdvancedDecryptionId = (
  exoticArmorItems: ExoticArmor[]
): NestedGroup[] => {
  return AdvancedDecrpytionEngramIdList.map((advancedDecryptionEngramId) => {
    const advancedDecryptionEngram = getAdvancedDecryptionEngramById(
      advancedDecryptionEngramId
    );
    const expansionId = advancedDecryptionEngram.expansionId;
    const seasonHashList = getExpansion(expansionId).seasonHashList;
    const group1: NestedGroup = {
      name: advancedDecryptionEngram.name,
      icon: advancedDecryptionEngram.icon,
      id: advancedDecryptionEngram.id,
    };
    const _exoticArmorItems = exoticArmorItems.filter(
      (exoticArmorItem) =>
        seasonHashList.includes(exoticArmorItem.seasonHash) &&
        advancedDecryptionEngram.armorSlotIdList.includes(
          exoticArmorItem.armorSlotId
        )
    );

    const group1Children: NestedGroup[] = [];
    DestinyClassIdList.forEach((destinyClassId) => {
      const destinyClass = getDestinyClass(destinyClassId);
      const group2: NestedGroup = {
        name: destinyClass.name,
        icon: destinyClass.icon,
        id: destinyClass.id,
      };
      const items = _exoticArmorItems.filter(
        (exoticArmorItem) => exoticArmorItem.destinyClassId === destinyClassId
      );

      if (items.length > 0) {
        group2.items = items;
        group1Children.push(group2);
      }
    });
    if (group1Children.length === 0) {
      return null;
    }
    group1.childGroups = group1Children;
    return group1;
  }).filter((group) => group !== null) as NestedGroup[];
};

export const getExoticArmorNestedGroupList = (
  groupById: EGroupById,
  searchTerm: string
): NestedGroup[] => {
  const exoticArmorItems = getExoticArmorItemsFilteredBySearchTerm(searchTerm);
  switch (groupById) {
    case EGroupById.AdvancedDecryptionEngram:
      return groupExoticsByAdvancedDecryptionId(exoticArmorItems);
    default:
      return [];
  }
};

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

export function getExoticArmorItemsFilteredBySearchTerm(
  searchTerm: string
): ExoticArmor[] {
  return Object.values(ExoticArmorHashToExoticArmorMapping)
    .filter((exotic) =>
      exotic.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aArmorSlotId = a.armorSlotId;
      const bArmorSlotId = b.armorSlotId;
      const aArmorSlotIndex = ArmorSlotIdList.indexOf(aArmorSlotId);
      const bArmorSlotIndex = ArmorSlotIdList.indexOf(bArmorSlotId);
      return aArmorSlotIndex - bArmorSlotIndex ?? a.name.localeCompare(b.name);
    });
}
