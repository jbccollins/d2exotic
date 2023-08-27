import { exoticsWithCatalysts } from "@d2e/generation/ExoticWeapons/generated/exotic-weapon-to-catalyst-record-mapping";
import {
  DestinyCharacterRecordsComponent,
  DestinyObjectiveProgress,
  DestinyProfileRecordsComponent,
  DestinyRecordState,
} from "bungie-api-ts-no-const-enum/destiny2";

export type Catalyst = {
  complete: boolean;
  unlocked: boolean;
  objectives: DestinyObjectiveProgress[];
};

export async function buildCatalystInfo(
  itemHash: number,
  profileRecords: DestinyProfileRecordsComponent | undefined,
  characterRecords:
    | { [key: string]: DestinyCharacterRecordsComponent }
    | undefined
): Promise<Catalyst | undefined> {
  if (!exoticsWithCatalysts[itemHash]) {
    return undefined;
  }

  const recordHash = exoticsWithCatalysts[itemHash];
  const record =
    recordHash &&
    (profileRecords?.records[recordHash] ??
      (characterRecords &&
        Object.values(characterRecords).find(
          (records) => records.records[recordHash]
        )?.records[recordHash]));
  if (!record) {
    return undefined;
  }

  // TODO: Can't tell the difference between unlocked and inserted for new-style catalysts?
  const complete = Boolean(
    !(record.state & DestinyRecordState.ObjectiveNotCompleted) ||
      record.state & DestinyRecordState.RecordRedeemed
  );
  // TODO: seasonal exotics (e.g. Ticuu's) are unlocked by default but still show as obscured - they're run by a quest instead of a record?

  // Need to map from  weapon -> catalyst plug item -> quest that rewards it -> quest in inventory or objectives in profile (across all chars)?
  // if the quest item exists in inventory (how do we figure *that* out?) then it's unlocked and not complete
  // 1. could pass along a set of quest item hashes in all inventories, or all uninstanced objectives that match the quest item
  // 2. could do a second pass on items populating it? rip through all the quest items, find ones whose rewards reference a catalyst, then go back and fix up the items' DimCatalyst info? would need a mapping from item hash to catalyst item hash (which I guess we can match up by name...)
  const unlocked = !(record.state & DestinyRecordState.Obscured);

  return { complete, unlocked, objectives: record.objectives };
}
