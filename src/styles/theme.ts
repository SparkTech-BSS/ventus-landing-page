import { Theme, extendTheme } from "@chakra-ui/react";

// @ts-ignore
const customTheme = {
  colors: {
    brand: {
      "800": "#FF5555",
      "900": "#c83b3b",
    },
  },

  fonts: {
    heading: "Inter",
    body: "Inter",
  },

  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
} as Theme;

export const theme = extendTheme(customTheme);
