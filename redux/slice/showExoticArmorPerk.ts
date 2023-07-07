import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "@d2e/redux/store";

type ShowExoticArmorPerkState = {
  value: boolean;
};

const initialState: ShowExoticArmorPerkState = {
  value: false,
};
export const showExoticArmorPerkSlice = createSlice({
  name: "showExoticArmorPerk",
  initialState,
  reducers: {
    setShowExoticArmorPerk: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setShowExoticArmorPerk } = showExoticArmorPerkSlice.actions;

export const selectShowExoticArmorPerk = (state: AppState) =>
  state.showExoticArmorPerk.value;

export default showExoticArmorPerkSlice.reducer;
