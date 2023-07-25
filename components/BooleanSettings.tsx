import { useAppDispatch, useAppSelector } from "@d2e/redux/hooks";
import {
  selectFilterByHasIntrinsicFocus,
  setFilterByHasIntrinsicFocus,
} from "@d2e/redux/slice/filterByHasIntrinsicFocus";
import {
  selectFilterByHasIntrinsicStats,
  setFilterByHasIntrinsicStats,
} from "@d2e/redux/slice/filterByHasIntrinsicStats";
import {
  selectShowExoticArmorPerk,
  setShowExoticArmorPerk,
} from "@d2e/redux/slice/showExoticArmorPerk";
import {
  selectShowIntrinsicFocus,
  setShowIntrinsicFocus,
} from "@d2e/redux/slice/showIntrinsicFocus";
import {
  selectShowIntrinsicStats,
  setShowIntrinsicStats,
} from "@d2e/redux/slice/showIntrinsicStats";
import {
  selectShowRequiredDlc,
  setShowRequiredDlc,
} from "@d2e/redux/slice/showRequiredDlc";
import {
  selectShowSources,
  setShowSources,
} from "@d2e/redux/slice/showSources";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
} from "@mui/material";

type BooleanSetting = {
  name: string;
  value: boolean;
  handleChange: (value: boolean) => { payload: boolean; type: any };
};
export default function BooleanSettings() {
  const dispatch = useAppDispatch();
  const showIntrinsicFocus = useAppSelector(selectShowIntrinsicFocus);
  const showIntrinsicStats = useAppSelector(selectShowIntrinsicStats);
  const showRequiredDlc = useAppSelector(selectShowRequiredDlc);
  const showSources = useAppSelector(selectShowSources);
  const showExoticArmorPerk = useAppSelector(selectShowExoticArmorPerk);
  const filterByHasIntrinsicFocus = useAppSelector(
    selectFilterByHasIntrinsicFocus
  );
  const filterByHasIntrinsicStats = useAppSelector(
    selectFilterByHasIntrinsicStats
  );

  const theme = useTheme();
  const booleanSettings: BooleanSetting[] = [
    {
      name: "Show Exotic Armor Perk",
      value: showExoticArmorPerk,
      handleChange: (value: boolean) => dispatch(setShowExoticArmorPerk(value)),
    },
    {
      name: "Show Intrinsic Focus",
      value: showIntrinsicFocus,
      handleChange: (value: boolean) => dispatch(setShowIntrinsicFocus(value)),
    },
    {
      name: "Show Intrinsic Stats",
      value: showIntrinsicStats,
      handleChange: (value: boolean) => dispatch(setShowIntrinsicStats(value)),
    },
    {
      name: "Show Required DLC",
      value: showRequiredDlc,
      handleChange: (value: boolean) => dispatch(setShowRequiredDlc(value)),
    },
    {
      name: "Show Sources",
      value: showSources,
      handleChange: (value: boolean) => dispatch(setShowSources(value)),
    },
  ];

  const booleanFilters: BooleanSetting[] = [
    {
      name: "Filter By Items With Intrinsic Focus",
      value: filterByHasIntrinsicFocus,
      handleChange: (value: boolean) => {
        if (value) {
          dispatch(setShowIntrinsicFocus(value));
        }
        return dispatch(setFilterByHasIntrinsicFocus(value));
      },
    },
    {
      name: "Filter By Items With Intrinsic Stats",
      value: filterByHasIntrinsicStats,
      handleChange: (value: boolean) => {
        if (value) {
          dispatch(setShowIntrinsicStats(value));
        }
        return dispatch(setFilterByHasIntrinsicStats(value));
      },
    },
  ];
  return (
    <FormGroup
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {booleanSettings.map((setting: BooleanSetting) => {
        return (
          <FormControlLabel
            key={setting.name}
            label={setting.name}
            // sx={{
            //   marginTop: theme.spacing(1),
            // }}
            control={
              <Checkbox
                checked={setting.value}
                onChange={(e) => setting.handleChange(e.target.checked)}
              />
            }
          />
        );
      })}
      <Box sx={{ marginTop: "16px", fontSize: "18px", fontWeight: "bold" }}>
        Filters
      </Box>
      {booleanFilters.map((setting: BooleanSetting) => {
        return (
          <FormControlLabel
            key={setting.name}
            label={setting.name}
            // sx={{
            //   marginTop: theme.spacing(1),
            // }}
            control={
              <Checkbox
                checked={setting.value}
                onChange={(e) => setting.handleChange(e.target.checked)}
              />
            }
          />
        );
      })}
    </FormGroup>
  );
}
