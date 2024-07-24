import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import Swal from "sweetalert2";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { ModalProducts } from "./ModalProducts";

export const TableProducts = ({ products }) => {
  const { state, deleteProduct, updateProduct, fileUpload, setCurrentProduct } =
    useContext(ProductsContext);

  const [imageUrl, setImageUrl] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImageUrl("");
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

  const updateProductById = async (product) => {
    handleOpen();
    setCurrentProduct(product);

    try {
      await fileUpload;
    } catch (error) {}
  };

  return (
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
              <TableCell align="right">{product.brand}</TableCell>
              <TableCell align="right">{product.model}</TableCell>
              <TableCell align="right">{product.battery.capacity}</TableCell>
              <TableCell align="right">
                {product.mainCamera.resolution}
              </TableCell>
              <TableCell align="right">{product.memory.ram}</TableCell>
              <TableCell align="right">{product.memory.storage}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <ImageSearchIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        open && (
          <ModalProducts
            open={open}
            handleClose={handleClose}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />)

      }
    </TableContainer>
  );
};
