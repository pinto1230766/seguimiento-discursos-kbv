import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../stores/appStore';
import { Search, WifiOff } from 'react-feather';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onSearchClick }) => {
  const { t } = useTranslation();
  const { isOnline } = useAppStore();
  const { isDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headerStyle = {
    '--header-bg': isDarkMode ? '#1e293b' : '#2563eb',
    '--header-text': isDarkMode ? '#f8fafc' : '#ffffff',
    '--header-shadow': isDarkMode 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '--search-bg': isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
    '--offline-bg': isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)',
  };

  return (
    <header 
      className={`app-header ${scrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : 'light'}`}
      style={{
        ...headerStyle,
        position: 'fixed',
        top: isOnline ? 0 : '40px',
        left: 0,
        right: 0,
        background: 'var(--header-bg)',
        color: 'var(--header-text)',
        padding: '12px 16px',
        paddingTop: `max(12px, calc(env(safe-area-inset-top) + 4px))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        boxShadow: 'var(--header-shadow)',
        transition: 'all 0.3s ease, background-color 0.3s ease',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        backgroundColor: scrolled 
          ? (isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(37, 99, 235, 0.9)') 
          : 'var(--header-bg)',
      }}
    >
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div 
          className="logo"
          style={{
            width: '40px',
            height: '40px',
            background: isDarkMode ? '#3b82f6' : '#ffffff',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: isDarkMode ? '#ffffff' : '#2563eb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          <span>KBV</span>
        </div>
        
        <div className="header-titles" style={{ maxWidth: windowWidth <= 480 ? '200px' : 'none' }}>
          <h1 
            className="app-title"
            style={{ 
              fontSize: windowWidth <= 480 ? '14px' : '16px', 
              fontWeight: '700', 
              margin: 0, 
              lineHeight: '1.2', 
              color: 'var(--header-text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'all 0.3s ease',
            }}
          >
            GESTÃO DOS DISCURSOS KBV
          </h1>
          <p 
            className="app-subtitle"
            style={{ 
              fontSize: windowWidth <= 480 ? '10px' : '11px', 
              opacity: 0.8, 
              margin: '2px 0 0', 
              fontWeight: '400', 
              color: 'var(--header-text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'all 0.3s ease',
            }}
          >
            Copyright Pinto Francisco {new Date().getFullYear()}
          </p>
        </div>
      </div>
      
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              className="offline-indicator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: 'var(--offline-bg)',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--header-text)',
              }}
            >
              <WifiOff size={14} />
              <span>{t('offline')}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="action-buttons" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.button
            className="search-button"
            onClick={onSearchClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'var(--search-bg)',
              border: 'none',
              color: 'var(--header-text)',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            title="Buscar (Ctrl+K)"
            aria-label="Buscar"
          >
            <Search size={18} />
          </motion.button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);