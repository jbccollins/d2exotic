import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";

type FilterByHasIntrinsicStatsState = {
  value: boolean;
};

const initialState: FilterByHasIntrinsicStatsState = {
  value: false,
};
export const filterByHasIntrinsicStatsSlice = createSlice({
  name: "filterByHasIntrinsicStats",
  initialState,
  reducers: {
    setFilterByHasIntrinsicStats: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilterByHasIntrinsicStats } =
  filterByHasIntrinsicStatsSlice.actions;

export const selectFilterByHasIntrinsicStats = (state: AppState) =>
  state.filterByHasIntrinsicStats.value;

export default filterByHasIntrinsicStatsSlice.reducer;
