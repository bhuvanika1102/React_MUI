import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import { postFormData } from "../education_api/postFormData";
import { useLanguage } from "../LanguageContext";

const steps = [
  { id: "sslc", label: "SSLC (10th)" },
  { id: "hsc", label: "HSC (12th)" },
  { id: "college", label: "College / Degree" },
];

const translations = {
  en: {
    title: "Education Registration",
    steps: ["SSLC (10th)", "HSC (12th)", "College / Degree"],
    sslc: {
      schoolName: "School Name",
      year: "Year of Passing",
      percentage: "Percentage / Marks",
    },
    hsc: {
      collegeName: "School Name",
      year: "Year of Passing",
      percentage: "Percentage / Marks",
    },
    college: {
      institution: "Institution",
      degree: "Degree (e.g., B.Sc, B.Tech)",
      year: "Year of Passing",
      cgpa: "CGPA / Percentage",
    },
    next: "Next",
    back: "Back",
    submit: "Submit",
    submitting: "Submitting...",
    success: "All steps completed — your education details have been saved!",
    reset: "Reset",
  },
  hi: {
    title: "शिक्षा पंजीकरण",
    steps: ["एसएसएलसी (10वीं)", "एचएससी (12वीं)", "कॉलेज / डिग्री"],
    sslc: {
      schoolName: "विद्यालय का नाम",
      year: "उत्तीर्ण वर्ष",
      percentage: "प्रतिशत / अंक",
    },
    hsc: {
      collegeName: "विद्यालय का नाम",
      year: "उत्तीर्ण वर्ष",
      percentage: "प्रतिशत / अंक",
    },
    college: {
      institution: "संस्थान",
      degree: "डिग्री (जैसे, बी.एससी, बी.टेक)",
      year: "उत्तीर्ण वर्ष",
      cgpa: "सीजीपीए / प्रतिशत",
    },
    next: "आगे",
    back: "पीछे",
    submit: "जमा करें",
    submitting: "जमा हो रहा है...",
    success: "सभी चरण पूरे — आपकी शिक्षा विवरण सहेजे गए हैं!",
    reset: "रीसेट",
  },
};

const EducationRegistration = ({ onFinish }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const [form, setForm] = useState({
    sslc: { schoolName: "", year: "", percentage: "" },
    hsc: { collegeName: "", year: "", percentage: "" },
    college: { institution: "", degree: "", year: "", cgpa: "" },
  });

  const [loading, setLoading] = useState(false);

  const validateStep = (stepIndex) => {
    const stepKey = steps[stepIndex].id;
    const values = form[stepKey];
    return Object.values(values).every((v) => v !== "");
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) {
      alert("Please fill all required fields in this step.");
      return;
    }
    setActiveStep((s) => s + 1);
  };

  const handleBack = () => setActiveStep((s) => s - 1);

  const handleReset = () => {
    setActiveStep(0);
    setForm({
      sslc: { schoolName: "", year: "", percentage: "" },
      hsc: { collegeName: "", year: "", percentage: "" },
      college: { institution: "", degree: "", year: "", cgpa: "" },
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) {
      alert(
        language === "en"
          ? "Please fill all required fields in this step."
          : "कृपया इस चरण में सभी आवश्यक फ़ील्ड भरें।"
      );
      return;
    }
    setLoading(true);
    try {
      const result = await postFormData(form);
      setLoading(false);
      if (result.success) {
        alert(
          (language === "en"
            ? "Education details saved successfully! Document ID: "
            : "शिक्षा विवरण सफलतापूर्वक सहेजे गए! दस्तावेज़ आईडी: ") + result.id
        );
        if (onFinish) onFinish(form);
        setActiveStep((s) => s + 1); // Move to completion step
      } else {
        alert(
          language === "en"
            ? "Failed to save education details. Please try again."
            : "शिक्षा विवरण सहेजने में विफल। कृपया पुनः प्रयास करें।"
        );
      }
    } catch (error) {
      setLoading(false);
      alert(
        (language === "en"
          ? "An unexpected error occurred: "
          : "एक अप्रत्याशित त्रुटि हुई: ") + error.message
      );
    }
  };

  const handleChange = (stepId, field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [stepId]: { ...prev[stepId], [field]: e.target.value },
    }));
  };

  return (
    <Box sx={{ maxWidth: 700, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t.title}
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>{t.steps[0]}</StepLabel>
          <StepContent>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <TextField
                label={t.sslc.schoolName}
                value={form.sslc.schoolName}
                onChange={handleChange("sslc", "schoolName")}
                fullWidth
                required
              />
              <TextField
                label={t.sslc.year}
                value={form.sslc.year}
                onChange={handleChange("sslc", "year")}
                fullWidth
                required
              />
              <TextField
                label={t.sslc.percentage}
                value={form.sslc.percentage}
                onChange={handleChange("sslc", "percentage")}
                fullWidth
                required
              />
            </Stack>
            <Box>
              <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                {t.next}
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>{t.steps[1]}</StepLabel>
          <StepContent>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <TextField
                label={t.hsc.collegeName}
                value={form.hsc.collegeName}
                onChange={handleChange("hsc", "collegeName")}
                fullWidth
                required
              />
              <TextField
                label={t.hsc.year}
                value={form.hsc.year}
                onChange={handleChange("hsc", "year")}
                fullWidth
                required
              />
              <TextField
                label={t.hsc.percentage}
                value={form.hsc.percentage}
                onChange={handleChange("hsc", "percentage")}
                fullWidth
                required
              />
            </Stack>
            <Box>
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                {t.back}
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {t.next}
              </Button>
            </Box>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>{t.steps[2]}</StepLabel>
          <StepContent>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <TextField
                label={t.college.institution}
                value={form.college.institution}
                onChange={handleChange("college", "institution")}
                fullWidth
                required
              />
              <TextField
                label={t.college.degree}
                value={form.college.degree}
                onChange={handleChange("college", "degree")}
                fullWidth
                required
              />
              <TextField
                label={t.college.year}
                value={form.college.year}
                onChange={handleChange("college", "year")}
                fullWidth
                required
              />
              <TextField
                label={t.college.cgpa}
                value={form.college.cgpa}
                onChange={handleChange("college", "cgpa")}
                fullWidth
                required
              />
            </Stack>

            <Box>
              <Button onClick={handleBack} sx={{ mr: 1 }} disabled={loading}>
                {t.back}
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? t.submitting : t.submit}
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>

      {activeStep === 3 && (
        <Paper elevation={0} sx={{ p: 3, bgcolor: "transparent" }}>
          <Typography variant="h6" align="center" color="success.main">
            {t.success}
          </Typography>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button onClick={handleReset}>{t.reset}</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default EducationRegistration;
