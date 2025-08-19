import { useState } from 'react'

function DashboardCalendar({ oradores, eventos, onDateSelect, onOradorSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date())

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

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    
    // Eventos do calendário
    const calendarEvents = eventos.filter(evento => evento.date === dateStr)
    
    // Oradores com próximas visitas (sem duplicatas)
    const oradorEvents = oradores.filter(orador => {
      if (orador.nextVisitDate !== dateStr) return false
      
      // Vérifier qu'il n'y a pas déjà un événement calendrier pour ce même orador
      const hasCalendarEvent = calendarEvents.some(evento => 
        evento.orateurNom === orador.nom || evento.orateurId === orador.id
      )
      
      return !hasCalendarEvent
    })
    
    return { calendarEvents, oradorEvents }
  }

  const monthDays = getMonthDays(currentDate)
  const monthName = new Intl.DateTimeFormat('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  }).format(currentDate)

  return (
    <div>
      {/* Controles de navegação */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <button 
          onClick={() => navigateMonth(-1)}
          className="btn btn-secondary"
          style={{ padding: '8px 12px' }}
        >
          ←
        </button>
        
        <h4 style={{ 
          margin: 0, 
          color: 'var(--jw-blue)',
          textTransform: 'capitalize'
        }}>
          {monthName}
        </h4>
        
        <button 
          onClick={() => navigateMonth(1)}
          className="btn btn-secondary"
          style={{ padding: '8px 12px' }}
        >
          →
        </button>
      </div>

      {/* Cabeçalho dos dias da semana */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '1px',
        marginBottom: '4px'
      }}>
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} style={{
            padding: '4px',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '12px',
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
          const { calendarEvents, oradorEvents } = getEventsForDate(dayObj.date)
          const hasEvents = calendarEvents.length > 0 || oradorEvents.length > 0

          return (
            <div
              key={index}
              onClick={() => {
                if (hasEvents) {
                  const dateStr = dayObj.date.toISOString().split('T')[0]
                  onDateSelect(dateStr)
                }
              }}
              style={{
                minHeight: '45px',
                padding: '2px',
                background: dayObj.isCurrentMonth ? 'white' : '#f5f5f5',
                border: isToday ? '2px solid var(--jw-blue)' : 'none',
                position: 'relative',
                cursor: hasEvents ? 'pointer' : 'default',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (hasEvents) {
                  e.target.style.backgroundColor = '#f0f8ff'
                }
              }}
              onMouseLeave={(e) => {
                if (hasEvents) {
                  e.target.style.backgroundColor = dayObj.isCurrentMonth ? 'white' : '#f5f5f5'
                }
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: isToday ? 'bold' : 'normal',
                color: dayObj.isCurrentMonth ? (isToday ? 'var(--jw-blue)' : '#333') : '#999',
                marginBottom: '2px'
              }}>
                {dayObj.date.getDate()}
              </div>
              
              {/* Eventos do calendário */}
              {calendarEvents.map((evento, eventIndex) => (
                <div
                  key={`cal-${eventIndex}`}
                  style={{
                    fontSize: '10px',
                    padding: '2px 3px',
                    background: 'var(--jw-blue)',
                    color: 'white',
                    borderRadius: '3px',
                    marginBottom: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={`${evento.orateurNom} - ${evento.congregation}`}
                >
                  📅 {evento.orateurNom}
                </div>
              ))}
              
              {/* Oradores com visitas */}
              {oradorEvents.map((orador, oradorIndex) => (
                <div
                  key={`orador-${oradorIndex}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onOradorSelect(orador)
                  }}
                  style={{
                    fontSize: '10px',
                    padding: '2px 3px',
                    background: orador.allergies?.type === 'grave' ? '#ff3b30' : 
                               orador.allergies?.type === 'moderee' ? '#ff9500' : '#34c759',
                    color: 'white',
                    borderRadius: '3px',
                    marginBottom: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                  title={`${orador.nom} - ${orador.congregation}${orador.allergies?.type ? ` (Alergia ${orador.allergies.type})` : ''}`}
                >
                  👤 {orador.nom}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Légende */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center', 
        gap: '12px', 
        marginTop: '12px',
        fontSize: '11px',
        padding: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: 'var(--jw-blue)', 
            borderRadius: '2px',
            border: '1px solid rgba(0,0,0,0.1)'
          }}></div>
          <span>Eventos</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: '#34c759', 
            borderRadius: '2px',
            border: '1px solid rgba(0,0,0,0.1)'
          }}></div>
          <span>Visitas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: '#ff9500', 
            borderRadius: '2px',
            border: '1px solid rgba(0,0,0,0.1)'
          }}></div>
          <span>Alergia Moderada</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            background: '#ff3b30', 
            borderRadius: '2px',
            border: '1px solid rgba(0,0,0,0.1)'
          }}></div>
          <span>Alergia Grave</span>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '8px', 
        fontSize: '12px', 
        color: '#666' 
      }}>
        Clique nas datas com eventos para ver detalhes
      </div>
    </div>
  )
}

export default DashboardCalendar