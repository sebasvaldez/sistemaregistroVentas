import { Navigate, useRoutes, Outlet } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "../providers/AuthProvider";

export const PublicRoutes = ({ children, isLogged,rol }) => {
 
  if (!isLogged) {
  
 return children;
  }
};
