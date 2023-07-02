import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";

type ShowSourcesState = {
  value: boolean;
};

const initialState: ShowSourcesState = {
  value: false,
};
export const showSourcesSlice = createSlice({
  name: "showSources",
  initialState,
  reducers: {
    setShowSources: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setShowSources } = showSourcesSlice.actions;

export const selectShowSources = (state: AppState) => state.showSources.value;

export default showSourcesSlice.reducer;
