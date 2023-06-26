import { run as generateExoticArmor } from "./ExoticArmor/generateExoticArmor";
import { run as generateSeasons } from "./Season/generateSeasons";

(async function run() {
  await generateExoticArmor();
  await generateSeasons();
})();
