import { SeasonIdToSeasonMapping } from "@d2e/generation/Season/generated/mapping";

export type Season = {
  hash: number;
  name: string;
  number: number;
  startDate?: string;
  endDate?: string;
  icon?: string;
  backgroundImage?: string;
  description?: string;
};

export const RED_WAR_ICON_WATERMARK_URL =
  "https://www.bungie.net/common/destiny2_content/icons/fb50cd68a9850bd323872be4f6be115c.png";

const SeasonHashToArmorIconWatermarkIdMapping: Record<number, string | null> = {
  965757574: "fb50cd68a9850bd323872be4f6be115c", /// 1, Red War (D2 Launch)
  2973407602: "2c024f088557ca6cceae1e8030c67169", // 2, Curse of Osiris
  4033618594: "ed6c4762c48bd132d538ced83c1699a6", // 3, Resurgence
  2026773320: "1b6c8b94cec61ea42edb1e2cb6b45a31", // 4, Season of the Outlaw (Forsaken Launch)
  2236269318: "c23c9ec8709fecad87c26b64f5b2b9f5", // 5, Season of the Forge // No exotics
  2891088360: "1448dde4efdb57b07f5473f87c4fccd7", // 6, Season of the Drifter
  4275747712: "5364cc3900dc3615cb0c4b03c6221942", // 7, Season of Opulence
  1743682818: "2352f9d04dc842cfcdda77636335ded9", // 8, Season of the Undying (Shadowkeep Launch)
  1743682819: "3ba38a2b9538bde2b45ec9313681d617", // 9, Season of Dawn
  2809059425: "b12630659223b53634e9f97c0a0a8305", // 10, Season of the Worthy
  2809059424: "4c25426263cacf963777cd4988340838", // 11, Season of Arrivals // No exotics
  2809059427: "9e0f43538efe9f8d04546b4b0af6cc43", // 12, Season of the Hunt (Beyond Light Launch)
  2809059426: "5ac4a1d48a5221993a41a5bb524eda1b", // 13, Season of the Chosen
  2809059429: "23968435c2095c0f8119d82ee222c672", // 14, Season of the Splicer
  2809059428: "d92e077d544925c4f37e564158f8f76a", // 15, Season of the Lost
  2809059431: "b973f89ecd631a3e3d294e98268f7134", // 16, Season of the Risen (Witch Queen Launch)
  2809059430: "ab075a3679d69f40b8c2a319635d60a9", // 17, Season of the Haunted
  2809059433: "a3923ae7d2376a1c4eb0f1f154da7565", // 18, Season of the Plunder
  2809059432: "e775dcb3d47e3d54e0e24fbdb64b5763", // 19, Season of the Seraph // No exotics
  2758726568: "af00bdcd3e3b89e6e85c1f63ebc0b4e4", // 20, Season of Defiance
  2758726569: "6026e9d64e8c2b19f302dafb0286897b", // 21, Season of the Deep (Lightfall Launch)
  // 2758726570: null, // 22, Season of Redacted
  // 2758726571: null, // 23, Season of Redacted
};

export const getIconWatermarkIdFromSeasonHash = (seasonHash: number) => {
  return SeasonHashToArmorIconWatermarkIdMapping[seasonHash] ?? null;
};

function reverseRecord(input: Record<any, any>) {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [value, key])
  );
}

const ArmorIconWatermarkIdToSeasonHashMapping = reverseRecord(
  SeasonHashToArmorIconWatermarkIdMapping
);

export const getSeasonHashFromIconWatermarkId = (
  iconWatermarkId: string | null
) => {
  if (!iconWatermarkId) return 965757574; // Default to Red War
  return (
    Number(ArmorIconWatermarkIdToSeasonHashMapping[iconWatermarkId]) ??
    undefined
  );
};

export const extractArmorIconWatermarkIdFromUrl = (url: string | undefined) => {
  if (!url) return null;
  const match = url.match(/icons\/([a-f0-9]+)\./);
  if (match) {
    return match[1];
  }
  return null;
};

export const getIconWatermarkUrlFromId = (id: string | null) => {
  if (!id) return null;
  return `https://www.bungie.net/common/destiny2_content/icons/${id}.png`;
};

export const getSeason = (hash: number): Season => {
  return SeasonIdToSeasonMapping[hash];
};
