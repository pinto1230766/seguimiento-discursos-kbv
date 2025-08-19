import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'

function Atribuicoes() {
  const { t } = useTranslation()
  const { 
    oradores, 
    hotes, 
    attributions, 
    addAttribution, 
    updateAttribution, 
    deleteAttribution 
  } = useAppStore()
  
  const [selectedOrador, setSelectedOrador] = useState(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [autoAssignResults, setAutoAssignResults] = useState([])

  // Vérifier la compatibilité allergies
  const checkCompatibility = (orador, hote) => {
    if (!orador.allergies?.type || !hote.contraintes?.allergiesEviter) {
      return { compatible: true, level: 'ok' }
    }

    const oradorAllergies = orador.allergies.details?.toLowerCase() || ''
    const hoteRestrictions = hote.contraintes.allergiesEviter.map(a => a.toLowerCase())
    
    const hasConflict = hoteRestrictions.some(restriction => 
      oradorAllergies.includes(restriction)
    )

    if (hasConflict && orador.allergies.type === 'grave') {
      return { compatible: false, level: 'grave', message: 'Incompatibilité grave détectée' }
    } else if (hasConflict && orador.allergies.type === 'moderee') {
      return { compatible: true, level: 'warning', message: 'Attention: allergie modérée' }
    }

    return { compatible: true, level: 'ok' }
  }

  // Attribution automatique
  const autoAssign = () => {
    const results = []
    const availableHotes = [...hotes]
    
    oradores.forEach(orador => {
      if (!orador.nextVisitDate) return
      
      // Vérifier si déjà attribué
      const existingAttribution = attributions.find(a => 
        a.orateurId === orador.id && a.statut !== 'annulé'
      )
      if (existingAttribution) return

      // Trouver les hôtes compatibles
      const compatibleHotes = availableHotes.filter(hote => {
        const compatibility = checkCompatibility(orador, hote)
        
        // Vérifier les capacités
        const needsHebergement = orador.needs?.hebergement && hote.capacites.hebergement > 0
        const needsRepas = orador.needs?.repas && hote.capacites.repas > 0
        const needsTransport = orador.needs?.transport && hote.capacites.transport
        
        const meetsNeeds = (!orador.needs?.hebergement || needsHebergement) &&
                          (!orador.needs?.repas || needsRepas) &&
                          (!orador.needs?.transport || needsTransport)

        return compatibility.compatible && meetsNeeds
      })

      if (compatibleHotes.length > 0) {
        // Prendre le premier hôte compatible
        const assignedHote = compatibleHotes[0]
        const compatibility = checkCompatibility(orador, assignedHote)
        
        results.push({
          orador,
          hote: assignedHote,
          compatibility,
          attribution: {
            orateurId: orador.id,
            hoteId: assignedHote.id,
            dateDebut: orador.nextVisitDate,
            dateFin: orador.nextVisitDate, // Même jour par défaut
            couvre: {
              hebergement: orador.needs?.hebergement || false,
              repas: orador.needs?.repas || false,
              transport: orador.needs?.transport || false
            },
            statut: compatibility.level === 'warning' ? 'proposé' : 'confirmé',
            createdAt: new Date().toISOString(),
            createdBy: 'auto'
          }
        })
        
        // Retirer le hôte des disponibles si capacité limitée
        const hoteIndex = availableHotes.findIndex(h => h.id === assignedHote.id)
        if (hoteIndex !== -1) {
          availableHotes.splice(hoteIndex, 1)
        }
      } else {
        results.push({
          orador,
          hote: null,
          compatibility: { compatible: false, level: 'error', message: 'Aucun hôte compatible trouvé' },
          attribution: null
        })
      }
    })

    setAutoAssignResults(results)
  }

  // Confirmer les attributions automatiques
  const confirmAutoAssignments = () => {
    autoAssignResults.forEach(result => {
      if (result.attribution) {
        addAttribution(result.attribution)
      }
    })
    setAutoAssignResults([])
  }

  // Attribution manuelle
  const assignManually = (hoteId) => {
    if (!selectedOrador) return

    const hote = hotes.find(h => h.id === hoteId)
    const compatibility = checkCompatibility(selectedOrador, hote)

    if (!compatibility.compatible) {
      if (!confirm(`⚠️ ${compatibility.message}\n\nContinuer quand même ?`)) {
        return
      }
    }

    const attribution = {
      orateurId: selectedOrador.id,
      hoteId: hoteId,
      dateDebut: selectedOrador.nextVisitDate,
      dateFin: selectedOrador.nextVisitDate,
      couvre: {
        hebergement: selectedOrador.needs?.hebergement || false,
        repas: selectedOrador.needs?.repas || false,
        transport: selectedOrador.needs?.transport || false
      },
      statut: compatibility.level === 'warning' ? 'proposé' : 'confirmé',
      createdAt: new Date().toISOString(),
      createdBy: 'manual'
    }

    addAttribution(attribution)
    setSelectedOrador(null)
    setShowAssignModal(false)
  }

  const getOradorAttribution = (oradorId) => {
    return attributions.find(a => a.orateurId === oradorId && a.statut !== 'annulé')
  }

  const getHoteForAttribution = (attribution) => {
    return hotes.find(h => h.id === attribution.hoteId)
  }

  return (
    <div className="container fade-in">
      <h2 style={{ marginBottom: '20px', color: 'var(--jw-blue)' }}>
        Atribuições e Compatibilidade
      </h2>

      {/* Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        <button 
          onClick={autoAssign}
          className="btn btn-primary"
          style={{ padding: '16px' }}
        >
          🤖 Atribuição Automática
        </button>
        <button 
          onClick={() => setShowAssignModal(true)}
          className="btn btn-secondary"
          style={{ padding: '16px' }}
        >
          ✋ Atribuição Manual
        </button>
      </div>

      {/* Resultados da atribuição automática */}
      {autoAssignResults.length > 0 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
            Resultados da Atribuição Automática
          </h3>
          
          {autoAssignResults.map((result, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              marginBottom: '8px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: result.hote ? '#f8fff8' : '#fff8f8'
            }}>
              <div>
                <strong>{result.orador.nom}</strong>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {result.orador.congregation}
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                {result.hote ? (
                  <>
                    <div>{result.hote.nom}</div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      background: result.compatibility.level === 'ok' ? '#e8f5e8' : 
                                 result.compatibility.level === 'warning' ? '#fff8e1' : '#ffebee',
                      color: result.compatibility.level === 'ok' ? '#388e3c' : 
                             result.compatibility.level === 'warning' ? '#f57c00' : '#d32f2f'
                    }}>
                      {result.compatibility.level === 'ok' ? '✅ Compatível' : 
                       result.compatibility.level === 'warning' ? '⚠️ Atenção' : '❌ Incompatível'}
                    </span>
                  </>
                ) : (
                  <span style={{ color: '#d32f2f' }}>❌ Sem hôte disponível</span>
                )}
              </div>
            </div>
          ))}
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button 
              onClick={confirmAutoAssignments}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              ✅ Confirmar Atribuições
            </button>
            <button 
              onClick={() => setAutoAssignResults([])}
              className="btn btn-secondary"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de oradores e suas atribuições */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          Visitantes e Atribuições
        </h3>
        
        {oradores.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <p>Nenhum orador cadastrado</p>
          </div>
        ) : (
          <div>
            {oradores.map(orador => {
              const attribution = getOradorAttribution(orador.id)
              const hote = attribution ? getHoteForAttribution(attribution) : null
              const compatibility = hote ? checkCompatibility(orador, hote) : null

              return (
                <div key={orador.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  marginBottom: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', color: 'var(--jw-blue)' }}>
                      {orador.nom}
                    </h4>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      📍 {orador.congregation}
                    </div>
                    
                    {orador.nextVisitDate && (
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        📅 {new Date(orador.nextVisitDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {orador.needs?.hebergement && (
                        <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '2px 6px', borderRadius: '8px', fontSize: '12px' }}>
                          🏠
                        </span>
                      )}
                      {orador.needs?.repas && (
                        <span style={{ background: '#e8f5e8', color: '#388e3c', padding: '2px 6px', borderRadius: '8px', fontSize: '12px' }}>
                          🍽️
                        </span>
                      )}
                      {orador.needs?.transport && (
                        <span style={{ background: '#fff3e0', color: '#f57c00', padding: '2px 6px', borderRadius: '8px', fontSize: '12px' }}>
                          🚗
                        </span>
                      )}
                      {orador.allergies?.type && (
                        <span style={{ 
                          background: orador.allergies.type === 'grave' ? '#ffebee' : '#fff8e1',
                          color: orador.allergies.type === 'grave' ? '#d32f2f' : '#f57c00',
                          padding: '2px 6px', 
                          borderRadius: '8px', 
                          fontSize: '12px' 
                        }}>
                          🚨
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {attribution && hote ? (
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                          {hote.nom}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                          📞 {hote.phone}
                        </div>
                        {compatibility && (
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            background: compatibility.level === 'ok' ? '#e8f5e8' : 
                                       compatibility.level === 'warning' ? '#fff8e1' : '#ffebee',
                            color: compatibility.level === 'ok' ? '#388e3c' : 
                                   compatibility.level === 'warning' ? '#f57c00' : '#d32f2f'
                          }}>
                            {compatibility.level === 'ok' ? 'Compatível' : 
                             compatibility.level === 'warning' ? 'Atenção' : 'Incompatível'}
                          </span>
                        )}
                        <div style={{ marginTop: '8px' }}>
                          <button 
                            onClick={() => {
                              if (confirm('Remover esta atribuição?')) {
                                deleteAttribution(attribution.id)
                              }
                            }}
                            style={{ background: 'none', border: 'none', fontSize: '16px', color: '#d32f2f' }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ color: '#666', marginBottom: '8px' }}>
                          Não atribuído
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedOrador(orador)
                            setShowAssignModal(true)
                          }}
                          className="btn btn-primary"
                          style={{ padding: '8px 12px', fontSize: '14px' }}
                        >
                          Atribuir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal de atribuição manual */}
      {showAssignModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card" style={{ maxWidth: '500px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
              Atribuir Anfitrião
            </h3>
            
            {selectedOrador && (
              <div style={{ marginBottom: '20px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
                <strong>{selectedOrador.nom}</strong>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {selectedOrador.congregation}
                </div>
              </div>
            )}

            <div>
              {hotes.map(hote => {
                const compatibility = selectedOrador ? checkCompatibility(selectedOrador, hote) : { compatible: true, level: 'ok' }
                
                return (
                  <div key={hote.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    marginBottom: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    background: compatibility.compatible ? 'white' : '#fff5f5'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{hote.nom}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        📞 {hote.phone}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        🏠 {hote.capacites.hebergement} | 🍽️ {hote.capacites.repas}
                        {hote.capacites.transport && ' | 🚗'}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          background: compatibility.level === 'ok' ? '#e8f5e8' : 
                                     compatibility.level === 'warning' ? '#fff8e1' : '#ffebee',
                          color: compatibility.level === 'ok' ? '#388e3c' : 
                                 compatibility.level === 'warning' ? '#f57c00' : '#d32f2f'
                        }}>
                          {compatibility.level === 'ok' ? 'Compatível' : 
                           compatibility.level === 'warning' ? 'Atenção' : 'Incompatível'}
                        </span>
                      </div>
                      <button 
                        onClick={() => assignManually(hote.id)}
                        className="btn btn-primary"
                        style={{ padding: '8px 12px', fontSize: '14px' }}
                      >
                        Atribuir
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button 
                onClick={() => {
                  setShowAssignModal(false)
                  setSelectedOrador(null)
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Atribuicoes