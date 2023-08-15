import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialtoken=localStorage.getItem("token")
  const [token, setToken] = useState(initialtoken);
  const isLoggedIn=token
  const loginHandler=(tokent)=> {
    setToken(tokent);
    localStorage.setItem("token", tokent);
    setTimeout(()=>{
    localStorage.removeItem("token");
    },300000)
  }
  const logoutHandler=()=> {
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
