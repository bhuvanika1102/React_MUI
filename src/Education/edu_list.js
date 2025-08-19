import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
} from "@mui/material";
import { getFormData } from "../education_api/getFormData";
import { useLanguage } from "../LanguageContext";

const EduListComponent = ({ onView, onEdit }) => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const t = {
    en: {
      breadcrumb: "Education Records",
      title: "Registered Education Details",
      noData: "No data found.",
      sslc: "SSLC (10th)",
      hsc: "HSC (12th)",
      college: "College / Degree",
      schoolName: "School Name",
      collegeName: "College Name",
      institution: "Institution",
      degree: "Degree",
      year: "Year",
      percentage: "Percentage",
      cgpa: "CGPA",
    },
    hi: {
      breadcrumb: "शिक्षा अभिलेख",
      title: "पंजीकृत शिक्षा विवरण",
      noData: "कोई डेटा नहीं मिला।",
      sslc: "SSLC (10वीं)",
      hsc: "HSC (12वीं)",
      college: "कॉलेज / डिग्री",
      schoolName: "विद्यालय का नाम",
      collegeName: "कॉलेज का नाम",
      institution: "संस्थान",
      degree: "डिग्री",
      year: "वर्ष",
      percentage: "प्रतिशत",
      cgpa: "सीजीपीए",
    },
  }[language]; //pick translations based on current language

  useEffect(() => {
    const fetchFormData = async () => {
      const response = await getFormData();
      if (response.success) {
        setFormData(response.data);
      } else {
        alert("Failed to fetch data: " + response.error.message);
      }
      setLoading(false);
    };

    fetchFormData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Typography color="text.primary">{t.breadcrumb}</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        {t.title}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : formData.length === 0 ? (
        <Typography>{t.noData}</Typography>
      ) : (
        <Paper sx={{ overflowX: "auto" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <strong>{t.sslc}</strong>
                </TableCell>
                <TableCell colSpan={3} align="center">
                  <strong>{t.hsc}</strong>
                </TableCell>
                <TableCell colSpan={4} align="center">
                  <strong>{t.college}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t.schoolName}</TableCell>
                <TableCell>{t.year}</TableCell>
                <TableCell>{t.percentage}</TableCell>

                <TableCell>{t.collegeName}</TableCell>
                <TableCell>{t.year}</TableCell>
                <TableCell>{t.percentage}</TableCell>

                <TableCell>{t.institution}</TableCell>
                <TableCell>{t.degree}</TableCell>
                <TableCell>{t.year}</TableCell>
                <TableCell>{t.cgpa}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {formData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sslc?.schoolName || "-"}</TableCell>
                  <TableCell>{item.sslc?.year || "-"}</TableCell>
                  <TableCell>{item.sslc?.percentage || "-"}</TableCell>

                  <TableCell>{item.hsc?.collegeName || "-"}</TableCell>
                  <TableCell>{item.hsc?.year || "-"}</TableCell>
                  <TableCell>{item.hsc?.percentage || "-"}</TableCell>

                  <TableCell>{item.college?.institution || "-"}</TableCell>
                  <TableCell>{item.college?.degree || "-"}</TableCell>
                  <TableCell>{item.college?.year || "-"}</TableCell>
                  <TableCell>{item.college?.cgpa || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};
export default EduListComponent;
