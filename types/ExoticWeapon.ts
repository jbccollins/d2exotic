import { ExoticWeaponHashToExoticWeaponMapping } from "@d2e/generation/ExoticWeapons/generated/mapping";

export type NestedGroup = {
  name: string;
  id: string;
  icon?: string;
  childGroups?: NestedGroup[];
  items?: ExoticWeapon[];
};

export type WeaponIntrinsicTrait = {
  hash: number;
  icon: string;
  name: string;
  description: string;
};

export type WeaponPerk = {
  hash: number;
  icon: string;
  name: string;
  description: string;
};
export type WeaponStats = {
  hash: number;
  value: number;
};
export type ExoticWeaponCatalystUpgradeMasterwork = {
  stats: WeaponStats[];
};
export type ExoticWeaponCatalyst = {
  name: string;
  hash: number;
  icon: string;
  stats?: WeaponStats[];
  upgradeMasterwork?: ExoticWeaponCatalystUpgradeMasterwork;
  perks?: WeaponPerk[];
};
export type ExoticWeapon = {
  name: string;
  hash: number;
  icon: string;
  iconWatermark: string;
  seasonHash: number;
  catalyst?: ExoticWeaponCatalyst;
  intrinsicTraits?: WeaponIntrinsicTrait[];
  perks?: WeaponPerk[];
  stats: WeaponStats[];
};
export const groupExoticWeaponsByNothing = (
  exoticWeaponItems: ExoticWeapon[]
): NestedGroup[] => {
  const group1: NestedGroup = {
    name: "Exotic Weapons",
    id: "exotic-weapons",
    items: exoticWeaponItems,
  };
  return [group1];
};

export function getExoticWeaponItemsFilteredBySearchTerm(
  searchTerm: string
): ExoticWeapon[] {
  return Object.values(ExoticWeaponHashToExoticWeaponMapping)
    .filter((exotic) =>
      exotic.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
}

export const getExoticWeaponNestedGroupList = (): NestedGroup[] => {
  return groupExoticWeaponsByNothing(
    getExoticWeaponItemsFilteredBySearchTerm("")
  );
};
