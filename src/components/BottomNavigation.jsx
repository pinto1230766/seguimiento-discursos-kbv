import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Home as HomeIcon, Calendar, Link as LinkIcon, Settings, MessageSquare } from 'react-feather';
import { useTheme } from '../contexts/ThemeContext';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const navRef = useRef(null);

  const navItems = [
    { 
      path: '/', 
      icon: <Home size={22} />, 
      activeIcon: <Home size={22} fill="currentColor" />, 
      label: 'Início', 
      key: 'home' 
    },
    { 
      path: '/oradores', 
      icon: <Users size={22} />, 
      activeIcon: <Users size={22} fill="currentColor" />, 
      label: 'Oradores', 
      key: 'speakers' 
    },
    { 
      path: '/hotes', 
      icon: <HomeIcon size={22} />, 
      activeIcon: <HomeIcon size={22} fill="currentColor" />, 
      label: 'Anfitriões', 
      key: 'hosts' 
    },
    { 
      path: '/calendario', 
      icon: <Calendar size={22} />, 
      activeIcon: <Calendar size={22} fill="currentColor" />, 
      label: 'Agenda', 
      key: 'calendar' 
    },
    { 
      path: '/atribuicoes', 
      icon: <LinkIcon size={22} />, 
      activeIcon: <LinkIcon size={22} fill="currentColor" />, 
      label: 'Atribuir', 
      key: 'assign' 
    },
    { 
      path: '/comunicacao', 
      icon: <MessageSquare size={22} />, 
      activeIcon: <MessageSquare size={22} fill="currentColor" />, 
      label: 'Comunicação', 
      key: 'communication' 
    },
    { 
      path: '/configuracoes', 
      icon: <Settings size={22} />, 
      activeIcon: <Settings size={22} fill="currentColor" />, 
      label: 'Configurações', 
      key: 'settings' 
    },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Auto-scroll active nav item into view
  useEffect(() => {
    const activeItem = navRef.current?.querySelector('.nav-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [location.pathname]);

  return (
    <div 
      ref={navRef}
      className={`bottom-nav ${isDarkMode ? 'dark' : 'light'}`}
      style={{
        '--bg-color': isDarkMode ? '#1e293b' : '#ffffff',
        '--text-color': isDarkMode ? '#e2e8f0' : '#334155',
        '--active-color': isDarkMode ? '#3b82f6' : '#2563eb',
        '--hover-bg': isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <AnimatePresence initial={false}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <motion.button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`nav-item ${active ? 'active' : ''}`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="nav-icon">
                {active ? item.activeIcon : item.icon}
                {active && (
                  <motion.span 
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </div>
              <span className="nav-label">{item.label}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default BottomNavigation;