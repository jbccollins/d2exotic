import groupByIdReducer from "@d2e/redux/slice/groupById";
import searchReducer from "@d2e/redux/slice/search";
import showIntrinsicFocusReducer from "@d2e/redux/slice/showIntrinsicFocus";
import { configureStore } from "@reduxjs/toolkit";
import {
  syncQueryParamsToStore,
  syncStoreToQueryParams,
} from "./redux-url-params/reduxUrlParams";
import filterByHasIntrinsicFocus from "./slice/filterByHasIntrinsicFocus";
import filterByHasIntrinsicStats from "./slice/filterByHasIntrinsicStats";
import showExoticArmorPerkReducer from "./slice/showExoticArmorPerk";
import showIntrinsicStatsReducer from "./slice/showIntrinsicStats";
import showRequiredDlcReducer from "./slice/showRequiredDlc";
import showSourcesReducer from "./slice/showSources";

export function makeStore() {
  return configureStore({
    reducer: {
      search: searchReducer,
      groupById: groupByIdReducer,
      showIntrinsicFocus: showIntrinsicFocusReducer,
      showIntrinsicStats: showIntrinsicStatsReducer,
      showRequiredDlc: showRequiredDlcReducer,
      showSources: showSourcesReducer,
      showExoticArmorPerk: showExoticArmorPerkReducer,
      filterByHasIntrinsicFocus: filterByHasIntrinsicFocus,
      filterByHasIntrinsicStats: filterByHasIntrinsicStats,
    },
  });
}
const store = makeStore();

// TODO: Something about this sync stuff is breaking hot reloading
function handleChange() {
  // Lift the redux store up into the query params
  syncStoreToQueryParams(store.getState());
}

store.subscribe(handleChange);

// On initial load, pull the query params into the redux store
syncQueryParamsToStore(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
