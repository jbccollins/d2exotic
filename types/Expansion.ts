import { ValidateEnumList } from "@d2e/globals";
import { EExpansionId } from "./IdEnums";

export const ArmorStatIdList = ValidateEnumList(Object.values(EExpansionId), [
  EExpansionId.RedWar,
  EExpansionId.Forsaken,
  EExpansionId.Shadowkeep,
  EExpansionId.BeyondLight,
  EExpansionId.WitchQueen,
  EExpansionId.Lightfall,
  EExpansionId.FinalShape,
]);

export type Expansion = {
  id: EExpansionId;
  name: string;
  seasonHashList: number[];
  number: number;
  startDate?: string;
  endDate?: string;
  icon?: string;
  backgroundImage?: string;
  description?: string;
};

const ExpansionIdToExpansionMapping: Record<EExpansionId, Expansion> = {
  [EExpansionId.RedWar]: {
    id: EExpansionId.RedWar,
    name: "Red War",
    seasonHashList: [965757574, 2973407602, 4033618594],
    number: 0,
  },
  [EExpansionId.Forsaken]: {
    id: EExpansionId.Forsaken,
    name: "Forsaken",
    seasonHashList: [2026773320, 2236269318, 2891088360, 4275747712],
    number: 1,
  },
  [EExpansionId.Shadowkeep]: {
    id: EExpansionId.Shadowkeep,
    name: "Shadowkeep",
    seasonHashList: [1743682818, 1743682819, 2809059425, 2809059424],
    number: 2,
  },
  [EExpansionId.BeyondLight]: {
    id: EExpansionId.BeyondLight,
    name: "Beyond Light",
    seasonHashList: [2809059427, 2809059426, 2809059429, 2809059428],
    number: 3,
  },
  [EExpansionId.WitchQueen]: {
    id: EExpansionId.WitchQueen,
    name: "Witch Queen",
    seasonHashList: [2809059431, 2809059430, 2809059433, 2809059432],
    number: 4,
  },
  [EExpansionId.Lightfall]: {
    id: EExpansionId.Lightfall,
    name: "Lightfall",
    seasonHashList: [2758726568, 2758726569, 2758726570, 2758726571],
    number: 5,
  },
  [EExpansionId.FinalShape]: {
    id: EExpansionId.FinalShape,
    name: "The Final Shape",
    seasonHashList: [],
    number: 6,
  },
};

export const getExpansion = (id: EExpansionId): Expansion => {
  return ExpansionIdToExpansionMapping[id];
};

const getExpansionBySeasonHash = (
  seasonHash: number
): Expansion | undefined => {
  return Object.values(ExpansionIdToExpansionMapping).find((expansion) =>
    expansion.seasonHashList.includes(seasonHash)
  );
};
