import { ProductsContext } from "../contexts/ProductsContext";
import {
  getProductsRequest,
  getProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../config/axiosConnection";
import { types } from "../types/types";
import { useReducer, useState } from "react";
import { ProductsReducer } from "../reducers/ProductsReducer";

export const ProductProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    products: [],
    currentProduct: {},
  };


  const [state, dispatch] = useReducer(ProductsReducer, initialValues);


  const getAllProducts = async () => {
    dispatch({
      type: types.product.getAll,
    });

    try {
      const { data } = await getProductsRequest();
      const products = data;
      dispatch({
        type: types.product.getAll,
        payload: products,
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
    });

    try {
      await deleteProductRequest(id);
      dispatch({
        type: types.product.delete,
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
    });
    try {
      await updateProductRequest(id, product);
      dispatch({
        type: types.product.update,
        payload: product,
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

    setIsLoading(true);

    try {
      const resp = await fetch(cloudUrl, {
        method: "POST",
        body: formdata,
      });
      setIsLoading(false);

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
        setIsLoading,
        getAllProducts,
        deleteProduct,
        updateProduct,
        fileUpload,
        setCurrentProduct,
        isLoading
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
