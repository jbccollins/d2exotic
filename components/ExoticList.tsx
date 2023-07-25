import { useAppSelector } from "@d2e/redux/hooks";
import { selectFilterByHasIntrinsicFocus } from "@d2e/redux/slice/filterByHasIntrinsicFocus";
import { selectFilterByHasIntrinsicStats } from "@d2e/redux/slice/filterByHasIntrinsicStats";
import { selectGroupById } from "@d2e/redux/slice/groupById";
import { selectSearch } from "@d2e/redux/slice/search";
import { getExoticArmorNestedGroupList } from "@d2e/types/ExoticArmor";
import { Box } from "@mui/material";
import NestedGroup from "./NestedGroup";

export default function ExoticList() {
  const searchTerm = useAppSelector(selectSearch);
  const groupById = useAppSelector(selectGroupById);
  const filterByHasIntrinsicFocus = useAppSelector(
    selectFilterByHasIntrinsicFocus
  );
  const filterByHasIntrinsicStats = useAppSelector(
    selectFilterByHasIntrinsicStats
  );
  const exoticArmorNestedGroupList = getExoticArmorNestedGroupList(
    groupById,
    searchTerm,
    filterByHasIntrinsicFocus,
    filterByHasIntrinsicStats
  );
  return (
    <Box className="exotic-list">
      {exoticArmorNestedGroupList.map((exoticArmorNestedGroup) => (
        <NestedGroup
          key={exoticArmorNestedGroup.id}
          group={exoticArmorNestedGroup}
        />
      ))}
    </Box>
  );
}
