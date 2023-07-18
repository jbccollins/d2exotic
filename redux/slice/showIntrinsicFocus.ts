import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";

type ShowIntrinsicFocusState = {
  value: boolean;
};

const initialState: ShowIntrinsicFocusState = {
  value: false,
};
export const showIntrinsicFocusSlice = createSlice({
  name: "showIntrinsicFocus",
  initialState,
  reducers: {
    setShowIntrinsicFocus: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setShowIntrinsicFocus } = showIntrinsicFocusSlice.actions;

export const selectShowIntrinsicFocus = (state: AppState) =>
  state.showIntrinsicFocus.value;

export default showIntrinsicFocusSlice.reducer;
