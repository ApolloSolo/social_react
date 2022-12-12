import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkModeCOntextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeCOntextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeCOntextProvider>
  </React.StrictMode>
);
