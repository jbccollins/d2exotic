import { ExoticArmor } from "@d2e/types/ExoticArmor";
import { ExoticWeapon } from "@d2e/types/ExoticWeapon";
import {
  ENestedGroupItemType,
  NestedGroup as NestedGroupType,
} from "@d2e/types/NestedGroup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import BungieImage from "./BungieImage";
import ExoticArmorItem from "./ExoticArmorItem";
import ExoticWeaponItem from "./ExoticWeaponItem";

type NestedGroupProps = {
  group: NestedGroupType;
  depth?: number;
  itemType: ENestedGroupItemType;
};

const NestedGroup = ({ group, depth, itemType }: NestedGroupProps) => {
  const theme = useTheme();
  const isLeaf = group.items?.length ?? 0 > 0;
  const _depth = depth ?? 0;
  const iconSize = Math.max(60 - _depth * 20, 20);
  const fontSize = Math.max(24 - _depth * 2, 12);
  const margin = group.icon ? Math.max(0, 2 - _depth) : 0;

  const [open, setOpen] = useState(true);
  // const [isHovered, setIsHovered] = useState(false);
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
          cursor: "pointer",
          // backgroundColor: isHovered ? "#121212" : "transparent",
        }}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        onClick={() => setOpen(!open)}
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
          }}
        >
          {group.name}
        </Box>

        <IconButton
          aria-label="expand"
          size="small"
          // onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout={0} unmountOnExit>
        {isLeaf && (
          <Box
            sx={{
              display: "grid",
              overflow: "hidden",
              gridTemplateColumns: "repeat(auto-fill, 400px)",
              gridAutoRows: "1fr",
              gridColumnGap: theme.spacing(1),
              gridRowGap: theme.spacing(1),
            }}
            className="leaf"
          >
            {group.items?.map((item) => (
              <Box
                key={item.hash}
                sx={{
                  width: "100%",
                  maxWidth: "calc(100vw - 32px)",
                }}
              >
                {itemType === ENestedGroupItemType.WEAPON && (
                  <ExoticWeaponItem item={item as ExoticWeapon} />
                )}
                {itemType === ENestedGroupItemType.ARMOR && (
                  <ExoticArmorItem item={item as ExoticArmor} />
                )}
              </Box>
            ))}
          </Box>
        )}
        {!isLeaf && (
          <Box
            className={`children`}
            sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
          >
            {group.childGroups?.map((childGroup) => (
              <Box
                key={childGroup.id}
                sx={{
                  padding: theme.spacing(0.5),
                  // maxWidth: "420px",
                  width: "100%",
                }}
              >
                <NestedGroup
                  itemType={itemType}
                  group={childGroup}
                  depth={_depth + 1}
                />
              </Box>
            ))}
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default NestedGroup;
