import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const response = await fetch("/api/auth/login", {
      withCredentials: true,
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    setCurrentUser(data);
  };

  useEffect(
    () => {
      localStorage.setItem("user", JSON.stringify(currentUser));
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider calue={{currentUser, login}}>
        {children}
    </AuthContext.Provider>
  )
};
