import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'
import { 
  requestNotificationPermission, 
  scheduleAllReminders,
  exportToAndroidCalendar,
  exportContactsToVCard
} from '../utils/notifications'

function Configuracoes() {
  const { t, i18n } = useTranslation()
  const { 
    currentLanguage, 
    setLanguage, 
    theme, 
    setTheme, 
    exportData, 
    importData,
    oradores,
    hotes,
    attributions,
    eventos,
    clearAll
  } = useAppStore()
  
  const exportCalendar = () => {
    // Créer des événements à partir des dates de visite des orateurs
    const eventosParaExportar = []
    
    oradores.forEach(orador => {
      if (orador.nextVisitDate) {
        eventosParaExportar.push({
          id: `visit-${orador.id}`,
          date: orador.nextVisitDate,
          orateurNom: orador.nom,
          congregation: orador.congregation,
          talkNoOrType: orador.nextTalkNoOrType || 'Discurso',
          theme: 'Visita de Orador',
          president: 'A definir',
          type: 'visit'
        })
      }
      
      if (orador.lastVisitDate) {
        eventosParaExportar.push({
          id: `last-visit-${orador.id}`,
          date: orador.lastVisitDate,
          orateurNom: orador.nom,
          congregation: orador.congregation,
          talkNoOrType: orador.lastTalkNoOrType || 'Discurso',
          theme: 'Visita Anterior',
          president: 'Realizada',
          type: 'past-visit'
        })
      }
    })
    
    // Adicionar eventos dos próprios eventos se existirem
    if (eventos && eventos.length > 0) {
      eventosParaExportar.push(...eventos)
    }
    
    exportToAndroidCalendar(eventosParaExportar)
  }
  
  const exportContacts = () => {
    exportContactsToVCard(oradores, hotes)
  }
  
  const setupNotifications = async () => {
    const hasPermission = await requestNotificationPermission()
    if (hasPermission) {
      scheduleAllReminders(oradores, hotes, attributions)
      alert('Notificações configuradas com sucesso!')
    } else {
      alert('Permissão de notificação negada')
    }
  }

  const [showExportModal, setShowExportModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `discursos-kbv-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowExportModal(false)
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          importData(data)
          alert('Dados importados com sucesso!')
          setShowImportModal(false)
        } catch (error) {
          alert('Erro ao importar dados. Verifique o formato do arquivo.')
        }
      }
      reader.readAsText(file)
    }
  }

  const shareData = async () => {
    const data = exportData()
    const text = `Backup Discursos KBV - ${new Date().toLocaleDateString('pt-BR')}\n\nOradores: ${data.oradores.length}\nAnfitriões: ${data.hotes.length}\nAtribuições: ${data.attributions.length}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Backup Discursos KBV',
          text: text,
          files: [new File([JSON.stringify(data, null, 2)], 'backup-discursos-kbv.json', { type: 'application/json' })]
        })
      } catch (error) {
        console.log('Erro ao compartilhar:', error)
      }
    } else {
      // Fallback para dispositivos sem Web Share API
      handleExport()
    }
  }

  return (
    <div className="container fade-in">
      <h2 style={{ marginBottom: '20px', color: 'var(--jw-blue)' }}>
        {t('configuracoes')}
      </h2>

      {/* Idioma */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          🌐 Idioma / Língua / Lingua
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { code: 'pt', name: 'Português', flag: '🇵🇹' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' },
            { code: 'kbv', name: 'Kriol Kabuverdianu', flag: '🇨🇻' }
          ].map(lang => (
            <label key={lang.code} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '12px',
              border: currentLanguage === lang.code ? '2px solid var(--jw-blue)' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={currentLanguage === lang.code}
                onChange={() => handleLanguageChange(lang.code)}
              />
              <span style={{ fontSize: '20px' }}>{lang.flag}</span>
              <span style={{ fontWeight: '500' }}>{lang.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tema */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          🎨 Tema
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { value: 'auto', name: 'Automático (sistema)', icon: '🔄' },
            { value: 'light', name: 'Claro', icon: '☀️' },
            { value: 'dark', name: 'Escuro', icon: '🌙' }
          ].map(themeOption => (
            <label key={themeOption.value} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '12px',
              border: theme === themeOption.value ? '2px solid var(--jw-blue)' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="radio"
                name="theme"
                value={themeOption.value}
                checked={theme === themeOption.value}
                onChange={() => setTheme(themeOption.value)}
              />
              <span style={{ fontSize: '20px' }}>{themeOption.icon}</span>
              <span style={{ fontWeight: '500' }}>{themeOption.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          📊 Estatísticas
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--jw-blue)' }}>
              {oradores.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Oradores</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--jw-blue)' }}>
              {hotes.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Anfitriões</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--jw-blue)' }}>
              {attributions.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Atribuições</div>
          </div>
        </div>
      </div>

      {/* Backup e Sincronização */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          💾 Backup e Dados
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          <button 
            onClick={() => setShowExportModal(true)}
            className="btn btn-primary"
            style={{ justifyContent: 'flex-start', gap: '12px' }}
          >
            📤 Exportar Dados
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', gap: '12px' }}
          >
            📥 Importar Dados
          </button>
          <button 
            onClick={shareData}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', gap: '12px' }}
          >
            📱 Compartilhar Backup
          </button>
          <button 
            onClick={exportCalendar}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', gap: '12px' }}
          >
            📅 Exportar Calendário
          </button>
          <button 
            onClick={exportContacts}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', gap: '12px' }}
          >
            👥 Exportar Contatos
          </button>
          <button 
            onClick={setupNotifications}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', gap: '12px' }}
          >
            🔔 Configurar Notificações
          </button>
          <button 
            onClick={() => {
              if (confirm('Isso vai limpar TODOS os dados. Continuar?')) {
                clearAll()
                window.location.reload()
              }
            }}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', gap: '12px', color: '#d32f2f' }}
          >
            🗑️ Limpar Todos os Dados
          </button>
        </div>
      </div>

      {/* Sobre */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          ℹ️ {t('sobre')}
        </h3>
        <div style={{ 
          padding: '12px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center'
        }}>
          © 2025 Francisco Pinto<br/>
          {t('todosOsDireitos')}<br/>
          {t('desenvolvidoPara')}
        </div>
      </div>

      {/* Modal Export */}
      {showExportModal && (
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
          zIndex: 1000
        }}>
          <div className="card" style={{ margin: '20px', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
              Exportar Dados
            </h3>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Isso criará um arquivo de backup com todos os seus dados (oradores, anfitriões, atribuições).
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleExport} className="btn btn-primary" style={{ flex: 1 }}>
                📤 Exportar
              </button>
              <button 
                onClick={() => setShowExportModal(false)} 
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Import */}
      {showImportModal && (
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
          zIndex: 1000
        }}>
          <div className="card" style={{ margin: '20px', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
              Importar Dados
            </h3>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              ⚠️ Isso substituirá todos os dados atuais. Faça um backup antes de continuar.
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ marginBottom: '20px', width: '100%' }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowImportModal(false)} 
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

export default Configuracoes