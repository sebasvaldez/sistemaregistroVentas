import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material/";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GroupsIcon from "@mui/icons-material/Groups";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SellIcon from "@mui/icons-material/Sell";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { DashboardListaProductos } from "./DashboardListaProductos";
import { DashboardVendedores } from "./DashboardVendedores";
import { DashboardListaClientes } from "./DashboardListaClientes";
import { DashboardListaVentas } from "./DashboardListaVentas";

const drawerWidth = 240;

export const DrawerDashboard = (props) => {
  const { state, logout } = useAuth();

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [component, setComponent] = useState(
    "Aqui va el componentente con las opciones por default"
  );

  const [activeComponente, setActiveComponente] = useState("");

  const handleComponent = (text) => {
    setActiveComponente(text);

    switch (text) {
      case "Vendedores":
        setComponent(<DashboardVendedores />);

        break;
      case "Productos":
        setComponent(<DashboardListaProductos />);

        break;
      case "Ventas":
        setComponent(<DashboardListaVentas />);
        break;
      case "Clientes":
        setComponent(<DashboardListaClientes />);
        break;
      default:
        setComponent(null);
        break;
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Vendedores", "Productos", "Ventas", "Clientes"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleComponent(text)}>
              <ListItemIcon>
                {text === "Vendedores" ? (
                  <GroupsIcon
                    {...(activeComponente === "Vendedores" && {
                      color: "primary",
                    })}
                  />
                ) : text === "Productos" ? (
                  <Inventory2Icon
                    {...(activeComponente === "Productos" && {
                      color: "primary",
                    })}
                  />
                ) : text === "Ventas" ? (
                  <SellIcon
                    {...(activeComponente === "Ventas" && { color: "primary" })}
                  />
                ) : text === "Clientes" ? (
                  <GroupAddIcon
                    {...(activeComponente === "Clientes" && {
                      color: "primary",
                    })}
                  />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Box
          display="flex"
          sx={[{ justifyContent: "space-around" }, { padding: "16px" }]}
        >
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Bienvenido : {state.user.username}
            </Typography>
          </Box>

          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {component}
      </Box>
    </Box>
  );
};
