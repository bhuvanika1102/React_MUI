import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { updateFormData } from "../api/updateFormData";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

const EditPage = ({ user, onBack }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const { language } = useLanguage();
  const t = translations[language].edit;

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const response = await updateFormData(user.id, formValues);
    setSaving(false);

    if (response.success) {
      setDialogMessage(t.success);
    } else {
      setDialogMessage(t.failure + response.error.message);
    }

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (
      dialogMessage.includes("successfully") ||
      dialogMessage.includes("सफलतापूर्वक")
    ) {
      onBack();
    }
  };

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          {t.message}
        </Typography>
        <Button variant="outlined" onClick={onBack} sx={{ mt: 2 }}>
          {t.backButton}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={onBack}
          sx={{ cursor: "pointer" }}
        >
          {t.breadcrumb_User}
        </Link>
        <Typography color="text.primary">{t.breadcrumb_viewUser}</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          {t.title}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label={t.name}
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t.mail}
            name="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t.age}
            name="age"
            type="number"
            value={formValues.age}
            onChange={handleChange}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? t.saving : t.save}
            </Button>
            <Button variant="outlined" onClick={onBack}>
              {t.cancel}
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{t.updateStatus}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {t.ok}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditPage;
