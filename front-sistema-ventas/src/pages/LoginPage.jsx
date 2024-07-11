import { LoginForm } from "../components/auth/LoginForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Authcontext";
import { Navigate, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const imagenes = [
    "https://http2.mlstatic.com/D_NQ_NP_2X_816025-MLU72748491987_112023-F.webp",
    "https://http2.mlstatic.com/D_NQ_NP_790654-MLA74307405630_022024-O.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_717038-MLU74337603599_022024-F.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_852598-MLU74290529283_012024-F.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_803059-MLA70970234420_082023-F.webp",
  ];

  const { login, state } = useContext(AuthContext);



  let isLogged = state.isLogged;
  let rol = state.user?.rol;

  const navigate = useNavigate();
  const randomImage = imagenes[Math.floor(Math.random() * imagenes.length)];

  const loginClick = (data) => {
    
    login(data);
  };


  useEffect(() => {
   if(isLogged && rol.includes("admin")) {
      navigate("/dashboard/admin");
    } 
    if(isLogged && rol.includes("seller")) {
      navigate("/dashboard/seller");
    }
    
  }, [isLogged]);






  return (
    <div className="login-container">
      <LoginForm loginClick={loginClick} randomImage={randomImage} />
    </div>
  );
};
