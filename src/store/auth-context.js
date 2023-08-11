import React from 'react'
import { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const [token,setToken]=useState(null)
    const isLoggedIn=!!token
    function loginHandler(token){
        setToken(token)
    }
    function logoutHandler(){
        setToken(null)
    }
    const contextValue={
        token: token,
        isLoggedIn: isLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    }
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};
export default AuthContext
