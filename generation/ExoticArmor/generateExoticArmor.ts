/*
USAGE: From the root directory run "npm run generate"
*/
import { getDefinitions } from "@d2e/generation/utils";
import {
  getArmorSlotByItemCategoryHash,
  validArmorSlotItemCategoryHashes,
} from "@d2e/types/ArmorSlot";
import {
  getDestinyClassByItemCategoryHash,
  validDestinyClassItemCategoryHashes,
} from "@d2e/types/DestinyClass";
import { ExoticArmor } from "@d2e/types/ExoticArmor";
import {
  extractArmorIconWatermarkIdFromUrl,
  getSeasonHashFromIconWatermarkId,
} from "@d2e/types/Season";
import { bungieNetPath } from "@d2e/utils";
import {
  DestinyCollectibleDefinition,
  DestinyInventoryItemDefinition,
  DestinySandboxPerkDefinition,
  DestinySeasonDefinition,
} from "bungie-api-ts/destiny2";
import { promises as fs } from "fs";
import lodash from "lodash";
import path from "path";
import { generateExoticArmorMapping } from "./generateExoticArmorMapping";
import { getIntrinsicAttributes } from "./staticMetadata";

const buildExoticArmorData = (
  item: DestinyInventoryItemDefinition,
  sandboxPerkDefinitions: Record<number, DestinySandboxPerkDefinition>,
  inventoryItemDefinitions: Record<number, DestinyInventoryItemDefinition>,
  worldDropExoticHashes: number[],
  mostRecentSeasonHash: number
): ExoticArmor => {
  const iconWatermarkId = extractArmorIconWatermarkIdFromUrl(
    item.iconWatermark
  );

  const armorSlotItemCategoryHash = item.itemCategoryHashes
    ? item.itemCategoryHashes.filter((x) =>
        validArmorSlotItemCategoryHashes.includes(x)
      )[0]
    : 0;
  if (armorSlotItemCategoryHash === 0) {
    throw new Error(
      `Item ${item.displayProperties.name} has no valid armorSlotItemCategoryHash`
    );
  }

  const destinyClassItemCategoryHash = item.itemCategoryHashes
    ? item.itemCategoryHashes.filter((x) =>
        validDestinyClassItemCategoryHashes.includes(x)
      )[0]
    : 0;
  if (destinyClassItemCategoryHash === 0) {
    throw new Error(
      `Item ${item.displayProperties.name} has no valid destinyClassItemCategoryHash`
    );
  }

  const exoticPerkSocket = item.sockets?.socketEntries.find(
    (x) => x.socketTypeHash === 965959289
  );
  const exoticPerkHash = exoticPerkSocket
    ? exoticPerkSocket.singleInitialItemHash
    : null;

  let exoticPerk = null;
  if (exoticPerkHash !== null) {
    exoticPerk = inventoryItemDefinitions[exoticPerkHash];
  }
  // const exoticPerkHash = item.sockets?.find((socket) => {
  //   return socket.socketDefinition.socketTypeHash === 965959289;
  // })?.socketDefinition?.singleInitialItemHash;

  const seasonHash = getSeasonHashFromIconWatermarkId(iconWatermarkId);
  const intrinsicAttributes = getIntrinsicAttributes(item.hash) ?? {};
  const res = {
    name: item.displayProperties.name,
    hash: item.hash,
    armorSlotId: getArmorSlotByItemCategoryHash(armorSlotItemCategoryHash).id,
    isWorldDrop: item.collectibleHash
      ? worldDropExoticHashes.includes(item.collectibleHash)
      : false,
    seasonHash,
    icon: bungieNetPath(item.displayProperties.icon),
    destinyClassId: getDestinyClassByItemCategoryHash(
      destinyClassItemCategoryHash
    ).id,
    isFocusable: seasonHash !== mostRecentSeasonHash,
    exoticArmorPerk: exoticPerk
      ? {
          name: exoticPerk.displayProperties.name,
          description: exoticPerk.displayProperties.description,
          icon: bungieNetPath(exoticPerk.displayProperties.icon),
          hash: exoticPerkHash as number,
        }
      : null,
    ...intrinsicAttributes,
  };
  return res;
};

export async function run() {
  const {
    DestinyInventoryItemDefinition: destinyInventoryItemDefinitions,
    DestinySandboxPerkDefinition: destinySandboxPerkDefinitions,
    DestinyCollectibleDefinition: destinyCollectibleDefinitions,
    DestinySeasonDefinition: destinySeasonDefinitions,
  } = await getDefinitions();

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
  console.log("Finding exoticArmorItems");
  const exoticArmorItems: ExoticArmor[] = [];

  const allExoticArmorItems = lodash(inventoryItemDefinitions)
    .values()
    .filter((v) => v.itemType === 2) // Is armor
    .filter((v) => v.collectibleHash !== undefined) // Is in collections
    .filter((v) => v.inventory?.tierType === 6) // Is exotic
    // .filter((v) => v.seasonHash !== undefined) // Is armor
    .value();

  allExoticArmorItems.forEach((exoticArmorItem) => {
    exoticArmorItems.push(
      buildExoticArmorData(
        exoticArmorItem,
        sandboxPerkDefinitions,
        inventoryItemDefinitions,
        worldDropExoticHashes,
        mostRecentSeasonHash
      )
    );
  });

  const exoticArmorFilePath = [".", "generation", "ExoticArmor", "generated"];

  const exoticArmorMappingGeneratedPath = path.join(
    ...[...exoticArmorFilePath, "mapping.ts"]
  );
  const exoticArmorMappingExportString =
    generateExoticArmorMapping(exoticArmorItems);

  console.log("Writing to file: ", exoticArmorMappingGeneratedPath);
  await fs.writeFile(
    path.resolve(exoticArmorMappingGeneratedPath),
    exoticArmorMappingExportString
  );
}
