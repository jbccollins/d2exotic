import { useAppSelector } from "@d2e/redux/hooks";
import { selectGroupById } from "@d2e/redux/slice/groupById";
import { selectShowExoticArmorPerk } from "@d2e/redux/slice/showExoticArmorPerk";
import { selectShowIntrinsicFocus } from "@d2e/redux/slice/showIntrinsicFocus";
import { selectShowIntrinsicStats } from "@d2e/redux/slice/showIntrinsicStats";
import { selectShowRequiredDlc } from "@d2e/redux/slice/showRequiredDlc";
import { selectShowSources } from "@d2e/redux/slice/showSources";
import { getAdvancedDecryptionEngram } from "@d2e/types/AdvancedDecryptionEngram";
import { ArmorStatIdList, getArmorStat } from "@d2e/types/ArmorStat";
import { ExoticArmor } from "@d2e/types/ExoticArmor";
import { getExpansionBySeasonHash } from "@d2e/types/Expansion";
import { EGroupById } from "@d2e/types/GroupBy";
import { EExpansionId } from "@d2e/types/IdEnums";
import {
  getIconWatermarkIdFromSeasonHash,
  getIconWatermarkUrlFromId,
  getSeason,
} from "@d2e/types/Season";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, useTheme } from "@mui/material";
import BungieImage from "./BungieImage";
import { HelpIcon } from "./HelpIcon";
import LayeredBungieImage from "./LayeredBungieImage";
import { Pill } from "./Pill";
export type ExoticArmorItemProps = {
  item: ExoticArmor;
};
export default function ExoticArmorItem({ item }: ExoticArmorItemProps) {
  const showIntrinsicFocus = useAppSelector(selectShowIntrinsicFocus);
  const showIntrinsicStats = useAppSelector(selectShowIntrinsicStats);
  const showRequiredDlc = useAppSelector(selectShowRequiredDlc);
  const showSources = useAppSelector(selectShowSources);
  const showExoticArmorPerk = useAppSelector(selectShowExoticArmorPerk);

  const groupById = useAppSelector(selectGroupById);
  const {
    intrinsicStats,
    intrinsicFocus,
    isFocusable,
    isWorldDrop,
    isPartialIntrinsicFocus,
    icon,
    name,
    hash,
    seasonHash,
    armorSlotId,
    expansionIdCampaignCompletionRequired,
    legendaryCampaignSource,
    exoticArmorPerk,
  } = item;

  const advancedDecryptionEngram = getAdvancedDecryptionEngram(
    seasonHash,
    armorSlotId
  );
  const intrinsicFocusStat = intrinsicFocus && getArmorStat(intrinsicFocus);

  const isUnfocusableAdvancedDecryption =
    !isFocusable && groupById === EGroupById.AdvancedDecryptionEngram;

  const expansion = getExpansionBySeasonHash(seasonHash);
  const season = getSeason(seasonHash);
  const theme = useTheme();

  return (
    <Box
      key={hash}
      sx={{
        backgroundColor: "#121212",
        height: "100%",
        padding: theme.spacing(1),
      }}
      className="exotic-item-wrapper p-3"
    >
      <Box
        className="exotic-item flex items-center w-full"
        sx={{ opacity: isUnfocusableAdvancedDecryption ? 0.6 : 1 }}
      >
        <LayeredBungieImage
          style={{
            height: 64,
            width: 64,
          }}
          icons={[
            icon,
            getIconWatermarkUrlFromId(
              getIconWatermarkIdFromSeasonHash(seasonHash)
            ),
          ]}
          src={icon}
        />
        <Box className="ml-2 text-xl">{name}</Box>
      </Box>
      {showExoticArmorPerk && exoticArmorPerk && (
        <Box sx={{ marginTop: "8px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BungieImage height={40} width={40} src={exoticArmorPerk.icon} />
            <Box sx={{ marginLeft: "4px", fontSize: "18px" }}>
              {exoticArmorPerk.name}
            </Box>
          </Box>
          <Box sx={{ fontSize: "14px", marginTop: "4px" }}>
            {exoticArmorPerk.description}
          </Box>
        </Box>
      )}
      {isUnfocusableAdvancedDecryption && (
        <Box
          sx={{ marginBottom: 0, marginTop: 2 }}
          className="text-sm text-orange-500"
        >
          <WarningIcon sx={{ fontSize: "20px", marginTop: "-3px" }} />
          {` As of ${season.name} (S${
            season.number
          }) this item is not obtainable via ${
            advancedDecryptionEngram?.name
          }. It will become obtainable via ${
            advancedDecryptionEngram?.name
          } next season (S${season.number + 1}).`}
        </Box>
      )}

      {showRequiredDlc && expansion?.id !== EExpansionId.RedWar && (
        <Box className="required-dlc mt-2 flex items-center flex-wrap">
          <Box className="text-s mr-2">Required DLC:</Box>
          <Pill color="#7d0202" text={`${expansion?.name}`} />
        </Box>
      )}
      {showIntrinsicStats && intrinsicStats && (
        <Box className="intrinsic-stats mt-2 flex items-center flex-wrap  flex-1 basis-full">
          <Box className="text-s mr-2">Intrinsic Stats:</Box>
          {ArmorStatIdList.map((armorStatId) => {
            const statValue = intrinsicStats?.[armorStatId];
            if (!statValue) {
              return null;
            }
            const armorStat = getArmorStat(armorStatId);
            return (
              <Pill
                color="#4b2751"
                icon={armorStat.icon}
                key={armorStatId}
                text={`${statValue}`}
              />
            );
          })}
          <Box>
            <HelpIcon link="/help#intrinsic-points-exception" />
          </Box>
        </Box>
      )}

      {showIntrinsicFocus && intrinsicFocusStat && (
        <Box className="intrinsic-stats mt-2 flex items-center flex-1 basis-full">
          <Box className="text-s mr-2">
            Intrinsic Focus
            {isPartialIntrinsicFocus ? " (Partial)" : ""}:
          </Box>
          <Pill color={"#13274F"} icon={intrinsicFocusStat.icon} text={``} />
          <Box>
            <HelpIcon link="/help#intrinsic-focus-exception" />
          </Box>
        </Box>
      )}

      {showSources && (
        <Box className="pill-wrapper w-full  flex-1 basis-full">
          <Box className="sources w-full mt-2">Sources:</Box>

          {expansionIdCampaignCompletionRequired && (
            <>
              <Box
                sx={{ marginBottom: 2, marginTop: 1 }}
                className="text-sm text-orange-500"
              >
                <WarningIcon sx={{ fontSize: "20px", marginTop: "-3px" }} />
                {` Requires ${expansion?.name} campaign completion before this item will drop from any other source`}
              </Box>
              <Pill text={`${expansion?.name} campaign`} color="#AA6C39" />
            </>
          )}
          {legendaryCampaignSource && (
            <Box className="mt-2">
              <Pill
                text={`Legendary ${expansion?.name} campaign`}
                color="#AA6C39"
              />
            </Box>
          )}
          {isFocusable && advancedDecryptionEngram && (
            <Box className="mt-2">
              <Pill
                text={advancedDecryptionEngram.name}
                color="#AA6C39"
                icon={advancedDecryptionEngram.icon}
              />
            </Box>
          )}
          {/* {!isFocusable && (
            <Box className="mt-2">
              <Pill text="Non-Decryptable" color="darkred" />
            </Box>
          )} */}

          <Box className="mt-2">
            <Pill text={"Solo Legend / Master Lost Sectors"} color="#AA6C39" />
          </Box>
          <Box className="mt-2">
            <Pill text={"Vex Strike Force"} color="#AA6C39" />
          </Box>
          {isFocusable && !isWorldDrop && (
            <Box className="mt-2">
              <Pill text={"Unlockable World Drop"} color="#AA6C39" />
            </Box>
          )}

          {isWorldDrop && (
            <Box className="mt-2">
              <Pill color="darkgreen" text={`World Drop`} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
