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
    currentProduct: {},
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
        payload: product,
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

  const setCurrentProduct = (product) => {
    dispatch({
      type: types.product.setCurrent,
      payload: product,
    });
  };

  const fileUpload = async (file) => {
    if (!file) throw new Error("No hay un archivo para subir");

    const cloudUrl = "https://api.cloudinary.com/v1_1/milayrock/upload";
    const formdata = new FormData();
    formdata.append("upload_preset", "sistema-ventas");
    formdata.append("file", file);
    try {
      const resp = await fetch(cloudUrl, {
        method: "POST",
        body: formdata,
      });

      if (!resp.ok) throw new Error("Error al subir la imagen");

      const cloudResp = await resp.json();

      return cloudResp.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        state,
        getAllProducts,
        deleteProduct,
        updateProduct,
        fileUpload,
        setCurrentProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
