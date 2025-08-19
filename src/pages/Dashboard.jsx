import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'
import { useEffect, useState } from 'react'
import DashboardCalendar from '../components/DashboardCalendar'
import OradorModal from '../components/OradorModal'
import { initialOradores, initialHotes } from '../data/initialData'

function Dashboard() {
  const { t } = useTranslation()
  const { getMetrics, oradores, attributions, eventos, updateOrador, addOrador, hotes, addHote } = useAppStore()
  const [metrics, setMetrics] = useState({})
  const [selectedOrador, setSelectedOrador] = useState(null)
  const [showOradorModal, setShowOradorModal] = useState(false)
  
  const handleDateSelect = (date) => {
    // Trouver les orateurs qui visitent cette date
    const oradoresForDate = oradores.filter(o => {
      return o.nextVisitDate === date || 
             eventos.some(e => e.date === date && e.orateurNom === o.nom)
    })
    
    if (oradoresForDate.length > 0) {
      setSelectedOrador(oradoresForDate[0])
      setShowOradorModal(true)
    }
  }
  
  const handleOradorSelect = (orador) => {
    setSelectedOrador(orador)
    setShowOradorModal(true)
  }
  
  const handleOradorUpdate = (updatedOrador) => {
    updateOrador(selectedOrador.id, updatedOrador)
    setShowOradorModal(false)
    setSelectedOrador(null)
  }

  useEffect(() => {
    setMetrics(getMetrics())
  }, [oradores, attributions, getMetrics])
  
  // Charger les données initiales une seule fois
  useEffect(() => {
    const hasLoadedData = localStorage.getItem('discursos-kbv-initial-loaded')
    
    if (!hasLoadedData && oradores.length === 0) {
      initialOradores.forEach(orador => {
        addOrador(orador)
      })
      
      initialHotes.forEach(hote => {
        addHote(hote)
      })
      
      localStorage.setItem('discursos-kbv-initial-loaded', 'true')
    }
  }, [addOrador, addHote, oradores.length])

  const MetricCard = ({ title, value, icon, color = 'var(--jw-blue)' }) => (
    <div className="card" style={{
      background: color,
      color: 'white',
      textAlign: 'center',
      minHeight: '60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '8px'
    }}>
      <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '2px' }}>
        {value}
      </div>
      <div style={{ fontSize: '11px', opacity: 0.9 }}>{title}</div>
    </div>
  )

  return (
    <div className="container fade-in">
      <h2 style={{ marginBottom: '20px', color: 'var(--jw-blue)' }}>
        {t('dashboard')}
      </h2>

      {/* Métriques principales */}
      <div className="metrics-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <MetricCard
          title={t('visitantesAtuais')}
          value={metrics.visitantesAtuais || 0}
          icon="👥"
          color="var(--jw-blue)"
        />
        <MetricCard
          title={t('necessidadesNaoCobertas')}
          value={metrics.necessidadesNaoCobertas || 0}
          icon="⚠️"
          color="var(--warning)"
        />
        <MetricCard
          title={t('anfitriaoesDisponiveis')}
          value={metrics.anfitriaoesDisponiveis || 0}
          icon="🏠"
          color="var(--success)"
        />
        <MetricCard
          title={t('alertasAlergia')}
          value={metrics.alertasAlergia || 0}
          icon="🚨"
          color="var(--danger)"
        />
      </div>

      {/* Visitantes Recentes */}
      <div className="card">
        <h3 style={{ marginBottom: '12px', color: 'var(--jw-blue)', fontSize: '16px' }}>
          {t('visitantesRecentes')}
        </h3>
        {oradores.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '12px' }}>
            {t('noSpeakersYet')}
          </p>
        ) : (
          <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
            {oradores.filter(orador => orador.nextVisitDate && orador.nextVisitDate.trim() !== '').map(orador => (
              <div key={orador.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 0',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '13px' }}>{orador.nom}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>
                    {orador.congregation}
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: '#666' }}>
                  {orador.lastVisitDate || t('noVisit')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alertas Importantes */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          {t('alertasImportantes')}
        </h3>
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          {t('noAlerts')}
        </div>
      </div>

      {/* Calendário de Visitas */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          📅 {t('visitCalendar')}
        </h3>
        
        <DashboardCalendar 
          oradores={oradores}
          eventos={eventos}
          onDateSelect={handleDateSelect}
          onOradorSelect={handleOradorSelect}
        />
      </div>

      {/* Atribuições e Compatibilidade */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          {t('assignmentsAndCompatibility')}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--success)' }}>
              {attributions.filter(a => a.statut === 'confirmé').length}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{t('confirmed')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--warning)' }}>
              {attributions.filter(a => a.statut === 'proposé').length}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{t('proposed')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--danger)' }}>
              {oradores.filter(o => !attributions.some(a => a.orateurId === o.id && a.statut !== 'annulé')).length}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{t('unassigned')}</div>
          </div>
        </div>
        
        <button 
          onClick={() => window.location.href = '/atribuicoes'}
          className="btn btn-primary" 
          style={{ width: '100%' }}
        >
          {t('manageAssignments')}
        </button>
      </div>


      
      {/* Modal Orador */}
      {showOradorModal && selectedOrador && (
        <OradorModal
          orador={selectedOrador}
          onSave={handleOradorUpdate}
          onClose={() => {
            setShowOradorModal(false)
            setSelectedOrador(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard