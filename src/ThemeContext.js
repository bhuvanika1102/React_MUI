import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "rgb(117, 116, 116)",
                  paper: "#121212", // cards/paper slightly lighter
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#aaaaaa",
                },
                icons: {
                  action: "#888888", // grey in dark mode
                },
              }
            : {
                background: {
                  default: "#f5f5f5", // light gray background
                  paper: "#ffffff",
                },
              }),
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiInputBase-input": {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: 6,
                  padding: "10px",
                },
                "& .MuiInputLabel-root": {
                  color: mode === "dark" ? "#ddd" : "#555",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "dark" ? "#888" : "#ccc",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* ensures background + text colors apply globally */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
