import { useAppSelector } from "@d2e/redux/hooks";
import { selectGroupById } from "@d2e/redux/slice/groupById";
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
import { Box } from "@mui/material";
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

  return (
    <Box
      key={hash}
      sx={{ backgroundColor: "#121212" }}
      className="exotic-item-wrapper flex flex-wrap items-center p-3"
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
      {isUnfocusableAdvancedDecryption && (
        <Box
          sx={{ marginBottom: 0, marginTop: 2 }}
          className="text-sm text-red-500"
        >{`* As of ${season.name} (S${
          season.number
        }) this item is not obtainable via ${
          advancedDecryptionEngram?.name
        }. It will become obtainable via ${
          advancedDecryptionEngram?.name
        } next season (S${season.number + 1}).`}</Box>
      )}

      {showRequiredDlc && expansion?.id !== EExpansionId.RedWar && (
        <Box className="required-dlc mt-2 flex items-center flex-wrap">
          <Box className="text-s mr-2">Required DLC:</Box>
          <Pill color="#7d0202" text={`${expansion?.name}`} />
        </Box>
      )}
      {showIntrinsicStats && intrinsicStats && (
        <Box className="intrinsic-stats mt-2 flex items-center flex-wrap">
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
        </Box>
      )}

      {showIntrinsicFocus && intrinsicFocusStat && (
        <Box className="intrinsic-stats mt-2 flex items-center">
          <Box className="text-s mr-2">
            Intrinsic Focus
            {isPartialIntrinsicFocus ? " (Partial)" : ""}:
          </Box>
          <Pill color={"#13274F"} icon={intrinsicFocusStat.icon} text={``} />
        </Box>
      )}

      {showSources && (
        <Box className="pill-wrapper w-full">
          <Box className="sources w-full mt-2">Sources:</Box>

          {expansionIdCampaignCompletionRequired && (
            <>
              <Box
                sx={{ marginBottom: 2, marginTop: 1 }}
                className="text-sm text-red-500"
              >{`* Requires ${expansion?.name} campaign completion before this item will drop from any other source`}</Box>
              <Pill
                text={`${expansion?.name} campaign completion`}
                color="#AA6C39"
              />
            </>
          )}
          {legendaryCampaignSource && (
            <Box className="mt-2">
              <Pill
                text={`Legendary ${expansion?.name} campaign completion`}
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
