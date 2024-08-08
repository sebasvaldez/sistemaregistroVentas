import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { DashboardAdminPage } from "../pages/DashboardAdminPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx";

export const AdminLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardAdminPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
