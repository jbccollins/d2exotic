import { setGroupById } from "@d2e/redux/slice/groupById";
import { setSearch } from "@d2e/redux/slice/search";
import { setShowExoticArmorPerk } from "@d2e/redux/slice/showExoticArmorPerk";
import { setShowIntrinsicFocus } from "@d2e/redux/slice/showIntrinsicFocus";
import { setShowIntrinsicStats } from "@d2e/redux/slice/showIntrinsicStats";
import { setShowRequiredDlc } from "@d2e/redux/slice/showRequiredDlc";
import { setShowSources } from "@d2e/redux/slice/showSources";
import { AppDispatch, AppState } from "@d2e/redux/store";
import { EGroupById } from "@d2e/types/GroupBy";
import { AnyAction } from "@reduxjs/toolkit";

// Exclude any properties that are not query params
// from this Pick type
type AppStateQueryParams = Pick<
  AppState,
  | "search"
  | "groupById"
  | "showIntrinsicFocus"
  | "showIntrinsicStats"
  | "showRequiredDlc"
  | "showSources"
  | "showExoticArmorPerk"
>;

type QueryParamInterpreter<T> = {
  decodeFromQueryParam: (value: string) => T;
  encodeToQueryParam: (value: T) => string;
  reduxSetterAction: (value: T) => AnyAction; // TODO: This could be typed better
  defaultValue?: T;
  queryParamKey?: string;
};

type QueryParamInterpreterMapping<T extends AppStateQueryParams> = {
  [K in keyof T]: QueryParamInterpreter<T[K]>;
};

// TODO: I can't figure out how to get this to work with the stuff below
// type QueryParamInterpreterMapping2 = {
//   [K in keyof AppStateQueryParams]: QueryParamInterpreter<AppStateQueryParams[K]["value"]>;
// };

const asValue = <T>(value: T) => ({ value });

const booleanQueryParamInterpreter = {
  decodeFromQueryParam: (value: string) =>
    asValue(value.toLowerCase() === "true"),
  encodeToQueryParam: (v: { value: boolean }) => v.value.toString(),
  defaultValue: asValue(false),
};

const queryParamInterpreterMapping: QueryParamInterpreterMapping<AppStateQueryParams> =
  {
    search: {
      decodeFromQueryParam: (value: string) => asValue(value),
      encodeToQueryParam: (v: { value: string }) => v.value,
      reduxSetterAction: ({ value }) => setSearch(value),
      queryParamKey: "s",
      defaultValue: asValue(""),
    },
    groupById: {
      decodeFromQueryParam: (value: string) => asValue(value as EGroupById),
      encodeToQueryParam: (v: { value: EGroupById }) => v.value,
      reduxSetterAction: ({ value }) => setGroupById(value),
      queryParamKey: "group",
      defaultValue: asValue(EGroupById.AdvancedDecryptionEngram),
    },
    showIntrinsicFocus: {
      ...booleanQueryParamInterpreter,
      reduxSetterAction: ({ value }) => setShowIntrinsicFocus(value),
      queryParamKey: "focus",
      defaultValue: asValue(true),
    },
    showIntrinsicStats: {
      ...booleanQueryParamInterpreter,
      reduxSetterAction: ({ value }) => setShowIntrinsicStats(value),
      queryParamKey: "stats",
    },
    showRequiredDlc: {
      ...booleanQueryParamInterpreter,
      reduxSetterAction: ({ value }) => setShowRequiredDlc(value),
      queryParamKey: "dlc",
    },
    showSources: {
      ...booleanQueryParamInterpreter,
      reduxSetterAction: ({ value }) => setShowSources(value),
      queryParamKey: "sources",
    },
    showExoticArmorPerk: {
      ...booleanQueryParamInterpreter,
      reduxSetterAction: ({ value }) => setShowExoticArmorPerk(value),
      queryParamKey: "perk",
    },
  };

// Store => Url
const _syncStoreToQueryParams = <T extends AppStateQueryParams>(
  store: T,
  mapping: QueryParamInterpreterMapping<T>
) => {
  if (typeof window === "undefined") {
    return;
  }
  const locationParams = new URLSearchParams();
  // Adds query params to the url and updates history
  for (const key in mapping) {
    const { encodeToQueryParam, queryParamKey, defaultValue } = mapping[key];
    if (
      defaultValue &&
      // God I need to fix the typings :(
      (store[key] as any)["value"] === (defaultValue as any)["value"]
    ) {
      continue;
    }
    const encodedQueryParam = encodeToQueryParam(store[key]);

    locationParams.set(queryParamKey ? queryParamKey : key, encodedQueryParam);
  }
  const newUrl = new URL(window.location.href);
  newUrl.search = locationParams.toString();
  // TODO: This isn't working correctly. It only allows one press of the back button
  // and even then it does like a hard refresh of the page :(
  window.history.pushState({}, "", newUrl.toString());
};

export const syncStoreToQueryParams = (store: AppState) => {
  _syncStoreToQueryParams(store, queryParamInterpreterMapping);
};

// Url => Store
const _syncQueryParamsToStore = <T extends AppStateQueryParams>(
  dispatch: (action: AnyAction) => void,
  mapping: QueryParamInterpreterMapping<T>
): void => {
  if (typeof window === "undefined") {
    return;
  }
  const locationParams = new URLSearchParams(window.location.search);
  // Adds query params to the url and updates history
  for (const key in mapping) {
    const queryParamKey = mapping[key].queryParamKey ?? key;
    const value = locationParams.get(queryParamKey);
    if (value === null) {
      continue;
    }
    const decodedQueryParam = mapping[key].decodeFromQueryParam(value);
    dispatch(mapping[key].reduxSetterAction(decodedQueryParam));
  }
};

export const syncQueryParamsToStore = (dispatch: AppDispatch) => {
  _syncQueryParamsToStore(dispatch, queryParamInterpreterMapping);
};
