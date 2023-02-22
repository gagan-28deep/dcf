import { createTheme } from '@mui/material/styles';
import { red, green, blue, common } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  // direction: dir,
  typography: {
    fontSize: 15,
    fontFamily: [
      "Inter-Regular"
    ].join(",")
  },
  palette: {
    primary: {
      main: '#76B757',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#76B757',
      contrastText: '#FFFFFF'
    },
    default: {
      main: blue.A400
    },
    error: {
      main: "#dc3545"
    },
    background: {
      default: common.white
    },
    light: {
      main: common.white
    },
    transparent: 'transparent',
    solid: '#969ba1'

  },
  overrides: {
    MuiFormControl: {
      root: {
        marginTop: "0.5rem",
        marginBottom: "0.5rem"
      }
    },
    MuiDialog: {
      root: {
        alignItems: "flex-end"
      },
      container: {
        margin: 0,
        maxWidth: "100%",
        width: "100%"
      }
    }
  }
});

export default theme;
