import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import Swal from "sweetalert2";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { ModalProducts } from "./ModalProducts";
import { ModalImage } from "./ModalImage";
import { ModalAdd } from "./ModalAdd";
import { Search } from "../Loader/Search";

export const TableProducts = ({ products }) => {
  const { deleteProduct, setCurrentProduct, createProduct } =
    useContext(ProductsContext);

  const [imageUrl, setImageUrl] = useState("");

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImageUrl("");
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const deleteProductById = (id) => {
    Swal.fire({
      title: "Cuidado!",
      text: "Realmente quieres elimiar el producto de la base de datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire({
          title: "Borrado!",
          text: "El producto fue borrado.",
          icon: "success",
        });
      }
    });
  };

  const createNewProduct = async () => {
    handleOpenAdd();

    try {
    } catch (error) {
      console.error(error);
    }
  };

  const updateProductById = async (product) => {
    handleOpen();
    setCurrentProduct(product);

    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "10px",
        }}
      >
        <Button
          sx={{ marginBottom: "10px" }}
          variant="contained"
          onClick={createNewProduct}
        >
          agregar Productos
        </Button>

        <Search />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Acciones</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Marca</TableCell>
              <TableCell align="right">Modelo</TableCell>
              <TableCell align="right">Bateria</TableCell>
              <TableCell align="right">Resolución de cámara</TableCell>
              <TableCell align="right">RAM</TableCell>
              <TableCell align="right">Almacenamiento</TableCell>
              <TableCell align="right">Imagen</TableCell>
              <TableCell align="right">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell sx={{ padding: "5px" }}>
                  <IconButton onClick={() => updateProductById(product)}>
                    <EditIcon sx={{ color: "blue" }} />
                  </IconButton>
                  <IconButton onClick={() => deleteProductById(product._id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {product.brand}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {product.model}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {product.battery.capacity}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {product.mainCamera.resolution}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {product.memory.ram}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {product.memory.storage}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  <IconButton
                    onClick={() => ModalImage(product.model, product.image)}
                  >
                    <ImageSearchIcon />
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  align="right"
                  {...(product.stock <= 3 && { style: { color: "red" } })}
                >
                  {product.stock}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {open && (
          <ModalProducts
            open={open}
            handleClose={handleClose}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        )}
        {openAdd && (
          <ModalAdd
            open={openAdd}
            handleClose={handleCloseAdd}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        )}
      </TableContainer>
    </Box>
  );
};
