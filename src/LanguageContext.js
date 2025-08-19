import React, { createContext, useContext, useState } from "react";

// 1. Create context
const LanguageContext = createContext();

// 2. Provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // default English

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Custom hook (for easy use in components)
export function useLanguage() {
  return useContext(LanguageContext);
}
