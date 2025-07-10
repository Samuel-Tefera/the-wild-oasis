import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'theme');

  function toggleTheme() {
    setIsDarkMode((prev) => !prev);
  }

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('Theme Context was used outside the Theme Provider');

  return context;
}

export { ThemeProvider, useTheme };
