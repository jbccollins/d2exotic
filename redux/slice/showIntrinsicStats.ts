import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";

type ShowIntrinsicStatsState = {
  value: boolean;
};

const initialState: ShowIntrinsicStatsState = {
  value: false,
};
export const showIntrinsicStatsSlice = createSlice({
  name: "showIntrinsicStats",
  initialState,
  reducers: {
    setShowIntrinsicStats: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setShowIntrinsicStats } = showIntrinsicStatsSlice.actions;

export const selectShowIntrinsicStats = (state: AppState) =>
  state.showIntrinsicStats.value;

export default showIntrinsicStatsSlice.reducer;
