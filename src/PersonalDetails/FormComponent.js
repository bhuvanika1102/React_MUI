import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { postFormData } from "../api/postFormData";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";
const FormComponent = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const { language } = useLanguage(); //get current language

  const t = translations[language].form;
  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postFormData(formValues);

      if (response.success) {
        setDialogMessage(t.success);
        setFormValues({ name: "", email: "", age: "" });
        setFormSubmitted(true);
      } else {
        setDialogMessage(t.failure + response.error.message);
      }
    } catch (error) {
      setDialogMessage(t.error);
    } finally {
      setLoading(false);
      setDialogOpen(true);
    }
  };

  const handleCancel = () => {
    setFormValues({ name: "", email: "", age: "" });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (formSubmitted) {
      navigate("/list");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          minHeight: 500,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          {t.title}
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "text.secondary", mb: 3 }}
        >
          {t.subtitle}
        </Typography>

        <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t.name}
                name="name"
                variant="outlined"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t.email}
                name="email"
                type="email"
                variant="outlined"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t.age}
                name="age"
                type="number"
                variant="outlined"
                value={formValues.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? t.submitting : t.submit}
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  {t.cancel}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{t.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {t.ok}
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default FormComponent;
