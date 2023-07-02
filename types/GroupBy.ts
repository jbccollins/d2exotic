export enum EGroupById {
  DestinyClass = "DestinyClass", // Class => Armor Slot
  AdvancedDecryptionEngram = "AdvancedDecryptionEngram", // Advanced Decryption Engram => Class => Armor Slot
  None = "None", // Name
}

const GroupByIdToGroupByMapping = {
  [EGroupById.AdvancedDecryptionEngram]: {
    id: EGroupById.AdvancedDecryptionEngram,
    name: "Advanced Decryption Engram",
  },
  [EGroupById.DestinyClass]: {
    id: EGroupById.DestinyClass,
    name: "Class",
  },
  [EGroupById.None]: {
    id: EGroupById.None,
    name: "None (Order by Name)",
  },
};

export const getGroupBy = (id: EGroupById) => {
  return GroupByIdToGroupByMapping[id];
};

export const GroupByIdList = [
  EGroupById.AdvancedDecryptionEngram,
  EGroupById.DestinyClass,
  EGroupById.None,
];
