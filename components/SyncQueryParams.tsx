"use client";
import { useAppDispatch } from "@d2e/redux/hooks";
import { queryParamInterpreterMapping } from "@d2e/types/QueryParamInterpreter";
import { useEffect } from "react";

export default function SyncQueryParams() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    // Sync query params with redux store
    let params = new URLSearchParams(window.location.search);
    Object.entries(queryParamInterpreterMapping).forEach(
      ([key, { decoder, setter }]) => {
        const value = params.get(key);
        if (value) {
          dispatch(setter(decoder(value)));
        }
      }
    );
  }, []);
  return false;
}
