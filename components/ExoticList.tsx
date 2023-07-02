"use client";

import { getAdvancedDecryptionEngram } from "@d2e/types/AdvancedDecryptionEngram";
import { ArmorSlotIdList } from "@d2e/types/ArmorSlot";
import {
  ArmorStatIdList,
  EArmorStatGroup,
  getArmorStat,
} from "@d2e/types/ArmorStat";
import { DestinyClassIdList, getDestinyClass } from "@d2e/types/DestinyClass";
import { getExotics } from "@d2e/types/ExoticArmor";
import { getExpansionBySeasonHash } from "@d2e/types/Expansion";
import {
  EArmorSlotId,
  EDestinyClassId,
  EExpansionId,
} from "@d2e/types/IdEnums";
import {
  getIconWatermarkIdFromSeasonHash,
  getIconWatermarkUrlFromId,
} from "@d2e/types/Season";
import { useState } from "react";
import LayeredBungieImage from "./LayeredBungieImage";
import { Pill } from "./Pill";

const Filter = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  );
};

const Close = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const ChevronDown = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

const ChevronUp = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
};

const Filters = () => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="filters fixed z-50">
      {!showFilters && (
        <div
          className="show-filters-button bg-gray-900 p-2 rounded-lg cursor-pointer top-2 right-2 fixed "
          onClick={() => setShowFilters(true)}
        >
          <Filter />
        </div>
      )}
      {showFilters && (
        <div className="bg-gray-900 w-screen h-screen">
          <div className="filters-wrapper p-4">
            <div className="filters-header items-center cursor-pointer top-2 right-2 fixed p-2">
              <div onClick={() => setShowFilters(false)}>
                <Close />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type ExoticListProps = {};
export default function ExoticList({}: ExoticListProps) {
  const [collapsedSections, setCollapsedSections] = useState<EDestinyClassId[]>(
    []
  );
  const exotics = getExotics();

  const handleToggleCollapse = (destinyClassId: EDestinyClassId) => {
    if (collapsedSections.includes(destinyClassId)) {
      setCollapsedSections(
        collapsedSections.filter((x) => x !== destinyClassId)
      );
    } else {
      setCollapsedSections([...collapsedSections, destinyClassId]);
    }
  };
  return (
    <div className="">
      <Filters />
      <div className="p-2">
        {DestinyClassIdList.map((destinyClassId) => {
          const { icon, name } = getDestinyClass(destinyClassId);
          return (
            <div className="destiny-class mb-8" key={destinyClassId}>
              <div
                className="flex text-2xl ml-2  items-center gap-1 cursor-pointer mb-4"
                onClick={() => handleToggleCollapse(destinyClassId)}
              >
                <img width={40} height={40} src={icon} />
                {name}
                <div>
                  {collapsedSections.includes(destinyClassId) ? (
                    <ChevronDown />
                  ) : (
                    <ChevronUp />
                  )}
                </div>
              </div>
              {!collapsedSections.includes(destinyClassId) && (
                <div className="destiny-class-exotics-wrapper flex flex-wrap gap-x-4">
                  {ArmorSlotIdList.filter(
                    (x) => x !== EArmorSlotId.ClassItem
                  ).map((armorSlotId) => {
                    return (
                      <div
                        key={armorSlotId}
                        className="flex flex-col max-w-md gap-4"
                      >
                        {exotics[destinyClassId][armorSlotId].map((exotic) => {
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
                          } = exotic;

                          const advancedDecryptionEngram =
                            getAdvancedDecryptionEngram(
                              seasonHash,
                              armorSlotId
                            );
                          const intrinsicFocusStat =
                            intrinsicFocus && getArmorStat(intrinsicFocus);

                          const expansion =
                            getExpansionBySeasonHash(seasonHash);
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
                                      getIconWatermarkIdFromSeasonHash(
                                        seasonHash
                                      )
                                    ),
                                  ]}
                                  src={icon}
                                />
                                <div className="ml-2 text-xl">{name}</div>
                              </div>
                              {!isFocusable && (
                                <div className="mt-2">
                                  <Pill
                                    text="Non-Decryptable"
                                    color="darkred"
                                  />
                                </div>
                              )}
                              <div className="pill-wrapper w-full">
                                {expansion?.id !== EExpansionId.RedWar && (
                                  <div className="mt-2">
                                    <Pill
                                      text={`Required DLC: ${expansion?.name}`}
                                      color="#8B0000"
                                    />
                                  </div>
                                )}
                                <div className="sources w-full mt-2">
                                  Sources:
                                </div>

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

                                {/* <div className="mt-2">
                                  <Pill
                                    text={"Solo Legend / Master Lost Sectors"}
                                    color="#AA6C39"
                                  />
                                </div>
                                <div className="mt-2">
                                  <Pill
                                    text={"Vex Strike Force"}
                                    color="#AA6C39"
                                  />
                                </div> */}
                                {isFocusable && !isWorldDrop && (
                                  <div className="mt-2">
                                    <Pill
                                      text={"Unlockable World Drop"}
                                      color="#AA6C39"
                                    />
                                  </div>
                                )}

                                {isWorldDrop && (
                                  <div className="mt-2">
                                    <Pill
                                      color="darkgreen"
                                      text={`World Drop`}
                                    />
                                  </div>
                                )}
                                {intrinsicStats && (
                                  <div className="intrinsic-stats mt-2 flex items-center flex-wrap">
                                    <div className="text-s mr-2">
                                      Intrinsic Stats:
                                    </div>
                                    {ArmorStatIdList.map((armorStatId) => {
                                      const statValue =
                                        intrinsicStats?.[armorStatId];
                                      if (!statValue) {
                                        return null;
                                      }
                                      const armorStat =
                                        getArmorStat(armorStatId);
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

                                {intrinsicFocusStat && (
                                  <div className="intrinsic-stats mt-2 flex items-center">
                                    <div className="text-s mr-2">
                                      Intrinsic Focus
                                      {isPartialIntrinsicFocus
                                        ? " (Partial)"
                                        : ""}
                                      :
                                    </div>
                                    <Pill
                                      color={
                                        intrinsicFocusStat.group ===
                                        EArmorStatGroup.A
                                          ? "#0039a6"
                                          : "#13274F"
                                      }
                                      icon={intrinsicFocusStat.icon}
                                      text={`${intrinsicFocusStat.shortName}`}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
