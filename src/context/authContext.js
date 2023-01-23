import { createContext, useContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import {
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "./types";

const AuthDispatchContext = createContext();
const AuthStateContext = createContext();
let auth_user;

const token = localStorage.getItem("token");
if (token) {
  const decode = jwtDecode(token);
  if (new Date(decode.exp * 1000) > new Date()) {
    auth_user = decode;
  } else {
    localStorage.removeItem("token");
  }
}

let initialState = {
  user: auth_user ? auth_user : null,
  users: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload.user };

    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return { ...state, user: null };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthDispatch = () => useContext(AuthDispatchContext);
export const useAuthState = () => useContext(AuthStateContext);

export default AuthProvider;
