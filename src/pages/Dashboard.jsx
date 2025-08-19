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

  const MetricCard = ({ title, value, icon, color = '#f8f9fa' }) => (
    <div className="card" style={{
      background: '#ffffff',
      color: '#1d1d1f',
      textAlign: 'center',
      minHeight: '70px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '12px 8px',
      borderRadius: '12px',
      border: '1px solid #e5e5e7',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ fontSize: '20px', marginBottom: '4px', opacity: 0.7 }}>{icon}</div>
      <div style={{ fontSize: '26px', fontWeight: '600', marginBottom: '3px', lineHeight: '1', color: '#1d1d1f' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', opacity: 0.6, fontWeight: '400', lineHeight: '1.2', color: '#86868b' }}>{title}</div>
    </div>
  )

  return (
    <div className="container fade-in">

      {/* Métriques principales */}
      <div className="metrics-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <MetricCard
          title={t('visitantesAtuais')}
          value={metrics.visitantesAtuais || 0}
          icon="👥"
        />
        <MetricCard
          title={t('necessidadesNaoCobertas')}
          value={metrics.necessidadesNaoCobertas || 0}
          icon="⚠️"
        />
        <MetricCard
          title={t('anfitriaoesDisponiveis')}
          value={metrics.anfitriaoesDisponiveis || 0}
          icon="🏠"
        />
        <MetricCard
          title={t('alertasAlergia')}
          value={metrics.alertasAlergia || 0}
          icon="🚨"
        />
      </div>

      {/* Visitantes Recentes */}
      <div className="card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: 'var(--jw-blue)', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Próximas Visitas
          </h3>
          <button 
            onClick={() => window.location.href = '/oradores'}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--jw-blue)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            Ver todos →
          </button>
        </div>
        
        {oradores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>👥</div>
            <p style={{ color: '#86868b', fontSize: '15px', margin: 0 }}>Nenhum orador cadastrado</p>
            <button 
              onClick={() => window.location.href = '/oradores'}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                background: 'var(--jw-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              + Adicionar Orador
            </button>
          </div>
        ) : (
          <div>
            {oradores.slice(0, 3).map(orador => {
              const hasNextVisit = orador.nextVisitDate && orador.nextVisitDate.trim() !== ''
              const hasAllergies = orador.allergies?.type
              
              return (
                <div 
                  key={orador.id} 
                  onClick={() => handleOradorSelect(orador)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    marginBottom: '8px',
                    background: hasNextVisit ? '#f8f9ff' : '#ffffff',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', fontSize: '16px', color: '#1d1d1f' }}>
                        {orador.nom}
                      </span>
                      {hasAllergies && (
                        <span style={{ 
                          marginLeft: '8px', 
                          fontSize: '12px',
                          background: orador.allergies.type === 'grave' ? '#ff3b30' : '#ff9500',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '500'
                        }}>
                          {orador.allergies.type === 'grave' ? '⚠️ GRAVE' : '⚠️ ALERGIA'}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '14px', color: '#86868b' }}>
                      {orador.congregation}
                    </div>
                    {hasNextVisit && (
                      <div style={{ fontSize: '12px', color: 'var(--jw-blue)', fontWeight: '500', marginTop: '2px' }}>
                        📅 Próxima: {new Date(orador.nextVisitDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {orador.phone && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(`https://wa.me/${orador.phone.replace(/\D/g, '')}`, '_blank')
                        }}
                        style={{
                          background: '#25d366',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          marginBottom: '4px'
                        }}
                      >
                        📱 WhatsApp
                      </button>
                    )}
                    <span style={{ fontSize: '12px', color: '#86868b' }}>
                      {orador.lastVisitDate ? `Última: ${orador.lastVisitDate}` : 'Primeira visita'}
                    </span>
                  </div>
                </div>
              )
            })}
            
            {oradores.length > 3 && (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <button 
                  onClick={() => window.location.href = '/oradores'}
                  style={{
                    background: 'none',
                    border: '1px solid #e5e5e7',
                    color: '#86868b',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Ver mais {oradores.length - 3} oradores
                </button>
              </div>
            )}
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
      <div className="card" style={{ padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ color: 'var(--jw-blue)', fontSize: '16px', fontWeight: '600', margin: 0 }}>
            Atribuições
          </h3>
          <button 
            onClick={() => window.location.href = '/atribuicoes'}
            style={{
              background: 'var(--jw-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Gerenciar
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '8px' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#34c759' }}>
              {attributions.filter(a => a.statut === 'confirmé').length}
            </div>
            <div style={{ fontSize: '11px', color: '#86868b' }}>Confirmadas</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#ff9500' }}>
              {attributions.filter(a => a.statut === 'proposé').length}
            </div>
            <div style={{ fontSize: '11px', color: '#86868b' }}>Propostas</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#ff3b30' }}>
              {oradores.filter(o => !attributions.some(a => a.orateurId === o.id && a.statut !== 'annulé')).length}
            </div>
            <div style={{ fontSize: '11px', color: '#86868b' }}>Sem Atribuição</div>
          </div>
        </div>
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