import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Icon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import Swal from "sweetalert2";

export const TableProducts = ({ products }) => {
  const { state, deleteProduct } = useContext(ProductsContext);

 

  const deleteProductById = (id) => {
    Swal.fire({
      title: "Cuidado!",
      text: "Realmente quieres elimiar el producto de la base de datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
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
            <TableCell align="right">Resolución de cámara principal</TableCell>
            <TableCell align="right">RAM</TableCell>
            <TableCell align="right">Almacenamiento</TableCell>
            <TableCell align="right">Imagen</TableCell>
            <TableCell align="right">Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <IconButton>
                  <EditIcon sx={{ color: "blue", margin: "5px" }} />
                </IconButton>
                <IconButton onClick={() => deleteProductById(product._id)}>
                  <DeleteIcon sx={{ color: "red", margin: "5px" }} />
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
                <img src={product.image} alt="" />
              </TableCell>
              <TableCell align="right">{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
