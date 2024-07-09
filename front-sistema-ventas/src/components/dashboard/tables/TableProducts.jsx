import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const TableProducts = ({ products }) => {
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
          {products.map((product, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <EditIcon /> <DeleteIcon />
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
              <TableCell align="right">{product.image}</TableCell>
              <TableCell align="right">{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
