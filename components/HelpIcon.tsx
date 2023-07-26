import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, IconButton, Link } from "@mui/material";

type HelpIconProps = {
  link: string;
};

export const HelpIcon = ({ link }: HelpIconProps) => {
  return (
    <Box sx={{ transform: "scale(0.8)" }}>
      <Link sx={{ marginLeft: "-4px" }} href={link}>
        <IconButton size="small">
          <QuestionMarkIcon />
        </IconButton>
      </Link>
    </Box>
  );
};
