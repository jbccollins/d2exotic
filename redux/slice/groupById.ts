import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";
import { EGroupById } from "@d2e/types/GroupBy";

type GroupByIdState = {
  value: EGroupById;
};

const initialState: GroupByIdState = {
  value: EGroupById.AdvancedDecryptionEngram,
};
export const groupByIdSlice = createSlice({
  name: "groupById",
  initialState,
  reducers: {
    setGroupById: (state, action: PayloadAction<EGroupById>) => {
      state.value = action.payload;
    },
  },
});

export const { setGroupById } = groupByIdSlice.actions;

export const selectGroupById = (state: AppState) => state.groupById.value;

export default groupByIdSlice.reducer;
