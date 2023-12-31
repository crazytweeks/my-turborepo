"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeightIcon from "@mui/icons-material/Height";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// import { CSSObject,  Theme, useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import useUiStore from "../../lib/store/uiStore";
import ThemeRegistry from "../Theme/ThemeRegistry";

// import WpMenus from "./WpMenus";

type DefaultLayoutProps = { children: ReactNode };

const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

const WpLayout = ({ children }: DefaultLayoutProps) => {
  // const theme = useTheme();
  const { setAppbarHeight, toolbarVariant, toggleToolbarVariant } =
    useUiStore();

  const appBarRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    if (!appBarRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (appBarRef?.current?.clientHeight)
        setAppbarHeight(appBarRef.current.clientHeight);
    });
    resizeObserver.observe(appBarRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [setAppbarHeight]);

  return (
    <ThemeRegistry>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open} ref={appBarRef}>
          <Toolbar
            variant={toolbarVariant}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography>

            <IconButton onClick={toggleToolbarVariant} aria-label="open drawer">
              <HeightIcon />
            </IconButton>

            {user ? (
              <>
                <Link href="/api/auth/logout">
                  <Tooltip title="Logout" placement="bottom" arrow>
                    <IconButton>
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </Link>

                {user.picture ? (
                  <Tooltip title={user.name} placement="bottom" arrow>
                    <Image
                      src={user.picture}
                      alt={user.name ?? "user"}
                      width={30}
                      height={30}
                    />
                  </Tooltip>
                ) : (
                  <span>{user.name}</span>
                )}
              </>
            ) : (
              <>
                <Link href="/api/auth/login">
                  <Tooltip title="Login" placement="bottom" arrow>
                    <IconButton>
                      <LoginIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
        {/* TODO: Enable this later */}
        {/* <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} 
                aria-label="close drawer"
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <WpMenus open={open} />
      </Drawer> */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            height: "100vh",
          }}
        >
          <Toolbar variant={toolbarVariant} />
          {children}
        </Box>
      </Box>
    </ThemeRegistry>
  );
};

export default WpLayout;
