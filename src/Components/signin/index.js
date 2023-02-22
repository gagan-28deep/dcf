import * as React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const index = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="off"
        autoFocus
        color="success"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        color="success"
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="off"
      />
    </ThemeProvider>
  );
};

export default index;
