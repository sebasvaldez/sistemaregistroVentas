import { useEffect, useContext } from "react";
import { TableProducts } from "./tables/TableProducts.jsx";
import { ProductsContext } from "../../contexts/ProductsContext.jsx";

export const DashboardListaProductos = () => {
  const { state, getAllProducts } = useContext(ProductsContext);

  const { products, isLoading } = state;

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div>{<TableProducts products={products} />}</div>
      )}
    </>
  );
};
