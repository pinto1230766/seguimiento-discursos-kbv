import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'

function Hotes() {
  const { t } = useTranslation()
  const { hotes, addHote, updateHote, deleteHote } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [editingHote, setEditingHote] = useState(null)

  const [formData, setFormData] = useState({
    nom: '',
    phone: '',
    capacites: {
      hebergement: 1,
      repas: 2,
      transport: false
    },
    disponibilites: [],
    contraintes: {
      allergiesEviter: [],
      autres: ''
    },
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingHote) {
      updateHote(editingHote.id, formData)
    } else {
      addHote(formData)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nom: '',
      phone: '',
      capacites: {
        hebergement: 1,
        repas: 2,
        transport: false
      },
      disponibilites: [],
      contraintes: {
        allergiesEviter: [],
        autres: ''
      },
      notes: ''
    })
    setShowForm(false)
    setEditingHote(null)
  }

  const handleEdit = (hote) => {
    setFormData(hote)
    setEditingHote(hote)
    setShowForm(true)
  }

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
            {editingHote ? t('editar') : t('adicionar')} {t('anfitriao')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {t('nomeAnfitriao')} *
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
              {t('telefone')} *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              {t('capacidades')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  {t('hospedagem')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.capacites.hebergement}
                  onChange={(e) => setFormData({
                    ...formData,
                    capacites: {...formData.capacites, hebergement: parseInt(e.target.value)}
                  })}
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
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  {t('refeicoes')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={formData.capacites.repas}
                  onChange={(e) => setFormData({
                    ...formData,
                    capacites: {...formData.capacites, repas: parseInt(e.target.value)}
                  })}
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
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <input
                type="checkbox"
                checked={formData.capacites.transport}
                onChange={(e) => setFormData({
                  ...formData,
                  capacites: {...formData.capacites, transport: e.target.checked}
                })}
              />
              {t('podeFornecerTransporte')}
            </label>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {t('restricoesPreferencias')}
            </label>
            <textarea
              placeholder={t('exemploRestricoes')}
              value={formData.contraintes.autres}
              onChange={(e) => setFormData({
                ...formData,
                contraintes: {...formData.contraintes, autres: e.target.value}
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
          {t('anfitrioes')} ({hotes.length})
        </h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          ➕ {t('adicionarAnfitriao')}
        </button>
      </div>

      {hotes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {t('nenhumAnfitriaoCadastrado')}
          </p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            ➕ {t('adicionarPrimeiroAnfitriao')}
          </button>
        </div>
      ) : (
        <div>
          {hotes.map(hote => (
            <div key={hote.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', color: 'var(--jw-blue)' }}>
                    {hote.nom}
                  </h3>
                  <p style={{ margin: '0 0 8px 0', color: '#666' }}>
                    📞 {hote.phone}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                      🏠 {hote.capacites.hebergement} {hote.capacites.hebergement === 1 ? t('pessoa') : t('pessoas')}
                    </span>
                    <span style={{ background: '#e8f5e8', color: '#388e3c', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                      🍽️ {hote.capacites.repas} {hote.capacites.repas === 1 ? t('couvert') : t('couverts')}
                    </span>
                    {hote.capacites.transport && (
                      <span style={{ background: '#fff3e0', color: '#f57c00', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                        {t('transporte')}
                      </span>
                    )}
                  </div>

                  {hote.contraintes?.autres && (
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '8px', 
                      background: '#f5f5f5', 
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      ℹ️ {hote.contraintes.autres}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleEdit(hote)}
                    style={{ background: 'none', border: 'none', fontSize: '20px', padding: '8px' }}
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(t('excluirAnfitriao'))) {
                        deleteHote(hote.id)
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

export default Hotes