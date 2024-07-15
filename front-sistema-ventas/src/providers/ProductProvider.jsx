import { ProductsContext } from "../contexts/ProductsContext";
import {
  getProductsRequest,
  getProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../config/axiosConnection";
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
    } catch (error) {
      dispatch({
        type: types.product.errorMsg,
        payload: error.response.data[0],
      });
    }
  };

  const deleteProduct = async (id) => {
    dispatch({
      type: types.product.delete,
      isLoading: true,
    });

    try {
      await deleteProductRequest(id);
      dispatch({
        type: types.product.delete,
        isLoading: false,
      });

      getAllProducts();
    } catch (error) {
      dispatch({
        type: types.product.errorMsg,
        payload: error.response.data[0],
      });
    }
  };


 const updateProduct = async (id, product) => {
    dispatch({
      type: types.product.update,
      isLoading: true,
    });
    try {
      await updateProductRequest(id, product);
      dispatch({
        type: types.product.update,
        isLoading: false,
      });

      getAllProducts();
    } catch (error) {

      dispatch({
        type: types.product.errorMsg,
        payload: error.response.data[0],
      });
      
    }



  
 }

  return (
    <ProductsContext.Provider value={{ state, getAllProducts, deleteProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
