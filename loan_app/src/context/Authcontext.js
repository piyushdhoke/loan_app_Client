import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.name);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUsername(decoded.name); 
      setUser(decoded); 
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
