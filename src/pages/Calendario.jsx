import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../stores/appStore'
import { importFromFile, detectFileType } from '../utils/htmlParser'

function Calendario() {
  const { t } = useTranslation()
  const { eventos, addEvento, oradores, addOrador } = useAppStore()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // month, week, day
  const [importing, setImporting] = useState(false)
  
  const handleFileImport = async (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return
    
    setImporting(true)
    
    try {
      for (const file of files) {
        const fileType = detectFileType(file.name)
        
        if (fileType === 'oradores') {
          const importedOradores = await importFromFile(file, 'oradores')
          importedOradores.forEach(orador => addOrador(orador))
          console.log('Importados %d oradores de %s', importedOradores.length, file.name)
        } else if (fileType === 'programa') {
          const importedEventos = await importFromFile(file, 'programa')
          importedEventos.forEach(evento => addEvento(evento))
          console.log('Importados %d eventos de %s', importedEventos.length, file.name)
        }
      }
      
      alert(`Import concluído! Verifique os dados importados.`)
    } catch (error) {
      console.error('Erro no import:', error)
      alert('Erro ao importar arquivos. Verifique o formato dos arquivos HTML.')
    } finally {
      setImporting(false)
      event.target.value = '' // Reset file input
    }
  }
  
  const addManualEvent = () => {
    const date = prompt('Data do evento (DD/MM/AAAA):')
    const orador = prompt('Nome do orador:')
    const congregacao = prompt('Congregação:')
    
    if (date && orador) {
      const [day, month, year] = date.split('/')
      const eventDate = new Date(year, month - 1, day)
      
      addEvento({
        date: eventDate.toISOString().split('T')[0],
        orateurNom: orador,
        congregation: congregacao || '',
        talkNoOrType: '',
        theme: '',
        president: '',
        sentinela: '',
        leitor: '',
        type: 'public',
        origine: 'manuel'
      })
    }
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const getMonthDays = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Dias do mês anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day)
      days.push({ date: dayDate, isCurrentMonth: true })
    }
    
    // Completar a grade (42 células = 6 semanas)
    const remainingCells = 42 - days.length
    for (let day = 1; day <= remainingCells; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({ date: nextDate, isCurrentMonth: false })
    }
    
    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const monthDays = getMonthDays(currentDate)
  const monthName = new Intl.DateTimeFormat('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  }).format(currentDate)

  return (
    <div className="container fade-in">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--jw-blue)', margin: '0 0 16px 0' }}>
          {t('calendario')}
        </h2>
        
        {/* Controles de navegação */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => navigateMonth(-1)}
              className="btn btn-secondary"
              style={{ padding: '8px 12px' }}
            >
              ←
            </button>
            <button 
              onClick={goToToday}
              className="btn btn-secondary"
              style={{ padding: '8px 16px' }}
            >
              Hoje
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              className="btn btn-secondary"
              style={{ padding: '8px 12px' }}
            >
              →
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '4px' }}>
            {['month', 'week', 'day'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`btn ${viewMode === mode ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 12px', fontSize: '14px' }}
              >
                {mode === 'month' ? 'Mês' : mode === 'week' ? 'Semana' : 'Dia'}
              </button>
            ))}
          </div>
        </div>

        <h3 style={{ 
          textAlign: 'center', 
          color: 'var(--jw-blue)', 
          margin: '0 0 20px 0',
          textTransform: 'capitalize'
        }}>
          {monthName}
        </h3>
      </div>

      {viewMode === 'month' && (
        <div className="card" style={{ padding: '16px' }}>
          {/* Cabeçalho dos dias da semana */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '1px',
            marginBottom: '8px'
          }}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} style={{
                padding: '8px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '14px',
                color: 'var(--jw-blue)',
                background: '#f8f9fa'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Grade do calendário */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '1px',
            background: '#e0e0e0'
          }}>
            {monthDays.map((dayObj, index) => {
              const isToday = dayObj.date.toDateString() === new Date().toDateString()
              const dayEvents = eventos.filter(evento => {
                const eventoDate = new Date(evento.date)
                return eventoDate.toDateString() === dayObj.date.toDateString()
              })

              return (
                <div
                  key={index}
                  style={{
                    minHeight: '80px',
                    padding: '4px',
                    background: dayObj.isCurrentMonth ? 'white' : '#f5f5f5',
                    border: isToday ? '2px solid var(--jw-blue)' : 'none',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    fontWeight: isToday ? 'bold' : 'normal',
                    color: dayObj.isCurrentMonth ? (isToday ? 'var(--jw-blue)' : '#333') : '#999',
                    marginBottom: '4px'
                  }}>
                    {dayObj.date.getDate()}
                  </div>
                  
                  {dayEvents.map((evento, eventIndex) => (
                    <div
                      key={eventIndex}
                      style={{
                        fontSize: '10px',
                        padding: '2px 4px',
                        background: 'var(--jw-blue)',
                        color: 'white',
                        borderRadius: '4px',
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {evento.orateurNom}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {viewMode === 'day' && (
        <div className="card">
          <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
            {formatDate(currentDate)}
          </h3>
          
          <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <p>Nenhum evento programado para este dia</p>
          </div>
        </div>
      )}

      {/* Import de programas */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          📥 Importar Programas
        </h3>
        
        <div style={{ marginBottom: '16px' }}>
          <input
            type="file"
            accept=".html,.htm"
            multiple
            onChange={handleFileImport}
            disabled={importing}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '2px dashed #ddd', 
              borderRadius: '8px',
              textAlign: 'center',
              opacity: importing ? 0.5 : 1
            }}
          />
          {importing && (
            <div style={{ textAlign: 'center', marginTop: '8px', color: 'var(--jw-blue)' }}>
              ⏳ Importando arquivos...
            </div>
          )}
        </div>
        
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
          Selecione os arquivos HTML dos programas:
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>IRMONS-PA-KONVIDI.html (lista de oradores)</li>
            <li>Janvier-Avril-25.html</li>
            <li>Maiu-Setenbru-25.html</li>
            <li>Otubru-Dizenbru-25.html</li>
            <li>Janeru-Marsu-26.html</li>
          </ul>
        </div>
      </div>

      {/* Próximos eventos */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--jw-blue)' }}>
          Próximos Eventos
        </h3>
        
        {eventos.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <p>Nenhum evento cadastrado</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              Importe os programas HTML acima
            </p>
          </div>
        ) : (
          <div>
            {eventos.slice(0, 5).map(evento => (
              <div key={evento.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <div style={{ fontWeight: '500' }}>{evento.orateurNom}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {evento.congregation} - {evento.talkNoOrType}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {new Date(evento.date).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginTop: '20px' 
      }}>
        <button 
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="btn btn-primary" 
          style={{ padding: '16px' }}
        >
          📥 Importar Programa
        </button>
        <button 
          onClick={addManualEvent}
          className="btn btn-secondary" 
          style={{ padding: '16px' }}
        >
          ➕ Adicionar Evento
        </button>
      </div>
    </div>
  )
}

export default Calendario