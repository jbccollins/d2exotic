import { getAdvancedDecryptionEngramById } from "@d2e/types/AdvancedDecryptionEngram";
import { ArmorSlotIdList } from "@d2e/types/ArmorSlot";
import { DestinyClassIdList, getDestinyClass } from "@d2e/types/DestinyClass";
import { getExoticsByAdvancedDecryptionEngramId } from "@d2e/types/ExoticArmor";
import { EAdvancedDecryptionEngramId } from "@d2e/types/IdEnums";
import BungieImage from "./BungieImage";

type AdvancedDecrpytionSectionProps = {
  advancedDecryptionEngramId: EAdvancedDecryptionEngramId;
};
export default function AdvancedDecryptionSection({
  advancedDecryptionEngramId,
}: AdvancedDecrpytionSectionProps) {
  const advancedDecryptionEngram = getAdvancedDecryptionEngramById(
    advancedDecryptionEngramId
  );
  const exotics = getExoticsByAdvancedDecryptionEngramId(
    advancedDecryptionEngramId
  );
  return (
    <div className="section [&:nth-child(odd)]:bg-gray-800 [&:nth-child(even)]:bg-gray-900 p-8">
      <div className="section-header flex justify-left items-center">
        <BungieImage src={advancedDecryptionEngram.icon} />
        <div className="text-3xl ml-4">{advancedDecryptionEngram.name}</div>
      </div>
      <div className="section-content flex flex-wrap justify-left">
        {DestinyClassIdList.map((destinyClassId) => {
          return (
            <div className="destiny-class mt-8" key={destinyClassId}>
              <div className="flex-1 text-2xl ml-2">
                {getDestinyClass(destinyClassId).name}
              </div>
              <div className="destiny-class-exotics-wrapper flex flex-wrap flex-col">
                {ArmorSlotIdList.map((armorSlotId) => {
                  return (
                    <div key={armorSlotId} className="flex flex-wrap flex-col">
                      {exotics[destinyClassId][armorSlotId]
                        .filter((x) => x.isFocusable)
                        .map((exotic) => {
                          return (
                            <div
                              key={exotic.hash}
                              className="exotic-item flex items-center m-2 w-84"
                            >
                              <BungieImage
                                style={{
                                  height: 64,
                                  width: 64,
                                }}
                                src={exotic.icon}
                              />
                              <div className="ml-2 text-xl">{exotic.name}</div>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
