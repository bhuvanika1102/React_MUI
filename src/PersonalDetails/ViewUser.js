import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { getUserById } from "../api/getUserById";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

const ViewUser = ({ user, onBack }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage(); //get current language

  const t = translations[language].view;

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user?.id) return;

      const response = await getUserById(user.id);
      if (response.success) {
        setUserDetails(response.data);
      } else {
        alert(t.error + response.error.message);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [user, language]); //re-run if language changes (for alert text)

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (!userDetails) return <Typography>{t.noData}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={onBack}
          sx={{ cursor: "pointer" }}
        >
          {t.breadcrumbUsers}
        </Link>
        <Typography color="text.primary">{t.breadcrumbView}</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          {t.title}
        </Typography>
        <Typography>
          <strong>{t.name}:</strong> {userDetails.name}
        </Typography>
        <Typography>
          <strong>{t.email}:</strong> {userDetails.email}
        </Typography>
        <Typography>
          <strong>{t.age}:</strong> {userDetails.age}
        </Typography>
        <Box mt={3}>
          <Button variant="outlined" onClick={onBack}>
            {t.back}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ViewUser;
