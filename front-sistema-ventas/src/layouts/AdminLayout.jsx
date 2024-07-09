import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { DashboardAdminPage } from "../pages/DashboardAdminPage.jsx";
import { DashboardSellerPage } from "../pages/DashboardSellerPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/Authcontext.jsx";

export const AdminLayout = () => {
  const { state } = useContext(AuthContext);

  const rol = state.user.rol;

  return (
    <Routes>
      
      <Route path="/" element={<DashboardAdminPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
    

    </Routes>
  );
};
