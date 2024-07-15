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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import Swal from "sweetalert2";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

export const TableProducts = ({ products }) => {
  const { state, deleteProduct, updateProduct } = useContext(ProductsContext);

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

  const updateProductById = (product) => {
    Swal.fire({
      title: "Actualizar producto",
      html: `
      <input  id="brand" class="swal2-input height:0"  placeholder="Marca" value="${product.brand}">
      <input id="model" class="swal2-input" placeholder="Modelo" value="${product.model}">
      <input id="battery" class="swal2-input" placeholder="Bateria" value="${product.battery.capacity}">
      <input id="mainCamera" class="swal2-input" placeholder="Resolución de cámara" value="${product?.mainCamera.resolution}">
      <input id="ram" class="swal2-input" placeholder="RAM" value="${product.memory.ram}">
      <input id="storage" class="swal2-input" placeholder="Almacenamiento" value="${product.memory.storage}">
      <input id="image" class="swal2-input" placeholder="Imagen" value="${product.image}">
      <input id="stock" class="swal2-input" placeholder="Stock" value="${product.stock}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          brand: document.getElementById("brand").value,
          model: document.getElementById("model").value,
          battery: { capacity: document.getElementById("battery").value },
          mainCamera: {
            resolution: document.getElementById("mainCamera").value,
          },
          memory: {
            ram: document.getElementById("ram").value,
            storage: document.getElementById("storage").value,
          },
          image: document.getElementById("image").value,
          stock: document.getElementById("stock").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateProduct(product._id, result.value);
        Swal.fire({
          title: "Actualizado!",
          text: "El producto fue actualizado.",
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
    </TableContainer>
  );
};
