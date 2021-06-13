import React, { createContext, useReducer } from "react";
import GlobalReducer from './GlobalReducer'


const initialState = {
  username: '',
  userId: '',
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);
export default Store;