import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useHotkeys } from 'react-hotkeys-hook';

// Components
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import BottomNavigation from './components/BottomNavigation';
import FloatingActionButton from './components/FloatingActionButton';
import GlobalSearch from './components/GlobalSearch';
import PullToRefresh from './components/PullToRefresh';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import Oradores from './pages/Oradores';
import Hotes from './pages/Hotes';
import Atribuicoes from './pages/Atribuicoes';
import Calendario from './pages/Calendario';
import Comunicacao from './pages/Comunicacao';
import Configuracoes from './pages/Configuracoes';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Hooks
import { useAppStore } from './stores/appStore';

// Styles
import './styles/modern-ui.css';
import './styles/components/navigation.css';

function AppContent() {
  const { i18n } = useTranslation()
  const { isOnline, checkOnlineStatus, loadFromStorage } = useAppStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initApp = async () => {
      try {
        await loadFromStorage()
        checkOnlineStatus()
        
        const savedLanguage = localStorage.getItem('app-language') || 'pt'
        i18n.changeLanguage(savedLanguage)
        
        console.log('App initialized successfully')
      } catch (error) {
        console.error('Failed to initialize app:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initApp()
  }, [loadFromStorage, checkOnlineStatus, i18n])

  useEffect(() => {
    window.addEventListener('online', checkOnlineStatus)
    window.addEventListener('offline', checkOnlineStatus)
    
    if ('vibrate' in navigator) {
      document.addEventListener('click', (e) => {
        if (e.target.matches('button, .btn')) {
          navigator.vibrate(50)
        }
      })
    }

    return () => {
      window.removeEventListener('online', checkOnlineStatus)
      window.removeEventListener('offline', checkOnlineStatus)
    }
  }, [checkOnlineStatus])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  const handleRefresh = async () => {
    await loadFromStorage()
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  if (isLoading) {
    return (
      <div className="app-loading" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',gap:'16px'}}>
        <div className="loading-spinner" style={{fontSize:'48px',animation:'spin 1s linear infinite'}}>⟳</div>
        <p>Carregando aplicação...</p>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="app app-container">
          {!isOnline && (
            <div className="offline-banner" style={{background:'#ff9500',color:'white',padding:'8px',textAlign:'center',fontSize:'14px'}}>
              📱 Modo offline - Dados salvos localmente
            </div>
          )}
          
          <Header onSearchClick={() => setIsSearchOpen(true)} />
          
          <PullToRefresh onRefresh={handleRefresh}>
            <main className="main-content page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/oradores" element={<Oradores />} />
                <Route path="/hotes" element={<Hotes />} />
                <Route path="/atribuicoes" element={<Atribuicoes />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/comunicacao" element={<Comunicacao />} />
                <Route path="/configuracoes" element={
                  <ErrorBoundary>
                    <Configuracoes />
                  </ErrorBoundary>
                } />
                <Route path="/privacy" element={
                  <ErrorBoundary>
                    <PrivacyPolicy />
                  </ErrorBoundary>
                } />
              </Routes>
            </main>
          </PullToRefresh>
          
          <BottomNavigation />
          <FloatingActionButton />
          
          <GlobalSearch 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
          />
          
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

// Create MUI theme based on our theme context
const getMuiTheme = (isDarkMode) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: isDarkMode ? '#3b82f6' : '#2563eb',
    },
    secondary: {
      main: isDarkMode ? '#10b981' : '#059669',
    },
    background: {
      default: isDarkMode ? '#0f172a' : '#f8fafc',
      paper: isDarkMode ? '#1e293b' : '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

// Main App component with theme provider
function App() {
  const { isDarkMode } = useTheme();
  const muiTheme = getMuiTheme(isDarkMode);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppContent />
    </MuiThemeProvider>
  );
}

// Wrap the app with our ThemeProvider
const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;