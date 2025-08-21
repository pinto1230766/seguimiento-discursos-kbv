import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Monitor } from 'react-feather';

const ThemeSelector = () => {
  const { 
    theme, 
    isDarkMode, 
    isSystemTheme, 
    setLightTheme, 
    setDarkTheme, 
    setSystemTheme 
  } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Fermer le menu déroulant lors d'un clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const themeOptions = [
    {
      id: 'light',
      label: 'Clair',
      icon: <Sun size={16} className="mr-2" />,
      action: setLightTheme,
    },
    {
      id: 'dark',
      label: 'Sombre',
      icon: <Moon size={16} className="mr-2" />,
      action: setDarkTheme,
    },
    {
      id: 'system',
      label: 'Système',
      icon: <Monitor size={16} className="mr-2" />,
      action: setSystemTheme,
    },
  ];
  
  const currentTheme = themeOptions.find(option => option.id === theme) || 
                     (isSystemTheme ? themeOptions[2] : themeOptions[0]);
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded="true"
        aria-haspopup="true"
      >
        <span className="sr-only">Changer le thème</span>
        {isDarkMode ? (
          <Moon size={20} className="text-gray-300" />
        ) : (
          <Sun size={20} className="text-yellow-500" />
        )}
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  (option.id === theme || (option.id === 'system' && isSystemTheme))
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                role="menuitem"
                tabIndex="-1"
              >
                {option.icon}
                {option.label}
                {(option.id === theme || (option.id === 'system' && isSystemTheme)) && (
                  <span className="ml-auto">
                    <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
