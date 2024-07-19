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
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";
import Swal from "sweetalert2";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { PhotoCamera } from "@mui/icons-material";
// import { ProductForm } from "./sweetsFunntions/ProductForm";

export const TableProducts = ({ products }) => {
  const { state, deleteProduct, updateProduct, fileUpload } =
    useContext(ProductsContext);
  const [secureUrl, setSecureUrl] = useState("sin imagen");




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

  const onFileInputChange = async ({ target }) => {
    const file = target.files[0];

    const resp = await fileUpload(file);

    console.log("me ejecuto");
    setSecureUrl(resp);
  };

  const updateProductById = (product) => {
    Swal.fire({
      title: "Actualizar producto",
      html: `
        <input id="brand" class="swal2-input" placeholder="Marca" value="${product.brand}">
        <input id="model" class="swal2-input" placeholder="Modelo" value="${product.model}">
        <input id="battery" class="swal2-input" placeholder="Bateria" value="${product.battery.capacity}">
        <input id="mainCamera" class="swal2-input" placeholder="Resolución de cámara" value="${product?.mainCamera.resolution}">
        <input id="ram" class="swal2-input" placeholder="RAM" value="${product.memory.ram}">
        <input id="storage" class="swal2-input" placeholder="Almacenamiento" value="${product.memory.storage}">

        <label for="fileInput" class="custom-file-upload" ;  ">
        Subir una imagen 
        <input type="file" id="fileInput"   />
        </label>
      `,
      focusConfirm: false,
      didOpen: () => {
        document
          .getElementById("fileInput")
          .addEventListener("change", onFileInputChange);
      },
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
          image: secureUrl || "",
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // updateProduct(product._id, result.value);
        console.log(result.value);
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
