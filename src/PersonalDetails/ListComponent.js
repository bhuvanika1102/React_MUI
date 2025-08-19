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
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { getFormData } from "../api/getFormData";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "@mui/material/styles";
import translations from "../translations";
const ListComponent = ({ onView, onEdit }) => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage(); //get current language

  //Translation dictionary
  const t = translations[language].list;

  const theme = useTheme(); //get current theme
  const iconColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[500] //grey in dark mode
      : theme.palette.primary.main; //blue in light mode

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>{t.name}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t.email}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t.age}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t.actions}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onView(item)}>
                      <VisibilityIcon sx={{ color: iconColor }} />
                    </IconButton>
                    <IconButton color="primary" onClick={() => onEdit(item)}>
                      <EditIcon sx={{ color: iconColor }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default ListComponent;
