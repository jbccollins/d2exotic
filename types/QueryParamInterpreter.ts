import { setGroupById } from "@d2e/redux/slice/groupById";
import { setSearch } from "@d2e/redux/slice/search";
import { setShowExoticArmorPerk } from "@d2e/redux/slice/showExoticArmorPerk";
import { setShowIntrinsicFocus } from "@d2e/redux/slice/showIntrinsicFocus";
import { setShowIntrinsicStats } from "@d2e/redux/slice/showIntrinsicStats";
import { setShowRequiredDlc } from "@d2e/redux/slice/showRequiredDlc";
import { setShowSources } from "@d2e/redux/slice/showSources";
import { AppState } from "@d2e/redux/store";
import { AnyAction } from "@reduxjs/toolkit";
import { EGroupById } from "./GroupBy";

type QueryParamInterpreter = {
  decoder: (value: string) => any;
  encoder: (value: any) => string;
  setter: (value: any) => AnyAction;
};

const booleanQueryParamInterpreter = {
  decoder: (value: string) => value === "true",
  encoder: (value: boolean) => value.toString(),
};

export const queryParamInterpreterMapping: Record<
  keyof AppState,
  QueryParamInterpreter
> = {
  search: {
    decoder: (value: string) => value,
    encoder: (value: string) => value,
    setter: setSearch,
  },
  groupById: {
    decoder: (value: string) => value as EGroupById,
    encoder: (value: string) => value as string,
    setter: setGroupById,
  },
  showIntrinsicFocus: {
    ...booleanQueryParamInterpreter,
    setter: setShowIntrinsicFocus,
  },
  showIntrinsicStats: {
    ...booleanQueryParamInterpreter,
    setter: setShowIntrinsicStats,
  },
  showRequiredDlc: {
    ...booleanQueryParamInterpreter,
    setter: setShowRequiredDlc,
  },
  showSources: {
    ...booleanQueryParamInterpreter,
    setter: setShowSources,
  },
  showExoticArmorPerk: {
    ...booleanQueryParamInterpreter,
    setter: setShowExoticArmorPerk,
  },
};
