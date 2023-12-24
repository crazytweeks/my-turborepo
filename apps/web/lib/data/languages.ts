import * as locales from "@mui/material/locale";

type SupportedLocales = keyof typeof locales;

type Locale = {
  locale: SupportedLocales;
  label: string;
  flag: string;
  muiLocale: locales.Localization;
};

var languages: Locale[] = [
  {
    locale: "enUS",
    label: "English",
    flag: "us",
    muiLocale: locales.enUS,
  },
];

export default languages;
