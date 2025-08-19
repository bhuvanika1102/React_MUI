import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import FormComponent from "./PersonalDetails/FormComponent";
import ListComponent from "./PersonalDetails/ListComponent";
import ViewUser from "./PersonalDetails/ViewUser";
import EditPage from "./PersonalDetails/EditPage";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import EducationRegistration from "./Education/EducationRegistration";
import EduListComponent from "./Education/edu_list";

const App = () => {
  const [activePage, setActivePage] = useState("register");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/register" element={<FormComponent />} />
            <Route
              path="/list"
              element={
                <ListComponent
                  onView={(user) => {
                    setSelectedUser(user);
                    navigate("/view");
                  }}
                  onEdit={(user) => {
                    setEditingUser(user);
                    navigate("/edit");
                  }}
                />
              }
            />
            <Route
              path="/view"
              element={
                <ViewUser
                  user={selectedUser}
                  onBack={() => navigate("/list")}
                />
              }
            />
            <Route
              path="/edit"
              element={
                <EditPage
                  user={editingUser}
                  onBack={() => {
                    setEditingUser(null);
                    navigate("/list");
                  }}
                />
              }
            />
            <Route path="/edu-register" element={<EducationRegistration />} />
            <Route path="/edu-list" element={<EduListComponent />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;
