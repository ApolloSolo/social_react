import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async inputs => {
    const res = await axios.post("/api/auth/login", inputs, {
      withCredentials: true
    });

    if (res.data.error) {
      throw new Error(res.data.error);
    }

    console.log(res.data);
    setCurrentUser(res.data);
  };

  const register = async inputs => {
    const res = await axios.post("/api/auth/register", inputs, {
      withCredentials: true
    });

    if (res.data.error) {
      throw new Error(res.data.error);
    }
    console.log(res.data);
    setCurrentUser(res.data);
  };

  useEffect(
    () => {
      localStorage.setItem("user", JSON.stringify(currentUser));
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider value={{ currentUser, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
