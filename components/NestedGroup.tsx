import { NestedGroup } from "@d2e/types/ExoticArmor";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import BungieImage from "./BungieImage";
import ExoticArmorItem from "./ExoticArmorItem";

type NestedGroupProps = {
  group: NestedGroup;
  depth?: number;
};
const NestedGroup = ({ group, depth }: NestedGroupProps) => {
  const theme = useTheme();
  const isLeaf = group.items?.length ?? 0 > 0;
  const _depth = depth ?? 0;
  const iconSize = Math.max(60 - _depth * 20, 20);
  const fontSize = Math.max(24 - _depth * 2, 12);
  const margin = group.icon ? Math.max(0, 2 - _depth) : 0;

  const [open, setOpen] = useState(true);
  const collapsible = _depth === 0;
  return (
    <Box
      className={`nested-group-${_depth}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: theme.spacing(2),
      }}
    >
      <Box
        className="header"
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: margin,
        }}
      >
        {group.icon && (
          <Box>
            <BungieImage width={iconSize} height={iconSize} src={group.icon} />
          </Box>
        )}
        <Box
          sx={{
            marginLeft: margin,
            fontSize: fontSize,
            cursor: collapsible ? "pointer" : "default",
          }}
          onClick={() => collapsible && setOpen(!open)}
        >
          {group.name}
        </Box>
        {collapsible && (
          <IconButton
            aria-label="expand"
            size="small"
            onClick={() => collapsible && setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        )}
      </Box>
      {isLeaf && (
        <Box>
          {group.items?.map((item) => (
            <Box
              key={item.hash}
              sx={{
                marginTop: theme.spacing(1),
              }}
            >
              <ExoticArmorItem item={item} />
            </Box>
          ))}
        </Box>
      )}
      {!isLeaf && (
        <Collapse in={open || !collapsible} timeout={0} unmountOnExit>
          <Box
            className={`children`}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            {group.childGroups?.map((childGroup) => (
              <Box
                key={childGroup.id}
                sx={{
                  padding: theme.spacing(0.5),
                  maxWidth: "420px",
                }}
              >
                <NestedGroup group={childGroup} depth={_depth + 1} />
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default NestedGroup;
