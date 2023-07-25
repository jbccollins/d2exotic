import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";

type FilterByHasIntrinsicFocusState = {
  value: boolean;
};

const initialState: FilterByHasIntrinsicFocusState = {
  value: false,
};
export const filterByHasIntrinsicFocusSlice = createSlice({
  name: "filterByHasIntrinsicFocus",
  initialState,
  reducers: {
    setFilterByHasIntrinsicFocus: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilterByHasIntrinsicFocus } =
  filterByHasIntrinsicFocusSlice.actions;

export const selectFilterByHasIntrinsicFocus = (state: AppState) =>
  state.filterByHasIntrinsicFocus.value;

export default filterByHasIntrinsicFocusSlice.reducer;
