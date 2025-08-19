import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import ErrorBoundary from './components/ErrorBoundary'
import Dashboard from './pages/Dashboard'
import Oradores from './pages/Oradores'
import Hotes from './pages/Hotes'
import Atribuicoes from './pages/Atribuicoes'
import Calendario from './pages/Calendario'
import Comunicacao from './pages/Comunicacao'
import Configuracoes from './pages/Configuracoes'
import { useAppStore } from './stores/appStore'

function App() {
  const { i18n } = useTranslation()
  const { isOnline, checkOnlineStatus, theme } = useAppStore()

  useEffect(() => {
    // Vérifier le statut en ligne
    checkOnlineStatus()
    
    // Écouter les changements de connexion
    window.addEventListener('online', checkOnlineStatus)
    window.addEventListener('offline', checkOnlineStatus)
    
    // Vibration pour le feedback tactile
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
  
  // Gestion des thèmes
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement
      
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark')
      } else if (theme === 'light') {
        root.setAttribute('data-theme', 'light')
      } else {
        // Auto - utiliser la préférence système
        root.removeAttribute('data-theme')
      }
    }
    
    applyTheme()
  }, [theme])

  return (
    <ErrorBoundary>
      <Router>
        <div className="app" data-theme={theme === 'auto' ? undefined : theme}>
        {!isOnline && (
          <div className="offline-banner">
            📱 Modo offline - Dados salvos localmente
          </div>
        )}
        
        <Header />
        
        <main className="main-content" style={{ paddingBottom: '80px', paddingTop: isOnline ? '60px' : '100px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/oradores" element={<Oradores />} />
            <Route path="/hotes" element={<Hotes />} />
            <Route path="/atribuicoes" element={<Atribuicoes />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/comunicacao" element={<Comunicacao />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Routes>
        </main>
        
          <Navigation />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App