import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Authcontext";

export const NavBarDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { state } = useContext(AuthContext);
  const { user } = state;
  console.log(user);

  console.log(state);
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user ? `Bienvenido ${user.name}` : "Bienvenido"}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
