import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      // État de l'application
      isOnline: navigator.onLine,
      currentLanguage: 'pt',
      theme: 'auto',
      
      // Données
      oradores: [],
      hotes: [],
      attributions: [],
      eventos: [],
      whatsappTemplates: {},
      
      // Actions
      checkOnlineStatus: () => {
        set({ isOnline: navigator.onLine })
      },
      
      setLanguage: (lang) => {
        set({ currentLanguage: lang })
      },
      
      setTheme: (theme) => {
        set({ theme })
      },
      
      // CRUD Oradores
      addOrador: (orador) => {
        set(state => {
          // Vérifier si l'orateur existe déjà
          const exists = state.oradores.some(o => 
            o.nom === orador.nom && o.congregation === orador.congregation
          )
          
          if (exists) {
            console.log('Orateur déjà existant:', encodeURIComponent(orador.nom || 'unknown'))
            return state
          }
          
          const newOrador = {
            ...orador,
            id: orador.id || Date.now().toString() + Math.random().toString(36).substr(2, 5),
            createdAt: new Date().toISOString()
          }
          
          return {
            oradores: [...state.oradores, newOrador]
          }
        })
      },
      
      updateOrador: (id, updates) => {
        set(state => ({
          oradores: state.oradores.map(o => 
            o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o
          )
        }))
      },
      
      deleteOrador: (id) => {
        set(state => ({
          oradores: state.oradores.filter(o => o.id !== id)
        }))
      },
      
      // CRUD Hôtes
      addHote: (hote) => {
        set(state => {
          // Vérifier si le hôte existe déjà
          const exists = state.hotes.some(h => 
            h.nom === hote.nom && h.phone === hote.phone
          )
          
          if (exists) {
            console.log('Hôte déjà existant:', encodeURIComponent(hote.nom || 'unknown'))
            return state
          }
          
          const newHote = {
            ...hote,
            id: hote.id || Date.now().toString() + Math.random().toString(36).substr(2, 5),
            createdAt: new Date().toISOString()
          }
          
          return {
            hotes: [...state.hotes, newHote]
          }
        })
      },
      
      updateHote: (id, updates) => {
        set(state => ({
          hotes: state.hotes.map(h => 
            h.id === id ? { ...h, ...updates, updatedAt: new Date().toISOString() } : h
          )
        }))
      },
      
      deleteHote: (id) => {
        set(state => ({
          hotes: state.hotes.filter(h => h.id !== id)
        }))
      },
      
      // Métriques du dashboard
      getMetrics: () => {
        const state = get()
        const today = new Date()
        
        return {
          visitantesAtuais: state.attributions.filter(a => {
            const start = new Date(a.dateDebut)
            const end = new Date(a.dateFin)
            return start <= today && end >= today && a.statut === 'confirmé'
          }).length,
          
          necessidadesNaoCobertas: state.oradores.filter(o => {
            const hasAttribution = state.attributions.some(a => 
              a.orateurId === o.id && a.statut === 'confirmé'
            )
            return !hasAttribution && o.nextVisitDate
          }).length,
          
          anfitriaoesDisponiveis: state.hotes.filter(h => {
            const currentAttributions = state.attributions.filter(a => {
              const start = new Date(a.dateDebut)
              const end = new Date(a.dateFin)
              return start <= today && end >= today && a.hoteId === h.id
            })
            return currentAttributions.length < h.capacites.hebergement
          }).length,
          
          alertasAlergia: state.oradores.filter(o => 
            o.allergies?.type === 'grave'
          ).length
        }
      },
      
      // CRUD Attributions
      addAttribution: (attribution) => {
        const newAttribution = {
          ...attribution,
          id: Date.now().toString(),
          createdAt: attribution.createdAt || new Date().toISOString()
        }
        set(state => ({
          attributions: [...state.attributions, newAttribution]
        }))
      },
      
      updateAttribution: (id, updates) => {
        set(state => ({
          attributions: state.attributions.map(a => 
            a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
          )
        }))
      },
      
      deleteAttribution: (id) => {
        set(state => ({
          attributions: state.attributions.filter(a => a.id !== id)
        }))
      },
      
      // CRUD Eventos
      addEvento: (evento) => {
        const newEvento = {
          ...evento,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
        set(state => ({
          eventos: [...state.eventos, newEvento]
        }))
      },
      
      updateEvento: (id, updates) => {
        set(state => ({
          eventos: state.eventos.map(e => 
            e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
          )
        }))
      },
      
      deleteEvento: (id) => {
        set(state => ({
          eventos: state.eventos.filter(e => e.id !== id)
        }))
      },
      
      // Export/Import
      exportData: () => {
        const state = get()
        return {
          oradores: state.oradores,
          hotes: state.hotes,
          attributions: state.attributions,
          eventos: state.eventos,
          exportedAt: new Date().toISOString()
        }
      },
      
      importData: (data) => {
        set({
          oradores: data.oradores || [],
          hotes: data.hotes || [],
          attributions: data.attributions || [],
          eventos: data.eventos || []
        })
      },
      
      // Gestion des templates WhatsApp
      updateWhatsappTemplate: (templateKey, message) => {
        set(state => ({
          whatsappTemplates: {
            ...state.whatsappTemplates,
            [templateKey]: message
          }
        }))
      },
      
      getWhatsappTemplate: (templateKey, defaultMessage) => {
        const state = get()
        return state.whatsappTemplates[templateKey] || defaultMessage
      },
      
      // Nettoyer toutes les données
      clearAll: () => {
        set({
          oradores: [],
          hotes: [],
          attributions: [],
          eventos: [],
          whatsappTemplates: {}
        })
        localStorage.removeItem('discursos-kbv-storage')
        localStorage.removeItem('discursos-kbv-initial-loaded')
      }
    }),
    {
      name: 'discursos-kbv-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1
    }
  )
)