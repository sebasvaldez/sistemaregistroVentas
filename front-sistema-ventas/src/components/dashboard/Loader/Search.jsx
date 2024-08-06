import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductsContext";

export const Search = () => {
  const { getProductByBrand, state, cleanSearch } = useContext(ProductsContext);

  const [brand, setBrand] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if(brand === "") return
    await getProductByBrand(brand);
  };

  const onInputBrandChange = ({ target }) => {
    if(target.value === "") {
      cleanSearch();
    }
    setBrand(target.value);
  };



  return (
    <Paper
      component="form"
      sx={{ display: "flex", alignItems: "center", width: 250, height: "35px" }}
      onSubmit={handleSearch}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busqueda por marca"
        onChange={onInputBrandChange}
        name="brand"
      />
      <IconButton
        type="button"
        sx={{ p: "5px", marginRight: "15px" }}
        aria-label="search"
      ></IconButton>
    </Paper>
  );
};
