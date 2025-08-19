// Service Worker pour PWA offline-first

const CACHE_NAME = 'discursos-kbv-v2'
const STATIC_CACHE = 'static-v2'
const DYNAMIC_CACHE = 'dynamic-v2'

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png'
]

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Cache ouvert')
        return cache.addAll(urlsToCache)
      })
      .catch(err => console.error('Service Worker: Erreur installation', encodeURIComponent(err.message)))
  )
  self.skipWaiting()
})

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Suppression ancien cache', encodeURIComponent(cacheName))
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Stratégie Cache First sécurisée
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET et externes
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        
        return fetch(event.request)
          .then((fetchResponse) => {
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse
            }
            
            const responseToCache = fetchResponse.clone()
            
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })
              .catch(err => console.warn('Cache put failed:', encodeURIComponent(err.message)))
            
            return fetchResponse
          })
          .catch(() => {
            if (event.request.destination === 'document') {
              return caches.match('/')
            }
            return new Response('Offline', { status: 503 })
          })
      })
  )
})

// Gestion des notifications push
self.addEventListener('notificationclick', (event) => {
  console.log('Notification cliquée:', event.notification.data)
  
  event.notification.close()
  
  const data = event.notification.data
  
  if (event.action === 'view' || event.action === 'view-details') {
    // Ouvrir l'application
    event.waitUntil(
      clients.openWindow('/')
    )
  } else if (event.action === 'whatsapp' || event.action === 'whatsapp-host') {
    // Ouvrir WhatsApp avec message prérempli
    const message = generateWhatsAppMessage(data)
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    
    event.waitUntil(
      clients.openWindow(whatsappUrl)
    )
  }
})

// Générer message WhatsApp basé sur les données de notification
function generateWhatsAppMessage(data) {
  if (data.type === 'visit-reminder') {
    return `Lembrete: Visita agendada para ${new Date(data.visitDate).toLocaleDateString('pt-BR')}`
  } else if (data.type === 'allergy-alert') {
    return `⚠️ IMPORTANTE: Alerta de alergia ${data.allergyType}. Detalhes: ${data.allergyDetails}`
  } else if (data.type === 'attribution-confirmed') {
    return `✅ Atribuição confirmada para ${new Date().toLocaleDateString('pt-BR')}`
  }
  
  return 'Mensagem do Seguimiento Discursos KBV'
}

// Sincronização em background (quando a conexão retorna)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aqui on pourrait synchroniser les données avec un serveur
      console.log('Sincronização em background')
    )
  }
})

// Gestion des mises à jour de l'application
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})