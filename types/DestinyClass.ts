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
    icon: "https://raw.githubusercontent.com/justrealmilk/destiny-icons/2e747b9ab94cea9423a001710c35af35c79ff625/general/class_hunter_outline.svg",
  },
  [EDestinyClassId.Titan]: {
    id: EDestinyClassId.Titan,
    name: "Titan",
    itemCategoryHash: 22,
    icon: "https://raw.githubusercontent.com/justrealmilk/destiny-icons/2e747b9ab94cea9423a001710c35af35c79ff625/general/class_titan_outline.svg",
  },
  [EDestinyClassId.Warlock]: {
    id: EDestinyClassId.Warlock,
    name: "Warlock",
    itemCategoryHash: 21,
    icon: "https://raw.githubusercontent.com/justrealmilk/destiny-icons/2e747b9ab94cea9423a001710c35af35c79ff625/general/class_warlock_outline.svg",
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
