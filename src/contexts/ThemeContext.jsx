import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Contexte simplifié pour un seul thème clair
export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // S'assurer que le document utilise le thème clair
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  // Valeur du contexte simplifiée
  const contextValue = {
    theme: 'light',
    isDarkMode: false,
    isSystemTheme: false,
    setLightTheme: () => {},
    setDarkTheme: () => {},
    setSystemTheme: () => {},
    toggleTheme: () => {},
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
