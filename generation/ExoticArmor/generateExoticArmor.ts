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
} from "bungie-api-ts/destiny2";
import { promises as fs } from "fs";
import lodash from "lodash";
import path from "path";
import { generateExoticArmorMapping } from "./generateExoticArmorMapping";

const buildExoticArmorData = (
  item: DestinyInventoryItemDefinition,
  sandboxPerkDefinitions: Record<number, DestinySandboxPerkDefinition>,
  worldDropExoticHashes: number[]
): ExoticArmor => {
  const iconWatermarkId = extractArmorIconWatermarkIdFromUrl(
    item.iconWatermark
  );
  if (item.displayProperties.name === "Transversive Steps") {
    console.log(item.seasonHash);
  }

  const derp = [22, 47, 20];
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
  return {
    name: item.displayProperties.name,
    hash: item.hash,
    armorSlotId: getArmorSlotByItemCategoryHash(armorSlotItemCategoryHash).id,
    isWorldDrop: item.collectibleHash
      ? worldDropExoticHashes.includes(item.collectibleHash)
      : false,
    seasonHash: getSeasonHashFromIconWatermarkId(iconWatermarkId),
    icon: bungieNetPath(item.displayProperties.icon),
    destinyClassId: getDestinyClassByItemCategoryHash(
      destinyClassItemCategoryHash
    ).id,
  };
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
        worldDropExoticHashes
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
