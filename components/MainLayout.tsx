"use client";
import Search from "@d2e/components/Search";
import useWindowSize from "@d2e/hooks/useWindowSize";
import SettingsIcon from "@mui/icons-material/Settings";
import { useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import ExoticList from "./ExoticList2";
import Settings from "./Settings";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

const largeScreenDrawerWidth = 300;
function MainLayout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { width: windowWidth } = useWindowSize();
  const smallScreenDrawerWidth = Math.min(400, windowWidth - 80);

  const drawerWidth = isSmallScreen
    ? smallScreenDrawerWidth
    : largeScreenDrawerWidth;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <SettingsIcon />
        <Box sx={{ marginLeft: theme.spacing(1) }}>Settings</Box>
      </Toolbar>
      <Divider />
      <Box className="settings-wrapper" sx={{ padding: theme.spacing(2) }}>
        <Settings />
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex", background: "black" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { sm: "none" } }}
            >
              <SettingsIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              D2 Exotic
            </Typography>
          </Box>
          <Search />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ExoticList />
      </Box>
    </Box>
  );
}

export default function ThemedLayout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <MainLayout />
    </ThemeProvider>
  );
}
