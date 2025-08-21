import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'

const SmartAlerts = () => {
  const navigate = useNavigate()
  const { oradores, hotes, attributions, eventos } = useAppStore()

  const alerts = useMemo(() => {
    const alertList = []
    const today = new Date()
    const oneWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    // Conflitos de alergias graves
    const allergyConflicts = attributions.filter(attr => {
      const orador = oradores.find(o => o.id === attr.orateurId)
      const host = hotes.find(h => h.id === attr.hoteId)
      
      if (!orador?.allergies?.type || orador.allergies.type !== 'grave') return false
      if (!host?.contraintes?.allergiesEviter) return false
      
      return host.contraintes.allergiesEviter.some(allergen => 
        orador.allergies.details?.toLowerCase().includes(allergen.toLowerCase())
      )
    })

    if (allergyConflicts.length > 0) {
      alertList.push({
        type: 'critical',
        icon: '🚨',
        title: 'Conflito de Alergias Graves',
        message: `${allergyConflicts.length} atribuição(ões) com risco de alergia grave`,
        action: () => navigate('/atribuicoes?filter=allergy-conflicts'),
        priority: 1
      })
    }

    // Visitas próximas sem atribuição
    const upcomingWithoutHost = oradores.filter(orador => {
      if (!orador.nextVisitDate) return false
      
      const nextVisit = new Date(orador.nextVisitDate)
      if (nextVisit < today || nextVisit > oneWeek) return false
      
      return !attributions.some(attr => 
        attr.orateurId === orador.id && 
        attr.statut !== 'annulé' &&
        new Date(attr.dateVisite).toDateString() === nextVisit.toDateString()
      )
    })

    if (upcomingWithoutHost.length > 0) {
      alertList.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Visitas Sem Anfitrião',
        message: `${upcomingWithoutHost.length} visita(s) próxima(s) sem atribuição`,
        action: () => navigate('/atribuicoes?filter=unassigned-upcoming'),
        priority: 2
      })
    }

    // Anfitriões sobrecarregados
    const overloadedHosts = hotes.filter(host => {
      const currentAssignments = attributions.filter(attr => 
        attr.hoteId === host.id && 
        attr.statut === 'confirmé' &&
        new Date(attr.dateVisite) >= today
      ).length

      return currentAssignments > (host.capacites?.hebergement || 1)
    })

    if (overloadedHosts.length > 0) {
      alertList.push({
        type: 'info',
        icon: '📊',
        title: 'Anfitriões Sobrecarregados',
        message: `${overloadedHosts.length} anfitrião(ões) acima da capacidade`,
        action: () => navigate('/hotes?filter=overloaded'),
        priority: 3
      })
    }

    // Oradores sem contato há muito tempo
    const longTimeNoContact = oradores.filter(orador => {
      if (!orador.lastVisitDate) return false
      
      const lastVisit = new Date(orador.lastVisitDate)
      const monthsAgo = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
      
      return lastVisit < monthsAgo && !orador.nextVisitDate
    })

    if (longTimeNoContact.length > 0) {
      alertList.push({
        type: 'suggestion',
        icon: '💡',
        title: 'Reconectar Oradores',
        message: `${longTimeNoContact.length} orador(es) sem contato há 6+ meses`,
        action: () => navigate('/oradores?filter=long-no-contact'),
        priority: 4
      })
    }

    // Backup automático necessário
    const lastBackup = localStorage.getItem('last-backup-date')
    const needsBackup = !lastBackup || 
      new Date(lastBackup) < new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    if (needsBackup) {
      alertList.push({
        type: 'info',
        icon: '💾',
        title: 'Backup Recomendado',
        message: 'Faça backup dos seus dados regularmente',
        action: () => navigate('/configuracoes?tab=backup'),
        priority: 5
      })
    }

    return alertList.sort((a, b) => a.priority - b.priority).slice(0, 3)
  }, [oradores, hotes, attributions, eventos, navigate])

  if (alerts.length === 0) {
    return (
      <div className="smart-alerts empty">
        <div className="alert-icon">✅</div>
        <div className="alert-content">
          <h4>Tudo em Ordem!</h4>
          <p>Nenhum alerta importante no momento</p>
        </div>
      </div>
    )
  }

  return (
    <div className="smart-alerts">
      {alerts.map((alert, index) => (
        <div 
          key={index}
          className={`alert-item ${alert.type}`}
          onClick={alert.action}
        >
          <div className="alert-icon">{alert.icon}</div>
          <div className="alert-content">
            <h4>{alert.title}</h4>
            <p>{alert.message}</p>
          </div>
          <div className="alert-arrow">→</div>
        </div>
      ))}
    </div>
  )
}

export default SmartAlerts