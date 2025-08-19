import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  useTheme,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const theme = useTheme();

  const handleNav = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  const menuItems = [
    {
      title: language === "en" ? "Personal Details" : "व्यक्तिगत विवरण",
      children: [
        {
          label: language === "en" ? "Register" : "रजिस्टर",
          value: "register",
        },
        { label: language === "en" ? "List" : "सूची", value: "list" },
      ],
    },
    {
      title: language === "en" ? "Education Details" : "शिक्षा विवरण",
      children: [
        {
          label: language === "en" ? "Register" : "रजिस्टर",
          value: "edu-register",
        },
        { label: language === "en" ? "List" : "सूची", value: "edu-list" },
      ],
    },
  ];

  const [openParents, setOpenParents] = useState({});
  const toggleParent = (title) => {
    setOpenParents((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const sidebarBg =
    theme.palette.mode === "light"
      ? theme.palette.primary.main // blue in light mode
      : theme.palette.background.paper; // dark mode uses paper
  const sidebarText =
    theme.palette.mode === "light"
      ? theme.palette.primary.contrastText // white on blue
      : theme.palette.text.primary;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          bgcolor: sidebarBg,
          color: sidebarText,
        },
      }}
    >
      <Typography variant="h6" sx={{ m: 2, color: sidebarText }}>
        {language === "en" ? "Menu" : "मेनू"}
      </Typography>

      <List>
        {menuItems.map((section) => (
          <React.Fragment key={section.title}>
            <ListItemButton
              onClick={() => toggleParent(section.title)}
              sx={{
                color: sidebarText,
                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "light"
                      ? theme.palette.primary.dark
                      : theme.palette.action.hover,
                },
              }}
            >
              <ListItemText primary={section.title} />
              {openParents[section.title] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse
              in={openParents[section.title]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {section.children.map((item) => (
                  <ListItemButton
                    key={item.value}
                    onClick={() => handleNav(item.value)}
                    selected={activePage === item.value}
                    sx={{
                      pl: 4,
                      color: sidebarText,
                      "&.Mui-selected": {
                        bgcolor:
                          theme.palette.mode === "light"
                            ? theme.palette.primary.dark
                            : "grey.500",
                        color:
                          theme.palette.mode === "light"
                            ? theme.palette.primary.contrastText
                            : sidebarText,
                        "&:hover": {
                          bgcolor:
                            theme.palette.mode === "light"
                              ? theme.palette.primary.dark
                              : "grey.600",
                          color:
                            theme.palette.mode === "light"
                              ? theme.palette.primary.contrastText
                              : "#ffffff",
                        },
                      },
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "light"
                            ? theme.palette.primary.dark
                            : theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
