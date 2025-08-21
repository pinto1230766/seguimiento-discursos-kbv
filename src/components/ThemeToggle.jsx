import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'react-feather';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        '--bg-color': isDarkMode ? '#334155' : '#e2e8f0',
        '--icon-color': isDarkMode ? '#f8fafc' : '#0f172a',
      }}
    >
      <motion.div
        className="theme-toggle-inner"
        initial={false}
        animate={{
          x: isDarkMode ? '100%' : '0%',
          backgroundColor: isDarkMode ? '#3b82f6' : '#94a3b8',
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
      >
        <motion.div
          className="theme-icon"
          animate={{
            rotate: isDarkMode ? 360 : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {isDarkMode ? (
            <Moon size={16} />
          ) : (
            <Sun size={16} />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
