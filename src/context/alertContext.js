import React, { createContext, useContext, useReducer } from "react";
import { REMOVE_ALERT, SET_ALERT } from "./types";
const AlertDispatchContext = createContext();
const AlertStateContext = createContext();

const alertReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
};

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, []);
  return (
    <AlertDispatchContext.Provider value={dispatch}>
      <AlertStateContext.Provider value={state}>
        {children}
      </AlertStateContext.Provider>
    </AlertDispatchContext.Provider>
  );
};

export const useAlertDispatch = () => useContext(AlertDispatchContext);
export const useAlertState = () => useContext(AlertStateContext);

export default AlertProvider;
