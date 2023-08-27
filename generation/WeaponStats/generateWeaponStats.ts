/*
USAGE: From the root directory run "npm run generate"
*/
import { getDefinitions } from "@d2e/generation/utils";
import { WeaponStat } from "@d2e/types/WeaponStat";
import { DestinyStatDefinition } from "bungie-api-ts/destiny2";
import { promises as fs } from "fs";
import lodash from "lodash";
import path from "path";
import { generateWeaponStatMapping } from "./generateWeaponStatsMapping";

const buildWeaponStatData = (item: DestinyStatDefinition): WeaponStat => {
  return {
    hash: item.hash,
    name: item.displayProperties.name,
  };
};

export async function run() {
  const { DestinyStatDefinition: destinyStatDefinitions } =
    await getDefinitions();
  const statDefinitions = destinyStatDefinitions as Record<
    number,
    DestinyStatDefinition
  >;

  console.log("Received definitions");
  console.log("Finding weaponStatItems");
  const weaponStatItems: WeaponStat[] = [];

  const allWeaponStatItems = lodash(statDefinitions)
    .values()
    .filter((item) => item.displayProperties.name !== "")
    .filter((item) => item.statCategory === 1)
    .value();

  allWeaponStatItems.forEach((weaponStatItem) => {
    weaponStatItems.push(buildWeaponStatData(weaponStatItem));
  });

  const weaponStatFilePath = [".", "generation", "WeaponStats", "generated"];

  const weaponStatMappingGeneratedPath = path.join(
    ...[...weaponStatFilePath, "mapping.ts"]
  );
  const weaponStatMappingExportString =
    generateWeaponStatMapping(weaponStatItems);

  console.log("Writing to file: ", weaponStatMappingGeneratedPath);
  await fs.writeFile(
    path.resolve(weaponStatMappingGeneratedPath),
    weaponStatMappingExportString
  );
}
