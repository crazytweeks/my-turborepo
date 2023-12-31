import type { IconButtonPropsColorOverrides, Theme } from "@mui/material";
import React from "react";
import { Roboto } from "next/font/google";

import DarkSpacesTheme from "./DarkSpaces";
import GreenFieldsTheme from "./GreenFields";
import GreyGooseTheme from "./GreyGoose";
import NebulaFighterTheme from "./NebulaFighter";
import PureLightTheme from "./PureLight";
import PurpleFlowTheme from "./PurpleFlow";

type LogoColor =
  | "inherit"
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | IconButtonPropsColorOverrides
  | string;

const availableThemes = [
  "DarkSpaces",
  "GreenFields",
  "GreyGoose",
  "NebulaFighter",
  "PureLight",
  "PurpleFlow",
] as const;

type ThemeName = [(typeof availableThemes)[number]][number];

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function themeCreator(theme: ThemeName): Theme {
  const t = themeMap[theme] ?? DarkSpacesTheme;
  return {
    ...t,
    typography: {
      ...t.typography,
      fontFamily: roboto.style.fontFamily,
    },
    colors: {
      ...t.colors,
      logo: {
        primary: "inherit",
        secondary: "inherit",
        tertiary: "inherit",
        text: "inherit",
      },
    },
  };
}

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      logo: {
        primary: LogoColor;
        secondary: LogoColor;
        tertiary: LogoColor;
        text: LogoColor;
      };
      gradients: {
        blue1: string;
        blue2: string;
        blue3: string;
        blue4: string;
        blue5: string;
        orange1: string;
        orange2: string;
        orange3: string;
        purple1: string;
        purple3: string;
        pink1: string;
        pink2: string;
        green1: string;
        green2: string;
        black1: string;
        black2: string;
      };
      shadows: {
        success: string;
        error: string;
        primary: string;
        warning: string;
        info: string;
      };
      alpha: {
        white: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        trueWhite: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        black: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
      };
      secondary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      warning: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      info: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
    };
    general: {
      reactFrameworkColor: React.CSSProperties["color"];
      borderRadiusSm: string;
      borderRadius: string;
      borderRadiusLg: string;
      borderRadiusXl: string;
    };
    sidebar: {
      background: React.CSSProperties["color"];
      boxShadow: React.CSSProperties["color"];
      width: string;
      textColor: React.CSSProperties["color"];
      dividerBg: React.CSSProperties["color"];
      menuItemColor: React.CSSProperties["color"];
      menuItemColorActive: React.CSSProperties["color"];
      menuItemBg: React.CSSProperties["color"];
      menuItemBgActive: React.CSSProperties["color"];
      menuItemIconColor: React.CSSProperties["color"];
      menuItemIconColorActive: React.CSSProperties["color"];
      menuItemHeadingColor: React.CSSProperties["color"];
    };
    header: {
      height: string;
      background: React.CSSProperties["color"];
      boxShadow: React.CSSProperties["color"];
      textColor: React.CSSProperties["color"];
    };
  }

  interface ThemeOptions {
    colors: {
      gradients: {
        blue1: string;
        blue2: string;
        blue3: string;
        blue4: string;
        blue5: string;
        orange1: string;
        orange2: string;
        orange3: string;
        purple1: string;
        purple3: string;
        pink1: string;
        pink2: string;
        green1: string;
        green2: string;
        black1: string;
        black2: string;
      };
      shadows: {
        success: string;
        error: string;
        primary: string;
        warning: string;
        info: string;
      };
      alpha: {
        white: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        trueWhite: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        black: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
      };
      secondary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      warning: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      info: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
    };

    general: {
      reactFrameworkColor: React.CSSProperties["color"];
      borderRadiusSm: string;
      borderRadius: string;
      borderRadiusLg: string;
      borderRadiusXl: string;
    };
    sidebar: {
      background: React.CSSProperties["color"];
      boxShadow: React.CSSProperties["color"];
      width: string;
      textColor: React.CSSProperties["color"];
      dividerBg: React.CSSProperties["color"];
      menuItemColor: React.CSSProperties["color"];
      menuItemColorActive: React.CSSProperties["color"];
      menuItemBg: React.CSSProperties["color"];
      menuItemBgActive: React.CSSProperties["color"];
      menuItemIconColor: React.CSSProperties["color"];
      menuItemIconColorActive: React.CSSProperties["color"];
      menuItemHeadingColor: React.CSSProperties["color"];
    };
    header: {
      height: string;
      background: React.CSSProperties["color"];
      boxShadow: React.CSSProperties["color"];
      textColor: React.CSSProperties["color"];
    };
  }
}

const themeMap: { [key: string]: Theme } = {
  NebulaFighter: NebulaFighterTheme,
  DarkSpaces: DarkSpacesTheme,
  GreenFields: GreenFieldsTheme,
  PurpleFlow: PurpleFlowTheme,
  PureLight: PureLightTheme,
  GreyGoose: GreyGooseTheme,
};

export default themeCreator;
