import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, TextField, IconButton } from "@mui/material/";
import Modal from "@mui/material/Modal";
import { useState, useRef, useContext, useEffect } from "react";
import { UploadOutlined } from "@mui/icons-material";
import { ProductsContext } from "../../../contexts/ProductsContext";

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

export const ModalProducts = ({ open, handleClose, imageUrl, setImageUrl }) => {
  const { state, fileUpload } = useContext(ProductsContext);

  const { currentProduct } = state;

  const { isLoading } = state;

  // console.log(currentProduct)
  // console.log(isLoading);

  const [currentInputProduct, setCurrentInputProduct] = useState({
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
      setCurrentInputProduct({
        ...currentInputProduct,
        image: newImageUrl,
      })
    } catch (error) {}

    console.log("me ejecuto");
  };

  const fileInputRef = useRef();

  const onInputsChange = (e) => {
    const { name, value } = e.target;
    const [mainKey,subKey] = name.split(".");

    if(subKey){
      setCurrentInputProduct({
        ...currentInputProduct,
        [mainKey]: {
          ...currentInputProduct[mainKey],
          [subKey]: value,
        },
      });
      return;
    }

    setCurrentInputProduct({
      ...currentInputProduct,
      [name]: value,
    });
    
  };

  // console.log(currentInputProduct);

  useEffect(() => {
    if(currentProduct){
      setCurrentInputProduct(currentProduct)
    }
  }, [currentProduct]);

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
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", marginBottom: 3 }}
          >
            {currentProduct
              ? `Editar:  ${currentProduct.brand} ${currentProduct.model}`
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
              value={currentInputProduct ? currentInputProduct.brand : ""}
              name="brand"
              onChange={onInputsChange}
            />
            <TextField
              label="Modelo"
              variant="standard"
              placeholder="Modelo"
              value={currentInputProduct ? currentInputProduct.model : ""}
              name="model"
              onChange={onInputsChange}
            />
            <TextField
              label="Procesador"
              variant="standard"
              placeholder="Procesador"
              value={currentInputProduct ? currentInputProduct.processor : ""}
              name="processor"
              onChange={onInputsChange}
            />
            <TextField
              label="Bateria"
              variant="standard"
              placeholder="Bateria"
              value={currentInputProduct ? currentInputProduct.battery.capacity : ""}
              name="battery.capacity"
              onChange={onInputsChange}
            />
            <TextField
              label="Cámara principal"
              variant="standard"
              placeholder="Cámara"
              value={currentInputProduct ? currentInputProduct.mainCamera.resolution : ""}
              name="mainCamera.resolution"
              onChange={onInputsChange}
            />
            <TextField
              label="Memoria RAM"
              variant="standard"
              placeholder="Memoria RAM"
              value={currentInputProduct ? currentInputProduct.memory.ram : ""}
              name="memory.ram"
              onChange={onInputsChange}
            />
            <TextField
              label="Almacenamiento"
              variant="standard"
              placeholder="Almacenamiento"
              value={currentInputProduct ? currentInputProduct.memory.storage : ""}
              name="memory.storage"
              onChange={onInputsChange}
            />

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

            <TextField
              label="Stock"
              variant="standard"
              placeholder="Stock"
              value={currentInputProduct ? currentInputProduct.stock : ""}
              name="stock"
              onChange={onInputsChange}
            />
            <TextField
              label="Url de la imagen"
              variant="standard"
              placeholder="Url de la imagen"
              value={imageUrl.length > 0 ? imageUrl  : currentInputProduct?.image}
              name="image"
              onChange={onInputsChange}
            />

            <TextField
              label="Precio"
              variant="standard"
              placeholder="Precio"
              value={currentInputProduct ? currentInputProduct.price : ""}
              name="price"
              onChange={onInputsChange}
            />
            <TextField
              label="Tamaño de la pantalla"
              variant="standard"
              placeholder="Tamaño de la pantalla"
              value={currentInputProduct.screen ? currentInputProduct.screen.size : ""}
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
              console.log(currentInputProduct);
            }}
            >Actualizar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
