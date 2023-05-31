import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      "50": "#fae9ee",
      "100": "#f4c6d6",
      "200": "#eea4bb",
      "300": "#ec82a2",
      "400": "#ec698d",
      "500": "#ee577a",
      "600": "#dc5275",
      "700": "#c54c6f",
      "800": "#b04669",
      "900": "#8b3c5e",
      main: "#eea4bb",
      contrastText: "#ffffff",
    },
    secondary: {
      "50": "#fbfafa",
      "100": "#f6f4f4",
      "200": "#eeeded",
      "300": "#e0dfdf",
      "400": "#bdbcbc",
      "500": "#9e9d9d",
      "600": "#757474",
      "700": "#616060",
      "800": "#424141",
      "900": "#212020",
      main: "#212020",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#000000",
    },

    error: {
      main: "#ff4747",
    },
  },
  typography: {
    allVariants: {
      color: "#ffffff",
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        },
      },
    },
  },
});
