import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";

type ShowRequiredDlcState = {
  value: boolean;
};

const initialState: ShowRequiredDlcState = {
  value: false,
};
export const showRequiredDlcSlice = createSlice({
  name: "showRequiredDlc",
  initialState,
  reducers: {
    setShowRequiredDlc: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setShowRequiredDlc } = showRequiredDlcSlice.actions;

export const selectShowRequiredDlc = (state: AppState) =>
  state.showRequiredDlc.value;

export default showRequiredDlcSlice.reducer;
