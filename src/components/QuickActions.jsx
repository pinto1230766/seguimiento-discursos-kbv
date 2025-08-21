import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'

const QuickActions = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { oradores, hotes, attributions } = useAppStore()

  const getContextualActions = () => {
    const path = location.pathname
    
    // Dashboard actions
    if (path === '/') {
      const pendingAttributions = attributions.filter(a => a.statut === 'proposé').length
      const urgentVisits = oradores.filter(o => {
        if (!o.nextVisitDate) return false
        const nextVisit = new Date(o.nextVisitDate)
        const today = new Date()
        const diffDays = Math.ceil((nextVisit - today) / (1000 * 60 * 60 * 24))
        return diffDays <= 7 && diffDays >= 0
      }).length

      return [
        {
          icon: '⚡',
          title: 'Atribuir Automaticamente',
          subtitle: `${pendingAttributions} pendentes`,
          action: () => navigate('/atribuicoes?auto=true'),
          urgent: pendingAttributions > 0
        },
        {
          icon: '📅',
          title: 'Visitas Próximas',
          subtitle: `${urgentVisits} esta semana`,
          action: () => navigate('/calendario?filter=upcoming'),
          urgent: urgentVisits > 0
        },
        {
          icon: '📊',
          title: 'Relatório Mensal',
          subtitle: 'Gerar relatório',
          action: () => navigate('/configuracoes?tab=reports')
        }
      ]
    }

    // Oradores page actions
    if (path.startsWith('/oradores')) {
      const withAllergies = oradores.filter(o => o.allergies?.type).length
      const withoutPhone = oradores.filter(o => !o.phone).length

      return [
        {
          icon: '⚠️',
          title: 'Verificar Alergias',
          subtitle: `${withAllergies} com alergias`,
          action: () => navigate('/oradores?filter=allergies'),
          urgent: withAllergies > 0
        },
        {
          icon: '📱',
          title: 'Contatos Incompletos',
          subtitle: `${withoutPhone} sem telefone`,
          action: () => navigate('/oradores?filter=no-phone'),
          urgent: withoutPhone > 0
        },
        {
          icon: '📋',
          title: 'Importar Lista',
          subtitle: 'Adicionar múltiplos',
          action: () => document.getElementById('import-file')?.click()
        }
      ]
    }

    // Default actions
    return [
      {
        icon: '👤',
        title: 'Novo Orador',
        subtitle: 'Adicionar visitante',
        action: () => navigate('/oradores?new=true')
      },
      {
        icon: '🏠',
        title: 'Novo Anfitrião',
        subtitle: 'Adicionar host',
        action: () => navigate('/hotes?new=true')
      },
      {
        icon: '🔗',
        title: 'Nova Atribuição',
        subtitle: 'Conectar orador-anfitrião',
        action: () => navigate('/atribuicoes?new=true')
      }
    ]
  }

  const actions = getContextualActions()

  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <h3>Ações Rápidas</h3>
        <span className="quick-actions-subtitle">Baseado no contexto atual</span>
      </div>
      
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`quick-action-item ${action.urgent ? 'urgent' : ''}`}
            onClick={action.action}
          >
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <div className="action-title">{action.title}</div>
              <div className="action-subtitle">{action.subtitle}</div>
            </div>
            {action.urgent && <div className="urgent-indicator">!</div>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions