import { createTheme } from "@material-ui/core";

const theme = createTheme( {
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1.1rem 0.02rem",
    },
    h2: {
      fontSize: "1.42rem",
      fontWeight: 400,
      margin: "1.1rem 0.02rem",
    },
    body1: {
      fontWeight: "normal",
    },
  },

  breakpoints: {
    values: {
   
      xs: 0,
      sm: 320,
      md: 700,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    primary: {
      main: "#088178",
    },

    text: {
      primary: "#111",
      secondary: "#333",
    },

    secondary: {
      main: "#208080",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
});

export default theme;
