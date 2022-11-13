import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#E3F2F9",
      100: "#fff",
      200: "#f7fffd",
      300: "#91ffe7",
      400: "#2bffd2",
      500: "#00C49A",
      600: "#00c49a",
      700: "#005e4a",
      800: "#005885",
      900: "#003F5E",
    },
    secondary: {
      500: "#3D3B8E",
    },
  },
  fontConfig: {
    Barlow: {
      300: {
        normal: "Barlow_300Light",
      },
      400: {
        normal: "Barlow_400Regular",
      },
      500: {
        normal: "Barlow_500Medium",
      },
      600: {
        normal: "Barlow_600Semibold",
      },
      700: {
        normal: "Barlow_700Bold",
      },
    },
  },
  fonts: {
    heading: "Barlow",
    body: "Barlow",
    mono: "Barlow",
  },
  config: {
    initialColorMode: "dark",
  },
});
