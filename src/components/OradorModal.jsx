import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function OradorModal({ orador, onSave, onClose }) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    nom: '',
    congregation: '',
    phone: '',
    type: 'visiteur',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '',
    nextTalkNoOrType: '',
    needs: {
      hebergement: false,
      repas: false,
      transport: false,
      autres: ''
    },
    allergies: {
      type: null,
      details: ''
    },
    notes: ''
  })

  useEffect(() => {
    if (orador) {
      setFormData({
        nom: orador.nom || '',
        congregation: orador.congregation || '',
        phone: orador.phone || '',
        type: orador.type || 'visiteur',
        lastVisitDate: orador.lastVisitDate || '',
        lastTalkNoOrType: orador.lastTalkNoOrType || '',
        nextVisitDate: orador.nextVisitDate || '',
        nextTalkNoOrType: orador.nextTalkNoOrType || '',
        needs: {
          hebergement: orador.needs?.hebergement || false,
          repas: orador.needs?.repas || false,
          transport: orador.needs?.transport || false,
          autres: orador.needs?.autres || ''
        },
        allergies: {
          type: orador.allergies?.type || null,
          details: orador.allergies?.details || ''
        },
        notes: orador.notes || ''
      })
    }
  }, [orador])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNeedsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      needs: {
        ...prev.needs,
        [field]: value
      }
    }))
  }

  const handleAllergiesChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [field]: value
      }
    }))
  }

  return (
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
      <div className="card" style={{ 
        maxWidth: '500px', 
        width: '100%', 
        maxHeight: '80vh', 
        overflow: 'auto',
        margin: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          borderBottom: '1px solid #eee',
          paddingBottom: '16px'
        }}>
          <h3 style={{ margin: 0, color: 'var(--jw-blue)' }}>
            ✏️ Editar Orador
          </h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '24px', 
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', paddingRight: '8px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1 }}>
          {/* Informações básicas */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--jw-blue)', marginBottom: '12px' }}>
              📋 Informações Básicas
            </h4>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Nome *
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Congregação *
              </label>
              <input
                type="text"
                value={formData.congregation}
                onChange={(e) => handleInputChange('congregation', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Tipo de Orador *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="local">🏠 Local (Lyon)</option>
                <option value="visiteur">✈️ Visiteur (Extérieur)</option>
              </select>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                {formData.type === 'local' ? 
                  'Orateur de la congrégation de Lyon' : 
                  'Orateur visiteur nécessitant hébergement/transport'
                }
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Telefone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Visitas */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--jw-blue)', marginBottom: '12px' }}>
              📅 Visitas
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Última Visita
                </label>
                <input
                  type="date"
                  value={formData.lastVisitDate}
                  onChange={(e) => handleInputChange('lastVisitDate', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Próxima Visita
                </label>
                <input
                  type="date"
                  value={formData.nextVisitDate}
                  onChange={(e) => handleInputChange('nextVisitDate', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  N° Último Discurso
                </label>
                <input
                  type="text"
                  value={formData.lastTalkNoOrType}
                  onChange={(e) => handleInputChange('lastTalkNoOrType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  N° Próximo Discurso
                </label>
                <input
                  type="text"
                  value={formData.nextTalkNoOrType}
                  onChange={(e) => handleInputChange('nextTalkNoOrType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Necessidades */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--jw-blue)', marginBottom: '12px' }}>
              🏠 Necessidades
            </h4>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.needs.hebergement}
                  onChange={(e) => handleNeedsChange('hebergement', e.target.checked)}
                />
                🏠 Hospedagem
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.needs.repas}
                  onChange={(e) => handleNeedsChange('repas', e.target.checked)}
                />
                🍽️ Refeições
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.needs.transport}
                  onChange={(e) => handleNeedsChange('transport', e.target.checked)}
                />
                🚗 Transporte
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Outras Necessidades
              </label>
              <textarea
                value={formData.needs.autres}
                onChange={(e) => handleNeedsChange('autres', e.target.value)}
                placeholder="Descreva outras necessidades específicas..."
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minHeight: '60px'
                }}
              />
            </div>
          </div>

          {/* Alergias */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--jw-blue)', marginBottom: '12px' }}>
              🚨 Alergias
            </h4>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Tipo de Alergia
              </label>
              <select
                value={formData.allergies.type || ''}
                onChange={(e) => handleAllergiesChange('type', e.target.value || null)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="">Sem alergias</option>
                <option value="moderee">Moderada</option>
                <option value="grave">Grave</option>
              </select>
            </div>

            {formData.allergies.type && (
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Detalhes da Alergia
                </label>
                <textarea
                  value={formData.allergies.details}
                  onChange={(e) => handleAllergiesChange('details', e.target.value)}
                  placeholder="Descreva os detalhes da alergia..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    minHeight: '60px'
                  }}
                />
              </div>
            )}
          </div>

          {/* Notas */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--jw-blue)', marginBottom: '12px' }}>
              📝 Notas
            </h4>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Notas adicionais sobre o orador..."
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                minHeight: '80px'
              }}
            />
          </div>

            </div>
            
            {/* Botões fixos en bas */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #eee',
              backgroundColor: 'white',
              position: 'sticky',
              bottom: 0
            }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1 }}
              >
                💾 Salvar
              </button>
              <button 
                type="button" 
                onClick={onClose} 
                className="btn btn-secondary"
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OradorModal