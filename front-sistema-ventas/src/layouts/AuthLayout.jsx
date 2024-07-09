import { Routes, Route,  } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
export const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
