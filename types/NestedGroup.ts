import { ExoticArmor } from "./ExoticArmor";
import { ExoticWeapon } from "./ExoticWeapon";

export type NestedGroup = {
  name: string;
  id: string;
  icon?: string;
  childGroups?: NestedGroup[];
  items?: ExoticArmor[] | ExoticWeapon[];
};

export enum ENestedGroupItemType {
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
}
