import { extendTheme, withDefaultColorScheme, IconButton } from "@chakra-ui/react"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"

export const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "purple",
  }),
  {
    fonts: {
      body: "Montserrat",
    },
    colors: {
      discord: "#7289da",
      helper: "rgb(153, 153, 153)",
      primary: "#722ED1",
      dark: {
        100: "rgba(255, 255, 255, 0.08)",
        200: "rgba(255, 255, 255, 0.16)",
        300: "rgba(255, 255, 255, 0.24)",
        400: "rgba(255, 255, 255, 0.32)",
      },
    },
    shadows: {
      largeSoft: "rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;",
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: 12,
        },
      },
    },
    styles: {
      
      global: {
        html: {
          scrollBehavior: "smooth",
          height: "100%",
        },
        body: {
          "-webkit-tap-highlight-color": "transparent"
        } ,
        ".body": {
          overflowY: "scroll", // Always show scrollbar to avoid flickering
        },
      },
    },
  }
)
