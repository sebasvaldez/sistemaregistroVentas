import { types } from "../types/types.js";

export const ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case types.product.add:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };

    case types.product.delete:
      return {
        ...state,
        isLoading: false,
        product: action.payload || {},
      };

    case types.product.update:
      return {
        ...state,
        isLoading: false,
        product: action.payload ,
      };

      case types.product.setCurrent:

      return{
        ...state,
        currentProduct: action.payload
      }

    case types.product.get:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    case types.product.getAll:
      return {
        ...state,
        isLoading: false,
        products: action.payload || [],
      };
    case types.product.errorMsg:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
