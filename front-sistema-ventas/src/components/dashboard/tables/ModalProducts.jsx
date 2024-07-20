import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material/";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 30,
  p: 4,
};

export const ModalProducts = ({ open, handleClose, product }) => {
  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", marginBottom: 3 }}
          >
            {product
              ? `Editar:  ${product.brand} ${product.model}`
              : "Marca no encontrada"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              "& > :not(style)": { m: 1, width: "25ch" },
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Marca"
              variant="standard"
              placeholder="Marca"
              value={product ? product.brand : ""}
            />
            <TextField
              label="Modelo"
              variant="standard"
              placeholder="Modelo"
              value={product ? product.model : ""}
            />
            <TextField
            label="Procesador"
            variant="standard"
            placeholder="Procesador"
            value={product ? product.processor : ""}
            
            />
            <TextField
              label="Bateria"
              variant="standard"
              placeholder="Bateria"
              value={product ? product.battery.capacity : ""}
            />
            <TextField
              label="Cámara principal"
              variant="standard"
              placeholder="Cámara"
              value={product ? product.mainCamera.resolution : ""}
            />
            <TextField
              label="Memoria RAM"
              variant="standard"
              placeholder="Memoria RAM"
              value={product ? product.memory.ram : ""}
            />
            <TextField
              label="Almacenamiento"
              variant="standard"
              placeholder="Almacenamiento"
              value={product ? product.memory.storage : ""}
            />

            <TextField
              label="Imagen"
              variant="standard"
              placeholder="Imagen"
              value={product ? product.image : ""}
            />

            <TextField
              label="Stock"
              variant="standard"
              placeholder="Stock"
              value={product ? product.stock : ""}
            />
            <TextField
              label="Precio"
              variant="standard"
              placeholder="Precio"
              value={product ? product.price : ""}
            />
            <TextField
              label="Tamaño de la pantalla"
              variant="standard"
              placeholder="Tamaño de la pantalla"
              value={product ? product.screen.size : ""}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              "& > :not(style)": { m: 1, width: "25ch" },
              flexWrap: "wrap",
            }}
          >
            <Button>Actualizar</Button>
            <Button
            onClick={handleClose}
            >Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
