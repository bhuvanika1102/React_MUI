import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import UserMenu from "./UserMenu";
import { useLanguage } from "./LanguageContext";
import { useThemeContext } from "./ThemeContext";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const { mode, toggleTheme } = useThemeContext();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {language === "en" ? "Sample Task" : "नमूना कार्य"}
        </Typography>

        <Box>
          <IconButton color="inherit" onClick={toggleLanguage}>
            <TranslateIcon />
          </IconButton>

          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
