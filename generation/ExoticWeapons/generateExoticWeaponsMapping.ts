import {
  formatStringForFile,
  getSerializableValue,
  getVal,
} from "@d2e/generation/utils";
import { ExoticWeapon } from "@d2e/types/ExoticWeapon";

export const generateExoticWeaponMapping = (
  exoticWeaponItems: ExoticWeapon[]
): string => {
  const enumsToSerialize = {
    // // weaponSlotId: { enumDefinition: EWeaponSlotId, enumName: "EWeaponSlotId" },
    // destinyClassId: {
    //   enumDefinition: EDestinyClassId,
    //   enumName: "EDestinyClassId",
    // },
    // intrinsicFocus: {
    //   enumDefinition: EWeaponStatId,
    //   enumName: "EWeaponStatId",
    //   isOptional: true,
    // },
    // expansionIdCampaignCompletionRequired: {
    //   enumDefinition: EExpansionId,
    //   enumName: "EExpansionId",
    //   isOptional: true,
    // },
    // legendaryCampaignSource: {
    //   enumDefinition: EExpansionId,
    //   enumName: "EExpansionId",
    //   isOptional: true,
    // },
  };

  const serializedExoticWeaponItems: Record<string, unknown>[] = [];
  exoticWeaponItems.forEach((exoticWeaponItem) => {
    const serializedExoticWeaponItem = { ...exoticWeaponItem } as Record<
      string,
      unknown
    >;
    Object.keys(enumsToSerialize).forEach((key) => {
      const isOptional = getVal(key, enumsToSerialize)?.isOptional ?? false;
      const serializedResult = getSerializableValue(
        getVal(key, exoticWeaponItem),
        getVal(key, enumsToSerialize)?.enumDefinition,
        getVal(key, enumsToSerialize)?.enumName
      );
      if (isOptional && serializedResult === "SERIALIZEDnull") return;
      serializedExoticWeaponItem[key] = serializedResult;
    });
    serializedExoticWeaponItems.push(serializedExoticWeaponItem);
  });

  const exoticWeaponIdToExoticWeaponMappingString =
    serializedExoticWeaponItems.map(
      (exoticWeaponItem) =>
        `[${exoticWeaponItem.hash}]: ${JSON.stringify(
          exoticWeaponItem,
          null,
          2
        )},`
    );

  const fileContents = `// This file is generated by the generateExoticWeapon.ts script.
	// Do not manually make changes to this file.

	import { ExoticWeapon } from "@d2e/types/ExoticWeapon";

	export const ExoticWeaponHashToExoticWeaponMapping: Record<number, ExoticWeapon> = {
		${exoticWeaponIdToExoticWeaponMappingString.join(" ")}
	}
	`;
  return formatStringForFile(fileContents);
};
