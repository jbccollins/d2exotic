import { formatStringForFile } from "@d2e/generation/utils";
import { Season } from "@d2e/types/Season";

export const generateSeasonMapping = (seasonItems: Season[]): string => {
  const seasonIdToSeasonMappingString = seasonItems.map(
    (seasonItem) =>
      `[${seasonItem.hash}]: ${JSON.stringify(seasonItem, null, 2)},`
  );

  const fileContents = `// This file is generated by the generateSeason.ts script.
	// Do not manually make changes to this file.

	import { Season } from "@d2e/types/Season";

	export const SeasonIdToSeasonMapping: Record<number, Season> = {
		${seasonIdToSeasonMappingString.join(" ")}
	}
	`;
  return formatStringForFile(fileContents);
};
