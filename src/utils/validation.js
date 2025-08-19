// Utilitaires de validation et sanitisation
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 500) // Limit length
}

export const validatePhone = (phone) => {
  if (!phone) return true // Optional field
  const cleanPhone = phone.replace(/[^\d+]/g, '')
  return /^\+?[\d\s-()]{8,15}$/.test(cleanPhone)
}

export const validateEmail = (email) => {
  if (!email) return true // Optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validateDate = (date) => {
  if (!date) return true // Optional field
  const parsedDate = new Date(date)
  return !isNaN(parsedDate.getTime()) && parsedDate > new Date('1900-01-01')
}

export const validateOrador = (orador) => {
  const errors = []
  
  if (!orador.nom || orador.nom.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres')
  }
  
  if (!orador.congregation || orador.congregation.trim().length < 2) {
    errors.push('Congregação deve ter pelo menos 2 caracteres')
  }
  
  if (orador.phone && !validatePhone(orador.phone)) {
    errors.push('Formato de telefone inválido')
  }
  
  if (orador.email && !validateEmail(orador.email)) {
    errors.push('Formato de email inválido')
  }
  
  return errors
}

export const validateHote = (hote) => {
  const errors = []
  
  if (!hote.nom || hote.nom.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres')
  }
  
  if (!hote.phone || !validatePhone(hote.phone)) {
    errors.push('Telefone é obrigatório e deve ter formato válido')
  }
  
  if (!hote.capacites?.hebergement || hote.capacites.hebergement < 0) {
    errors.push('Capacidade de hospedagem deve ser um número positivo')
  }
  
  if (!hote.capacites?.repas || hote.capacites.repas < 0) {
    errors.push('Capacidade de refeições deve ser um número positivo')
  }
  
  return errors
}

export const sanitizeOrador = (orador) => ({
  ...orador,
  nom: sanitizeInput(orador.nom),
  congregation: sanitizeInput(orador.congregation),
  phone: orador.phone ? sanitizeInput(orador.phone) : '',
  email: orador.email ? sanitizeInput(orador.email) : '',
  allergies: orador.allergies ? {
    ...orador.allergies,
    details: sanitizeInput(orador.allergies.details || '')
  } : null
})

export const sanitizeHote = (hote) => ({
  ...hote,
  nom: sanitizeInput(hote.nom),
  phone: sanitizeInput(hote.phone),
  contraintes: hote.contraintes ? {
    ...hote.contraintes,
    allergiesEviter: Array.isArray(hote.contraintes.allergiesEviter) 
      ? hote.contraintes.allergiesEviter.map(sanitizeInput)
      : [],
    autres: sanitizeInput(hote.contraintes.autres || '')
  } : {}
})