import { ExoticWeapon } from "@d2e/types/ExoticWeapon";
import { Box, useTheme } from "@mui/material";
import BungieImage from "./BungieImage";
import LayeredBungieImage from "./LayeredBungieImage";

export type ExoticWeaponItemProps = {
  item: ExoticWeapon;
};
export default function ExoticWeaponItem({ item }: ExoticWeaponItemProps) {
  const theme = useTheme();
  const { icon, name, hash, seasonHash, iconWatermark, catalyst } = item;
  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        height: "100%",
        padding: theme.spacing(1),
      }}
      className="exotic-item-wrapper p-3"
    >
      <Box className="exotic-item flex items-center w-full">
        <LayeredBungieImage
          style={{
            height: 64,
            width: 64,
          }}
          icons={[icon, iconWatermark]}
          src={icon}
        />
        <Box className="ml-2 text-xl">{name}</Box>
      </Box>
      {catalyst && (
        <Box className="catalyst mt-4 flex w-full flex-col">
          <BungieImage height={40} width={40} src={catalyst.icon} />
          {catalyst.perks && (
            <Box className="ml-2 text-sm">
              {catalyst.perks.map((perk) => {
                return (
                  <Box key={perk.hash}>
                    <Box className="flex flex-wrap">
                      <BungieImage height={20} width={20} src={perk.icon} />
                      <Box className="ml-2 text-sm">{perk.name}</Box>
                    </Box>
                    <Box className="ml-2 text-sm">{perk.description}</Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      )}
      {/* <Stats item={item} /> */}
    </Box>
  );
}
