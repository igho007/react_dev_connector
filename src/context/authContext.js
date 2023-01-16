import { createContext, useContext, useReducer } from "react";

const AuthDispatchContext = createContext();
const AuthStateContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <AuthDispatchContext.Provider>
      <AuthStateContext.Provider>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthDispatch = () => useContext(AuthDispatchContext);
export const useAuthState = () => useContext(AuthStateContext);

export default AuthProvider;
