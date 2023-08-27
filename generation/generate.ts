import { run as generateExoticArmor } from "./ExoticArmor/generateExoticArmor";
import { run as generateExoticWeapons } from "./ExoticWeapons/generateExoticWeapons";
import { run as generateSeasons } from "./Season/generateSeasons";
import { run as generateWeaponStats } from "./WeaponStats/generateWeaponStats";

import generateExoticWeaponToCatalystRecordMapping from "./ExoticWeapons/generateExoticWeaponToCatalystRecordMapping";

(async function run() {
  await generateSeasons();
  await generateExoticArmor();
  await generateExoticWeaponToCatalystRecordMapping();
  await generateExoticWeapons();
  await generateWeaponStats();
})();
