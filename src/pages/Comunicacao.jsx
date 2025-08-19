import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'

function Comunicacao() {
  const { t } = useTranslation()
  const { oradores, hotes, attributions, updateWhatsappTemplate, getWhatsappTemplate } = useAppStore()
  const [selectedTemplate, setSelectedTemplate] = useState('confirmation')
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const [customMessage, setCustomMessage] = useState('')
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [editingMessage, setEditingMessage] = useState('')

  const templates = {
    confirmation: {
      name: 'Confirmação de Hospedagem',
      message: `Olá {HOTE_NOM}! 👋

Confirmamos a hospedagem do irmão {ORATEUR_NOM} da congregação {CONGREGATION} no dia {DATE}.

Necessidades:
{BESOINS}

{ALLERGIE}

Obrigado pela sua hospitalidade! 🏠

JW.org - Seguimiento Discursos KBV`
    },
    reminder_7: {
      name: 'Lembrete J-7',
      message: `Olá {ORATEUR_NOM}! 📅

Lembramos que sua visita está agendada para {DATE} (em 7 dias).

Anfitrião: {HOTE_NOM}
Telefone: {HOTE_PHONE}

Por favor, confirme sua presença.

JW.org - Seguimiento Discursos KBV`
    },
    reminder_2: {
      name: 'Lembrete J-2',
      message: `Olá {ORATEUR_NOM}! ⏰

Sua visita é amanhã ({DATE})!

Anfitrião: {HOTE_NOM}
Telefone: {HOTE_PHONE}
Endereço: {ADRESSE}

Tenha uma boa viagem! 🚗

JW.org - Seguimiento Discursos KBV`
    },
    allergy_alert: {
      name: 'Alerta de Alergia',
      message: `⚠️ IMPORTANTE - Alerta de Alergia

Olá {HOTE_NOM},

O irmão {ORATEUR_NOM} possui alergia {ALLERGIE_TYPE}:
{ALLERGIE_DETAILS}

Por favor, tome as precauções necessárias.

Obrigado pela atenção! 🙏

JW.org - Seguimiento Discursos KBV`
    },
    orador_info: {
      name: 'Informações do Orador',
      message: `Olá! 👋

Informações sobre o orador {ORATEUR_NOM} da congregação {CONGREGATION}:

📅 Data da visita: {DATE}

🏠 Necessidades:
{BESOINS}

{ALLERGIE}

{BESOINS_DIVERS}

{FRAIS_INFO}

Obrigado pela colaboração!

JW.org - Seguimiento Discursos KBV`
    },
    custom: {
      name: 'Mensagem Personalizada',
      message: ''
    }
  }

  const replaceVariables = (message, orador, hote, attribution) => {
    return message
      .replace(/{ORATEUR_NOM}/g, orador?.nom || '[Nome do Orador]')
      .replace(/{CONGREGATION}/g, orador?.congregation || '[Congregação]')
      .replace(/{HOTE_NOM}/g, hote?.nom || '[Nome do Anfitrião]')
      .replace(/{HOTE_PHONE}/g, hote?.phone || '[Telefone do Anfitrião]')
      .replace(/{DATE}/g, attribution?.dateDebut ? new Date(attribution.dateDebut).toLocaleDateString('pt-BR') : '[Data]')
      .replace(/{ADRESSE}/g, '[Endereço do Anfitrião]')
      .replace(/{BESOINS}/g, generateNeedsText(orador))
      .replace(/{ALLERGIE}/g, generateAllergyText(orador))
      .replace(/{ALLERGIE_TYPE}/g, orador?.allergies?.type || '[Tipo de Alergia]')
      .replace(/{ALLERGIE_DETAILS}/g, orador?.allergies?.details || '[Detalhes da Alergia]')
      .replace(/{BESOINS_DIVERS}/g, generateBesoinsDiversText(orador))
      .replace(/{FRAIS_INFO}/g, generateFraisInfo(orador))
  }

  const generateNeedsText = (orador) => {
    if (!orador?.needs) return 'Nenhuma necessidade especial'
    
    const needs = []
    if (orador.needs.hebergement) needs.push('🏠 Hospedagem')
    if (orador.needs.repas) needs.push('🍽️ Refeições')
    if (orador.needs.transport) needs.push('🚗 Transporte')
    if (orador.needs.frais) needs.push('💰 Frais/Reembolso')
    
    return needs.length > 0 ? needs.join('\n') : 'Nenhuma necessidade especial'
  }

  const generateAllergyText = (orador) => {
    if (!orador?.allergies?.type) return ''
    
    return `⚠️ ATENÇÃO: Possui alergia ${orador.allergies.type}
${orador.allergies.details || 'Detalhes não especificados'}`
  }
  
  const generateBesoinsDiversText = (orador) => {
    if (!orador?.besoinsDivers) return ''
    
    return `📝 Besoins divers:
${orador.besoinsDivers}`
  }
  
  const generateFraisInfo = (orador) => {
    if (!orador?.needs?.frais) return ''
    
    return `💰 IMPORTANTE: Este orador necessita de reembolso de frais.
Por favor, guardem os recibos e coordenem o reembolso.`
  }

  const getRecipientsList = () => {
    const recipients = []
    
    // Tous les oradores
    oradores.forEach(orador => {
      recipients.push({
        id: `orador-${orador.id}`,
        type: 'orador',
        name: orador.nom,
        phone: orador.phone || 'Sem telefone',
        info: `${orador.congregation} - ${orador.type === 'local' ? 'Local' : 'Visitante'}`,
        data: orador,
        hasPhone: !!orador.phone
      })
    })
    
    // Tous les hôtes
    hotes.forEach(hote => {
      recipients.push({
        id: `hote-${hote.id}`,
        type: 'hote',
        name: hote.nom,
        phone: hote.phone || 'Sem telefone',
        info: `${hote.capacites.hebergement} hospedagem, ${hote.capacites.repas} refeições`,
        data: hote,
        hasPhone: !!hote.phone
      })
    })
    
    return recipients
  }

  const sendWhatsApp = (phone, message) => {
    // Sanitize phone number - only allow digits and + at start
    const cleanPhone = phone.replace(/[^\d+]/g, '').replace(/\+(?!^)/g, '')
    // Sanitize message - encode for URL
    const encodedMessage = encodeURIComponent(message.substring(0, 1000)) // Limit message length
    
    // Validate phone format
    if (!/^\+?\d{8,15}$/.test(cleanPhone)) {
      console.warn('Invalid phone format:', phone)
      return
    }
    
    // Safe redirect
    window.location.href = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  }

  const sendSMS = (phone, message) => {
    // Sanitize inputs
    const cleanPhone = phone.replace(/[^\d+]/g, '').replace(/\+(?!^)/g, '')
    const encodedMessage = encodeURIComponent(message.substring(0, 160)) // SMS limit
    
    // Validate phone format
    if (!/^\+?\d{8,15}$/.test(cleanPhone)) {
      console.warn('Invalid phone format:', phone)
      return
    }
    
    const smsUrl = `sms:${cleanPhone}?body=${encodedMessage}`
    window.location.href = smsUrl
  }

  const shareMessage = (phone, message) => {
    const text = `${message}\n\nPour: ${phone}`
    
    if (navigator.share) {
      // API de partage natif (PWA installée)
      navigator.share({
        title: 'Message WhatsApp',
        text: text
      }).catch(err => console.warn('Erreur partage:', encodeURIComponent(err.message || 'Unknown error')))
    } else {
      // Fallback: copier dans le presse-papiers
      navigator.clipboard.writeText(text).then(() => {
        alert('Message copié ! Collez-le dans WhatsApp manuellement.')
      }).catch(() => {
        // Si clipboard ne marche pas, afficher le texte
        prompt('Copiez ce message pour WhatsApp:', text)
      })
    }
  }

  const sendToSelected = (method) => {
    const validRecipients = selectedRecipients.filter(recipientId => {
      const recipient = getRecipientsList().find(r => r.id === recipientId)
      return recipient && recipient.hasPhone
    })
    
    if (validRecipients.length === 0) return
    
    // Sur mobile, envoyer seulement le premier message pour éviter les blocages
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const recipientsToSend = isMobile ? validRecipients.slice(0, 1) : validRecipients
    
    if (isMobile && validRecipients.length > 1) {
      alert(`Sur mobile, envoi du premier message seulement (${recipientsToSend[0]}). Répétez l'opération pour les autres.`)
    }
    
    recipientsToSend.forEach((recipientId, index) => {
      const recipient = getRecipientsList().find(r => r.id === recipientId)
      if (!recipient) return

      let message = getCurrentTemplateMessage(selectedTemplate)
      
      let attribution = null
      let hote = null
      if (recipient.type === 'orador') {
        attribution = attributions.find(a => a.orateurId === recipient.data.id && a.statut !== 'annulé')
        if (attribution) {
          hote = hotes.find(h => h.id === attribution.hoteId)
        }
      }

      const finalMessage = replaceVariables(message, recipient.data, hote, attribution)
      
      // Délai entre les envois sur desktop
      setTimeout(() => {
        if (method === 'whatsapp') {
          sendWhatsApp(recipient.phone, finalMessage)
        } else {
          sendSMS(recipient.phone, finalMessage)
        }
      }, index * 2000) // 2 secondes entre chaque envoi
    })
  }

  const handleEditTemplate = (templateKey) => {
    const defaultMessage = templates[templateKey].message
    const currentMessage = getWhatsappTemplate(templateKey, defaultMessage)
    setEditingTemplate(templateKey)
    setEditingMessage(currentMessage)
  }
  
  const handleSaveTemplate = () => {
    updateWhatsappTemplate(editingTemplate, editingMessage)
    setEditingTemplate(null)
    setEditingMessage('')
  }
  
  const handleCancelEdit = () => {
    setEditingTemplate(null)
    setEditingMessage('')
  }
  
  const getCurrentTemplateMessage = (templateKey) => {
    if (templateKey === 'custom') return customMessage
    const defaultMessage = templates[templateKey].message
    return getWhatsappTemplate(templateKey, defaultMessage)
  }
  
  const recipients = getRecipientsList()
  const currentMessage = getCurrentTemplateMessage(selectedTemplate)

  return (
    <div className="container fade-in">
      <h2 style={{ marginBottom: '20px', color: 'var(--jw-blue)' }}>
        📱 Comunicação WhatsApp/SMS
      </h2>

      {/* Seleção de template */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          📝 Modelo de Mensagem
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`btn ${selectedTemplate === key ? 'btn-primary' : 'btn-secondary'}`}
              style={{ 
                padding: '12px', 
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{template.name}</span>
              {key !== 'custom' && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditTemplate(key)
                  }}
                  style={{ 
                    fontSize: '12px',
                    opacity: 0.7,
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title="Editar template"
                >
                  ✏️
                </span>
              )}
            </button>
          ))}
        </div>

        {selectedTemplate === 'custom' ? (
          <textarea
            placeholder="Digite sua mensagem personalizada..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'monospace'
            }}
          />
        ) : (
          <div style={{
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-line'
          }}>
            {currentMessage}
          </div>
        )}

        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
          <strong>Variáveis disponíveis:</strong> {'{ORATEUR_NOM}'}, {'{CONGREGATION}'}, {'{HOTE_NOM}'}, {'{HOTE_PHONE}'}, {'{DATE}'}, {'{BESOINS}'}, {'{ALLERGIE}'}, {'{BESOINS_DIVERS}'}, {'{FRAIS_INFO}'}
        </div>
      </div>

      {/* Seleção de destinatários */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          👥 Destinatários ({selectedRecipients.length} selecionados, {recipients.filter(r => r.hasPhone).length} com telefone)
        </h3>

        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setSelectedRecipients(recipients.map(r => r.id))}
            className="btn btn-secondary"
            style={{ marginRight: '8px' }}
          >
            Selecionar Todos
          </button>
          <button
            onClick={() => setSelectedRecipients([])}
            className="btn btn-secondary"
          >
            Limpar Seleção
          </button>
        </div>

        {recipients.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📞</div>
            <p>Nenhum contato encontrado</p>
          </div>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {recipients.map(recipient => (
              <label key={recipient.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                marginBottom: '8px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedRecipients.includes(recipient.id) ? '#e3f2fd' : 'white'
              }}>
                <input
                  type="checkbox"
                  checked={selectedRecipients.includes(recipient.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRecipients([...selectedRecipients, recipient.id])
                    } else {
                      setSelectedRecipients(selectedRecipients.filter(id => id !== recipient.id))
                    }
                  }}
                  style={{ marginRight: '12px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', opacity: recipient.hasPhone ? 1 : 0.6 }}>
                    {recipient.type === 'orador' ? '👤' : '🏠'} {recipient.name}
                    {!recipient.hasPhone && ' ⚠️'}
                  </div>
                  <div style={{ fontSize: '14px', color: recipient.hasPhone ? '#666' : '#ff6b6b' }}>
                    📞 {recipient.phone}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {recipient.info}
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Preview da mensagem */}
      {selectedRecipients.length > 0 && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
            👁️ Preview da Mensagem
          </h3>
          
          {selectedRecipients.slice(0, 1).map(recipientId => {
            const recipient = recipients.find(r => r.id === recipientId)
            if (!recipient) return null

            let attribution = null
            let hote = null
            if (recipient.type === 'orador') {
              attribution = attributions.find(a => a.orateurId === recipient.data.id && a.statut !== 'annulé')
              if (attribution) {
                hote = hotes.find(h => h.id === attribution.hoteId)
              }
            }

            const previewMessage = replaceVariables(currentMessage, recipient.data, hote, attribution)

            return (
              <div key={recipientId}>
                <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                  Para: {recipient.name} ({recipient.phone})
                </div>
                <div style={{
                  background: '#e8f5e8',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #4caf50',
                  fontSize: '14px',
                  whiteSpace: 'pre-line'
                }}>
                  {previewMessage}
                </div>
              </div>
            )
          })}
          
          {selectedRecipients.length > 1 && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              + {selectedRecipients.length - 1} outras mensagens similares
            </div>
          )}
        </div>
      )}

      {/* Test WhatsApp */}
      <div className="card" style={{ marginBottom: '20px', background: '#f0f8ff' }}>
        <h4 style={{ color: 'var(--jw-blue)', marginBottom: '12px' }}>
          🔧 Test WhatsApp
        </h4>
        <p style={{ fontSize: '14px', marginBottom: '12px' }}>
          Teste WhatsApp com seu próprio número:
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
          <input
            type="tel"
            placeholder="Seu número (ex: +33612345678)"
            id="testPhone"
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={() => {
              const testPhone = document.getElementById('testPhone').value
              if (testPhone) {
                sendWhatsApp(testPhone, 'Test depuis Seguimiento Discursos KBV 📱')
              } else {
                alert('Digite seu número de telefone')
              }
            }}
            className="btn btn-secondary"
          >
            🧪 Test
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Appareil détecté: {/Android/i.test(navigator.userAgent) ? '📱 Android' : /iPhone|iPad|iPod/i.test(navigator.userAgent) ? '📱 iOS' : '💻 Desktop'}
          {/Android/i.test(navigator.userAgent) && (
            <div style={{ marginTop: '8px', padding: '8px', background: '#fff3cd', borderRadius: '4px', fontSize: '11px' }}>
              💡 <strong>Dica mobile:</strong> Instale este app na sua tela inicial (menu → "Adicionar à tela inicial") para uma melhor experiência WhatsApp.
            </div>
          )}
        </div>
      </div>

      {/* Botões de envio */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        <button
          onClick={() => sendToSelected('whatsapp')}
          disabled={selectedRecipients.length === 0}
          className="btn btn-primary"
          style={{ 
            padding: '16px',
            opacity: selectedRecipients.length === 0 ? 0.5 : 1
          }}
        >
          📱 Enviar via WhatsApp
        </button>
        <button
          onClick={() => sendToSelected('sms')}
          disabled={selectedRecipients.length === 0}
          className="btn btn-secondary"
          style={{ 
            padding: '16px',
            opacity: selectedRecipients.length === 0 ? 0.5 : 1
          }}
        >
          💬 Enviar via SMS
        </button>
        <button
          onClick={() => {
            selectedRecipients.forEach(recipientId => {
              const recipient = getRecipientsList().find(r => r.id === recipientId)
              if (!recipient) return

              let message = getCurrentTemplateMessage(selectedTemplate)
              
              let attribution = null
              let hote = null
              if (recipient.type === 'orador') {
                attribution = attributions.find(a => a.orateurId === recipient.data.id && a.statut !== 'annulé')
                if (attribution) {
                  hote = hotes.find(h => h.id === attribution.hoteId)
                }
              }

              const finalMessage = replaceVariables(message, recipient.data, hote, attribution)
              shareMessage(recipient.phone, finalMessage)
            })
          }}
          disabled={selectedRecipients.length === 0}
          className="btn"
          style={{ 
            padding: '16px',
            opacity: selectedRecipients.length === 0 ? 0.5 : 1,
            background: '#25D366',
            color: 'white',
            border: 'none'
          }}
        >
          🚀 Partager (Mobile)
        </button>
      </div>

      {selectedRecipients.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginTop: '20px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          ℹ️ Selecione pelo menos um destinatário para enviar mensagens
        </div>
      )}
      
      {recipients.filter(r => r.hasPhone).length === 0 && recipients.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#ff6b6b', 
          marginTop: '20px',
          padding: '20px',
          background: '#fff5f5',
          borderRadius: '8px',
          border: '1px solid #ff6b6b'
        }}>
          ⚠️ Nenhum contato tem número de telefone. Adicione números nas fichas oradores/anfitriões.
        </div>
      )}
      
      {/* Modal d'édition de template */}
      {editingTemplate && (
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
            width: '100%', 
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
              ✏️ Editar Template: {templates[editingTemplate]?.name}
            </h3>
            
            <textarea
              value={editingMessage}
              onChange={(e) => setEditingMessage(e.target.value)}
              style={{
                width: '100%',
                minHeight: '300px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'monospace',
                marginBottom: '16px'
              }}
              placeholder="Digite o conteúdo do template..."
            />
            
            <div style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
              <strong>Variáveis disponíveis:</strong><br/>
              {'{ORATEUR_NOM}'}, {'{CONGREGATION}'}, {'{HOTE_NOM}'}, {'{HOTE_PHONE}'}, {'{DATE}'}, {'{BESOINS}'}, {'{ALLERGIE}'}, {'{BESOINS_DIVERS}'}, {'{FRAIS_INFO}'}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleSaveTemplate}
                className="btn btn-primary" 
                style={{ flex: 1 }}
              >
                💾 Salvar
              </button>
              <button 
                onClick={handleCancelEdit}
                className="btn btn-secondary"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Comunicacao