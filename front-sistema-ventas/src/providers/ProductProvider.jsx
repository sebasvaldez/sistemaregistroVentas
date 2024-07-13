import { ProductsContext } from "../contexts/ProductsContext";
import { getProductsRequest, getProductRequest } from "../config/axiosConnection";
import { types } from "../types/types";
import { useReducer } from "react";
import { ProductsReducer } from "../reducers/ProductsReducer";

export const ProductProvider = ({ children }) => {

  const initialValues = {
    products: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialValues);

  const getAllProducts = async () => {
    dispatch({
      type: types.product.getAll,
      isLoading: true,
    });
    try {
      const { data } = await getProductsRequest();
      const products = data;
      dispatch({
        type: types.product.getAll,
        payload: products,
        isLoading: false,
      });

    } catch (error) {}
  };

  const getProduct = async (id) => {


  }




  return (
    <ProductsContext.Provider value={{ state, getAllProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
