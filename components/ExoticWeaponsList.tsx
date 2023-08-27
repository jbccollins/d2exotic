import { getExoticWeaponNestedGroupList } from "@d2e/types/ExoticWeapon";
import { ENestedGroupItemType } from "@d2e/types/NestedGroup";
import { Box } from "@mui/material";
import NestedGroup from "./NestedGroup";

export default function ExoticWeaponsList() {
  const exoticWeaponNestedGroupList = getExoticWeaponNestedGroupList();
  return (
    <Box className="exotic-list">
      {exoticWeaponNestedGroupList.map((exoticWeaponNestedGroupList) => (
        <NestedGroup
          itemType={ENestedGroupItemType.WEAPON}
          key={exoticWeaponNestedGroupList.id}
          group={exoticWeaponNestedGroupList}
        />
      ))}
    </Box>
  );
}
