import { useContext } from "react";
import { AuthContext } from "../../contexts/Authcontext";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";

export const AdminProfile = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(state.user);
  return (
    <Container>
      <h1>Perfil de Administrador</h1>
      <h2>Nombre: {state.user.name}</h2>
      <h2>Email: {state.user.email}</h2>
      <Button onClick={() => navigate("/dashboard/admin")}>
        Volver al Dashboard
      </Button>
    </Container>
  );
};
