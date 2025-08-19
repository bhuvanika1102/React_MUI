// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
