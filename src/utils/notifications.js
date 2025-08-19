// Utilitaires pour les notifications Android

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Ce navigateur ne supporte pas les notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const scheduleVisitReminder = (orador, hote, attribution, daysBeforeVisit) => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker não suportado')
    return
  }

  const visitDate = new Date(attribution.dateDebut)
  const reminderDate = new Date(visitDate)
  reminderDate.setDate(visitDate.getDate() - daysBeforeVisit)
  
  const now = new Date()
  const timeUntilReminder = reminderDate.getTime() - now.getTime()
  
  if (timeUntilReminder > 0) {
    setTimeout(() => {
      showNotification({
        title: `Lembrete: Visita em ${daysBeforeVisit} dias`,
        body: `${orador.nom} da ${orador.congregation} visitará ${hote.nom}`,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: `visit-reminder-${attribution.id}-${daysBeforeVisit}`,
        data: {
          type: 'visit-reminder',
          oradorId: orador.id,
          hoteId: hote.id,
          attributionId: attribution.id,
          visitDate: attribution.dateDebut
        },
        actions: [
          {
            action: 'view',
            title: 'Ver Detalhes'
          },
          {
            action: 'whatsapp',
            title: 'Enviar WhatsApp'
          }
        ]
      })
    }, timeUntilReminder)
  }
}

export const showNotification = async (options) => {
  const hasPermission = await requestNotificationPermission()
  
  if (!hasPermission) {
    console.log('Permissão de notificação negada')
    return
  }

  // Vibração para feedback tátil
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200])
  }

  if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
    // Usar Service Worker para notificações persistentes
    const registration = await navigator.serviceWorker.ready
    return registration.showNotification(options.title, {
      body: options.body,
      icon: options.icon || '/pwa-192x192.png',
      badge: options.badge || '/pwa-192x192.png',
      tag: options.tag,
      data: options.data,
      actions: options.actions || [],
      requireInteraction: true,
      silent: false
    })
  } else {
    // Fallback pour navigateurs sans Service Worker
    return new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/pwa-192x192.png',
      tag: options.tag,
      data: options.data
    })
  }
}

export const scheduleAllergyAlert = (orador, hote, attribution) => {
  if (!orador.allergies?.type || orador.allergies.type !== 'grave') {
    return
  }

  showNotification({
    title: '🚨 Alerta de Alergia Grave',
    body: `${orador.nom} possui alergia grave. Anfitrião: ${hote.nom}`,
    icon: '/pwa-192x192.png',
    tag: `allergy-alert-${attribution.id}`,
    data: {
      type: 'allergy-alert',
      oradorId: orador.id,
      hoteId: hote.id,
      attributionId: attribution.id,
      allergyType: orador.allergies.type,
      allergyDetails: orador.allergies.details
    },
    actions: [
      {
        action: 'whatsapp-host',
        title: 'Avisar Anfitrião'
      },
      {
        action: 'view-details',
        title: 'Ver Detalhes'
      }
    ]
  })
}

export const showVisitConfirmation = (orador, hote, attribution) => {
  showNotification({
    title: '✅ Atribuição Confirmada',
    body: `${orador.nom} foi atribuído a ${hote.nom}`,
    icon: '/pwa-192x192.png',
    tag: `attribution-confirmed-${attribution.id}`,
    data: {
      type: 'attribution-confirmed',
      oradorId: orador.id,
      hoteId: hote.id,
      attributionId: attribution.id
    }
  })
}

// Programar lembretes automáticos para todas as visitas
export const scheduleAllReminders = (oradores, hotes, attributions) => {
  attributions.forEach(attribution => {
    if (attribution.statut !== 'confirmé') return
    
    const orador = oradores.find(o => o.id === attribution.orateurId)
    const hote = hotes.find(h => h.id === attribution.hoteId)
    
    if (orador && hote) {
      // Lembrete 7 dias antes
      scheduleVisitReminder(orador, hote, attribution, 7)
      
      // Lembrete 2 dias antes
      scheduleVisitReminder(orador, hote, attribution, 2)
      
      // Lembrete no dia (manhã)
      scheduleVisitReminder(orador, hote, attribution, 0)
      
      // Alerta de alergia se necessário
      if (orador.allergies?.type === 'grave') {
        scheduleAllergyAlert(orador, hote, attribution)
      }
    }
  })
}

// Exportar eventos para o calendário Android
export const exportToAndroidCalendar = (eventos) => {
  try {
    if (!eventos || eventos.length === 0) {
      console.warn('Nenhum evento encontrado para exportar')
      return
      return
    }
    
    // Criar arquivo ICS para importação no calendário
    let icsContent = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Seguimiento Discursos KBV//PT\r\n'
    
    eventos.forEach(evento => {
      if (!evento.date) return
      
      const startDate = new Date(evento.date)
      if (isNaN(startDate.getTime())) return
      
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // 2 horas
      
      const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      }
      
      const cleanText = (text) => {
        return (text || '')
          .replace(/[\r\n]/g, ' ')
          .replace(/[,;\\]/g, '')
          .replace(/[àáâãäå]/g, 'a')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/[òóôõö]/g, 'o')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ç]/g, 'c')
          .replace(/[ñ]/g, 'n')
          .replace(/[ÀÁÂÃÄÅ]/g, 'A')
          .replace(/[ÈÉÊË]/g, 'E')
          .replace(/[ÌÍÎÏ]/g, 'I')
          .replace(/[ÒÓÔÕÖ]/g, 'O')
          .replace(/[ÙÚÛÜ]/g, 'U')
          .replace(/[Ç]/g, 'C')
          .replace(/[Ñ]/g, 'N')
          .trim()
      }
      
      icsContent += 'BEGIN:VEVENT\r\n'
      icsContent += `UID:${evento.id || Date.now()}@discursos-kbv\r\n`
      icsContent += `DTSTART:${formatDate(startDate)}\r\n`
      icsContent += `DTEND:${formatDate(endDate)}\r\n`
      icsContent += `SUMMARY:${cleanText(evento.orateurNom)} - ${cleanText(evento.congregation)}\r\n`
      icsContent += `DESCRIPTION:Discurso: ${cleanText(evento.talkNoOrType)} - Tema: ${cleanText(evento.theme)} - Presidente: ${cleanText(evento.president)}\r\n`
      icsContent += `LOCATION:Salão do Reino\r\n`
      icsContent += 'END:VEVENT\r\n'
    })
    
    icsContent += 'END:VCALENDAR'
    
    // Criar e baixar arquivo
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `discursos-kbv-calendario-${new Date().toISOString().split('T')[0]}.ics`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    console.log(`Calendário exportado com ${eventos.length} eventos!`)
  } catch (error) {
    console.error('Erro ao exportar calendário:', error)
    console.error('Erro ao exportar calendário. Verifique os dados.')
  }
}

// Gerar vCard para contatos
export const generateVCard = (pessoa, tipo = 'orador') => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${pessoa.nom}
ORG:${tipo === 'orador' ? pessoa.congregation : 'Anfitrião JW'}
TEL:${pessoa.phone || ''}
NOTE:${tipo === 'orador' ? 'Orador visitante' : 'Anfitrião local'} - Seguimiento Discursos KBV
END:VCARD`

  return vcard
}

export const exportContactsToVCard = (oradores, hotes) => {
  try {
    let vcardContent = ''
    let contactCount = 0
    
    oradores.forEach(orador => {
      if (orador.phone) {
        vcardContent += generateVCard(orador, 'orador') + '\r\n\r\n'
        contactCount++
      }
    })
    
    hotes.forEach(hote => {
      if (hote.phone) {
        vcardContent += generateVCard(hote, 'hote') + '\r\n\r\n'
        contactCount++
      }
    })
    
    if (contactCount === 0) {
      console.warn('Nenhum contato com telefone encontrado')
      return
      return
    }
    
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contatos-discursos-kbv-${new Date().toISOString().split('T')[0]}.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    console.log(`${contactCount} contatos exportados!`)
  } catch (error) {
    console.error('Erro ao exportar contatos:', error)
    console.error('Erro ao exportar contatos. Tente novamente.')
  }
}