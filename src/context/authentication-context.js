import { createContext, useContext, useReducer } from "react";

const AuthenticationContext = createContext();
const useAuthenticationContext = () => useContext(AuthenticationContext);

const authenticationReducer = (state, { type, payload }) => {
  switch (type) {
    case "TOKEN":
      return { ...state, token: payload };
    case "EMAIL":
      return { ...state, email: payload };
    case "PASSWORD":
      return { ...state, password: payload };
    case "CONFIRM_PASSWORD":
      return { ...state, confirmPassword: payload };
    case "FIRST_NAME":
      return { ...state, firstName: payload };
    case "LAST_NAME":
      return { ...state, lastName: payload };
    default:
      return state;
  }
};

const AuthenticationProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authenticationReducer, {
    firstName: "",
    lastName: "",
    email: null,
    password: "",
    confirmPassword: "",
    token: null,
  });

  const value = { authState, authDispatch };
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { useAuthenticationContext, AuthenticationProvider };
