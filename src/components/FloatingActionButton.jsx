import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, UserPlus, Home as HomeIcon, Calendar as CalendarIcon, 
  Upload, RefreshCw, MessageSquare, Link as LinkIcon, Settings } from 'react-feather';
import { useTheme } from '../contexts/ThemeContext';
import { useHotkeys } from 'react-hotkeys-hook';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fabRef = useRef(null);
  const { isDarkMode } = useTheme();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add keyboard shortcut to open/close FAB (Alt+N)
  useHotkeys('alt+n', (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  });

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getQuickActions = () => {
    const path = location.pathname;
    const baseActions = [
      { 
        icon: <UserPlus size={18} />, 
        label: 'Novo Orador', 
        action: () => navigate('/oradores?new=true'),
        shortcut: 'O',
        color: '#3b82f6'
      },
      { 
        icon: <HomeIcon size={18} />, 
        label: 'Novo Anfitrião', 
        action: () => navigate('/hotes?new=true'),
        shortcut: 'A',
        color: '#10b981'
      },
      { 
        icon: <CalendarIcon size={18} />, 
        label: 'Nova Visita', 
        action: () => navigate('/calendario?new=true'),
        shortcut: 'V',
        color: '#8b5cf6'
      }
    ];

    const additionalActions = {
      '/oradores': [
        { 
          icon: <Upload size={18} />, 
          label: 'Importar Lista', 
          action: () => document.getElementById('import-file')?.click(),
          shortcut: 'I',
          color: '#f59e0b'
        }
      ],
      '/hotes': [],
      '/calendario': [
        { 
          icon: <RefreshCw size={18} />, 
          label: 'Sincronizar', 
          action: () => window.location.reload(),
          shortcut: 'R',
          color: '#ec4899'
        }
      ]
    };

    const pathActions = Object.entries(additionalActions).find(([pathPrefix]) => 
      location.pathname.startsWith(pathPrefix)
    )?.[1] || [];

    return [...baseActions, ...pathActions];
  };

  const quickActions = getQuickActions();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div 
      ref={fabRef}
      className={`fab-container ${isDarkMode ? 'dark' : 'light'}`}
      style={{
        '--primary-color': isDarkMode ? '#3b82f6' : '#2563eb',
        '--bg-color': isDarkMode ? '#1e293b' : '#ffffff',
        '--text-color': isDarkMode ? '#e2e8f0' : '#1e293b',
        '--shadow': isDarkMode 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fab-menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                className="fab-menu-item-wrapper"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className="fab-menu-item"
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  style={{
                    '--item-color': action.color || '#3b82f6',
                    '--item-hover': `${action.color}15`,
                    '--item-active': `${action.color}30`
                  }}
                >
                  <span className="fab-menu-icon" style={{ color: action.color }}>
                    {action.icon}
                  </span>
                  <span className="fab-menu-label">
                    {action.label}
                    <span className="shortcut">{action.shortcut}</span>
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className={`fab-main ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          backgroundColor: isOpen 
            ? (isDarkMode ? '#3b82f6' : '#2563eb') 
            : (isDarkMode ? '#1e293b' : '#ffffff'),
          color: isOpen || isHovered ? '#ffffff' : (isDarkMode ? '#e2e8f0' : '#1e293b')
        }}
      >
        <motion.span 
          className="fab-icon"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </motion.span>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;