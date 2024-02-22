import { createContext, useEffect, useReducer } from "react";
import { myFSAuth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    // login action
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    // logout action
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    // check if user already logged in when connecting to firebase
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// authentication context provider
export const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: null,
    authIsReady: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    // mount and unmount auth state listener
    const unsub = myFSAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
