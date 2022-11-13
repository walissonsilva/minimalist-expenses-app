import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#00C49A",
      600: "#007AB8",
      700: "#006BA1",
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
