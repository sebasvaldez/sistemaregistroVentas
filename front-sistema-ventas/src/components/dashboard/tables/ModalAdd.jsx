import { Box, Button, TextField, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useRef, useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { UploadOutlined } from "@mui/icons-material";
import { Loader } from "../Loader/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalAdd = ({ open, handleClose, imageUrl, setImageUrl }) => {
  const { fileUpload, isLoading, createProduct } = useContext(ProductsContext);

  const [newProduct, setNewProduct] = useState({
    brand: "",
    model: "",
    processor: "",
    battery: {
      capacity: "",
    },
    mainCamera: {
      resolution: "",
    },
    memory: {
      ram: "",
      storage: "",
    },
    stock: "",
    image: "",
    price: "",
    screen: {
      size: "",
      type: "",
    },
  });

  const onFileInputChange = async ({ target }) => {
    const file = target.files[0];
    try {
      const newImageUrl = await fileUpload(file);
      setImageUrl(newImageUrl);
      setNewProduct({
        ...newProduct,
        image: newImageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fileInputRef = useRef();

  const onInputsChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split(".");

    if (subKey) {
      setNewProduct({
        ...newProduct,
        [mainKey]: {
          ...newProduct[mainKey],
          [subKey]: value,
        },
      });
      return;
    }

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Nuevo producto
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
              value={newProduct.brand}
              name="brand"
              onChange={onInputsChange}
            />
            <TextField
              label="Modelo"
              variant="standard"
              placeholder="Modelo"
              value={newProduct.model}
              name="model"
              onChange={onInputsChange}
            />
            <TextField
              label="Procesador"
              variant="standard"
              placeholder="Procesador"
              value={newProduct.processor}
              name="processor"
              onChange={onInputsChange}
            />
            <TextField
              label="Bateria"
              variant="standard"
              placeholder="Bateria"
              value={newProduct.battery.capacity}
              name="battery.capacity"
              onChange={onInputsChange}
            />
            <TextField
              label="Cámara principal"
              variant="standard"
              placeholder="Cámara"
              value={newProduct.mainCamera.resolution}
              name="mainCamera.resolution"
              onChange={onInputsChange}
            />
            <TextField
              label="Memoria RAM"
              variant="standard"
              placeholder="Memoria RAM"
              value={newProduct.memory.ram}
              name="memory.ram"
              onChange={onInputsChange}
            />
            <TextField
              label="Almacenamiento"
              variant="standard"
              placeholder="Almacenamiento"
              value={newProduct.memory.storage}
              name="memory.storage"
              onChange={onInputsChange}
            />

            {isLoading ? (
              <Loader />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-evenly",
                }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={onFileInputChange}
                />
                <Typography>Subir una imagen</Typography>

                <IconButton
                  color="primary"
                  disabled={isLoading}
                  onClick={() => fileInputRef.current.click()}
                >
                  <UploadOutlined />
                </IconButton>
              </Box>
            )}

            <TextField
              label="Stock"
              variant="standard"
              placeholder="Stock"
              value={newProduct.stock}
              name="stock"
              onChange={onInputsChange}
            />
            <TextField
              label="Url de la imagen"
              variant="standard"
              placeholder="Url de la imagen"
              value={imageUrl.length > 0 ? imageUrl : newProduct.image}
              name="image"
              onChange={onInputsChange}
            />

            <TextField
              label="Precio"
              variant="standard"
              placeholder="Precio"
              value={newProduct.price}
              name="price"
              onChange={onInputsChange}
            />
            <TextField
              label="Tamaño de la pantalla"
              variant="standard"
              placeholder="Tamaño de la pantalla"
              value={newProduct.screen.size}
              name="screen.size"
              onChange={onInputsChange}
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
            <Button
              onClick={() => {
                console.log(newProduct);
                createProduct(newProduct);
                handleClose();
              }}
            >
              Ingresar producto
            </Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
