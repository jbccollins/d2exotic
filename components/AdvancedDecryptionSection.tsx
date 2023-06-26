import { getAdvancedDecryptionEngram } from "@d2e/types/AdvancedDecryptionEngram";
import { ArmorSlotIdList } from "@d2e/types/ArmorSlot";
import { DestinyClassIdList } from "@d2e/types/DestinyClass";
import { getExoticsByAdvancedDecryptionEngramId } from "@d2e/types/ExoticArmor";
import { EAdvancedDecryptionEngramId } from "@d2e/types/IdEnums";
import BungieImage from "./BungieImage";

type AdvancedDecrpytionSectionProps = {
  advancedDecryptionEngramId: EAdvancedDecryptionEngramId;
};
export default function AdvancedDecryptionSection({
  advancedDecryptionEngramId,
}: AdvancedDecrpytionSectionProps) {
  const advancedDecryptionEngram = getAdvancedDecryptionEngram(
    advancedDecryptionEngramId
  );
  const exotics = getExoticsByAdvancedDecryptionEngramId(
    advancedDecryptionEngramId
  );
  return (
    <div className="mb-10">
      <div className="flex justify-left items-center">
        <BungieImage src={advancedDecryptionEngram.icon} />
        <div className="ml-4 text-2xl">{advancedDecryptionEngram.name}</div>
      </div>
      <div className="flex flex-wrap ml-10 mt-6">
        {DestinyClassIdList.map((destinyClassId) => {
          return (
            <div key={destinyClassId} className="flex m-2 w-96">
              {/* <div>{getDestinyClass(destinyClassId).name}</div> */}
              <div>
                {ArmorSlotIdList.map((armorSlotId) => {
                  return (
                    <div key={armorSlotId} className="flex m-2 w-96">
                      {/* <div>{getArmorSlot(armorSlotId).name}</div> */}
                      <div>
                        {exotics[destinyClassId][armorSlotId].map((exotic) => {
                          return (
                            <div
                              key={exotic.hash}
                              className="flex items-center m-2 w-96"
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
