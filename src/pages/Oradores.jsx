import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'

function Oradores() {
  const { t } = useTranslation()
  const { oradores, addOrador, updateOrador, deleteOrador } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [editingOrador, setEditingOrador] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [formData, setFormData] = useState({
    nom: '',
    congregation: '',
    phone: '',
    lastVisitDate: '',
    lastTalkNoOrType: '',
    nextVisitDate: '',
    nextTalkNoOrType: '',
    needs: {
      hebergement: false,
      repas: false,
      transport: false,
      frais: false,
      autres: ''
    },
    besoinsDivers: '',
    allergies: {
      type: null,
      details: ''
    },
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingOrador) {
      updateOrador(editingOrador.id, formData)
    } else {
      addOrador(formData)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nom: '',
      congregation: '',
      phone: '',
      lastVisitDate: '',
      lastTalkNoOrType: '',
      nextVisitDate: '',
      nextTalkNoOrType: '',
      needs: {
        hebergement: false,
        repas: false,
        transport: false,
        frais: false,
        autres: ''
      },
      besoinsDivers: '',
      allergies: {
        type: null,
        details: ''
      },
      notes: ''
    })
    setShowForm(false)
    setEditingOrador(null)
  }

  const handleEdit = (orador) => {
    setFormData(orador)
    setEditingOrador(orador)
    setShowForm(true)
  }

  const filteredOradores = oradores.filter(orador =>
    orador.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orador.congregation?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (showForm) {
    return (
      <div className="container fade-in">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button 
            onClick={resetForm}
            style={{ background: 'none', border: 'none', fontSize: '24px', marginRight: '12px' }}
          >
            ←
          </button>
          <h2 style={{ color: 'var(--jw-blue)', margin: 0 }}>
            {editingOrador ? t('editar') : t('adicionar')} {t('oradores')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {t('nomeOrador')} *
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {t('congregacao')} *
            </label>
            <input
              type="text"
              value={formData.congregation}
              onChange={(e) => setFormData({...formData, congregation: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {t('telefone')}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                {t('ultimaVisita')}
              </label>
              <input
                type="date"
                value={formData.lastVisitDate}
                onChange={(e) => setFormData({...formData, lastVisitDate: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                {t('proximaVisita')}
              </label>
              <input
                type="date"
                value={formData.nextVisitDate}
                onChange={(e) => setFormData({...formData, nextVisitDate: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              {t('necessidades')}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.needs.hebergement}
                  onChange={(e) => setFormData({
                    ...formData,
                    needs: {...formData.needs, hebergement: e.target.checked}
                  })}
                />
                {t('hospedagem')}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.needs.repas}
                  onChange={(e) => setFormData({
                    ...formData,
                    needs: {...formData.needs, repas: e.target.checked}
                  })}
                />
                {t('refeicoes')}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.needs.transport}
                  onChange={(e) => setFormData({
                    ...formData,
                    needs: {...formData.needs, transport: e.target.checked}
                  })}
                />
                {t('transporte')}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.needs.frais}
                  onChange={(e) => setFormData({
                    ...formData,
                    needs: {...formData.needs, frais: e.target.checked}
                  })}
                />
                Frais
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {t('alergias')}
            </label>
            <select
              value={formData.allergies.type || ''}
              onChange={(e) => setFormData({
                ...formData,
                allergies: {...formData.allergies, type: e.target.value || null}
              })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                marginBottom: '8px'
              }}
            >
              <option value="">{t('semAlergias')}</option>
              <option value="moderada">{t('moderada')}</option>
              <option value="grave">{t('grave')}</option>
            </select>
            {formData.allergies.type && (
              <textarea
                placeholder={t('detalhesAlergias')}
                value={formData.allergies.details}
                onChange={(e) => setFormData({
                  ...formData,
                  allergies: {...formData.allergies, details: e.target.value}
                })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  minHeight: '80px'
                }}
              />
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {t('besoinsDivers')}
            </label>
            <textarea
              placeholder={t('outrosBesoins')}
              value={formData.besoinsDivers}
              onChange={(e) => setFormData({
                ...formData,
                besoinsDivers: e.target.value
              })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '80px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {t('salvar')}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              {t('cancelar')}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--jw-blue)', margin: 0 }}>
          {t('oradores')} ({oradores.length})
        </h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          ➕ {t('adicionar')}
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder={t('buscarOrador')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      {filteredOradores.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {searchTerm ? t('nenhumOradorEncontrado') : t('nenhumOradorCadastrado')}
          </p>
          {!searchTerm && (
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              ➕ {t('adicionarPrimeiroOrador')}
            </button>
          )}
        </div>
      ) : (
        <div>
          {filteredOradores.map(orador => (
            <div key={orador.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', color: 'var(--jw-blue)' }}>
                    {orador.nom}
                  </h3>
                  <p style={{ margin: '0 0 8px 0', color: '#666' }}>
                    📍 {orador.congregation}
                  </p>
                  {orador.phone && (
                    <p style={{ margin: '0 0 8px 0', color: '#666' }}>
                      📞 {orador.phone}
                    </p>
                  )}
                  {orador.nextVisitDate && (
                    <p style={{ margin: '0 0 8px 0', color: 'var(--jw-blue)' }}>
                      {t('proximaVisita')}: {new Date(orador.nextVisitDate).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    <span style={{ 
                      background: orador.type === 'local' ? '#e8f5e8' : '#e3f2fd', 
                      color: orador.type === 'local' ? '#388e3c' : '#1976d2', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      marginRight: '4px'
                    }}>
                      {orador.type === 'local' ? t('local') : t('visitante')}
                    </span>
                    {orador.needs?.hebergement && (
                      <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                        🏠 Hospedagem
                      </span>
                    )}
                    {orador.needs?.repas && (
                      <span style={{ background: '#e8f5e8', color: '#388e3c', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                        🍽️ Refeições
                      </span>
                    )}
                    {orador.needs?.transport && (
                      <span style={{ background: '#fff3e0', color: '#f57c00', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                        🚗 Transporte
                      </span>
                    )}
                    {orador.needs?.frais && (
                      <span style={{ background: '#f3e5f5', color: '#7b1fa2', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                        💰 Frais
                      </span>
                    )}
                    {orador.besoinsDivers && (
                      <span style={{ background: '#e1f5fe', color: '#0277bd', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                        📝 Besoins divers
                      </span>
                    )}
                    {orador.allergies?.type && (
                      <span style={{ 
                        background: orador.allergies.type === 'grave' ? '#ffebee' : '#fff8e1', 
                        color: orador.allergies.type === 'grave' ? '#d32f2f' : '#f57c00', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px' 
                      }}>
                        🚨 {t('alergia')} {t(orador.allergies.type)}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleEdit(orador)}
                    style={{ background: 'none', border: 'none', fontSize: '20px', padding: '8px' }}
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(t('excluirOrador'))) {
                        deleteOrador(orador.id)
                      }
                    }}
                    style={{ background: 'none', border: 'none', fontSize: '20px', padding: '8px' }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Oradores