import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Navigation() {
  const { t } = useTranslation()
  const location = useLocation()

  const navItems = [
    { path: '/', label: t('dashboard'), icon: '📊' },
    { path: '/oradores', label: t('oradores'), icon: '👥' },
    { path: '/hotes', label: t('hotes'), icon: '🏠' },
    { path: '/comunicacao', label: 'WhatsApp', icon: '💬' },
    { path: '/configuracoes', label: t('configuracoes'), icon: '⚙️' },
    { path: '/privacy', label: t('politiqueConfidentialite'), icon: '🔒' }
  ]

  return (
    <nav className="nav-bottom">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default Navigation