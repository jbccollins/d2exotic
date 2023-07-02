import { useAppDispatch, useAppSelector } from "@d2e/redux/hooks";
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
import { Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";

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

  const theme = useTheme();
  const booleanSettings: BooleanSetting[] = [
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
    </FormGroup>
  );
}
