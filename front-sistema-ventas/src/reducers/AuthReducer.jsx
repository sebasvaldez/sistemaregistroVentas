import { types } from "../types/types.js";

export const AuthReducer = (state = {}, action) => {

  switch (action.type) {
    case types.auth.login:
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
        token: action.payload.token,
      };
    case types.auth.logout:
      return {
        ...state,
        user: null,
        isLogged: false,
        token: action.payload.action,
      };
    case types.auth.errorMsg:
      return {
        ...state,
        message: action.payload,
      };

      //solo retorno el state en el caso del register ya que el usuario se crea desde una cuenta administrador y no se necesita hacer login

      case types.auth.register:

      return state;
      
      default:
        return state;
      }
    };

