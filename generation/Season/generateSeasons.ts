/*
USAGE: From the root directory run "npm run generate"
*/
import { getDefinitions } from "@d2e/generation/utils";
import { Season } from "@d2e/types/Season";
import { DestinySeasonDefinition } from "bungie-api-ts/destiny2";
import { promises as fs } from "fs";
import lodash from "lodash";
import path from "path";
import { generateSeasonMapping } from "./generateSeasonMapping";

const buildSeasonData = (item: DestinySeasonDefinition): Season => {
  return {
    name: item.displayProperties.name
      ? item.displayProperties.name
      : "The Red War",
    hash: item.hash,
    number: item.seasonNumber,
    startDate: item.startDate,
    endDate: item.endDate,
  };
};

export async function run() {
  const { DestinySeasonDefinition: destinySeasonDefinitions } =
    await getDefinitions();
  const seasonDefinitions = destinySeasonDefinitions as Record<
    number,
    DestinySeasonDefinition
  >;

  console.log("Received definitions");
  console.log("Finding seasonItems");
  const seasonItems: Season[] = [];

  const allSeasonItems = lodash(seasonDefinitions)
    .values()
    .value()
    .sort((a, b) => a.seasonNumber - b.seasonNumber);

  allSeasonItems.forEach((seasonItem) => {
    seasonItems.push(buildSeasonData(seasonItem));
  });

  const seasonFilePath = [".", "generation", "Season", "generated"];

  const seasonMappingGeneratedPath = path.join(
    ...[...seasonFilePath, "mapping.ts"]
  );
  const seasonMappingExportString = generateSeasonMapping(seasonItems);

  console.log("Writing to file: ", seasonMappingGeneratedPath);
  await fs.writeFile(
    path.resolve(seasonMappingGeneratedPath),
    seasonMappingExportString
  );
}
