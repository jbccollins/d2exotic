/*
USAGE: From the root directory run "npm run generate"
*/
import { getDefinitions } from "@d2e/generation/utils";
import {
  ExoticWeapon,
  ExoticWeaponCatalyst,
  ExoticWeaponCatalystUpgradeMasterwork,
  WeaponIntrinsicTrait,
  WeaponPerk,
  WeaponStats,
} from "@d2e/types/ExoticWeapon";
import {
  RED_WAR_ICON_WATERMARK_URL,
  extractArmorIconWatermarkIdFromUrl,
  getSeasonHashFromIconWatermarkId,
} from "@d2e/types/Season";
import { bungieNetPath } from "@d2e/utils";
import {
  DestinyCollectibleDefinition,
  DestinyInventoryItemDefinition,
  DestinyItemSocketEntryDefinition,
  DestinySandboxPerkDefinition,
  DestinySeasonDefinition,
} from "bungie-api-ts/destiny2";
import fetch from "cross-fetch";
import { promises as fs } from "fs";
import lodash from "lodash";
import path from "path";
import { WeaponStatIdToWeaponStatMapping } from "../WeaponStats/generated/mapping";
import { generateExoticWeaponMapping } from "./generateExoticWeaponsMapping";

// This exists as a sanity check. There are many catalysts in the API that are not available in-game.
const fetchD2AIRawExoticToCatalystRecordJson = async (): Promise<
  Record<string, number>
> => {
  const response = await fetch(
    "https://raw.githubusercontent.com/DestinyItemManager/d2-additional-info/master/output/exotic-to-catalyst-record.json"
  );
  const json = await response.json();
  return json as Record<string, number>;
};

const WEAPON_MODS_SOCKET_CATEGORY_HASH = 2685412949;
const INTRINSIC_TRAITS_SOCKET_CATEGORY_HASH = 3956125808;
const WEAPON_PERKS_SOCKET_CATEGORY_HASH = 4241085061;

const buildCatalystPerks = (
  perks: {
    perkHash: number;
  }[],
  sandboxPerkDefinitions: Record<number, DestinySandboxPerkDefinition>
): WeaponPerk[] | null => {
  if (perks === undefined || perks.length === 0) {
    return null;
  }
  let weaponPerkList: WeaponPerk[] | null = null;
  perks.forEach((perk) => {
    const perkDefinition = sandboxPerkDefinitions[perk.perkHash];
    if (perkDefinition === undefined || !perkDefinition.isDisplayable) {
      return null;
    }
    if (weaponPerkList === null) {
      weaponPerkList = [];
    }
    weaponPerkList.push({
      hash: perk.perkHash,
      icon: bungieNetPath(perkDefinition.displayProperties.icon),
      name: perkDefinition.displayProperties.name,
      description: perkDefinition.displayProperties.description,
    });
  });
  return weaponPerkList;
};

const buildCatalystUpgradeMasterwork = (
  reusablePlugItems: {
    plugItemHash: number;
  }[],
  inventoryItemDefinitions: Record<number, DestinyInventoryItemDefinition>
): ExoticWeaponCatalystUpgradeMasterwork | null => {
  if (reusablePlugItems === undefined || reusablePlugItems.length < 2) {
    return null;
  }
  const upgradeMasterworkPlugItemHash = reusablePlugItems[1].plugItemHash;
  const item = inventoryItemDefinitions[upgradeMasterworkPlugItemHash];
  if (item === undefined) {
    return null;
  }
  const stats = item.investmentStats.map((investmentStat) => ({
    hash: investmentStat.statTypeHash,
    value: investmentStat.value,
  }));
  return {
    stats,
  };
};

const buildIntrinsicTraits = (
  item: DestinyInventoryItemDefinition,
  inventoryItemDefinitions: Record<number, DestinyInventoryItemDefinition>
): WeaponIntrinsicTrait[] | null => {
  const intrinsicTraitSocketEntryIndices = item.sockets?.socketCategories.find(
    (x) => x.socketCategoryHash === INTRINSIC_TRAITS_SOCKET_CATEGORY_HASH
  )?.socketIndexes;

  if (intrinsicTraitSocketEntryIndices === undefined) {
    return null;
  }

  let intrinsicTraits: WeaponIntrinsicTrait[] | null = null;

  intrinsicTraitSocketEntryIndices.forEach((intrinsicTraitSocketEntryIndex) => {
    const socketEntry =
      item.sockets?.socketEntries[intrinsicTraitSocketEntryIndex];
    if (
      socketEntry !== undefined &&
      socketEntry.socketTypeHash !== 0 &&
      socketEntry.singleInitialItemHash !== 0
    ) {
      const intrinsicTraitHash = socketEntry.singleInitialItemHash;
      if (intrinsicTraitHash === undefined) {
        return;
      }
      const intrinsicTraitItem = inventoryItemDefinitions[intrinsicTraitHash];
      if (intrinsicTraitItem === undefined) {
        return;
      }
      if (intrinsicTraits === null) {
        intrinsicTraits = [];
      }
      // TODO: The intrinsic trait has perks
      // These perks can have different descriptions. At least for Wolfpack Rounds.
      // Which is correct to use?
      const intrinsicTrait = {
        hash: intrinsicTraitItem.hash,
        icon: bungieNetPath(intrinsicTraitItem.displayProperties.icon),
        name: intrinsicTraitItem.displayProperties.name,
        description: intrinsicTraitItem.displayProperties.description,
      };
      intrinsicTraits.push(intrinsicTrait);
    }
  });
  return intrinsicTraits;
};

const buildWeaponPerks = (
  item: DestinyInventoryItemDefinition,
  inventoryItemDefinitions: Record<number, DestinyInventoryItemDefinition>
): WeaponIntrinsicTrait[] | null => {
  const weaponPerkSocketEntryIndices = item.sockets?.socketCategories.find(
    (x) => x.socketCategoryHash === WEAPON_PERKS_SOCKET_CATEGORY_HASH
  )?.socketIndexes;

  if (weaponPerkSocketEntryIndices === undefined) {
    return null;
  }

  let weaponPerks: WeaponPerk[] | null = null;

  weaponPerkSocketEntryIndices.forEach((weaponPerkSocketEntryIndex) => {
    const socketEntry = item.sockets?.socketEntries[weaponPerkSocketEntryIndex];
    if (
      socketEntry !== undefined &&
      socketEntry.socketTypeHash !== 0 &&
      socketEntry.singleInitialItemHash !== 0
    ) {
      const weaponPerkHash = socketEntry.singleInitialItemHash;
      if (weaponPerkHash === undefined) {
        return;
      }
      const weaponPerkItem = inventoryItemDefinitions[weaponPerkHash];
      if (weaponPerkItem === undefined) {
        return;
      }
      if (weaponPerks === null) {
        weaponPerks = [];
      }
      // TODO: The intrinsic trait has perks
      // These perks can have different descriptions. At least for Wolfpack Rounds.
      // Which is correct to use?
      const weaponPerk = {
        hash: weaponPerkItem.hash,
        icon: bungieNetPath(weaponPerkItem.displayProperties.icon),
        name: weaponPerkItem.displayProperties.name,
        description: weaponPerkItem.displayProperties.description,
      };
      weaponPerks.push(weaponPerk);
    }
  });
  return weaponPerks;
};

const buildCatalyst = (
  item: DestinyInventoryItemDefinition,
  inventoryItemDefinitions: Record<number, DestinyInventoryItemDefinition>,
  sandboxPerkDefinitions: Record<number, DestinySandboxPerkDefinition>
): ExoticWeaponCatalyst | null => {
  // Find the index of the socketEntries that holds info about the catalyst
  const catalystSocketEntryIndices = item.sockets?.socketCategories.find(
    (x) => x.socketCategoryHash === WEAPON_MODS_SOCKET_CATEGORY_HASH
  )?.socketIndexes;
  // If the catalystSocketEntryIndex is undefined, then the weapon does not have a catalyst
  if (catalystSocketEntryIndices === undefined) {
    return null;
  }

  // Find the first socketEntryIndex that could be a catalyst
  let catalystSocketEntry: DestinyItemSocketEntryDefinition | null = null;
  for (let catalystSocketEntryIndex of catalystSocketEntryIndices) {
    const socketEntry = item.sockets?.socketEntries[catalystSocketEntryIndex];
    if (
      socketEntry !== undefined &&
      socketEntry.socketTypeHash !== 0 &&
      socketEntry.singleInitialItemHash !== 0 &&
      socketEntry.reusablePlugItems.length > 0
    ) {
      catalystSocketEntry = socketEntry;
      break;
    }
  }

  // If the catalystSocketEntry is undefined, then the weapon does not have a catalyst
  if (!catalystSocketEntry) {
    return null;
  }
  catalystSocketEntry = catalystSocketEntry as DestinyItemSocketEntryDefinition;
  // Find the plug hash of the catalyst
  const catalystPlugItemHash =
    catalystSocketEntry.reusablePlugItems[0].plugItemHash;
  if (catalystPlugItemHash === undefined) {
    return null;
  }
  // Find the catalyst item definition
  const catalystItemDefinition = inventoryItemDefinitions[catalystPlugItemHash];
  if (catalystItemDefinition === undefined) {
    return null;
  }
  const catalyst: ExoticWeaponCatalyst = {
    name: catalystItemDefinition.displayProperties.name,
    hash: catalystItemDefinition.hash,
    icon: bungieNetPath(catalystItemDefinition.displayProperties.icon),
  };

  const upgradeMasterwork = buildCatalystUpgradeMasterwork(
    catalystSocketEntry.reusablePlugItems,
    inventoryItemDefinitions
  );
  if (upgradeMasterwork !== null) {
    catalyst.upgradeMasterwork = upgradeMasterwork;
  }

  let stats: WeaponStats[] | undefined = undefined;
  if (
    catalystItemDefinition.investmentStats !== undefined &&
    catalystItemDefinition.investmentStats.length > 0
  ) {
    stats = catalystItemDefinition.investmentStats.map((investmentStat) => ({
      hash: investmentStat.statTypeHash,
      value: investmentStat.value,
    }));
  }
  if (stats !== undefined) {
    catalyst.stats = stats;
  }

  const catalystPerks = buildCatalystPerks(
    catalystItemDefinition.perks,
    sandboxPerkDefinitions
  );
  if (catalystPerks !== null) {
    catalyst.perks = catalystPerks;
  }

  return catalyst;
};

const buildWeaponStats = (
  item: DestinyInventoryItemDefinition
): WeaponStats[] | null => {
  if (item.investmentStats === undefined || item.investmentStats.length === 0) {
    return null;
  }
  const weaponStats: WeaponStats[] = [];
  item.investmentStats
    .filter(
      (x) => WeaponStatIdToWeaponStatMapping[x.statTypeHash] !== undefined
    )
    .forEach((investmentStat) => {
      weaponStats.push({
        hash: investmentStat.statTypeHash,
        value: investmentStat.value,
      });
    });
  return weaponStats;
};

const buildExoticWeaponData = (
  item: DestinyInventoryItemDefinition,
  sandboxPerkDefinitions: Record<number, DestinySandboxPerkDefinition>,
  inventoryItemDefinitions: Record<number, DestinyInventoryItemDefinition>,
  rawExoticToCatalystRecord: Record<string, number>
): ExoticWeapon => {
  if (item.displayProperties.name === "Duality") {
    console.log("Fourth Horseman");
  }
  const iconWatermarkId = extractArmorIconWatermarkIdFromUrl(
    item.iconWatermark
  );
  const seasonHash = getSeasonHashFromIconWatermarkId(iconWatermarkId);

  // Gally
  if (item.hash === 1363886209) {
    console.log("Gally");
  }
  const exoticWeapon: ExoticWeapon = {
    name: item.displayProperties.name,
    hash: item.hash,
    icon: bungieNetPath(item.displayProperties.icon),
    iconWatermark: item.iconWatermark
      ? bungieNetPath(item.iconWatermark)
      : RED_WAR_ICON_WATERMARK_URL,
    seasonHash,
    stats: buildWeaponStats(item) ?? [],
  };
  const catalystHash = rawExoticToCatalystRecord[item.hash.toString()];
  const catalyst = catalystHash
    ? buildCatalyst(item, inventoryItemDefinitions, sandboxPerkDefinitions)
    : null;
  if (catalyst !== null) {
    exoticWeapon.catalyst = catalyst;
  }
  const intrinsicTraits = buildIntrinsicTraits(item, inventoryItemDefinitions);

  if (intrinsicTraits !== null) {
    exoticWeapon.intrinsicTraits = intrinsicTraits;
  }

  const weaponPerks = buildWeaponPerks(item, inventoryItemDefinitions);
  if (weaponPerks !== null) {
    exoticWeapon.perks = weaponPerks;
  }

  return exoticWeapon;
};

export async function run() {
  const {
    DestinyInventoryItemDefinition: destinyInventoryItemDefinitions,
    DestinySandboxPerkDefinition: destinySandboxPerkDefinitions,
    DestinyCollectibleDefinition: destinyCollectibleDefinitions,
    DestinySeasonDefinition: destinySeasonDefinitions,
    DestinyPlugSetDefinition: destinyPlugSetDefinitions,
  } = await getDefinitions();

  const rawExoticToCatalystRecord =
    await fetchD2AIRawExoticToCatalystRecordJson();

  const inventoryItemDefinitions = destinyInventoryItemDefinitions as Record<
    number,
    DestinyInventoryItemDefinition
  >;

  const sandboxPerkDefinitions = destinySandboxPerkDefinitions as Record<
    number,
    DestinySandboxPerkDefinition
  >;

  const collectibleDefinitions = destinyCollectibleDefinitions as Record<
    number,
    DestinyCollectibleDefinition
  >;

  const seasonDefinitions = destinySeasonDefinitions as Record<
    number,
    DestinySeasonDefinition
  >;

  const seasons = lodash(seasonDefinitions)
    .values()
    .value()
    .filter((x) => !x.displayProperties.name.toLowerCase().includes("redacted"))
    .sort((a, b) => a.seasonNumber - b.seasonNumber);

  // Most recent season is not focusable
  const mostRecentSeasonHash = seasons[seasons.length - 1].hash;

  // World drop exotics. This includes exotic weapons
  const worldDropExotics = lodash(collectibleDefinitions)
    .values()
    .filter((v) => v.sourceHash === 1563875874)
    .value();

  const worldDropExoticHashes = worldDropExotics.map((v) => v.hash);

  console.log("Received definitions");
  console.log("Finding exoticWeaponItems");
  const exoticWeaponItems: ExoticWeapon[] = [];

  const allExoticWeaponItems = lodash(inventoryItemDefinitions)
    .values()
    .filter((v) => v.itemType === 3) // Is weapon
    .filter((v) => v.collectibleHash !== undefined) // Is in collections
    .filter((v) => v.inventory?.tierType === 6) // Is exotic
    .value();

  allExoticWeaponItems.forEach((exoticWeaponItem) => {
    exoticWeaponItems.push(
      buildExoticWeaponData(
        exoticWeaponItem,
        sandboxPerkDefinitions,
        inventoryItemDefinitions,
        rawExoticToCatalystRecord
      )
    );
  });

  const exoticWeaponFilePath = [
    ".",
    "generation",
    "ExoticWeapons",
    "generated",
  ];

  const exoticWeaponMappingGeneratedPath = path.join(
    ...[...exoticWeaponFilePath, "mapping.ts"]
  );
  const exoticWeaponMappingExportString =
    generateExoticWeaponMapping(exoticWeaponItems);

  console.log("Writing to file: ", exoticWeaponMappingGeneratedPath);
  await fs.writeFile(
    path.resolve(exoticWeaponMappingGeneratedPath),
    exoticWeaponMappingExportString
  );
}
