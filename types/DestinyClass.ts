import { EDestinyClassId } from "./IdEnums";

export type DestinyClass = {
  id: EDestinyClassId;
  name: string;
  icon?: string;
  itemCategoryHash: number;
};

const DestinyClassIdToDestinyClassMapping: Record<
  EDestinyClassId,
  DestinyClass
> = {
  [EDestinyClassId.Hunter]: {
    id: EDestinyClassId.Hunter,
    name: "Hunter",
    itemCategoryHash: 23,
  },
  [EDestinyClassId.Titan]: {
    id: EDestinyClassId.Titan,
    name: "Titan",
    itemCategoryHash: 22,
  },
  [EDestinyClassId.Warlock]: {
    id: EDestinyClassId.Warlock,
    name: "Warlock",
    itemCategoryHash: 21,
  },
};

export const DestinyClassIdList = [
  EDestinyClassId.Hunter,
  EDestinyClassId.Titan,
  EDestinyClassId.Warlock,
];

export const getDestinyClass = (key: EDestinyClassId) => {
  return DestinyClassIdToDestinyClassMapping[key];
};

export const getDestinyClassByItemCategoryHash = (
  itemCategoryHash: number
): DestinyClass => {
  return (
    Object.values(DestinyClassIdToDestinyClassMapping).find(
      ({ itemCategoryHash: hash }) => hash === itemCategoryHash
    ) ?? getDestinyClass(EDestinyClassId.Hunter)
  );
};

export const validDestinyClassItemCategoryHashes = Object.values(
  DestinyClassIdToDestinyClassMapping
).map(({ itemCategoryHash }) => itemCategoryHash);
