// Utilitaires pour parser les fichiers HTML existants

export const parseIrmonsKonvidi = (htmlContent) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  
  const oradores = []
  
  // Chercher les tables ou structures de données
  const rows = doc.querySelectorAll('tr, .row, .orador')
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td, .cell, .data')
    
    if (cells.length >= 4) {
      const nome = cells[0]?.textContent?.trim()
      const congregacao = cells[1]?.textContent?.trim()
      const ultimaVisita = cells[2]?.textContent?.trim()
      const numeroDiscurso = cells[3]?.textContent?.trim()
      const proximaVisita = cells[4]?.textContent?.trim()
      const proximoNumero = cells[5]?.textContent?.trim()
      
      if (nome && congregacao) {
        oradores.push({
          nom: nome,
          congregation: congregacao,
          lastVisitDate: parseDate(ultimaVisita),
          lastTalkNoOrType: numeroDiscurso,
          nextVisitDate: parseDate(proximaVisita),
          nextTalkNoOrType: proximoNumero,
          needs: {
            hebergement: false,
            repas: false,
            transport: false
          },
          allergies: {
            type: null,
            details: ''
          },
          notes: ''
        })
      }
    }
  })
  
  return oradores
}

export const parseProgramaHTML = (htmlContent, periodo) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  
  const eventos = []
  
  // Chercher les événements dans différents formats possibles
  const eventRows = doc.querySelectorAll('tr, .evento, .programa-item')
  
  eventRows.forEach(row => {
    const cells = row.querySelectorAll('td, .cell, .data, span, div')
    
    if (cells.length >= 3) {
      const dateText = cells[0]?.textContent?.trim()
      const oradorText = cells[1]?.textContent?.trim()
      const congregacaoText = cells[2]?.textContent?.trim()
      const discursoText = cells[3]?.textContent?.trim()
      const temaText = cells[4]?.textContent?.trim()
      const presidenteText = cells[5]?.textContent?.trim()
      const sentinelaText = cells[6]?.textContent?.trim()
      const leitorText = cells[7]?.textContent?.trim()
      
      const date = parseDate(dateText)
      
      if (date && oradorText) {
        eventos.push({
          date: date,
          orateurNom: oradorText,
          congregation: congregacaoText || '',
          talkNoOrType: discursoText || '',
          theme: temaText || '',
          president: presidenteText || '',
          sentinela: sentinelaText || '',
          leitor: leitorText || '',
          type: detectEventType(temaText, discursoText),
          origine: 'import',
          periodo: periodo,
          notes: ''
        })
      }
    }
  })
  
  return eventos
}

const parseDate = (dateString) => {
  if (!dateString) return null
  
  // Nettoyer la chaîne
  const cleaned = dateString.replace(/[^\d\/\-\.]/g, '').trim()
  
  // Formats possibles: DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY
  const dateFormats = [
    /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/,
    /^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/
  ]
  
  for (const format of dateFormats) {
    const match = cleaned.match(format)
    if (match) {
      let day, month, year
      
      if (match[3].length === 4) {
        // DD/MM/YYYY
        day = parseInt(match[1])
        month = parseInt(match[2]) - 1 // JavaScript months are 0-indexed
        year = parseInt(match[3])
      } else {
        // YYYY/MM/DD
        year = parseInt(match[1])
        month = parseInt(match[2]) - 1
        day = parseInt(match[3])
      }
      
      const date = new Date(year, month, day)
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0]
      }
    }
  }
  
  return null
}

const detectEventType = (tema, discurso) => {
  if (!tema && !discurso) return 'public'
  
  const text = (tema + ' ' + discurso).toLowerCase()
  
  if (text.includes('especial') || text.includes('spesial')) return 'special'
  if (text.includes('comemoração') || text.includes('komemorason')) return 'commemoration'
  if (text.includes('circuito') || text.includes('circuit')) return 'circuit'
  if (text.includes('assembleia') || text.includes('assembly')) return 'assembly'
  if (text.includes('saída') || text.includes('outgoing')) return 'outgoing'
  
  return 'public'
}

// Fonction pour importer depuis un fichier
export const importFromFile = (file, type) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const content = e.target.result
        
        if (type === 'oradores') {
          const oradores = parseIrmonsKonvidi(content)
          resolve(oradores)
        } else if (type === 'programa') {
          const periodo = file.name.replace('.html', '')
          const eventos = parseProgramaHTML(content, periodo)
          resolve(eventos)
        } else {
          reject(new Error('Tipo de arquivo não suportado'))
        }
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo'))
    reader.readAsText(file)
  })
}

// Fonction pour détecter automatiquement le type de fichier
export const detectFileType = (filename) => {
  const name = filename.toLowerCase()
  
  if (name.includes('irmons') || name.includes('konvidi')) {
    return 'oradores'
  }
  
  if (name.includes('janeiro') || name.includes('maiu') || 
      name.includes('otubru') || name.includes('janeru') ||
      name.includes('programa') || name.includes('calendario')) {
    return 'programa'
  }
  
  return 'unknown'
}