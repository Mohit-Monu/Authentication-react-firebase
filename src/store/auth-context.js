import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const lctoken=localStorage.getItem("token")
  const [token, setToken] = useState(lctoken);
  const isLoggedIn=!!token
  function loginHandler(tokent) {
    localStorage.setItem("token", tokent);
    setToken(tokent);
  }
  function logoutHandler() {
    setToken(null);
    localStorage.removeItem("token");
  }
  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
