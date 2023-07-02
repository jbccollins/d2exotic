import { useAppDispatch, useAppSelector } from "@d2e/redux/hooks";
import { selectSearch, setSearch } from "@d2e/redux/slice/search";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, useTheme } from "@mui/material";
import { useState } from "react";

export default function Search() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectSearch);
  const [focused, setFocused] = useState(false);

  const handleChange = (value: string) => {
    dispatch(setSearch(value));
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  let searchIconOpacity = 1 / value.length;
  if (value.length === 0 && !focused) {
    searchIconOpacity = 0.5;
  }
  if (searchIconOpacity < 0.1) {
    searchIconOpacity = 0;
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        size="small"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value)}
      />
      <SearchIcon
        sx={{
          pointerEvents: "none",
          position: "absolute",
          right: theme.spacing(4),
          opacity: searchIconOpacity,
          transition: "opacity 0.3s",
        }}
      />
    </Box>
  );
}
