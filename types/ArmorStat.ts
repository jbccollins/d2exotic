import { ValidateEnumList } from "@d2e/globals";
import { EArmorStatId } from "@d2e/types/IdEnums";

export const ArmorStatIdList = ValidateEnumList(Object.values(EArmorStatId), [
  EArmorStatId.Mobility,
  EArmorStatId.Resilience,
  EArmorStatId.Recovery,
  EArmorStatId.Discipline,
  EArmorStatId.Intellect,
  EArmorStatId.Strength,
]);

export enum EArmorStatGroup {
  A = "A",
  B = "B",
}

export type ArmorStat = {
  name: string;
  shortName: string;
  icon: string;
  hash: number;
  id: EArmorStatId;
  index: number;
  group: EArmorStatGroup;
};

const ArmorStatIdToArmorStatMapping: Record<EArmorStatId, ArmorStat> = {
  [EArmorStatId.Mobility]: {
    id: EArmorStatId.Mobility,
    name: "Mobility",
    shortName: "Mob",
    icon: "https://www.bungie.net/common/destiny2_content/icons/e26e0e93a9daf4fdd21bf64eb9246340.png",
    hash: 2996146975,
    index: 0,
    group: EArmorStatGroup.A,
  },
  [EArmorStatId.Resilience]: {
    id: EArmorStatId.Resilience,
    name: "Resilience",
    shortName: "Res",
    icon: "https://www.bungie.net/common/destiny2_content/icons/202ecc1c6febeb6b97dafc856e863140.png",
    hash: 392767087,
    index: 1,
    group: EArmorStatGroup.A,
  },
  [EArmorStatId.Recovery]: {
    id: EArmorStatId.Recovery,
    name: "Recovery",
    shortName: "Rec",
    icon: "https://www.bungie.net/common/destiny2_content/icons/128eee4ee7fc127851ab32eac6ca91cf.png",
    hash: 1943323491,
    index: 2,
    group: EArmorStatGroup.A,
  },
  [EArmorStatId.Discipline]: {
    id: EArmorStatId.Discipline,
    name: "Discipline",
    shortName: "Dis",
    icon: "https://www.bungie.net/common/destiny2_content/icons/79be2d4adef6a19203f7385e5c63b45b.png",
    hash: 1735777505,
    index: 3,
    group: EArmorStatGroup.B,
  },
  [EArmorStatId.Intellect]: {
    id: EArmorStatId.Intellect,
    name: "Intellect",
    shortName: "Int",
    icon: "https://www.bungie.net/common/destiny2_content/icons/d1c154469670e9a592c9d4cbdcae5764.png",
    hash: 144602215,
    index: 4,
    group: EArmorStatGroup.B,
  },
  [EArmorStatId.Strength]: {
    id: EArmorStatId.Strength,
    name: "Strength",
    shortName: "Str",
    icon: "https://www.bungie.net/common/destiny2_content/icons/ea5af04ccd6a3470a44fd7bb0f66e2f7.png",
    hash: 4244567218,
    index: 5,
    group: EArmorStatGroup.B,
  },
};

// export const ArmorStatIdToArmorStat: Mapping<EArmorStatId, IArmorStat> = {
// 	get: (key: EArmorStatId) => ArmorStatIdToArmorStatMapping[key],
// };
export const getArmorStat = (id: EArmorStatId): ArmorStat =>
  ArmorStatIdToArmorStatMapping[id];

// This should only be used by generation. If it's needed somewhere else then refactor this
export const getArmorStatIdFromBungieHash = (
  hash: number
): EArmorStatId | null => {
  const armorStatId = ArmorStatIdList.find(
    (id) => getArmorStat(id).hash === hash
  );
  return armorStatId ?? null;
};
