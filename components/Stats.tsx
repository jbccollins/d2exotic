import { WeaponStatIdToWeaponStatMapping } from "@d2e/generation/WeaponStats/generated/mapping";
import { ExoticWeapon } from "@d2e/types/ExoticWeapon";
import { Box } from "@mui/material";

type StatBarProps = {
  baseStat: number;
  catalystStat?: number;
};
function StatBar(props: StatBarProps) {
  const { baseStat, catalystStat } = props;
  return (
    <Box sx={{ background: "#333" }} className="stat-bar h-3 relative w-full">
      <Box
        sx={{ width: `${baseStat}%`, background: "white" }}
        className="stat-bar-base absolute h-full"
      ></Box>
      {catalystStat && (
        <Box
          sx={{ width: `${catalystStat}%`, left: baseStat, background: "gold" }}
          className="stat-bar-catalyst absolute h-full"
        ></Box>
      )}
    </Box>
  );
}

type StatsProps = {
  item: ExoticWeapon;
};

const NonPercentageStats = [
  4284893193, // RPM
  3871231066, // Magazine
  3555269338, // Zoom
  1931675084, // Inventory Size
  2715839340, // Recoil Direction
];
export default function Stats(props: StatsProps) {
  const { item } = props;
  const { stats } = item;
  return (
    <Box className="stats">
      {stats
        .filter((x) => !NonPercentageStats.includes(x.hash))
        .map((stat) => {
          return (
            <Box key={stat.hash} className="stat">
              <Box className="name">
                {WeaponStatIdToWeaponStatMapping[stat.hash].name}
              </Box>
              <StatBar baseStat={stat.value} />
            </Box>
          );
        })}
    </Box>
  );
}
