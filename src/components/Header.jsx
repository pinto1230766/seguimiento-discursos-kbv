import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'

function Header() {
  const { t } = useTranslation()
  const { isOnline } = useAppStore()

  return (
    <header style={{
      position: 'fixed',
      top: isOnline ? 0 : '40px',
      left: 0,
      right: 0,
      background: 'var(--jw-blue)',
      color: 'white',
      padding: '16px 16px 12px 16px',
      paddingTop: 'max(16px, env(safe-area-inset-top))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'var(--jw-blue)'
        }}>
          JW
        </div>
        <div>
          <h1 style={{ 
            fontSize: window.innerWidth <= 480 ? '14px' : '16px', 
            fontWeight: '700', 
            margin: 0, 
            lineHeight: '1.2', 
            color: 'white',
            wordWrap: 'break-word',
            maxWidth: window.innerWidth <= 480 ? '280px' : 'auto'
          }}>
            GESTÃO DOS DISCURSOS DO GRUPO KBV DE LYON
          </h1>
          <p style={{ 
            fontSize: window.innerWidth <= 480 ? '10px' : '11px', 
            opacity: 0.8, 
            margin: 0, 
            fontWeight: '400', 
            color: 'white' 
          }}>
            Copyright Pinto Francisco {new Date().getFullYear()}
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!isOnline && (
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{ width: '8px', height: '8px', background: '#ff6b6b', borderRadius: '50%' }} />
            {t('offline')}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header