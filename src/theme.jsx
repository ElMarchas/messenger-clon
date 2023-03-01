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
            svg: { color: mode("gray.600", "gray.200")(props) },
            color: "blue.600",
          },

          _active: {
            svg: { color: mode("gray.400", "gray.100")(props) },
            bg: mode("gray.200", "gray.800")(props),
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
    Card: {
      container: {
        backgroundColor: "#e7e7e7",
      },
      variants: {
        testList: (props) => ({
          container: {
            borderRadius: "8px",
          },
          body: {
            backgroundColor: mode("gray.100", "gray.600")(props),
            borderRadius: "8px",
            _hover: {
              transform: "scale(1.02)",
              backgroundColor: mode("gray.300", "gray.500")(props),
              cursor: "pointer",
            },
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
