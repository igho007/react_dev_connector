import { createContext, useContext, useReducer } from "react";
import {
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "./types";

const AuthDispatchContext = createContext();
const AuthStateContext = createContext();

let initialState = {
  isAuthenticated: null,
  user: null,
  loading: true,
  users: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload, isAuthenticated: true, loading: false };

    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case AUTH_ERROR:
      return { ...state, isAuthenticated: false, loading: false, token: null };
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
