// 1. Import the extendTheme function
import { extendTheme, theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Extend the theme to include custom colors, fonts, etc
const themes = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {},
    },
  },
  colors: {
    brand: theme.colors.whatsapp,
    brandSec: theme.colors.purple,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {},
      sizes: {
        lg: {
          paddingY: 3,
          fontSize: "md",
        },
      },
      variants: {
        solid: (props) => ({
          backgroundColor: `${props.colorScheme}.500`,
          color: mode(undefined, "white")(props), //light , dark
        }),
        iconMenu: (props) => ({
          fontSize: "18px",
          svg: { color: mode("gray.400", "gray.500")(props) },
          borderRadius: "999",
          height: "20px",
          width: "20px",

          padding: "15px",

          _hover: {
            transform: "scale(1.2)",
            svg: { color: "gray.200" },
            color: "blue.600",
          },

          _active: {
            svg: { color: "blue.800" },
            bg: "gray.700",
          },
        }),
        drawer: (props) => ({
          bg: props.isActive ? "gray.600" : "gray.700",
          svg: {
            color: props.isActive ? "white" : "white",
          },
        }),
      },
    },
    Divider: {
      variants: {
        "lg-color": {
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: theme.colors.purple[400],
        },
        "md-color": {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: theme.colors.purple[300],
        },
      },
    },
  },
});

export default themes;
