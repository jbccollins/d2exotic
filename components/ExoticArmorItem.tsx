import { useAppSelector } from "@d2e/redux/hooks";
import { selectShowIntrinsicFocus } from "@d2e/redux/slice/showIntrinsicFocus";
import { selectShowIntrinsicStats } from "@d2e/redux/slice/showIntrinsicStats";
import { selectShowRequiredDlc } from "@d2e/redux/slice/showRequiredDlc";
import { selectShowSources } from "@d2e/redux/slice/showSources";
import { getAdvancedDecryptionEngram } from "@d2e/types/AdvancedDecryptionEngram";
import {
  ArmorStatIdList,
  EArmorStatGroup,
  getArmorStat,
} from "@d2e/types/ArmorStat";
import { ExoticArmor } from "@d2e/types/ExoticArmor";
import { getExpansionBySeasonHash } from "@d2e/types/Expansion";
import { EExpansionId } from "@d2e/types/IdEnums";
import {
  getIconWatermarkIdFromSeasonHash,
  getIconWatermarkUrlFromId,
} from "@d2e/types/Season";
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
  } = item;

  const advancedDecryptionEngram = getAdvancedDecryptionEngram(
    seasonHash,
    armorSlotId
  );
  const intrinsicFocusStat = intrinsicFocus && getArmorStat(intrinsicFocus);

  const expansion = getExpansionBySeasonHash(seasonHash);
  return (
    <div
      key={hash}
      className="exotic-item-wrapper flex flex-wrap items-center bg-gray-900 p-3 rounded-lg"
    >
      <div className="exotic-item flex items-center w-full">
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
        <div className="ml-2 text-xl">{name}</div>
      </div>

      {showRequiredDlc && expansion?.id !== EExpansionId.RedWar && (
        <div className="required-dlc mt-2 flex items-center flex-wrap">
          <div className="text-s mr-2">Required DLC:</div>
          <Pill color="#4b2751" text={`${expansion?.name}`} />
        </div>
      )}
      {showIntrinsicStats && intrinsicStats && (
        <div className="intrinsic-stats mt-2 flex items-center flex-wrap">
          <div className="text-s mr-2">Intrinsic Stats:</div>
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
                text={`${armorStat.shortName}: ${statValue}`}
              />
            );
          })}
        </div>
      )}

      {showIntrinsicFocus && intrinsicFocusStat && (
        <div className="intrinsic-stats mt-2 flex items-center">
          <div className="text-s mr-2">
            Intrinsic Focus
            {isPartialIntrinsicFocus ? " (Partial)" : ""}:
          </div>
          <Pill
            color={
              intrinsicFocusStat.group === EArmorStatGroup.A
                ? "#0039a6"
                : "#13274F"
            }
            icon={intrinsicFocusStat.icon}
            text={`${intrinsicFocusStat.shortName}`}
          />
        </div>
      )}

      {showSources && (
        <div className="pill-wrapper w-full">
          <div className="sources w-full mt-2">Sources:</div>

          {expansionIdCampaignCompletionRequired && (
            <div className="text-xs text-red-500">{`* Requires ${expansion?.name} campaign completion before this item will drop from any other source`}</div>
          )}
          {isFocusable && advancedDecryptionEngram && (
            <div className="mt-2">
              <Pill
                text={advancedDecryptionEngram.name}
                color="#AA6C39"
                icon={advancedDecryptionEngram.icon}
              />
            </div>
          )}
          {/* {!isFocusable && (
            <div className="mt-2">
              <Pill text="Non-Decryptable" color="darkred" />
            </div>
          )} */}

          <div className="mt-2">
            <Pill text={"Solo Legend / Master Lost Sectors"} color="#AA6C39" />
          </div>
          <div className="mt-2">
            <Pill text={"Vex Strike Force"} color="#AA6C39" />
          </div>
          {isFocusable && !isWorldDrop && (
            <div className="mt-2">
              <Pill text={"Unlockable World Drop"} color="#AA6C39" />
            </div>
          )}

          {isWorldDrop && (
            <div className="mt-2">
              <Pill color="darkgreen" text={`World Drop`} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
