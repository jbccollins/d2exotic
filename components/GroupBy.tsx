import { useAppDispatch, useAppSelector } from "@d2e/redux/hooks";
import { selectGroupById, setGroupById } from "@d2e/redux/slice/groupById";
import { EGroupById, GroupByIdList, getGroupBy } from "@d2e/types/GroupBy";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function GroupBy() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectGroupById);
  const handleChange = (event: SelectChangeEvent<EGroupById>) => {
    dispatch(setGroupById(event.target.value as EGroupById));
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="group-by-label">Group Items By</InputLabel>
      <Select
        labelId="group-by-label"
        id="group-by"
        label="Group Items By"
        value={value}
        onChange={handleChange}
      >
        {GroupByIdList.map((groupById) => {
          const { id, name } = getGroupBy(groupById);
          return (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
