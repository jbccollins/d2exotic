import { Box } from "@mui/material";
import BooleanSettings from "./BooleanSettings";
import GroupBy from "./GroupBy";

export default function Settings() {
  return (
    <Box>
      <GroupBy />
      <BooleanSettings />
    </Box>
  );
}
