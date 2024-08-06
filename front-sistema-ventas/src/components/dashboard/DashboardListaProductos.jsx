import { useEffect, useContext } from "react";
import { TableProducts } from "./tables/TableProducts.jsx";
import { ProductsContext } from "../../contexts/ProductsContext.jsx";

export const DashboardListaProductos = () => {
  const { state, getAllProducts } = useContext(ProductsContext);

  const { products, isLoading,productsByBrand } = state;

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        productsByBrand.length > 0 ? <TableProducts products={productsByBrand} /> : <TableProducts products={products} />
      )}
    </>
  );
};
