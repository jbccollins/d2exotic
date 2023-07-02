import groupByIdReducer from "@d2e/redux/slice/groupById";
import searchReducer from "@d2e/redux/slice/search";
import showIntrinsicFocusReducer from "@d2e/redux/slice/showIntrinsicFocus";
import { configureStore } from "@reduxjs/toolkit";
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
    },
  });
}
const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;

export default store;
