// Utilitaire pour nettoyer les données dupliquées

export const cleanDuplicateData = (oradores, hotes, clearAll, addOrador, addHote) => {
  // Vider toutes les données
  clearAll()
  
  // Supprimer le flag de chargement initial
  localStorage.removeItem('discursos-kbv-initial-loaded')
  
  // Recharger la page pour repartir à zéro
  window.location.reload()
}

export const removeDuplicateOradores = (oradores) => {
  const seen = new Set()
  return oradores.filter(orador => {
    const key = `${orador.nom}-${orador.congregation}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

export const removeDuplicateHotes = (hotes) => {
  const seen = new Set()
  return hotes.filter(hote => {
    const key = `${hote.nom}-${hote.phone}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}