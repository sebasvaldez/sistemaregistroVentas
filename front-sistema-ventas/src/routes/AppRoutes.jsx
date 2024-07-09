import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthContext } from "../contexts/Authcontext";
import { AdminLayout } from "../layouts/AdminLayout";
import { SellerLayout } from "../layouts/SellerLayout";
import { NotFound } from "../components/notFound/NotFound";
import { LoginPage } from "../pages/LoginPage";

export const AppRoutes = () => {
  const { state, checkToken } = useContext(AuthContext);

  const isLogged = state.isLogged;
  const rol = state.user?.rol;

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
      <Route
        path="/dashboard/admin/*"
        element={
          <PrivateRoutes isLogged={isLogged && rol.includes("admin")}>
            <AdminLayout />
          </PrivateRoutes>
        }
      />
      <Route
        path="/dashboard/seller/*"
        element={
          <PrivateRoutes isLogged={isLogged && rol.includes("seller")}>
            <SellerLayout />
          </PrivateRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
