import { createContext, useEffect, useState } from "react";

export const DarkModeCOntext = createContext();

export const DarkModeCOntextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
   JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(
    () => {
      localStorage.setItem("darkMode", darkMode);
    },
    [darkMode]
  );

  return (
    <DarkModeCOntext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeCOntext.Provider>
  );
};
