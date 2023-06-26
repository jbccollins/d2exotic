import { ValidateEnumList } from "@d2e/globals";
import { EArmorSlotId } from "./IdEnums";

export type ArmorSlot = {
  id: EArmorSlotId;
  itemCategoryHash: number;
  order: number;
  name: string;
};

const ArmorSlotIdToArmorSlotMapping: Record<EArmorSlotId, ArmorSlot> = {
  [EArmorSlotId.Helm]: {
    id: EArmorSlotId.Helm,
    itemCategoryHash: 45,
    order: 0,
    name: "Helm",
  },
  [EArmorSlotId.Arms]: {
    id: EArmorSlotId.Arms,
    itemCategoryHash: 46,
    order: 1,
    name: "Arms",
  },
  [EArmorSlotId.Chest]: {
    id: EArmorSlotId.Chest,
    itemCategoryHash: 47,
    order: 2,
    name: "Chest",
  },
  [EArmorSlotId.Leg]: {
    id: EArmorSlotId.Leg,
    itemCategoryHash: 48,
    order: 3,
    name: "Leg",
  },
  [EArmorSlotId.ClassItem]: {
    id: EArmorSlotId.ClassItem,
    itemCategoryHash: 49,
    order: 4,
    name: "Class Item",
  },
};

export const validArmorSlotItemCategoryHashes = Object.values(
  ArmorSlotIdToArmorSlotMapping
).map(({ itemCategoryHash }) => itemCategoryHash);

export const getArmorSlot = (key: EArmorSlotId) =>
  ArmorSlotIdToArmorSlotMapping[key];

export const ArmorSlotIdList = ValidateEnumList(Object.values(EArmorSlotId), [
  EArmorSlotId.Helm,
  EArmorSlotId.Arms,
  EArmorSlotId.Chest,
  EArmorSlotId.Leg,
  EArmorSlotId.ClassItem,
]);

export const getArmorSlotByItemCategoryHash = (
  itemCategoryHash: number
): ArmorSlot => {
  return (
    Object.values(ArmorSlotIdToArmorSlotMapping).find(
      ({ itemCategoryHash: hash }) => hash === itemCategoryHash
    ) ?? getArmorSlot(EArmorSlotId.Helm)
  );
};
