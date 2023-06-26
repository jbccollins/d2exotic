import axios from "axios";
import {
  DestinyInventoryItemDefinition,
  DestinySandboxPerkDefinition,
} from "bungie-api-ts/destiny2";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import prettier from "prettier";

const API_KEY = process.env.NEXT_PUBLIC_BNET_API_KEY;
const CACHED_DEFINITIONS_DIRECTORY = "./generation/cached-definitions/";

const fileExists = async (path: string) =>
  !!(await fs.stat(path).catch(() => false));

const hashString = (string: string) =>
  crypto.createHash("md5").update(string).digest("hex");

export async function getDefinitions() {
  try {
    await fs.access(CACHED_DEFINITIONS_DIRECTORY);
  } catch (e) {
    console.log("Creating the cached-definitions directory");
    await fs.mkdir(CACHED_DEFINITIONS_DIRECTORY);
  }

  const manifestResponse = await axios.get(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    { headers: { "x-api-key": API_KEY } }
  );

  const definitonsPath =
    manifestResponse.data.Response.jsonWorldContentPaths.en;
  const definitionsUrl = `https://www.bungie.net${definitonsPath}`;

  const hash = hashString(definitionsUrl);

  const cachedDefinitionsFilePath = path.join(
    CACHED_DEFINITIONS_DIRECTORY,
    `${hash}.json`
  );
  // TODO: Maybe bungie-api-ts has a type for this but it doesn't matter much
  // A lot of stuff in this could be typed better
  let tempDefinitions: unknown;

  if (await fileExists(cachedDefinitionsFilePath)) {
    console.log("Reading cached definitions");
    try {
      const tempDefinitionsFile = await fs.readFile(cachedDefinitionsFilePath);
      tempDefinitions = JSON.parse(tempDefinitionsFile.toString());
    } catch (e) {
      console.error("Error parsing out cached definitions");
    }

    if (tempDefinitions) {
      return tempDefinitions;
    } else {
      console.error("Cached definitions are falsey");
    }
  }

  console.log(
    "No cached definitions found. Requesting definitions from remote"
  );

  const definitionsResponse = await axios.get(definitionsUrl, {
    headers: { "x-api-key": API_KEY },
  });
  // .catch((e) => {
  // 	console.error(`Failed to fetch definitions. Error: ${e}`);
  // })) as AxiosResponse<unknown, unknown>; // TODO: Make a better type

  const definitions = definitionsResponse.data;

  try {
    console.log("Caching definitions");

    for (const file of await fs.readdir(CACHED_DEFINITIONS_DIRECTORY)) {
      console.log(`Removing old definitions file: ${file}`);
      await fs.unlink(path.join(CACHED_DEFINITIONS_DIRECTORY, file));
    }

    await fs.writeFile(cachedDefinitionsFilePath, JSON.stringify(definitions));
  } catch (e) {
    console.error(e);
  }

  console.log(`Cached definitions stored at: ${cachedDefinitionsFilePath}`);

  return definitions;
}

// King's Fall => KingsFall
// Vault of Glass => VaultOfGlass
export const generateId = (name: string): string => {
  const words = name.split(" ");
  return words
    .map((word) => {
      if (word === "") {
        return "Unknown";
      }
      return (word[0].toUpperCase() + word.substring(1)).replace(
        // Replace all non-alphanumeric characters
        /[^a-zA-Z0-9]/g,
        ""
      );
    })
    .join("");
};

// usage getEnumKeyByEnumValue(EArmorSlotId, armorSlotId)
// https://stackoverflow.com/a/68533063/4071059
export function getEnumKeyByEnumValue<
  TEnumKey extends string,
  TEnumVal extends string | number
>(myEnum: { [key in TEnumKey]: TEnumVal }, enumValue: TEnumVal): string {
  const keys = (Object.keys(myEnum) as TEnumKey[]).filter(
    (x) => myEnum[x] === enumValue
  );
  return keys.length > 0 ? keys[0] : "";
}

const SERIALIZED = "SERIALIZED";

export function getSerializableValue<
  TEnumKey extends string, // EArmorSlotId
  TEnumVal extends string | number // "arm"
>(
  // input: Record<string, unknown>, // {..., armorslotId: "arm" ....}
  // keyToReplace: string, // "armorSlotId"
  value: string | number,
  enumDefinition: { [key in TEnumKey]: TEnumVal }, // EArmorSlotId
  enumName: string // "EArmorSlotId"
): string {
  const stringifiedEnumKey = getEnumKeyByEnumValue(enumDefinition, value);
  return stringifiedEnumKey
    ? `${SERIALIZED}${enumName}.${stringifiedEnumKey}`
    : `${SERIALIZED}null`;
}

// Replace all unquoted and quoted instances of SERIALIZEDEArmorSlotId.Arm with ArmorSlotId.Arm
const replaceRegexString = `['"]*${SERIALIZED}([A-Za-z.0-9]*)['"]*`;
const replaceRegex = new RegExp(replaceRegexString, "g");

export const formatStringForFile = (s: string) => {
  let deSerializedString = `${s}`;
  const matches = s.match(replaceRegex);
  if (matches) {
    matches.forEach((match) => {
      const replacementValue = match
        .replace(/["']/g, "")
        .replace(SERIALIZED, "");
      deSerializedString = deSerializedString.replace(match, replacementValue);
    });
  }
  return prettier.format(deSerializedString, { parser: "typescript" });
};

// TODO: The description ordering of 'Into the Fray' is different than every other
// description. So we can't just check perks[0]. We have to check all perks :(
export const getDescription = (
  item: DestinyInventoryItemDefinition,
  sandboxPerkDefinitions: Record<number, DestinySandboxPerkDefinition>
) => {
  let description = "No description found";
  for (const perk of item.perks) {
    const desc =
      sandboxPerkDefinitions[perk.perkHash].displayProperties.description;
    if (desc) {
      description = desc;
      break;
    }
  }
  return description;
};

// async function $http(config: HttpClientConfig) {
//   // fill in the API key, handle OAuth, etc., then make an HTTP request using the config.
//   return fetch(config.url, {});
// }

// const fetchDestinyManifest = async () => {
//   const destinyManifest = await getDestinyManifest($http);
//   const manifestTables = getDestinyManifestSlice($http, {
//     destinyManifest,
//     tableNames: ["DestinyInventoryItemDefinition"],
//     language: "en",
//   });
//   return manifestTables;
// };

type WithId = { id: string } & Record<string | number, unknown>;

export const generateIdEnumFileString = (
  items: WithId[],
  enumName: string
): string => {
  const modIdEnumsString = items.map((item) => `${item.id} = '${item.id}',`);
  const setDataFileSource = `// This file is generated.
	// Do not manually make changes to this file.
  
	export enum ${enumName} {
		${modIdEnumsString.join("\n")}
	}
	`;
  return formatStringForFile(setDataFileSource);
};

export const getVal = (key: string, item: any) => {
  if (item[key]) {
    return item[key];
  }
  return null;
};
